/* Orchard Vale Developer Specimen Workbench (demo/asset-pattern-library.html)
   Manifest-driven gallery for all 301 non-character assets, live search,
   surface preview switcher, copy snippets, sprite player, and accessible dialog lightbox. */

(function () {
  'use strict';

  var FAMILY_META = {
    scenes: {
      title: 'Scenes & Illustrated Backdrops',
      kicker: 'Wide 16:9 & Ultrawide 21:9',
      copy: 'Use wide scenes for first-viewport atmosphere, workbench backdrops, and warm editorial context bands.',
      wide: true
    },
    maps: {
      title: 'Maps, Districts & Cartography Controls',
      kicker: 'Backgrounds, Pins, Shields & Routes',
      copy: 'Layer map backgrounds with crisp SVG compasses, pins, shields, and dashed route lines for operational dashboards.',
      wide: true
    },
    backplates: {
      title: 'Backplates, Badges & Ribbons',
      kicker: 'Reusable UI Surfaces',
      copy: 'Structural SVG surfaces for buttons, headers, parchment fields, category tags, and banner ribbons.'
    },
    ornaments: {
      title: 'Ornaments, Corners & Hardware',
      kicker: 'Brass Ivy, Carved Wood, Dividers & Rivets',
      copy: 'Fixed-size decorative accents for ornate panels, scroll dividers, hinges, and brass corners.'
    },
    heraldry: {
      title: 'Crests, Seals & Heraldry',
      kicker: 'Identity, Approval & Trust Marks',
      copy: 'Full-color WebP crests for app identity and colored wax seals for approved, review, urgent, blocked, and draft states.'
    },
    icons: {
      title: '32px Product Icons',
      kicker: 'Actions, Navigation, Status & Workflow',
      copy: 'Practical 32px SVG icons for toolbars, filters, status indicators, exports, and data controls.'
    },
    motifs: {
      title: '96px Domain Motifs',
      kicker: 'AI, CRM, Finance, Ops, Productivity, Project & Research',
      copy: 'Rich 96px illustrations for feature cards, onboarding tours, workspace sections, and category headers.'
    },
    'data-viz': {
      title: 'Data Visualization Pieces',
      kicker: 'Chart Frames, Meters, Timelines & Tooltips',
      copy: 'Handcrafted SVG frames, axes, meter tracks, milestone plaques, and callouts built to wrap real data.'
    },
    textures: {
      title: 'Seamless Textures & Overlays',
      kicker: 'WebP Surface Core & Subtle Ink Speckle',
      copy: 'Layer these textures under CSS color washes to preserve crisp text legibility with tactile paper, wood, brass, and signboard warmth.',
      wide: true
    },
    'empty-states': {
      title: 'Empty States & Spot Illustrations',
      kicker: 'Helpful Zero-Data Moments',
      copy: 'Warm 800px and 512px WebP spot scenes for cleared calendars, completed checklists, sorted inboxes, and empty search results.',
      wide: true
    },
    motion: {
      title: 'Motion Spritesheets & Static Fallbacks',
      kicker: '8-Frame PNG Sheets + Reduced-Motion Stills',
      copy: 'Horizontal 8-frame spritesheets paired with matching static frames for accessible reduced-motion fallbacks.',
      wide: true
    }
  };

  function formatBytes(bytes) {
    if (!bytes && bytes !== 0) return '';
    if (bytes < 1024) return bytes + ' B';
    return (bytes / 1024).toFixed(1) + ' KB';
  }

  function formatDims(asset) {
    var parts = [];
    if (asset.width && asset.height) {
      parts.push(asset.width + '\u00d7' + asset.height + ' px');
    }
    if (typeof asset.bytes === 'number') {
      parts.push(formatBytes(asset.bytes));
    }
    return parts.join(' \u00b7 ');
  }

  function snippetForAsset(asset) {
    var relFromDemo = '../' + asset.path;
    if (asset.family === 'textures') {
      return 'background-image: url("' + relFromDemo + '");';
    }
    var attrs = 'src="' + relFromDemo + '" alt="' + asset.title.replace(/"/g, '&quot;') + '"';
    if (asset.width && asset.height) {
      attrs += ' width="' + asset.width + '" height="' + asset.height + '"';
    }
    attrs += ' decoding="async"';
    return '<img ' + attrs + '>';
  }

  function copyWithFeedback(text, message) {
    if (window.OrchardVale && typeof window.OrchardVale.copyText === 'function') {
      window.OrchardVale.copyText(text).then(function () {
        window.OrchardVale.toast(message, 'success');
      }, function () {
        window.OrchardVale.toast('Could not copy automatically. Please copy manually.', 'warning');
      });
    }
  }

  function initWorkbench() {
    var manifest = Array.isArray(window.ORCHARD_ASSET_MANIFEST) ? window.ORCHARD_ASSET_MANIFEST : [];
    var assets = manifest.filter(function (item) {
      return item && item.family && item.family !== 'characters';
    });

    var shell = document.getElementById('main-content');
    var statTotal = document.getElementById('stat-total-assets');
    var statusEl = document.getElementById('workbench-status');
    var searchInput = document.getElementById('asset-search');
    var searchClear = document.getElementById('search-clear');
    var searchPanel = document.getElementById('search-results-panel');
    var searchGrid = document.getElementById('search-results-grid');
    var searchHeading = document.getElementById('search-results-heading');
    var searchEmpty = document.getElementById('search-empty-state');
    var searchEmptyCopy = document.getElementById('search-empty-copy');
    var searchResetBtn = document.getElementById('search-results-reset');
    var searchEmptyReset = document.getElementById('search-empty-reset');
    var tabsPanel = document.getElementById('workbench-tabs-panel');

    if (statTotal) statTotal.textContent = String(assets.length);
    if (statusEl) {
      statusEl.textContent = 'Loaded ' + assets.length + ' non-character deliverables across 11 families.';
    }

    // Group assets by family.
    var byFamily = {};
    var byId = {};
    assets.forEach(function (asset) {
      byId[asset.id] = asset;
      if (!byFamily[asset.family]) byFamily[asset.family] = [];
      byFamily[asset.family].push(asset);
    });

    // Track active lightbox collection + index.
    var lightboxList = [];
    var lightboxIndex = 0;
    var activeSurface = 'parchment';

    var lightbox = document.getElementById('asset-lightbox');
    var lbTitle = document.getElementById('lightbox-title');
    var lbCounter = document.getElementById('lightbox-counter');
    var lbStage = document.getElementById('lightbox-stage');
    var lbImage = document.getElementById('lightbox-image');
    var lbChips = document.getElementById('lightbox-chips');
    var lbPath = document.getElementById('lightbox-path');
    var lbPrev = document.getElementById('lightbox-prev');
    var lbNext = document.getElementById('lightbox-next');
    var lbZoomToggle = document.getElementById('lightbox-zoom-toggle');
    var lbCopyPath = document.getElementById('lightbox-copy-path');
    var lbCopySnippet = document.getElementById('lightbox-copy-snippet');

    function setSurface(surface) {
      activeSurface = surface;
      if (shell) shell.setAttribute('data-surface', surface);
      if (lightbox) lightbox.setAttribute('data-surface', surface);

      var toolbarBtns = document.querySelectorAll('[data-surface-choice]');
      Array.prototype.forEach.call(toolbarBtns, function (btn) {
        btn.setAttribute('aria-pressed', btn.getAttribute('data-surface-choice') === surface ? 'true' : 'false');
      });

      var lbBtns = document.querySelectorAll('[data-lb-surface]');
      Array.prototype.forEach.call(lbBtns, function (btn) {
        btn.setAttribute('aria-pressed', btn.getAttribute('data-lb-surface') === surface ? 'true' : 'false');
      });
    }

    function setLightboxZoom(actualSize) {
      if (!lbStage || !lbZoomToggle) return;
      lbStage.classList.toggle('is-actual-size', actualSize);
      lbZoomToggle.setAttribute('aria-pressed', actualSize ? 'true' : 'false');
      lbZoomToggle.textContent = actualSize ? 'Fit to Screen' : '100% Actual Size';
    }

    function renderLightboxAsset() {
      var asset = lightboxList[lightboxIndex];
      if (!asset) return;

      if (lbTitle) lbTitle.textContent = asset.title;
      if (lbCounter) lbCounter.textContent = (lightboxIndex + 1) + ' / ' + lightboxList.length;
      if (lbImage) {
        lbImage.src = '../' + asset.path;
        lbImage.alt = asset.title;
      }
      if (lbPath) lbPath.textContent = asset.path;

      if (lbChips) {
        lbChips.textContent = '';
        var chips = [
          { label: asset.family, cls: 'ov-chip ov-chip--green' },
          { label: asset.subpack, cls: 'ov-chip ov-chip--amber' },
          { label: (asset.format || '').toUpperCase(), cls: 'ov-chip ov-chip--blue' },
          { label: formatDims(asset), cls: 'ov-chip' }
        ];
        chips.forEach(function (info) {
          if (!info.label) return;
          var span = document.createElement('span');
          span.className = info.cls;
          span.textContent = info.label;
          lbChips.appendChild(span);
        });
      }

      if (lbPrev) lbPrev.disabled = lightboxList.length <= 1;
      if (lbNext) lbNext.disabled = lightboxList.length <= 1;
      if (lbStage) lbStage.scrollTo({ top: 0, left: 0 });
    }

    function openAssetLightbox(assetId, collection, trigger) {
      var list = Array.isArray(collection) && collection.length ? collection : assets;
      var idx = list.findIndex(function (item) { return item.id === assetId; });
      if (idx === -1) {
        list = assets;
        idx = list.findIndex(function (item) { return item.id === assetId; });
      }
      if (idx === -1) return;

      lightboxList = list;
      lightboxIndex = idx;
      setLightboxZoom(false);
      setSurface(activeSurface);
      renderLightboxAsset();

      if (window.OrchardVale && typeof window.OrchardVale.openDialog === 'function') {
        window.OrchardVale.openDialog(lightbox, trigger);
      } else if (lightbox && typeof lightbox.showModal === 'function') {
        lightbox.showModal();
      }
    }

    function stepLightbox(delta) {
      if (lightboxList.length <= 1) return;
      lightboxIndex = (lightboxIndex + delta + lightboxList.length) % lightboxList.length;
      renderLightboxAsset();
    }

    function buildAssetCard(asset, collection, wideCard) {
      var card = document.createElement('article');
      var cardClasses = ['ov-card', 'ov-card--interactive', 'asset-card'];
      if (wideCard) cardClasses.push('asset-card--wide');
      if (asset.family === 'textures') cardClasses.push('asset-card--texture');
      card.className = cardClasses.join(' ');
      card.setAttribute('data-subpack', asset.subpack || '');

      var previewBtn = document.createElement('button');
      previewBtn.type = 'button';
      previewBtn.className = 'asset-card__preview';
      previewBtn.setAttribute('aria-label', 'Inspect ' + asset.title + ' in lightbox');
      previewBtn.addEventListener('click', function () {
        openAssetLightbox(asset.id, collection, previewBtn);
      });

      var img = document.createElement('img');
      img.src = '../' + asset.path;
      img.alt = asset.title;
      img.loading = 'lazy';
      img.decoding = 'async';
      previewBtn.appendChild(img);

      var body = document.createElement('div');
      body.className = 'asset-card__body';

      var title = document.createElement('h3');
      title.className = 'asset-card__title';
      title.textContent = asset.title;

      var meta = document.createElement('div');
      meta.className = 'asset-card__meta';

      var subChip = document.createElement('span');
      subChip.className = 'ov-chip ov-chip--amber';
      subChip.textContent = asset.subpack;
      meta.appendChild(subChip);

      var fmtChip = document.createElement('span');
      fmtChip.className = 'ov-chip ov-chip--blue';
      fmtChip.textContent = (asset.format || '').toUpperCase();
      meta.appendChild(fmtChip);

      var dims = document.createElement('p');
      dims.className = 'asset-card__dims';
      dims.textContent = formatDims(asset);

      body.appendChild(title);
      body.appendChild(meta);
      body.appendChild(dims);

      var actions = document.createElement('div');
      actions.className = 'asset-card__actions';

      var copyPathBtn = document.createElement('button');
      copyPathBtn.type = 'button';
      copyPathBtn.className = 'ov-button ov-button--paper ov-button--sm';
      copyPathBtn.textContent = 'Copy Path';
      copyPathBtn.addEventListener('click', function () {
        copyWithFeedback(asset.path, 'Copied path: ' + asset.path);
      });

      var copySnippetBtn = document.createElement('button');
      copySnippetBtn.type = 'button';
      copySnippetBtn.className = 'ov-button ov-button--sm';
      copySnippetBtn.textContent = asset.family === 'textures' ? 'Copy CSS' : 'Copy <img>';
      copySnippetBtn.addEventListener('click', function () {
        copyWithFeedback(snippetForAsset(asset), 'Copied snippet for ' + asset.title + '.');
      });

      actions.appendChild(copyPathBtn);
      actions.appendChild(copySnippetBtn);

      card.appendChild(previewBtn);
      card.appendChild(body);
      card.appendChild(actions);
      return card;
    }

    // Populate each family tab panel from the manifest.
    var familyPanels = document.querySelectorAll('[data-family-panel]');
    Array.prototype.forEach.call(familyPanels, function (panel) {
      var family = panel.getAttribute('data-family-panel');
      var list = byFamily[family] || [];
      var meta = FAMILY_META[family] || { title: family, kicker: family, copy: '' };

      var countBadge = document.querySelector('[data-tab-count="' + family + '"]');
      if (countBadge) countBadge.textContent = String(list.length);

      var banner = document.createElement('div');
      banner.className = 'family-banner';
      var bannerInner = document.createElement('div');

      var kicker = document.createElement('p');
      kicker.className = 'ov-kicker';
      kicker.textContent = meta.kicker;

      var heading = document.createElement('h2');
      heading.textContent = meta.title;

      var desc = document.createElement('p');
      desc.textContent = meta.copy;

      bannerInner.appendChild(kicker);
      bannerInner.appendChild(heading);
      bannerInner.appendChild(desc);
      banner.appendChild(bannerInner);
      panel.appendChild(banner);

      // Compute subpacks for sub-filtering.
      var subpackMap = {};
      list.forEach(function (item) {
        var sp = item.subpack || 'general';
        subpackMap[sp] = (subpackMap[sp] || 0) + 1;
      });
      var subpacks = Object.keys(subpackMap).sort();

      var grid = document.createElement('div');
      grid.className = 'asset-grid' + (meta.wide ? ' asset-grid--wide' : '');

      var currentSubset = list.slice();

      function renderGrid(selectedSubpack) {
        currentSubset = selectedSubpack === 'all'
          ? list.slice()
          : list.filter(function (item) { return item.subpack === selectedSubpack; });

        grid.textContent = '';
        var frag = document.createDocumentFragment();
        currentSubset.forEach(function (asset) {
          frag.appendChild(buildAssetCard(asset, currentSubset, !!meta.wide));
        });
        grid.appendChild(frag);
      }

      if (subpacks.length > 1) {
        var subBar = document.createElement('div');
        subBar.className = 'subpack-bar';
        subBar.setAttribute('role', 'group');
        subBar.setAttribute('aria-label', meta.title + ' subpack filters');

        var countSpan = document.createElement('span');
        countSpan.className = 'subpack-count';
        countSpan.textContent = list.length + ' items';

        var allBtn = document.createElement('button');
        allBtn.type = 'button';
        allBtn.className = 'subpack-pill';
        allBtn.setAttribute('aria-pressed', 'true');
        allBtn.textContent = 'All (' + list.length + ')';

        var pills = [allBtn];
        subBar.appendChild(allBtn);

        subpacks.forEach(function (sp) {
          var btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'subpack-pill';
          btn.setAttribute('aria-pressed', 'false');
          btn.setAttribute('data-sp', sp);
          btn.textContent = sp + ' (' + subpackMap[sp] + ')';
          pills.push(btn);
          subBar.appendChild(btn);
        });

        subBar.appendChild(countSpan);

        pills.forEach(function (pill) {
          pill.addEventListener('click', function () {
            var chosen = pill.getAttribute('data-sp') || 'all';
            pills.forEach(function (p) {
              p.setAttribute('aria-pressed', p === pill ? 'true' : 'false');
            });
            renderGrid(chosen);
            countSpan.textContent = currentSubset.length + ' of ' + list.length + ' items';
          });
        });

        panel.appendChild(subBar);
      }

      renderGrid('all');
      panel.appendChild(grid);
    });

    // Global live search across all 301 assets.
    function runSearch() {
      var raw = searchInput ? searchInput.value : '';
      var query = raw.trim().toLowerCase();

      if (searchClear) searchClear.hidden = !query;

      if (!query) {
        if (searchPanel) searchPanel.hidden = true;
        if (tabsPanel) tabsPanel.hidden = false;
        if (statusEl) {
          statusEl.textContent = 'Showing all ' + assets.length + ' non-character deliverables across 11 families.';
        }
        return;
      }

      var terms = query.split(/\s+/).filter(Boolean);
      var matches = assets.filter(function (asset) {
        var hay = [
          asset.title,
          asset.family,
          asset.subpack,
          asset.id,
          asset.format,
          asset.path
        ].join(' ').toLowerCase();
        return terms.every(function (term) { return hay.indexOf(term) !== -1; });
      });

      if (tabsPanel) tabsPanel.hidden = true;
      if (searchPanel) searchPanel.hidden = false;
      if (searchHeading) {
        searchHeading.textContent = 'Search Results (' + matches.length + ' match' + (matches.length === 1 ? '' : 'es') + ')';
      }
      if (statusEl) {
        statusEl.textContent = 'Found ' + matches.length + ' asset' + (matches.length === 1 ? '' : 's') + ' matching "' + raw.trim() + '".';
      }

      if (searchGrid) searchGrid.textContent = '';

      if (!matches.length) {
        if (searchGrid) searchGrid.hidden = true;
        if (searchEmpty) searchEmpty.hidden = false;
        if (searchEmptyCopy) {
          searchEmptyCopy.textContent = 'No deliverables matched "' + raw.trim() + '". Try searching for icons, motifs, brass, seal, map, or webp.';
        }
        return;
      }

      if (searchEmpty) searchEmpty.hidden = true;
      if (searchGrid) {
        searchGrid.hidden = false;
        var frag = document.createDocumentFragment();
        matches.forEach(function (asset) {
          frag.appendChild(buildAssetCard(asset, matches, false));
        });
        searchGrid.appendChild(frag);
      }
    }

    function clearSearch() {
      if (searchInput) {
        searchInput.value = '';
        searchInput.focus();
      }
      runSearch();
    }

    if (searchInput) searchInput.addEventListener('input', runSearch);
    if (searchClear) searchClear.addEventListener('click', clearSearch);
    if (searchResetBtn) searchResetBtn.addEventListener('click', clearSearch);
    if (searchEmptyReset) searchEmptyReset.addEventListener('click', clearSearch);

    // Surface preview buttons (toolbar + lightbox).
    Array.prototype.forEach.call(document.querySelectorAll('[data-surface-choice]'), function (btn) {
      btn.addEventListener('click', function () {
        setSurface(btn.getAttribute('data-surface-choice') || 'parchment');
      });
    });

    Array.prototype.forEach.call(document.querySelectorAll('[data-lb-surface]'), function (btn) {
      btn.addEventListener('click', function () {
        setSurface(btn.getAttribute('data-lb-surface') || 'parchment');
      });
    });

    // Lightbox controls + keyboard Prev/Next.
    if (lbPrev) lbPrev.addEventListener('click', function () { stepLightbox(-1); });
    if (lbNext) lbNext.addEventListener('click', function () { stepLightbox(1); });

    if (lbZoomToggle) {
      lbZoomToggle.addEventListener('click', function () {
        var nextZoom = lbZoomToggle.getAttribute('aria-pressed') !== 'true';
        setLightboxZoom(nextZoom);
      });
    }

    if (lbCopyPath) {
      lbCopyPath.addEventListener('click', function () {
        var asset = lightboxList[lightboxIndex];
        if (asset) copyWithFeedback(asset.path, 'Copied path: ' + asset.path);
      });
    }

    if (lbCopySnippet) {
      lbCopySnippet.addEventListener('click', function () {
        var asset = lightboxList[lightboxIndex];
        if (asset) copyWithFeedback(snippetForAsset(asset), 'Copied snippet for ' + asset.title + '.');
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

    // Theme v2.0 Recipes & Motion interactive controls.
    var spritesToggle = document.getElementById('sprites-toggle');
    var spriteGrid = document.getElementById('sprite-showcase-grid');
    if (spritesToggle && spriteGrid) {
      spritesToggle.addEventListener('click', function () {
        var paused = spritesToggle.getAttribute('aria-pressed') !== 'true';
        spritesToggle.setAttribute('aria-pressed', paused ? 'true' : 'false');
        spritesToggle.textContent = paused ? 'Play All Sprites' : 'Pause All Sprites';
        var sprites = spriteGrid.querySelectorAll('.ov-sprite');
        Array.prototype.forEach.call(sprites, function (sp) {
          sp.classList.toggle('ov-sprite--paused', paused);
        });
        if (window.OrchardVale && typeof window.OrchardVale.announce === 'function') {
          window.OrchardVale.announce(paused ? 'Motion sprites paused.' : 'Motion sprites playing.', 'polite');
        }
      });
    }

    var toastTrigger = document.getElementById('recipe-toast-trigger');
    if (toastTrigger) {
      toastTrigger.addEventListener('click', function () {
        if (window.OrchardVale && typeof window.OrchardVale.toast === 'function') {
          window.OrchardVale.toast('Primary Orchard Vale action confirmed.', 'success');
        }
      });
    }

    var toggleBtn = document.getElementById('recipe-toggle-btn');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', function () {
        var pressed = toggleBtn.getAttribute('aria-pressed') !== 'true';
        toggleBtn.setAttribute('aria-pressed', pressed ? 'true' : 'false');
        toggleBtn.textContent = pressed ? 'Pressed State On' : 'Toggle Pressed';
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWorkbench);
  } else {
    initWorkbench();
  }
})();
