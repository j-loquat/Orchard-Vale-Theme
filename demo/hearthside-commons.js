/* Hearthside Commons interactive controller (file://-safe, zero dependencies). */

(function () {
  'use strict';

  var AVATAR_BASE = '../src/assets/orchard-vale/characters/avatars/';
  var FULLBODY_BASE = '../src/assets/orchard-vale/characters/fullbody/';
  var SEAL_BASE = '../src/assets/orchard-vale/heraldry/';
  var ICON_BASE = '../src/assets/orchard-vale/icons/';

  var SEALS = {
    approved: {
      src: SEAL_BASE + 'seal-approved-green-512.webp',
      label: 'Approved',
      chipClass: 'ov-chip--green',
      alt: 'Green approved wax seal'
    },
    urgent: {
      src: SEAL_BASE + 'seal-urgent-orange-512.webp',
      label: 'Urgent',
      chipClass: 'ov-chip--red',
      alt: 'Orange urgent wax seal'
    },
    review: {
      src: SEAL_BASE + 'seal-review-blue-512.webp',
      label: 'In Review',
      chipClass: 'ov-chip--blue',
      alt: 'Blue in-review wax seal'
    },
    draft: {
      src: SEAL_BASE + 'seal-draft-parchment-512.webp',
      label: 'Draft / Waiting',
      chipClass: 'ov-chip--amber',
      alt: 'Parchment draft wax seal'
    },
    archived: {
      src: SEAL_BASE + 'seal-archived-gray-512.webp',
      label: 'Archived',
      chipClass: '',
      alt: 'Gray archived wax seal'
    }
  };

  var CATEGORY_CHIPS = {
    Council: 'ov-chip--green',
    Guild: 'ov-chip--blue',
    Projects: 'ov-chip--purple',
    Finance: 'ov-chip--amber'
  };

  var FOLDER_LABELS = {
    inbox: 'Inbox',
    urgent: 'Urgent',
    waiting: 'Waiting',
    archived: 'Archived'
  };

  function createInitialMessages() {
    return [
      {
        id: 'msg-council-update',
        folder: 'inbox',
        unread: true,
        sender: 'Elder Oakley',
        email: 'elder.oakley@orchardvale.gov',
        to: 'Orchard Vale Council, Guild Leaders',
        avatar: AVATAR_BASE + 'avatar-owl-scholar-neutral-512.webp',
        portrait: FULLBODY_BASE + 'character-owl-scholar-seated-1024.webp',
        portraitAlt: 'Elder Oakley seated with quill and council scroll',
        time: '9:12 AM',
        subject: 'Monthly Council Update',
        snippet: 'As the blossoms give way to the warmth of late spring, our village continues to flourish...',
        category: 'Council',
        seal: 'approved',
        attachments: [
          { name: 'Council_Update_May.pdf', size: '1.2 MB', type: 'doc' },
          { name: 'Market_Overview.xlsx', size: '812 KB', type: 'table' }
        ],
        thread: [
          {
            author: 'Elder Oakley',
            time: 'May 21, 9:12 AM',
            isSelf: false,
            paragraphs: [
              'Greetings, friends of Orchard Vale,',
              'As the blossoms give way to the warmth of late spring, our village continues to flourish through your tireless efforts and steadfast hearts.',
              'This month, we celebrate the success of the Mayfaire and the completion of the Southbridge repairs ahead of schedule. Looking ahead, let us prepare for the summer market and continue building a village we are all proud to call home.',
              'With gratitude, Elder Oakley — Elder of Orchard Vale'
            ]
          }
        ]
      },
      {
        id: 'msg-strategy-review',
        folder: 'inbox',
        unread: true,
        sender: 'Pippa Planner',
        email: 'pippa.planner@orchardvale.gov',
        to: 'Brambles Badger, Guild Leads',
        avatar: AVATAR_BASE + 'avatar-rabbit-planner-attentive-512.webp',
        time: '8:41 AM',
        subject: 'Quarterly Strategy Review',
        snippet: 'Hi team, here are the talking points and harvest milestones ahead of Thursday sync.',
        category: 'Guild',
        seal: 'review',
        attachments: [
          { name: 'Q2_Talking_Points.pdf', size: '640 KB', type: 'doc' }
        ],
        thread: [
          {
            author: 'Pippa Planner',
            time: 'May 21, 8:41 AM',
            isSelf: false,
            paragraphs: [
              'Morning Brambles,',
              'I have compiled the talking points for Thursday\'s Guild Leaders Sync. Please review the proposed summer market timeline and flag any staffing conflicts before noon.',
              'Warmly, Pippa'
            ]
          }
        ]
      },
      {
        id: 'msg-signage-feedback',
        folder: 'inbox',
        unread: true,
        sender: 'Millie Mole',
        email: 'millie.mole@orchardvale.gov',
        to: 'Brambles Badger, Design Guild',
        avatar: AVATAR_BASE + 'avatar-mole-engineer-focused-512.webp',
        time: 'Yesterday',
        subject: 'Design Feedback: New Signage',
        snippet: 'The carved green signboard concepts look lovely! A few notes on brass bolt spacing.',
        category: 'Projects',
        seal: 'review',
        attachments: [
          { name: 'Signboard_Specs_v4.pdf', size: '2.1 MB', type: 'doc' }
        ],
        thread: [
          {
            author: 'Millie Mole',
            time: 'May 20, 4:18 PM',
            isSelf: false,
            paragraphs: [
              'The carved signboard concepts look wonderful on the Southbridge approach.',
              'I added two clearance measurements for the lantern brackets so evening walkers have crisp visibility without glare.'
            ]
          }
        ]
      },
      {
        id: 'msg-api-reference',
        folder: 'inbox',
        unread: false,
        sender: 'Docu Deer',
        email: 'docu.deer@orchardvale.gov',
        to: 'Orchard Engineering & Scribes',
        avatar: AVATAR_BASE + 'avatar-deer-governance-calm-512.webp',
        time: 'Mon',
        subject: 'Ledger Reference v2.3 Published',
        snippet: 'The latest handbook and dispatch format specifications are ready for all guilds.',
        category: 'Guild',
        seal: 'approved',
        attachments: [
          { name: 'Ledger_Spec_v2_3.pdf', size: '980 KB', type: 'doc' }
        ],
        thread: [
          {
            author: 'Docu Deer',
            time: 'May 19, 11:05 AM',
            isSelf: false,
            paragraphs: [
              'All scribe notes from last week\'s audit have been folded into Reference v2.3.',
              'No breaking changes to existing forms; every new field is optional and backwards-compatible.'
            ]
          }
        ]
      },
      {
        id: 'msg-bridge-dispatch',
        folder: 'urgent',
        unread: true,
        sender: 'Robin Courier',
        email: 'robin.courier@orchardvale.gov',
        to: 'Brambles Badger (Priority)',
        avatar: AVATAR_BASE + 'avatar-robin-courier-alert-512.webp',
        time: '10:04 AM',
        subject: 'Urgent: Timber Shipment Reroute',
        snippet: 'East Ford cart requires guild signature before 2:00 PM to clear Southbridge gate.',
        category: 'Projects',
        seal: 'urgent',
        attachments: [
          { name: 'Gate_Clearance_Permit.pdf', size: '310 KB', type: 'doc' }
        ],
        thread: [
          {
            author: 'Robin Courier',
            time: 'May 21, 10:04 AM',
            isSelf: false,
            paragraphs: [
              'Swift notice, Brambles!',
              'The oak timber wagon for the market stalls arrived two hours ahead of schedule. Please confirm gate clearance before 2:00 PM so the drivers can unload before the afternoon shower.'
            ]
          }
        ]
      },
      {
        id: 'msg-tool-order',
        folder: 'urgent',
        unread: true,
        sender: 'Forge Fox',
        email: 'forge.fox@orchardvale.gov',
        to: 'Brambles Badger, Workshop Guild',
        avatar: AVATAR_BASE + 'avatar-fox-implementer-focused-512.webp',
        time: 'Yesterday',
        subject: 'Re: Tool Order Confirmation',
        snippet: 'All brass hinges and lantern hooks have been reserved pending final tally.',
        category: 'Finance',
        seal: 'urgent',
        attachments: [
          { name: 'Workshop_Invoice_419.xlsx', size: '248 KB', type: 'table' }
        ],
        thread: [
          {
            author: 'Forge Fox',
            time: 'May 20, 5:45 PM',
            isSelf: false,
            paragraphs: [
              'Every box of brass hinges and brackets is set aside at the smithy.',
              'Send back a quick confirmation on the final quantity and I will seal the invoice this afternoon.'
            ]
          }
        ]
      },
      {
        id: 'msg-market-budget',
        folder: 'waiting',
        unread: false,
        sender: 'Squirrel Treasurer',
        email: 'treasury@orchardvale.gov',
        to: 'Brambles Badger, Finance Desk',
        avatar: AVATAR_BASE + 'avatar-squirrel-resource-manager-busy-512.webp',
        time: 'May 20',
        subject: 'Draft: Summer Market Budget',
        snippet: 'Holding final sign-off until vendor booth counts arrive from Otter Steward.',
        category: 'Finance',
        seal: 'draft',
        attachments: [
          { name: 'Summer_Market_Draft.xlsx', size: '514 KB', type: 'table' }
        ],
        thread: [
          {
            author: 'Squirrel Treasurer',
            time: 'May 20, 1:20 PM',
            isSelf: false,
            paragraphs: [
              'Here is our working draft for the Summer Market ledger.',
              'Marked as Draft / Waiting while we confirm final booth allocations from the hospitality committee.'
            ]
          }
        ]
      },
      {
        id: 'msg-festival-welcome',
        folder: 'waiting',
        unread: false,
        sender: 'Otter Steward',
        email: 'otter.steward@orchardvale.gov',
        to: 'Festival Planning Committee',
        avatar: AVATAR_BASE + 'avatar-otter-success-warm-512.webp',
        time: 'May 19',
        subject: 'Re: Festival Welcome Packets',
        snippet: 'Awaiting print counts from the printery before stuffing the welcome folios.',
        category: 'Council',
        seal: 'draft',
        attachments: [],
        thread: [
          {
            author: 'Otter Steward',
            time: 'May 19, 3:10 PM',
            isSelf: false,
            paragraphs: [
              'The welcome map and tea voucher cards are proofed and ready.',
              'Waiting on the visitor headcount before ordering the ribbon ties.'
            ]
          }
        ]
      },
      {
        id: 'msg-ledger-minutes',
        folder: 'archived',
        unread: false,
        sender: 'Mouse Clerk',
        email: 'mouse.clerk@orchardvale.gov',
        to: 'Orchard Vale Archive',
        avatar: AVATAR_BASE + 'avatar-mouse-clerk-cheerful-512.webp',
        time: 'May 16',
        subject: 'Mayfaire Closing Minutes',
        snippet: 'All booths tallied cleanly and lantern oil surplus returned to the storehouse.',
        category: 'Council',
        seal: 'archived',
        attachments: [
          { name: 'Mayfaire_Minutes_Final.pdf', size: '720 KB', type: 'doc' }
        ],
        thread: [
          {
            author: 'Mouse Clerk',
            time: 'May 16, 6:05 PM',
            isSelf: false,
            paragraphs: [
              'Archived for the village chronicle: Mayfaire concluded with zero outstanding dispatches and full community turnout.'
            ]
          }
        ]
      },
      {
        id: 'msg-watermill-week19',
        folder: 'archived',
        unread: false,
        sender: 'Millie Mole',
        email: 'millie.mole@orchardvale.gov',
        to: 'Operations Ledger',
        avatar: AVATAR_BASE + 'avatar-mole-engineer-focused-512.webp',
        time: 'May 15',
        subject: 'Water Flow Reports — Week 19',
        snippet: 'Sluice gates balanced and flour mill wheels inspected with full green status.',
        category: 'Projects',
        seal: 'archived',
        attachments: [
          { name: 'Waterflow_Week19.xlsx', size: '412 KB', type: 'table' }
        ],
        thread: [
          {
            author: 'Millie Mole',
            time: 'May 15, 2:50 PM',
            isSelf: false,
            paragraphs: [
              'Week 19 water flow readings are logged and archived. All three mill wheels are running smoothly.'
            ]
          }
        ]
      }
    ];
  }

  var state = {
    folder: 'inbox',
    labelFilter: 'all',
    searchQuery: '',
    selectedId: 'msg-council-update',
    messages: createInitialMessages(),
    calendarView: 'week', // 'week' | 'day' | 'quiet'
    taskFilter: 'all',
    focusMode: false,
    chronicleFilter: 'all',
    tasks: [
      { id: 't-1', title: 'Approve Market Budget', priority: 'high', due: 'Today', done: false, avatar: AVATAR_BASE + 'avatar-squirrel-resource-manager-busy-512.webp', owner: 'Squirrel Treasurer' },
      { id: 't-2', title: 'Sign Southbridge Timber Permit', priority: 'high', due: 'Today', done: false, avatar: AVATAR_BASE + 'avatar-robin-courier-alert-512.webp', owner: 'Robin Courier' },
      { id: 't-3', title: 'Review Water Flow Plan', priority: 'normal', due: 'May 22', done: false, avatar: AVATAR_BASE + 'avatar-mole-engineer-focused-512.webp', owner: 'Millie Mole' },
      { id: 't-4', title: 'Confirm Summer Market Stalls', priority: 'upcoming', due: 'May 24', done: false, avatar: AVATAR_BASE + 'avatar-otter-success-warm-512.webp', owner: 'Otter Steward' },
      { id: 't-5', title: 'Prepare Council Meeting Notes', priority: 'normal', due: 'Done', done: true, avatar: AVATAR_BASE + 'avatar-badger-orchestrator-neutral-512.webp', owner: 'Brambles Badger' },
      { id: 't-6', title: 'Proof Ledger Reference v2.3', priority: 'normal', due: 'Done', done: true, avatar: AVATAR_BASE + 'avatar-deer-governance-calm-512.webp', owner: 'Docu Deer' },
      { id: 't-7', title: 'Archive Mayfaire Closing Minutes', priority: 'upcoming', due: 'Done', done: true, avatar: AVATAR_BASE + 'avatar-mouse-clerk-cheerful-512.webp', owner: 'Mouse Clerk' }
    ],
    chronicle: [
      { time: '10:35 AM', category: 'mail', text: 'Pippa Planner sent Quarterly Strategy Review', avatar: AVATAR_BASE + 'avatar-rabbit-planner-attentive-512.webp', alt: 'Pippa Planner' },
      { time: '10:04 AM', category: 'mail', text: 'Urgent dispatch arrived from Robin Courier', avatar: AVATAR_BASE + 'avatar-robin-courier-alert-512.webp', alt: 'Robin Courier' },
      { time: '9:47 AM', category: 'tasks', text: 'Task completed: Prepare Council Meeting Notes', avatar: AVATAR_BASE + 'avatar-badger-orchestrator-neutral-512.webp', alt: 'Brambles Badger' },
      { time: '9:15 AM', category: 'calendar', text: 'Calendar updated: Council Meeting confirmed', avatar: AVATAR_BASE + 'avatar-owl-scholar-neutral-512.webp', alt: 'Elder Oakley' }
    ]
  };

  /* ------------------------------------------------------------------------ */
  /* DOM references                                                           */
  /* ------------------------------------------------------------------------ */

  var els = {
    body: document.body,
    kpiUnread: document.getElementById('kpi-unread'),
    kpiUnreadMeta: document.getElementById('kpi-unread-meta'),
    kpiMeetings: document.getElementById('kpi-meetings'),
    kpiTasksOpen: document.getElementById('kpi-tasks-open'),
    kpiTasksMeta: document.getElementById('kpi-tasks-meta'),
    kpiFocus: document.getElementById('kpi-focus'),
    kpiFocusMeta: document.getElementById('kpi-focus-meta'),
    presenceLabel: document.getElementById('presence-label'),
    quickQuietDay: document.getElementById('quick-quiet-day'),
    quickNewTask: document.getElementById('quick-new-task'),
    toggleFocusMode: document.getElementById('toggle-focus-mode'),

    mailSearch: document.getElementById('mail-search'),
    folderList: document.getElementById('folder-list'),
    labelFilters: document.getElementById('label-filters'),
    countInbox: document.getElementById('count-inbox'),
    countUrgent: document.getElementById('count-urgent'),
    countWaiting: document.getElementById('count-waiting'),
    countArchived: document.getElementById('count-archived'),

    folderHeading: document.getElementById('folder-heading'),
    folderSummaryChip: document.getElementById('folder-summary-chip'),
    markAllReadBtn: document.getElementById('mark-all-read-btn'),
    clearFolderBtn: document.getElementById('clear-folder-btn'),
    clearFolderLabel: document.getElementById('clear-folder-label'),
    mailList: document.getElementById('mail-list'),
    mailEmptyState: document.getElementById('mail-empty-state'),
    mailEmptyTitle: document.getElementById('mail-empty-title'),
    mailEmptyCopy: document.getElementById('mail-empty-copy'),
    restoreMailBtn: document.getElementById('restore-mail-btn'),
    clearSearchBtn: document.getElementById('clear-search-btn'),

    readerToolbar: document.getElementById('reader-toolbar'),
    readerLetter: document.getElementById('reader-letter'),
    readerEmptyState: document.getElementById('reader-empty-state'),
    readerRestoreBtn: document.getElementById('reader-restore-btn'),
    readerReplyBtn: document.getElementById('reader-reply-btn'),
    readerToggleReadBtn: document.getElementById('reader-toggle-read-btn'),
    readerToggleReadLabel: document.getElementById('reader-toggle-read-label'),
    readerArchiveBtn: document.getElementById('reader-archive-btn'),
    readerArchiveLabel: document.getElementById('reader-archive-label'),
    readerCategoryChip: document.getElementById('reader-category-chip'),
    readerSealChip: document.getElementById('reader-seal-chip'),
    readerSubject: document.getElementById('reader-subject'),
    readerAvatar: document.getElementById('reader-avatar'),
    readerFromName: document.getElementById('reader-from-name'),
    readerFromAddr: document.getElementById('reader-from-addr'),
    readerTo: document.getElementById('reader-to'),
    readerTime: document.getElementById('reader-time'),
    readerSealImg: document.getElementById('reader-seal-img'),
    readerSealCaption: document.getElementById('reader-seal-caption'),
    readerThread: document.getElementById('reader-thread'),
    readerAttachmentsSection: document.getElementById('reader-attachments-section'),
    readerAttachmentsCount: document.getElementById('reader-attachments-count'),
    readerAttachmentsList: document.getElementById('reader-attachments-list'),

    replyForm: document.getElementById('reply-form'),
    replyLabel: document.getElementById('reply-label'),
    replyTextarea: document.getElementById('reply-textarea'),
    replyError: document.getElementById('reply-error'),
    replyClearBtn: document.getElementById('reply-clear-btn'),
    courierStatus: document.getElementById('courier-status'),
    courierStatusText: document.getElementById('courier-status-text'),

    calViewWeek: document.getElementById('cal-view-week'),
    calViewDay: document.getElementById('cal-view-day'),
    calQuietBtn: document.getElementById('cal-quiet-btn'),
    calFriShortcut: document.getElementById('cal-fri-shortcut'),
    calReturnWeekBtn: document.getElementById('cal-return-week-btn'),
    calWeekView: document.getElementById('cal-week-view'),
    calDayView: document.getElementById('cal-day-view'),
    calEmptyState: document.getElementById('cal-empty-state'),

    tasksRatioChip: document.getElementById('tasks-ratio-chip'),
    tasksPercentLabel: document.getElementById('tasks-percent-label'),
    tasksProgressbar: document.getElementById('tasks-progressbar'),
    tasksMeterFill: document.getElementById('tasks-meter-fill'),
    taskFilters: document.getElementById('task-filters'),
    taskList: document.getElementById('task-list'),
    addTaskForm: document.getElementById('add-task-form'),
    newTaskInput: document.getElementById('new-task-input'),
    newTaskPriority: document.getElementById('new-task-priority'),

    chronicleFilters: document.getElementById('chronicle-filters'),
    chronicleList: document.getElementById('chronicle-list'),

    composeDialog: document.getElementById('compose-dialog'),
    composeForm: document.getElementById('compose-form'),
    composeTo: document.getElementById('compose-to'),
    composeFolder: document.getElementById('compose-folder'),
    composeCategory: document.getElementById('compose-category'),
    composeSeal: document.getElementById('compose-seal'),
    composeSubject: document.getElementById('compose-subject'),
    composeSubjectError: document.getElementById('compose-subject-error'),
    composeBody: document.getElementById('compose-body'),
    composeBodyError: document.getElementById('compose-body-error')
  };

  var courierTimer = null;

  function notify(message, tone) {
    if (window.OrchardVale && typeof window.OrchardVale.toast === 'function') {
      window.OrchardVale.toast(message, tone || 'success');
    }
  }

  function nowTimeStamp() {
    var d = new Date();
    var h = d.getHours();
    var m = d.getMinutes();
    var ampm = h >= 12 ? 'PM' : 'AM';
    var h12 = h % 12 || 12;
    return h12 + ':' + (m < 10 ? '0' + m : m) + ' ' + ampm;
  }

  function pushChronicle(category, text, avatar, alt) {
    state.chronicle.unshift({
      time: nowTimeStamp(),
      category: category,
      text: text,
      avatar: avatar || AVATAR_BASE + 'avatar-badger-orchestrator-neutral-512.webp',
      alt: alt || 'Brambles Badger'
    });
    if (state.chronicle.length > 8) {
      state.chronicle.length = 8;
    }
    renderChronicle();
  }

  function showCourierConfirmation(text) {
    if (!els.courierStatus) return;
    els.courierStatusText.textContent = text || 'Courier dispatched!';
    els.courierStatus.hidden = false;
    if (courierTimer) window.clearTimeout(courierTimer);
    courierTimer = window.setTimeout(function () {
      els.courierStatus.hidden = true;
    }, 3600);
  }

  /* ------------------------------------------------------------------------ */
  /* Mail filtering & rendering                                               */
  /* ------------------------------------------------------------------------ */

  function getFilteredMessages() {
    var q = state.searchQuery.trim().toLowerCase();
    return state.messages.filter(function (msg) {
      if (msg.folder !== state.folder) return false;
      if (state.labelFilter !== 'all' && msg.category !== state.labelFilter) return false;
      if (!q) return true;
      var hay = (msg.sender + ' ' + msg.subject + ' ' + msg.snippet + ' ' + msg.category).toLowerCase();
      return hay.indexOf(q) !== -1;
    });
  }

  function getSelectedMessage(visibleList) {
    var i;
    for (i = 0; i < visibleList.length; i++) {
      if (visibleList[i].id === state.selectedId) return visibleList[i];
    }
    if (visibleList.length > 0) {
      state.selectedId = visibleList[0].id;
      return visibleList[0];
    }
    state.selectedId = null;
    return null;
  }

  function renderFolderCounts() {
    var counts = { inbox: 0, inboxUnread: 0, urgent: 0, waiting: 0, archived: 0, totalUnread: 0 };
    state.messages.forEach(function (m) {
      if (m.folder === 'inbox') {
        counts.inbox++;
        if (m.unread) counts.inboxUnread++;
      } else if (m.folder === 'urgent') {
        counts.urgent++;
      } else if (m.folder === 'waiting') {
        counts.waiting++;
      } else if (m.folder === 'archived') {
        counts.archived++;
      }
      if (m.unread && m.folder !== 'archived') {
        counts.totalUnread++;
      }
    });

    els.countInbox.textContent = String(counts.inboxUnread);
    els.countInbox.setAttribute('aria-label', counts.inboxUnread + ' unread in Inbox');
    els.countUrgent.textContent = String(counts.urgent);
    els.countWaiting.textContent = String(counts.waiting);
    els.countArchived.textContent = String(counts.archived);

    els.kpiUnread.textContent = String(counts.totalUnread);
    els.kpiUnreadMeta.textContent = counts.totalUnread === 0 ? 'All caught up' : 'Unread across desk';

    var btns = els.folderList.querySelectorAll('[data-folder]');
    for (var i = 0; i < btns.length; i++) {
      var isCurrent = btns[i].getAttribute('data-folder') === state.folder;
      btns[i].setAttribute('aria-current', isCurrent ? 'true' : 'false');
    }
  }

  function renderMailList() {
    var visible = getFilteredMessages();
    var selected = getSelectedMessage(visible);

    els.folderHeading.textContent = FOLDER_LABELS[state.folder] || 'Inbox';
    els.folderSummaryChip.textContent = visible.length + (visible.length === 1 ? ' letter' : ' letters');
    els.clearFolderLabel.textContent = state.folder === 'archived' ? 'Empty Archive' : 'Clear Folder';
    els.markAllReadBtn.disabled = visible.length === 0;
    els.clearFolderBtn.disabled = visible.length === 0;

    els.mailList.textContent = '';

    if (visible.length === 0) {
      els.mailList.hidden = true;
      els.mailEmptyState.hidden = false;
      var hasFilter = state.searchQuery.trim().length > 0 || state.labelFilter !== 'all';
      if (hasFilter) {
        els.mailEmptyTitle.textContent = 'No Matching Dispatches';
        els.mailEmptyCopy.textContent = 'No letters in ' + FOLDER_LABELS[state.folder] + ' match your current search or label filter.';
        els.clearSearchBtn.hidden = false;
      } else {
        els.mailEmptyTitle.textContent = state.folder === 'inbox'
          ? 'Inbox Zero \u2014 All Sorted'
          : FOLDER_LABELS[state.folder] + ' Folder Clear';
        els.mailEmptyCopy.textContent = 'Every letter in ' + FOLDER_LABELS[state.folder] + ' has been filed neatly. Restore sample mail anytime to test again.';
        els.clearSearchBtn.hidden = true;
      }
      renderReader(null);
      return;
    }

    els.mailList.hidden = false;
    els.mailEmptyState.hidden = true;

    visible.forEach(function (msg) {
      var li = document.createElement('li');
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'hc-mail-row'
        + (msg.unread ? ' is-unread' : '')
        + (selected && selected.id === msg.id ? ' is-selected' : '');
      btn.setAttribute('data-msg-id', msg.id);
      btn.setAttribute('aria-pressed', selected && selected.id === msg.id ? 'true' : 'false');

      var avatarWrap = document.createElement('span');
      avatarWrap.className = 'hc-mail-row__avatar-wrap';
      var img = document.createElement('img');
      img.className = 'ov-avatar ov-avatar--sm';
      img.src = msg.avatar;
      img.alt = '';
      img.width = 34;
      img.height = 34;
      img.decoding = 'async';
      avatarWrap.appendChild(img);

      if (msg.unread) {
        var dot = document.createElement('span');
        dot.className = 'ov-status-dot hc-mail-row__unread-dot ' + (msg.seal === 'urgent' ? 'ov-status-dot--bad' : 'ov-status-dot--good');
        dot.setAttribute('aria-hidden', 'true');
        avatarWrap.appendChild(dot);
      }

      var body = document.createElement('span');
      body.className = 'hc-mail-row__body';

      var top = document.createElement('span');
      top.className = 'hc-mail-row__top';
      var sender = document.createElement('span');
      sender.className = 'hc-mail-row__sender';
      sender.textContent = msg.sender;
      var time = document.createElement('span');
      time.className = 'hc-mail-row__time';
      time.textContent = msg.time;
      top.appendChild(sender);
      top.appendChild(time);

      var subject = document.createElement('span');
      subject.className = 'hc-mail-row__subject';
      subject.textContent = msg.subject;

      var snippet = document.createElement('span');
      snippet.className = 'hc-mail-row__snippet';
      snippet.textContent = msg.snippet;

      var foot = document.createElement('span');
      foot.className = 'hc-mail-row__foot';
      var catChip = document.createElement('span');
      catChip.className = 'ov-chip ' + (CATEGORY_CHIPS[msg.category] || '');
      catChip.textContent = msg.category;
      foot.appendChild(catChip);

      if (msg.attachments && msg.attachments.length > 0) {
        var attChip = document.createElement('span');
        attChip.className = 'ov-chip';
        attChip.textContent = msg.attachments.length + (msg.attachments.length === 1 ? ' file' : ' files');
        foot.appendChild(attChip);
      }

      if (msg.unread) {
        var srUnread = document.createElement('span');
        srUnread.className = 'ov-sr-only';
        srUnread.textContent = ' (unread)';
        subject.appendChild(srUnread);
      }

      body.appendChild(top);
      body.appendChild(subject);
      body.appendChild(snippet);
      body.appendChild(foot);

      btn.appendChild(avatarWrap);
      btn.appendChild(body);
      li.appendChild(btn);
      els.mailList.appendChild(li);
    });

    renderReader(selected);
  }

  function renderReader(msg) {
    if (!msg) {
      els.readerToolbar.hidden = true;
      els.readerLetter.hidden = true;
      els.readerEmptyState.hidden = false;
      return;
    }

    els.readerToolbar.hidden = false;
    els.readerLetter.hidden = false;
    els.readerEmptyState.hidden = true;

    var sealInfo = SEALS[msg.seal] || SEALS.approved;

    els.readerCategoryChip.className = 'ov-chip ' + (CATEGORY_CHIPS[msg.category] || '');
    els.readerCategoryChip.textContent = msg.category;
    els.readerSealChip.className = 'ov-chip ' + (sealInfo.chipClass || '');
    els.readerSealChip.textContent = sealInfo.label;

    els.readerSubject.textContent = msg.subject;
    els.readerAvatar.src = msg.avatar;
    els.readerAvatar.alt = msg.sender;
    els.readerFromName.textContent = msg.sender;
    els.readerFromAddr.textContent = '<' + msg.email + '>';
    els.readerTo.textContent = 'To: ' + msg.to;
    els.readerTime.textContent = msg.time;

    els.readerSealImg.src = sealInfo.src;
    els.readerSealImg.alt = sealInfo.alt;
    els.readerSealCaption.textContent = sealInfo.label;

    els.readerToggleReadLabel.textContent = msg.unread ? 'Mark Read' : 'Mark Unread';
    els.readerArchiveLabel.textContent = msg.folder === 'archived' ? 'Move to Inbox' : 'Archive';
    els.replyLabel.textContent = 'Quick Reply to ' + msg.sender;

    // Thread messages
    els.readerThread.textContent = '';
    msg.thread.forEach(function (entry, index) {
      var box = document.createElement('div');
      box.className = 'hc-thread-msg' + (entry.isSelf ? ' hc-thread-msg--reply' : '');

      var head = document.createElement('div');
      head.className = 'hc-thread-msg__head';
      var strong = document.createElement('strong');
      strong.textContent = entry.author;
      var timeEl = document.createElement('span');
      timeEl.textContent = entry.time;
      head.appendChild(strong);
      head.appendChild(timeEl);

      var content = document.createElement('div');
      content.className = 'hc-thread-msg__content';

      if (index === 0 && msg.portrait) {
        var portrait = document.createElement('img');
        portrait.className = 'hc-thread-msg__portrait';
        portrait.src = msg.portrait;
        portrait.alt = msg.portraitAlt || msg.sender;
        portrait.width = 96;
        portrait.height = 96;
        portrait.decoding = 'async';
        content.appendChild(portrait);
      }

      entry.paragraphs.forEach(function (paraText) {
        var p = document.createElement('p');
        p.textContent = paraText;
        content.appendChild(p);
      });

      box.appendChild(head);
      box.appendChild(content);
      els.readerThread.appendChild(box);
    });

    // Attachments
    els.readerAttachmentsList.textContent = '';
    if (msg.attachments && msg.attachments.length > 0) {
      els.readerAttachmentsSection.hidden = false;
      els.readerAttachmentsCount.textContent = msg.attachments.length + (msg.attachments.length === 1 ? ' Attachment' : ' Attachments');

      msg.attachments.forEach(function (att) {
        var tile = document.createElement('button');
        tile.type = 'button';
        tile.className = 'hc-attachment-tile';
        tile.setAttribute('data-attachment-name', att.name);

        var icon = document.createElement('img');
        icon.src = ICON_BASE + (att.type === 'table' ? 'icon-data-table-32.svg' : 'icon-data-document-32.svg');
        icon.alt = '';
        icon.width = 24;
        icon.height = 24;
        icon.decoding = 'async';

        var info = document.createElement('span');
        info.className = 'hc-attachment-tile__info';
        var name = document.createElement('span');
        name.className = 'hc-attachment-tile__name';
        name.textContent = att.name;
        var size = document.createElement('span');
        size.className = 'hc-attachment-tile__size';
        size.textContent = att.size;
        info.appendChild(name);
        info.appendChild(size);

        var dl = document.createElement('img');
        dl.src = ICON_BASE + 'icon-action-download-32.svg';
        dl.alt = '';
        dl.width = 18;
        dl.height = 18;
        dl.decoding = 'async';

        tile.appendChild(icon);
        tile.appendChild(info);
        tile.appendChild(dl);
        els.readerAttachmentsList.appendChild(tile);
      });
    } else {
      els.readerAttachmentsSection.hidden = true;
    }
  }

  function refreshMail() {
    renderFolderCounts();
    renderMailList();
  }

  /* ------------------------------------------------------------------------ */
  /* Calendar view switching                                                  */
  /* ------------------------------------------------------------------------ */

  function setCalendarView(mode) {
    state.calendarView = mode;
    var isWeek = mode === 'week';
    var isDay = mode === 'day';
    var isQuiet = mode === 'quiet';

    els.calWeekView.hidden = !isWeek;
    els.calDayView.hidden = !isDay;
    els.calEmptyState.hidden = !isQuiet;

    els.calViewWeek.classList.toggle('is-active', isWeek);
    els.calViewWeek.setAttribute('aria-pressed', isWeek ? 'true' : 'false');

    els.calViewDay.classList.toggle('is-active', isDay);
    els.calViewDay.setAttribute('aria-pressed', isDay ? 'true' : 'false');

    els.calQuietBtn.setAttribute('aria-pressed', isQuiet ? 'true' : 'false');
    els.calQuietBtn.textContent = isQuiet ? 'Showing quiet day (Fri)' : 'View quiet day (Fri)';

    if (els.kpiMeetings) {
      els.kpiMeetings.textContent = isQuiet ? '0' : '3';
    }
  }

  /* ------------------------------------------------------------------------ */
  /* Task checklist & live progress meter                                     */
  /* ------------------------------------------------------------------------ */

  function renderTasks() {
    var total = state.tasks.length;
    var doneCount = 0;
    var highOpen = 0;

    state.tasks.forEach(function (t) {
      if (t.done) doneCount++;
      else if (t.priority === 'high') highOpen++;
    });

    var openCount = total - doneCount;
    var pct = total > 0 ? Math.round((doneCount / total) * 100) : 0;

    els.tasksRatioChip.textContent = doneCount + ' / ' + total + ' done';
    els.tasksPercentLabel.textContent = pct + '%';
    els.tasksProgressbar.setAttribute('aria-valuenow', String(pct));
    els.tasksMeterFill.style.width = pct + '%';

    els.kpiTasksOpen.textContent = String(openCount);
    els.kpiTasksMeta.textContent = highOpen + ' High Priority';

    var filtered = state.tasks.filter(function (t) {
      if (state.taskFilter === 'high') return t.priority === 'high';
      if (state.taskFilter === 'open') return !t.done;
      if (state.taskFilter === 'done') return t.done;
      return true;
    });

    els.taskList.textContent = '';

    if (filtered.length === 0) {
      var emptyLi = document.createElement('li');
      emptyLi.className = 'ov-inline-note';
      emptyLi.textContent = 'No tasks match this filter right now.';
      els.taskList.appendChild(emptyLi);
      return;
    }

    filtered.forEach(function (task) {
      var li = document.createElement('li');
      li.className = 'hc-task-item' + (task.done ? ' is-done' : '');

      var label = document.createElement('label');
      label.className = 'ov-check hc-task-item__check';

      var input = document.createElement('input');
      input.type = 'checkbox';
      input.checked = task.done;
      input.setAttribute('data-task-id', task.id);

      var textWrap = document.createElement('span');
      textWrap.className = 'hc-task-item__text';
      var title = document.createElement('span');
      title.className = 'hc-task-item__title';
      title.textContent = task.title;
      var due = document.createElement('span');
      due.className = 'hc-task-item__due';
      due.textContent = task.owner + ' \u00b7 ' + (task.done ? 'Completed' : task.due);
      textWrap.appendChild(title);
      textWrap.appendChild(due);

      label.appendChild(input);
      label.appendChild(textWrap);

      var right = document.createElement('span');
      right.className = 'hc-task-item__right';

      var chip = document.createElement('span');
      if (task.done) {
        chip.className = 'ov-chip ov-chip--green';
        chip.textContent = 'Done';
      } else if (task.priority === 'high') {
        chip.className = 'ov-chip ov-chip--red';
        chip.textContent = 'High';
      } else if (task.priority === 'upcoming') {
        chip.className = 'ov-chip ov-chip--blue';
        chip.textContent = 'Upcoming';
      } else {
        chip.className = 'ov-chip ov-chip--amber';
        chip.textContent = 'Active';
      }

      var av = document.createElement('img');
      av.className = 'ov-avatar ov-avatar--sm';
      av.src = task.avatar;
      av.alt = task.owner;
      av.width = 28;
      av.height = 28;
      av.decoding = 'async';

      right.appendChild(chip);
      right.appendChild(av);

      li.appendChild(label);
      li.appendChild(right);
      els.taskList.appendChild(li);
    });
  }

  /* ------------------------------------------------------------------------ */
  /* Chronicle strip                                                          */
  /* ------------------------------------------------------------------------ */

  function renderChronicle() {
    var list = state.chronicle.filter(function (entry) {
      if (state.chronicleFilter === 'all') return true;
      return entry.category === state.chronicleFilter;
    }).slice(0, 6);

    els.chronicleList.textContent = '';

    list.forEach(function (entry) {
      var li = document.createElement('li');
      li.className = 'hc-chron-card';

      var textBox = document.createElement('div');
      var time = document.createElement('span');
      time.className = 'hc-chron-card__time';
      time.textContent = entry.time;
      var p = document.createElement('p');
      p.className = 'hc-chron-card__text';
      p.textContent = entry.text;
      textBox.appendChild(time);
      textBox.appendChild(p);

      var av = document.createElement('img');
      av.className = 'ov-avatar ov-avatar--sm';
      av.src = entry.avatar;
      av.alt = entry.alt;
      av.width = 32;
      av.height = 32;
      av.decoding = 'async';

      li.appendChild(textBox);
      li.appendChild(av);
      els.chronicleList.appendChild(li);
    });
  }

  /* ------------------------------------------------------------------------ */
  /* Event wiring                                                             */
  /* ------------------------------------------------------------------------ */

  // Folder switching
  els.folderList.addEventListener('click', function (event) {
    var btn = event.target.closest('[data-folder]');
    if (!btn) return;
    state.folder = btn.getAttribute('data-folder');
    refreshMail();
  });

  // Label filter chips
  els.labelFilters.addEventListener('click', function (event) {
    var btn = event.target.closest('[data-label]');
    if (!btn) return;
    state.labelFilter = btn.getAttribute('data-label');
    var all = els.labelFilters.querySelectorAll('[data-label]');
    for (var i = 0; i < all.length; i++) {
      var active = all[i] === btn;
      all[i].classList.toggle('is-active', active);
      all[i].setAttribute('aria-pressed', active ? 'true' : 'false');
    }
    refreshMail();
  });

  // Live search
  els.mailSearch.addEventListener('input', function () {
    state.searchQuery = els.mailSearch.value;
    refreshMail();
  });

  els.clearSearchBtn.addEventListener('click', function () {
    state.searchQuery = '';
    state.labelFilter = 'all';
    els.mailSearch.value = '';
    var all = els.labelFilters.querySelectorAll('[data-label]');
    for (var i = 0; i < all.length; i++) {
      var isAll = all[i].getAttribute('data-label') === 'all';
      all[i].classList.toggle('is-active', isAll);
      all[i].setAttribute('aria-pressed', isAll ? 'true' : 'false');
    }
    refreshMail();
  });

  // Select mail row
  els.mailList.addEventListener('click', function (event) {
    var btn = event.target.closest('[data-msg-id]');
    if (!btn) return;
    var id = btn.getAttribute('data-msg-id');
    state.selectedId = id;
    for (var i = 0; i < state.messages.length; i++) {
      if (state.messages[i].id === id && state.messages[i].unread) {
        state.messages[i].unread = false;
        break;
      }
    }
    els.replyError.hidden = true;
    els.replyTextarea.removeAttribute('aria-invalid');
    refreshMail();
  });

  // Mark All Read
  els.markAllReadBtn.addEventListener('click', function () {
    var changed = 0;
    state.messages.forEach(function (m) {
      if (m.folder === state.folder && m.unread) {
        m.unread = false;
        changed++;
      }
    });
    refreshMail();
    if (changed > 0) {
      notify('Marked ' + changed + (changed === 1 ? ' letter' : ' letters') + ' read in ' + FOLDER_LABELS[state.folder] + '.', 'success');
      pushChronicle('mail', 'Marked all letters read in ' + FOLDER_LABELS[state.folder]);
    } else {
      notify('All letters in ' + FOLDER_LABELS[state.folder] + ' are already read.', 'info');
    }
  });

  // Clear Folder (triggers Inbox Zero empty state cleanly!)
  els.clearFolderBtn.addEventListener('click', function () {
    var currentFolder = state.folder;
    var count = 0;
    if (currentFolder === 'archived') {
      var before = state.messages.length;
      state.messages = state.messages.filter(function (m) { return m.folder !== 'archived'; });
      count = before - state.messages.length;
    } else {
      state.messages.forEach(function (m) {
        if (m.folder === currentFolder) {
          m.folder = 'archived';
          m.unread = false;
          m.seal = 'archived';
          count++;
        }
      });
    }
    refreshMail();
    if (count > 0) {
      notify(currentFolder === 'archived'
        ? 'Emptied ' + count + ' archived dispatches.'
        : 'Cleared ' + count + ' letters from ' + FOLDER_LABELS[currentFolder] + ' to Archived.', 'success');
      pushChronicle('mail', 'Cleared ' + FOLDER_LABELS[currentFolder] + ' folder (' + count + ' letters)');
    }
  });

  // Restore sample mail
  function restoreSampleMail() {
    state.messages = createInitialMessages();
    state.folder = 'inbox';
    state.labelFilter = 'all';
    state.searchQuery = '';
    state.selectedId = 'msg-council-update';
    els.mailSearch.value = '';
    var all = els.labelFilters.querySelectorAll('[data-label]');
    for (var i = 0; i < all.length; i++) {
      var isAll = all[i].getAttribute('data-label') === 'all';
      all[i].classList.toggle('is-active', isAll);
      all[i].setAttribute('aria-pressed', isAll ? 'true' : 'false');
    }
    refreshMail();
    notify('Restored sample Hearthside mail dispatches.', 'info');
    pushChronicle('mail', 'Restored sample mailroom dispatches');
  }

  els.restoreMailBtn.addEventListener('click', restoreSampleMail);
  els.readerRestoreBtn.addEventListener('click', restoreSampleMail);

  // Reader actions: Reply focus, Mark Read/Unread, Archive
  els.readerReplyBtn.addEventListener('click', function () {
    els.replyTextarea.focus();
  });

  els.readerToggleReadBtn.addEventListener('click', function () {
    var msg = state.messages.find(function (m) { return m.id === state.selectedId; });
    if (!msg) return;
    msg.unread = !msg.unread;
    refreshMail();
    notify(msg.unread ? 'Marked "' + msg.subject + '" as unread.' : 'Marked "' + msg.subject + '" as read.', 'info');
  });

  els.readerArchiveBtn.addEventListener('click', function () {
    var msg = state.messages.find(function (m) { return m.id === state.selectedId; });
    if (!msg) return;
    if (msg.folder === 'archived') {
      msg.folder = 'inbox';
      msg.seal = 'approved';
      notify('Moved "' + msg.subject + '" back to Inbox.', 'success');
      pushChronicle('mail', 'Restored "' + msg.subject + '" to Inbox');
    } else {
      msg.folder = 'archived';
      msg.unread = false;
      msg.seal = 'archived';
      notify('Archived "' + msg.subject + '".', 'success');
      pushChronicle('mail', 'Archived "' + msg.subject + '"');
    }
    refreshMail();
  });

  // Attachment preview toast
  els.readerAttachmentsList.addEventListener('click', function (event) {
    var tile = event.target.closest('[data-attachment-name]');
    if (!tile) return;
    var fileName = tile.getAttribute('data-attachment-name');
    notify('Prepared "' + fileName + '" from the Hearthside mailroom ledger.', 'info');
  });

  // Inline Reply submission
  els.replyClearBtn.addEventListener('click', function () {
    els.replyTextarea.value = '';
    els.replyError.hidden = true;
    els.replyTextarea.removeAttribute('aria-invalid');
    els.replyTextarea.focus();
  });

  els.replyTextarea.addEventListener('input', function () {
    if (els.replyTextarea.value.trim()) {
      els.replyError.hidden = true;
      els.replyTextarea.removeAttribute('aria-invalid');
    }
  });

  els.replyForm.addEventListener('submit', function (event) {
    event.preventDefault();
    var msg = state.messages.find(function (m) { return m.id === state.selectedId; });
    if (!msg) return;

    var body = els.replyTextarea.value.trim();
    if (!body) {
      els.replyError.hidden = false;
      els.replyTextarea.setAttribute('aria-invalid', 'true');
      els.replyTextarea.focus();
      return;
    }

    var stamp = nowTimeStamp();
    msg.thread.push({
      author: 'Brambles Badger (You)',
      time: 'Today, ' + stamp,
      isSelf: true,
      paragraphs: [body]
    });
    msg.snippet = 'You: ' + body;
    msg.time = stamp;
    msg.unread = false;

    els.replyTextarea.value = '';
    els.replyError.hidden = true;
    els.replyTextarea.removeAttribute('aria-invalid');

    refreshMail();
    showCourierConfirmation('Courier dispatched to ' + msg.sender + '!');
    notify('Reply sent to ' + msg.sender + '.', 'success');
    pushChronicle('mail', 'Replied to ' + msg.sender + ' on "' + msg.subject + '"');
  });

  // Compose Dialog submission
  els.composeSubject.addEventListener('input', function () {
    if (els.composeSubject.value.trim()) {
      els.composeSubjectError.hidden = true;
      els.composeSubject.removeAttribute('aria-invalid');
    }
  });

  els.composeBody.addEventListener('input', function () {
    if (els.composeBody.value.trim()) {
      els.composeBodyError.hidden = true;
      els.composeBody.removeAttribute('aria-invalid');
    }
  });

  els.composeForm.addEventListener('submit', function (event) {
    event.preventDefault();
    var subject = els.composeSubject.value.trim();
    var body = els.composeBody.value.trim();
    var invalid = false;

    if (!subject) {
      els.composeSubjectError.hidden = false;
      els.composeSubject.setAttribute('aria-invalid', 'true');
      invalid = true;
    }
    if (!body) {
      els.composeBodyError.hidden = false;
      els.composeBody.setAttribute('aria-invalid', 'true');
      invalid = true;
    }
    if (invalid) {
      if (!subject) els.composeSubject.focus();
      else els.composeBody.focus();
      return;
    }

    var toParts = els.composeTo.value.split('|');
    var recipientName = toParts[0] || 'Elder Oakley';
    var recipientAddr = toParts[1] || 'elder.oakley@orchardvale.gov';
    var recipientAvatar = AVATAR_BASE + (toParts[2] || 'avatar-owl-scholar-neutral-512.webp');
    var targetFolder = els.composeFolder.value;
    var category = els.composeCategory.value;
    var seal = els.composeSeal.value;
    var stamp = nowTimeStamp();

    var newMsg = {
      id: 'msg-' + Date.now(),
      folder: targetFolder,
      unread: false,
      sender: recipientName,
      email: recipientAddr,
      to: recipientName + ' (from Brambles Badger)',
      avatar: recipientAvatar,
      time: stamp,
      subject: subject,
      snippet: body,
      category: category,
      seal: seal,
      attachments: [],
      thread: [
        {
          author: 'Brambles Badger (You)',
          time: 'Today, ' + stamp,
          isSelf: true,
          paragraphs: [body]
        }
      ]
    };

    state.messages.unshift(newMsg);
    state.folder = targetFolder;
    state.selectedId = newMsg.id;

    els.composeForm.reset();
    if (window.OrchardVale && typeof window.OrchardVale.closeDialog === 'function') {
      window.OrchardVale.closeDialog(els.composeDialog);
    } else if (els.composeDialog && typeof els.composeDialog.close === 'function') {
      els.composeDialog.close();
    }

    refreshMail();
    showCourierConfirmation('New dispatch sealed & sent to ' + recipientName + '!');
    notify('Dispatched "' + subject + '" to ' + recipientName + '.', 'success');
    pushChronicle('mail', 'Sent "' + subject + '" to ' + recipientName);
  });

  // Calendar controls
  els.calViewWeek.addEventListener('click', function () {
    setCalendarView('week');
  });

  els.calViewDay.addEventListener('click', function () {
    setCalendarView('day');
  });

  els.calQuietBtn.addEventListener('click', function () {
    if (state.calendarView === 'quiet') {
      setCalendarView('week');
      notify('Returned to weekly schedule.', 'info');
    } else {
      setCalendarView('quiet');
      notify('Viewing Friday, May 23 — clear calendar day.', 'info');
      pushChronicle('calendar', 'Opened quiet day view (Friday, May 23)');
    }
  });

  els.calFriShortcut.addEventListener('click', function () {
    setCalendarView('quiet');
    pushChronicle('calendar', 'Opened quiet day view (Friday, May 23)');
  });

  els.calReturnWeekBtn.addEventListener('click', function () {
    setCalendarView('week');
  });

  // Quick command tiles
  els.quickQuietDay.addEventListener('click', function () {
    setCalendarView(state.calendarView === 'quiet' ? 'week' : 'quiet');
    els.calQuietBtn.focus();
  });

  els.quickNewTask.addEventListener('click', function () {
    els.newTaskInput.focus();
    els.newTaskInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  els.toggleFocusMode.addEventListener('click', function () {
    state.focusMode = !state.focusMode;
    els.body.classList.toggle('is-focus-mode', state.focusMode);
    els.toggleFocusMode.setAttribute('aria-pressed', state.focusMode ? 'true' : 'false');
    els.kpiFocus.textContent = state.focusMode ? 'Active' : '45m';
    els.kpiFocusMeta.textContent = state.focusMode ? 'Quiet chimes enabled' : 'Until 12:00 PM';
    els.presenceLabel.textContent = state.focusMode ? 'Orchard Vale \u00b7 Focusing' : 'Orchard Vale \u00b7 Online';
    notify(state.focusMode ? 'Focus Mode enabled — chimes silenced for deep work.' : 'Focus Mode ended — back to normal mailroom cadence.', 'info');
  });

  // Task checklist toggling, filtering & adding
  els.taskList.addEventListener('change', function (event) {
    var checkbox = event.target;
    if (!checkbox || checkbox.type !== 'checkbox') return;
    var id = checkbox.getAttribute('data-task-id');
    var task = state.tasks.find(function (t) { return t.id === id; });
    if (!task) return;
    task.done = checkbox.checked;
    renderTasks();
    if (task.done) {
      notify('Completed "' + task.title + '".', 'success');
      pushChronicle('tasks', 'Completed task: ' + task.title, task.avatar, task.owner);
    } else {
      notify('Reopened "' + task.title + '".', 'info');
    }
  });

  els.taskFilters.addEventListener('click', function (event) {
    var btn = event.target.closest('[data-task-filter]');
    if (!btn) return;
    state.taskFilter = btn.getAttribute('data-task-filter');
    var all = els.taskFilters.querySelectorAll('[data-task-filter]');
    for (var i = 0; i < all.length; i++) {
      var active = all[i] === btn;
      all[i].classList.toggle('is-active', active);
      all[i].setAttribute('aria-pressed', active ? 'true' : 'false');
    }
    renderTasks();
  });

  els.addTaskForm.addEventListener('submit', function (event) {
    event.preventDefault();
    var title = els.newTaskInput.value.trim();
    if (!title) {
      els.newTaskInput.setAttribute('aria-invalid', 'true');
      els.newTaskInput.focus();
      notify('Enter a task description before adding.', 'warning');
      return;
    }
    els.newTaskInput.removeAttribute('aria-invalid');
    var priority = els.newTaskPriority.value;
    state.tasks.unshift({
      id: 't-' + Date.now(),
      title: title,
      priority: priority,
      due: priority === 'high' ? 'Today' : priority === 'upcoming' ? 'Next Week' : 'This Week',
      done: false,
      avatar: AVATAR_BASE + 'avatar-badger-orchestrator-neutral-512.webp',
      owner: 'Brambles Badger'
    });
    els.newTaskInput.value = '';
    renderTasks();
    notify('Added "' + title + '" to your task ledger.', 'success');
    pushChronicle('tasks', 'Added task: ' + title);
  });

  // Chronicle filters
  els.chronicleFilters.addEventListener('click', function (event) {
    var btn = event.target.closest('[data-chron]');
    if (!btn) return;
    state.chronicleFilter = btn.getAttribute('data-chron');
    var all = els.chronicleFilters.querySelectorAll('[data-chron]');
    for (var i = 0; i < all.length; i++) {
      var active = all[i] === btn;
      all[i].classList.toggle('is-active', active);
      all[i].setAttribute('aria-pressed', active ? 'true' : 'false');
    }
    renderChronicle();
  });

  /* ------------------------------------------------------------------------ */
  /* Initial render                                                           */
  /* ------------------------------------------------------------------------ */

  refreshMail();
  setCalendarView('week');
  renderTasks();
  renderChronicle();
})();
