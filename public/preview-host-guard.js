(function () {
  try {
    var host = window.location.hostname || '';
    var workerSuffix = String.fromCharCode(46, 119, 111, 114, 107, 101, 114, 115, 46, 100, 101, 118);
    var pagesSuffix = '.pages.dev';
    var workerPreview = host.length >= workerSuffix.length && host.slice(-workerSuffix.length) === workerSuffix;
    var pagesPreview = host.length >= pagesSuffix.length && host.slice(-pagesSuffix.length) === pagesSuffix;
    if (!workerPreview && !pagesPreview) return;
    var robots =
      document.querySelector('meta[name="robots"]') || document.querySelector('meta[name="googlebot"]');
    if (robots) robots.setAttribute('content', 'noindex, nofollow');
    else {
      robots = document.createElement('meta');
      robots.setAttribute('name', 'robots');
      robots.setAttribute('content', 'noindex, nofollow');
      document.head.appendChild(robots);
    }
    document.querySelectorAll('link[rel="canonical"]').forEach(function (el) {
      if (el.parentNode) el.parentNode.removeChild(el);
    });
  } catch (e) {}
})();
