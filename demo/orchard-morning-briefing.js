/* Orchard Vale Morning Briefing interactive behaviors:
   - Checkable Today's Focus priorities with live completion counter & Badger empty state
   - Email triage filters (All / Urgent / Needs Reply / Waiting) + Mark handled + Fox empty state
   - Delegated copy-reply buttons are powered by OrchardVale ([data-ov-copy]) */

(function () {
  'use strict';

  function initFocusChecklist() {
    var focusList = document.getElementById('focus-list');
    var completeState = document.getElementById('focus-complete');
    var progressBadge = document.getElementById('focus-progress');
    var statCount = document.getElementById('stat-priorities');
    var statLabel = document.getElementById('stat-priorities-label');
    var resetBtn = document.getElementById('reset-briefing-btn');
    if (!focusList) return;

    var items = Array.prototype.slice.call(focusList.querySelectorAll('[data-priority-item]'));
    var checkboxes = items.map(function (item) {
      return item.querySelector('[data-priority-check]');
    }).filter(Boolean);

    function syncProgress(announceCompletion) {
      var total = checkboxes.length;
      var done = 0;

      checkboxes.forEach(function (box, idx) {
        var checked = Boolean(box.checked);
        if (checked) done += 1;
        if (items[idx]) {
          items[idx].classList.toggle('is-done', checked);
        }
      });

      var remaining = total - done;
      if (progressBadge) {
        progressBadge.textContent = done + ' / ' + total + ' done';
      }
      if (statCount) {
        statCount.textContent = remaining === 0 ? 'Done' : String(remaining);
      }
      if (statLabel) {
        statLabel.textContent = remaining === 0 ? 'All priorities clear' : (remaining === 1 ? 'Priority left' : 'Priorities left');
      }

      var allDone = total > 0 && done === total;
      focusList.hidden = allDone;
      if (completeState) {
        completeState.hidden = !allDone;
      }

      if (allDone && announceCompletion && window.OrchardVale && typeof window.OrchardVale.toast === 'function') {
        window.OrchardVale.toast('All morning priorities complete!', 'success');
      }
    }

    checkboxes.forEach(function (box) {
      box.addEventListener('change', function () {
        syncProgress(true);
      });
    });

    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        checkboxes.forEach(function (box) {
          box.checked = false;
        });
        syncProgress(false);
        if (checkboxes[0]) checkboxes[0].focus();
        if (window.OrchardVale && typeof window.OrchardVale.toast === 'function') {
          window.OrchardVale.toast('Briefing checklist reset.', 'info');
        }
      });
    }

    syncProgress(false);
  }

  function initEmailTriage() {
    var list = document.getElementById('email-list');
    var emptyState = document.getElementById('email-empty');
    var emptyMsg = document.getElementById('email-empty-msg');
    var showAllBtn = document.getElementById('email-show-all');
    var restoreBtn = document.getElementById('email-restore-btn');
    var countBadge = document.getElementById('email-count');
    var filterBtns = Array.prototype.slice.call(document.querySelectorAll('[data-email-filter]'));
    if (!list) return;

    var items = Array.prototype.slice.call(list.querySelectorAll('.email-item'));
    var activeFilter = 'all';

    function render() {
      var activeTotal = 0;
      var handledTotal = 0;
      var visibleCount = 0;

      items.forEach(function (item) {
        var handled = item.getAttribute('data-handled') === 'true';
        if (handled) {
          handledTotal += 1;
          item.hidden = true;
          return;
        }
        activeTotal += 1;
        var tags = (item.getAttribute('data-email-tags') || '').split(/\s+/);
        var match = activeFilter === 'all' || tags.indexOf(activeFilter) !== -1;
        item.hidden = !match;
        if (match) visibleCount += 1;
      });

      filterBtns.forEach(function (btn) {
        btn.setAttribute('aria-pressed', btn.getAttribute('data-email-filter') === activeFilter ? 'true' : 'false');
      });

      if (countBadge) {
        countBadge.textContent = activeTotal + ' active';
      }

      if (emptyState) {
        emptyState.hidden = visibleCount > 0;
      }
      if (emptyMsg) {
        emptyMsg.textContent = activeTotal === 0
          ? 'Every message in your morning tray has been handled.'
          : 'No active messages match this filter right now.';
      }
      if (showAllBtn) {
        showAllBtn.hidden = activeFilter === 'all' || activeTotal === 0;
      }
      if (restoreBtn) {
        restoreBtn.hidden = handledTotal === 0;
      }
    }

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        activeFilter = btn.getAttribute('data-email-filter') || 'all';
        render();
      });
    });

    items.forEach(function (item) {
      var handleBtn = item.querySelector('[data-email-handle]');
      if (!handleBtn) return;
      handleBtn.addEventListener('click', function () {
        item.setAttribute('data-handled', 'true');
        render();
        if (window.OrchardVale && typeof window.OrchardVale.toast === 'function') {
          window.OrchardVale.toast('Message marked as handled.', 'success');
        }
      });
    });

    if (showAllBtn) {
      showAllBtn.addEventListener('click', function () {
        activeFilter = 'all';
        render();
      });
    }

    if (restoreBtn) {
      restoreBtn.addEventListener('click', function () {
        items.forEach(function (item) {
          item.removeAttribute('data-handled');
        });
        activeFilter = 'all';
        render();
        if (window.OrchardVale && typeof window.OrchardVale.toast === 'function') {
          window.OrchardVale.toast('Handled messages restored.', 'info');
        }
      });
    }

    render();
  }

  function init() {
    initFocusChecklist();
    initEmailTriage();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
