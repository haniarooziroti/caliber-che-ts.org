/**
 * Last build step: fail if dist/ leaks workers.dev, typo domains, or off-origin SEO URLs.
 */
import fs from 'node:fs';
import path from 'node:path';
import { resolveDistRoot } from './dist-root.mjs';
import {
  PREVIEW_WORKER_HOST,
  SITE_DOMAIN,
  SITE_ORIGIN,
  WRONG_DOMAIN_VARIANTS,
  resolveSiteOrigin,
} from './site-origin.mjs';

resolveSiteOrigin();

const root = process.cwd();
const dist = resolveDistRoot(root);
const TEXT_EXT = new Set([
  '.html',
  '.xml',
  '.txt',
  '.json',
  '.js',
  '.mjs',
  '.css',
  '.svg',
  '.webmanifest',
  '.map',
]);

const issues = [];

function addIssue(file, line, message) {
  const rel = path.relative(root, file).replace(/\\/g, '/');
  issues.push(`${rel}:${line}: ${message}`);
}

function walkFiles(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) walkFiles(full, out);
    else out.push(full);
  }
  return out;
}

function isTextFile(file) {
  return TEXT_EXT.has(path.extname(file).toLowerCase()) || path.basename(file) === '_headers';
}

function lineNumberAt(content, index) {
  if (index < 0) return 1;
  return content.slice(0, index).split(/\r?\n/).length;
}

function findOnLines(content, pattern, fn) {
  const re = pattern instanceof RegExp ? new RegExp(pattern.source, pattern.flags.includes('g') ? pattern.flags : `${pattern.flags}g`) : null;
  if (re) {
    let m;
    while ((m = re.exec(content))) {
      fn(m[0], lineNumberAt(content, m.index), m);
    }
    return;
  }
  let from = 0;
  const needle = String(pattern);
  while (from < content.length) {
    const idx = content.indexOf(needle, from);
    if (idx === -1) break;
    fn(needle, lineNumberAt(content, idx), null);
    from = idx + needle.length;
  }
}

function hostOf(url) {
  try {
    return new URL(url).hostname.toLowerCase();
  } catch {
    return '';
  }
}

function isOrAffiliate(url) {
  const host = hostOf(url);
  return host === 'merchant.example' || host.endsWith('.merchant.example');
}

const THIRD_PARTY_MEDIA_HOSTS = ['supabase.co', 'supabase.in', 'unsplash.com', 'cloudinary.com', 'imgur.com'];

function isThirdPartyMediaUrl(url) {
  const host = hostOf(url);
  if (!host || host === SITE_DOMAIN) return false;
  if (isOrAffiliate(url)) return false;
  return THIRD_PARTY_MEDIA_HOSTS.some((suffix) => host === suffix || host.endsWith(`.${suffix}`));
}

const PRODUCT_PAGE_MARKERS = ['/products/caliber/aimbot/', '/products/caliber/hwid-spoofer/', '/products/caliber/ugc/', '/products/caliber/cloud-dma/'];

function isProductPageFile(relDist) {
  return PRODUCT_PAGE_MARKERS.some((p) => relDist.replace(/\\/g, '/').includes(p.replace(/^\//, '')));
}

function isSiteOwnedSeoUrl(url) {
  return typeof url === 'string' && url.startsWith(`${SITE_ORIGIN}`);
}

const files = walkFiles(dist);
const headersName = path.normalize(path.join(dist, '_headers'));

for (const file of files) {
  if (!isTextFile(file)) continue;
  const content = fs.readFileSync(file, 'utf8');
  const relDist = path.relative(dist, file).replace(/\\/g, '/');
  const isHeaders = path.normalize(file) === headersName || relDist === '_headers';
  const isPreviewGuard = relDist === 'preview-host-guard.js';

  if (!isHeaders && !isPreviewGuard) {
    findOnLines(content, /workers\.dev/gi, (match, line) => {
      addIssue(file, line, `workers.dev is only allowed in dist/_headers (found "${match}")`);
    });
  } else if (isHeaders) {
    if (!content.includes(PREVIEW_WORKER_HOST)) {
      addIssue(file, 1, `_headers must include preview host ${PREVIEW_WORKER_HOST}`);
    }
    const workersMentions = content.match(/workers\.dev/gi) ?? [];
    const previewLines = content.split(/\r?\n/).filter((l) => l.includes('workers.dev')).length;
    if (workersMentions.length > previewLines + 2) {
      addIssue(file, 1, 'dist/_headers contains unexpected workers.dev references');
    }
  }

  if (!isHeaders) {
    findOnLines(content, /https?:\/\/[^\s"'<>]+/gi, (url, line) => {
      if (isThirdPartyMediaUrl(url)) {
        addIssue(file, line, `third-party image/media URL not allowed in dist (got ${url})`);
      }
    });
    findOnLines(content, /\bsupabase\b/gi, (match, line) => {
      addIssue(file, line, `hotlinked host name "${match}" must not appear in dist`);
    });
  }

  for (const variant of WRONG_DOMAIN_VARIANTS) {
    const re = new RegExp(variant.replace(/\./g, '\\.'), 'gi');
    findOnLines(content, re, (match, line) => {
      addIssue(file, line, `wrong domain variant "${match}" (must be ${SITE_DOMAIN})`);
    });
  }

  if (path.extname(file).toLowerCase() !== '.html') continue;
  if (relDist.startsWith('go/')) continue;

  findOnLines(content, /<link\b[^>]*rel=["']canonical["'][^>]*>/gi, (tag, line) => {
    const href = tag.match(/\bhref=["']([^"']+)["']/i)?.[1];
    if (!href || !isSiteOwnedSeoUrl(href)) {
      addIssue(file, line, `canonical href must start with ${SITE_ORIGIN} (got ${href ?? '(missing)'})`);
    }
  });
  findOnLines(content, /<link\b[^>]*href=["'][^"']+["'][^>]*rel=["']canonical["'][^>]*>/gi, (tag, line) => {
    if (/\brel=["']canonical["']/i.test(tag) && /\bhref=["']/.test(tag) && !/<link\b[^>]*rel=["']canonical["'][^>]*href=/i.test(tag)) {
      const href = tag.match(/\bhref=["']([^"']+)["']/i)?.[1];
      if (!href || !isSiteOwnedSeoUrl(href)) {
        addIssue(file, line, `canonical href must start with ${SITE_ORIGIN} (got ${href ?? '(missing)'})`);
      }
    }
  });

  findOnLines(content, /<meta\b[^>]*property=["']og:url["'][^>]*>/gi, (tag, line) => {
    const href = tag.match(/\bcontent=["']([^"']+)["']/i)?.[1];
    if (!href || !isSiteOwnedSeoUrl(href)) {
      addIssue(file, line, `og:url must start with ${SITE_ORIGIN} (got ${href ?? '(missing)'})`);
    }
  });

  findOnLines(content, /<meta\b[^>]*property=["']og:image["'][^>]*>/gi, (tag, line) => {
    const href = tag.match(/\bcontent=["']([^"']+)["']/i)?.[1];
    if (!href || !isSiteOwnedSeoUrl(href)) {
      addIssue(file, line, `og:image must start with ${SITE_ORIGIN} (got ${href ?? '(missing)'})`);
    }
  });
  findOnLines(content, /<meta\b[^>]*property=["']og:image:secure_url["'][^>]*>/gi, (tag, line) => {
    const href = tag.match(/\bcontent=["']([^"']+)["']/i)?.[1];
    if (!href || !isSiteOwnedSeoUrl(href)) {
      addIssue(file, line, `og:image:secure_url must start with ${SITE_ORIGIN} (got ${href ?? '(missing)'})`);
    }
  });

  findOnLines(content, /<link\b[^>]*hreflang=["'][^"']+["'][^>]*>/gi, (tag, line) => {
    const href = tag.match(/\bhref=["']([^"']+)["']/i)?.[1];
    if (!href || !isSiteOwnedSeoUrl(href)) {
      addIssue(file, line, `hreflang href must start with ${SITE_ORIGIN} (got ${href ?? '(missing)'})`);
    }
  });
  findOnLines(content, /<link\b[^>]*href=["'][^"']+["'][^>]*hreflang=["'][^"']+["'][^>]*>/gi, (tag, line) => {
    const href = tag.match(/\bhref=["']([^"']+)["']/i)?.[1];
    if (href && !isSiteOwnedSeoUrl(href)) {
      addIssue(file, line, `hreflang href must start with ${SITE_ORIGIN} (got ${href})`);
    }
  });

  findOnLines(content, /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi, (block, line) => {
    const jsonText = block.replace(/^<script\b[^>]*>/i, '').replace(/<\/script>$/i, '');
    let data;
    try {
      data = JSON.parse(jsonText);
    } catch {
      addIssue(file, line, 'JSON-LD is not valid JSON');
      return;
    }
    walkJsonLd(data, file, line);
    if (isProductPageFile(relDist)) {
      checkProductJsonLd(data, file, line, content);
    }
  });
}

function checkProductJsonLd(data, file, line, html) {
  const nodes = Array.isArray(data) ? data : data['@graph'] ? data['@graph'] : [data];
  const product = nodes.find((n) => n && n['@type'] === 'Product');
  if (!product) {
    addIssue(file, line, 'product page must include Product JSON-LD');
    return;
  }
  const offers = product.offers;
  const offerList = offers == null ? [] : Array.isArray(offers) ? offers : [offers];
  if (!offerList.length) {
    addIssue(file, line, 'Product JSON-LD must include at least one Offer with price and availability');
    return;
  }
  for (const offer of offerList) {
    if (!offer || offer['@type'] !== 'Offer') continue;
    if (offer.price == null || offer.price === '') {
      addIssue(file, line, 'Product Offer missing price');
    }
    if (!offer.availability) {
      addIssue(file, line, 'Product Offer missing availability');
    }
  }
  const jsonPrice = offerList[0]?.price;
  if (jsonPrice != null) {
    const visible = html.match(/\$[\d,.]+/);
    if (visible && !html.includes(String(jsonPrice))) {
      addIssue(file, line, `visible price ${visible[0]} may not match JSON-LD price ${jsonPrice}`);
    }
  }
}

function walkJsonLd(node, file, line) {
  if (node == null) return;
  if (Array.isArray(node)) {
    node.forEach((item) => walkJsonLd(item, file, line));
    return;
  }
  if (typeof node !== 'object') return;

  for (const [key, value] of Object.entries(node)) {
    if (key === 'sameAs') continue;
    if (typeof value === 'string' && /^https?:\/\//i.test(value)) {
      if (isOrAffiliate(value)) continue;
      const checkIdentity = key === 'url' || key === '@id' || key === 'image';
      if (checkIdentity) {
        if (isThirdPartyMediaUrl(value)) {
          addIssue(file, line, `JSON-LD ${key} must be first-party (got ${value})`);
          continue;
        }
        if (!isSiteOwnedSeoUrl(value)) {
          addIssue(file, line, `JSON-LD ${key} must start with ${SITE_ORIGIN} (got ${value})`);
        }
      }
    } else if (typeof value === 'object') {
      walkJsonLd(value, file, line);
    }
  }
}

function checkXmlLocHosts(filename) {
  const file = path.join(dist, filename);
  if (!fs.existsSync(file)) return;
  const content = fs.readFileSync(file, 'utf8');
  findOnLines(content, /<loc>([^<]+)<\/loc>/gi, (full, line, m) => {
    const url = m[1].trim();
    const host = hostOf(url);
    if (host !== SITE_DOMAIN) {
      addIssue(file, line, `${filename} loc host must be ${SITE_DOMAIN} (got ${url})`);
    }
  });
  if (filename === 'rss.xml') {
    findOnLines(content, /<(?:link|guid|atom:link)[^>]*>/gi, (tag, line) => {
      const href = tag.match(/\bhref=["']([^"']+)["']/i)?.[1];
      const inner = tag.match(/>([^<]+)</)?.[1];
      const url = href || inner;
      if (!url || !/^https?:/i.test(url)) return;
      if (hostOf(url) !== SITE_DOMAIN) {
        addIssue(file, line, `rss.xml URL host must be ${SITE_DOMAIN} (got ${url})`);
      }
    });
    findOnLines(content, /<enclosure\b[^>]*>/gi, (tag, line) => {
      const url = tag.match(/\burl=["']([^"']+)["']/i)?.[1];
      if (!url || !/^https?:/i.test(url)) return;
      if (isThirdPartyMedia(url) || isOrAffiliate(url)) return;
      if (hostOf(url) !== SITE_DOMAIN) {
        addIssue(file, line, `rss.xml enclosure host must be ${SITE_DOMAIN} (got ${url})`);
      }
    });
  }
}

checkXmlLocHosts('sitemap.xml');
checkXmlLocHosts('sitemap-index.xml');
checkXmlLocHosts('rss.xml');

const robotsPath = path.join(dist, 'robots.txt');
if (!fs.existsSync(robotsPath)) {
  addIssue(robotsPath, 1, 'robots.txt is missing');
} else {
  const robots = fs.readFileSync(robotsPath, 'utf8');
  const sitemapLine = `Sitemap: ${SITE_ORIGIN}/sitemap.xml`;
  if (!robots.split(/\r?\n/).some((line) => line.trim() === sitemapLine)) {
    const line = 1;
    addIssue(robotsPath, line, `robots.txt must contain "${sitemapLine}"`);
  }
}

if (issues.length) {
  console.error('verify-domain: FAILED\n');
  issues.forEach((issue) => console.error(`  ${issue}`));
  process.exit(1);
}

console.log(`verify-domain: OK (${files.length} dist files, origin ${SITE_ORIGIN})`);
