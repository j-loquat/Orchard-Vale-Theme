(function () {
  'use strict';

  var BASE_OTHER_SECTION_WORDS = 3746;
  var STARTING_TODAY_DELTA = 412;

  var SECTIONS = {
    exec: {
      kicker: 'Village Infrastructure · Executive Summary',
      chapter: 'I. Executive Summary',
      title: 'Core Infrastructure Findings (2022–2025)',
      quote: 'Consistent preventative maintenance saves four gold for every ten spent on emergency rebuilds.',
      cite: '— Archivist Aldous, Summary Review',
      takeaway: 'Road and bridge investments yielded a 31% drop in seasonal freight closures.',
      paragraphs: [
        'Orchard Vale enters the 2025–2026 harvest cycle with its strongest transport reliability in a decade. Across 124 kilometers of surveyed roads and 14 stone-and-timber crossings, 66% of routes now rate Good or Excellent.',
        'While bridge outlays rose to 2,280 gold year-to-date in 2025, unscheduled closure days dropped sharply following the drainage improvements initiated after the 2020 flood season.'
      ]
    },
    intro: {
      kicker: 'Village Infrastructure · Background & Scope',
      chapter: 'II. Introduction',
      title: 'Survey Scope & Archival Methodology',
      quote: 'Every ledger entry tells a fuller story once cross-checked against boots-on-the-road field notes.',
      cite: '— Nara Quickquill, Field Analyst',
      takeaway: 'All 28 indexed sources span 2018 through Spring 2025 across five archival collections.',
      paragraphs: [
        'This study synthesizes 28 verified archival sources—including 9 government records, 6 guild archives, 6 field studies, 3 survey maps, and 4 oral histories—to evaluate rural infrastructure performance.',
        'Measurements follow the standardized Public Works Survey rubric established in 2022 so annual maintenance gold totals can be compared cleanly across quarters.'
      ]
    },
    roads: {
      kicker: 'Village Infrastructure · Verified Field Draft',
      chapter: 'III. Infrastructure Overview',
      title: 'A. Roads & Bridges',
      quote: 'A well-kept road does more than move goods—it moves opportunity.',
      cite: '— Master Tamsin Fieldwarden',
      takeaway: 'Bridge restorations deliver the highest reliability impact per gold invested.',
      paragraphs: [
        'The road network of Orchard Vale is the lifeline of our rural economy, connecting farms, forges, and markets across a diverse landscape. Over the past decade, steady investments in maintenance and bridge restoration have improved reliability, though seasonal wear and funding gaps remain persistent challenges.',
        'Field inspections completed in Spring 2025 confirm that timber-and-stone crossings along the North Road carry 62% of peak harvest freight. Targeted drainage upgrades completed since 2022 have cut spring washout delays nearly in half.'
      ]
    },
    water: {
      kicker: 'Local Ecology & Wildlife · Hydrology Draft',
      chapter: 'III. Infrastructure Overview',
      title: 'B. Water Systems & Millraces',
      quote: 'Clean sluices keep both the flour wheel turning and the lower meadows dry.',
      cite: '— Miller Bramwell, Millrace Log 2024',
      takeaway: 'Watermill efficiency rose 14% after autumn silt-clearing along the East Sluice.',
      paragraphs: [
        'Orchard Vale’s millraces and stone culverts regulate seasonal runoff while powering three cooperative watermills. Silt buildup remains the primary efficiency drag during late summer low-flow weeks.',
        'Coordinated guild maintenance schedules introduced in 2024 reduced unscheduled watermill downtime and protected low-lying orchard lanes from autumn pooling.'
      ]
    },
    buildings: {
      kicker: 'Village Infrastructure · Civic Assets',
      chapter: 'III. Infrastructure Overview',
      title: 'C. Public Buildings & Granaries',
      quote: 'Dry rafters preserve a harvest far better than any hurried autumn sale.',
      cite: '— Guildhall Steward Ledger, 2024',
      takeaway: 'Roof resealing on the West Granary cut moisture spoilage to under 1.2%.',
      paragraphs: [
        'Municipal structures—including the Guildhall, two cooperative granaries, and the market colonnade—have transitioned to a five-year slate and timber inspection cadence.',
        'Energy and winter heating records indicate that shutter weatherproofing completed in 2023 trimmed firewood demand by nearly one-fifth.'
      ]
    },
    impact: {
      kicker: 'Agrarian Economies · Trade & Yield',
      chapter: 'IV. Economic Impact',
      title: 'Market Access & Harvest Freight',
      quote: 'When the North Bridge stays open through rain, every orchard keeps its price.',
      cite: '— Orchard Growers Exchange, 2025',
      takeaway: 'Reliable crossings shaved 45 minutes off average market-day wagon turnarounds.',
      paragraphs: [
        'Lower transit friction directly expands market-day attendance and preserves perishable fruit quality. Guild exchange logs show steadier weekly volumes whenever road conditions remain above Fair.',
        'Maintenance funding of 5,260 gold YTD in 2025 represents less than 4% of annual cooperative trade volume while safeguarding core regional supply links.'
      ]
    },
    recs: {
      kicker: 'Village Infrastructure · Policy Recommendations',
      chapter: 'V. Recommendations',
      title: '2025–2026 Capital Priorities',
      quote: 'Prioritize the ten percent in poor repair before winter frost widens every crack.',
      cite: '— Public Works Council Memo, 2025',
      takeaway: 'Rehabilitating 12 km of Needs Repair roads should lead the autumn work slate.',
      paragraphs: [
        'First, allocate 60% of autumn reserve funds toward the 12 kilometers (10%) currently rated Needs Repair, prioritizing approaches to the North and Millstream crossings.',
        'Second, formalize joint winter impassability logging with courier routes so maintenance crews can stage gravel and timber before spring thaw.'
      ]
    }
  };

  var TOPIC_SECTION_MAP = {
    history: 'intro',
    ecology: 'water',
    infrastructure: 'roads',
    economy: 'impact',
    folklore: 'buildings'
  };

  var EVIDENCE_DATA = [
    {
      id: 'ev-1',
      title: 'Public Works Annual Report',
      year: 2025,
      collection: 'Government Records',
      relevance: 'high',
      pages: 'p. 14',
      topic: 'infrastructure',
      keywords: 'road maintenance costs bridge survey public works gold',
      icon: '../src/assets/orchard-vale/motifs/research/motif-research-evidence-card-96.svg',
      citation: 'Public Works Annual Report, 2025, p. 14.'
    },
    {
      id: 'ev-2',
      title: 'Field Survey: North Road',
      year: 2024,
      collection: 'Field Studies',
      relevance: 'medium',
      pages: 'pp. 7–9',
      topic: 'infrastructure',
      keywords: 'road maintenance north road winter survey impassability',
      icon: '../src/assets/orchard-vale/motifs/research/motif-research-scroll-96.svg',
      citation: 'Field Survey Notes, Master Tamsin Fieldwarden, 2024, pp. 7–9.'
    },
    {
      id: 'ev-3',
      title: 'Bridge Restoration Ledger',
      year: 2023,
      collection: 'Government Records',
      relevance: 'high',
      pages: 'p. 3',
      topic: 'infrastructure',
      keywords: 'bridge restoration ledger road maintenance costs flood',
      icon: '../src/assets/orchard-vale/icons/icon-data-ledger-32.svg',
      citation: 'Bridge Restoration Ledger, 2023, p. 3.'
    },
    {
      id: 'ev-4',
      title: 'Millrace & Watermill Efficiency Audit',
      year: 2024,
      collection: 'Guild Archives',
      relevance: 'high',
      pages: 'pp. 18–21',
      topic: 'ecology',
      keywords: 'watermill efficiency millrace sluice culvert hydrology',
      icon: '../src/assets/orchard-vale/data-viz/category-symbol-leaf.svg',
      citation: 'Millrace & Watermill Efficiency Audit, Guild Archives, 2024, pp. 18–21.'
    },
    {
      id: 'ev-5',
      title: "Travellers' Diary (M. Thistle)",
      year: 2022,
      collection: 'Oral Histories',
      relevance: 'medium',
      pages: 'p. 11',
      topic: 'history',
      keywords: 'travellers diary oral histories road market wagon trade',
      icon: '../src/assets/orchard-vale/motifs/research/motif-research-books-96.svg',
      citation: "Travellers' Diary (M. Thistle), Oral Histories, 2022, p. 11."
    }
  ];

  var DONUT_INFO = {
    excellent: { value: '35 km', label: 'Excellent (28%)' },
    good: { value: '47 km', label: 'Good (38%)' },
    fair: { value: '30 km', label: 'Fair (24%)' },
    repair: { value: '12 km', label: 'Needs Repair (10%)' }
  };

  var state = {
    activeSection: 'roads',
    activeTopic: 'infrastructure',
    searchQuery: '',
    relevanceFilter: 'all',
    timeFilter: 'all',
    savedProseHtml: {},
    initialSectionWords: 0,
    factCheckRunning: false,
    factChecked: false,
    published: false,
    exportMode: 'markdown',
    evidence: EVIDENCE_DATA.slice()
  };

  function toast(msg, tone) {
    if (window.OrchardVale && typeof window.OrchardVale.toast === 'function') {
      window.OrchardVale.toast(msg, tone || 'success');
    }
  }

  function currentTimeLabel() {
    var now = new Date();
    var hours = now.getHours();
    var mins = String(now.getMinutes()).padStart(2, '0');
    var suffix = hours >= 12 ? 'PM' : 'AM';
    var h12 = hours % 12 || 12;
    return h12 + ':' + mins + ' ' + suffix;
  }

  function countWords(text) {
    var cleaned = (text || '').trim();
    if (!cleaned) return 0;
    return cleaned.split(/\s+/).filter(Boolean).length;
  }

  function prependUpdate(description) {
    var list = document.getElementById('recent-updates-list');
    if (!list) return;
    var row = document.createElement('div');
    var dt = document.createElement('dt');
    var dd = document.createElement('dd');
    dt.textContent = currentTimeLabel();
    dd.textContent = description;
    row.appendChild(dt);
    row.appendChild(dd);
    list.insertBefore(row, list.firstChild);
    while (list.children.length > 5) {
      list.removeChild(list.lastChild);
    }
  }

  function updateMetricsFromProse() {
    var prose = document.getElementById('report-prose');
    if (!prose) return;
    var currentWords = countWords(prose.textContent);
    var deltaDiff = currentWords - state.initialSectionWords;
    var totalWords = BASE_OTHER_SECTION_WORDS + currentWords;
    var todayDelta = Math.max(0, STARTING_TODAY_DELTA + deltaDiff);

    var metricWords = document.getElementById('metric-words');
    var metricDelta = document.getElementById('metric-words-delta');
    var wordBadge = document.getElementById('editor-word-badge');
    var savedTime = document.getElementById('last-saved-time');

    if (metricWords) metricWords.textContent = totalWords.toLocaleString('en-US');
    if (metricDelta) metricDelta.textContent = '+' + todayDelta.toLocaleString('en-US') + ' today';
    if (wordBadge) wordBadge.textContent = currentWords + ' words in section';
    if (savedTime && deltaDiff !== 0) savedTime.textContent = 'Last saved: ' + currentTimeLabel();
  }

  function switchSection(sectionKey, announceChange) {
    var data = SECTIONS[sectionKey];
    if (!data) return;

    var prose = document.getElementById('report-prose');
    if (prose) {
      state.savedProseHtml[state.activeSection] = prose.innerHTML;
    }

    state.activeSection = sectionKey;

    var kicker = document.getElementById('report-topic-kicker');
    var chapter = document.getElementById('report-chapter-title');
    var title = document.getElementById('report-section-title');
    var quote = document.getElementById('section-quote');
    var cite = document.getElementById('section-quote-cite');
    var takeaway = document.getElementById('section-takeaway');

    if (kicker) kicker.textContent = data.kicker;
    if (chapter) chapter.textContent = data.chapter;
    if (title) title.textContent = data.title;
    if (quote) quote.textContent = data.quote;
    if (cite) cite.textContent = data.cite;
    if (takeaway) takeaway.textContent = data.takeaway;

    if (prose) {
      if (state.savedProseHtml[sectionKey]) {
        prose.innerHTML = state.savedProseHtml[sectionKey];
      } else {
        prose.innerHTML = '';
        data.paragraphs.forEach(function (para, idx) {
          var p = document.createElement('p');
          if (idx === 0) p.className = 'lead';
          p.textContent = para;
          prose.appendChild(p);
        });
      }
      state.initialSectionWords = countWords(prose.textContent);
      updateMetricsFromProse();
    }

    var buttons = document.querySelectorAll('#report-sections-list .section-btn');
    buttons.forEach(function (btn) {
      var isMatch = btn.getAttribute('data-section') === sectionKey && !btn.classList.contains('is-open');
      btn.classList.toggle('is-selected', isMatch);
      if (isMatch) {
        btn.setAttribute('aria-current', 'true');
      } else {
        btn.removeAttribute('aria-current');
      }
    });

    if (announceChange) {
      toast('Opened section: ' + data.title, 'info');
    }
  }

  function matchesTimeFilter(year, range) {
    if (range === '2024-2026') return year >= 2024 && year <= 2026;
    if (range === '2022-2023') return year >= 2022 && year <= 2023;
    if (range === '2018-2021') return year >= 2018 && year <= 2021;
    return true;
  }

  function renderEvidenceAndCitations() {
    var listEl = document.getElementById('evidence-list');
    var emptyEl = document.getElementById('evidence-empty');
    var emptyMsg = document.getElementById('evidence-empty-msg');
    var countBadge = document.getElementById('evidence-count');
    var citationsList = document.getElementById('citations-list');
    if (!listEl || !emptyEl || !citationsList) return;

    var q = state.searchQuery.trim().toLowerCase();

    var filtered = state.evidence.filter(function (item) {
      if (state.relevanceFilter !== 'all' && item.relevance !== state.relevanceFilter) return false;
      if (!matchesTimeFilter(item.year, state.timeFilter)) return false;
      if (q) {
        var hay = (item.title + ' ' + item.collection + ' ' + item.year + ' ' + item.keywords + ' ' + item.citation).toLowerCase();
        if (hay.indexOf(q) === -1) return false;
      }
      return true;
    });

    listEl.innerHTML = '';
    citationsList.innerHTML = '';

    if (countBadge) {
      countBadge.textContent = filtered.length + ' shown';
    }

    if (filtered.length === 0) {
      emptyEl.hidden = false;
      if (emptyMsg) {
        emptyMsg.textContent = q
          ? 'No evidence cards or citations match "' + state.searchQuery.trim() + '".'
          : 'No evidence cards match the selected relevance and date range.';
      }
      var liEmpty = document.createElement('li');
      liEmpty.className = 'ov-muted';
      liEmpty.textContent = 'No citations match the active filter.';
      citationsList.appendChild(liEmpty);
      return;
    }

    emptyEl.hidden = true;

    filtered.forEach(function (item) {
      var art = document.createElement('article');
      art.className = 'evidence-item';

      var img = document.createElement('img');
      img.src = item.icon;
      img.alt = '';
      img.width = 36;
      img.height = 36;
      img.decoding = 'async';
      img.loading = 'lazy';

      var body = document.createElement('div');
      var title = document.createElement('strong');
      title.className = 'evidence-item__title';
      title.textContent = item.title;

      var meta = document.createElement('span');
      meta.className = 'evidence-item__meta';
      meta.textContent = item.year + ' · ' + item.collection;

      var chip = document.createElement('span');
      chip.className = 'ov-chip ' + (item.relevance === 'high' ? 'ov-chip--green' : 'ov-chip--amber');
      chip.textContent = item.relevance === 'high' ? 'High Relevance' : 'Medium Relevance';

      body.appendChild(title);
      body.appendChild(meta);
      body.appendChild(chip);

      var page = document.createElement('small');
      page.className = 'evidence-item__page';
      page.textContent = item.pages;

      art.appendChild(img);
      art.appendChild(body);
      art.appendChild(page);
      listEl.appendChild(art);

      var li = document.createElement('li');
      li.textContent = item.citation;
      citationsList.appendChild(li);
    });
  }

  function resetAllFilters() {
    state.searchQuery = '';
    state.relevanceFilter = 'all';
    state.timeFilter = 'all';

    var searchInput = document.getElementById('evidence-search');
    var relSelect = document.getElementById('evidence-relevance-filter');
    var timeSelect = document.getElementById('evidence-time-filter');
    if (searchInput) searchInput.value = '';
    if (relSelect) relSelect.value = 'all';
    if (timeSelect) timeSelect.value = 'all';

    document.querySelectorAll('#saved-searches-list .saved-search-btn').forEach(function (btn) {
      btn.classList.remove('is-active');
      btn.setAttribute('aria-pressed', 'false');
    });

    renderEvidenceAndCitations();
    toast('Evidence filters reset.', 'info');
  }

  function applyToolbarCommand(cmd) {
    var prose = document.getElementById('report-prose');
    if (!prose) return;
    prose.focus();

    if (cmd === 'bold' || cmd === 'italic' || cmd === 'underline' || cmd === 'undo' || cmd === 'redo') {
      try {
        document.execCommand(cmd, false, null);
      } catch (_err) {
        // Ignore unsupported execCommand in stripped contexts.
      }
      updateToolbarStates();
      updateMetricsFromProse();
      return;
    }

    var sel = window.getSelection();
    var hasSelectionInProse = sel && sel.rangeCount > 0 && !sel.isCollapsed && prose.contains(sel.anchorNode);

    if (cmd === 'highlight') {
      if (hasSelectionInProse) {
        var range = sel.getRangeAt(0);
        var mark = document.createElement('mark');
        mark.className = 'prose-highlight';
        try {
          range.surroundContents(mark);
        } catch (_err) {
          var frag = range.extractContents();
          mark.appendChild(frag);
          range.insertNode(mark);
        }
        sel.removeAllRanges();
        toast('Highlighted selected passage.', 'info');
      } else {
        var span = document.createElement('p');
        span.innerHTML = '<mark class="prose-highlight">Key finding:</mark> Winter maintenance reserves cover 100% of priority bridge planks.';
        prose.appendChild(span);
        toast('Inserted highlighted note into draft.', 'info');
      }
      updateMetricsFromProse();
      return;
    }

    if (cmd === 'quote') {
      if (hasSelectionInProse) {
        var qRange = sel.getRangeAt(0);
        var bq = document.createElement('blockquote');
        bq.appendChild(qRange.extractContents());
        qRange.insertNode(bq);
        sel.removeAllRanges();
      } else {
        var newBq = document.createElement('blockquote');
        newBq.textContent = '“Routine culvert inspections remain our highest-return safeguard against spring washouts.” — Guild Survey, 2025';
        prose.appendChild(newBq);
      }
      toast('Added pull quote to report prose.', 'info');
      updateMetricsFromProse();
      return;
    }

    if (cmd === 'callout') {
      var note = document.createElement('div');
      note.className = 'ov-callout ov-callout--confirmed';
      note.innerHTML = '<strong>Field Verification:</strong> Cross-checked with Spring 2025 Public Works ledger entries.';
      prose.appendChild(note);
      toast('Inserted callout block into draft.', 'info');
      updateMetricsFromProse();
    }
  }

  function updateToolbarStates() {
    ['bold', 'italic', 'underline'].forEach(function (cmd) {
      var btn = document.querySelector('.tool-btn[data-cmd="' + cmd + '"]');
      if (!btn) return;
      var active = false;
      try {
        active = document.queryCommandState(cmd);
      } catch (_err) {
        active = false;
      }
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  }

  function runFactCheck() {
    if (state.factCheckRunning) return;
    state.factCheckRunning = true;

    var btn = document.getElementById('run-fact-check');
    var sprite = document.getElementById('fact-check-sprite');
    var label = document.getElementById('fact-check-label');
    var timeEl = document.getElementById('fact-check-time');

    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Checking 14 claims...';
    }
    if (sprite) {
      sprite.className = 'ov-sprite ov-sprite--sm ov-sprite--quill';
    }
    if (label) label.textContent = 'Verifying against 28 sources...';

    window.setTimeout(function () {
      state.factCheckRunning = false;
      state.factChecked = true;

      if (sprite) {
        sprite.className = 'ov-sprite ov-sprite--sm ov-sprite--shield ov-sprite--once';
      }
      if (label) label.textContent = 'All 14 claims verified';
      if (timeEl) timeEl.textContent = 'Last checked: Today, ' + currentTimeLabel();
      if (btn) {
        btn.disabled = false;
        btn.textContent = 'Re-run Fact-Check';
      }

      var goodEl = document.getElementById('fact-good-count');
      var reviewEl = document.getElementById('fact-review-count');
      var unsupportedEl = document.getElementById('fact-unsupported-count');
      var claimsSub = document.getElementById('metric-claims-supported');
      var citesSub = document.getElementById('metric-citations-verified');

      if (goodEl) goodEl.textContent = '14';
      if (reviewEl) reviewEl.textContent = '0';
      if (unsupportedEl) unsupportedEl.textContent = '0';
      if (claimsSub) claimsSub.textContent = '14 supported';
      if (citesSub) citesSub.textContent = '14 verified';

      prependUpdate('Fact-check verified all 14 claims across 28 sources');
      toast('Fact-check complete: 14 of 14 claims supported (0 remaining for review).', 'success');
    }, 1350);
  }

  function buildExportText(mode) {
    var chapter = (document.getElementById('report-chapter-title') || {}).textContent || 'III. Infrastructure Overview';
    var section = (document.getElementById('report-section-title') || {}).textContent || 'A. Roads & Bridges';
    var prose = document.getElementById('report-prose');
    var words = (document.getElementById('metric-words') || {}).textContent || '3,842';
    var statusText = state.published ? 'PUBLISHED' : 'DRAFT';

    var proseBlocks = [];
    if (prose) {
      Array.prototype.forEach.call(prose.children, function (node) {
        var txt = (node.textContent || '').trim();
        if (!txt) return;
        if (node.tagName === 'BLOCKQUOTE') {
          proseBlocks.push('> ' + txt);
        } else {
          proseBlocks.push(txt);
        }
      });
    }

    if (mode === 'citations') {
      var lines = [
        "# Scholar's Hollow — Verified Citations (" + state.evidence.length + ' primary entries)',
        'Status: ' + statusText + ' | Sources indexed: 28 (2018–2026)',
        ''
      ];
      state.evidence.forEach(function (ev, idx) {
        lines.push((idx + 1) + '. ' + ev.citation + ' [' + ev.collection + ' · ' + ev.pages + ']');
      });
      return lines.join('\n');
    }

    if (mode === 'summary') {
      return [
        "SCHOLAR'S HOLLOW — EXECUTIVE BRIEF",
        '==================================',
        'Section: ' + chapter + ' — ' + section,
        'Publish Status: ' + statusText + ' | Word Count: ' + words + ' | Fact-Check: ' + (state.factChecked ? '14/14 Verified' : '12/14 Verified'),
        '',
        'ROAD CONDITION BY LENGTH (124 km surveyed, Spring 2025):',
        '  - Excellent:    28% (35 km)',
        '  - Good:         38% (47 km)',
        '  - Fair:         24% (30 km)',
        '  - Needs Repair: 10% (12 km)',
        '',
        'KEY TAKEAWAY:',
        '  ' + ((document.getElementById('section-takeaway') || {}).textContent || ''),
        '',
        'MAINTENANCE TOTALS (GOLD): 2022: 4,270 | 2023: 4,755 | 2024: 4,675 | 2025* YTD: 5,260'
      ].join('\n');
    }

    return [
      "# Scholar's Hollow Research Report",
      'Status: **' + statusText + '** · Words: **' + words + '** · Sources: **28**',
      '',
      '## ' + chapter,
      '### ' + section,
      '',
      proseBlocks.join('\n\n'),
      '',
      '### Road Condition by Length (124 km total, Spring 2025)',
      '- Excellent: 28% (35 km)',
      '- Good: 38% (47 km)',
      '- Fair: 24% (30 km)',
      '- Needs Repair: 10% (12 km)',
      '',
      '### Maintenance Costs (Gold)',
      '| Category | 2022 | 2023 | 2024 | 2025* |',
      '| --- | ---: | ---: | ---: | ---: |',
      '| Roads | 2,450 | 2,615 | 2,710 | 2,980 |',
      '| Bridges | 1,820 | 2,140 | 1,965 | 2,280 |',
      '| **Total** | **4,270** | **4,755** | **4,675** | **5,260** |',
      '',
      '### Citations',
      state.evidence.map(function (ev, idx) { return (idx + 1) + '. ' + ev.citation; }).join('\n')
    ].join('\n');
  }

  function setExportMode(mode) {
    state.exportMode = mode;
    var preview = document.getElementById('export-preview');
    if (preview) {
      preview.value = buildExportText(mode);
    }
    document.querySelectorAll('[data-preview-mode]').forEach(function (btn) {
      var active = btn.getAttribute('data-preview-mode') === mode;
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
      btn.classList.toggle('ov-button--paper', !active);
    });
  }

  function openExportDialog(mode, trigger) {
    setExportMode(mode || 'markdown');
    if (window.OrchardVale && typeof window.OrchardVale.openDialog === 'function') {
      window.OrchardVale.openDialog('export-dialog', trigger);
    } else {
      var dlg = document.getElementById('export-dialog');
      if (dlg && typeof dlg.showModal === 'function') dlg.showModal();
    }
  }

  function wireDonutHover() {
    var svg = document.querySelector('.donut-svg');
    var valEl = document.getElementById('road-donut-value');
    var lblEl = document.getElementById('road-donut-label');
    if (!svg || !valEl || !lblEl) return;

    function highlight(key) {
      var info = key ? DONUT_INFO[key] : null;
      svg.classList.toggle('has-focus', Boolean(info));
      document.querySelectorAll('.donut-slice, .donut-legend li').forEach(function (el) {
        el.classList.toggle('is-highlighted', Boolean(info) && el.getAttribute('data-slice') === key);
      });
      valEl.textContent = info ? info.value : '124';
      lblEl.textContent = info ? info.label : 'km total';
    }

    document.querySelectorAll('.donut-slice, .donut-legend li').forEach(function (el) {
      var key = el.getAttribute('data-slice');
      el.addEventListener('mouseenter', function () { highlight(key); });
      el.addEventListener('focus', function () { highlight(key); });
      el.addEventListener('mouseleave', function () { highlight(null); });
      el.addEventListener('blur', function () { highlight(null); });
    });
  }

  function init() {
    var prose = document.getElementById('report-prose');
    if (prose) {
      state.initialSectionWords = countWords(prose.textContent);
      updateMetricsFromProse();
      prose.addEventListener('input', updateMetricsFromProse);
      prose.addEventListener('keyup', updateToolbarStates);
      prose.addEventListener('mouseup', updateToolbarStates);
    }

    renderEvidenceAndCitations();
    wireDonutHover();

    // Study Library topic buttons
    document.querySelectorAll('#study-library-list .rail-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var topic = btn.getAttribute('data-topic');
        state.activeTopic = topic;
        document.querySelectorAll('#study-library-list .rail-btn').forEach(function (other) {
          var active = other === btn;
          other.classList.toggle('is-active', active);
          other.setAttribute('aria-pressed', active ? 'true' : 'false');
        });
        var targetSection = TOPIC_SECTION_MAP[topic] || 'roads';
        switchSection(targetSection, false);
        toast('Switched study shelf to ' + btn.textContent.trim() + '.', 'info');
      });
    });

    // Report section buttons
    document.querySelectorAll('#report-sections-list .section-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var sec = btn.getAttribute('data-section');
        if (sec) switchSection(sec, true);
      });
    });

    // Saved searches
    var searchInput = document.getElementById('evidence-search');
    document.querySelectorAll('#saved-searches-list .saved-search-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var query = btn.getAttribute('data-query') || '';
        var wasActive = btn.classList.contains('is-active');

        document.querySelectorAll('#saved-searches-list .saved-search-btn').forEach(function (other) {
          other.classList.remove('is-active');
          other.setAttribute('aria-pressed', 'false');
        });

        if (wasActive) {
          state.searchQuery = '';
        } else {
          btn.classList.add('is-active');
          btn.setAttribute('aria-pressed', 'true');
          state.searchQuery = query;
        }
        if (searchInput) searchInput.value = state.searchQuery;
        renderEvidenceAndCitations();
      });
    });

    // Live search & dropdown filters
    if (searchInput) {
      searchInput.addEventListener('input', function () {
        state.searchQuery = searchInput.value;
        document.querySelectorAll('#saved-searches-list .saved-search-btn').forEach(function (other) {
          var matches = other.getAttribute('data-query') === state.searchQuery.trim().toLowerCase();
          other.classList.toggle('is-active', matches);
          other.setAttribute('aria-pressed', matches ? 'true' : 'false');
        });
        renderEvidenceAndCitations();
      });
    }

    var relFilter = document.getElementById('evidence-relevance-filter');
    if (relFilter) {
      relFilter.addEventListener('change', function () {
        state.relevanceFilter = relFilter.value;
        renderEvidenceAndCitations();
      });
    }

    var timeFilter = document.getElementById('evidence-time-filter');
    if (timeFilter) {
      timeFilter.addEventListener('change', function () {
        state.timeFilter = timeFilter.value;
        renderEvidenceAndCitations();
      });
    }

    var resetBtn = document.getElementById('reset-evidence-filter');
    if (resetBtn) resetBtn.addEventListener('click', resetAllFilters);

    // Formatting toolbar
    document.querySelectorAll('.tool-btn[data-cmd]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        applyToolbarCommand(btn.getAttribute('data-cmd'));
      });
    });

    var blockStyle = document.getElementById('block-style');
    if (blockStyle) {
      blockStyle.addEventListener('change', function () {
        var proseEl = document.getElementById('report-prose');
        if (!proseEl) return;
        proseEl.focus();
        try {
          document.execCommand('formatBlock', false, blockStyle.value);
        } catch (_err) {
          // Fallback ignored.
        }
        toast('Applied ' + blockStyle.options[blockStyle.selectedIndex].text + ' formatting.', 'info');
      });
    }

    // Fact-check button
    var factBtn = document.getElementById('run-fact-check');
    if (factBtn) factBtn.addEventListener('click', runFactCheck);

    // Export & Publish triggers
    document.querySelectorAll('[data-export-format]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        openExportDialog(btn.getAttribute('data-export-format'), btn);
      });
    });

    var citationsDlgBtn = document.getElementById('open-citations-dialog');
    if (citationsDlgBtn) {
      citationsDlgBtn.addEventListener('click', function () {
        openExportDialog('citations', citationsDlgBtn);
      });
    }

    document.querySelectorAll('[data-preview-mode]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        setExportMode(btn.getAttribute('data-preview-mode'));
      });
    });

    var publishConfirmBtn = document.getElementById('confirm-publish-btn');
    if (publishConfirmBtn) {
      publishConfirmBtn.addEventListener('click', function () {
        state.published = true;
        var chip = document.getElementById('publish-status-chip');
        var saved = document.getElementById('last-saved-time');
        if (chip) {
          chip.textContent = 'Status: PUBLISHED';
          chip.className = 'ov-chip ov-chip--green';
        }
        if (saved) saved.textContent = 'Published: ' + currentTimeLabel();
        setExportMode(state.exportMode);
        prependUpdate('Published report edition to Orchard Vale Archive');
        if (window.OrchardVale && typeof window.OrchardVale.closeDialog === 'function') {
          window.OrchardVale.closeDialog('export-dialog');
        }
        toast('Report published to the Orchard Vale Archive.', 'success');
      });
    }

    // Add Evidence dialog
    var addEvBtn = document.getElementById('add-evidence-btn');
    if (addEvBtn) {
      addEvBtn.addEventListener('click', function () {
        if (window.OrchardVale && typeof window.OrchardVale.openDialog === 'function') {
          window.OrchardVale.openDialog('add-evidence-dialog', addEvBtn);
        }
      });
    }

    var addEvForm = document.getElementById('add-evidence-form');
    if (addEvForm) {
      addEvForm.addEventListener('submit', function (event) {
        event.preventDefault();
        if (!addEvForm.reportValidity()) return;
        var data = new FormData(addEvForm);
        var title = String(data.get('title') || '').trim();
        var year = Number(data.get('year')) || 2025;
        var pages = String(data.get('pages') || 'p. 1').trim();
        var collection = String(data.get('collection') || 'Field Studies');
        var relevance = String(data.get('relevance') || 'high');
        if (!title) return;

        state.evidence.unshift({
          id: 'ev-' + Date.now(),
          title: title,
          year: year,
          collection: collection,
          relevance: relevance,
          pages: pages,
          topic: state.activeTopic,
          keywords: (title + ' ' + collection + ' ' + year).toLowerCase(),
          icon: '../src/assets/orchard-vale/motifs/research/motif-research-evidence-card-96.svg',
          citation: title + ', ' + year + ', ' + pages + '.'
        });

        var sourcesEl = document.getElementById('metric-sources');
        if (sourcesEl) {
          var nextCount = (parseInt(sourcesEl.textContent, 10) || 28) + 1;
          sourcesEl.textContent = String(nextCount);
        }

        renderEvidenceAndCitations();
        prependUpdate('Added evidence: ' + title + ', ' + year);
        addEvForm.reset();
        if (window.OrchardVale && typeof window.OrchardVale.closeDialog === 'function') {
          window.OrchardVale.closeDialog('add-evidence-dialog');
        }
        toast('Added "' + title + '" to Evidence Cards.', 'success');
      });
    }

    // New Draft Note button
    var newReportBtn = document.getElementById('new-report-btn');
    if (newReportBtn) {
      newReportBtn.addEventListener('click', function () {
        var proseEl = document.getElementById('report-prose');
        if (!proseEl) return;
        var p = document.createElement('p');
        p.textContent = 'New field note (' + currentTimeLabel() + '): Enter draft observation here and link supporting evidence.';
        proseEl.appendChild(p);
        proseEl.focus();
        updateMetricsFromProse();
        prependUpdate('Appended new draft note to active section');
        toast('Appended a new editable paragraph to the draft.', 'info');
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
