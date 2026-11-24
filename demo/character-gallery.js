/* Orchard Vale Character Registry interactivity (demo/character-gallery.html)
   Role filters, smooth-scroll hero stage jumps, and fit-to-screen dialog lightbox. */

(function () {
  'use strict';

  var ROLE_LABELS = {
    all: 'guild characters',
    leadership: 'Leadership & Strategy characters',
    engineering: 'Build & Engineering characters',
    research: 'Research & Records characters',
    operations: 'Operations & Delivery characters'
  };

  function initCharacterRegistry() {
    var filterButtons = Array.prototype.slice.call(document.querySelectorAll('.role-chip[data-role-filter]'));
    var cards = Array.prototype.slice.call(document.querySelectorAll('.character-card[data-role]'));
    var statusEl = document.getElementById('role-status');
    var stageLinks = Array.prototype.slice.call(document.querySelectorAll('.stage-actor[data-jump-target]'));

    var totalCount = cards.length;
    var roleCounts = { all: totalCount };
    cards.forEach(function (card) {
      var role = card.getAttribute('data-role') || '';
      if (role) roleCounts[role] = (roleCounts[role] || 0) + 1;
    });

    Object.keys(roleCounts).forEach(function (key) {
      var badge = document.querySelector('[data-role-count="' + key + '"]');
      if (badge) badge.textContent = String(roleCounts[key]);
    });

    function applyRoleFilter(roleKey, announceChange) {
      var active = roleCounts[roleKey] ? roleKey : 'all';
      var visible = 0;

      cards.forEach(function (card) {
        var show = active === 'all' || card.getAttribute('data-role') === active;
        card.hidden = !show;
        if (show) visible += 1;
      });

      filterButtons.forEach(function (btn) {
        var selected = btn.getAttribute('data-role-filter') === active;
        btn.setAttribute('aria-pressed', selected ? 'true' : 'false');
      });

      var label = ROLE_LABELS[active] || 'guild characters';
      var message = active === 'all'
        ? 'Showing ' + visible + ' of ' + totalCount + ' guild characters'
        : 'Showing ' + visible + ' ' + label;

      if (statusEl) statusEl.textContent = message;
      if (announceChange && window.OrchardVale && typeof window.OrchardVale.announce === 'function') {
        window.OrchardVale.announce(message, 'polite');
      }
    }

    filterButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        applyRoleFilter(btn.getAttribute('data-role-filter') || 'all', true);
      });
    });

    // Clickable hero stage actors smooth-scroll to their registry card and highlight it.
    var highlightTimer = null;
    stageLinks.forEach(function (link) {
      link.addEventListener('click', function (event) {
        var targetId = link.getAttribute('data-jump-target');
        var card = targetId ? document.getElementById(targetId) : null;
        if (!card) return;
        event.preventDefault();

        if (card.hidden) {
          applyRoleFilter('all', false);
        }

        var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        card.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' });

        cards.forEach(function (c) { c.classList.remove('is-highlighted'); });
        card.classList.add('is-highlighted');
        if (highlightTimer) window.clearTimeout(highlightTimer);
        highlightTimer = window.setTimeout(function () {
          card.classList.remove('is-highlighted');
        }, 2200);
      });
    });

    // Accessible Fit-to-Screen Dialog Lightbox with Prev / Next navigation.
    var lightbox = document.getElementById('character-lightbox');
    var lbTitle = document.getElementById('char-lb-title');
    var lbCounter = document.getElementById('char-lb-counter');
    var lbStage = document.getElementById('char-lb-stage');
    var lbImage = document.getElementById('char-lb-image');
    var lbChips = document.getElementById('char-lb-chips');
    var lbPath = document.getElementById('char-lb-path');
    var lbPrev = document.getElementById('char-lb-prev');
    var lbNext = document.getElementById('char-lb-next');
    var lbZoom = document.getElementById('char-lb-zoom');
    var lbCopyPath = document.getElementById('char-lb-copy-path');
    var lbCopySnippet = document.getElementById('char-lb-copy-snippet');

    var activeItems = [];
    var activeIndex = 0;

    function itemFromButton(btn) {
      return {
        title: btn.getAttribute('data-lb-title') || 'Character Artwork',
        role: btn.getAttribute('data-lb-role') || '',
        variant: btn.getAttribute('data-lb-variant') || '',
        path: btn.getAttribute('data-lb-path') || '',
        src: btn.getAttribute('data-lb-src') || ''
      };
    }

    function setZoom(actualSize) {
      if (!lbStage || !lbZoom) return;
      lbStage.classList.toggle('is-actual-size', actualSize);
      lbZoom.setAttribute('aria-pressed', actualSize ? 'true' : 'false');
      lbZoom.textContent = actualSize ? 'Fit to Screen' : '100% Actual Size';
    }

    function setSurface(surface) {
      if (lightbox) lightbox.setAttribute('data-surface', surface);
      var btns = document.querySelectorAll('[data-lb-surface]');
      Array.prototype.forEach.call(btns, function (b) {
        b.setAttribute('aria-pressed', b.getAttribute('data-lb-surface') === surface ? 'true' : 'false');
      });
    }

    function renderCurrent() {
      var item = activeItems[activeIndex];
      if (!item) return;

      if (lbTitle) lbTitle.textContent = item.title;
      if (lbCounter) lbCounter.textContent = (activeIndex + 1) + ' / ' + activeItems.length;
      if (lbImage) {
        lbImage.src = item.src;
        lbImage.alt = item.title;
      }
      if (lbPath) lbPath.textContent = item.path;

      if (lbChips) {
        lbChips.textContent = '';
        [
          { label: item.role, cls: 'ov-chip ov-chip--green' },
          { label: item.variant, cls: 'ov-chip ov-chip--amber' }
        ].forEach(function (info) {
          if (!info.label) return;
          var span = document.createElement('span');
          span.className = info.cls;
          span.textContent = info.label;
          lbChips.appendChild(span);
        });
      }

      if (lbPrev) lbPrev.disabled = activeItems.length <= 1;
      if (lbNext) lbNext.disabled = activeItems.length <= 1;
      if (lbStage) lbStage.scrollTo({ top: 0, left: 0 });
    }

    function openLightboxFor(triggerBtn) {
      var group = triggerBtn.getAttribute('data-lb-group');
      var allTriggers = Array.prototype.slice.call(document.querySelectorAll('[data-lightbox-trigger]'));
      var scoped = allTriggers.filter(function (btn) {
        if (group === 'sheets') return btn.getAttribute('data-lb-group') === 'sheets';
        if (btn.getAttribute('data-lb-group') === 'sheets') return false;
        var parentCard = btn.closest('.character-card');
        return !parentCard || !parentCard.hidden;
      });

      activeItems = scoped.map(itemFromButton);
      activeIndex = Math.max(0, scoped.indexOf(triggerBtn));
      setZoom(false);
      renderCurrent();

      if (window.OrchardVale && typeof window.OrchardVale.openDialog === 'function') {
        window.OrchardVale.openDialog(lightbox, triggerBtn);
      } else if (lightbox && typeof lightbox.showModal === 'function') {
        lightbox.showModal();
      }
    }

    function stepLightbox(delta) {
      if (activeItems.length <= 1) return;
      activeIndex = (activeIndex + delta + activeItems.length) % activeItems.length;
      renderCurrent();
    }

    var triggers = document.querySelectorAll('[data-lightbox-trigger]');
    Array.prototype.forEach.call(triggers, function (btn) {
      btn.addEventListener('click', function () {
        openLightboxFor(btn);
      });
    });

    if (lbPrev) lbPrev.addEventListener('click', function () { stepLightbox(-1); });
    if (lbNext) lbNext.addEventListener('click', function () { stepLightbox(1); });

    if (lbZoom) {
      lbZoom.addEventListener('click', function () {
        setZoom(lbZoom.getAttribute('aria-pressed') !== 'true');
      });
    }

    Array.prototype.forEach.call(document.querySelectorAll('[data-lb-surface]'), function (btn) {
      btn.addEventListener('click', function () {
        setSurface(btn.getAttribute('data-lb-surface') || 'parchment');
      });
    });

    if (lbCopyPath) {
      lbCopyPath.addEventListener('click', function () {
        var item = activeItems[activeIndex];
        if (!item || !window.OrchardVale) return;
        window.OrchardVale.copyText(item.path).then(function () {
          window.OrchardVale.toast('Copied path: ' + item.path, 'success');
        }, function () {
          window.OrchardVale.toast('Could not copy automatically.', 'warning');
        });
      });
    }

    if (lbCopySnippet) {
      lbCopySnippet.addEventListener('click', function () {
        var item = activeItems[activeIndex];
        if (!item || !window.OrchardVale) return;
        var snippet = '<img src="../' + item.path + '" alt="' + item.title.replace(/"/g, '&quot;') + '" decoding="async">';
        window.OrchardVale.copyText(snippet).then(function () {
          window.OrchardVale.toast('Copied <img> snippet for ' + item.title + '.', 'success');
        }, function () {
          window.OrchardVale.toast('Could not copy automatically.', 'warning');
        });
      });
    }

    if (lightbox) {
      lightbox.addEventListener('keydown', function (event) {
        if (!lightbox.open) return;
        if (event.key === 'ArrowLeft') {
          event.preventDefault();
          stepLightbox(-1);
        } else if (event.key === 'ArrowRight') {
          event.preventDefault();
          stepLightbox(1);
        }
      });
    }

    applyRoleFilter('all', false);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCharacterRegistry);
  } else {
    initCharacterRegistry();
  }
})();
