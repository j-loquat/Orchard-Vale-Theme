/* Orchard Vale Town Notice Board interactive behaviors:
   - Category filter chips with live counts and empty-state fallback
   - Pin a notice dialog form appending new notice cards live + toast
   - Interactive market district map pins <-> legend highlighting + callout */

(function () {
  'use strict';

  var CATEGORY_META = {
    priority: {
      chipClass: 'ov-chip--green',
      cardClass: 'ov-card--green priority',
      label: 'Priority · Just pinned',
      icon: '../src/assets/orchard-vale/icons/icon-status-healthy-32.svg',
      footer: 'Posted by a neighbor'
    },
    events: {
      chipClass: 'ov-chip--amber',
      cardClass: 'ov-card--amber',
      label: 'Events · Just pinned',
      icon: '../src/assets/orchard-vale/icons/icon-data-citation-32.svg',
      footer: 'Open to all neighbors'
    },
    requests: {
      chipClass: 'ov-chip--blue',
      cardClass: 'ov-card--blue',
      label: 'Requests · Just pinned',
      icon: '../src/assets/orchard-vale/icons/icon-action-add-32.svg',
      footer: 'Contributions welcome'
    }
  };

  var MAP_LOCATIONS = {
    fountain: {
      title: 'Fountain welcome table',
      desc: 'Center of the market green · Open 9:00 AM–3:00 PM. Collect a blank route card, borrow an umbrella, or ask Marrow for directions.'
    },
    library: {
      title: 'Library question desk',
      desc: 'North steps beside the bell tower · Open 1:00 PM–5:00 PM. Bring forms, letters, or research questions for Professor Alderwick.'
    },
    supper: {
      title: 'Shared supper table',
      desc: 'South green under the orchard lanterns · Setup begins at 5:30 PM. Extra chairs and surplus fruit baskets are always welcome.'
    }
  };

  function initNoticeBoard() {
    var noticeList = document.getElementById('notice-list');
    var emptyState = document.getElementById('notice-empty');
    var filterButtons = Array.prototype.slice.call(document.querySelectorAll('.filter-chip[data-filter]'));
    var resetFilterBtn = document.getElementById('reset-notice-filter');
    var form = document.getElementById('pin-notice-form');
    var dialog = document.getElementById('pin-notice-dialog');
    var activeFilter = 'all';

    function getNoticeCards() {
      if (!noticeList) return [];
      return Array.prototype.slice.call(noticeList.querySelectorAll('.notice-card'));
    }

    function updateCounts() {
      var cards = getNoticeCards();
      var counts = { all: cards.length, priority: 0, events: 0, requests: 0 };
      cards.forEach(function (card) {
        var cat = card.getAttribute('data-category');
        if (cat && Object.prototype.hasOwnProperty.call(counts, cat)) {
          counts[cat] += 1;
        }
      });
      Object.keys(counts).forEach(function (key) {
        var badge = document.querySelector('[data-count-for="' + key + '"]');
        if (badge) badge.textContent = String(counts[key]);
      });
    }

    function applyFilter(category) {
      activeFilter = category || 'all';
      filterButtons.forEach(function (btn) {
        var matches = btn.getAttribute('data-filter') === activeFilter;
        btn.setAttribute('aria-pressed', matches ? 'true' : 'false');
      });

      var cards = getNoticeCards();
      var visibleCount = 0;
      cards.forEach(function (card) {
        var show = activeFilter === 'all' || card.getAttribute('data-category') === activeFilter;
        card.hidden = !show;
        if (show) visibleCount += 1;
      });

      if (emptyState) {
        emptyState.hidden = visibleCount > 0;
      }
    }

    filterButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        applyFilter(btn.getAttribute('data-filter'));
      });
    });

    if (resetFilterBtn) {
      resetFilterBtn.addEventListener('click', function () {
        applyFilter('all');
      });
    }

    function buildNoticeCard(data) {
      var meta = CATEGORY_META[data.category] || CATEGORY_META.events;
      var article = document.createElement('article');
      article.className = 'ov-card ' + meta.cardClass + ' notice-card';
      article.setAttribute('data-category', data.category);

      var topRow = document.createElement('div');
      topRow.className = 'notice-meta';

      var chip = document.createElement('span');
      chip.className = 'ov-chip ' + meta.chipClass;
      chip.textContent = meta.label;

      var loc = document.createElement('span');
      loc.textContent = data.location || 'Town green';

      topRow.appendChild(chip);
      topRow.appendChild(loc);

      var heading = document.createElement('h3');
      heading.textContent = data.title;

      var body = document.createElement('p');
      body.textContent = data.details;

      var footer = document.createElement('footer');
      var icon = document.createElement('img');
      icon.src = meta.icon;
      icon.alt = '';
      icon.width = 22;
      icon.height = 22;
      icon.decoding = 'async';

      var footerText = document.createElement('span');
      footerText.textContent = meta.footer;

      footer.appendChild(icon);
      footer.appendChild(footerText);

      article.appendChild(topRow);
      article.appendChild(heading);
      article.appendChild(body);
      article.appendChild(footer);
      return article;
    }

    if (form && noticeList) {
      var titleInput = document.getElementById('notice-heading-input');
      var categoryInput = document.getElementById('notice-category-input');
      var locationInput = document.getElementById('notice-location-input');
      var detailsInput = document.getElementById('notice-details-input');
      var titleError = document.getElementById('notice-heading-error');
      var detailsError = document.getElementById('notice-details-error');

      form.addEventListener('submit', function (event) {
        event.preventDefault();
        var title = titleInput ? titleInput.value.trim() : '';
        var details = detailsInput ? detailsInput.value.trim() : '';
        var category = categoryInput ? categoryInput.value : 'events';
        var location = locationInput ? locationInput.value.trim() : '';

        var valid = true;
        if (!title) {
          valid = false;
          if (titleInput) titleInput.setAttribute('aria-invalid', 'true');
          if (titleError) titleError.hidden = false;
        } else {
          if (titleInput) titleInput.removeAttribute('aria-invalid');
          if (titleError) titleError.hidden = true;
        }

        if (!details) {
          valid = false;
          if (detailsInput) detailsInput.setAttribute('aria-invalid', 'true');
          if (detailsError) detailsError.hidden = false;
        } else {
          if (detailsInput) detailsInput.removeAttribute('aria-invalid');
          if (detailsError) detailsError.hidden = true;
        }

        if (!valid) {
          if (!title && titleInput) titleInput.focus();
          else if (detailsInput) detailsInput.focus();
          return;
        }

        var card = buildNoticeCard({
          title: title,
          category: category,
          location: location,
          details: details
        });

        noticeList.insertBefore(card, noticeList.firstChild);
        updateCounts();
        if (activeFilter !== 'all' && activeFilter !== category) {
          applyFilter('all');
        } else {
          applyFilter(activeFilter);
        }

        form.reset();
        if (window.OrchardVale && typeof window.OrchardVale.closeDialog === 'function') {
          window.OrchardVale.closeDialog(dialog);
        } else if (dialog && typeof dialog.close === 'function') {
          dialog.close();
        }

        if (window.OrchardVale && typeof window.OrchardVale.toast === 'function') {
          window.OrchardVale.toast('Notice pinned: "' + title + '".', 'success');
        }
      });
    }

    updateCounts();
    applyFilter('all');
  }

  function initInteractiveMap() {
    var triggers = Array.prototype.slice.call(document.querySelectorAll('[data-map-pin]'));
    var calloutTitle = document.getElementById('map-callout-title');
    var calloutDesc = document.getElementById('map-callout-desc');
    if (!triggers.length) return;

    function selectLocation(key) {
      var info = MAP_LOCATIONS[key];
      if (!info) return;

      triggers.forEach(function (el) {
        var active = el.getAttribute('data-map-pin') === key;
        el.classList.toggle('is-active', active);
        el.setAttribute('aria-pressed', active ? 'true' : 'false');
      });

      if (calloutTitle) calloutTitle.textContent = info.title;
      if (calloutDesc) calloutDesc.textContent = info.desc;
    }

    triggers.forEach(function (el) {
      var key = el.getAttribute('data-map-pin');
      el.addEventListener('click', function () {
        selectLocation(key);
      });
      el.addEventListener('mouseenter', function () {
        selectLocation(key);
      });
    });

    selectLocation('fountain');
  }

  function init() {
    initNoticeBoard();
    initInteractiveMap();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
