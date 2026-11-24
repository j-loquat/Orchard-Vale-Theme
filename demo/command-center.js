/* Orchard Vale Command Center — interactive state & district drill-down controller.
   Zero external dependencies, file://-safe vanilla JS IIFE. */

(function () {
  'use strict';

  var ASSET_BASE = '../src/assets/orchard-vale/';

  var BUILDINGS = {
    forge: {
      id: 'forge',
      name: 'Blacksmith Forge',
      role: 'Builder / Implementer',
      districtMap: 'maps/backgrounds/map-district-forge-unlabeled-16x9.webp',
      x: 74,
      y: 65,
      shield: 'maps/controls/marker-shield-amber.svg',
      health: 'Healthy',
      healthTone: 'green',
      agents: 7,
      openTasks: 14,
      blockers: 1,
      extraLabel: 'Open Tasks',
      extraValue: '14',
      fourthLabel: 'Blockers',
      fourthValue: '1',
      summary: 'Active build bays forging the Payment Service and User Authentication modules with automated patch verification.',
      stations: [
        { id: 'forge-anvil', name: 'Anvil Build Bay', role: 'Core Compilation', x: 46, y: 54, marker: 'maps/controls/marker-shield-green.svg', status: 'Healthy', detail: '14 build targets active · Payment Service at 68%.' },
        { id: 'forge-intake', name: 'Ore & PR Intake', role: 'Patch Triage', x: 43, y: 14, marker: 'maps/controls/marker-pin-blue.svg', status: 'Ready', detail: '3 pull requests staged for implementer review.' },
        { id: 'forge-bellows', name: 'Steam Compiler', role: 'Worker Pool', x: 33, y: 86, marker: 'maps/controls/marker-pin-amber.svg', status: 'Busy', detail: 'High parallelism active across 7 guild builders.' },
        { id: 'forge-crane', name: 'Artifact Crane', role: 'Release Hoist', x: 83, y: 44, marker: 'maps/controls/marker-shield-green.svg', status: 'Healthy', detail: 'Signed build bundles queued for Watermill CI.' }
      ]
    },
    watchtower: {
      id: 'watchtower',
      name: 'Watchtower',
      role: 'Monitoring / Alerts',
      districtMap: null,
      x: 82,
      y: 17,
      shield: 'maps/controls/marker-shield-red.svg',
      health: 'Watch',
      healthTone: 'amber',
      agents: 3,
      openTasks: 2,
      blockers: 0,
      extraLabel: 'Open Alerts',
      extraValue: '2',
      fourthLabel: 'Incidents',
      fourthValue: '0',
      summary: 'High-ridge telemetry post monitoring worker node memory, API latency, and village heartbeat checks.',
      stations: []
    },
    library: {
      id: 'library',
      name: 'Scribe House',
      role: 'Planner / Docs',
      districtMap: 'maps/backgrounds/map-district-library-unlabeled-16x9.webp',
      x: 69,
      y: 43,
      shield: 'maps/controls/marker-shield-blue.svg',
      health: 'Healthy',
      healthTone: 'green',
      agents: 4,
      openTasks: 8,
      blockers: 0,
      extraLabel: 'Open Tasks',
      extraValue: '8',
      fourthLabel: 'Blockers',
      fourthValue: '0',
      summary: 'Quiet domed archive drafting architecture blueprints, API reference manuals, and rollout diagrams.',
      stations: [
        { id: 'lib-hall', name: 'API Reference Hall', role: 'Doc Generation', x: 59, y: 51, marker: 'maps/controls/marker-shield-green.svg', status: 'Healthy', detail: 'Docu Deer updating REST and webhook contract guides.' },
        { id: 'lib-alcove', name: 'Spec Archives', role: 'RFC Ledger', x: 32, y: 27, marker: 'maps/controls/marker-pin-blue.svg', status: 'Ready', detail: '8 specifications indexed and cross-referenced.' },
        { id: 'lib-loom', name: 'Diagram Loom', role: 'Visual Maps', x: 63, y: 70, marker: 'maps/controls/marker-shield-green.svg', status: 'Healthy', detail: 'Sequence diagrams synced at 60% completion.' },
        { id: 'lib-cart', name: 'Changelog Cart', role: 'Release Notes', x: 26, y: 83, marker: 'maps/controls/marker-pin-purple.svg', status: 'Draft', detail: 'Drafting release notes for v2.0 deployment.' }
      ]
    },
    market: {
      id: 'market',
      name: 'General Store',
      role: 'Dependencies',
      districtMap: 'maps/backgrounds/map-district-market-unlabeled-16x9.webp',
      x: 35,
      y: 38,
      shield: 'maps/controls/marker-shield-amber.svg',
      health: 'Healthy',
      healthTone: 'green',
      agents: 3,
      openTasks: 1,
      blockers: 0,
      extraLabel: 'Outdated',
      extraValue: '1',
      fourthLabel: 'Vulnerabilities',
      fourthValue: '0',
      summary: 'Supply square auditing upstream packages, lockfiles, and database query libraries with zero CVEs.',
      stations: [
        { id: 'mkt-fountain', name: 'Registry Fountain', role: 'Package Mirror', x: 49, y: 51, marker: 'maps/controls/marker-shield-green.svg', status: 'Healthy', detail: 'Local mirror cache 99.4% warm across all guilds.' },
        { id: 'mkt-audit', name: 'Package Audit Desk', role: 'License & CVE', x: 48, y: 14, marker: 'maps/controls/marker-pin-blue.svg', status: 'Healthy', detail: '0 known vulnerabilities in active dependency tree.' },
        { id: 'mkt-board', name: 'CVE Advisories', role: 'Upgrade Watch', x: 72, y: 19, marker: 'maps/controls/marker-pin-amber.svg', status: '1 Outdated', detail: 'Minor update available: lodash@4.17.22.' },
        { id: 'mkt-stalls', name: 'Lockfile Stalls', role: 'Pin Integrity', x: 57, y: 76, marker: 'maps/controls/marker-shield-green.svg', status: 'Verified', detail: 'Checksums verified for all 48 packages.' }
      ]
    },
    guildhall: {
      id: 'guildhall',
      name: 'Town Hall',
      role: 'Orchestrator HQ',
      districtMap: 'maps/backgrounds/map-district-guildhall-unlabeled-16x9.webp',
      x: 56,
      y: 24,
      shield: 'maps/controls/marker-shield-green.svg',
      health: 'Healthy',
      healthTone: 'green',
      agents: 1,
      openTasks: 6,
      blockers: 0,
      extraLabel: 'Orch. Load',
      extraValue: '62%',
      fourthLabel: 'Queue Depth',
      fourthValue: '6',
      summary: 'Central council coordinating active quest routing, priority escalation, and guild load balancing.',
      stations: [
        { id: 'gh-council', name: 'Orchestrator Council', role: 'Routing Desk', x: 39, y: 66, marker: 'maps/controls/marker-shield-green.svg', status: 'Healthy', detail: 'Bramble Badger coordinating 6 active quests at 62% load.' },
        { id: 'gh-registry', name: 'Quest Registry', role: 'Priority Ledger', x: 54, y: 45, marker: 'maps/controls/marker-pin-blue.svg', status: '6 Active', detail: '2 High, 3 Medium, and 1 Low priority quests ranked.' },
        { id: 'gh-board', name: 'Dispatch Board', role: 'Guild Signals', x: 36, y: 22, marker: 'maps/controls/marker-pin-amber.svg', status: 'Synced', detail: 'Courier routes open to Forge, Watermill, and Stables.' },
        { id: 'gh-plaza', name: 'Triage Courtyard', role: 'Escalation Ring', x: 86, y: 33, marker: 'maps/controls/marker-shield-green.svg', status: 'Clear', detail: 'No unrouted escalations waiting on council review.' }
      ]
    },
    tavern: {
      id: 'tavern',
      name: 'Tavern',
      role: 'Ops / Coordination',
      districtMap: null,
      x: 53,
      y: 84,
      shield: 'maps/controls/marker-shield-purple.svg',
      health: 'Healthy',
      healthTone: 'green',
      agents: 4,
      openTasks: 5,
      blockers: 1,
      extraLabel: 'Open Tasks',
      extraValue: '5',
      fourthLabel: 'Escalations',
      fourthValue: '1',
      summary: 'Cross-guild coordination commons handling third-party rate limits, partner webhooks, and incident handoffs.',
      stations: []
    },
    watermill: {
      id: 'watermill',
      name: 'Watermill',
      role: 'CI / Automation',
      districtMap: 'maps/backgrounds/map-district-watermill-unlabeled-16x9.webp',
      x: 15,
      y: 55,
      shield: 'maps/controls/marker-shield-green.svg',
      health: 'Healthy',
      healthTone: 'green',
      agents: 3,
      openTasks: 5,
      blockers: 0,
      extraLabel: 'Pipelines',
      extraValue: '5',
      fourthLabel: 'Failures',
      fourthValue: '0',
      summary: 'River-powered automation mill running continuous integration, integration test suites, and security scans.',
      stations: [
        { id: 'wm-sluice', name: 'CI Trigger Sluice', role: 'Build Intake', x: 48, y: 15, marker: 'maps/controls/marker-shield-green.svg', status: 'Active', detail: 'Pipeline #2145 passed all automated gate checks.' },
        { id: 'wm-wheel', name: 'Test Runner Wheel', role: 'Integration Suite', x: 30, y: 53, marker: 'maps/controls/marker-pin-blue.svg', status: '5/5 Green', detail: 'Millie Mole running full integration suite.' },
        { id: 'wm-scanner', name: 'Security Scanner', role: 'Static Analysis', x: 86, y: 26, marker: 'maps/controls/marker-shield-green.svg', status: '5/5 Clean', detail: 'Zero critical or high policy findings.' },
        { id: 'wm-outflow', name: 'Artifact Outflow', role: 'Staging Feed', x: 81, y: 75, marker: 'maps/controls/marker-pin-green.svg', status: 'Ready', detail: 'Signed build delivered to The Stables caravan.' }
      ]
    },
    stables: {
      id: 'stables',
      name: 'The Stables',
      role: 'Deployment',
      districtMap: 'maps/backgrounds/map-district-stables-unlabeled-16x9.webp',
      x: 15,
      y: 80,
      shield: 'maps/controls/marker-shield-blue.svg',
      health: 'Healthy',
      healthTone: 'green',
      agents: 3,
      openTasks: 2,
      blockers: 0,
      extraLabel: 'Deployments',
      extraValue: '2',
      fourthLabel: 'Failures',
      fourthValue: '0',
      summary: 'Courier dispatch yard managing staging caravans, canary health checks, and production release rollouts.',
      stations: [
        { id: 'st-caravan', name: 'Staging Caravan', role: 'Pre-Prod Fleet', x: 50, y: 57, marker: 'maps/controls/marker-shield-green.svg', status: '2/2 Live', detail: 'Staging deployment verified with zero regressions.' },
        { id: 'st-paddock', name: 'Courier Mounts', role: 'Canary Runners', x: 32, y: 31, marker: 'maps/controls/marker-pin-blue.svg', status: 'Saddled', detail: 'Canary health probes armed for production cutover.' },
        { id: 'st-crates', name: 'Prod Release Crates', role: 'Production Gate', x: 68, y: 84, marker: 'maps/controls/marker-pin-amber.svg', status: 'Awaiting Go', detail: 'Stable Stan standing by for Run Deploy Prod.' },
        { id: 'st-harness', name: 'Rollback Harness', role: 'Safety Net', x: 88, y: 64, marker: 'maps/controls/marker-shield-green.svg', status: 'Armed', detail: 'Instant snapshot rollback tested and ready.' }
      ]
    }
  };

  var QUESTS = [
    { id: 'q-1', title: 'Implement Payment Service', eta: '2h 15m', priority: 'high', progress: 68, guild: 'Implementer Team', building: 'forge', agentId: 'forge-fox' },
    { id: 'q-2', title: 'Add User Authentication', eta: '3h 40m', priority: 'high', progress: 42, guild: 'Implementer Team', building: 'forge', agentId: 'forge-fox' },
    { id: 'q-3', title: 'Fix API Rate Limit Bug', eta: '1h 25m', priority: 'medium', progress: 71, guild: 'Bug Squashers', building: 'tavern', agentId: 'bramble' },
    { id: 'q-4', title: 'Write Integration Tests', eta: '2h 10m', priority: 'medium', progress: 35, guild: 'Quality Guild', building: 'watermill', agentId: 'millie' },
    { id: 'q-5', title: 'Update Docs & Diagrams', eta: '1h 50m', priority: 'low', progress: 60, guild: 'Scribe Guild', building: 'library', agentId: 'docu-deer' },
    { id: 'q-6', title: 'Optimize DB Queries', eta: '3h 5m', priority: 'medium', progress: 20, guild: 'Performance Guild', building: 'market', agentId: 'pippa' }
  ];

  var AGENTS = [
    { id: 'bramble', name: 'Bramble Badger', role: 'Orchestrator', task: 'Coordinating workflows', status: 'Healthy', load: 72, building: 'guildhall', avatar: 'characters/avatars/avatar-badger-orchestrator-neutral-512.webp' },
    { id: 'pippa', name: 'Pippa Planner', role: 'Planner / Strategist', task: 'Drafting rollout plan', status: 'Healthy', load: 68, building: 'market', avatar: 'characters/avatars/avatar-rabbit-planner-attentive-512.webp' },
    { id: 'forge-fox', name: 'Forge Fox', role: 'Implementer', task: 'Implementing payment svc', status: 'Busy', load: 85, building: 'forge', avatar: 'characters/avatars/avatar-fox-implementer-focused-512.webp' },
    { id: 'docu-deer', name: 'Docu Deer', role: 'Scribe / Docs', task: 'Updating API reference', status: 'Healthy', load: 55, building: 'library', avatar: 'characters/avatars/avatar-deer-governance-calm-512.webp' },
    { id: 'millie', name: 'Millie Mole', role: 'CI Engineer', task: 'Running integration tests', status: 'Healthy', load: 61, building: 'watermill', avatar: 'characters/avatars/avatar-mole-engineer-focused-512.webp' },
    { id: 'stan', name: 'Stable Stan', role: 'Deployer', task: 'Preparing production deploy', status: 'Busy', load: 77, building: 'stables', avatar: 'characters/avatars/avatar-squirrel-resource-manager-busy-512.webp' }
  ];

  var CHRONICLE = [
    { id: 'c-1', time: '10:41 AM', type: 'alert', label: 'Alert', message: 'High memory usage on worker node mill-03', source: 'Watchtower', building: 'watchtower', acked: false },
    { id: 'c-2', time: '10:38 AM', type: 'success', label: 'Success', message: 'Deployment to staging completed successfully', source: 'The Stables', building: 'stables', acked: false },
    { id: 'c-3', time: '10:35 AM', type: 'checkpoint', label: 'Checkpoint', message: 'Quest "Implement Payment Service" reached 50%', source: 'Town Hall', building: 'guildhall', acked: false },
    { id: 'c-4', time: '10:32 AM', type: 'info', label: 'Info', message: 'New dependency update available: lodash@4.17.22', source: 'General Store', building: 'market', acked: false },
    { id: 'c-5', time: '10:29 AM', type: 'success', label: 'Success', message: 'CI Pipeline #2145 passed all checks', source: 'Watermill', building: 'watermill', acked: false },
    { id: 'c-6', time: '10:26 AM', type: 'warning', label: 'Warning', message: 'Rate limit approaching on ThirdParty API', source: 'Tavern', building: 'tavern', acked: false }
  ];

  var PROVERBS = [
    '\u201cA well-orchestrated village turns many hands toward one worthy quest.\u201d',
    '\u201cSharp tests at the watermill spare a midnight bell at the watchtower.\u201d',
    '\u201cEvery small lantern kept trimmed keeps the whole road clear until dusk.\u201d',
    '\u201cName the steward, mark the ledger, and the guild will carry the load.\u201d',
    '\u201cA steady caravan reaches production faster than a hurried courier.\u201d',
    '\u201cClear documentation outlasts the tallest spire in Orchard Vale.\u201d'
  ];

  var state = {
    questFilter: 'all',
    selectedQuestId: 'q-1',
    selectedAgentId: null,
    mapView: 'overview',
    activeBuildingId: 'guildhall',
    activeStationId: null,
    zoom: 1,
    showCallouts: true,
    chronicleFilter: 'all',
    proverbIndex: 0,
    prodDeployed: false,
    prodDeploying: false,
    currentMapPath: 'maps/backgrounds/map-village-overview-unlabeled-16x9.webp',
    nextQuestSeq: 7,
    nextChronicleSeq: 7
  };

  /* ------------------------------------------------------------------------ */
  /* Helpers                                                                  */
  /* ------------------------------------------------------------------------ */

  function nowClock() {
    var d = new Date();
    var h = d.getHours();
    var m = d.getMinutes();
    var suffix = h >= 12 ? 'PM' : 'AM';
    var h12 = h % 12 || 12;
    return h12 + ':' + (m < 10 ? '0' + m : m) + ' ' + suffix;
  }

  function findAgent(id) {
    for (var i = 0; i < AGENTS.length; i++) {
      if (AGENTS[i].id === id) return AGENTS[i];
    }
    return null;
  }

  function agentsAtBuilding(buildingId) {
    return AGENTS.filter(function (a) { return a.building === buildingId; });
  }

  function notify(message, tone) {
    if (window.OrchardVale && typeof window.OrchardVale.toast === 'function') {
      window.OrchardVale.toast(message, tone || 'success');
    }
  }

  function announce(message) {
    if (window.OrchardVale && typeof window.OrchardVale.announce === 'function') {
      window.OrchardVale.announce(message, 'polite');
    }
  }

  function addChronicleEntry(type, label, message, source, buildingId) {
    CHRONICLE.unshift({
      id: 'c-' + (state.nextChronicleSeq++),
      time: nowClock(),
      type: type,
      label: label,
      message: message,
      source: source,
      building: buildingId,
      acked: false
    });
    renderChronicle();
  }

  /* ------------------------------------------------------------------------ */
  /* Quest Queue                                                              */
  /* ------------------------------------------------------------------------ */

  var questListEl = document.getElementById('quest-list');
  var questCountEl = document.getElementById('quest-count-label');
  var questClearBtn = document.getElementById('quest-clear-filter');

  function priorityChipClass(priority) {
    if (priority === 'high') return 'ov-chip ov-chip--red';
    if (priority === 'medium') return 'ov-chip ov-chip--amber';
    return 'ov-chip ov-chip--green';
  }

  function priorityLabel(priority) {
    if (priority === 'high') return 'High';
    if (priority === 'medium') return 'Medium';
    return 'Low';
  }

  function renderQuests() {
    if (!questListEl) return;
    var visible = QUESTS.filter(function (q) {
      return state.questFilter === 'all' || q.priority === state.questFilter;
    });

    questListEl.textContent = '';

    if (visible.length === 0) {
      var emptyLi = document.createElement('li');
      emptyLi.className = 'cc-quest-item';
      emptyLi.style.padding = '14px 12px';
      emptyLi.style.textAlign = 'center';
      emptyLi.textContent = 'No quests match this priority filter.';
      questListEl.appendChild(emptyLi);
    } else {
      visible.forEach(function (q, idx) {
        var li = document.createElement('li');
        li.className = 'cc-quest-item';

        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'cc-quest-btn';
        if (state.selectedQuestId === q.id) btn.classList.add('is-selected');
        if (state.selectedAgentId && q.agentId === state.selectedAgentId) {
          btn.classList.add('is-agent-match');
        }
        btn.setAttribute('data-quest-id', q.id);

        var rank = document.createElement('span');
        rank.className = 'ov-priority__number' + (idx % 2 === 1 ? ' ov-priority__number--good' : '');
        rank.textContent = String(idx + 1);

        var body = document.createElement('span');
        body.className = 'cc-quest-body';

        var top = document.createElement('span');
        top.className = 'cc-quest-top';
        var name = document.createElement('strong');
        name.className = 'cc-quest-name';
        name.textContent = q.title;
        var eta = document.createElement('span');
        eta.className = 'cc-quest-eta';
        eta.textContent = 'ETA ' + q.eta;
        top.appendChild(name);
        top.appendChild(eta);

        var mid = document.createElement('span');
        mid.className = 'cc-quest-mid';
        var chip = document.createElement('span');
        chip.className = priorityChipClass(q.priority);
        chip.textContent = priorityLabel(q.priority);

        var meter = document.createElement('span');
        meter.className = 'ov-meter cc-quest-meter';
        meter.setAttribute('aria-hidden', 'true');
        var fill = document.createElement('span');
        fill.style.width = q.progress + '%';
        meter.appendChild(fill);

        var pct = document.createElement('span');
        pct.className = 'cc-quest-pct ov-mono';
        pct.textContent = q.progress + '%';

        mid.appendChild(chip);
        mid.appendChild(meter);
        mid.appendChild(pct);

        var building = BUILDINGS[q.building];
        var guild = document.createElement('span');
        guild.className = 'cc-quest-guild';
        guild.textContent = q.guild + (building ? ' \u00b7 ' + building.name : '');

        body.appendChild(top);
        body.appendChild(mid);
        body.appendChild(guild);

        btn.appendChild(rank);
        btn.appendChild(body);
        li.appendChild(btn);
        questListEl.appendChild(li);
      });
    }

    if (questCountEl) {
      questCountEl.textContent = visible.length + (visible.length === 1 ? ' Quest' : ' Quests');
    }
    if (questClearBtn) {
      questClearBtn.hidden = state.questFilter === 'all';
    }
  }

  /* ------------------------------------------------------------------------ */
  /* Guild Roster                                                             */
  /* ------------------------------------------------------------------------ */

  var rosterListEl = document.getElementById('guild-roster-list');
  var rosterFocusBar = document.getElementById('roster-focus-bar');
  var rosterFocusLabel = document.getElementById('roster-focus-label');
  var rosterSummaryEl = document.getElementById('roster-status-summary');

  function renderRoster() {
    if (!rosterListEl) return;
    rosterListEl.textContent = '';

    var healthyCount = 0;
    var busyCount = 0;

    AGENTS.forEach(function (agent) {
      if (agent.status === 'Busy') busyCount++;
      else healthyCount++;

      var li = document.createElement('li');
      li.className = 'cc-roster-item';

      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'cc-agent-btn';
      if (state.selectedAgentId === agent.id) btn.classList.add('is-selected');
      btn.setAttribute('data-agent-id', agent.id);
      btn.setAttribute('aria-pressed', state.selectedAgentId === agent.id ? 'true' : 'false');

      var img = document.createElement('img');
      img.className = 'ov-avatar';
      img.src = ASSET_BASE + agent.avatar;
      img.alt = agent.name + ' portrait';
      img.width = 44;
      img.height = 44;
      img.decoding = 'async';

      var body = document.createElement('span');
      body.className = 'cc-agent-body';

      var top = document.createElement('span');
      top.className = 'cc-agent-top';
      var nameEl = document.createElement('strong');
      nameEl.className = 'cc-agent-name';
      nameEl.textContent = agent.name;
      top.appendChild(nameEl);

      var roleEl = document.createElement('span');
      roleEl.className = 'cc-agent-role';
      var b = BUILDINGS[agent.building];
      roleEl.textContent = agent.role + (b ? ' \u00b7 ' + b.name : '');

      var taskEl = document.createElement('span');
      taskEl.className = 'cc-agent-task';
      taskEl.textContent = agent.task;

      var foot = document.createElement('span');
      foot.className = 'cc-agent-foot';

      var statusChip = document.createElement('span');
      statusChip.className = agent.status === 'Busy' ? 'ov-chip ov-chip--amber' : 'ov-chip ov-chip--green';
      statusChip.textContent = agent.status;

      var meter = document.createElement('span');
      meter.className = 'ov-meter cc-agent-meter';
      meter.setAttribute('aria-hidden', 'true');
      var fill = document.createElement('span');
      fill.style.width = agent.load + '%';
      if (agent.status === 'Busy') fill.className = 'is-busy';
      meter.appendChild(fill);

      var load = document.createElement('span');
      load.className = 'cc-agent-load ov-mono';
      load.textContent = agent.load + '%';

      foot.appendChild(statusChip);
      foot.appendChild(meter);
      foot.appendChild(load);

      body.appendChild(top);
      body.appendChild(roleEl);
      body.appendChild(taskEl);
      body.appendChild(foot);

      btn.appendChild(img);
      btn.appendChild(body);
      li.appendChild(btn);
      rosterListEl.appendChild(li);
    });

    if (rosterSummaryEl) {
      rosterSummaryEl.textContent = healthyCount + ' Healthy \u00b7 ' + busyCount + ' Busy';
    }

    if (rosterFocusBar && rosterFocusLabel) {
      var focused = state.selectedAgentId ? findAgent(state.selectedAgentId) : null;
      rosterFocusBar.hidden = !focused;
      if (focused) {
        var bldg = BUILDINGS[focused.building];
        rosterFocusLabel.textContent = 'Focused: ' + focused.name + (bldg ? ' (' + bldg.name + ')' : '');
      }
    }
  }

  /* ------------------------------------------------------------------------ */
  /* Interactive Village Tableau & 6 District Drill-Down Maps                 */
  /* ------------------------------------------------------------------------ */

  var tableauTitleEl = document.getElementById('tableau-title');
  var mapViewBadgeEl = document.getElementById('map-view-badge');
  var mapBackBtn = document.getElementById('map-back-overview');
  var mapCanvasEl = document.getElementById('map-canvas');
  var mapArtEl = document.getElementById('map-art');
  var mapRoutesEl = document.getElementById('map-routes');
  var mapPinsEl = document.getElementById('map-pins');
  var mapCurrentMarkerEl = document.getElementById('map-current-marker');
  var mapScaleLabelEl = document.getElementById('map-scale-label');
  var ctrlLayersBtn = document.getElementById('ctrl-layers');

  var inspectorQuickEl = document.getElementById('inspector-quick-list');
  var inspectorRoleEl = document.getElementById('inspector-role');
  var inspectorNameEl = document.getElementById('inspector-name');
  var inspectorHealthEl = document.getElementById('inspector-health');
  var inspectorMetricsEl = document.getElementById('inspector-metrics');
  var inspectorSummaryEl = document.getElementById('inspector-summary');
  var inspectorDrillBtn = document.getElementById('inspector-drill-btn');
  var dispatchSelectEl = document.getElementById('dispatch-agent-select');

  function updateMapTransform() {
    if (mapCanvasEl) {
      mapCanvasEl.style.transform = 'scale(' + state.zoom + ')';
    }
    if (mapScaleLabelEl) {
      var baseScale = state.mapView === 'overview' ? '1:2400' : '1:400';
      mapScaleLabelEl.textContent = baseScale + ' \u00b7 ' + Math.round(state.zoom * 100) + '%';
    }
  }

  function pulseMarker() {
    if (!mapCurrentMarkerEl) return;
    mapCurrentMarkerEl.classList.remove('is-pulsing');
    void mapCurrentMarkerEl.offsetWidth;
    mapCurrentMarkerEl.classList.add('is-pulsing');
  }

  function positionCurrentMarker(x, y) {
    if (!mapCurrentMarkerEl) return;
    mapCurrentMarkerEl.style.left = x + '%';
    mapCurrentMarkerEl.style.top = y + '%';
  }

  function renderMap() {
    var isOverview = state.mapView === 'overview';
    var activeBuilding = BUILDINGS[state.activeBuildingId] || BUILDINGS.guildhall;
    var district = isOverview ? null : (BUILDINGS[state.mapView] || BUILDINGS.forge);

    // Sync switcher pills
    var pills = document.querySelectorAll('[data-map-view]');
    for (var i = 0; i < pills.length; i++) {
      var viewKey = pills[i].getAttribute('data-map-view');
      pills[i].setAttribute('aria-pressed', viewKey === state.mapView ? 'true' : 'false');
    }

    // Header & image (only swap src when the map path actually changes)
    if (isOverview) {
      if (tableauTitleEl) tableauTitleEl.textContent = 'Village Overview';
      if (mapViewBadgeEl) mapViewBadgeEl.textContent = '8 Buildings';
      if (mapBackBtn) mapBackBtn.hidden = true;
      var overviewPath = 'maps/backgrounds/map-village-overview-unlabeled-16x9.webp';
      if (mapArtEl && state.currentMapPath !== overviewPath) {
        state.currentMapPath = overviewPath;
        mapArtEl.src = ASSET_BASE + overviewPath;
      }
      if (mapArtEl) {
        mapArtEl.alt = 'Illustrated overview map of Orchard Vale village with clickable buildings';
      }
      if (mapRoutesEl) mapRoutesEl.classList.toggle('is-hidden', !state.showCallouts);
    } else {
      if (tableauTitleEl) tableauTitleEl.textContent = district.name + ' \u2014 District View';
      if (mapViewBadgeEl) mapViewBadgeEl.textContent = district.stations.length + ' Stations';
      if (mapBackBtn) mapBackBtn.hidden = false;
      if (mapArtEl && state.currentMapPath !== district.districtMap) {
        state.currentMapPath = district.districtMap;
        mapArtEl.src = ASSET_BASE + district.districtMap;
      }
      if (mapArtEl) {
        mapArtEl.alt = 'Detailed district map of ' + district.name + ' showing operational stations';
      }
      if (mapRoutesEl) mapRoutesEl.classList.add('is-hidden');
    }

    // Render pins on map + quick-select buttons in inspector
    if (mapPinsEl) {
      mapPinsEl.textContent = '';
      mapPinsEl.classList.toggle('is-compact', !state.showCallouts);
    }
    if (inspectorQuickEl) {
      inspectorQuickEl.textContent = '';
    }

    if (isOverview) {
      Object.keys(BUILDINGS).forEach(function (key) {
        var b = BUILDINGS[key];
        var active = b.id === state.activeBuildingId;

        if (mapPinsEl) {
          var pin = document.createElement('button');
          pin.type = 'button';
          pin.className = 'cc-pin' + (active ? ' is-active' : '');
          pin.style.left = b.x + '%';
          pin.style.top = b.y + '%';
          pin.setAttribute('data-building-pin', b.id);
          pin.setAttribute('aria-label', b.name + ' (' + b.role + '), ' + b.agents + ' active agents, ' + b.health);

          var head = document.createElement('span');
          head.className = 'cc-pin__head';
          var shield = document.createElement('img');
          shield.className = 'cc-pin__shield';
          shield.src = ASSET_BASE + b.shield;
          shield.alt = '';
          shield.width = 16;
          shield.height = 16;
          shield.decoding = 'async';
          var title = document.createElement('span');
          title.className = 'cc-pin__title';
          title.textContent = b.name;
          head.appendChild(shield);
          head.appendChild(title);

          var meta = document.createElement('span');
          meta.className = 'cc-pin__meta';
          var stat = document.createElement('span');
          stat.className = 'cc-pin__meta-stat';
          stat.textContent = b.agents + ' agt';
          var extra = document.createElement('span');
          extra.textContent = b.extraLabel + ': ' + b.extraValue;
          meta.appendChild(stat);
          meta.appendChild(extra);

          pin.appendChild(head);
          pin.appendChild(meta);
          mapPinsEl.appendChild(pin);
        }

        if (inspectorQuickEl) {
          var qBtn = document.createElement('button');
          qBtn.type = 'button';
          qBtn.className = 'cc-quick-node';
          qBtn.setAttribute('data-quick-building', b.id);
          qBtn.setAttribute('aria-pressed', active ? 'true' : 'false');
          qBtn.textContent = b.name;
          inspectorQuickEl.appendChild(qBtn);
        }
      });

      positionCurrentMarker(activeBuilding.x, activeBuilding.y);
      renderInspector(activeBuilding, null);
    } else {
      var activeStation = null;
      district.stations.forEach(function (st, idx) {
        if (!state.activeStationId && idx === 0) state.activeStationId = st.id;
        var isCurrent = st.id === state.activeStationId;
        if (isCurrent) activeStation = st;

        if (mapPinsEl) {
          var sPin = document.createElement('button');
          sPin.type = 'button';
          sPin.className = 'cc-pin' + (isCurrent ? ' is-active' : '');
          sPin.style.left = st.x + '%';
          sPin.style.top = st.y + '%';
          sPin.setAttribute('data-station-pin', st.id);
          sPin.setAttribute('aria-label', st.name + ' (' + st.role + ') \u2014 ' + st.status);

          var sHead = document.createElement('span');
          sHead.className = 'cc-pin__head';
          var sIcon = document.createElement('img');
          sIcon.className = 'cc-pin__shield';
          sIcon.src = ASSET_BASE + st.marker;
          sIcon.alt = '';
          sIcon.width = 16;
          sIcon.height = 16;
          sIcon.decoding = 'async';
          var sTitle = document.createElement('span');
          sTitle.className = 'cc-pin__title';
          sTitle.textContent = st.name;
          sHead.appendChild(sIcon);
          sHead.appendChild(sTitle);

          var sMeta = document.createElement('span');
          sMeta.className = 'cc-pin__meta';
          var sStatus = document.createElement('span');
          sStatus.className = 'cc-pin__meta-stat';
          sStatus.textContent = st.status;
          sMeta.appendChild(sStatus);

          sPin.appendChild(sHead);
          sPin.appendChild(sMeta);
          mapPinsEl.appendChild(sPin);
        }

        if (inspectorQuickEl) {
          var sqBtn = document.createElement('button');
          sqBtn.type = 'button';
          sqBtn.className = 'cc-quick-node';
          sqBtn.setAttribute('data-quick-station', st.id);
          sqBtn.setAttribute('aria-pressed', isCurrent ? 'true' : 'false');
          sqBtn.textContent = st.name;
          inspectorQuickEl.appendChild(sqBtn);
        }
      });

      if (!activeStation && district.stations.length) {
        activeStation = district.stations[0];
        state.activeStationId = activeStation.id;
      }

      if (activeStation) {
        positionCurrentMarker(activeStation.x, activeStation.y);
      }
      renderInspector(district, activeStation);
    }

    updateMapTransform();
  }

  function renderInspector(building, station) {
    var stationed = agentsAtBuilding(building.id);
    var stationedNames = stationed.length
      ? stationed.map(function (a) { return a.name; }).join(', ')
      : 'Rotating watch';

    if (inspectorRoleEl) {
      inspectorRoleEl.textContent = station ? building.name + ' \u00b7 ' + station.role : building.role;
    }
    if (inspectorNameEl) {
      inspectorNameEl.textContent = station ? station.name : building.name;
    }
    if (inspectorHealthEl) {
      var chipTone = building.healthTone === 'amber' ? 'ov-chip--amber' : 'ov-chip--green';
      inspectorHealthEl.className = 'ov-chip ' + chipTone;
      inspectorHealthEl.textContent = station ? station.status : building.health;
    }
    if (inspectorMetricsEl) {
      inspectorMetricsEl.textContent = '';
      var items = [
        { k: 'Active Agents', v: String(building.agents) },
        { k: building.extraLabel, v: String(building.extraValue) },
        { k: building.fourthLabel, v: String(building.fourthValue) },
        { k: 'Stationed', v: stationedNames }
      ];
      items.forEach(function (item) {
        var wrap = document.createElement('div');
        var dt = document.createElement('dt');
        dt.textContent = item.k;
        var dd = document.createElement('dd');
        dd.textContent = item.v;
        wrap.appendChild(dt);
        wrap.appendChild(dd);
        inspectorMetricsEl.appendChild(wrap);
      });
    }
    if (inspectorSummaryEl) {
      inspectorSummaryEl.textContent = station ? station.detail : building.summary;
    }
    if (inspectorDrillBtn) {
      if (state.mapView === 'overview' && building.districtMap) {
        inspectorDrillBtn.hidden = false;
        inspectorDrillBtn.textContent = 'Open ' + building.name + ' Map \u2192';
      } else if (state.mapView !== 'overview') {
        inspectorDrillBtn.hidden = false;
        inspectorDrillBtn.textContent = '\u2190 Back to Village Overview';
      } else {
        inspectorDrillBtn.hidden = true;
      }
    }
  }

  function selectBuilding(buildingId, drillIntoDistrict) {
    var b = BUILDINGS[buildingId];
    if (!b) return;
    state.activeBuildingId = b.id;
    if (drillIntoDistrict && b.districtMap) {
      state.mapView = b.id;
      state.activeStationId = b.stations.length ? b.stations[0].id : null;
      state.zoom = 1;
    } else if (state.mapView !== 'overview' && state.mapView !== b.id) {
      if (b.districtMap) {
        state.mapView = b.id;
        state.activeStationId = b.stations.length ? b.stations[0].id : null;
      } else {
        state.mapView = 'overview';
        state.activeStationId = null;
      }
    }
    renderMap();
    pulseMarker();
  }

  function switchMapView(viewKey) {
    if (viewKey === 'overview') {
      state.mapView = 'overview';
      state.activeStationId = null;
      state.zoom = 1;
      renderMap();
      announce('Switched to Village Overview map.');
      return;
    }
    var b = BUILDINGS[viewKey];
    if (!b || !b.districtMap) return;
    state.mapView = b.id;
    state.activeBuildingId = b.id;
    state.activeStationId = b.stations.length ? b.stations[0].id : null;
    state.zoom = 1;
    renderMap();
    pulseMarker();
    announce('Opened ' + b.name + ' district map.');
  }

  /* ------------------------------------------------------------------------ */
  /* Village Chronicle                                                        */
  /* ------------------------------------------------------------------------ */

  var chronicleTbodyEl = document.getElementById('chronicle-tbody');
  var chronicleTableWrapEl = document.getElementById('chronicle-table-wrap');
  var chronicleEmptyEl = document.getElementById('chronicle-empty');
  var chronicleEmptyTitleEl = document.getElementById('chronicle-empty-title');
  var chronicleEmptyCopyEl = document.getElementById('chronicle-empty-copy');
  var chronicleAlertCountEl = document.getElementById('chronicle-alert-count');
  var ackAllAlertsBtn = document.getElementById('ack-all-alerts-btn');
  var kpiRiskEl = document.getElementById('kpi-risk');
  var kpiRiskScoreEl = document.getElementById('kpi-risk-score');

  function chronicleChipClass(type) {
    if (type === 'alert') return 'ov-chip ov-chip--red';
    if (type === 'warning') return 'ov-chip ov-chip--amber';
    if (type === 'checkpoint' || type === 'info') return 'ov-chip ov-chip--blue';
    return 'ov-chip ov-chip--green';
  }

  function renderChronicle() {
    if (!chronicleTbodyEl) return;

    var activeAlerts = CHRONICLE.filter(function (row) {
      return row.type === 'alert' && !row.acked;
    });

    if (chronicleAlertCountEl) {
      chronicleAlertCountEl.textContent = activeAlerts.length + (activeAlerts.length === 1 ? ' Alert' : ' Alerts');
      chronicleAlertCountEl.className = activeAlerts.length > 0 ? 'ov-chip ov-chip--red' : 'ov-chip ov-chip--green';
    }
    if (ackAllAlertsBtn) {
      ackAllAlertsBtn.disabled = activeAlerts.length === 0;
    }
    if (kpiRiskEl && kpiRiskScoreEl) {
      if (activeAlerts.length === 0) {
        kpiRiskEl.textContent = 'Clear';
        kpiRiskScoreEl.textContent = 'Score 8/100';
      } else {
        kpiRiskEl.textContent = 'Low';
        kpiRiskScoreEl.textContent = 'Score 18/100';
      }
    }

    // Update Watchtower alert count live
    if (BUILDINGS.watchtower) {
      BUILDINGS.watchtower.extraValue = String(activeAlerts.length);
      BUILDINGS.watchtower.health = activeAlerts.length > 0 ? 'Watch' : 'Healthy';
      BUILDINGS.watchtower.healthTone = activeAlerts.length > 0 ? 'amber' : 'green';
    }

    var rows = CHRONICLE.filter(function (row) {
      if (state.chronicleFilter === 'all') return true;
      if (state.chronicleFilter === 'alert') return row.type === 'alert' && !row.acked;
      return row.type === state.chronicleFilter;
    });

    chronicleTbodyEl.textContent = '';

    if (rows.length === 0) {
      if (chronicleTableWrapEl) chronicleTableWrapEl.hidden = true;
      if (chronicleEmptyEl) chronicleEmptyEl.hidden = false;
      if (chronicleEmptyTitleEl) {
        chronicleEmptyTitleEl.textContent = state.chronicleFilter === 'alert'
          ? 'Zero active alerts in the vale'
          : 'No chronicle entries in this filter';
      }
      if (chronicleEmptyCopyEl) {
        chronicleEmptyCopyEl.textContent = state.chronicleFilter === 'alert'
          ? 'Every watchtower alert has been acknowledged. Millie Mole reports all gears and lanterns are clear.'
          : 'Switch back to All to inspect the complete village activity log.';
      }
      return;
    }

    if (chronicleTableWrapEl) chronicleTableWrapEl.hidden = false;
    if (chronicleEmptyEl) chronicleEmptyEl.hidden = true;

    rows.forEach(function (row) {
      var tr = document.createElement('tr');

      var tdTime = document.createElement('td');
      tdTime.className = 'cc-chronicle-time';
      tdTime.textContent = row.time;

      var tdType = document.createElement('td');
      var chip = document.createElement('span');
      chip.className = row.acked ? 'ov-chip ov-chip--green' : chronicleChipClass(row.type);
      chip.textContent = row.acked ? 'Resolved' : row.label;
      tdType.appendChild(chip);

      var tdMsg = document.createElement('td');
      var msgWrap = document.createElement('div');
      msgWrap.className = 'cc-chronicle-msg';
      var msgText = document.createElement('span');
      msgText.textContent = row.message;
      msgWrap.appendChild(msgText);

      if (row.type === 'alert' && !row.acked) {
        var ackBtn = document.createElement('button');
        ackBtn.type = 'button';
        ackBtn.className = 'cc-ack-btn';
        ackBtn.setAttribute('data-ack-row', row.id);
        ackBtn.textContent = 'Acknowledge';
        msgWrap.appendChild(ackBtn);
      }
      tdMsg.appendChild(msgWrap);

      var tdSrc = document.createElement('td');
      var srcBtn = document.createElement('button');
      srcBtn.type = 'button';
      srcBtn.className = 'cc-source-btn';
      srcBtn.setAttribute('data-source-building', row.building);
      srcBtn.textContent = row.source;
      tdSrc.appendChild(srcBtn);

      tr.appendChild(tdTime);
      tr.appendChild(tdType);
      tr.appendChild(tdMsg);
      tr.appendChild(tdSrc);
      chronicleTbodyEl.appendChild(tr);
    });
  }

  /* ------------------------------------------------------------------------ */
  /* Pipeline Overview ("Run Deploy Prod")                                    */
  /* ------------------------------------------------------------------------ */

  var runDeployBtn = document.getElementById('run-deploy-prod-btn');
  var prodStageEl = document.getElementById('stage-deploy-prod');
  var prodGearEl = document.getElementById('stage-prod-gear');
  var prodShieldEl = document.getElementById('stage-prod-shield');
  var prodStatusEl = document.getElementById('stage-prod-status');
  var pipelineLastRunEl = document.getElementById('pipeline-last-run');
  var pipelineOverallChipEl = document.getElementById('pipeline-overall-chip');
  var pipelineStatusTextEl = document.getElementById('pipeline-status-text');

  function runDeployProd() {
    if (state.prodDeploying) return;
    state.prodDeploying = true;

    if (runDeployBtn) {
      runDeployBtn.disabled = true;
      runDeployBtn.textContent = 'Deploying Prod\u2026';
    }
    if (prodStageEl) {
      prodStageEl.classList.remove('is-pending', 'is-done');
      prodStageEl.classList.add('is-running');
    }
    if (prodGearEl) prodGearEl.hidden = false;
    if (prodShieldEl) prodShieldEl.hidden = true;
    if (prodStatusEl) prodStatusEl.textContent = 'Running\u2026';
    if (pipelineOverallChipEl) {
      pipelineOverallChipEl.className = 'ov-chip ov-chip--amber';
      pipelineOverallChipEl.textContent = 'Deploying';
    }
    if (pipelineStatusTextEl) pipelineStatusTextEl.textContent = 'Rolling out to Production';

    notify('Production caravan departed from The Stables.', 'info');

    window.setTimeout(function () {
      state.prodDeploying = false;
      state.prodDeployed = true;
      var stamp = nowClock();

      if (prodStageEl) {
        prodStageEl.classList.remove('is-running', 'is-pending');
        prodStageEl.classList.add('is-done');
      }
      if (prodGearEl) prodGearEl.hidden = true;
      if (prodShieldEl) prodShieldEl.hidden = false;
      if (prodStatusEl) prodStatusEl.textContent = 'Healthy (1/1)';
      if (pipelineLastRunEl) pipelineLastRunEl.textContent = stamp;
      if (pipelineOverallChipEl) {
        pipelineOverallChipEl.className = 'ov-chip ov-chip--green';
        pipelineOverallChipEl.textContent = 'Healthy';
      }
      if (pipelineStatusTextEl) pipelineStatusTextEl.textContent = 'Healthy \u2014 Prod Live';

      if (runDeployBtn) {
        runDeployBtn.disabled = false;
        runDeployBtn.textContent = 'Re-run Deploy Prod';
      }

      // Update Stables station status
      if (BUILDINGS.stables && BUILDINGS.stables.stations[2]) {
        BUILDINGS.stables.stations[2].status = 'Live (1/1)';
        BUILDINGS.stables.stations[2].detail = 'Production release verified healthy at ' + stamp + '.';
        BUILDINGS.stables.extraValue = '3';
      }
      var stan = findAgent('stan');
      if (stan) {
        stan.status = 'Healthy';
        stan.task = 'Production rollout verified';
        stan.load = 48;
      }
      renderRoster();
      renderMap();

      addChronicleEntry(
        'success',
        'Success',
        'Production deployment completed cleanly (all 6 stages healthy)',
        'The Stables',
        'stables'
      );
      notify('Deploy Prod succeeded — all 6 pipeline stages are healthy!', 'success');
    }, 950);
  }

  /* ------------------------------------------------------------------------ */
  /* Event Wiring                                                             */
  /* ------------------------------------------------------------------------ */

  // Quest priority filter chips
  var questFilters = document.querySelectorAll('[data-quest-filter]');
  for (var qf = 0; qf < questFilters.length; qf++) {
    questFilters[qf].addEventListener('click', function () {
      var val = this.getAttribute('data-quest-filter');
      state.questFilter = val;
      for (var j = 0; j < questFilters.length; j++) {
        questFilters[j].setAttribute('aria-pressed', questFilters[j] === this ? 'true' : 'false');
      }
      renderQuests();
    });
  }

  if (questClearBtn) {
    questClearBtn.addEventListener('click', function () {
      state.questFilter = 'all';
      for (var j = 0; j < questFilters.length; j++) {
        questFilters[j].setAttribute('aria-pressed', questFilters[j].getAttribute('data-quest-filter') === 'all' ? 'true' : 'false');
      }
      renderQuests();
    });
  }

  // Quest selection -> highlight building & assigned agent
  if (questListEl) {
    questListEl.addEventListener('click', function (event) {
      var btn = event.target.closest('[data-quest-id]');
      if (!btn) return;
      var qId = btn.getAttribute('data-quest-id');
      var quest = null;
      for (var i = 0; i < QUESTS.length; i++) {
        if (QUESTS[i].id === qId) { quest = QUESTS[i]; break; }
      }
      if (!quest) return;
      state.selectedQuestId = quest.id;
      state.selectedAgentId = quest.agentId;
      renderQuests();
      renderRoster();
      selectBuilding(quest.building, false);
      announce('Selected quest ' + quest.title + '. Focused ' + BUILDINGS[quest.building].name + '.');
    });
  }

  // New Quest dialog submission
  var newQuestForm = document.getElementById('new-quest-form');
  var newQuestNameInput = document.getElementById('new-quest-name');
  var newQuestNameError = document.getElementById('new-quest-name-error');

  if (newQuestNameInput) {
    newQuestNameInput.addEventListener('input', function () {
      if (newQuestNameInput.value.trim()) {
        newQuestNameInput.removeAttribute('aria-invalid');
        if (newQuestNameError) newQuestNameError.hidden = true;
      }
    });
  }

  if (newQuestForm) {
    newQuestForm.addEventListener('submit', function (event) {
      event.preventDefault();
      var title = newQuestNameInput ? newQuestNameInput.value.trim() : '';
      if (!title) {
        if (newQuestNameInput) {
          newQuestNameInput.setAttribute('aria-invalid', 'true');
          newQuestNameInput.focus();
        }
        if (newQuestNameError) newQuestNameError.hidden = false;
        return;
      }

      var priority = document.getElementById('new-quest-priority').value;
      var eta = (document.getElementById('new-quest-eta').value || '2h 00m').trim();
      var buildingId = document.getElementById('new-quest-building').value;
      var agentId = document.getElementById('new-quest-agent').value;
      var b = BUILDINGS[buildingId] || BUILDINGS.forge;
      var agent = findAgent(agentId);

      var newQuest = {
        id: 'q-' + (state.nextQuestSeq++),
        title: title,
        eta: eta,
        priority: priority,
        progress: 10,
        guild: b.role,
        building: buildingId,
        agentId: agentId
      };

      QUESTS.unshift(newQuest);
      state.selectedQuestId = newQuest.id;
      state.questFilter = 'all';
      for (var j = 0; j < questFilters.length; j++) {
        questFilters[j].setAttribute('aria-pressed', questFilters[j].getAttribute('data-quest-filter') === 'all' ? 'true' : 'false');
      }

      b.openTasks += 1;
      if (b.extraLabel === 'Open Tasks') b.extraValue = String(b.openTasks);

      renderQuests();
      selectBuilding(buildingId, false);
      addChronicleEntry(
        'checkpoint',
        'Checkpoint',
        'Commissioned new quest "' + title + '"' + (agent ? ' assigned to ' + agent.name : ''),
        b.name,
        buildingId
      );

      newQuestForm.reset();
      if (window.OrchardVale) {
        window.OrchardVale.closeDialog('new-quest-dialog');
      }
      notify('Added quest "' + title + '" to the Quest Queue.', 'success');
    });
  }

  // District switcher pills
  var districtPills = document.querySelectorAll('[data-map-view]');
  for (var dp = 0; dp < districtPills.length; dp++) {
    districtPills[dp].addEventListener('click', function () {
      switchMapView(this.getAttribute('data-map-view'));
    });
  }

  if (mapBackBtn) {
    mapBackBtn.addEventListener('click', function () {
      switchMapView('overview');
    });
  }

  // Map pin clicks (overview buildings -> drill-down or focus; district stations -> focus)
  if (mapPinsEl) {
    mapPinsEl.addEventListener('click', function (event) {
      var bPin = event.target.closest('[data-building-pin]');
      if (bPin) {
        var bId = bPin.getAttribute('data-building-pin');
        var b = BUILDINGS[bId];
        if (b && b.districtMap) {
          switchMapView(bId);
        } else {
          selectBuilding(bId, false);
          announce('Focused ' + b.name + '.');
        }
        return;
      }

      var sPin = event.target.closest('[data-station-pin]');
      if (sPin) {
        state.activeStationId = sPin.getAttribute('data-station-pin');
        renderMap();
        pulseMarker();
      }
    });
  }

  // Inspector quick-node selector (tappable mobile + desktop fallback)
  if (inspectorQuickEl) {
    inspectorQuickEl.addEventListener('click', function (event) {
      var qb = event.target.closest('[data-quick-building]');
      if (qb) {
        selectBuilding(qb.getAttribute('data-quick-building'), false);
        return;
      }
      var qs = event.target.closest('[data-quick-station]');
      if (qs) {
        state.activeStationId = qs.getAttribute('data-quick-station');
        renderMap();
        pulseMarker();
      }
    });
  }

  if (inspectorDrillBtn) {
    inspectorDrillBtn.addEventListener('click', function () {
      if (state.mapView === 'overview') {
        var b = BUILDINGS[state.activeBuildingId];
        if (b && b.districtMap) switchMapView(b.id);
      } else {
        switchMapView('overview');
      }
    });
  }

  // Map controls (zoom in, zoom out, home, layers, locate)
  var ctrlZoomIn = document.getElementById('ctrl-zoom-in');
  var ctrlZoomOut = document.getElementById('ctrl-zoom-out');
  var ctrlHome = document.getElementById('ctrl-home');
  var ctrlLocate = document.getElementById('ctrl-locate');

  if (ctrlZoomIn) {
    ctrlZoomIn.addEventListener('click', function () {
      state.zoom = Math.min(1.5, Math.round((state.zoom + 0.25) * 100) / 100);
      updateMapTransform();
      announce('Map zoomed to ' + Math.round(state.zoom * 100) + ' percent.');
    });
  }

  if (ctrlZoomOut) {
    ctrlZoomOut.addEventListener('click', function () {
      state.zoom = Math.max(1, Math.round((state.zoom - 0.25) * 100) / 100);
      updateMapTransform();
      announce('Map zoomed to ' + Math.round(state.zoom * 100) + ' percent.');
    });
  }

  if (ctrlHome) {
    ctrlHome.addEventListener('click', function () {
      switchMapView('overview');
    });
  }

  if (ctrlLayersBtn) {
    ctrlLayersBtn.addEventListener('click', function () {
      state.showCallouts = !state.showCallouts;
      ctrlLayersBtn.setAttribute('aria-pressed', state.showCallouts ? 'true' : 'false');
      renderMap();
      announce(state.showCallouts ? 'Expanded building callouts and routes shown.' : 'Compact map labels mode enabled.');
    });
  }

  if (ctrlLocate) {
    ctrlLocate.addEventListener('click', function () {
      pulseMarker();
      var b = BUILDINGS[state.activeBuildingId] || BUILDINGS.guildhall;
      announce('Located ' + b.name + ' on the map.');
    });
  }

  // Dispatch Agent from inspector
  var dispatchBtn = document.getElementById('dispatch-agent-btn');
  if (dispatchBtn && dispatchSelectEl) {
    dispatchBtn.addEventListener('click', function () {
      var agent = findAgent(dispatchSelectEl.value);
      var b = BUILDINGS[state.activeBuildingId];
      if (!agent || !b) return;

      var prevBuilding = BUILDINGS[agent.building];
      if (prevBuilding && prevBuilding.id !== b.id && prevBuilding.agents > 1) {
        prevBuilding.agents -= 1;
      }
      if (agent.building !== b.id) {
        b.agents += 1;
      }
      agent.building = b.id;
      agent.task = 'Dispatched to ' + b.name;
      agent.load = Math.min(95, agent.load + 6);
      agent.status = agent.load >= 78 ? 'Busy' : 'Healthy';
      state.selectedAgentId = agent.id;

      renderRoster();
      renderQuests();
      renderMap();
      pulseMarker();

      addChronicleEntry(
        'info',
        'Info',
        agent.name + ' dispatched to ' + b.name + ' (' + b.role + ')',
        b.name,
        b.id
      );
      notify(agent.name + ' dispatched to ' + b.name + '.', 'success');
    });
  }

  // Guild Roster click -> focus agent, highlight building & quests
  if (rosterListEl) {
    rosterListEl.addEventListener('click', function (event) {
      var btn = event.target.closest('[data-agent-id]');
      if (!btn) return;
      var aId = btn.getAttribute('data-agent-id');
      if (state.selectedAgentId === aId) {
        state.selectedAgentId = null;
        renderRoster();
        renderQuests();
        announce('Cleared agent focus.');
        return;
      }
      var agent = findAgent(aId);
      if (!agent) return;
      state.selectedAgentId = agent.id;
      if (dispatchSelectEl) dispatchSelectEl.value = agent.id;
      renderRoster();
      renderQuests();
      selectBuilding(agent.building, false);
      announce('Focused ' + agent.name + ' at ' + BUILDINGS[agent.building].name + '.');
    });
  }

  var rosterClearFocusBtn = document.getElementById('roster-clear-focus');
  if (rosterClearFocusBtn) {
    rosterClearFocusBtn.addEventListener('click', function () {
      state.selectedAgentId = null;
      renderRoster();
      renderQuests();
    });
  }

  var rosterFocusMapBtn = document.getElementById('roster-dispatch-focus');
  if (rosterFocusMapBtn) {
    rosterFocusMapBtn.addEventListener('click', function () {
      var agent = state.selectedAgentId ? findAgent(state.selectedAgentId) : AGENTS[0];
      if (!agent) return;
      var b = BUILDINGS[agent.building];
      if (b && b.districtMap) {
        switchMapView(b.id);
      } else if (b) {
        selectBuilding(b.id, false);
      }
      var tableau = document.getElementById('village-tableau');
      if (tableau && typeof tableau.scrollIntoView === 'function') {
        tableau.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }

  // Village Chronicle filters & acknowledgement
  var chronicleFilters = document.querySelectorAll('[data-chronicle-filter]');
  for (var cf = 0; cf < chronicleFilters.length; cf++) {
    chronicleFilters[cf].addEventListener('click', function () {
      state.chronicleFilter = this.getAttribute('data-chronicle-filter');
      for (var j = 0; j < chronicleFilters.length; j++) {
        chronicleFilters[j].setAttribute('aria-pressed', chronicleFilters[j] === this ? 'true' : 'false');
      }
      renderChronicle();
    });
  }

  function acknowledgeAllAlerts() {
    var count = 0;
    CHRONICLE.forEach(function (row) {
      if (row.type === 'alert' && !row.acked) {
        row.acked = true;
        count++;
      }
    });
    if (count > 0) {
      renderChronicle();
      renderMap();
      notify('Acknowledged ' + count + ' active watchtower alert' + (count === 1 ? '' : 's') + '.', 'success');
    }
  }

  if (ackAllAlertsBtn) {
    ackAllAlertsBtn.addEventListener('click', acknowledgeAllAlerts);
  }

  if (chronicleTbodyEl) {
    chronicleTbodyEl.addEventListener('click', function (event) {
      var ackBtn = event.target.closest('[data-ack-row]');
      if (ackBtn) {
        var rId = ackBtn.getAttribute('data-ack-row');
        for (var i = 0; i < CHRONICLE.length; i++) {
          if (CHRONICLE[i].id === rId) {
            CHRONICLE[i].acked = true;
            break;
          }
        }
        renderChronicle();
        renderMap();
        notify('Alert acknowledged and cleared from active watch.', 'success');
        return;
      }

      var srcBtn = event.target.closest('[data-source-building]');
      if (srcBtn) {
        var bId = srcBtn.getAttribute('data-source-building');
        var b = BUILDINGS[bId];
        if (b && b.districtMap) {
          switchMapView(b.id);
        } else if (b) {
          selectBuilding(b.id, false);
        }
        var tableau = document.getElementById('village-tableau');
        if (tableau && typeof tableau.scrollIntoView === 'function') {
          tableau.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }
    });
  }

  var chronicleShowAllBtn = document.getElementById('chronicle-show-all');
  if (chronicleShowAllBtn) {
    chronicleShowAllBtn.addEventListener('click', function () {
      state.chronicleFilter = 'all';
      for (var j = 0; j < chronicleFilters.length; j++) {
        chronicleFilters[j].setAttribute('aria-pressed', chronicleFilters[j].getAttribute('data-chronicle-filter') === 'all' ? 'true' : 'false');
      }
      renderChronicle();
    });
  }

  // Today's Wisdom proverb cycler
  var nextProverbBtn = document.getElementById('next-proverb-btn');
  var wisdomQuoteEl = document.getElementById('wisdom-quote');
  if (nextProverbBtn && wisdomQuoteEl) {
    nextProverbBtn.addEventListener('click', function () {
      state.proverbIndex = (state.proverbIndex + 1) % PROVERBS.length;
      wisdomQuoteEl.textContent = PROVERBS[state.proverbIndex];
      announce('Wisdom updated: ' + PROVERBS[state.proverbIndex]);
    });
  }

  // Pipeline Deploy Prod button
  if (runDeployBtn) {
    runDeployBtn.addEventListener('click', runDeployProd);
  }

  // Initial render
  renderQuests();
  renderRoster();
  renderMap();
  renderChronicle();
})();
