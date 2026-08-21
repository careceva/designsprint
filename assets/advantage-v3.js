const accounts = {
  bob: {
    firstName: "Bob",
    fullName: "Bob Iversen",
    company: "Nordvik Byg A/S",
    initials: "BI",
    avatarClass: "avatar-blue",
    connected: true,
    greeting: "Good morning, Bob",
    greetingCopy: "Your purchasing performance is moving in the right direction.",
    bannerTitle: "Verified data",
    bannerCopy: "Figures below are based on 1.284 synced invoices.",
    announcement: "Three new agreements match your spend patterns.",
    metrics: [
      { label: "Realised savings", value: "118.018 kr.", caption: "Year to date", trend: "↑ 24% vs. last period", progress: 72, icon: "↗" },
      { label: "Customer bonus earned", value: "19.046 kr.", caption: "Year to date", trend: "↑ 19% vs. last period", progress: 58, icon: "◇" },
      { label: "Agreements in use", value: "5 of 24", caption: "19 still available", trend: "+2 since February", progress: 21, icon: "✓", neutral: true }
    ],
    categories: [
      { name: "Materials", full: "Building materials", value: 126900, label: "126.900 kr." },
      { name: "Tools", full: "Tools & workwear", value: 50500, label: "50.500 kr." },
      { name: "Freight", full: "Freight & delivery", value: 26300, label: "26.300 kr." },
      { name: "Fuel", full: "Fuel & transport", value: 14800, label: "14.800 kr." },
      { name: "IT", full: "Telecom & IT", value: 14500, label: "14.500 kr." },
      { name: "Office", full: "Office supplies", value: 14100, label: "14.100 kr." }
    ],
    opportunityTotal: "266.700 kr.",
    opportunityNote: "Estimated annual savings across 19 available agreements.",
    movePercent: "9%",
    moveTitle: "Activate Bygma Framework",
    moveCopy: "Same materials and delivery setup. The group rate could save 61.300 kr. a year."
  },
  fanny: {
    firstName: "Fanny",
    fullName: "Fanny Kristensen",
    company: "Kristensen Elektro ApS",
    initials: "FK",
    avatarClass: "avatar-warm",
    connected: false,
    greeting: "Hello, Fanny",
    greetingCopy: "A useful benchmark today. Exact opportunities when you connect your data.",
    bannerTitle: "Benchmark preview",
    bannerCopy: "Based on 148 electrical contractors of a similar size.",
    announcement: "These figures are industry benchmarks — connect your data to personalise them.",
    metrics: [
      { label: "Typical yearly savings", value: "320K–433K", caption: "Companies like yours", trend: "Up to 35% potential", progress: 82, icon: "↗" },
      { label: "Typical customer bonus", value: "52K–70K", caption: "Per year", trend: "Based on active agreements", progress: 64, icon: "◇" },
      { label: "Agreements peers use", value: "5 of 24", caption: "Median peer adoption", trend: "148-company benchmark", progress: 21, icon: "◎", neutral: true }
    ],
    categories: [
      { name: "Materials", full: "Building materials", value: 191907, label: "up to 191.907 kr." },
      { name: "Tools", full: "Tools & workwear", value: 73128, label: "up to 73.128 kr." },
      { name: "Office", full: "Office supplies", value: 38950, label: "up to 38.950 kr." },
      { name: "Fuel", full: "Fuel & transport", value: 42456, label: "up to 42.456 kr." },
      { name: "Rental", full: "Machine rental", value: 30000, label: "up to 30.000 kr." },
      { name: "Freight", full: "Freight & delivery", value: 26304, label: "up to 26.304 kr." }
    ],
    opportunityTotal: "320K–433K kr.",
    opportunityNote: "Benchmark range until your invoices are connected.",
    movePercent: "19%",
    moveTitle: "Start with office supplies",
    moveCopy: "The widest discount gap in your peer group and a low-effort first agreement."
  }
};

const agreements = [
  { name: "Bygma Framework", initials: "BF", category: "Building materials", coverage: "680.000 kr. spend covered", discount: "−9%", saving: "61.300 kr.", benchmark: "up to 61.300 kr.", effort: "Same supplier and delivery setup" },
  { name: "Ahlsell Nordic", initials: "AN", category: "Building materials", coverage: "427.300 kr. spend covered", discount: "−9%", saving: "39.800 kr.", benchmark: "up to 39.800 kr.", effort: "One switch covers two categories" },
  { name: "Würth Nordic", initials: "WN", category: "Tools & workwear", coverage: "223.800 kr. spend covered", discount: "−11%", saving: "24.600 kr.", benchmark: "up to 31.200 kr.", effort: "Free delivery on frequent orders" },
  { name: "Lyreco Erhverv", initials: "LE", category: "Office supplies", coverage: "73.000 kr. spend covered", discount: "−19%", saving: "14.100 kr.", benchmark: "up to 24.800 kr.", effort: "Same catalogue, better rate" },
  { name: "DSV Road", initials: "DR", category: "Freight & delivery", coverage: "191.000 kr. spend covered", discount: "−8%", saving: "15.300 kr.", benchmark: "up to 15.300 kr.", effort: "No operational change" },
  { name: "Telenor Erhverv", initials: "TE", category: "Telecom & IT", coverage: "266.500 kr. spend covered", discount: "−5%", saving: "13.300 kr.", benchmark: "up to 13.300 kr.", effort: "Existing numbers can transfer" }
];

const genericViews = {
  suppliers: {
    title: "Suppliers",
    subtitle: "A clearer view of the businesses you buy from.",
    content: () => `
      <div class="generic-grid">
        <article class="generic-card"><span class="card-eyebrow">Supplier base</span><h3>42 active suppliers</h3><p>Your top five suppliers represent 62% of total purchasing volume.</p><div class="generic-stat"><span><b>5.4M</b><small>tracked annual spend</small></span><span><b>8</b><small>rate gaps found</small></span></div></article>
        <article class="generic-card"><span class="card-eyebrow">Concentration</span><h3>Healthy, with room to consolidate</h3><p>Four categories have overlapping suppliers that could be bundled under stronger terms.</p><div class="generic-stat"><span><b>4</b><small>consolidation plays</small></span><span><b>91K</b><small>potential impact</small></span></div></article>
        <article class="generic-card wide"><span class="card-eyebrow">Largest suppliers</span><ul class="simple-list"><li><span>Stark Byggecenter</span><span>1.18M kr.</span></li><li><span>Bygma</span><span>680K kr.</span></li><li><span>Ahlsell Nordic</span><span>427K kr.</span></li><li><span>Hilti Erhverv</span><span>284K kr.</span></li></ul></article>
      </div>`
  },
  reports: {
    title: "Reports",
    subtitle: "Board-ready spend reporting without spreadsheet work.",
    content: () => `
      <div class="generic-grid">
        <article class="generic-card wide"><span class="card-eyebrow">Ready to share</span><h3>August spend overview</h3><p>Includes realised savings, agreement adoption and the five largest remaining opportunities.</p><div class="generic-stat"><span><b>21 Aug</b><small>last updated</small></span><span><b>12 pages</b><small>PDF summary</small></span><span><b>Verified</b><small>invoice-backed data</small></span></div></article>
        <article class="generic-card"><span class="card-eyebrow">Scheduled</span><h3>Monthly leadership brief</h3><p>Generated on the first weekday of each month.</p></article>
        <article class="generic-card"><span class="card-eyebrow">History</span><h3>7 previous reports</h3><p>Compare purchasing performance and agreement adoption over time.</p></article>
      </div>`
  },
  categories: {
    title: "Categories",
    subtitle: "See where spend, savings and agreement coverage intersect.",
    content: () => `
      <div class="generic-grid">
        <article class="generic-card wide"><span class="card-eyebrow">Category opportunity</span><h3>Building materials is the clearest priority</h3><p>It represents both your largest spend pool and your largest rate gap.</p><ul class="simple-list"><li><span>Building materials</span><span>126.9K potential</span></li><li><span>Tools & workwear</span><span>50.5K potential</span></li><li><span>Freight & delivery</span><span>26.3K potential</span></li><li><span>Fuel & transport</span><span>14.8K potential</span></li></ul></article>
        <article class="generic-card"><span class="card-eyebrow">Coverage</span><h3>38% on agreement</h3><p>Moving the next two categories would lift coverage above 60%.</p></article>
        <article class="generic-card"><span class="card-eyebrow">Momentum</span><h3>+7 points</h3><p>Agreement coverage has improved since February.</p></article>
      </div>`
  },
  agreements: {
    title: "Agreements",
    subtitle: "Ready-to-activate rates ranked by impact.",
    content: () => `<article class="generic-card wide"><span class="card-eyebrow">Available agreements</span><div class="agreement-list">${agreements.map(agreementRow).join("")}</div></article>`
  }
};

let currentAccount = "bob";
let currentView = "overview";
let activeDrawer = null;
let toastTimer;

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

function formatDate() {
  return new Intl.DateTimeFormat("en-GB", { weekday: "long", day: "numeric", month: "long" }).format(new Date());
}

function metricCard(metric) {
  return `<article class="metric-card">
    <div class="metric-top"><span>${metric.label}</span><span class="metric-icon">${metric.icon}</span></div>
    <strong class="metric-value">${metric.value}</strong>
    <span class="metric-caption">${metric.caption}</span>
    <span class="metric-trend ${metric.neutral ? "neutral" : ""}">${metric.trend}</span>
    <span class="metric-progress" style="--progress:${metric.progress}%"><i></i></span>
  </article>`;
}

function agreementRow(agreement) {
  const account = accounts[currentAccount];
  const value = account.connected ? agreement.saving : agreement.benchmark;
  return `<button class="agreement-row" type="button" data-agreement="${agreement.name}">
    <span class="supplier-cell"><span class="supplier-avatar">${agreement.initials}<i class="discount-badge">${agreement.discount}</i></span><span><b>${agreement.name}</b><small>${agreement.effort}</small></span></span>
    <span class="agreement-category"><span>${agreement.category}</span><small>${account.connected ? agreement.coverage : "Popular with similar companies"}</small></span>
    <span class="agreement-saving"><b>${value}</b><small>${account.connected ? "yearly saving" : "peer benchmark"}</small></span>
    <span class="row-arrow">→</span>
  </button>`;
}

function renderAccount(accountKey) {
  currentAccount = accountKey;
  const account = accounts[accountKey];
  const dashboard = $("#dashboard");
  dashboard.dataset.account = accountKey;

  $("#top-avatar").textContent = account.initials;
  $("#top-avatar").className = `avatar ${account.avatarClass}`;
  $("#top-account-name").textContent = account.fullName;
  $("#top-company").textContent = account.company;
  $("#greeting").textContent = account.greeting;
  $("#greeting-copy").textContent = account.greetingCopy;
  $("#date-label").textContent = formatDate();
  $("#announcement-copy").textContent = account.announcement;
  $("#summary-subtitle").textContent = account.connected ? "Year to date · updated 06:14" : "Peer benchmark · 148 similar companies";
  $("#metric-grid").innerHTML = account.metrics.map(metricCard).join("");
  $("#opportunity-total").textContent = account.opportunityTotal;
  $("#opportunity-note").textContent = account.opportunityNote;
  $("#move-percent").textContent = account.movePercent;
  $("#move-title").textContent = account.moveTitle;
  $("#move-copy").textContent = account.moveCopy;
  $("#agreement-list").innerHTML = agreements.slice(0, 4).map(agreementRow).join("");

  const banner = $("#context-banner");
  banner.classList.toggle("benchmark", !account.connected);
  banner.innerHTML = `<div><span class="banner-icon">${account.connected ? "✓" : "≈"}</span><span><b>${account.bannerTitle}</b><small>${account.bannerCopy}</small></span></div><button type="button" class="text-button" data-action="open-data">${account.connected ? "See data sources" : "See benchmark method"}</button>`;

  const pill = $("#data-pill");
  pill.innerHTML = account.connected
    ? `<span class="status-dot"></span><span><b>Data connected</b><small>Visma.net</small></span>`
    : `<span class="status-dot status-dot-warm"></span><span><b>Connect your data</b><small>Make figures exact</small></span>`;
  $("#primary-action").innerHTML = account.connected ? `<span>↻</span> Refresh data` : `<span>＋</span> Connect data`;
  $("#bar-chart").innerHTML = chartBars(account.categories);
  $("#chart-table").innerHTML = chartRows(account.categories);
  renderRail(account);
  bindDynamicActions();
}

function chartBars(categories) {
  const max = Math.max(...categories.map(item => item.value));
  return categories.map(item => `<div class="bar-item"><button class="bar" type="button" style="--height:${Math.max(8, item.value / max * 92)}%" data-value="${item.label}" aria-label="${item.full}: ${item.label}"></button><span class="bar-label" title="${item.full}">${item.name}</span></div>`).join("");
}

function chartRows(categories) {
  const max = Math.max(...categories.map(item => item.value));
  return categories.map(item => `<div class="chart-row"><span>${item.full}</span><span class="mini-track" style="--width:${item.value / max * 100}%"><i></i></span><strong>${item.label}</strong></div>`).join("");
}

function renderRail(account) {
  const actionList = $("#action-list");
  const activityList = $("#activity-list");
  if (account.connected) {
    actionList.innerHTML = `<button type="button" class="action-card featured" data-agreement="Bygma Framework"><span class="action-meta"><i class="priority-dot"></i> Highest impact</span><strong>Review the Bygma business case</strong><span>61.300 kr. potential yearly saving</span><i class="action-arrow">→</i></button><button type="button" class="action-card" data-action="open-data"><span class="action-meta">Data quality</span><strong>2 suppliers need matching</strong><span>Resolve in less than 3 minutes</span><i class="action-arrow">→</i></button><button type="button" class="action-card" data-view-trigger="reports"><span class="action-meta">Ready to share</span><strong>August spend report</strong><span>Updated with this week’s invoices</span><i class="action-arrow">→</i></button>`;
    activityList.innerHTML = `<li><span class="activity-icon positive">↗</span><p><b>Price protection found</b><small>Stark Byggecenter · 2h</small></p><strong>+18.4K</strong></li><li><span class="activity-icon">✓</span><p><b>Visma sync complete</b><small>1.284 invoices · 6h</small></p></li><li><span class="activity-icon warm">!</span><p><b>New fuel terms</b><small>Circle K · Yesterday</small></p></li>`;
  } else {
    actionList.innerHTML = `<button type="button" class="action-card featured" data-action="open-data"><span class="action-meta"><i class="priority-dot"></i> Best next step</span><strong>Connect your accounting data</strong><span>Replace benchmarks with exact savings</span><i class="action-arrow">→</i></button><button type="button" class="action-card" data-agreement="Lyreco Erhverv"><span class="action-meta">Easy first win</span><strong>Explore office supply terms</strong><span>19% benchmark rate gap</span><i class="action-arrow">→</i></button><button type="button" class="action-card" data-action="toggle-assistant"><span class="action-meta">Guided setup</span><strong>Plan your first 30 days</strong><span>Ask the saving assistant</span><i class="action-arrow">→</i></button>`;
    activityList.innerHTML = `<li><span class="activity-icon positive">✓</span><p><b>Account created</b><small>Kristensen Elektro · today</small></p></li><li><span class="activity-icon">≈</span><p><b>Peer group matched</b><small>148 companies · today</small></p></li><li><span class="activity-icon warm">!</span><p><b>Data not connected</b><small>Unlock exact figures</small></p></li>`;
  }
}

function startDashboard(accountKey) {
  $("#login").hidden = true;
  $("#dashboard").hidden = false;
  renderAccount(accountKey);
  setView("overview");
  window.scrollTo(0, 0);
}

function restart() {
  closeDrawers();
  closeModal();
  $("#account-popover").hidden = true;
  $("#account-button").setAttribute("aria-expanded", "false");
  $("#dashboard").hidden = true;
  $("#login").hidden = false;
  document.body.classList.remove("nav-collapsed", "nav-open");
  window.scrollTo(0, 0);
}

function setView(view) {
  currentView = view;
  $$(".nav-item").forEach(item => item.classList.toggle("active", item.dataset.view === view));
  if (view === "overview") {
    $("#overview-view").hidden = false;
    $("#generic-view").hidden = true;
  } else {
    const config = genericViews[view];
    if (!config) return;
    $("#overview-view").hidden = true;
    $("#generic-view").hidden = false;
    $("#generic-title").textContent = config.title;
    $("#generic-subtitle").textContent = config.subtitle;
    $("#generic-content").innerHTML = config.content();
    bindDynamicActions();
  }
  $("#sidebar").classList.remove("open");
  if (!activeDrawer && $("#modal").hidden) hideOverlay();
  $("#main-content").focus({ preventScroll: true });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function toggleAccountPopover() {
  const popover = $("#account-popover");
  const open = popover.hidden;
  popover.hidden = !open;
  $("#account-button").setAttribute("aria-expanded", String(open));
}

function showOverlay() {
  const overlay = $("#overlay");
  overlay.hidden = false;
  requestAnimationFrame(() => overlay.classList.add("visible"));
}

function hideOverlay() {
  const overlay = $("#overlay");
  overlay.classList.remove("visible");
  setTimeout(() => { if (!activeDrawer && $("#modal").hidden) overlay.hidden = true; }, 220);
}

function openDrawer(name) {
  closeDrawers(false);
  activeDrawer = name;
  const drawer = name === "assistant" ? $("#assistant-drawer") : $("#notification-drawer");
  drawer.classList.add("open");
  drawer.setAttribute("aria-hidden", "false");
  showOverlay();
  setTimeout(() => $("button, input", drawer)?.focus(), 80);
}

function closeDrawers(hide = true) {
  $$(".drawer").forEach(drawer => { drawer.classList.remove("open"); drawer.setAttribute("aria-hidden", "true"); });
  activeDrawer = null;
  if (hide) hideOverlay();
}

function openModal(type, payload) {
  const modal = $("#modal");
  const content = $("#modal-content");
  if (type === "agreement") {
    const agreement = agreements.find(item => item.name === payload) || { name: payload, category: "Preferred agreement", discount: "−8%", saving: "42.500 kr.", benchmark: "up to 42.500 kr.", coverage: "Relevant spend matched", effort: "No operational changes required" };
    const value = accounts[currentAccount].connected ? agreement.saving : agreement.benchmark;
    content.innerHTML = `<span class="modal-icon">↗</span><span class="card-eyebrow" style="margin-top:18px">Business case</span><h2 id="modal-title">${agreement.name}</h2><p>${agreement.effort}. We found this match by comparing your purchasing pattern with the agreement’s scope and terms.</p><div class="modal-stats"><div class="modal-stat"><span>Rate improvement</span><b>${agreement.discount}</b></div><div class="modal-stat"><span>Yearly impact</span><b>${value}</b></div><div class="modal-stat"><span>Activation</span><b>~5 min</b></div></div><ul class="modal-points"><li>${agreement.coverage || "Relevant purchasing volume is covered by this rate."}</li><li>The supplier relationship and normal ordering flow stay the same.</li><li>You review every term before anything is activated.</li></ul><div class="modal-actions"><button class="ghost-button" type="button" data-action="close-modal">Not now</button><button class="primary-button" type="button" data-action="activate-agreement">Start activation <span>→</span></button></div>`;
  } else if (type === "data") {
    const connected = accounts[currentAccount].connected;
    content.innerHTML = connected
      ? `<span class="modal-icon">✓</span><span class="card-eyebrow" style="margin-top:18px">Data confidence</span><h2 id="modal-title">Your numbers are invoice-backed</h2><p>Advantage has read 1.284 invoices from Visma.net in read-only mode. It uses line items and existing agreements to calculate each opportunity.</p><div class="source-list"><button type="button"><span class="source-logo">V</span><span><b>Visma.net</b><small>Connected · last synced today at 06:14</small></span><span>✓</span></button><button type="button"><span class="source-logo" style="background:#168f79">A</span><span><b>Agreement library</b><small>24 negotiated group agreements</small></span><span>✓</span></button></div><div class="modal-actions"><button class="primary-button" type="button" data-action="close-modal">Got it</button></div>`
      : `<span class="modal-icon">＋</span><span class="card-eyebrow" style="margin-top:18px">Connect your data</span><h2 id="modal-title">Make every opportunity exact</h2><p>Choose your accounting system. The prototype will simulate a secure, read-only connection without sending any data.</p><div class="source-list"><button type="button" data-source="Visma.net"><span class="source-logo">V</span><span><b>Visma.net</b><small>Accounting and invoice data</small></span><span>→</span></button><button type="button" data-source="e-conomic"><span class="source-logo" style="background:#ef815f">e</span><span><b>e-conomic</b><small>Purchases and supplier records</small></span><span>→</span></button><button type="button" data-source="Business Central"><span class="source-logo" style="background:#168f79">BC</span><span><b>Business Central</b><small>ERP and purchasing data</small></span><span>→</span></button></div><small style="display:block;color:#9297a7;font-size:8px;line-height:1.5">Connections are read-only. This demo does not transmit or store credentials.</small>`;
  } else {
    content.innerHTML = `<span class="modal-icon">✦</span><span class="card-eyebrow" style="margin-top:18px">About this prototype</span><h2 id="modal-title">Two stages of the same product</h2><p>Bob’s company has connected invoice data, so every saving is exact. Fanny’s company is new, so Advantage starts with transparent peer benchmarks and a clear path to better data.</p><ul class="modal-points"><li>Explore a full spend dashboard with live-feeling interactions.</li><li>Compare a connected customer with a first-day customer.</li><li>Open agreements, switch sections and ask the saving assistant.</li></ul><div class="modal-actions"><button class="primary-button" type="button" data-action="close-modal">Explore the prototype</button></div>`;
  }
  modal.hidden = false;
  showOverlay();
  setTimeout(() => $(".modal-close", modal).focus(), 50);
  bindDynamicActions();
}

function closeModal() {
  $("#modal").hidden = true;
  if (!activeDrawer) hideOverlay();
}

function showToast(message) {
  clearTimeout(toastTimer);
  $("#toast-copy").textContent = message;
  $("#toast").hidden = false;
  toastTimer = setTimeout(() => { $("#toast").hidden = true; }, 2800);
}

function submitAssistant(prompt) {
  if (!prompt.trim()) return;
  const response = $("#assistant-response");
  const account = accounts[currentAccount];
  response.innerHTML = account.connected
    ? `<b>Start with Bygma Framework.</b> It has the strongest blend of impact and ease: about 61.300 kr. a year, while keeping your supplier and delivery flow unchanged.`
    : `<b>Connect your accounting data first.</b> That will replace the peer ranges with exact opportunities. Until then, office supplies is the easiest benchmark-led first move at a potential 19% better rate.`;
  response.hidden = false;
  $("#assistant-input").value = "";
}

function handleAction(action, source) {
  switch (action) {
    case "toggle-account": toggleAccountPopover(); break;
    case "restart": restart(); break;
    case "overview": setView("overview"); break;
    case "toggle-notifications": openDrawer("notifications"); break;
    case "toggle-assistant": openDrawer("assistant"); break;
    case "close-drawers": closeDrawers(); break;
    case "close-modal": closeModal(); break;
    case "open-data": openModal("data"); break;
    case "toggle-nav": {
      const nav = $("#sidebar");
      const opening = !nav.classList.contains("open");
      nav.classList.toggle("open", opening);
      opening ? showOverlay() : hideOverlay();
      break;
    }
    case "collapse-nav": document.body.classList.toggle("nav-collapsed"); break;
    case "dismiss-announcement": $("#announcement").hidden = true; break;
    case "scroll-opportunities": $("#opportunities").scrollIntoView({ behavior: "smooth", block: "start" }); break;
    case "toggle-chart": {
      const table = $("#chart-table");
      const chart = $("#chart-wrap");
      const showTable = table.hidden;
      table.hidden = !showTable;
      chart.hidden = showTable;
      source.textContent = showTable ? "View as chart" : "View as table";
      break;
    }
    case "mark-read":
      $$(".notification-list i").forEach(dot => dot.remove());
      $(".notification-count").textContent = "0";
      showToast("All notifications marked as read");
      break;
    case "activate-agreement": closeModal(); showToast("Activation flow started — demo only"); break;
    case "toast": showToast("Your export is being prepared"); break;
  }
}

function bindDynamicActions() {
  $$('[data-action]').forEach(button => {
    if (button.dataset.actionBound) return;
    button.dataset.actionBound = "true";
    button.addEventListener("click", event => {
      if (button.tagName === "A") event.preventDefault();
      handleAction(button.dataset.action, button);
    });
  });
  $$('[data-agreement]').forEach(button => {
    if (button.dataset.bound) return;
    button.dataset.bound = "true";
    button.addEventListener("click", () => openModal("agreement", button.dataset.agreement));
  });
  $$('[data-view-trigger]').forEach(button => {
    if (button.dataset.bound) return;
    button.dataset.bound = "true";
    button.addEventListener("click", () => setView(button.dataset.viewTrigger));
  });
  $$('[data-source]').forEach(button => {
    if (button.dataset.bound) return;
    button.dataset.bound = "true";
    button.addEventListener("click", () => { closeModal(); showToast(`${button.dataset.source} connection simulated`); });
  });
}

$$('[data-account]').forEach(button => button.addEventListener("click", () => startDashboard(button.dataset.account)));
$$('[data-switch-account]').forEach(button => button.addEventListener("click", () => { renderAccount(button.dataset.switchAccount); setView("overview"); $("#account-popover").hidden = true; $("#account-button").setAttribute("aria-expanded", "false"); showToast(`Switched to ${accounts[button.dataset.switchAccount].fullName}`); }));
$$('[data-view]').forEach(button => button.addEventListener("click", () => setView(button.dataset.view)));
$$('[data-open="about"]').forEach(button => button.addEventListener("click", () => openModal("about")));
$$('[data-prompt]').forEach(button => button.addEventListener("click", () => submitAssistant(button.dataset.prompt)));
$$('[data-period]').forEach(button => button.addEventListener("click", () => { $$("[data-period]").forEach(item => item.classList.remove("active")); button.classList.add("active"); showToast(button.dataset.period === "ytd" ? "Showing year-to-date performance" : "Showing the last 12 months"); }));

$("#assistant-form").addEventListener("submit", event => { event.preventDefault(); submitAssistant($("#assistant-input").value); });
$("#overlay").addEventListener("click", () => { $("#sidebar").classList.remove("open"); closeDrawers(); closeModal(); });

$("#global-search").addEventListener("input", event => {
  const query = event.target.value.trim().toLowerCase();
  if (!query) return;
  const match = agreements.find(item => `${item.name} ${item.category}`.toLowerCase().includes(query));
  if (match && query.length > 2) showToast(`Found ${match.name} — press Enter to open`);
});
$("#global-search").addEventListener("keydown", event => {
  if (event.key !== "Enter") return;
  const query = event.currentTarget.value.trim().toLowerCase();
  const match = agreements.find(item => `${item.name} ${item.category}`.toLowerCase().includes(query));
  if (match) openModal("agreement", match.name);
});

document.addEventListener("keydown", event => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    $("#global-search").focus();
  }
  if (event.key === "Escape") {
    closeDrawers();
    closeModal();
    $("#account-popover").hidden = true;
    $("#account-button").setAttribute("aria-expanded", "false");
  }
});

document.addEventListener("click", event => {
  if (!event.target.closest(".account-menu-wrap")) {
    $("#account-popover").hidden = true;
    $("#account-button").setAttribute("aria-expanded", "false");
  }
});

bindDynamicActions();
