/* CFO overview · v1 — ten directions for the purchasing-areas ledger on the Overview.
   Kari Solheim's account: three invoices and one spend export, so three areas run
   through an agreement, two are read whole from the export, and three are the
   industry median until she types a figure or drops a document.

   The rules the ledger keeps from the main prototype:
   - green is money that came off an invoice; blue came off a document; dotted is an estimate
   - a typed figure is her own: it prints as a band, never as a verified figure
   - every total on the page is the sum of rows on the page
   - no share of an area is shown anywhere */

/* ---------- versions ---------- */
const VERSIONS = [
  {k:1,  n:'Two acts',            t:'The spend page’s two tables, under the hero. The moves keep the way in, not the money.',
         layout:['hero', 'acts', 'bento:links', 'agrs']},
  {k:2,  n:'One ledger',          t:'All eight areas in one table, biggest first. The moves card becomes the roll-up.',
         layout:['hero', 'one', 'bento:rollup', 'agrs']},
  {k:3,  n:'Facts and moves',     t:'The table keeps the facts, the moves keep the money. Nothing twice.',
         layout:['hero', 'facts', 'bento:money', 'agrs']},
  {k:4,  n:'Agreements first',    t:'What is on and what to do first, then one table in two bands.',
         layout:['hero', 'bento:arc', 'grouped', 'agrs']},
  {k:5,  n:'Ledger in the bento', t:'A compact ledger beside the active agreements. No third card.',
         layout:['hero', 'bento:compact', 'agrs']},
  {k:6,  n:'Ledger and documents', t:'One table; the moves card becomes your documents, where the gaps get closed.',
         layout:['hero', 'one-lead', 'bento:docs', 'agrs']},
  {k:7,  n:'Review queue',        t:'The moves card becomes the list of areas to review; the table follows.',
         layout:['hero', 'bento:queue', 'one', 'agrs']},
  {k:8,  n:'Inside the hero',     t:'The ledger lives in the hero’s tray as facts; one area at a time is reviewed in a card.',
         layout:['hero', 'bento:next', 'agrs'], tray:true},
  {k:9,  n:'Sorted by status',    t:'One table with a sort. Live rows carry their trend.',
         layout:['hero', 'one-sort', 'bento:links', 'agrs']},
  {k:10, n:'One line',            t:'One line under the hero; the table opens on demand. The Overview keeps its length.',
         layout:['hero', 'bar', 'bento:links', 'agrs']},
  {k:11, n:'Ledger in the hero',  t:'V4’s two-band table inside the hero’s tray, agreements as links. Since your last visit and your documents beneath.',
         layout:['hero', 'bento:since-docs', 'agrs'], tray:'grouped', agLinks:true, agDetails:true},
  {k:12, n:'Stripe bento grid',   t:'V11’s ledger as its own section under the hero. Since your last visit and your documents as a grid of tiles.',
         layout:['hero', 'grouped-plain', 'stripe', 'agrs'], agLinks:true},
  {k:13, n:'One bento grid',      t:'V12 with the ledger in the grid too: its first tile, full width, with its own head. No section heads.',
         layout:['hero', 'stripe:ledger', 'agrs'], agLinks:true},
];
const V = VERSIONS.find(v => v.k === (window.CFO_V || 1)) || VERSIONS[0];

/* ---------- Kari's areas, as the spend page reads them ---------- */
const AREAS = [
  /* an area through several agreements: the rows under it sum to the area (312.000 / 28.100); one is active but nothing has gone through it yet */
  {id:'mat',  n:'Building materials',          on:{sup:'Ahlsell Nordic',  agrs:[
      {n:'Ahlsell Nordic', logo:'Ahlsell', thru:198000, saved:17800},
      {n:'Bygma',          logo:'Bygma',   thru:114000, saved:10300},
      {n:'Buildor',        logo:'Buildor', thru:0,      saved:0}], thru:312000, saved:28100}, rate:9,  openN:4, trend:{t:'Up 12% since Jul', c:'pos'}},
  {id:'fuel', n:'Fuel & transport',            on:{sup:'Preem Business',  agrs:[{n:'Preem Business', logo:'Preem',  thru:186000, saved:14900}], thru:186000, saved:14900}, rate:8,  openN:2, trend:{t:'Steady', c:''}},
  {id:'off',  n:'Office supplies',             on:{sup:'Lyreco Erhverv',  agrs:[{n:'Lyreco Erhverv', logo:'Lyreco', thru:74000,  saved:14100}], thru:74000,  saved:14100}, rate:19, openN:1, trend:{t:'Steady', c:''}},
  {id:'tool', n:'Tools & workwear',            amt:296000, exact:true,  rate:11, openN:4, sup:'Hilti'},
  {id:'tel',  n:'Telecom & IT',                amt:210000, exact:true,  rate:5,  openN:2, sup:'Hallon'},
  {id:'rent', n:'Machine & equipment rental',  amt:290000, exact:false, rate:6,  openN:3, sup:'Avis'},
  {id:'frg',  n:'Freight & delivery',          amt:215000, exact:false, rate:8,  openN:3, sup:'DSV'},
  {id:'site', n:'Site services & waste',       amt:105000, exact:false, rate:4,  openN:2, sup:'Fortum Recycling'},
];
const DOC_NAME = 'the Q2 2026 spend export';
const KARI_DOCS = [
  {n:'Ahlsell Nordic invoice', m:'14 Aug 2026 · Building materials'},
  {n:'Lyreco Erhverv invoice', m:'22 Aug 2026 · Office supplies'},
  {n:'Preem Business invoice', m:'31 Aug 2026 · Fuel & transport'},
  {n:'Q2 2026 spend export',   m:'20 lines · Tools & workwear, Telecom & IT'},
];
const CAT_ART = {mat:'building-materials', tool:'tools-workwear', fuel:'fuel-transport', off:'office-supplies',
  rent:'machine-equipment', frg:'freight-delivery', tel:'telecom-it', site:'site-services'};
const catArt = (id, sm) => `<img class="cat-art" src="../../../assets/advantage-3d-icons-two-colour/${sm ? 'svg-small' : 'svg'}/advantage-icon-${CAT_ART[id]}-ultramarine${sm ? '-small' : ''}.svg" alt="" draggable="false">`;

/* ---------- figures ---------- */
const EST = .15, TUNE = .07;
const fmt = n => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
const kfmt = n => n >= 1e6 ? ((n / 1e6).toFixed(1).replace('.0', '').replace('.', ',') + 'M') : (Math.round(n / 1e3) + 'K');
const band = (lo, hi) => `${kfmt(lo)}–${kfmt(hi)}`;
const estRange = v => band(v * (1 - EST), v * (1 + EST));
const tuneRange = v => band(v * (1 - TUNE), v * (1 + TUNE));
const NONE = '<span class="none">—</span>';
const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;'}[c]));
/* a sum with two kinds in it prints as both, each in its own ink, never blended */
const mixed = (exact, lo, hi, has, plus, cls) => [
  exact ? `<span class="${cls}">${plus ? '+' : ''}${fmt(exact)}</span>` : '',
  has ? `<span class="fig-est">${plus ? '+' : ''}${band(lo, hi)}</span>` : ''
].filter(Boolean).join(' <span class="sp-sep">·</span> ') || NONE;

/* ---------- icons, from the main prototype ---------- */
const TICK = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const CHEV = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 9.5l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const CHEV_R = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const ARROW = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const DOC_I = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M8.5 12.5l6.2-6.2a3.2 3.2 0 014.5 4.5l-7.4 7.4a5 5 0 01-7.1-7.1L11.6 4.2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const UP_I = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 16V5M7 10l5-5 5 5" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/><path d="M5 19h14" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/></svg>';
const KEY_HTML = `<span class="fig-key" aria-label="How to read the figures"><span class="k-actual">${TICK}Saved</span><span class="k-doc">${DOC_I}From your documents</span><span class="k-est"><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8" stroke-dasharray="3 3"/></svg>Estimated</span></span>`;

/* ---------- what she has done to the rows ---------- */
const KEY = 'cfo-overview-v1';
let ST = null;
function store(){
  if(!ST){ try{ ST = JSON.parse(localStorage.getItem(KEY) || 'null'); }catch(e){ ST = null; }
    if(!ST || typeof ST !== 'object') ST = {}; ST.review = ST.review || {}; ST.reqs = ST.reqs || []; ST.docs = ST.docs || []; }
  return ST;
}
const save = () => { try{ localStorage.setItem(KEY, JSON.stringify(store())); }catch(e){} };
const rev = id => store().review[id] || {};
const req = id => store().reqs.find(q => q.id === id) || null;
const TYPED = {};                 /* {id: kr. a year} typed and not yet saved */
let OPEN = null;                  /* the open row, kept across a re-render */
let FOCUS = null;                 /* V8: the area in the review card */
let SORT = sessionStorage.getItem(KEY + ':sort') || 'spend';
let BAR_OPEN = sessionStorage.getItem(KEY + ':bar') === '1';
/* the Overview shows the four biggest; the rest is one click away (in main: the spend page) */
const LIMIT = 4;
let SHOW_ALL = sessionStorage.getItem(KEY + ':all:' + V.k) === '1';
const setAll = v => { SHOW_ALL = v; sessionStorage.setItem(KEY + ':all:' + V.k, v ? '1' : '0'); };

/* ---------- the rows ---------- */
function statusOf(a, amt, r){
  if(r.skip) return 'skip';
  if(req(a.id)) return 'sent';
  if(TYPED[a.id] != null && TYPED[a.id] !== amt) return 'dirty';
  if(r.tuned != null || r.sup || (r.docs || []).length) return 'saved';
  return 'none';
}
/* the agreement an active area runs through: one is a link, several fold under a drop-down */
function agSubHTML(list){
  if(list.length === 1) return `<button type="button" class="linkbtn ag-link" data-agr="${esc(list[0].n)}">${esc(list[0].n)}</button>`;
  return `<details class="ag-dd"><summary>${list.length} agreements${CHEV}</summary><ul>${
    list.map(g => `<li><button type="button" class="linkbtn ag-link" data-agr="${esc(g.n)}">${esc(g.n)}</button></li>`).join('')}</ul></details>`;
}
function rows(){
  return AREAS.map(a => {
    if(a.on){
      const det = !!V.agDetails && a.on.agrs.length > 1, idle = a.on.agrs.filter(g => !g.thru).length;
      const sub = det ? `${a.on.agrs.length} agreements${idle ? ` · ${idle} not used yet` : ''}` : V.agLinks ? agSubHTML(a.on.agrs) : a.on.sup;
      return {...a, kind:'on', spend:a.on.thru, saved:a.on.saved, sub, st:'on', det};
    }
    const r = rev(a.id), typed = TYPED[a.id];
    const base = r.tuned != null ? r.tuned : a.amt;
    const st = statusOf(a, base, r);
    const amt = typed != null ? typed : base;
    const isTuned = r.tuned != null;
    const docs = r.docs || [];
    const sup = r.sup != null ? r.sup : (a.exact ? a.sup : '');
    const sub = (st === 'saved' || st === 'sent')
      ? `Your spend ${fmt(base)} kr.${sup ? ' · ' + esc(sup) : ''}${docs.length ? ` · ${docs.length} document${docs.length === 1 ? '' : 's'}` : ''}`
      : a.exact ? a.sup : `${a.openN} agreements · ${a.rate}% average saving`;
    const can = a.exact || isTuned || typed != null || docs.length > 0;
    return {...a, kind:'open', amt, base, typed, isTuned, st, docs, sup, sub, can,
      save:Math.round(amt * a.rate / 100), spend:amt};
  });
}
const todoOf = rs => rs.filter(r => r.kind === 'open' && (r.st === 'none' || r.st === 'dirty'));
const bySpend = (a, b) => b.spend - a.spend;
const RANK = {dirty:0, none:0, saved:1, sent:1, skip:2, on:3};
const byStatus = (a, b) => (RANK[a.st] - RANK[b.st]) || (b.spend - a.spend);
function totals(rs){
  const t = {doc:0, lo:0, hi:0, est:false, sp:0, spLo:0, spHi:0, spEst:false, n:0, thru:0, saved:0, skipped:0,
             own:0, ownLo:0, ownHi:0, ownSaveLo:0, ownSaveHi:0, medLo:0, medHi:0, medSaveLo:0, medSaveHi:0, docSp:0};
  rs.forEach(r => {
    if(r.kind === 'on'){ t.thru += r.spend; t.saved += r.saved; return; }
    if(r.st === 'skip'){ t.skipped++; return; }
    t.n++;
    const tuned = r.st === 'dirty' || r.isTuned;
    if(!tuned && r.exact){ t.doc += r.save; t.sp += r.amt; t.docSp += r.amt; return; }
    const mb = tuned ? TUNE : 0, e = tuned ? 0 : EST;
    const lo = r.save * (1 - mb) * (1 - e), hi = r.save * (1 + mb) * (1 + e);
    const sLo = r.amt * (1 - mb) * (1 - e), sHi = r.amt * (1 + mb) * (1 + e);
    t.est = true; t.lo += lo; t.hi += hi; t.spEst = true; t.spLo += sLo; t.spHi += sHi;
    if(tuned){ t.own++; t.ownLo += sLo; t.ownHi += sHi; t.ownSaveLo += lo; t.ownSaveHi += hi; }
    else { t.medLo += sLo; t.medHi += sHi; t.medSaveLo += lo; t.medSaveHi += hi; }
  });
  return t;
}
const saveTot = t => mixed(t.doc, t.lo, t.hi, t.est, true, 'fig-doc');
const spendTot = t => mixed(t.thru + t.sp, t.spLo, t.spHi, t.spEst, false, '');

/* ---------- cells ---------- */
const areaCell = (r, sub, sm = true) => `<span class="sp-area"><span class="sp-ic" aria-hidden="true">${catArt(r.id, sm)}</span>
  <span class="sp-name"><b>${esc(r.n)}</b><span data-sub="${r.id}">${sub == null ? r.sub : sub}</span></span></span>`;
function saveHTML(r){
  if(r.kind === 'on') return NONE;
  if(r.st === 'skip') return NONE;
  if(r.st === 'dirty' || r.isTuned) return `<span class="fig-est">+${tuneRange(r.save)}</span>`;
  return r.exact ? `<span class="fig-doc">+${fmt(r.save)}</span>` : `<span class="fig-est">+${estRange(r.save)}</span>`;
}
const savedHTML = r => r.kind === 'on' ? `<span class="fig-actual">${fmt(r.saved)}</span>` : NONE;
/* the spend as text: what we know, or the median as a band */
function spendText(r){
  if(r.kind === 'on') return fmt(r.spend);
  if(r.typed != null) return fmt(r.typed);
  if(r.exact || r.isTuned) return fmt(r.amt);
  return `<span class="fig-est">${estRange(r.base)}</span>`;
}
/* the spend as the input: the band is the placeholder, a read figure the value */
function spendInput(r, inBody){
  const ro = r.st === 'sent', val = r.typed != null ? fmt(r.typed) : (r.exact || r.isTuned) ? fmt(r.amt) : '';
  const ph = (r.exact || r.isTuned) ? '' : estRange(r.base);
  const input = `<input data-live="${r.id}" value="${val}" placeholder="${ph}"${ro ? ' readonly' : ''} inputmode="numeric" aria-label="${esc(r.n)}: your spend a year, kr.">`;
  return inBody
    ? `<div class="sp-f"><label for="spIn-${r.id}">Your spend a year</label><div class="sp-field num${ro ? ' ro' : ''}">${input.replace('<input ', `<input id="spIn-${r.id}" `)}<span class="u">kr.</span></div></div>`
    : `<span class="sp-in${ro ? ' ro' : ''}">${input}<span class="u">kr.</span></span>`;
}
function stHTML(r, trend){
  if(r.kind === 'on') return trend && r.trend ? `<span class="sp-st ${r.trend.c}">${r.trend.t}</span>` : `<span class="sp-st act">Active</span>`;
  if(r.st === 'skip') return `<span class="sp-stc"><span class="sp-st skip">Not relevant</span><button type="button" class="linkbtn" data-act="undo" data-id="${r.id}">Undo</button></span>`;
  if(r.st === 'sent') return `<span class="sp-st on">With Peter</span>`;
  if(r.st === 'dirty') return `<span class="sp-stc"><button type="button" class="btn btn-secondary btn-sm" data-act="save" data-id="${r.id}">Save</button></span>`;
  if(r.st === 'saved') return `<span class="sp-st done">Reviewed</span>`;
  return `<span class="sp-st todo">Not reviewed</span>`;
}
/* the open row's body: where the figure came from, the supplier, the documents, the actions */
function bodyHTML(r, o = {}){
  const sent = r.st === 'sent';
  const docs = `<div class="sp-f"><label>Documents</label>
      <label class="sp-drop${sent ? ' ro' : ''}" data-drop="${r.id}">${UP_I}<b>Drop reports or contracts</b><span>PDF, Excel or CSV</span>
        <input type="file" multiple accept=".pdf,.xls,.xlsx,.csv" data-file="${r.id}"${sent ? ' disabled' : ''}></label>
      ${r.docs.length ? `<ul class="sp-docs">${r.docs.map(d => `<li>${DOC_I}${esc(d)}</li>`).join('')}</ul>` : ''}</div>`;
  const sup = `<div class="sp-f"><label for="spSup-${r.id}">Current supplier <i>(optional)</i></label>
      <div class="sp-field${sent ? ' ro' : ''}"><input id="spSup-${r.id}" data-sup="${r.id}" value="${esc(r.sup)}" placeholder="Who you buy from"${sent ? ' readonly' : ''}></div></div>`;
  const acts = `<div class="sp-act">${sent
    ? `<span class="sp-sent">${TICK}Sent · Peter replies within two working days</span><span class="spacer"></span><button type="button" class="linkbtn quiet" data-act="withdraw" data-id="${r.id}">Withdraw</button>`
    : `<button type="button" class="linkbtn quiet" data-act="${r.st === 'skip' ? 'undo' : 'skip'}" data-id="${r.id}">${r.st === 'skip' ? 'Review it after all' : 'Not relevant'}</button>${ownAddHTML(r.id)}<span class="spacer"></span>
       <button type="button" class="btn btn-secondary btn-sm" data-act="save" data-id="${r.id}"${r.can ? '' : ' disabled'}>Save</button>
       <button type="button" class="btn btn-primary btn-sm" data-act="send" data-id="${r.id}"${r.can ? '' : ' disabled'}>Send to review</button>`}</div>`;
  const lead = r.exact ? `<span class="sp-help">${DOC_I}Spend read from ${DOC_NAME}</span>` : '';
  return `<div class="${o.cls || 'sp-body'}">${lead}
    <div class="sp-cols"><div class="sp-col">${o.input ? spendInput(r, true) : ''}${sup}</div><div class="sp-col">${docs}</div></div>${acts}</div>`;
}
/* the way to add an agreement she already has in this area: a link with a mark, nothing more */
const PLUS = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>';
const ownAddHTML = id => `<button type="button" class="linkbtn own-add" data-own="${id}">${PLUS}Add your own agreement</button>`;
/* V11: the agreements an active area runs through, on the parent's own columns so the money lines up under the area's;
   one that is active with nothing through it yet says so, and carries the way to start */
function agrsBodyHTML(r){
  const rows = r.on.agrs.map(g => `<div class="lgx-tr${g.thru ? '' : ' idle'}">
    <span class="lgx-a"><span class="lgx-logo" aria-hidden="true"><img src="../../../assets/company-logos/${g.logo}@64px.png" alt="" loading="lazy"></span><b>${esc(g.n)}</b></span>
    <span class="sp-num r">${g.thru ? fmt(g.thru) : NONE}</span>
    <span class="sp-num r">${g.thru ? `<span class="fig-actual">${fmt(g.saved)}</span>` : NONE}</span>
    <span class="lgx-st">${g.thru ? `<span class="sp-st act">Active</span>`
      : `<span class="sp-st wait">Not used yet</span><button type="button" class="btn btn-primary btn-sm" data-start="${esc(g.n)}">Start using</button>`}</span></div>`).join('');
  return `<div class="sp-body lgx">${rows}<div class="lgx-add">${ownAddHTML(r.id)}</div></div>`;
}
/* V8: the row in the tray only says where its figure came from */
const provHTML = r => `<div class="sp-body prov"><span class="sp-help">${r.exact ? `${DOC_I}Spend read from ${DOC_NAME}` : `Industry median for companies like yours · ${r.openN} agreements at ${r.rate}% average saving`}</span>
  ${r.st === 'sent' ? `<span class="sp-sent">${TICK}With Peter</span>` : `<button type="button" class="btn btn-secondary btn-sm" data-review="${r.id}">Review</button>`}</div>`;

/* ---------- a row, in each form ---------- */
function rowHTML(r, f){
  const x = `<span class="sp-x" aria-hidden="true">${CHEV}</span>`;
  const open = r.kind === 'open', canOpen = open || !!r.det;
  let cells, body = '';
  if(f.form === 'acts-a'){
    cells = `${areaCell(r)}<span class="sp-num r">${fmt(r.spend)}</span><span class="sp-num r">${savedHTML(r)}</span>`;
  } else if(f.form === 'acts-b'){
    cells = `${areaCell(r)}<span class="sp-num r">${spendInput(r)}</span><span class="sp-num r c-save" data-save="${r.id}">${saveHTML(r)}</span>
      <span class="c-st" data-st="${r.id}">${stHTML(r)}</span>${x}`;
    body = bodyHTML(r);
  } else if(f.form === 'one' || f.form === 'grouped'){
    cells = `${areaCell(r)}<span class="sp-num r">${open ? spendInput(r) : spendText(r)}</span><span class="sp-num r">${savedHTML(r)}</span>
      <span class="sp-num r c-save" data-save="${r.id}">${saveHTML(r)}</span><span class="c-st" data-st="${r.id}">${stHTML(r, f.trend)}</span>${canOpen ? x : '<span></span>'}`;
    if(open) body = bodyHTML(r);
  } else if(f.form === 'facts'){
    cells = `${areaCell(r)}<span class="sp-num r">${open ? spendInput(r) : spendText(r)}</span><span class="sp-num r">${savedHTML(r)}</span>
      <span class="c-st" data-st="${r.id}">${stHTML(r)}</span>${canOpen ? x : '<span></span>'}`;
    if(open) body = bodyHTML(r);
  } else if(f.form === 'tray'){
    cells = `${areaCell(r)}<span class="sp-num r">${spendText(r)}</span><span class="sp-num r">${savedHTML(r)}</span>
      <span class="c-st" data-st="${r.id}">${stHTML(r)}</span>${canOpen ? x : '<span></span>'}`;
    if(open) body = provHTML(r);
  } else if(f.form === 'compact'){
    const sub = open ? `${stHTML(r)}` : r.sub;
    const money = open ? `<span data-save="${r.id}">${saveHTML(r)}</span>` : savedHTML(r);
    cells = `${areaCell(r, sub)}<span class="sp-num r">${spendText(r)}</span><span class="sp-num r c-save">${money}</span>${canOpen ? x : '<span></span>'}`;
    if(open) body = bodyHTML(r, {input:true});
  }
  if(!body && r.det) body = agrsBodyHTML(r);
  const cls = `sp-tr${r.kind === 'on' ? ' is-on' : ''}${r.st === 'skip' ? ' skip' : ''}`;
  return body
    ? `<details name="ledger" data-row="${r.id}"${OPEN === r.id ? ' open' : ''}><summary><div class="${cls}">${cells}</div></summary>${body}</details>`
    : `<div class="${cls} plain">${cells}</div>`;
}
const HEADS = {
  'acts-a':'<span>Area</span><span class="r">Spend</span><span class="r">Saved</span>',
  'acts-b':'<span>Area</span><span class="r">Spend / year</span><span class="r">Could save / year</span><span class="c-st">Status</span><span></span>',
  one:'<span>Area</span><span class="r">Spend / year</span><span class="r">Saved</span><span class="r">Could save / year</span><span class="c-st">Status</span><span></span>',
  grouped:'<span>Area</span><span class="r">Spend / year</span><span class="r">Saved</span><span class="r">Could save / year</span><span class="c-st">Status</span><span></span>',
  facts:'<span>Area</span><span class="r">Spend / year</span><span class="r">Saved</span><span class="c-st">Status</span><span></span>',
  tray:'<span>Area</span><span class="r">Spend / year</span><span class="r">Saved</span><span class="c-st">Status</span><span></span>',
  compact:'<span>Area</span><span class="r">Spend / year</span><span class="r">Saved / could save</span><span></span>',
};
const TB_CLS = {'acts-a':'a', 'acts-b':'b', one:'one', grouped:'one', facts:'facts', tray:'facts', compact:'compact'};
/* the foot says what is shown and what is left; the total row only exists when every row is on the page */
function footHTML(all, shownN, o = {}){
  const todo = todoOf(all).length, n = all.length, partial = shownN < n;
  const txt = partial ? `${shownN} of ${n} areas${todo ? ` · ${todo} to review` : ''}`
    : todo ? `${todo} area${todo === 1 ? '' : 's'} still to review.` : 'Every area is reviewed.';
  const more = n > LIMIT ? `<button type="button" class="linkbtn" data-all>${partial ? `All ${n} areas` : 'Fewer areas'}</button>` : '';
  return `<div class="sp-foot"><span>${txt}</span>${more}<span class="sp"></span>
    ${todo && !o.noNext && !V.agDetails ? `<button type="button" class="btn btn-primary btn-sm" data-next>Review next area</button>` : ''}</div>`;
}
function totalRow(rs, form){
  const t = totals(rs), n = rs.length;
  const l = `<span class="l">Total · <b>${n} area${n === 1 ? '' : 's'}</b></span>`;
  if(form === 'acts-a') return `<div class="sp-tf">${l}<span class="r">${fmt(t.thru)}</span><span class="r"><span class="fig-actual">${fmt(t.saved)}</span></span></div>`;
  if(form === 'acts-b') return `<div class="sp-tf"><span class="l">Total · <b data-tot="n">${t.n} area${t.n === 1 ? '' : 's'}</b></span><span class="r" data-tot="spend">${mixed(t.sp, t.spLo, t.spHi, t.spEst, false, '')}</span>
    <span class="r c-save" data-tot="save">${saveTot(t)}</span><span class="c-st"></span><span></span></div>`;
  if(form === 'one' || form === 'grouped') return `<div class="sp-tf">${l}<span class="r" data-tot="spend">${spendTot(t)}</span><span class="r"><span class="fig-actual">${fmt(t.saved)}</span></span>
    <span class="r c-save" data-tot="save">${saveTot(t)}</span><span class="c-st"></span><span></span></div>`;
  if(form === 'facts' || form === 'tray') return `<div class="sp-tf">${l}<span class="r" data-tot="spend">${spendTot(t)}</span><span class="r"><span class="fig-actual">${fmt(t.saved)}</span></span><span class="c-st"></span><span></span></div>`;
  if(form === 'compact') return `<div class="sp-tf">${l}<span class="r stack" data-tot="spend-stack">${fmt(t.thru + t.sp)}${t.spEst ? `<span class="fig-est">${band(t.spLo, t.spHi)}</span>` : ''}</span>
    <span class="r c-save"><span class="fig-actual">${fmt(t.saved)}</span></span><span></span></div>
    <div class="sp-tf sub"><span class="l">Could save</span><span class="r span2" data-tot="save">${saveTot(t)}</span><span></span></div>`;
  return '';
}
function tableHTML(rs, f){
  const form = f.form;
  const shown = SHOW_ALL ? rs : rs.slice(0, LIMIT), partial = shown.length < rs.length;
  let rowsHTML;
  if(form === 'grouped'){
    const isOn = r => r.kind === 'on';
    const on = shown.filter(isOn), op = shown.filter(r => !isOn(r)), onN = rs.filter(isOn).length, opN = rs.length - onN;
    const band = (name, k, n) => `<div class="sp-tg"><b>${name}</b><span>${k < n ? `${k} of ${n}` : n} areas</span><span class="sp"></span></div>`;
    const t = totals(rs);
    rowsHTML = (on.length ? band('Through an agreement', on.length, onN) + on.map(r => rowHTML(r, f)).join('') + (partial ? '' :
        `<div class="sp-tf sub"><span class="l">${onN} areas</span><span class="r">${fmt(t.thru)}</span><span class="r"><span class="fig-actual">${fmt(t.saved)}</span></span><span></span><span></span><span></span></div>`) : '')
      + (op.length ? band('Not reviewed', op.length, opN) + op.map(r => rowHTML(r, f)).join('') : '');
  } else rowsHTML = shown.map(r => rowHTML(r, f)).join('');
  return `<div class="sp-tb ${TB_CLS[form]}">${f.head ? `<div class="sp-hd"><h3>${f.head}</h3>${f.headSub ? `<span>${f.headSub}</span>` : ''}</div>` : ''}<div class="sp-th">${HEADS[form]}</div>${rowsHTML}${partial ? '' : totalRow(rs, form)}${
    f.foot || partial ? footHTML(rs, shown.length, {noNext:!f.foot}) : ''}</div>`;
}

/* ---------- sections ---------- */
const secHead = (h2, p, right) => `<div class="nc-sec-head"><div><h2>${h2}</h2>${p ? `<p class="nc-sub">${p}</p>` : ''}</div>${right || ''}</div>`;
const lead = (k, v) => `<div class="sp-lead"><span class="hy-k">${k}</span><b>${v}</b></div>`;
const SRC = 'Read from your 4 documents.';

function actsSection(rs){
  const on = rs.filter(r => r.kind === 'on').sort(bySpend);
  const op = rs.filter(r => r.kind === 'open').sort((a, b) => (b.exact - a.exact) || (b.spend - a.spend));
  const t = totals(rs);
  return `<section class="nc-sec two-acts" id="ledger">
    <div>
      <div class="ar-head"><div class="ar-head-t"><h2>What you spend and save today</h2><p>${SRC}</p></div>${lead('Saved', `<span class="fig-actual">${fmt(t.saved)}</span><small>kr.</small>`)}</div>
      ${tableHTML(on, {form:'acts-a'})}
    </div>
    <div>
      <div class="ar-head"><div class="ar-head-t"><h2>Not reviewed areas</h2><p>Figures without a document are the industry median.</p></div>
        <div class="sp-lead"><span class="hy-k">Could save</span><b><span data-tot="save">${saveTot(t)}</span><small>kr.</small></b></div></div>
      ${tableHTML(op, {form:'acts-b'})}
    </div></section>`;
}
function ledgerSection(rs, o){
  const sorted = [...rs].sort(o.sort && SORT === 'status' ? byStatus : bySpend);
  const t = totals(rs);
  const right = o.sort
    ? `<div class="ar-sort"><span class="ar-sort-l">Sorted by</span><div class="seg" role="group" aria-label="Sort"><button type="button" data-sort="spend" aria-pressed="${SORT === 'spend'}">Spend</button><button type="button" data-sort="status" aria-pressed="${SORT === 'status'}">Status</button></div></div>`
    : o.lead ? `<div class="sp-lead"><span class="hy-k">Could save</span><b><span data-tot="save">${saveTot(t)}</span><small>kr.</small></b></div>`
    : o.key ? KEY_HTML : '';
  return `<section class="nc-sec ledger-sec" id="ledger">${secHead('All your purchasing areas', SRC, right)}${tableHTML(sorted, {form:o.form, foot:true, trend:o.trend})}</section>`;
}
function barSection(rs){
  const t = totals(rs), on = rs.filter(r => r.kind === 'on').length;
  const doc = rs.filter(r => r.kind === 'open' && r.exact && !r.isTuned && r.st !== 'skip').length;
  const own = rs.filter(r => r.kind === 'open' && (r.isTuned || r.st === 'dirty') && r.st !== 'skip').length;
  const est = rs.filter(r => r.kind === 'open' && !r.exact && !r.isTuned && r.st !== 'dirty' && r.st !== 'skip').length;
  const parts = [`${on} through an agreement`, doc ? `${doc} from your documents` : '', own ? `${own} your figure${own === 1 ? '' : 's'}` : '', est ? `${est} estimated` : '', t.skipped ? `${t.skipped} not relevant` : ''].filter(Boolean);
  return `<section class="nc-sec" id="ledger">
    <div class="areas-bar"><div class="ab-t"><b>${rs.length} purchasing areas</b><span>${parts.join(' · ')}</span></div>
      <div class="sp-lead"><span class="hy-k">Could save</span><b><span data-tot="save">${saveTot(t)}</span><small>kr.</small></b></div>
      <button type="button" class="btn btn-secondary btn-sm" data-ab-toggle aria-expanded="${BAR_OPEN}" aria-controls="abBody">${BAR_OPEN ? 'Hide areas' : 'Show areas'}${CHEV}</button></div>
    <div class="ab-body" id="abBody"${BAR_OPEN ? '' : ' hidden'}>${tableHTML([...rs].sort(bySpend), {form:'one', foot:true})}</div></section>`;
}

/* ---------- the bento: the active agreements, and what the moves card turns into ---------- */
const ARC_PTS = [[19.68,85.07,-0.26,83.57],[21.15,75.31,1.66,70.86],[24.06,65.89,5.44,58.58],[28.34,57.00,11.02,47.00],[33.90,48.85,18.26,36.38],[40.61,41.62,27.01,26.96],[48.32,35.47,37.05,18.94],[56.86,30.54,48.19,12.52],[66.05,26.93,60.15,7.82],[75.66,24.74,72.68,4.96],[85.50,24.00,85.50,4.00],[95.34,24.74,98.32,4.96],[104.95,26.93,110.85,7.82],[114.14,30.54,122.81,12.52],[122.68,35.47,133.95,18.94],[130.39,41.62,143.99,26.96],[137.10,48.85,152.74,36.38],[142.66,57.00,159.98,47.00],[146.94,65.89,165.56,58.58],[149.85,75.31,169.34,70.86],[151.32,85.07,171.26,83.57]];
function arcHTML(pct, label){
  const lit = Math.max(1, Math.round(pct / 100 * ARC_PTS.length));
  return `<figure class="nc-arc-wrap" role="img" aria-label="+${pct}% — ${label}">
    <svg class="nc-arc" viewBox="0 0 171 93.3023" width="171" height="93.3023" aria-hidden="true">
      <defs><linearGradient id="arcG" x1="24.3791" y1="24.3755" x2="8.63379" y2="93.3024" gradientUnits="userSpaceOnUse"><stop stop-color="#BED8C3"/><stop offset="1" style="stop-color:var(--general-primary)"/></linearGradient></defs>
      ${ARC_PTS.map((p, i) => `<line x1="${p[0]}" y1="${p[1]}" x2="${p[2]}" y2="${p[3]}"${i < lit ? ' stroke="url(#arcG)"' : ' class="off"'}/>`).join('')}
    </svg><p class="nc-arc-n">+${pct}<span class="nc-arc-u">%</span></p><figcaption class="nc-arc-l">${label}</figcaption></figure>`;
}
function movesCard(rs, kind){
  const todo = todoOf(rs).sort((a, b) => b.save - a.save).slice(0, 2);
  const n = todo.length, N = ['No', 'One', 'Two'][n];
  const money = kind === 'money';
  const t = totals(todo);
  const title = !n ? 'Every area is reviewed'
    : money ? `${N} move${n === 1 ? '' : 's'} worth ${saveTot(t)}&nbsp;kr. a year` : `${N} move${n === 1 ? '' : 's'}`;
  const arc = kind === 'arc' && n ? arcHTML(Math.round(todo.reduce((s, r) => s + r.save, 0) / todo.reduce((s, r) => s + r.amt, 0) * 100), 'Under what you pay today, in these two areas') : '';
  const tiles = todo.map(r => `<li><button type="button" class="nc-move plain" data-go="${r.id}" style="--move-tint:var(--cat-${r.id}-tint,var(--surface-tile))">
      <span class="nc-move-row"><span class="nc-move-txt"><b>${esc(r.n)}</b><span>${r.openN} agreements · ${r.rate}% average saving</span></span><span class="nc-move-ic" aria-hidden="true">${catArt(r.id)}</span></span>
      <span class="nc-move-act">${money ? `<span class="nc-move-val"><span><span data-save="${r.id}">${saveHTML(r)}</span>&nbsp;kr.</span></span>` : ''}<span class="nc-move-cta">Review${ARROW}</span></span></button></li>`).join('');
  return `<div class="nc-bento-cell nc-advisory links"><div class="nc-advisory-hero"><div class="nc-advisory-head"><h2 class="nc-advisory-title">${title}</h2></div>${arc}</div>
    ${n ? `<ul class="nc-rec-list">${tiles}</ul>` : ''}</div>`;
}
function rollupHTML(rs){
  const t = totals(rs);
  const mid = (a, b) => (a + b) / 2;
  const segs = [
    {k:'var(--general-primary)', w:t.thru}, {k:'rgb(110 110 110/.3)', w:t.docSp}, {k:'rgb(110 110 110/.5)', w:mid(t.ownLo, t.ownHi)}, {k:'est', w:mid(t.medLo, t.medHi)}
  ].filter(s => s.w > 0);
  const li = (cls, k, n, sp, sv) => `<li class="${cls}" style="--k:${k}"><span class="rl-n">${n}</span><span class="rl-s">${sp}</span><b>${sv[0]}</b><em>${sv[1]}</em></li>`;
  return `<div class="tune-h1"><h2>Where the money went</h2></div><p class="nc-sub nc-mini-sub">Last 12 months.</p>
    <div class="rl-bar" aria-hidden="true">${segs.map(s => `<i class="${s.k === 'est' ? 'est' : ''}" style="flex:${s.w} 0 0;--k:${s.k}"></i>`).join('')}</div>
    <ul class="rl-list">
      ${li('', 'var(--general-primary)', 'Through an agreement', '3 areas', [`${fmt(t.thru)}<small>kr.</small>`, `<span class="fig-actual">${fmt(t.saved)}</span> saved`])}
      ${t.docSp ? li('', 'rgb(110 110 110/.3)', 'Outside · from your documents', `${rs.filter(r => r.kind === 'open' && r.exact && !r.isTuned && r.st !== 'skip' && r.st !== 'dirty').length} areas`, [`${fmt(t.docSp)}<small>kr.</small>`, `<span class="fig-doc">+${fmt(t.doc)}</span> could save`]) : ''}
      ${t.own ? li('', 'rgb(110 110 110/.5)', 'Outside · your figures', `${t.own} area${t.own === 1 ? '' : 's'}`, [`<span class="fig-est">${band(t.ownLo, t.ownHi)}</span><small>kr.</small>`, `<span class="fig-est">+${band(t.ownSaveLo, t.ownSaveHi)}</span> could save`]) : ''}
      ${t.medLo ? li('est', '', 'Outside · estimated', `${rs.filter(r => r.kind === 'open' && !r.exact && !r.isTuned && r.st !== 'dirty' && r.st !== 'skip').length} areas`, [`<span class="fig-est">${band(t.medLo, t.medHi)}</span><small>kr.</small>`, `<span class="fig-est">+${band(t.medSaveLo, t.medSaveHi)}</span> could save`]) : ''}
    </ul>
    <p class="rl-tot"><span>Total${t.skipped ? ` · ${t.skipped} not relevant` : ''}</span><b>${spendTot(t)} kr.</b></p>`;
}
function docsHTML(rs){
  const added = [...store().docs.map(d => ({n:d.n, m:d.m})), ...rs.flatMap(r => (r.docs || []).map(d => ({n:d, m:r.n})))];
  const known = rs.filter(r => r.kind === 'on' || r.exact).length;
  return `<div class="tune-h1"><h2>Your documents</h2></div><p class="nc-sub nc-mini-sub">${KARI_DOCS.length + added.length} documents · ${known} of ${rs.length} areas.</p>
    <ul class="dc-list">${KARI_DOCS.map(d => `<li>${DOC_I}<span class="dc-t"><span class="dc-n">${d.n}</span><span class="dc-m">${d.m}</span></span></li>`).join('')}
      ${added.map(d => `<li>${DOC_I}<span class="dc-t"><span class="dc-n">${esc(d.n)}</span><span class="dc-m">${esc(d.m)}</span></span><span class="dc-a new">Just added</span></li>`).join('')}</ul>
    <label class="sp-drop dc-drop" data-drop="*">${UP_I}<b>Drop reports or contracts</b><span>PDF, Excel or CSV</span><input type="file" multiple accept=".pdf,.xls,.xlsx,.csv" data-file="*"></label>`;
}
function queueHTML(rs){
  const todo = todoOf(rs).sort(bySpend), shown = SHOW_ALL ? todo : todo.slice(0, LIMIT), more = todo.length - shown.length;
  const sent = rs.filter(r => r.st === 'sent').length, done = rs.filter(r => r.st === 'saved').length, skip = rs.filter(r => r.st === 'skip').length;
  const aside = [sent ? `${sent} with Peter` : '', done ? `${done} reviewed` : '', skip ? `${skip} not relevant` : ''].filter(Boolean);
  return `<div class="tune-h1"><h2>To review</h2></div><p class="nc-sub nc-mini-sub">${todo.length ? `${todo.length} of ${rs.length} areas.` : 'Every area is reviewed.'}</p>
    ${todo.length ? `<ol class="q-list">${shown.map(r => `<li><button type="button" class="q-row" data-go="${r.id}"><span class="sp-ic" aria-hidden="true">${catArt(r.id, true)}</span>
      <span class="q-t"><b>${esc(r.n)}</b><span>${r.exact ? `${esc(r.sup)} · from ${DOC_NAME}` : `${r.openN} agreements · ${r.rate}% average saving`}</span></span>
      <span class="q-m">${spendText(r)}</span><span class="q-x" aria-hidden="true">${CHEV_R}</span></button></li>`).join('')}</ol>` : ''}
    ${more ? `<p class="q-more"><button type="button" class="linkbtn" data-all>${more} more area${more === 1 ? '' : 's'}</button></p>` : ''}
    ${aside.length ? `<p class="q-aside">${aside.map(a => `<span>${a}</span>`).join('')}</p>` : ''}`;
}
function nextHTML(rs){
  const todo = todoOf(rs).sort(bySpend);
  let r = rs.find(q => q.id === FOCUS && q.kind === 'open');
  if(!r || (r.st !== 'none' && r.st !== 'dirty' && r.st !== 'sent')) r = todo[0];
  if(!r) return `<div class="tune-h1"><h2>Next to review</h2></div><p class="nx-done">Every area is reviewed.</p>`;
  const rest = todo.filter(q => q.id !== r.id).length;
  return `<div class="tune-h1"><h2>Next to review</h2></div>
    <div class="nx-area"><span class="nx-ic" aria-hidden="true">${catArt(r.id)}</span><span class="nx-t"><b>${esc(r.n)}</b><span>${r.exact ? `${esc(r.sup)} · from ${DOC_NAME}` : `${r.openN} agreements · ${r.rate}% average saving`}</span></span></div>
    ${bodyHTML(r, {input:true, cls:'nx-body'})}
    <p class="nx-foot">${rest ? `${rest} more after this.` : 'The last one.'}</p>`;
}
/* V7: the agreements card without its transactions, so it stands as tall as the queue beside it */
const pkgNoTx = () => PARTS.pkg.replace(/<div class="pkg-tx-sec">[\s\S]*?<\/div>/, '').replace('class="pkg-ledger tx"', 'class="pkg-ledger"');
/* V11: what happened since she was last here — each line ends in the thing to do about it */
const SINCE_LEAD = {art:'off', b:'Lyreco Erhverv expires 1 Jan 2027', s:'Office supplies · 14.100 kr. saved this year', act:'Renew', go:''};
const SINCE = [
  {d:'12 Oct', b:'Tools & workwear is ready to review', s:'296.000 kr. read from your Q2 export', act:'Review', go:'row:tool'},
  {d:'12 Oct', b:'Avis invoice received', s:'Machine & equipment rental · in review', act:'See documents', go:'docs'},
  {d:'11 Oct', b:'Three agreements negotiated', s:'Granngården Frame, Mediq Erhverv, Shell Fleet Nordic', act:'See agreements', go:'agrs'},
];
const sinceHTML = () => `<div class="tune-h1"><h2>Since your last visit</h2></div><p class="nc-sub nc-mini-sub">Last visit 30 Sep.</p>
  <div class="sv-lead"><span class="sv-art" aria-hidden="true">${catArt(SINCE_LEAD.art)}</span>
    <span class="sv-lead-t"><b>${SINCE_LEAD.b}</b><span>${SINCE_LEAD.s}</span></span>
    <button type="button" class="btn btn-primary btn-sm" data-sv="${SINCE_LEAD.go}">${SINCE_LEAD.act}</button></div>
  <ol class="tl">${SINCE.map(x => `<li><span class="tl-d">${x.d}</span><span class="tl-dot" aria-hidden="true"><i></i></span>
    <span class="tl-t"><b>${x.b}</b><span>${x.s}</span></span><button type="button" class="linkbtn" data-sv="${x.go}">${x.act}</button></li>`).join('')}</ol>`;
/* V11: the documents, each with where it stands, and a drop zone drawn like the spend page's empty ledger */
const KARI_DOCS2 = [
  {n:'Avis invoice',           m:'Machine & equipment rental · 2 days ago', st:'review'},
  {n:'Q2 2026 spend export',   m:'Tools & workwear, Telecom & IT · 20 lines', st:'done'},
  {n:'Preem Business invoice', m:'Fuel & transport · 31 Aug 2026', st:'done'},
  {n:'Lyreco Erhverv invoice', m:'Office supplies · 22 Aug 2026', st:'done'},
  {n:'Ahlsell Nordic invoice', m:'Building materials · 14 Aug 2026', st:'done'},
];
const DOCS_MAX = 3;
const DZ_ART = `<svg class="dz-art" viewBox="0 0 160 120" fill="none" aria-hidden="true">
  <defs>
    <filter id="dz-blur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="4"/></filter>
    <g id="dz-c1"><circle cx="26" cy="58" r="10"/><circle cx="44" cy="48" r="16"/><circle cx="64" cy="56" r="12"/><rect x="26" y="58" width="38" height="10"/></g>
    <g id="dz-c2"><circle cx="19" cy="93" r="7"/><circle cx="30" cy="88" r="10"/><circle cx="42" cy="93" r="7"/><rect x="19" y="93" width="23" height="7"/></g>
    <g id="dz-c3"><circle cx="110" cy="38" r="6"/><circle cx="120" cy="33" r="9"/><circle cx="130" cy="38" r="6"/><rect x="110" y="38" width="20" height="6"/></g>
  </defs>
  <g transform="translate(3 0)">
    <use href="#dz-c3" fill="#f6f7f9"/><use href="#dz-c3" y="1.5" fill="#e9ecf0"/>
    <use href="#dz-c1" fill="#f6f7f9"/><use href="#dz-c1" y="1.5" fill="#e9ecf0"/>
    <rect x="47" y="18" width="60" height="86" rx="6" fill="#0f2a55" opacity=".12" filter="url(#dz-blur)"/>
    <path d="M48 12H94L110 28V96a4 4 0 0 1-4 4H48a4 4 0 0 1-4-4V16a4 4 0 0 1 4-4Z" fill="var(--surface)" stroke="#c9ced6"/>
    <path d="M94 12v12a4 4 0 0 0 4 4h12Z" fill="#e3e7ec" stroke="#c9ced6" stroke-linejoin="round"/>
    <g stroke-linecap="round">
      <path d="M56 38h26" stroke="#cfd5dc" stroke-width="4"/>
      <path d="M56 50h40M56 60h32M56 70h22" stroke="#dfe3e8" stroke-width="3"/>
    </g>
    <use href="#dz-c2" fill="#f6f7f9"/><use href="#dz-c2" y="1.5" fill="#e9ecf0"/>
    <circle cx="108" cy="91.5" r="12.5" fill="var(--general-primary)" opacity=".28" filter="url(#dz-blur)"/>
    <circle cx="108" cy="88" r="13" fill="var(--general-primary)" stroke="var(--surface)" stroke-width="2"/>
    <path d="M108 94V82.5M102.5 88l5.5-5.5 5.5 5.5" stroke="var(--general-primary-foreground)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
  </g></svg>`;
const docStat = st => st === 'done' ? `<span class="dc-st done">${TICK}Reviewed</span>` : `<span class="dc-st">In review</span>`;
const docLI = d => `<li>${DOC_I}<span class="dc-t"><span class="dc-n">${esc(d.n)}</span><span class="dc-m">${esc(d.m)}</span></span>${docStat(d.st)}</li>`;
const X_I = '<svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>';
function docsHTML2(rs){
  const added = [...store().docs.map(d => ({n:d.n, m:d.m, st:'review'})), ...rs.flatMap(r => (r.docs || []).map(d => ({n:d, m:r.n, st:'review'})))];
  const all = [...added, ...KARI_DOCS2], done = all.filter(d => d.st === 'done').length, rev = all.length - done;
  const sub = `<p class="nc-sub nc-mini-sub">${done} reviewed${rev ? ` · ${rev} in review` : ''}.</p>`;
  const more = all.length > DOCS_MAX ? `<p class="dc-more"><button type="button" class="linkbtn" data-docs-all>Show all ${all.length}</button></p>
    <dialog class="dlg" id="docsDlg"><div class="dlg-h"><div><h2>Your documents</h2>${sub}</div><button type="button" class="dlg-x" data-dlg-close aria-label="Close">${X_I}</button></div>
      <div class="dlg-b"><ul class="dc-list">${all.map(docLI).join('')}</ul></div></dialog>` : '';
  return `<div class="tune-h1"><h2>Your documents</h2></div>${sub}
    <ul class="dc-list">${all.slice(0, DOCS_MAX).map(docLI).join('')}</ul>${more}
    <label class="dz" data-drop="*">${DZ_ART}<span class="dz-t"><b>Drop reports or contracts</b><span>PDF, Excel or CSV</span></span>
      <input type="file" multiple accept=".pdf,.xls,.xlsx,.csv" data-file="*"></label>`;
}
function bentoSection(rs, kind){
  if(kind === 'since-docs') return `<section class="nc-sec nc-sec-follow"><div class="nc-bento-row">
    <div class="nc-bento-cell"><div class="card-x">${sinceHTML()}</div></div>
    <div class="nc-bento-cell"><div class="card-x" data-docs>${docsHTML2(rs)}</div></div></div></section>`;
  const pkg = `<div class="nc-bento-cell">${kind === 'queue' ? pkgNoTx() : PARTS.pkg}</div>`;
  let right;
  if(kind === 'links' || kind === 'arc' || kind === 'money') right = movesCard(rs, kind);
  else if(kind === 'rollup') right = `<div class="nc-bento-cell"><div class="card-x" data-rollup>${rollupHTML(rs)}</div></div>`;
  else if(kind === 'docs') right = `<div class="nc-bento-cell"><div class="card-x">${docsHTML(rs)}</div></div>`;
  else if(kind === 'queue') right = `<div class="nc-bento-cell"><div class="card-x" data-queue>${queueHTML(rs)}</div></div>`;
  else if(kind === 'next') right = `<div class="nc-bento-cell"><div class="card-x" data-next-card>${nextHTML(rs)}</div></div>`;
  else if(kind === 'compact'){
    const t = totals(rs);
    const left = `<div class="nc-bento-cell cell-ledger" id="ledger"><div class="card-x">
      <div class="tune-h1"><h2>All your purchasing areas</h2></div><p class="nc-sub nc-mini-sub">${SRC}</p>
      ${tableHTML([...rs].sort(bySpend), {form:'compact', foot:true})}</div></div>`;
    return `<section class="nc-sec nc-sec-follow"><div class="nc-bento-row wide-left">${left}${pkg}</div></section>`;
  }
  return `<section class="nc-sec nc-sec-follow"><div class="nc-bento-row">${pkg}${right}</div></section>`;
}
/* V12: what V11's two cards said, as a grid of tiles — each a title, the figure, the way in */
const NEW_AGRS = [
  {n:'Granngården Frame',  a:'Building materials', logo:'GRann'},
  {n:'Mediq Erhverv',      a:'Tools & workwear',   logo:'Mediq'},
  {n:'Shell Fleet Nordic', a:'Fuel & transport',   logo:'Shell'},
];
const tile = o => `<article class="st-tile${o.cls ? ' ' + o.cls : ''}"${o.attr || ''}>
  <div class="st-top"><div class="st-h"><h3>${o.h}</h3><span class="sp"></span>${o.tag ? `<span class="st-tag">${o.tag}</span>` : ''}</div>
    ${o.v ? `<p class="st-v">${o.v}</p>` : ''}${o.cmp ? `<p class="st-cmp">${o.cmp}</p>` : ''}</div>
  ${o.body || ''}
  ${o.foot != null || o.act ? `<div class="st-foot"><span>${o.foot || ''}</span>${o.act ? `<button type="button" class="linkbtn" data-sv="${o.go || ''}">${o.act}</button>` : ''}</div>` : ''}</article>`;
/* V13: the ledger leads the grid as a full-width tile — the table is already the tile, with its own head; the section head goes */
function stripeSection(rs, o = {}){
  const added = [...store().docs.map(d => ({n:d.n, m:d.m, st:'review'})), ...rs.flatMap(r => (r.docs || []).map(d => ({n:d, m:r.n, st:'review'})))];
  const all = [...added, ...KARI_DOCS2], done = all.filter(d => d.st === 'done').length, rev = all.length - done;
  const art = id => `<div class="st-body"><span class="st-art" aria-hidden="true">${catArt(id)}</span></div>`;
  const ledger = o.ledger ? `<div class="st-areas" id="ledger">${tableHTML([...rs].sort(bySpend), {form:'grouped', foot:true, head:'All your purchasing areas', headSub:SRC})}</div>` : '';
  return `<section class="nc-sec ${o.ledger ? 'nc-sec-follow' : 'st-sec'}">${o.ledger ? '' : secHead('Since your last visit', 'Last visit 30 Sep.')}<div class="st-grid">${ledger}
    ${tile({h:'Expiring', tag:'1 Jan 2027', v:'Lyreco Erhverv', cmp:'Office supplies · 14.100 kr. saved this year', body:art('off'), act:'Renew'})}
    ${tile({h:'Ready to review', tag:'12 Oct', v:'296.000<small>kr.</small>', cmp:'Tools & workwear · read from your Q2 export', body:art('tool'), act:'Review', go:'row:tool'})}
    ${tile({h:'New agreements', tag:'11 Oct', v:'3', cmp:'Negotiated, tagged New below',
      body:`<ul class="st-rows">${NEW_AGRS.map(g => `<li><span class="st-logo"><img src="../../../assets/company-logos/${g.logo}@64px.png" alt="" loading="lazy"></span><span class="t"><b>${esc(g.n)}</b><span>${esc(g.a)}</span></span></li>`).join('')}</ul>`,
      act:'See agreements', go:'agrs'})}
    ${tile({h:'Your documents', tag:`${all.length}`, cls:'span2', attr:' data-docs',
      body:`<ul class="dc-list">${all.map(d => `<li>${DOC_I}<span class="dc-t"><span class="dc-n">${esc(d.n)}</span><span class="dc-m">${esc(d.m)}</span></span>${docStat(d.st)}</li>`).join('')}</ul>`,
      foot:`${done} reviewed${rev ? ` · ${rev} in review` : ''}`})}
    <article class="st-tile drop"><label class="dz" data-drop="*">${DZ_ART}<span class="dz-t"><b>Drop reports or contracts</b><span>PDF, Excel or CSV</span></span>
      <input type="file" multiple accept=".pdf,.xls,.xlsx,.csv" data-file="*"></label></article>
  </div></section>`;
}
/* V8 and V11: the ledger as the hero's fourth element, a grid item spanning the cards' row */
const trayHTML = (rs, form) => `<div class="ov-ledger">${form === 'grouped'
  ? tableHTML([...rs].sort(bySpend), {form:'grouped', foot:true, head:'All your purchasing areas'})
  : tableHTML([...rs].sort(bySpend), {form:'tray'})}</div>`;

/* ---------- the page ---------- */
const $ = s => document.querySelector(s), $$ = s => Array.from(document.querySelectorAll(s));
function galBar(){
  const i = VERSIONS.indexOf(V), prev = VERSIONS[i - 1], next = VERSIONS[i + 1];
  const pad = k => String(k).padStart(2, '0');
  const L = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M15 6l-6 6 6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const R = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  return `<a href="index.html">CFO overview · v1</a><span>/</span><span class="gal-v">V${V.k} · ${V.n}<em>${V.t}</em></span><span class="sp"></span>
    <button type="button" data-reset>Reset reviews</button>
    <span class="gal-nav">${prev ? `<a href="v${pad(prev.k)}.html" aria-label="Previous version">${L}</a>` : `<span>${L}</span>`}${next ? `<a href="v${pad(next.k)}.html" aria-label="Next version">${R}</a>` : `<span>${R}</span>`}</span>`;
}
function pageHTML(){
  const rs = rows();
  return V.layout.map(b => {
    if(b === 'hero') return PARTS.hero;
    if(b === 'acts') return actsSection(rs);
    if(b === 'one') return ledgerSection(rs, {form:'one'});
    if(b === 'one-lead') return ledgerSection(rs, {form:'one', lead:true});
    if(b === 'one-sort') return ledgerSection(rs, {form:'one', sort:true, trend:true});
    if(b === 'facts') return ledgerSection(rs, {form:'facts'});
    if(b === 'grouped') return ledgerSection(rs, {form:'grouped', key:true});
    if(b === 'grouped-plain') return ledgerSection(rs, {form:'grouped'});
    if(b === 'bar') return barSection(rs);
    if(b.startsWith('bento:')) return bentoSection(rs, b.slice(6));
    if(b === 'stripe') return stripeSection(rs);
    if(b === 'stripe:ledger') return stripeSection(rs, {ledger:true});
    if(b === 'agrs') return PARTS.agrs;
    return '';
  }).join('');
}
function render(){
  const y = window.scrollY;
  $('#root').innerHTML = PARTS.hello + pageHTML();
  if(V.tray) $('#root .nc-ov-grid').insertAdjacentHTML('beforeend', trayHTML(rows(), V.tray));
  /* the hero's card count, as she last left it */
  const cols = localStorage.getItem(KEY + ':cols') || '2';
  const grid = $('#root .nc-ov-grid'); if(grid){ grid.classList.toggle('is-pair', cols === '2'); grid.classList.toggle('is-trio', cols === '3'); }
  $$('#root [data-ov-cols]').forEach(b => b.setAttribute('aria-pressed', b.dataset.ovCols === cols));
  window.scrollTo(0, y);
}
/* a keystroke moves the row's saving, its status and the totals, without rebuilding what she is typing in */
function live(id){
  const rs = rows(), r = rs.find(q => q.id === id); if(!r) return;
  $$(`[data-save="${id}"]`).forEach(el => el.innerHTML = saveHTML(r));
  $$(`[data-st="${id}"]`).forEach(el => el.innerHTML = stHTML(r, V.layout.includes('one-sort')));
  $$(`[data-act="save"][data-id="${id}"],[data-act="send"][data-id="${id}"]`).forEach(b => b.disabled = !r.can);
  const t = totals(rs);
  $$('[data-tot="save"]').forEach(el => el.innerHTML = saveTot(t));
  $$('[data-tot="spend"]').forEach(el => el.innerHTML = el.closest('.sp-tb.b') ? mixed(t.sp, t.spLo, t.spHi, t.spEst, false, '') : spendTot(t));
  $$('[data-tot="spend-stack"]').forEach(el => el.innerHTML = `${fmt(t.thru + t.sp)}${t.spEst ? `<span class="fig-est">${band(t.spLo, t.spHi)}</span>` : ''}`);
  const ru = $('[data-rollup]'); if(ru) ru.innerHTML = rollupHTML(rs);
}
function goRow(id){
  OPEN = id; render();
  let d = $(`details[data-row="${id}"]`);
  /* the row is below the fold of four: open the rest to reach it */
  if(!d && !SHOW_ALL){ setAll(true); render(); d = $(`details[data-row="${id}"]`); }
  if(!d) return;
  d.scrollIntoView({block:'center', behavior:'smooth'});
  const inp = d.querySelector(`input[data-live="${id}"]`); if(inp) inp.focus({preventScroll:true});
}
function act(kind, id){
  const r = rows().find(q => q.id === id); if(!r) return;
  const st = store(), supIn = $(`[data-sup="${id}"]`);
  const sup = supIn ? supIn.value.trim() : (rev(id).sup || '');
  const write = () => {
    const v = {...rev(id), sup};
    const typed = TYPED[id];
    if(typed != null){ if(Math.abs(typed - r.amt) < 1 && !r.isTuned && r.exact) delete v.tuned; else v.tuned = typed; }
    st.review[id] = v; delete TYPED[id];
  };
  if(kind === 'save') write();
  else if(kind === 'send'){ write(); st.reqs.push({id, when:Date.now()}); }
  else if(kind === 'skip'){ st.review[id] = {...rev(id), skip:true}; delete TYPED[id]; }
  else if(kind === 'undo'){ const v = {...rev(id)}; delete v.skip; st.review[id] = v; }
  else if(kind === 'withdraw'){ st.reqs = st.reqs.filter(q => q.id !== id); }
  save();
  if(kind === 'skip' || kind === 'send'){ OPEN = null; FOCUS = null; }
  render();
}
function addFiles(id, files){
  const names = Array.from(files || []).map(f => f.name).filter(Boolean); if(!names.length) return;
  const st = store();
  if(id === '*') names.forEach(n => st.docs.push({n, m:'Just now'}));
  else { const v = rev(id); st.review[id] = {...v, docs:[...(v.docs || []), ...names]}; OPEN = id; }
  save(); render();
}

/* ---------- wiring ---------- */
document.addEventListener('input', e => {
  const inp = e.target.closest('input[data-live]'); if(!inp) return;
  const id = inp.dataset.live, d = inp.value.replace(/[^\d]/g, '');
  if(!d) delete TYPED[id]; else TYPED[id] = +d;
  live(id);
});
document.addEventListener('change', e => {
  const f = e.target.closest('input[data-file]'); if(f){ addFiles(f.dataset.file, f.files); return; }
  const inp = e.target.closest('input[data-live]'); if(!inp) return;
  const d = inp.value.replace(/[^\d]/g, ''); if(d) inp.value = fmt(+d);
});
document.addEventListener('keydown', e => { if(e.key === 'Enter' && e.target.closest('summary input')) e.preventDefault(); });
document.addEventListener('click', e => {
  if(e.target.closest('summary .sp-in, summary .sp-stc')) e.preventDefault();
  if(e.target.closest('[data-docs-all]')){ document.getElementById('docsDlg')?.showModal(); return; }
  const dx = e.target.closest('[data-dlg-close]'); if(dx){ dx.closest('dialog').close(); return; }
  if(e.target.matches('dialog.dlg[open]')){ e.target.close(); return; }
  const a = e.target.closest('[data-act]'); if(a){ e.preventDefault(); act(a.dataset.act, a.dataset.id); return; }
  const g = e.target.closest('[data-go]'); if(g){ goRow(g.dataset.go); return; }
  if(e.target.closest('[data-next]')){ const r = todoOf(rows()).sort(bySpend)[0]; if(r) goRow(r.id); return; }
  const rv = e.target.closest('[data-review]'); if(rv){ FOCUS = rv.dataset.review; OPEN = null; render();
    const c = $('[data-next-card]'); if(c){ c.scrollIntoView({block:'center', behavior:'smooth'}); const i = c.querySelector('input[data-live]'); if(i) i.focus({preventScroll:true}); } return; }
  const oc = e.target.closest('[data-ov-cols]'); if(oc){ localStorage.setItem(KEY + ':cols', oc.dataset.ovCols); render(); return; }
  const so = e.target.closest('[data-sort]'); if(so){ SORT = so.dataset.sort; sessionStorage.setItem(KEY + ':sort', SORT); render(); return; }
  if(e.target.closest('[data-ab-toggle]')){ BAR_OPEN = !BAR_OPEN; sessionStorage.setItem(KEY + ':bar', BAR_OPEN ? '1' : '0'); render(); return; }
  if(e.target.closest('[data-all]')){ setAll(!SHOW_ALL); render(); return; }
  const sv = e.target.closest('[data-sv]'); if(sv){
    const go = sv.dataset.sv;
    if(go.startsWith('row:')) goRow(go.slice(4));
    else if(go === 'docs'){ const d = $('[data-docs]'); if(d) d.scrollIntoView({block:'center', behavior:'smooth'}); }
    else if(go === 'agrs'){ const a = $('.agr-brand-row'); if(a) a.closest('section').scrollIntoView({block:'start', behavior:'smooth'}); }
    return; }
  if(!e.target.closest('.ag-dd')) $$('details.ag-dd[open]').forEach(d => d.open = false);
  const sc = e.target.closest('[data-ascroll]'); if(sc){ const row = $('#' + sc.getAttribute('aria-controls')); if(row) row.scrollBy({left:(+sc.dataset.ascroll) * row.clientWidth * .8, behavior:'smooth'}); return; }
  if(e.target.closest('[data-reset]')){ localStorage.removeItem(KEY); sessionStorage.clear(); location.reload(); return; }
});
document.addEventListener('toggle', e => {
  const d = e.target.closest('details[data-row]'); if(!d) return;
  if(d.open) OPEN = d.dataset.row; else if(OPEN === d.dataset.row) OPEN = null;
}, true);
document.addEventListener('dragover', e => { const z = e.target.closest('.sp-drop'); if(!z || z.classList.contains('ro')) return; e.preventDefault(); z.classList.add('over'); });
document.addEventListener('dragleave', e => { const z = e.target.closest('.sp-drop'); if(z) z.classList.remove('over'); });
document.addEventListener('drop', e => { const z = e.target.closest('.sp-drop'); if(!z || z.classList.contains('ro')) return; e.preventDefault(); z.classList.remove('over'); addFiles(z.dataset.drop, e.dataTransfer.files); });

$('#gal').innerHTML = galBar();
document.title = `CFO overview · V${V.k} · ${V.n}`;
render();
