/* Orchard Vale progressive behavior helpers.
   Zero external dependencies, file://-safe IIFE exposing window.OrchardVale.
   Provides: accessible tabs, dialogs, clipboard copy, demo navigation bar,
   screen-reader announcements, toast notifications, and tooltip Esc dismissal. */

(function (global) {
  'use strict';

  var DEMO_CATALOG = [
    { file: 'index.html', label: 'All Demos (Directory)', group: 'Directory' },
    { file: 'friendly-town.html', label: 'Friendly Town Article', group: 'Editorial & Content' },
    { file: 'town-notice-board.html', label: 'Town Notice Board', group: 'Editorial & Content' },
    { file: 'orchard-morning-briefing.html', label: 'Morning Briefing', group: 'Editorial & Content' },
    { file: 'orchard-research-report.html', label: 'Scholar Field Report', group: 'Editorial & Content' },
    { file: 'hearthside-commons.html', label: 'Hearthside Commons', group: 'App Dashboards' },
    { file: 'command-center.html', label: 'Command Center', group: 'App Dashboards' },
    { file: 'guildhall-project-board.html', label: 'Guildhall Project Board', group: 'App Dashboards' },
    { file: 'prosperity-grove-ledger.html', label: 'Prosperity Grove Ledger', group: 'App Dashboards' },
    { file: 'scholars-hollow-workbench.html', label: "Scholar's Hollow Workbench", group: 'App Dashboards' },
    { file: 'character-gallery.html', label: 'Character Registry', group: 'Kit Reference' },
    { file: 'asset-pattern-library.html', label: 'Asset Pattern Library', group: 'Kit Reference' }
  ];

  var dialogTriggers = typeof WeakMap === 'function' ? new WeakMap() : null;
  var liveRegions = {};
  var globalListenersBound = false;

  /* ------------------------------------------------------------------------ */
  /* Live region announcements                                                */
  /* ------------------------------------------------------------------------ */

  function getLiveRegion(politeness) {
    var mode = politeness === 'assertive' ? 'assertive' : 'polite';
    if (liveRegions[mode] && liveRegions[mode].isConnected) {
      return liveRegions[mode];
    }
    var existing = document.getElementById('ov-live-' + mode);
    if (existing) {
      liveRegions[mode] = existing;
      return existing;
    }
    var el = document.createElement('div');
    el.id = 'ov-live-' + mode;
    el.className = 'ov-sr-only';
    el.setAttribute('aria-live', mode);
    el.setAttribute('aria-atomic', 'true');
    if (mode === 'assertive') {
      el.setAttribute('role', 'alert');
    } else {
      el.setAttribute('role', 'status');
    }
    (document.body || document.documentElement).appendChild(el);
    liveRegions[mode] = el;
    return el;
  }

  function announce(message, politeness) {
    if (!message || typeof document === 'undefined') return;
    var region = getLiveRegion(politeness);
    region.textContent = '';
    window.setTimeout(function () {
      region.textContent = String(message);
    }, 30);
  }

  /* ------------------------------------------------------------------------ */
  /* Toast notifications                                                      */
  /* ------------------------------------------------------------------------ */

  function getToastRegion() {
    var region = document.querySelector('.ov-toast-region');
    if (region) return region;
    region = document.createElement('div');
    region.className = 'ov-toast-region';
    region.setAttribute('aria-label', 'Notifications');
    (document.body || document.documentElement).appendChild(region);
    return region;
  }

  function toast(message, tone, options) {
    if (!message || typeof document === 'undefined') return null;
    var opts = options && typeof options === 'object' ? options : {};
    var kind = tone || 'success';
    var duration = typeof opts.duration === 'number' ? opts.duration : 4200;

    var region = getToastRegion();
    var el = document.createElement('div');
    el.className = 'ov-toast' + (kind === 'info' || kind === 'warning' || kind === 'danger' ? ' ov-toast--' + kind : '');

    var dot = document.createElement('span');
    dot.setAttribute('aria-hidden', 'true');
    var dotMod = kind === 'warning' ? 'ov-status-dot--warn'
      : kind === 'danger' ? 'ov-status-dot--bad'
      : kind === 'info' ? ''
      : 'ov-status-dot--good';
    dot.className = 'ov-status-dot' + (dotMod ? ' ' + dotMod : '');

    var body = document.createElement('div');
    body.textContent = String(message);

    var closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'ov-toast__close';
    closeBtn.setAttribute('aria-label', 'Dismiss notification');
    closeBtn.textContent = '\u00d7';

    el.appendChild(dot);
    el.appendChild(body);
    el.appendChild(closeBtn);
    region.appendChild(el);

    var dismissed = false;
    var timer = null;

    function dismiss() {
      if (dismissed) return;
      dismissed = true;
      if (timer) window.clearTimeout(timer);
      el.classList.add('is-leaving');
      window.setTimeout(function () {
        if (el.parentNode) el.parentNode.removeChild(el);
      }, 220);
    }

    function scheduleDismiss() {
      if (duration > 0 && !dismissed) {
        if (timer) window.clearTimeout(timer);
        timer = window.setTimeout(dismiss, duration);
      }
    }

    closeBtn.addEventListener('click', dismiss);
    el.addEventListener('mouseenter', function () {
      if (timer) window.clearTimeout(timer);
    });
    el.addEventListener('mouseleave', scheduleDismiss);
    el.addEventListener('focusin', function () {
      if (timer) window.clearTimeout(timer);
    });
    el.addEventListener('focusout', scheduleDismiss);

    scheduleDismiss();

    if (opts.announce !== false) {
      announce(message, kind === 'danger' ? 'assertive' : 'polite');
    }

    return { element: el, dismiss: dismiss };
  }

  /* ------------------------------------------------------------------------ */
  /* Accessible tabs ([data-ov-tabs])                                         */
  /* ------------------------------------------------------------------------ */

  function initTabsContainer(container) {
    if (!container || container.getAttribute('data-ov-tabs-ready') === 'true') return;

    var tablist = container.querySelector('[role="tablist"]');
    if (!tablist) return;

    var tabs = Array.prototype.slice.call(tablist.querySelectorAll('[role="tab"]'));
    if (!tabs.length) return;

    container.setAttribute('data-ov-tabs-ready', 'true');

    var useHash = container.hasAttribute('data-ov-tabs-hash');
    var vertical = tablist.getAttribute('aria-orientation') === 'vertical';

    function getPanelForTab(tab, index) {
      var controls = tab.getAttribute('aria-controls');
      if (controls) {
        var byId = document.getElementById(controls);
        if (byId) return byId;
      }
      var panels = container.querySelectorAll('[role="tabpanel"]');
      return panels[index] || null;
    }

    function activate(targetIndex, moveFocus, updateHash) {
      var idx = Math.max(0, Math.min(targetIndex, tabs.length - 1));
      var activeTab = tabs[idx];
      var activePanel = null;

      tabs.forEach(function (tab, i) {
        var selected = i === idx;
        tab.setAttribute('aria-selected', selected ? 'true' : 'false');
        tab.setAttribute('tabindex', selected ? '0' : '-1');
        var panel = getPanelForTab(tab, i);
        if (panel) {
          panel.hidden = !selected;
          if (selected) activePanel = panel;
        }
      });

      if (moveFocus && activeTab && typeof activeTab.focus === 'function') {
        activeTab.focus();
      }

      if (updateHash && useHash && activeTab) {
        var key = activeTab.getAttribute('data-ov-tab-key')
          || activeTab.getAttribute('aria-controls')
          || activeTab.id;
        if (key && window.history && typeof window.history.replaceState === 'function') {
          try {
            window.history.replaceState(null, '', '#' + key);
          } catch (_err) {
            // Ignore restricted history updates in strict file:// contexts.
          }
        }
      }

      if (typeof CustomEvent === 'function') {
        container.dispatchEvent(new CustomEvent('ov:tabchange', {
          bubbles: true,
          detail: { tab: activeTab, panel: activePanel, index: idx }
        }));
      }
    }

    function indexFromHash() {
      if (!useHash || !window.location.hash) return -1;
      var raw = window.location.hash.slice(1);
      if (!raw) return -1;
      for (var i = 0; i < tabs.length; i++) {
        var t = tabs[i];
        if (
          t.getAttribute('data-ov-tab-key') === raw ||
          t.getAttribute('aria-controls') === raw ||
          t.id === raw
        ) {
          return i;
        }
      }
      return -1;
    }

    tabs.forEach(function (tab, idx) {
      tab.addEventListener('click', function (event) {
        if (tab.tagName === 'A') event.preventDefault();
        activate(idx, false, true);
      });

      tab.addEventListener('keydown', function (event) {
        var nextKey = vertical ? 'ArrowDown' : 'ArrowRight';
        var prevKey = vertical ? 'ArrowUp' : 'ArrowLeft';
        var target = -1;

        if (event.key === nextKey) {
          target = (idx + 1) % tabs.length;
        } else if (event.key === prevKey) {
          target = (idx - 1 + tabs.length) % tabs.length;
        } else if (event.key === 'Home') {
          target = 0;
        } else if (event.key === 'End') {
          target = tabs.length - 1;
        }

        if (target !== -1) {
          event.preventDefault();
          activate(target, true, true);
        }
      });
    });

    var hashIndex = indexFromHash();
    var initial = hashIndex !== -1
      ? hashIndex
      : tabs.findIndex(function (t) { return t.getAttribute('aria-selected') === 'true'; });
    activate(initial !== -1 ? initial : 0, false, false);

    if (useHash) {
      window.addEventListener('hashchange', function () {
        var idx = indexFromHash();
        if (idx !== -1) activate(idx, false, false);
      });
    }

    container._ovActivateTab = function (indexOrId) {
      if (typeof indexOrId === 'number') {
        activate(indexOrId, false, true);
        return;
      }
      var match = tabs.findIndex(function (t) {
        return t.id === indexOrId || t.getAttribute('aria-controls') === indexOrId || t.getAttribute('data-ov-tab-key') === indexOrId;
      });
      if (match !== -1) activate(match, false, true);
    };
  }

  /* ------------------------------------------------------------------------ */
  /* Dialog helpers                                                           */
  /* ------------------------------------------------------------------------ */

  function resolveDialog(target) {
    if (!target) return null;
    if (typeof target === 'string') return document.getElementById(target);
    return target;
  }

  function wireDialog(dialog) {
    if (!dialog || dialog.getAttribute('data-ov-dialog-ready') === 'true') return;
    dialog.setAttribute('data-ov-dialog-ready', 'true');

    dialog.addEventListener('click', function (event) {
      if (dialog.hasAttribute('data-ov-dialog-static')) return;
      if (event.target !== dialog) return;
      var rect = dialog.getBoundingClientRect();
      var inside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;
      if (!inside) closeDialog(dialog);
    });

    dialog.addEventListener('close', function () {
      var trigger = dialogTriggers ? dialogTriggers.get(dialog) : null;
      if (trigger && trigger.isConnected && typeof trigger.focus === 'function') {
        trigger.focus();
      }
      if (dialogTriggers) dialogTriggers.delete(dialog);
    });
  }

  function openDialog(target, trigger) {
    var dialog = resolveDialog(target);
    if (!dialog) return false;
    wireDialog(dialog);
    var opener = trigger || document.activeElement;
    if (dialogTriggers && opener && opener !== document.body) {
      dialogTriggers.set(dialog, opener);
    }
    if (typeof dialog.showModal === 'function') {
      if (!dialog.open) dialog.showModal();
    } else {
      dialog.setAttribute('open', '');
    }
    return true;
  }

  function closeDialog(target) {
    var dialog = resolveDialog(target);
    if (!dialog) return false;
    if (typeof dialog.close === 'function') {
      if (dialog.open) dialog.close();
    } else {
      dialog.removeAttribute('open');
    }
    return true;
  }

  /* ------------------------------------------------------------------------ */
  /* Copy to clipboard ([data-ov-copy])                                       */
  /* ------------------------------------------------------------------------ */

  function copyText(text) {
    var value = String(text == null ? '' : text);
    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      return navigator.clipboard.writeText(value).catch(function () {
        return legacyCopy(value);
      });
    }
    return Promise.resolve(legacyCopy(value));
  }

  function legacyCopy(value) {
    var area = document.createElement('textarea');
    area.value = value;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.top = '-9999px';
    area.style.left = '-9999px';
    document.body.appendChild(area);
    area.select();
    var ok = false;
    try {
      ok = document.execCommand('copy');
    } catch (_err) {
      ok = false;
    }
    document.body.removeChild(area);
    if (!ok) throw new Error('Clipboard copy failed');
    return true;
  }

  function handleCopyTrigger(trigger) {
    var targetSelector = trigger.getAttribute('data-ov-copy-target');
    var value = '';
    if (targetSelector) {
      var target = document.querySelector(targetSelector);
      if (target) {
        value = 'value' in target && target.value !== undefined ? target.value : target.textContent;
      }
    } else {
      value = trigger.getAttribute('data-ov-copy');
      if (!value) value = trigger.textContent;
    }
    value = (value || '').trim();
    if (!value) return;

    copyText(value).then(function () {
      var labelHost = trigger.querySelector('[data-ov-copy-label]') || trigger;
      var original = labelHost.getAttribute('data-ov-copy-orig');
      if (original === null) {
        original = labelHost.textContent;
        labelHost.setAttribute('data-ov-copy-orig', original);
      }
      var doneLabel = trigger.getAttribute('data-ov-copy-done') || 'Copied!';
      labelHost.textContent = doneLabel;

      if (trigger._ovCopyTimer) window.clearTimeout(trigger._ovCopyTimer);
      trigger._ovCopyTimer = window.setTimeout(function () {
        labelHost.textContent = original;
      }, 1800);

      var toastMsg = trigger.getAttribute('data-ov-copy-toast') || 'Copied to clipboard.';
      toast(toastMsg, 'success');
    }, function () {
      toast('Could not copy automatically. Select and copy the text manually.', 'warning');
    });
  }

  /* ------------------------------------------------------------------------ */
  /* Shared demo bar ([data-ov-demo-bar])                                     */
  /* ------------------------------------------------------------------------ */

  function detectLocationContext(bar) {
    var path = (window.location && window.location.pathname ? window.location.pathname : '').replace(/\\/g, '/');
    var explicitRoot = bar.getAttribute('data-ov-demo-root');
    var inStarter = /\/starter\//i.test(path);
    var inDemo = /\/demo\//i.test(path);
    var fileName = path.split('/').pop() || 'index.html';

    if (explicitRoot === 'starter' || (!explicitRoot && inStarter)) {
      return {
        zone: 'starter',
        currentKey: 'starter',
        demoPrefix: '../demo/',
        starterHref: 'index.html',
        crestSrc: '../src/assets/orchard-vale/heraldry/crest-orchard-tree-fullcolor-512.webp'
      };
    }

    if (explicitRoot === 'root' || (!explicitRoot && !inDemo)) {
      return {
        zone: 'root',
        currentKey: 'root',
        demoPrefix: 'demo/',
        starterHref: 'starter/index.html',
        crestSrc: 'src/assets/orchard-vale/heraldry/crest-orchard-tree-fullcolor-512.webp'
      };
    }

    return {
      zone: 'demo',
      currentKey: fileName.toLowerCase(),
      demoPrefix: '',
      starterHref: '../starter/index.html',
      crestSrc: '../src/assets/orchard-vale/heraldry/crest-orchard-tree-fullcolor-512.webp'
    };
  }

  function enhanceDemoBar(bar) {
    if (!bar || bar.getAttribute('data-ov-demo-bar-ready') === 'true') return;
    bar.setAttribute('data-ov-demo-bar-ready', 'true');

    if (!bar.classList.contains('ov-demo-bar')) {
      bar.classList.add('ov-demo-bar');
    }
    if (!bar.getAttribute('aria-label')) {
      bar.setAttribute('aria-label', 'Orchard Vale demo navigation');
    }

    var ctx = detectLocationContext(bar);

    // Preserve any page-provided action slot before building the bar.
    var preservedActions = bar.querySelector('[data-ov-demo-actions]');
    if (preservedActions && preservedActions.parentNode) {
      preservedActions.parentNode.removeChild(preservedActions);
    }

    var matched = null;
    for (var i = 0; i < DEMO_CATALOG.length; i++) {
      if (DEMO_CATALOG[i].file === ctx.currentKey) {
        matched = DEMO_CATALOG[i];
        break;
      }
    }

    var currentLabel = bar.getAttribute('data-ov-demo-current')
      || (ctx.zone === 'starter' ? 'Starter Kit' : (matched ? matched.label : document.title.replace(/^Orchard Vale\s*[—:-]?\s*/i, '') || 'Demo'));

    bar.textContent = '';

    var backLink = document.createElement('a');
    backLink.className = 'ov-demo-bar__back';
    backLink.href = ctx.demoPrefix + 'index.html';
    backLink.textContent = '\u2190 All Demos';
    bar.appendChild(backLink);

    var brand = document.createElement('span');
    brand.className = 'ov-demo-bar__brand';
    var crest = document.createElement('img');
    crest.src = ctx.crestSrc;
    crest.alt = '';
    crest.width = 26;
    crest.height = 26;
    crest.decoding = 'async';
    var brandText = document.createElement('span');
    brandText.className = 'ov-demo-bar__brand-text';
    brandText.textContent = 'Orchard Vale';
    brand.appendChild(crest);
    brand.appendChild(brandText);
    bar.appendChild(brand);

    var badge = document.createElement('span');
    badge.className = 'ov-demo-bar__current';
    badge.textContent = currentLabel;
    bar.appendChild(badge);

    var form = document.createElement('form');
    form.className = 'ov-demo-bar__jump';
    var selectId = 'ov-demo-jump-' + Math.random().toString(36).slice(2, 7);

    var label = document.createElement('label');
    label.setAttribute('for', selectId);
    label.textContent = 'Jump to';

    var select = document.createElement('select');
    select.id = selectId;
    select.className = 'ov-demo-bar__select';
    select.setAttribute('aria-label', 'Jump to another Orchard Vale page');

    var groups = {};
    DEMO_CATALOG.forEach(function (entry) {
      if (!groups[entry.group]) {
        groups[entry.group] = document.createElement('optgroup');
        groups[entry.group].label = entry.group;
        select.appendChild(groups[entry.group]);
      }
      var opt = document.createElement('option');
      opt.value = ctx.demoPrefix + entry.file;
      opt.textContent = entry.label;
      if (ctx.zone === 'demo' && entry.file === ctx.currentKey) {
        opt.selected = true;
      }
      groups[entry.group].appendChild(opt);
    });

    var starterGroup = document.createElement('optgroup');
    starterGroup.label = 'Adoption';
    var starterOpt = document.createElement('option');
    starterOpt.value = ctx.starterHref;
    starterOpt.textContent = 'Starter Kit';
    if (ctx.zone === 'starter') starterOpt.selected = true;
    starterGroup.appendChild(starterOpt);
    select.appendChild(starterGroup);

    var goBtn = document.createElement('button');
    goBtn.type = 'submit';
    goBtn.className = 'ov-demo-bar__go';
    goBtn.textContent = 'Go';

    // Mouse selection navigates immediately; keyboard arrowing waits for Enter / Go (WCAG 3.2.2).
    var keyboardNavigating = false;
    select.addEventListener('keydown', function (event) {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'Home' || event.key === 'End') {
        keyboardNavigating = true;
      } else if (event.key === 'Enter') {
        keyboardNavigating = false;
      }
    });
    select.addEventListener('pointerdown', function () {
      keyboardNavigating = false;
    });
    select.addEventListener('change', function () {
      if (!keyboardNavigating && select.value) {
        window.location.href = select.value;
      }
    });

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (select.value) {
        window.location.href = select.value;
      }
    });

    form.appendChild(label);
    form.appendChild(select);
    form.appendChild(goBtn);
    bar.appendChild(form);

    if (ctx.zone !== 'starter') {
      var starterLink = document.createElement('a');
      starterLink.className = 'ov-demo-bar__starter';
      starterLink.href = ctx.starterHref;
      starterLink.textContent = 'Starter Kit';
      bar.appendChild(starterLink);
    }

    if (preservedActions) {
      preservedActions.classList.add('ov-demo-bar__actions');
      bar.appendChild(preservedActions);
    }
  }

  /* ------------------------------------------------------------------------ */
  /* Delegated clicks & Escape tooltip dismissal                              */
  /* ------------------------------------------------------------------------ */

  function bindGlobalListeners() {
    if (globalListenersBound || typeof document === 'undefined') return;
    globalListenersBound = true;

    document.addEventListener('click', function (event) {
      var target = event.target;
      if (!target || typeof target.closest !== 'function') return;

      var openTrigger = target.closest('[data-ov-dialog-open]');
      if (openTrigger) {
        event.preventDefault();
        openDialog(openTrigger.getAttribute('data-ov-dialog-open'), openTrigger);
        return;
      }

      var closeTrigger = target.closest('[data-ov-dialog-close]');
      if (closeTrigger) {
        event.preventDefault();
        var explicitId = closeTrigger.getAttribute('data-ov-dialog-close');
        var dialog = explicitId ? document.getElementById(explicitId) : closeTrigger.closest('dialog');
        closeDialog(dialog);
        return;
      }

      var copyTrigger = target.closest('[data-ov-copy]');
      if (copyTrigger) {
        event.preventDefault();
        handleCopyTrigger(copyTrigger);
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key !== 'Escape') return;
      var tooltips = document.querySelectorAll('.ov-tooltip:hover, .ov-tooltip:focus-within');
      for (var i = 0; i < tooltips.length; i++) {
        tooltips[i].classList.add('is-dismissed');
      }
    });

    document.addEventListener('pointerout', function (event) {
      var tip = event.target && typeof event.target.closest === 'function' ? event.target.closest('.ov-tooltip.is-dismissed') : null;
      if (tip && !tip.contains(event.relatedTarget)) {
        tip.classList.remove('is-dismissed');
      }
    });

    document.addEventListener('focusout', function (event) {
      var tip = event.target && typeof event.target.closest === 'function' ? event.target.closest('.ov-tooltip.is-dismissed') : null;
      if (tip && !tip.contains(event.relatedTarget)) {
        tip.classList.remove('is-dismissed');
      }
    });
  }

  /* ------------------------------------------------------------------------ */
  /* Initialization & public API                                              */
  /* ------------------------------------------------------------------------ */

  function init(root) {
    if (typeof document === 'undefined') return;
    var scope = root || document;
    bindGlobalListeners();

    var tabGroups = scope.querySelectorAll('[data-ov-tabs]');
    for (var i = 0; i < tabGroups.length; i++) {
      initTabsContainer(tabGroups[i]);
    }

    var dialogs = scope.querySelectorAll('dialog.ov-dialog');
    for (var j = 0; j < dialogs.length; j++) {
      wireDialog(dialogs[j]);
    }

    var bars = scope.querySelectorAll('[data-ov-demo-bar]');
    for (var k = 0; k < bars.length; k++) {
      enhanceDemoBar(bars[k]);
    }
  }

  var api = {
    version: '2.0.0',
    demos: DEMO_CATALOG.slice(),
    init: init,
    announce: announce,
    toast: toast,
    openDialog: openDialog,
    closeDialog: closeDialog,
    copyText: copyText,
    enhanceDemoBar: enhanceDemoBar
  };

  global.OrchardVale = api;

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () { init(document); });
    } else {
      init(document);
    }
  }
})(window);
