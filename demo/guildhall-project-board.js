/* Guildhall Project Board — file://-safe vanilla JS controller.
   Manages 5-lane Kanban drag-and-drop, keyboard lane moves, live sprint capacity,
   multi-facet filtering, selected work item detail drawer, quick-create dialog,
   and chronological guild activity feed. */

(function () {
  'use strict';

  var LANES = ['Backlog', 'Ready', 'In Progress', 'In Review', 'Done'];
  var PRIORITIES = ['High', 'Medium', 'Low'];

  var ASSETS = {
    blockedSeal: '../src/assets/orchard-vale/heraldry/seal-blocked-red-512.webp',
    emptyArt: '../src/assets/orchard-vale/empty-states/empty-badger-checklist-complete-800.webp',
    motifs: {
      Enhancement: '../src/assets/orchard-vale/motifs/project/motif-project-sprint-banner-96.svg',
      Bug: '../src/assets/orchard-vale/motifs/project/motif-project-bug-jar-96.svg',
      Task: '../src/assets/orchard-vale/motifs/project/motif-project-task-plaque-96.svg',
      Epic: '../src/assets/orchard-vale/motifs/project/motif-project-milestone-flag-96.svg'
    }
  };

  var STEWARDS = {
    rook: {
      id: 'rook',
      name: 'Rook',
      role: 'Board Marshal',
      avatar: '../src/assets/orchard-vale/characters/avatars/avatar-badger-orchestrator-neutral-512.webp',
      fullbody: '../src/assets/orchard-vale/characters/fullbody/character-badger-orchestrator-standing-1024.webp',
      fullbodyAlt: 'Rook the badger board marshal standing with a clipboard'
    },
    poppy: {
      id: 'poppy',
      name: 'Poppy',
      role: 'Sprint Planner',
      avatar: '../src/assets/orchard-vale/characters/avatars/avatar-rabbit-planner-attentive-512.webp',
      fullbody: '../src/assets/orchard-vale/characters/fullbody/character-rabbit-planner-standing-1024.webp',
      fullbodyAlt: 'Poppy the rabbit sprint planner holding project notes'
    },
    rowan: {
      id: 'rowan',
      name: 'Rowan',
      role: 'Build Lead',
      avatar: '../src/assets/orchard-vale/characters/avatars/avatar-fox-implementer-focused-512.webp',
      fullbody: '../src/assets/orchard-vale/characters/fullbody/character-fox-implementer-standing-1024.webp',
      fullbodyAlt: 'Rowan the fox build lead standing ready with tools'
    },
    thistle: {
      id: 'thistle',
      name: 'Thistle',
      role: 'Review Keeper',
      avatar: '../src/assets/orchard-vale/characters/avatars/avatar-owl-scholar-neutral-512.webp',
      fullbody: '../src/assets/orchard-vale/characters/fullbody/character-owl-scholar-seated-1024.webp',
      fullbodyAlt: 'Thistle the owl review keeper seated with a ledger'
    },
    pip: {
      id: 'pip',
      name: 'Pip',
      role: 'Release Clerk',
      avatar: '../src/assets/orchard-vale/characters/avatars/avatar-mouse-clerk-cheerful-512.webp',
      fullbody: '../src/assets/orchard-vale/characters/fullbody/character-mouse-clerk-seated-1024.webp',
      fullbodyAlt: 'Pip the mouse release clerk seated at a desk'
    },
    bramble: {
      id: 'bramble',
      name: 'Bramble',
      role: 'Infra Engineer',
      avatar: '../src/assets/orchard-vale/characters/avatars/avatar-mole-engineer-focused-512.webp',
      fullbody: '../src/assets/orchard-vale/characters/fullbody/character-mole-engineer-kneeling-1024.webp',
      fullbodyAlt: 'Bramble the mole infrastructure engineer inspecting fittings'
    }
  };

  var INITIAL_TASKS = [
    {
      id: 'PLAT-1023',
      title: 'Guild Onboarding Flow',
      type: 'Epic',
      lane: 'Backlog',
      priority: 'Medium',
      points: 5,
      workspace: 'Customer Portal',
      assignee: 'poppy',
      dueDate: 'Jun 4, 2025',
      blocked: false,
      description: 'Guide new guild teams through workspace setup, role invitations, and their first sprint ritual.',
      subtasks: [
        { text: 'Draft three-step welcome checklist', done: true },
        { text: 'Add sample starter board import', done: false },
        { text: 'Review onboarding copy with scribes', done: false }
      ],
      dependencies: [
        { relation: 'Depends on', key: 'PLAT-0999', title: 'Project Templates', status: 'Done' }
      ],
      comments: [
        { author: 'poppy', time: 'Yesterday', text: 'Wireframes are aligned with the v1.5 collaboration track.' }
      ]
    },
    {
      id: 'PLAT-1042',
      title: 'Audit Log & History Ledger',
      type: 'Enhancement',
      lane: 'Backlog',
      priority: 'Low',
      points: 3,
      workspace: 'Platform Core',
      assignee: 'thistle',
      dueDate: 'Jun 8, 2025',
      blocked: false,
      description: 'Record lane moves, role changes, and release approvals in an exportable guild chronicle.',
      subtasks: [
        { text: 'Define immutable event schema', done: true },
        { text: 'Add CSV ledger export action', done: false }
      ],
      dependencies: [],
      comments: []
    },
    {
      id: 'BUG-2051',
      title: 'Fix export date format in CSV',
      type: 'Bug',
      lane: 'Backlog',
      priority: 'Medium',
      points: 2,
      workspace: 'Internal Tools',
      assignee: 'pip',
      dueDate: 'May 29, 2025',
      blocked: false,
      description: 'Ensure exported sprint dates use ISO-8601 consistently across local timezones.',
      subtasks: [
        { text: 'Reproduce timezone shift in parser', done: false },
        { text: 'Add regression test for midnight UTC', done: false }
      ],
      dependencies: [],
      comments: [
        { author: 'pip', time: '2d ago', text: 'Confirmed on both northern and coastal ledger exports.' }
      ]
    },
    {
      id: 'PLAT-1077',
      title: 'Advanced Search Filters',
      type: 'Enhancement',
      lane: 'Ready',
      priority: 'High',
      points: 3,
      workspace: 'Customer Portal',
      assignee: 'rowan',
      dueDate: 'May 28, 2025',
      blocked: false,
      description: 'Combine priority, assignee, and blocked state chips with instant keyword search across lanes.',
      subtasks: [
        { text: 'Index card keys and steward names', done: true },
        { text: 'Add clear-all shortcut state', done: true },
        { text: 'Verify mobile chip wrapping', done: false }
      ],
      dependencies: [],
      comments: []
    },
    {
      id: 'PLAT-1055',
      title: 'Team Capacity View',
      type: 'Task',
      lane: 'Ready',
      priority: 'Medium',
      points: 3,
      workspace: 'Internal Tools',
      assignee: 'rook',
      dueDate: 'May 30, 2025',
      blocked: false,
      description: 'Surface per-steward story point load beside the sprint meter to balance weekly commitments.',
      subtasks: [
        { text: 'Compute active points per steward', done: true },
        { text: 'Highlight overloaded capacity thresholds', done: false }
      ],
      dependencies: [
        { relation: 'Depends on', key: 'PLAT-1018', title: 'Guildhall Dashboard', status: 'In Progress' }
      ],
      comments: []
    },
    {
      id: 'PLAT-1062',
      title: 'West Bridge Lantern Telemetry',
      type: 'Task',
      lane: 'Ready',
      priority: 'Low',
      points: 2,
      workspace: 'Internal Tools',
      assignee: 'bramble',
      dueDate: 'Jun 2, 2025',
      blocked: false,
      description: 'Connect west bridge bracket check-ins from the field crew directly into the sprint readiness feed.',
      subtasks: [
        { text: 'Confirm oil crate sensor payload', done: false },
        { text: 'Map alert thresholds to notice panel', done: false }
      ],
      dependencies: [],
      comments: []
    },
    {
      id: 'PLAT-1018',
      title: 'Guildhall Dashboard',
      type: 'Enhancement',
      lane: 'In Progress',
      priority: 'High',
      points: 5,
      workspace: 'Platform Core',
      assignee: 'rook',
      dueDate: 'May 24, 2025',
      blocked: false,
      description: 'Create a customizable dashboard for guild members with key project metrics, recent activity, and upcoming deadlines.',
      subtasks: [
        { text: 'Design dashboard layout', done: true },
        { text: 'Implement summary widgets', done: true },
        { text: 'Add activity feed widget', done: false },
        { text: 'Connect metrics API', done: false },
        { text: 'Add customization options', done: false }
      ],
      dependencies: [
        { relation: 'Blocks', key: 'PLAT-1055', title: 'Team Capacity View', status: 'Ready' },
        { relation: 'Depends on', key: 'PLAT-1010', title: 'Activity Feed', status: 'Done' }
      ],
      comments: [
        { author: 'poppy', time: 'Today, 10:21 AM', text: 'Updated the summary widgets based on guild council feedback.' },
        { author: 'rook', time: 'Today, 10:35 AM', text: 'Looks sharp. I will hook up the live metrics stream this afternoon.' }
      ]
    },
    {
      id: 'PLAT-1031',
      title: 'Task Comments & Mentions',
      type: 'Enhancement',
      lane: 'In Progress',
      priority: 'Medium',
      points: 3,
      workspace: 'Customer Portal',
      assignee: 'poppy',
      dueDate: 'May 26, 2025',
      blocked: false,
      description: 'Enable inline discussion threads on work items with steward mentions and instant activity chronicle posts.',
      subtasks: [
        { text: 'Render steward avatars inline', done: true },
        { text: 'Persist draft text while switching tabs', done: true },
        { text: 'Add keyboard submit shortcut', done: true },
        { text: 'Wire mention autocomplete', done: false },
        { text: 'Polish empty thread state', done: false }
      ],
      dependencies: [],
      comments: [
        { author: 'thistle', time: 'Today, 9:50 AM', text: 'Reviewed contrast on timestamp metadata — passes AA cleanly.' }
      ]
    },
    {
      id: 'PLAT-1009',
      title: 'API Rate Limiting',
      type: 'Enhancement',
      lane: 'In Progress',
      priority: 'High',
      points: 5,
      workspace: 'Platform Core',
      assignee: 'bramble',
      dueDate: 'May 25, 2025',
      blocked: true,
      blockedReason: 'Waiting on API Gateway quota table from infra review',
      description: 'Protect guild sync endpoints with sliding-window rate limits and clear retry-after notices.',
      subtasks: [
        { text: 'Configure burst window defaults', done: true },
        { text: 'Await gateway quota sign-off', done: false },
        { text: 'Verify 429 retry banner copy', done: false }
      ],
      dependencies: [
        { relation: 'Depends on', key: 'PLAT-1007', title: 'Role-based Permissions', status: 'In Review' }
      ],
      comments: [
        { author: 'bramble', time: 'Today, 8:40 AM', text: 'Blocked until gateway token buckets finish staging load test.' }
      ]
    },
    {
      id: 'PLAT-1007',
      title: 'Role-based Permissions',
      type: 'Enhancement',
      lane: 'In Review',
      priority: 'High',
      points: 5,
      workspace: 'Platform Core',
      assignee: 'rowan',
      dueDate: 'May 23, 2025',
      blocked: false,
      description: 'Enforce steward, scribe, and observer permissions across workspaces and release approval gates.',
      subtasks: [
        { text: 'Audit role policy matrix', done: true },
        { text: 'Lock release button for observers', done: true },
        { text: 'Final security review pass', done: false }
      ],
      dependencies: [
        { relation: 'Blocks', key: 'PLAT-1009', title: 'API Rate Limiting', status: 'In Progress' }
      ],
      comments: [
        { author: 'rowan', time: 'Today, 11:05 AM', text: 'Ready for Thistle to sign off on the permission matrix.' }
      ]
    },
    {
      id: 'PLAT-1048',
      title: 'Integrate SSO (SAML)',
      type: 'Epic',
      lane: 'In Review',
      priority: 'High',
      points: 3,
      workspace: 'Platform Core',
      assignee: 'thistle',
      dueDate: 'May 27, 2025',
      blocked: true,
      blockedReason: 'Blocked awaiting external identity provider metadata certificate',
      description: 'Support federated guild sign-in using SAML 2.0 assertions and automated steward provisioning.',
      subtasks: [
        { text: 'Validate assertion signature flow', done: true },
        { text: 'Import partner metadata certificate', done: false }
      ],
      dependencies: [
        { relation: 'Depends on', key: 'PLAT-1007', title: 'Role-based Permissions', status: 'In Review' }
      ],
      comments: [
        { author: 'thistle', time: 'Yesterday', text: 'Metadata renewal ticket filed with partner stewards.' }
      ]
    },
    {
      id: 'BUG-2041',
      title: 'File upload fails on large archives',
      type: 'Bug',
      lane: 'In Review',
      priority: 'High',
      points: 2,
      workspace: 'Customer Portal',
      assignee: 'bramble',
      dueDate: 'May 24, 2025',
      blocked: true,
      blockedReason: 'Infra proxy body-size fix rolling out to west cluster',
      description: 'Stream multipart uploads above 25 MB in chunks so guild spec bundles never time out.',
      subtasks: [
        { text: 'Add chunked upload retry handler', done: true },
        { text: 'Verify proxy timeout after rollout', done: false }
      ],
      dependencies: [],
      comments: []
    },
    {
      id: 'PLAT-0999',
      title: 'Project Templates',
      type: 'Enhancement',
      lane: 'Done',
      priority: 'Medium',
      points: 5,
      workspace: 'Customer Portal',
      assignee: 'poppy',
      dueDate: 'May 16, 2025',
      blocked: false,
      description: 'Provide pre-configured sprint, festival planning, and release readiness board blueprints.',
      subtasks: [
        { text: 'Ship three starter board templates', done: true },
        { text: 'Verify clone preserves lane order', done: true }
      ],
      dependencies: [
        { relation: 'Blocks', key: 'PLAT-1023', title: 'Guild Onboarding Flow', status: 'Backlog' }
      ],
      comments: []
    },
    {
      id: 'PLAT-1010',
      title: 'Activity Feed',
      type: 'Enhancement',
      lane: 'Done',
      priority: 'Medium',
      points: 5,
      workspace: 'Platform Core',
      assignee: 'rowan',
      dueDate: 'May 17, 2025',
      blocked: false,
      description: 'Display chronological board actions with steward avatars and live updates when work moves.',
      subtasks: [
        { text: 'Stream lane transition entries', done: true },
        { text: 'Add accessible live region announcements', done: true }
      ],
      dependencies: [
        { relation: 'Blocks', key: 'PLAT-1018', title: 'Guildhall Dashboard', status: 'In Progress' }
      ],
      comments: []
    },
    {
      id: 'PLAT-1021',
      title: 'Keyboard Shortcuts & Lane Moves',
      type: 'Task',
      lane: 'Done',
      priority: 'Low',
      points: 3,
      workspace: 'Internal Tools',
      assignee: 'pip',
      dueDate: 'May 18, 2025',
      blocked: false,
      description: 'Ensure every card can be selected and shifted across lanes without requiring a pointer drag.',
      subtasks: [
        { text: 'Add accessible left/right lane buttons', done: true },
        { text: 'Preserve visible focus outlines on parchment', done: true }
      ],
      dependencies: [],
      comments: [
        { author: 'rook', time: 'May 18, 9:45 AM', text: 'Verified full keyboard traversal across all five lanes.' }
      ]
    },
    {
      id: 'BUG-2027',
      title: 'Typo in settings label',
      type: 'Bug',
      lane: 'Done',
      priority: 'Low',
      points: 2,
      workspace: 'Internal Tools',
      assignee: 'pip',
      dueDate: 'May 15, 2025',
      blocked: false,
      description: 'Correct guildhall notification digest label across workspace preferences.',
      subtasks: [
        { text: 'Update label copy and verify tooltip', done: true }
      ],
      dependencies: [],
      comments: []
    }
  ];

  var INITIAL_ACTIVITY = [
    {
      actor: 'thistle',
      action: 'moved',
      key: 'PLAT-1031',
      detail: 'Task Comments & Mentions to In Progress',
      time: '12m ago'
    },
    {
      actor: 'pip',
      action: 'completed',
      key: 'PLAT-1021',
      detail: 'Keyboard Shortcuts & Lane Moves',
      time: '38m ago'
    },
    {
      actor: 'poppy',
      action: 'commented on',
      key: 'PLAT-1018',
      detail: 'Guildhall Dashboard',
      time: '1h ago'
    },
    {
      actor: 'bramble',
      action: 'flagged blocker on',
      key: 'PLAT-1009',
      detail: 'API Rate Limiting',
      time: '2h ago'
    },
    {
      actor: 'rook',
      action: 'opened',
      key: 'Sprint 18',
      detail: 'Orchard Foundations kickoff',
      time: 'Today, 9:00 AM'
    }
  ];

  var state = {
    tasks: INITIAL_TASKS.map(cloneTask),
    activity: INITIAL_ACTIVITY.slice(),
    selectedId: 'PLAT-1018',
    nextPlatNumber: 1080,
    nextBugNumber: 2055,
    filters: {
      workspace: 'all',
      priority: null,
      type: null,
      assignee: null,
      blockedOnly: false,
      search: ''
    },
    draggedId: null
  };

  function cloneTask(task) {
    return {
      id: task.id,
      title: task.title,
      type: task.type,
      lane: task.lane,
      priority: task.priority,
      points: task.points,
      workspace: task.workspace,
      assignee: task.assignee,
      dueDate: task.dueDate,
      blocked: !!task.blocked,
      blockedReason: task.blockedReason || '',
      description: task.description || '',
      subtasks: (task.subtasks || []).map(function (st) {
        return { text: st.text, done: !!st.done };
      }),
      dependencies: (task.dependencies || []).map(function (dep) {
        return { relation: dep.relation, key: dep.key, title: dep.title, status: dep.status };
      }),
      comments: (task.comments || []).map(function (c) {
        return { author: c.author, time: c.time, text: c.text };
      })
    };
  }

  function getSteward(id) {
    return STEWARDS[id] || STEWARDS.rook;
  }

  function getTaskById(id) {
    for (var i = 0; i < state.tasks.length; i++) {
      if (state.tasks[i].id === id) return state.tasks[i];
    }
    return null;
  }

  function typeChipClass(type) {
    if (type === 'Bug') return 'ov-chip ov-chip--red';
    if (type === 'Task') return 'ov-chip ov-chip--blue';
    if (type === 'Epic') return 'ov-chip ov-chip--amber';
    return 'ov-chip ov-chip--purple';
  }

  function priorityChipClass(priority) {
    if (priority === 'High') return 'ov-chip ov-chip--red';
    if (priority === 'Low') return 'ov-chip ov-chip--green';
    return 'ov-chip ov-chip--amber';
  }

  function statusChipClass(status) {
    if (status === 'Done') return 'ov-chip ov-chip--green';
    if (status === 'In Review') return 'ov-chip ov-chip--purple';
    if (status === 'In Progress') return 'ov-chip ov-chip--amber';
    if (status === 'Ready') return 'ov-chip ov-chip--blue';
    return 'ov-chip';
  }

  function toastNotice(message, tone) {
    if (window.OrchardVale && typeof window.OrchardVale.toast === 'function') {
      window.OrchardVale.toast(message, tone || 'success');
    }
  }

  function announceSR(message) {
    if (window.OrchardVale && typeof window.OrchardVale.announce === 'function') {
      window.OrchardVale.announce(message, 'polite');
    }
  }

  function pushActivity(actorId, action, key, detail) {
    state.activity.unshift({
      actor: actorId || 'rook',
      action: action,
      key: key,
      detail: detail,
      time: 'Just now'
    });
    if (state.activity.length > 24) {
      state.activity.length = 24;
    }
    renderActivityFeed();
  }

  function matchesFilters(task) {
    var f = state.filters;
    if (f.workspace !== 'all' && task.workspace !== f.workspace) return false;
    if (f.priority && task.priority !== f.priority) return false;
    if (f.type && task.type !== f.type) return false;
    if (f.assignee && task.assignee !== f.assignee) return false;
    if (f.blockedOnly && !task.blocked) return false;
    if (f.search) {
      var q = f.search.toLowerCase();
      var steward = getSteward(task.assignee);
      var hay = (task.id + ' ' + task.title + ' ' + task.description + ' ' + task.type + ' ' + task.workspace + ' ' + steward.name).toLowerCase();
      if (hay.indexOf(q) === -1) return false;
    }
    return true;
  }

  function countActiveFilters() {
    var f = state.filters;
    var count = 0;
    if (f.workspace !== 'all') count++;
    if (f.priority) count++;
    if (f.type) count++;
    if (f.assignee) count++;
    if (f.blockedOnly) count++;
    if (f.search) count++;
    return count;
  }

  function createEl(tag, className, text) {
    var el = document.createElement(tag);
    if (className) el.className = className;
    if (text !== undefined && text !== null) el.textContent = String(text);
    return el;
  }

  /* ------------------------------------------------------------------------ */
  /* Render Sprint Capacity & Workspace Counts                                */
  /* ------------------------------------------------------------------------ */

  function renderSprintMetrics() {
    var totalPts = 0;
    var donePts = 0;
    var blockedCount = 0;

    state.tasks.forEach(function (task) {
      var pts = Number(task.points) || 0;
      totalPts += pts;
      if (task.lane === 'Done') donePts += pts;
      if (task.blocked) blockedCount++;
    });

    var pct = totalPts > 0 ? Math.round((donePts / totalPts) * 100) : 0;

    var meter = document.getElementById('sprint-meter');
    var fill = document.getElementById('sprint-meter-fill');
    var stats = document.getElementById('sprint-capacity-text');
    var summary = document.getElementById('sprint-active-summary');

    if (meter) meter.setAttribute('aria-valuenow', String(pct));
    if (fill) fill.style.width = pct + '%';
    if (stats) stats.textContent = donePts + ' / ' + totalPts + ' pts (' + pct + '%)';
    if (summary) {
      summary.textContent = state.tasks.length + ' items \u00b7 ' + blockedCount + ' blocked';
    }

    // Update workspace counts
    var counts = { all: state.tasks.length };
    state.tasks.forEach(function (task) {
      counts[task.workspace] = (counts[task.workspace] || 0) + 1;
    });
    var wsBadges = document.querySelectorAll('[data-ws-count]');
    for (var i = 0; i < wsBadges.length; i++) {
      var wsKey = wsBadges[i].getAttribute('data-ws-count');
      wsBadges[i].textContent = String(counts[wsKey] || 0);
    }
  }

  /* ------------------------------------------------------------------------ */
  /* Render Filter State                                                      */
  /* ------------------------------------------------------------------------ */

  function renderFilterControls() {
    var activeCount = countActiveFilters();
    var badge = document.getElementById('active-filter-badge');
    var clearBtn = document.getElementById('clear-filters-btn');

    if (badge) {
      badge.hidden = activeCount === 0;
      badge.textContent = activeCount + ' active';
    }
    if (clearBtn) {
      clearBtn.disabled = activeCount === 0;
    }

    var wsButtons = document.querySelectorAll('[data-workspace]');
    for (var i = 0; i < wsButtons.length; i++) {
      var ws = wsButtons[i].getAttribute('data-workspace');
      wsButtons[i].setAttribute('aria-pressed', state.filters.workspace === ws ? 'true' : 'false');
    }

    var chips = document.querySelectorAll('[data-filter-kind]');
    for (var j = 0; j < chips.length; j++) {
      var kind = chips[j].getAttribute('data-filter-kind');
      var val = chips[j].getAttribute('data-filter-value');
      var pressed = false;
      if (kind === 'priority') pressed = state.filters.priority === val;
      if (kind === 'type') pressed = state.filters.type === val;
      if (kind === 'assignee') pressed = state.filters.assignee === val;
      if (kind === 'blocked') pressed = state.filters.blockedOnly;
      chips[j].setAttribute('aria-pressed', pressed ? 'true' : 'false');
    }
  }

  /* ------------------------------------------------------------------------ */
  /* Render 5-Lane Kanban Board                                               */
  /* ------------------------------------------------------------------------ */

  function buildCardElement(task) {
    var steward = getSteward(task.assignee);
    var laneIndex = LANES.indexOf(task.lane);
    var isSelected = task.id === state.selectedId;

    var card = createEl('article', 'task-card task-card--' + task.type.toLowerCase());
    if (task.blocked) card.classList.add('task-card--blocked');
    if (isSelected) card.classList.add('task-card--selected');
    card.setAttribute('draggable', 'true');
    card.setAttribute('data-task-id', task.id);

    // Top row: key, type chip, domain motif SVG
    var top = createEl('div', 'task-card__top');
    var keyWrap = createEl('div', 'task-card__key-wrap');
    keyWrap.appendChild(createEl('span', 'task-card__key', task.id));
    keyWrap.appendChild(createEl('span', typeChipClass(task.type), task.type));
    top.appendChild(keyWrap);

    var motif = document.createElement('img');
    motif.className = 'task-card__motif';
    motif.src = ASSETS.motifs[task.type] || ASSETS.motifs.Task;
    motif.alt = '';
    motif.width = 24;
    motif.height = 24;
    motif.decoding = 'async';
    top.appendChild(motif);
    card.appendChild(top);

    // Selectable title button
    var h4 = createEl('h4', 'task-card__title');
    var selectBtn = createEl('button', 'task-card__select', task.title);
    selectBtn.type = 'button';
    selectBtn.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
    selectBtn.addEventListener('click', function () {
      selectTask(task.id);
    });
    h4.appendChild(selectBtn);
    card.appendChild(h4);

    // Blocked badge with red wax seal
    if (task.blocked) {
      var blockedRow = createEl('div', 'task-card__blocked-row');
      var seal = document.createElement('img');
      seal.className = 'task-card__blocked-seal';
      seal.src = ASSETS.blockedSeal;
      seal.alt = 'Blocked status seal';
      seal.width = 22;
      seal.height = 22;
      seal.decoding = 'async';
      blockedRow.appendChild(seal);
      blockedRow.appendChild(createEl('span', '', 'Blocked'));
      card.appendChild(blockedRow);
    }

    // Subtask meter (if task has subtasks)
    if (task.subtasks && task.subtasks.length > 0) {
      var doneCount = task.subtasks.filter(function (s) { return s.done; }).length;
      var totalCount = task.subtasks.length;
      var ratio = Math.round((doneCount / totalCount) * 100);

      var prog = createEl('div', 'task-card__progress');
      prog.appendChild(createEl('span', 'task-card__progress-label', doneCount + ' / ' + totalCount + ' subtasks'));
      var meter = createEl('div', 'ov-meter task-card__meter');
      var fill = document.createElement('span');
      fill.style.width = ratio + '%';
      meter.appendChild(fill);
      prog.appendChild(meter);
      card.appendChild(prog);
    }

    // Footer: avatar, priority/pts, move left/right buttons
    var footer = createEl('div', 'task-card__footer');
    var meta = createEl('div', 'task-card__meta');

    var avatar = document.createElement('img');
    avatar.className = 'task-card__avatar';
    avatar.src = steward.avatar;
    avatar.alt = steward.name;
    avatar.title = steward.name + ' (' + steward.role + ')';
    avatar.width = 24;
    avatar.height = 24;
    avatar.decoding = 'async';
    meta.appendChild(avatar);

    meta.appendChild(createEl('span', 'task-card__pts', task.points + (task.points === 1 ? ' pt' : ' pts') + ' \u00b7 ' + task.priority));
    footer.appendChild(meta);

    var moveWrap = createEl('div', 'task-card__move');
    var leftBtn = createEl('button', 'card-move-btn', '\u2190');
    leftBtn.type = 'button';
    leftBtn.disabled = laneIndex <= 0;
    leftBtn.title = laneIndex > 0 ? 'Move left to ' + LANES[laneIndex - 1] : 'Already in first lane';
    leftBtn.setAttribute('aria-label', laneIndex > 0 ? 'Move ' + task.id + ' left to ' + LANES[laneIndex - 1] : task.id + ' is in first lane');
    leftBtn.addEventListener('click', function (event) {
      event.stopPropagation();
      if (laneIndex > 0) moveTaskToLane(task.id, LANES[laneIndex - 1], 'keyboard');
    });

    var rightBtn = createEl('button', 'card-move-btn', '\u2192');
    rightBtn.type = 'button';
    rightBtn.disabled = laneIndex >= LANES.length - 1;
    rightBtn.title = laneIndex < LANES.length - 1 ? 'Move right to ' + LANES[laneIndex + 1] : 'Already in Done lane';
    rightBtn.setAttribute('aria-label', laneIndex < LANES.length - 1 ? 'Move ' + task.id + ' right to ' + LANES[laneIndex + 1] : task.id + ' is in final lane');
    rightBtn.addEventListener('click', function (event) {
      event.stopPropagation();
      if (laneIndex < LANES.length - 1) moveTaskToLane(task.id, LANES[laneIndex + 1], 'keyboard');
    });

    moveWrap.appendChild(leftBtn);
    moveWrap.appendChild(rightBtn);
    footer.appendChild(moveWrap);
    card.appendChild(footer);

    // Click anywhere on card (outside buttons) selects it
    card.addEventListener('click', function (event) {
      if (event.target && event.target.closest('button')) return;
      selectTask(task.id);
    });

    // HTML5 drag events
    card.addEventListener('dragstart', function (event) {
      state.draggedId = task.id;
      card.classList.add('is-dragging');
      if (event.dataTransfer) {
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('text/plain', task.id);
      }
    });

    card.addEventListener('dragend', function () {
      state.draggedId = null;
      card.classList.remove('is-dragging');
      clearDropHighlights();
    });

    return card;
  }

  function buildLaneEmptyState(laneName) {
    var box = createEl('div', 'ov-empty-state ov-empty-state--compact lane-empty');
    var img = document.createElement('img');
    img.className = 'ov-empty-state__art';
    img.src = ASSETS.emptyArt;
    img.alt = 'Badger steward with a cleared checklist';
    img.width = 84;
    img.height = 63;
    img.decoding = 'async';
    box.appendChild(img);
    box.appendChild(createEl('p', '', laneName + ' is clear. Drop a card here or use \u2190 / \u2192.'));
    return box;
  }

  function renderBoard() {
    var visibleTasks = state.tasks.filter(matchesFilters);
    var visibleCountEl = document.getElementById('board-visible-count');
    if (visibleCountEl) {
      visibleCountEl.textContent = 'Showing ' + visibleTasks.length + ' of ' + state.tasks.length + ' items';
    }

    var emptyHost = document.getElementById('board-empty-host');
    var scrollHost = document.getElementById('kanban-scroll');
    var noVisibleAtAll = visibleTasks.length === 0;

    if (emptyHost) emptyHost.hidden = !noVisibleAtAll;
    if (scrollHost) scrollHost.hidden = noVisibleAtAll;

    LANES.forEach(function (laneName) {
      var listEl = document.querySelector('[data-lane-drop="' + laneName + '"]');
      var countEl = document.querySelector('[data-lane-count="' + laneName + '"]');
      var laneTasks = visibleTasks.filter(function (t) { return t.lane === laneName; });

      if (countEl) countEl.textContent = String(laneTasks.length);
      if (!listEl) return;

      listEl.textContent = '';
      if (laneTasks.length === 0) {
        listEl.appendChild(buildLaneEmptyState(laneName));
      } else {
        laneTasks.forEach(function (task) {
          listEl.appendChild(buildCardElement(task));
        });
      }
    });
  }

  /* ------------------------------------------------------------------------ */
  /* Render Right Detail Drawer                                               */
  /* ------------------------------------------------------------------------ */

  function renderDetailDrawer() {
    var task = getTaskById(state.selectedId) || state.tasks[0];
    if (!task) return;
    state.selectedId = task.id;

    var keyBadge = document.getElementById('detail-key');
    if (keyBadge) keyBadge.textContent = task.id;

    var body = document.getElementById('detail-drawer-body');
    if (!body) return;
    body.textContent = '';

    var steward = getSteward(task.assignee);

    // Hero block with ONE full-body helper
    var hero = createEl('div', 'detail-hero');
    var heroText = createEl('div', '');
    heroText.appendChild(createEl('h3', 'detail-hero__title', task.title));

    var tags = createEl('div', 'detail-hero__tags');
    tags.appendChild(createEl('span', typeChipClass(task.type), task.type));
    tags.appendChild(createEl('span', priorityChipClass(task.priority), task.priority));
    tags.appendChild(createEl('span', 'ov-chip', task.workspace));
    heroText.appendChild(tags);
    hero.appendChild(heroText);

    var helperImg = document.createElement('img');
    helperImg.className = 'detail-hero__helper';
    helperImg.src = steward.fullbody;
    helperImg.alt = steward.fullbodyAlt;
    helperImg.width = 86;
    helperImg.height = 86;
    helperImg.decoding = 'async';
    hero.appendChild(helperImg);
    body.appendChild(hero);

    if (task.blocked) {
      var banner = createEl('div', 'detail-blocked-banner');
      var seal = document.createElement('img');
      seal.src = ASSETS.blockedSeal;
      seal.alt = 'Blocked wax seal';
      seal.width = 28;
      seal.height = 28;
      seal.decoding = 'async';
      banner.appendChild(seal);
      banner.appendChild(createEl('span', '', task.blockedReason || 'Blocked by an active dependency.'));
      body.appendChild(banner);
    }

    body.appendChild(createEl('p', 'detail-description', task.description || 'No additional description recorded yet.'));

    // Interactive Controls: Status Lane, Priority, Assignee, Blocked
    var controls = createEl('div', 'detail-controls');

    // Status Lane select
    var statusGroup = createEl('div', 'ov-field-group');
    var statusLabel = createEl('label', 'ov-label', 'Status Lane');
    statusLabel.setAttribute('for', 'detail-status-select');
    var statusSelect = createEl('select', 'ov-select');
    statusSelect.id = 'detail-status-select';
    LANES.forEach(function (laneName) {
      var opt = document.createElement('option');
      opt.value = laneName;
      opt.textContent = laneName;
      if (laneName === task.lane) opt.selected = true;
      statusSelect.appendChild(opt);
    });
    statusSelect.addEventListener('change', function () {
      moveTaskToLane(task.id, statusSelect.value, 'drawer');
    });
    statusGroup.appendChild(statusLabel);
    statusGroup.appendChild(statusSelect);
    controls.appendChild(statusGroup);

    // Priority select
    var prioGroup = createEl('div', 'ov-field-group');
    var prioLabel = createEl('label', 'ov-label', 'Priority');
    prioLabel.setAttribute('for', 'detail-priority-select');
    var prioSelect = createEl('select', 'ov-select');
    prioSelect.id = 'detail-priority-select';
    PRIORITIES.forEach(function (p) {
      var opt = document.createElement('option');
      opt.value = p;
      opt.textContent = p;
      if (p === task.priority) opt.selected = true;
      prioSelect.appendChild(opt);
    });
    prioSelect.addEventListener('change', function () {
      task.priority = prioSelect.value;
      pushActivity(task.assignee, 'set priority to ' + task.priority + ' on', task.id, task.title);
      renderAll();
      toastNotice(task.id + ' priority updated to ' + task.priority + '.', 'info');
    });
    prioGroup.appendChild(prioLabel);
    prioGroup.appendChild(prioSelect);
    controls.appendChild(prioGroup);

    // Assignee select
    var assigneeGroup = createEl('div', 'ov-field-group detail-controls__full');
    var assigneeLabel = createEl('label', 'ov-label', 'Assignee');
    assigneeLabel.setAttribute('for', 'detail-assignee-select');
    var assigneeSelect = createEl('select', 'ov-select');
    assigneeSelect.id = 'detail-assignee-select';
    Object.keys(STEWARDS).forEach(function (sid) {
      var s = STEWARDS[sid];
      var opt = document.createElement('option');
      opt.value = s.id;
      opt.textContent = s.name + ' \u2014 ' + s.role;
      if (s.id === task.assignee) opt.selected = true;
      assigneeSelect.appendChild(opt);
    });
    assigneeSelect.addEventListener('change', function () {
      task.assignee = assigneeSelect.value;
      var nextSteward = getSteward(task.assignee);
      pushActivity(task.assignee, 'assigned ' + nextSteward.name + ' to', task.id, task.title);
      renderAll();
      toastNotice(task.id + ' assigned to ' + nextSteward.name + '.', 'info');
    });
    assigneeGroup.appendChild(assigneeLabel);
    assigneeGroup.appendChild(assigneeSelect);
    controls.appendChild(assigneeGroup);

    // Blocked toggle
    var blockedWrap = createEl('div', 'detail-controls__full');
    var blockedLabel = createEl('label', 'ov-check');
    var blockedInput = document.createElement('input');
    blockedInput.type = 'checkbox';
    blockedInput.checked = !!task.blocked;
    blockedInput.addEventListener('change', function () {
      task.blocked = blockedInput.checked;
      if (task.blocked && !task.blockedReason) {
        task.blockedReason = 'Flagged as blocked pending dependency resolution.';
      }
      pushActivity(task.assignee, task.blocked ? 'flagged blocker on' : 'cleared blocker on', task.id, task.title);
      renderAll();
      toastNotice(task.id + (task.blocked ? ' marked as blocked.' : ' blocker cleared.'), task.blocked ? 'warning' : 'success');
    });
    blockedLabel.appendChild(blockedInput);
    blockedLabel.appendChild(createEl('span', '', 'Blocked by dependency'));
    blockedWrap.appendChild(blockedLabel);
    controls.appendChild(blockedWrap);

    body.appendChild(controls);

    // Compact facts strip
    var facts = createEl('dl', 'detail-facts');
    var ptsRow = document.createElement('div');
    ptsRow.appendChild(createEl('dt', '', 'Story Points:'));
    ptsRow.appendChild(createEl('dd', '', task.points + (task.points === 1 ? ' pt' : ' pts')));
    var dueRow = document.createElement('div');
    dueRow.appendChild(createEl('dt', '', 'Target Date:'));
    dueRow.appendChild(createEl('dd', '', task.dueDate || 'May 30, 2025'));
    facts.appendChild(ptsRow);
    facts.appendChild(dueRow);
    body.appendChild(facts);

    // Interactive Subtasks
    var subtaskSection = createEl('section', 'detail-section');
    var doneSub = task.subtasks.filter(function (s) { return s.done; }).length;
    var totalSub = task.subtasks.length;
    var subPct = totalSub > 0 ? Math.round((doneSub / totalSub) * 100) : 0;

    var subHead = createEl('div', 'detail-section__head');
    subHead.appendChild(createEl('h4', '', 'Subtasks'));
    subHead.appendChild(createEl('span', 'ov-chip ov-chip--green', doneSub + ' / ' + totalSub));
    subtaskSection.appendChild(subHead);

    var subMeter = createEl('div', 'ov-meter detail-subtask-meter');
    subMeter.setAttribute('role', 'progressbar');
    subMeter.setAttribute('aria-label', 'Subtask completion');
    subMeter.setAttribute('aria-valuemin', '0');
    subMeter.setAttribute('aria-valuemax', '100');
    subMeter.setAttribute('aria-valuenow', String(subPct));
    var subFill = document.createElement('span');
    subFill.style.width = subPct + '%';
    subMeter.appendChild(subFill);
    subtaskSection.appendChild(subMeter);

    if (totalSub === 0) {
      subtaskSection.appendChild(createEl('p', 'ov-muted', 'No subtasks listed for this item.'));
    } else {
      var subList = createEl('ul', 'subtask-list');
      task.subtasks.forEach(function (subtask, idx) {
        var li = createEl('li', 'subtask-item');
        var chkLabel = createEl('label', 'ov-check');
        var cb = document.createElement('input');
        cb.type = 'checkbox';
        cb.checked = !!subtask.done;
        cb.addEventListener('change', function () {
          subtask.done = cb.checked;
          pushActivity(
            task.assignee,
            subtask.done ? 'checked off subtask on' : 'reopened subtask on',
            task.id,
            subtask.text
          );
          renderAll();
          announceSR('Subtask "' + subtask.text + '" ' + (subtask.done ? 'completed' : 'reopened'));
        });
        var textSpan = createEl('span', 'subtask-item__label' + (subtask.done ? ' is-done' : ''), subtask.text);
        chkLabel.appendChild(cb);
        chkLabel.appendChild(textSpan);
        li.appendChild(chkLabel);
        subList.appendChild(li);
      });
      subtaskSection.appendChild(subList);
    }
    body.appendChild(subtaskSection);

    // Dependencies (never wraps "Depends on")
    var depSection = createEl('section', 'detail-section');
    var depHead = createEl('div', 'detail-section__head');
    depHead.appendChild(createEl('h4', '', 'Dependencies'));
    depSection.appendChild(depHead);

    if (!task.dependencies || task.dependencies.length === 0) {
      depSection.appendChild(createEl('p', 'ov-muted', 'No linked blockers or downstream items.'));
    } else {
      var depDl = createEl('dl', 'dependency-list');
      task.dependencies.forEach(function (dep) {
        var linkedTask = getTaskById(dep.key);
        var liveStatus = linkedTask ? linkedTask.lane : dep.status;
        var row = createEl('div', 'dependency-row');
        row.appendChild(createEl('dt', '', dep.relation));
        var dd = document.createElement('dd');
        if (linkedTask) {
          var jumpBtn = createEl('button', 'dependency-link', dep.key);
          jumpBtn.type = 'button';
          jumpBtn.addEventListener('click', function () {
            selectTask(linkedTask.id);
          });
          dd.appendChild(jumpBtn);
        } else {
          dd.appendChild(createEl('span', 'ov-mono', dep.key));
        }
        dd.appendChild(createEl('span', '', dep.title));
        dd.appendChild(createEl('span', statusChipClass(liveStatus), liveStatus));
        row.appendChild(dd);
        depDl.appendChild(row);
      });
      depSection.appendChild(depDl);
    }
    body.appendChild(depSection);

    // Comments + Inline Add Comment Form
    var comSection = createEl('section', 'detail-section');
    var comHead = createEl('div', 'detail-section__head');
    comHead.appendChild(createEl('h4', '', 'Comments'));
    comHead.appendChild(createEl('span', 'ov-chip', String(task.comments.length)));
    comSection.appendChild(comHead);

    var comList = createEl('ul', 'comment-list');
    if (task.comments.length === 0) {
      var emptyCom = createEl('li', 'ov-muted', 'No comments yet. Leave a note for the guild below.');
      comList.appendChild(emptyCom);
    } else {
      task.comments.forEach(function (c) {
        var author = getSteward(c.author);
        var li = createEl('li', 'comment-item');
        var img = document.createElement('img');
        img.src = author.avatar;
        img.alt = author.name;
        img.width = 28;
        img.height = 28;
        img.decoding = 'async';
        li.appendChild(img);

        var content = document.createElement('div');
        var meta = createEl('div', 'comment-item__meta');
        meta.appendChild(createEl('strong', '', author.name));
        meta.appendChild(createEl('span', 'comment-item__time', c.time));
        content.appendChild(meta);
        content.appendChild(createEl('p', 'comment-item__text', c.text));
        li.appendChild(content);
        comList.appendChild(li);
      });
    }
    comSection.appendChild(comList);

    var comForm = createEl('form', 'comment-form');
    var comLabel = createEl('label', 'ov-sr-only', 'Add a comment on ' + task.id);
    comLabel.setAttribute('for', 'detail-comment-input');
    var comInput = createEl('input', 'ov-input');
    comInput.id = 'detail-comment-input';
    comInput.type = 'text';
    comInput.placeholder = 'Add a comment...';
    comInput.autocomplete = 'off';
    var comSubmit = createEl('button', 'ov-button ov-button--sm', 'Post');
    comSubmit.type = 'submit';

    comForm.addEventListener('submit', function (event) {
      event.preventDefault();
      var text = comInput.value.trim();
      if (!text) return;
      task.comments.push({
        author: 'rook',
        time: 'Just now',
        text: text
      });
      pushActivity('rook', 'commented on', task.id, task.title);
      renderDetailDrawer();
      toastNotice('Comment added to ' + task.id + '.', 'success');
    });

    comForm.appendChild(comLabel);
    comForm.appendChild(comInput);
    comForm.appendChild(comSubmit);
    comSection.appendChild(comForm);
    body.appendChild(comSection);
  }

  /* ------------------------------------------------------------------------ */
  /* Render Guild Activity Feed                                               */
  /* ------------------------------------------------------------------------ */

  function renderActivityFeed() {
    var list = document.getElementById('activity-feed');
    var badge = document.getElementById('activity-count');
    if (badge) {
      badge.textContent = state.activity.length + (state.activity.length === 1 ? ' event' : ' events');
    }
    if (!list) return;
    list.textContent = '';

    state.activity.forEach(function (entry) {
      var steward = getSteward(entry.actor);
      var li = createEl('li', 'activity-item');

      var img = document.createElement('img');
      img.className = 'activity-item__avatar';
      img.src = steward.avatar;
      img.alt = steward.name;
      img.width = 30;
      img.height = 30;
      img.decoding = 'async';
      li.appendChild(img);

      var wrap = document.createElement('div');
      var p = createEl('p', 'activity-item__text');
      p.appendChild(createEl('strong', '', steward.name + ' '));
      p.appendChild(document.createTextNode(entry.action + ' '));
      p.appendChild(createEl('span', 'activity-item__key', entry.key));
      if (entry.detail) {
        p.appendChild(document.createTextNode(' \u2014 ' + entry.detail));
      }
      wrap.appendChild(p);
      wrap.appendChild(createEl('span', 'activity-item__time', entry.time));
      li.appendChild(wrap);

      list.appendChild(li);
    });
  }

  /* ------------------------------------------------------------------------ */
  /* Actions                                                                  */
  /* ------------------------------------------------------------------------ */

  function selectTask(taskId) {
    if (!getTaskById(taskId)) return;
    state.selectedId = taskId;
    renderBoard();
    renderDetailDrawer();
  }

  function moveTaskToLane(taskId, targetLane, source) {
    var task = getTaskById(taskId);
    if (!task || LANES.indexOf(targetLane) === -1) return;
    if (task.lane === targetLane) return;

    var fromLane = task.lane;
    task.lane = targetLane;
    state.selectedId = task.id;

    pushActivity(task.assignee, 'moved', task.id, 'from ' + fromLane + ' to ' + targetLane);
    renderAll();

    var msg = task.id + ' moved to ' + targetLane + '.';
    if (source === 'drag' || source === 'keyboard' || source === 'drawer') {
      toastNotice(msg, targetLane === 'Done' ? 'success' : 'info');
    }
  }

  function clearAllFilters() {
    state.filters.workspace = 'all';
    state.filters.priority = null;
    state.filters.type = null;
    state.filters.assignee = null;
    state.filters.blockedOnly = false;
    state.filters.search = '';

    var searchInput = document.getElementById('board-search');
    if (searchInput) searchInput.value = '';

    renderAll();
    announceSR('All board filters cleared.');
  }

  function clearDropHighlights() {
    var zones = document.querySelectorAll('[data-lane-drop]');
    for (var i = 0; i < zones.length; i++) {
      zones[i].classList.remove('is-drop-target');
    }
  }

  function renderAll() {
    renderSprintMetrics();
    renderFilterControls();
    renderBoard();
    renderDetailDrawer();
  }

  /* ------------------------------------------------------------------------ */
  /* Static UI Wiring & Bootstrap                                             */
  /* ------------------------------------------------------------------------ */

  function populateStewardControls() {
    var filterHost = document.getElementById('assignee-filter-list');
    var createSelect = document.getElementById('create-assignee');

    Object.keys(STEWARDS).forEach(function (sid) {
      var s = STEWARDS[sid];

      if (filterHost) {
        var btn = createEl('button', 'assignee-chip');
        btn.type = 'button';
        btn.setAttribute('data-filter-kind', 'assignee');
        btn.setAttribute('data-filter-value', s.id);
        btn.setAttribute('aria-pressed', 'false');

        var img = document.createElement('img');
        img.src = s.avatar;
        img.alt = '';
        img.width = 20;
        img.height = 20;
        img.decoding = 'async';

        btn.appendChild(img);
        btn.appendChild(createEl('span', '', s.name));
        filterHost.appendChild(btn);
      }

      if (createSelect) {
        var opt = document.createElement('option');
        opt.value = s.id;
        opt.textContent = s.name + ' \u2014 ' + s.role;
        createSelect.appendChild(opt);
      }
    });
  }

  function bindEvents() {
    // Workspace selection
    var wsList = document.getElementById('workspace-list');
    if (wsList) {
      wsList.addEventListener('click', function (event) {
        var btn = event.target && event.target.closest('[data-workspace]');
        if (!btn) return;
        state.filters.workspace = btn.getAttribute('data-workspace') || 'all';
        renderAll();
      });
    }

    // Filter chips (delegated across left rail)
    var leftRail = document.querySelector('.board-rail-left');
    if (leftRail) {
      leftRail.addEventListener('click', function (event) {
        var chip = event.target && event.target.closest('[data-filter-kind]');
        if (!chip) return;
        var kind = chip.getAttribute('data-filter-kind');
        var val = chip.getAttribute('data-filter-value');
        if (kind === 'priority') {
          state.filters.priority = state.filters.priority === val ? null : val;
        } else if (kind === 'type') {
          state.filters.type = state.filters.type === val ? null : val;
        } else if (kind === 'assignee') {
          state.filters.assignee = state.filters.assignee === val ? null : val;
        } else if (kind === 'blocked') {
          state.filters.blockedOnly = !state.filters.blockedOnly;
        }
        renderAll();
      });
    }

    // Clear filters buttons
    var clearBtn = document.getElementById('clear-filters-btn');
    if (clearBtn) clearBtn.addEventListener('click', clearAllFilters);
    var emptyClearBtn = document.getElementById('empty-clear-filters-btn');
    if (emptyClearBtn) emptyClearBtn.addEventListener('click', clearAllFilters);

    // Search input
    var searchInput = document.getElementById('board-search');
    if (searchInput) {
      searchInput.addEventListener('input', function () {
        state.filters.search = searchInput.value.trim();
        renderAll();
      });
    }

    // Mobile lane collapse toggles
    var toggles = document.querySelectorAll('[data-lane-toggle]');
    for (var i = 0; i < toggles.length; i++) {
      toggles[i].addEventListener('click', function (event) {
        var btn = event.currentTarget;
        var targetId = btn.getAttribute('aria-controls');
        var panel = targetId ? document.getElementById(targetId) : null;
        if (!panel) return;
        var expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', expanded ? 'false' : 'true');
        panel.hidden = expanded;
      });
    }

    // HTML5 Drag & Drop on lanes
    var dropZones = document.querySelectorAll('[data-lane-drop]');
    for (var j = 0; j < dropZones.length; j++) {
      (function (zone) {
        var targetLane = zone.getAttribute('data-lane-drop');
        zone.addEventListener('dragover', function (event) {
          event.preventDefault();
          if (event.dataTransfer) event.dataTransfer.dropEffect = 'move';
          zone.classList.add('is-drop-target');
        });
        zone.addEventListener('dragleave', function (event) {
          if (!zone.contains(event.relatedTarget)) {
            zone.classList.remove('is-drop-target');
          }
        });
        zone.addEventListener('drop', function (event) {
          event.preventDefault();
          zone.classList.remove('is-drop-target');
          var droppedId = state.draggedId || (event.dataTransfer ? event.dataTransfer.getData('text/plain') : '');
          if (droppedId) {
            moveTaskToLane(droppedId, targetLane, 'drag');
          }
        });
      })(dropZones[j]);
    }

    // Quick Create form submission
    var createForm = document.getElementById('quick-create-form');
    var titleInput = document.getElementById('create-title');
    var titleError = document.getElementById('create-title-error');

    if (titleInput && titleError) {
      titleInput.addEventListener('input', function () {
        if (titleInput.value.trim()) {
          titleInput.removeAttribute('aria-invalid');
          titleError.hidden = true;
        }
      });
    }

    if (createForm) {
      createForm.addEventListener('submit', function (event) {
        event.preventDefault();
        var title = titleInput ? titleInput.value.trim() : '';
        if (!title) {
          if (titleInput) {
            titleInput.setAttribute('aria-invalid', 'true');
            titleInput.focus();
          }
          if (titleError) titleError.hidden = false;
          return;
        }

        var type = document.getElementById('create-type').value;
        var lane = document.getElementById('create-lane').value;
        var priority = document.getElementById('create-priority').value;
        var points = parseInt(document.getElementById('create-points').value, 10) || 3;
        var workspace = document.getElementById('create-workspace').value;
        var assignee = document.getElementById('create-assignee').value;
        var description = document.getElementById('create-description').value.trim();
        var blocked = document.getElementById('create-blocked').checked;

        var key;
        if (type === 'Bug') {
          key = 'BUG-' + state.nextBugNumber++;
        } else {
          key = 'PLAT-' + state.nextPlatNumber++;
        }

        var newTask = {
          id: key,
          title: title,
          type: type,
          lane: lane,
          priority: priority,
          points: points,
          workspace: workspace,
          assignee: assignee,
          dueDate: 'May 30, 2025',
          blocked: blocked,
          blockedReason: blocked ? 'Flagged as blocked during quick create.' : '',
          description: description || 'Created via Quick Create for Sprint 18: Orchard Foundations.',
          subtasks: [
            { text: 'Confirm acceptance criteria', done: false },
            { text: 'Review with guild steward', done: false }
          ],
          dependencies: [],
          comments: []
        };

        state.tasks.unshift(newTask);
        state.selectedId = newTask.id;

        // If active filters would hide the newly created card, clear filters so the user sees it immediately
        if (!matchesFilters(newTask)) {
          clearAllFilters();
        } else {
          renderAll();
        }

        pushActivity(assignee, 'created', newTask.id, newTask.title + ' in ' + lane);
        toastNotice('Created ' + newTask.id + ': ' + newTask.title, 'success');

        createForm.reset();
        if (titleInput) titleInput.removeAttribute('aria-invalid');
        if (titleError) titleError.hidden = true;

        if (window.OrchardVale && typeof window.OrchardVale.closeDialog === 'function') {
          window.OrchardVale.closeDialog('quick-create-dialog');
        } else {
          var dialog = document.getElementById('quick-create-dialog');
          if (dialog && typeof dialog.close === 'function') dialog.close();
        }
      });
    }
  }

  function init() {
    populateStewardControls();
    bindEvents();
    renderActivityFeed();
    renderAll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
