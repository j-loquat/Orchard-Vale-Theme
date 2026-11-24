/* Orchard Vale Showcase Hub interactivity (demo/index.html)
   Category filter chips, live count indicator, and graceful screenshot fallback. */

(function () {
  'use strict';

  var CATEGORY_LABELS = {
    all: 'destinations',
    flagship: 'Flagship Apps',
    templates: 'Content Templates',
    civic: 'Civic & Editorial pages',
    galleries: 'Specimen Galleries',
    starter: 'Starter Kit'
  };

  function initShowcaseHub() {
    var filterButtons = Array.prototype.slice.call(document.querySelectorAll('.filter-chip[data-filter]'));
    var items = Array.prototype.slice.call(document.querySelectorAll('[data-showcase-item]'));
    var demoGrid = document.getElementById('demo-grid');
    var statusEl = document.getElementById('filter-status');

    // Graceful fallback for screenshots not yet captured (e.g. brand-new demos mid-wave).
    var fallbackImages = document.querySelectorAll('img[data-fallback-src]');
    Array.prototype.forEach.call(fallbackImages, function (img) {
      img.addEventListener('error', function () {
        var fallback = img.getAttribute('data-fallback-src');
        if (fallback && img.getAttribute('data-fallback-applied') !== 'true') {
          img.setAttribute('data-fallback-applied', 'true');
          img.src = fallback;
        }
      });
    });

    if (!filterButtons.length || !items.length) return;

    // Populate exact category counts dynamically.
    var totalCount = items.length;
    var counts = { all: totalCount };
    items.forEach(function (item) {
      var cat = item.getAttribute('data-category') || '';
      if (cat) counts[cat] = (counts[cat] || 0) + 1;
    });

    Object.keys(counts).forEach(function (key) {
      var badge = document.querySelector('[data-count-for="' + key + '"]');
      if (badge) badge.textContent = String(counts[key]);
    });

    function applyFilter(category, announceChange) {
      var active = counts[category] ? category : 'all';
      var visibleCount = 0;
      var visibleCardsInGrid = 0;

      items.forEach(function (item) {
        var itemCat = item.getAttribute('data-category');
        var show = active === 'all' || itemCat === active;
        item.hidden = !show;
        if (show) {
          visibleCount += 1;
          if (demoGrid && demoGrid.contains(item)) {
            visibleCardsInGrid += 1;
          }
        }
      });

      if (demoGrid) {
        demoGrid.hidden = visibleCardsInGrid === 0;
      }

      filterButtons.forEach(function (btn) {
        var selected = btn.getAttribute('data-filter') === active;
        btn.setAttribute('aria-pressed', selected ? 'true' : 'false');
      });

      var label = CATEGORY_LABELS[active] || 'destinations';
      var text = active === 'all'
        ? 'Showing ' + visibleCount + ' of ' + totalCount + ' destinations'
        : 'Showing ' + visibleCount + ' ' + label;

      if (statusEl) {
        statusEl.textContent = text;
      }

      if (announceChange && window.OrchardVale && typeof window.OrchardVale.announce === 'function') {
        window.OrchardVale.announce(text, 'polite');
      }
    }

    filterButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var target = btn.getAttribute('data-filter') || 'all';
        applyFilter(target, true);
      });
    });

    // Optional initial hash support (e.g. demo/index.html#flagship).
    var initialHash = (window.location.hash || '').replace(/^#/, '').toLowerCase();
    applyFilter(counts[initialHash] ? initialHash : 'all', false);

    var copySnippetBtn = document.getElementById('copy-starter-snippet');
    if (copySnippetBtn) {
      copySnippetBtn.addEventListener('click', function () {
        var snippet = '<link rel="stylesheet" href="src/theme/index.css">\n<script src="src/theme/orchard-vale.js" defer></script>';
        if (window.OrchardVale && typeof window.OrchardVale.copyText === 'function') {
          window.OrchardVale.copyText(snippet).then(function () {
            window.OrchardVale.toast('Copied Theme v2.0 import snippet.', 'success');
          }, function () {
            window.OrchardVale.toast('Could not copy automatically. Please copy manually.', 'warning');
          });
        }
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initShowcaseHub);
  } else {
    initShowcaseHub();
  }
})();
