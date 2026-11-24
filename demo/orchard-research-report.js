/* Orchard Vale Scholar's Field Report interactive behaviors:
   - Sticky top-nav IntersectionObserver scrollspy setting aria-current="location"
   - Print / Export PDF button invoking window.print()
   - Copy-citation buttons are handled by OrchardVale ([data-ov-copy]) */

(function () {
  'use strict';

  function initPrintButton() {
    var btn = document.getElementById('print-report-btn');
    if (!btn) return;
    btn.addEventListener('click', function () {
      window.print();
    });
  }

  function initScrollspy() {
    var nav = document.getElementById('report-nav');
    if (!nav) return;

    var links = Array.prototype.slice.call(nav.querySelectorAll('a[href^="#"]'));
    if (!links.length) return;

    var entries = [];
    links.forEach(function (link) {
      var id = link.getAttribute('href').slice(1);
      var section = id ? document.getElementById(id) : null;
      if (section) {
        entries.push({ id: id, link: link, section: section });
      }
    });

    if (!entries.length) return;

    function setActive(activeId) {
      entries.forEach(function (entry) {
        if (entry.id === activeId) {
          entry.link.setAttribute('aria-current', 'location');
        } else {
          entry.link.removeAttribute('aria-current');
        }
      });
    }

    links.forEach(function (link) {
      link.addEventListener('click', function () {
        var id = link.getAttribute('href').slice(1);
        if (id) setActive(id);
      });
    });

    if (typeof IntersectionObserver !== 'function') {
      setActive(entries[0].id);
      return;
    }

    var visible = new Map();
    var observer = new IntersectionObserver(function (records) {
      records.forEach(function (record) {
        if (record.isIntersecting) {
          visible.set(record.target.id, record.intersectionRatio);
        } else {
          visible.delete(record.target.id);
        }
      });

      if (visible.size > 0) {
        for (var i = 0; i < entries.length; i++) {
          if (visible.has(entries[i].id)) {
            setActive(entries[i].id);
            return;
          }
        }
      }
    }, {
      rootMargin: '-120px 0px -55% 0px',
      threshold: [0, 0.15, 0.4]
    });

    entries.forEach(function (entry) {
      observer.observe(entry.section);
    });
  }

  function init() {
    initPrintButton();
    initScrollspy();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
