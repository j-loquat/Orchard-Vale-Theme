(function () {
  'use strict';

  var SVG_NS = 'http://www.w3.org/2000/svg';

  var EXPENSE_CATEGORIES = ['Home', 'Food', 'Transport', 'Utilities', 'Flexible'];

  var CATEGORY_COLORS = {
    Home: '#355d7f',
    Food: '#b86f28',
    Transport: '#2f6b3f',
    Utilities: '#73508b',
    Flexible: '#9a4337'
  };

  var MONTHLY_BUDGETS = {
    Home: 2200,
    Food: 900,
    Transport: 550,
    Utilities: 450,
    Flexible: 700
  };

  // Historical months for the 6-month Cash Flow Over Time chart (Feb–Apr 2026).
  var HISTORICAL_MONTHS = [
    { key: 'February 2026', short: 'Feb', income: 5950, expenses: 4180 },
    { key: 'March 2026', short: 'Mar', income: 6200, expenses: 4390 },
    { key: 'April 2026', short: 'Apr', income: 6100, expenses: 3980 }
  ];

  // Single-source-of-truth monthly datasets (May, June, July 2026).
  // Every KPI, chart, donut slice, budget meter, account balance, and savings goal total
  // is computed dynamically from this dataset.
  var MONTHS = {
    'May 2026': {
      short: 'May',
      defaultDate: '2026-05-26',
      accounts: [
        { id: 'checking', name: 'Everyday Checking', sub: 'Prosperity Bank · #4018', balance: 3640, icon: '../src/assets/orchard-vale/icons/icon-finance-bank-32.svg' },
        { id: 'savings', name: 'Greenleaf Savings', sub: 'Matches funded goals', balance: 10220, icon: '../src/assets/orchard-vale/icons/icon-finance-savings-32.svg' },
        { id: 'bills', name: 'Reserved Bills', sub: 'Escrow & utilities', balance: 1940, icon: '../src/assets/orchard-vale/icons/icon-finance-purse-32.svg' }
      ],
      goals: [
        { name: 'Emergency Reserve', funded: 5800, target: 10000, motif: '../src/assets/orchard-vale/motifs/finance/motif-finance-savings-jar-96.svg' },
        { name: 'Long-Term Fund', funded: 3700, target: 8000, motif: '../src/assets/orchard-vale/motifs/finance/motif-finance-investment-tree-96.svg' },
        { name: 'Autumn Travel', funded: 720, target: 1500, motif: '../src/assets/orchard-vale/motifs/finance/motif-finance-purse-96.svg' }
      ],
      bills: [
        { date: 'May 27', name: 'Property Insurance', detail: 'scheduled', amount: 184, icon: '../src/assets/orchard-vale/icons/icon-finance-bill-32.svg' },
        { date: 'May 29', name: 'Waterworks Levy', detail: 'automatic', amount: 78, icon: '../src/assets/orchard-vale/icons/icon-finance-coin-stack-32.svg' },
        { date: 'May 31', name: 'Guild Hall Dues', detail: 'needs review', amount: 65, icon: '../src/assets/orchard-vale/icons/icon-finance-card-32.svg' }
      ],
      transactions: [
        { id: 'm1', date: '2026-05-24', description: 'Bookshop & Village Fair', category: 'Flexible', type: 'expense', amount: 418.00, status: 'Posted' },
        { id: 'm2', date: '2026-05-22', description: 'Consulting Retainer', category: 'Income', type: 'income', amount: 900.00, status: 'Cleared' },
        { id: 'm3', date: '2026-05-19', description: 'Bakery & Pantry Restock', category: 'Food', type: 'expense', amount: 298.40, status: 'Posted' },
        { id: 'm4', date: '2026-05-18', description: 'Internet & Line Service', category: 'Utilities', type: 'expense', amount: 92.00, status: 'Posted' },
        { id: 'm5', date: '2026-05-15', description: 'Orchard Cooperative Dividend', category: 'Income', type: 'income', amount: 1150.00, status: 'Cleared' },
        { id: 'm6', date: '2026-05-14', description: 'Hydro & Waterworks', category: 'Utilities', type: 'expense', amount: 246.50, status: 'Posted' },
        { id: 'm7', date: '2026-05-11', description: 'Carriage Fuel & Maintenance', category: 'Transport', type: 'expense', amount: 312.60, status: 'Posted' },
        { id: 'm8', date: '2026-05-09', description: 'Weekly Orchard Market', category: 'Food', type: 'expense', amount: 342.50, status: 'Posted' },
        { id: 'm9', date: '2026-05-06', description: 'Timber Roof Repair', category: 'Home', type: 'expense', amount: 210.00, status: 'Posted' },
        { id: 'm10', date: '2026-05-02', description: 'Cottage Mortgage & Levy', category: 'Home', type: 'expense', amount: 1680.00, status: 'Posted' },
        { id: 'm11', date: '2026-05-01', description: 'Guildhall Salary Deposit', category: 'Income', type: 'income', amount: 3950.00, status: 'Cleared' }
      ]
    },
    'June 2026': {
      short: 'Jun',
      defaultDate: '2026-06-27',
      accounts: [
        { id: 'checking', name: 'Everyday Checking', sub: 'Prosperity Bank · #4018', balance: 3980, icon: '../src/assets/orchard-vale/icons/icon-finance-bank-32.svg' },
        { id: 'savings', name: 'Greenleaf Savings', sub: 'Matches funded goals', balance: 10820, icon: '../src/assets/orchard-vale/icons/icon-finance-savings-32.svg' },
        { id: 'bills', name: 'Reserved Bills', sub: 'Escrow & utilities', balance: 2040, icon: '../src/assets/orchard-vale/icons/icon-finance-purse-32.svg' }
      ],
      goals: [
        { name: 'Emergency Reserve', funded: 6100, target: 10000, motif: '../src/assets/orchard-vale/motifs/finance/motif-finance-savings-jar-96.svg' },
        { name: 'Long-Term Fund', funded: 3850, target: 8000, motif: '../src/assets/orchard-vale/motifs/finance/motif-finance-investment-tree-96.svg' },
        { name: 'Autumn Travel', funded: 870, target: 1500, motif: '../src/assets/orchard-vale/motifs/finance/motif-finance-purse-96.svg' }
      ],
      bills: [
        { date: 'Jun 28', name: 'Insurance Renewal', detail: 'scheduled', amount: 184, icon: '../src/assets/orchard-vale/icons/icon-finance-bill-32.svg' },
        { date: 'Jun 29', name: 'Municipal Water', detail: 'automatic', amount: 84, icon: '../src/assets/orchard-vale/icons/icon-finance-coin-stack-32.svg' },
        { date: 'Jun 30', name: 'Orchard Care Plan', detail: 'needs review', amount: 115, icon: '../src/assets/orchard-vale/icons/icon-finance-card-32.svg' }
      ],
      transactions: [
        { id: 'j1', date: '2026-06-26', description: 'Summer Harvest Stipend', category: 'Income', type: 'income', amount: 1100.00, status: 'Cleared' },
        { id: 'j2', date: '2026-06-23', description: 'Summer Craft Supplies', category: 'Flexible', type: 'expense', amount: 455.00, status: 'Posted' },
        { id: 'j3', date: '2026-06-20', description: 'Hearthside Supper & Market', category: 'Food', type: 'expense', amount: 324.80, status: 'Posted' },
        { id: 'j4', date: '2026-06-18', description: 'Internet & Line Service', category: 'Utilities', type: 'expense', amount: 92.00, status: 'Posted' },
        { id: 'j5', date: '2026-06-15', description: 'Hydro & Cooling Estimate', category: 'Utilities', type: 'expense', amount: 268.00, status: 'Posted' },
        { id: 'j6', date: '2026-06-14', description: 'Consulting Invoice #408', category: 'Income', type: 'income', amount: 1450.00, status: 'Cleared' },
        { id: 'j7', date: '2026-06-12', description: 'Regional Rail & Fuel', category: 'Transport', type: 'expense', amount: 385.00, status: 'Posted' },
        { id: 'j8', date: '2026-06-10', description: 'Garden Stonework & Mulch', category: 'Home', type: 'expense', amount: 280.00, status: 'Posted' },
        { id: 'j9', date: '2026-06-07', description: 'Mid-Summer Groceries', category: 'Food', type: 'expense', amount: 415.20, status: 'Posted' },
        { id: 'j10', date: '2026-06-02', description: 'Cottage Mortgage & Levy', category: 'Home', type: 'expense', amount: 1680.00, status: 'Posted' },
        { id: 'j11', date: '2026-06-01', description: 'Guildhall Salary Deposit', category: 'Income', type: 'income', amount: 3950.00, status: 'Cleared' }
      ]
    },
    'July 2026': {
      short: 'Jul',
      defaultDate: '2026-07-16',
      accounts: [
        { id: 'checking', name: 'Everyday Checking', sub: 'Prosperity Bank · #4018', balance: 4280, icon: '../src/assets/orchard-vale/icons/icon-finance-bank-32.svg' },
        { id: 'savings', name: 'Greenleaf Savings', sub: 'Matches funded goals', balance: 11420, icon: '../src/assets/orchard-vale/icons/icon-finance-savings-32.svg' },
        { id: 'bills', name: 'Reserved Bills', sub: 'Escrow & utilities', balance: 2140, icon: '../src/assets/orchard-vale/icons/icon-finance-purse-32.svg' }
      ],
      goals: [
        { name: 'Emergency Reserve', funded: 6400, target: 10000, motif: '../src/assets/orchard-vale/motifs/finance/motif-finance-savings-jar-96.svg' },
        { name: 'Long-Term Fund', funded: 4000, target: 8000, motif: '../src/assets/orchard-vale/motifs/finance/motif-finance-investment-tree-96.svg' },
        { name: 'Autumn Travel', funded: 1020, target: 1500, motif: '../src/assets/orchard-vale/motifs/finance/motif-finance-purse-96.svg' }
      ],
      bills: [
        { date: 'Jul 18', name: 'Internet', detail: 'automatic', amount: 92, icon: '../src/assets/orchard-vale/icons/icon-finance-bill-32.svg' },
        { date: 'Jul 21', name: 'Insurance', detail: 'scheduled', amount: 184, icon: '../src/assets/orchard-vale/icons/icon-finance-coin-stack-32.svg' },
        { date: 'Jul 25', name: 'Property services', detail: 'needs review', amount: 120, icon: '../src/assets/orchard-vale/icons/icon-finance-card-32.svg' }
      ],
      transactions: [
        { id: 'u1', date: '2026-07-16', description: 'Orchard Workshop Stipend', category: 'Income', type: 'income', amount: 750.00, status: 'Cleared' },
        { id: 'u2', date: '2026-07-15', description: 'Market Groceries & Dairy', category: 'Food', type: 'expense', amount: 323.60, status: 'Posted' },
        { id: 'u3', date: '2026-07-15', description: 'Internet & Waterworks', category: 'Utilities', type: 'expense', amount: 174.00, status: 'Posted' },
        { id: 'u4', date: '2026-07-14', description: 'Consulting Invoice #412', category: 'Income', type: 'income', amount: 1250.00, status: 'Cleared' },
        { id: 'u5', date: '2026-07-13', description: 'Village Concert Tickets', category: 'Flexible', type: 'expense', amount: 135.00, status: 'Posted' },
        { id: 'u6', date: '2026-07-12', description: 'Hydro Estimate', category: 'Utilities', type: 'expense', amount: 146.00, status: 'Pending' },
        { id: 'u7', date: '2026-07-11', description: 'Porch Trim & Hardware', category: 'Home', type: 'expense', amount: 135.00, status: 'Posted' },
        { id: 'u8', date: '2026-07-10', description: 'Vehicle Fuel & Toll Pass', category: 'Transport', type: 'expense', amount: 290.00, status: 'Posted' },
        { id: 'u9', date: '2026-07-08', description: 'Bookbinder & Tea House', category: 'Flexible', type: 'expense', amount: 195.00, status: 'Posted' },
        { id: 'u10', date: '2026-07-06', description: 'Orchard Farmers Market', category: 'Food', type: 'expense', amount: 286.40, status: 'Posted' },
        { id: 'u11', date: '2026-07-02', description: 'Cottage Mortgage & Levy', category: 'Home', type: 'expense', amount: 1680.00, status: 'Posted' },
        { id: 'u12', date: '2026-07-01', description: 'Guildhall Salary Deposit', category: 'Income', type: 'income', amount: 3950.00, status: 'Cleared' }
      ]
    }
  };

  var state = {
    activePeriod: 'July 2026',
    txSearch: '',
    txCategory: 'All'
  };

  function fmtWhole(num) {
    return '$' + Math.round(Math.abs(num)).toLocaleString('en-US');
  }

  function fmtExact(num) {
    return '$' + Math.abs(num).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function fmtSignedWhole(num) {
    return (num >= 0 ? '+' : '\u2212') + fmtWhole(num);
  }

  function fmtShortDate(iso) {
    var parts = String(iso || '').split('-');
    if (parts.length !== 3) return iso;
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var mIdx = parseInt(parts[1], 10) - 1;
    var day = parseInt(parts[2], 10);
    return (months[mIdx] || parts[1]) + ' ' + day;
  }

  function computeMonthSummary(periodKey) {
    var month = MONTHS[periodKey];
    var income = 0;
    var spending = 0;
    var incomeCount = 0;
    var expenseCount = 0;
    var byCategory = {};
    EXPENSE_CATEGORIES.forEach(function (c) { byCategory[c] = 0; });

    month.transactions.forEach(function (tx) {
      if (tx.type === 'income') {
        income += tx.amount;
        incomeCount += 1;
      } else {
        spending += tx.amount;
        expenseCount += 1;
        if (byCategory[tx.category] !== undefined) {
          byCategory[tx.category] += tx.amount;
        } else {
          byCategory.Flexible += tx.amount;
        }
      }
    });

    var totalBudget = EXPENSE_CATEGORIES.reduce(function (sum, c) { return sum + MONTHLY_BUDGETS[c]; }, 0);
    var totalBalance = month.accounts.reduce(function (sum, a) { return sum + a.balance; }, 0);
    var totalGoalsFunded = month.goals.reduce(function (sum, g) { return sum + g.funded; }, 0);
    var totalGoalsTarget = month.goals.reduce(function (sum, g) { return sum + g.target; }, 0);
    var netCashFlow = income - spending;
    var planPct = totalBudget > 0 ? Math.round((spending / totalBudget) * 100) : 0;
    var savingsRate = income > 0 ? Math.round((netCashFlow / income) * 100) : 0;

    return {
      month: month,
      income: income,
      spending: spending,
      incomeCount: incomeCount,
      expenseCount: expenseCount,
      byCategory: byCategory,
      totalBudget: totalBudget,
      totalBalance: totalBalance,
      totalGoalsFunded: totalGoalsFunded,
      totalGoalsTarget: totalGoalsTarget,
      netCashFlow: netCashFlow,
      planPct: planPct,
      savingsRate: savingsRate
    };
  }

  function svgEl(tag, attrs) {
    var el = document.createElementNS(SVG_NS, tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        el.setAttribute(k, String(attrs[k]));
      });
    }
    return el;
  }

  function renderKPIs(summary) {
    var set = function (id, txt) {
      var el = document.getElementById(id);
      if (el) el.textContent = txt;
    };

    set('kpi-balance', fmtWhole(summary.totalBalance));
    set('kpi-balance-sub', summary.month.accounts.length + ' active accounts');
    set('kpi-income', fmtWhole(summary.income));
    set('kpi-income-sub', summary.incomeCount + (summary.incomeCount === 1 ? ' deposit' : ' deposits'));
    set('kpi-spending', fmtWhole(summary.spending));
    set('kpi-spending-sub', summary.expenseCount + (summary.expenseCount === 1 ? ' expense' : ' expenses'));
    set('kpi-net', fmtSignedWhole(summary.netCashFlow));
    set('kpi-net-sub', (summary.savingsRate >= 0 ? summary.savingsRate + '% saved' : Math.abs(summary.savingsRate) + '% deficit'));
    set('kpi-plan', summary.planPct + '%');
    set('kpi-plan-sub', fmtWhole(summary.spending) + ' of ' + fmtWhole(summary.totalBudget));
    set('cashflow-period-badge', state.activePeriod);
  }

  function renderCashFlowSVG() {
    var host = document.getElementById('cashflow-chart-host');
    var readout = document.getElementById('cashflow-hover-readout');
    if (!host) return;

    var series = HISTORICAL_MONTHS.map(function (m) {
      return { key: m.key, short: m.short, income: m.income, expenses: m.expenses, net: m.income - m.expenses };
    });

    ['May 2026', 'June 2026', 'July 2026'].forEach(function (k) {
      var s = computeMonthSummary(k);
      series.push({ key: k, short: s.month.short, income: s.income, expenses: s.spending, net: s.netCashFlow });
    });

    var maxVal = 0;
    series.forEach(function (d) {
      maxVal = Math.max(maxVal, d.income, d.expenses);
    });
    var yMax = Math.max(8000, Math.ceil(maxVal / 2000) * 2000);

    var W = 520;
    var H = 228;
    var padL = 44;
    var padR = 14;
    var padT = 14;
    var padB = 28;
    var plotW = W - padL - padR;
    var plotH = H - padT - padB;

    var yScale = function (v) {
      var clamped = Math.max(0, v);
      return padT + plotH - (clamped / yMax) * plotH;
    };

    var svg = svgEl('svg', {
      class: 'cashflow-svg',
      viewBox: '0 0 ' + W + ' ' + H,
      role: 'img',
      'aria-label': 'Six-month grouped Income versus Expenses and Net Cash Flow chart from February through July 2026'
    });

    // Horizontal Y-axis gridlines & dollar ticks
    var steps = 4;
    for (var i = 0; i <= steps; i++) {
      var val = (yMax / steps) * i;
      var y = yScale(val);
      svg.appendChild(svgEl('line', {
        class: i === 0 ? 'cf-axis-base' : 'cf-gridline',
        x1: padL,
        y1: y.toFixed(1),
        x2: W - padR,
        y2: y.toFixed(1)
      }));
      var tick = svgEl('text', {
        class: 'cf-tick',
        x: padL - 7,
        y: (y + 4).toFixed(1),
        'text-anchor': 'end'
      });
      tick.textContent = val === 0 ? '$0' : '$' + (val / 1000) + 'k';
      svg.appendChild(tick);
    }

    var slotW = plotW / series.length;
    var barW = Math.min(24, slotW * 0.3);
    var gap = 4;
    var netPoints = [];

    series.forEach(function (d, idx) {
      var cx = padL + slotW * idx + slotW / 2;
      var isActive = d.key === state.activePeriod;
      var g = svgEl('g', {
        class: 'cf-month-group',
        tabindex: '0',
        'aria-label': d.key + ': Income ' + fmtWhole(d.income) + ', Expenses ' + fmtWhole(d.expenses) + ', Net ' + fmtSignedWhole(d.net)
      });

      if (isActive) {
        g.appendChild(svgEl('rect', {
          class: 'cf-active-band',
          x: (padL + slotW * idx + 4).toFixed(1),
          y: padT,
          width: (slotW - 8).toFixed(1),
          height: plotH,
          rx: 4
        }));
      }

      var incY = yScale(d.income);
      var incH = Math.max(2, padT + plotH - incY);
      g.appendChild(svgEl('rect', {
        class: 'cf-bar-income',
        x: (cx - barW - gap / 2).toFixed(1),
        y: incY.toFixed(1),
        width: barW.toFixed(1),
        height: incH.toFixed(1),
        rx: 2
      }));

      var expY = yScale(d.expenses);
      var expH = Math.max(2, padT + plotH - expY);
      g.appendChild(svgEl('rect', {
        class: 'cf-bar-expense',
        x: (cx + gap / 2).toFixed(1),
        y: expY.toFixed(1),
        width: barW.toFixed(1),
        height: expH.toFixed(1),
        rx: 2
      }));

      var lbl = svgEl('text', {
        class: 'cf-month-label' + (isActive ? ' is-active' : ''),
        x: cx.toFixed(1),
        y: H - 8,
        'text-anchor': 'middle'
      });
      lbl.textContent = d.short;
      g.appendChild(lbl);

      var showReadout = function () {
        if (!readout) return;
        readout.textContent = d.key + ': Income ' + fmtWhole(d.income) + ' · Expenses ' + fmtWhole(d.expenses) + ' · Net ' + fmtSignedWhole(d.net);
      };
      g.addEventListener('mouseenter', showReadout);
      g.addEventListener('focus', showReadout);

      svg.appendChild(g);
      netPoints.push({ x: cx, y: yScale(Math.max(0, d.net)), isActive: isActive, d: d });
    });

    // Net Cash Flow line + nodes
    var polyPts = netPoints.map(function (p) { return p.x.toFixed(1) + ',' + p.y.toFixed(1); }).join(' ');
    svg.appendChild(svgEl('polyline', { class: 'cf-net-line', points: polyPts }));

    netPoints.forEach(function (p) {
      svg.appendChild(svgEl('circle', {
        class: 'cf-net-dot' + (p.isActive ? ' is-active' : ''),
        cx: p.x.toFixed(1),
        cy: p.y.toFixed(1),
        r: p.isActive ? 5 : 4
      }));
    });

    host.innerHTML = '';
    host.appendChild(svg);

    var activeSeries = series.find(function (d) { return d.key === state.activePeriod; });
    if (readout && activeSeries) {
      readout.textContent = activeSeries.key + ': Income ' + fmtWhole(activeSeries.income) + ' · Expenses ' + fmtWhole(activeSeries.expenses) + ' · Net ' + fmtSignedWhole(activeSeries.net);
    }
  }

  function renderSpendingDonut(summary) {
    var host = document.getElementById('spending-donut-host');
    var legend = document.getElementById('spending-donut-legend');
    if (!host || !legend) return;

    var total = summary.spending;
    var items = EXPENSE_CATEGORIES.map(function (cat) {
      var val = summary.byCategory[cat] || 0;
      var pct = total > 0 ? (val / total) * 100 : 0;
      return { cat: cat, val: val, pct: pct, color: CATEGORY_COLORS[cat] };
    }).sort(function (a, b) { return b.val - a.val; });

    var svg = svgEl('svg', {
      class: 'spending-donut-svg',
      viewBox: '0 0 180 180',
      role: 'img',
      'aria-label': 'Spending breakdown donut totaling ' + fmtWhole(total)
    });

    svg.appendChild(svgEl('circle', {
      cx: 90,
      cy: 90,
      r: 62,
      fill: 'none',
      stroke: 'rgba(112, 72, 38, 0.16)',
      'stroke-width': 25
    }));

    var g = svgEl('g', { transform: 'rotate(-90 90 90)' });
    var offset = 0;

    items.forEach(function (item) {
      if (item.pct <= 0) return;
      var slice = svgEl('circle', {
        class: 'spending-slice' + (state.txCategory === item.cat ? ' is-active' : ''),
        cx: 90,
        cy: 90,
        r: 62,
        fill: 'none',
        stroke: item.color,
        'stroke-width': 25,
        pathLength: 100,
        'stroke-dasharray': item.pct.toFixed(2) + ' ' + (100 - item.pct).toFixed(2),
        'stroke-dashoffset': (-offset).toFixed(2),
        tabindex: '0',
        'aria-label': item.cat + ': ' + Math.round(item.pct) + ' percent, ' + fmtWhole(item.val)
      });
      slice.addEventListener('click', function () {
        toggleCategoryFilter(item.cat);
      });
      slice.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleCategoryFilter(item.cat);
        }
      });
      g.appendChild(slice);
      offset += item.pct;
    });

    svg.appendChild(g);

    var medallion = svgEl('image', {
      href: '../src/assets/orchard-vale/data-viz/donut-center-medallion-parchment.svg',
      x: 42,
      y: 42,
      width: 96,
      height: 96,
      'aria-hidden': 'true'
    });
    svg.appendChild(medallion);

    // Clean inner parchment disk preserves the medallion's walnut & brass rings while keeping center text unobstructed.
    svg.appendChild(svgEl('circle', { cx: 90, cy: 90, r: 30.5, fill: '#f8edcf' }));

    var valText = svgEl('text', {
      class: 'spending-donut-value',
      x: 90,
      y: 88,
      'text-anchor': 'middle'
    });
    valText.textContent = fmtWhole(total);
    svg.appendChild(valText);

    var subText = svgEl('text', {
      class: 'spending-donut-sub',
      x: 90,
      y: 104,
      'text-anchor': 'middle'
    });
    subText.textContent = 'Total Spent';
    svg.appendChild(subText);

    host.innerHTML = '';
    host.appendChild(svg);

    legend.innerHTML = '';
    items.forEach(function (item) {
      var li = document.createElement('li');
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'spending-legend-btn' + (state.txCategory === item.cat ? ' is-active' : '');
      btn.setAttribute('aria-pressed', state.txCategory === item.cat ? 'true' : 'false');

      var swatch = document.createElement('span');
      swatch.className = 'spending-legend-swatch';
      swatch.style.backgroundColor = item.color;

      var name = document.createElement('span');
      name.textContent = item.cat;

      var pct = document.createElement('span');
      pct.className = 'spending-legend-pct';
      pct.textContent = Math.round(item.pct) + '%';

      var amt = document.createElement('strong');
      amt.className = 'spending-legend-amt';
      amt.textContent = fmtWhole(item.val);

      btn.appendChild(swatch);
      btn.appendChild(name);
      btn.appendChild(pct);
      btn.appendChild(amt);
      btn.addEventListener('click', function () {
        toggleCategoryFilter(item.cat);
      });

      li.appendChild(btn);
      legend.appendChild(li);
    });
  }

  function renderBudgets(summary) {
    var host = document.getElementById('budget-meters-host');
    var sumText = document.getElementById('budget-summary-text');
    if (!host) return;

    var remaining = summary.totalBudget - summary.spending;
    if (sumText) {
      sumText.textContent = fmtWhole(summary.spending) + ' spent of ' + fmtWhole(summary.totalBudget) + ' plan (' +
        (remaining >= 0 ? fmtWhole(remaining) + ' remaining)' : fmtWhole(Math.abs(remaining)) + ' over plan)');
    }

    host.innerHTML = '';
    EXPENSE_CATEGORIES.forEach(function (cat) {
      var spent = summary.byCategory[cat] || 0;
      var limit = MONTHLY_BUDGETS[cat];
      var pct = Math.round((spent / limit) * 100);
      var barW = Math.min(100, pct);
      var toneClass = pct >= 100 ? ' ov-meter--over' : pct >= 80 ? ' ov-meter--warn' : '';

      var card = document.createElement('article');
      card.className = 'budget-row';

      var head = document.createElement('div');
      head.className = 'budget-row__head';
      var title = document.createElement('strong');
      title.textContent = cat;
      var nums = document.createElement('span');
      nums.className = 'budget-row__nums';
      nums.textContent = fmtWhole(spent) + ' of ' + fmtWhole(limit) + ' (' + pct + '%)';
      head.appendChild(title);
      head.appendChild(nums);

      var meter = document.createElement('div');
      meter.className = 'ov-meter' + toneClass;
      meter.setAttribute('role', 'progressbar');
      meter.setAttribute('aria-label', cat + ' budget usage');
      meter.setAttribute('aria-valuemin', '0');
      meter.setAttribute('aria-valuemax', '100');
      meter.setAttribute('aria-valuenow', String(pct));
      var fill = document.createElement('span');
      fill.style.width = barW + '%';
      meter.appendChild(fill);

      card.appendChild(head);
      card.appendChild(meter);
      host.appendChild(card);
    });
  }

  function renderTransactions(summary) {
    var tbody = document.getElementById('ledger-tbody');
    var tableWrap = document.getElementById('tx-table-wrap');
    var emptyEl = document.getElementById('tx-empty-state');
    var emptyMsg = document.getElementById('tx-empty-msg');
    var countChip = document.getElementById('tx-count-chip');
    if (!tbody || !tableWrap || !emptyEl) return;

    var q = state.txSearch.trim().toLowerCase();
    var rows = summary.month.transactions.slice().sort(function (a, b) {
      return b.date.localeCompare(a.date);
    }).filter(function (tx) {
      if (state.txCategory !== 'All' && tx.category !== state.txCategory) return false;
      if (q) {
        var hay = (tx.description + ' ' + tx.category + ' ' + tx.status + ' ' + fmtShortDate(tx.date)).toLowerCase();
        if (hay.indexOf(q) === -1) return false;
      }
      return true;
    });

    if (countChip) {
      countChip.textContent = rows.length + ' of ' + summary.month.transactions.length + ' entries';
    }

    tbody.innerHTML = '';

    if (rows.length === 0) {
      tableWrap.hidden = true;
      emptyEl.hidden = false;
      if (emptyMsg) {
        emptyMsg.textContent = q
          ? 'No ' + state.activePeriod + ' transactions match "' + state.txSearch.trim() + '".'
          : 'No ' + state.activePeriod + ' transactions in the ' + state.txCategory + ' category.';
      }
      return;
    }

    tableWrap.hidden = false;
    emptyEl.hidden = true;

    rows.forEach(function (tx) {
      var tr = document.createElement('tr');

      var tdDate = document.createElement('td');
      tdDate.textContent = fmtShortDate(tx.date);

      var tdDesc = document.createElement('td');
      tdDesc.textContent = tx.description;

      var tdCat = document.createElement('td');
      var catChip = document.createElement('span');
      catChip.className = 'ov-chip' + (tx.type === 'income' ? ' ov-chip--green' : '');
      catChip.textContent = tx.category;
      tdCat.appendChild(catChip);

      var tdAmt = document.createElement('td');
      tdAmt.className = 'num-col ' + (tx.type === 'income' ? 'amt-income' : 'amt-expense');
      tdAmt.textContent = (tx.type === 'income' ? '+' : '\u2212') + fmtExact(tx.amount);

      var tdStatus = document.createElement('td');
      var stChip = document.createElement('span');
      var stTone = tx.status === 'Pending' ? 'ov-chip--amber' : tx.status === 'Added' ? 'ov-chip--blue' : 'ov-chip--green';
      stChip.className = 'ov-chip ' + stTone;
      stChip.textContent = tx.status;
      tdStatus.appendChild(stChip);

      tr.appendChild(tdDate);
      tr.appendChild(tdDesc);
      tr.appendChild(tdCat);
      tr.appendChild(tdAmt);
      tr.appendChild(tdStatus);
      tbody.appendChild(tr);
    });
  }

  function renderGoals(summary) {
    var host = document.getElementById('goals-host');
    var chip = document.getElementById('goals-total-chip');
    if (!host) return;

    var totalPct = Math.round((summary.totalGoalsFunded / summary.totalGoalsTarget) * 100);
    if (chip) {
      chip.textContent = fmtWhole(summary.totalGoalsFunded) + ' of ' + fmtWhole(summary.totalGoalsTarget) + ' (' + totalPct + '%)';
    }

    host.innerHTML = '';
    summary.month.goals.forEach(function (g) {
      var pct = Math.min(100, Math.round((g.funded / g.target) * 100));
      var art = document.createElement('article');

      var img = document.createElement('img');
      img.src = g.motif;
      img.alt = '';
      img.width = 64;
      img.height = 64;
      img.loading = 'lazy';
      img.decoding = 'async';

      var h3 = document.createElement('h3');
      h3.textContent = g.name;

      var p = document.createElement('p');
      p.textContent = fmtWhole(g.funded) + ' of ' + fmtWhole(g.target) + ' (' + pct + '%)';

      var meter = document.createElement('div');
      meter.className = 'ov-meter';
      var fill = document.createElement('span');
      fill.style.width = pct + '%';
      meter.appendChild(fill);

      art.appendChild(img);
      art.appendChild(h3);
      art.appendChild(p);
      art.appendChild(meter);
      host.appendChild(art);
    });
  }

  function renderAccounts(summary) {
    var host = document.getElementById('accounts-host');
    var totalEl = document.getElementById('accounts-total-value');
    if (!host) return;

    host.innerHTML = '';
    summary.month.accounts.forEach(function (acc) {
      var row = document.createElement('div');
      row.className = 'account-row';

      var badge = document.createElement('span');
      badge.className = 'ov-icon-badge ov-icon-badge--sm';
      var img = document.createElement('img');
      img.src = acc.icon;
      img.alt = '';
      img.width = 16;
      img.height = 16;
      img.decoding = 'async';
      badge.appendChild(img);

      var meta = document.createElement('div');
      var name = document.createElement('span');
      name.className = 'account-row__name';
      name.textContent = acc.name;
      var sub = document.createElement('span');
      sub.className = 'account-row__sub';
      sub.textContent = acc.sub;
      meta.appendChild(name);
      meta.appendChild(sub);

      var bal = document.createElement('strong');
      bal.className = 'account-row__bal';
      bal.textContent = fmtWhole(acc.balance);

      row.appendChild(badge);
      row.appendChild(meta);
      row.appendChild(bal);
      host.appendChild(row);
    });

    if (totalEl) totalEl.textContent = fmtWhole(summary.totalBalance);
  }

  function renderBills(summary) {
    var host = document.getElementById('bills-host');
    if (!host) return;

    host.innerHTML = '';
    summary.month.bills.forEach(function (bill) {
      var art = document.createElement('article');
      art.className = 'bill-row';

      var badge = document.createElement('span');
      badge.className = 'ov-icon-badge ov-icon-badge--sm';
      var img = document.createElement('img');
      img.src = bill.icon;
      img.alt = '';
      img.width = 16;
      img.height = 16;
      img.decoding = 'async';
      badge.appendChild(img);

      var mid = document.createElement('div');
      var h3 = document.createElement('h3');
      h3.textContent = bill.name;
      var p = document.createElement('p');
      p.className = 'ov-muted';
      p.textContent = bill.date + ' · ' + bill.detail;
      mid.appendChild(h3);
      mid.appendChild(p);

      var amt = document.createElement('strong');
      amt.className = 'bill-row__amount';
      amt.textContent = fmtWhole(bill.amount);

      art.appendChild(badge);
      art.appendChild(mid);
      art.appendChild(amt);
      host.appendChild(art);
    });
  }

  function renderAdvisor(summary) {
    var host = document.getElementById('advisor-callouts');
    if (!host) return;

    var ranked = EXPENSE_CATEGORIES.map(function (cat) {
      return { cat: cat, pct: Math.round(((summary.byCategory[cat] || 0) / MONTHLY_BUDGETS[cat]) * 100) };
    }).sort(function (a, b) { return a.pct - b.pct; });

    var lowest = ranked[0];
    var highest = ranked[ranked.length - 1];

    host.innerHTML = '';

    var good = document.createElement('div');
    good.className = 'ov-callout ov-callout--confirmed';
    good.innerHTML = '<strong>On track:</strong> ' + lowest.cat + ' spending is at ' + lowest.pct + '% of plan, helping keep net cash flow at ' + fmtSignedWhole(summary.netCashFlow) + '.';

    var watch = document.createElement('div');
    watch.className = 'ov-callout ' + (highest.pct >= 100 ? 'ov-callout--warning' : 'ov-callout--watch');
    watch.innerHTML = '<strong>Watch item:</strong> ' + highest.cat + ' is currently at ' + highest.pct + '% of its ' + fmtWhole(MONTHLY_BUDGETS[highest.cat]) + ' monthly budget.';

    host.appendChild(good);
    host.appendChild(watch);
  }

  function syncCategoryChips() {
    document.querySelectorAll('#tx-category-chips .tx-filter-chip').forEach(function (btn) {
      var active = btn.getAttribute('data-cat') === state.txCategory;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  }

  function toggleCategoryFilter(cat) {
    state.txCategory = state.txCategory === cat ? 'All' : cat;
    syncCategoryChips();
    var summary = computeMonthSummary(state.activePeriod);
    renderSpendingDonut(summary);
    renderTransactions(summary);
  }

  function renderAll() {
    var summary = computeMonthSummary(state.activePeriod);
    renderKPIs(summary);
    renderCashFlowSVG();
    renderSpendingDonut(summary);
    renderBudgets(summary);
    renderTransactions(summary);
    renderGoals(summary);
    renderAccounts(summary);
    renderBills(summary);
    renderAdvisor(summary);
    syncCategoryChips();

    var statusEl = document.getElementById('period-status');
    if (statusEl) {
      statusEl.textContent = 'Showing ' + state.activePeriod + ' — ' + summary.month.transactions.length +
        ' ledger entries, ' + fmtSignedWhole(summary.netCashFlow) + ' net cash flow.';
    }
  }

  function init() {
    var periodSelect = document.getElementById('period-select');
    var txSearch = document.getElementById('tx-search');
    var resetTxBtn = document.getElementById('reset-tx-filters');
    var openEntryBtn = document.getElementById('open-entry');
    var entryForm = document.getElementById('entry-form');
    var entryDate = document.getElementById('entry-date');
    var entryCategory = document.getElementById('entry-category');
    var typeExpense = document.getElementById('entry-type-expense');
    var typeIncome = document.getElementById('entry-type-income');

    renderAll();

    if (periodSelect) {
      periodSelect.addEventListener('change', function () {
        state.activePeriod = periodSelect.value;
        state.txCategory = 'All';
        state.txSearch = '';
        if (txSearch) txSearch.value = '';
        renderAll();
        if (window.OrchardVale && typeof window.OrchardVale.toast === 'function') {
          window.OrchardVale.toast('Loaded ' + state.activePeriod + ' ledger.', 'info');
        }
      });
    }

    if (txSearch) {
      txSearch.addEventListener('input', function () {
        state.txSearch = txSearch.value;
        renderTransactions(computeMonthSummary(state.activePeriod));
      });
    }

    document.querySelectorAll('#tx-category-chips .tx-filter-chip').forEach(function (btn) {
      btn.addEventListener('click', function () {
        state.txCategory = btn.getAttribute('data-cat') || 'All';
        syncCategoryChips();
        var summary = computeMonthSummary(state.activePeriod);
        renderSpendingDonut(summary);
        renderTransactions(summary);
      });
    });

    if (resetTxBtn) {
      resetTxBtn.addEventListener('click', function () {
        state.txCategory = 'All';
        state.txSearch = '';
        if (txSearch) txSearch.value = '';
        syncCategoryChips();
        var summary = computeMonthSummary(state.activePeriod);
        renderSpendingDonut(summary);
        renderTransactions(summary);
      });
    }

    // Keep Transaction Type radio and Category select aligned
    if (typeIncome && typeExpense && entryCategory) {
      typeIncome.addEventListener('change', function () {
        if (typeIncome.checked) entryCategory.value = 'Income';
      });
      typeExpense.addEventListener('change', function () {
        if (typeExpense.checked && entryCategory.value === 'Income') {
          entryCategory.value = 'Food';
        }
      });
      entryCategory.addEventListener('change', function () {
        if (entryCategory.value === 'Income') {
          typeIncome.checked = true;
        } else {
          typeExpense.checked = true;
        }
      });
    }

    if (openEntryBtn) {
      openEntryBtn.addEventListener('click', function () {
        var activeMonth = MONTHS[state.activePeriod];
        if (entryDate && activeMonth) entryDate.value = activeMonth.defaultDate;
        if (window.OrchardVale && typeof window.OrchardVale.openDialog === 'function') {
          window.OrchardVale.openDialog('entry-dialog', openEntryBtn);
        }
        var desc = document.getElementById('entry-description');
        if (desc) desc.focus();
      });
    }

    if (entryForm) {
      entryForm.addEventListener('submit', function (event) {
        event.preventDefault();
        if (!entryForm.reportValidity()) return;

        var data = new FormData(entryForm);
        var type = data.get('type') === 'income' ? 'income' : 'expense';
        var description = String(data.get('description') || '').trim();
        var date = String(data.get('date') || MONTHS[state.activePeriod].defaultDate);
        var category = type === 'income' ? 'Income' : String(data.get('category') || 'Flexible');
        if (type === 'expense' && category === 'Income') category = 'Flexible';
        var amount = Math.abs(Number(data.get('amount')));
        if (!description || !isFinite(amount) || amount <= 0) return;

        var activeMonth = MONTHS[state.activePeriod];
        activeMonth.transactions.unshift({
          id: 'tx-' + Date.now(),
          date: date,
          description: description,
          category: category,
          type: type,
          amount: amount,
          status: 'Added'
        });

        // Update Everyday Checking balance in lockstep so Account Ledger & Total Balance stay 100% consistent
        var checking = activeMonth.accounts.find(function (a) { return a.id === 'checking'; });
        if (checking) {
          checking.balance = Math.round((checking.balance + (type === 'income' ? amount : -amount)) * 100) / 100;
        }

        renderAll();
        entryForm.reset();
        if (typeExpense) typeExpense.checked = true;
        if (window.OrchardVale && typeof window.OrchardVale.closeDialog === 'function') {
          window.OrchardVale.closeDialog('entry-dialog');
        }
        if (window.OrchardVale && typeof window.OrchardVale.toast === 'function') {
          var signed = (type === 'income' ? '+' : '\u2212') + fmtExact(amount);
          window.OrchardVale.toast('Recorded "' + description + '" (' + signed + ') in ' + state.activePeriod + '.', 'success');
        }
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
