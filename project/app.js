/* Requirement Gathering Prototype — shell + page engine.
   Pages register declaratively in pages-a.js / pages-b.js via RGP.define(def).
   Plain JS, no build step. Opens via file:// (double-click index.html). */
(function () {
  "use strict";
  const RGP = (window.RGP = window.RGP || {});

  /* ---------------- constants ---------------- */
  const ORDER = ["idea-understanding", "opportunity", "problem-discovery", "solution-discovery", "business-model",
    "product-definition", "requirements", "documents", "review", "handoff"];
  const META = {
    "idea-understanding": { num: "01", title: "Idea Understanding", brief: "Idea Brief", blurb: "Turn the raw idea and notes into a clear Idea Brief." },
    opportunity: { num: "02", title: "Opportunity & Discovery", brief: "Market & Industry Brief", blurb: "Frame the opportunity, research the market, pick the primary customer." },
    "problem-discovery": { num: "03", title: "Problem Discovery", brief: "Problem Statement", blurb: "Find root causes and agree on one problem statement." },
    "solution-discovery": { num: "04", title: "Solution Discovery", brief: "Solution Brief", blurb: "Compare options against root causes and select one." },
    "business-model": { num: "05", title: "Business Model", brief: "Business Model", blurb: "Canvas, business case, user-entered figures, risks, feasibility." },
    "product-definition": { num: "06", title: "Product Definition", brief: "Product Brief", blurb: "Vision, users, scope, features, experience and success metrics." },
    requirements: { num: "07", title: "Requirements", brief: "Requirements Baseline", blurb: "Traceable requirements, approved into one baseline." },
    documents: { num: "08", title: "Documents", brief: "Document Set", blurb: "BRD, PRD and SRS generated from the one baseline." },
    review: { num: "09", title: "Review", brief: "Review Approval", blurb: "Consistency, traceability and coverage checks. Approve the set." },
    handoff: { num: "10", title: "Handoff", brief: "Handoff Package", blurb: "Package everything for the delivery team." },
  };
  const PROJECT = "Expense Claims for Field Sales Teams";
  const SEED_IDEA = "Our field sales reps lose paper receipts and wait weeks for expense reimbursement because claims are handled through email and approved manually. I want reps to capture receipts on their phone and get claims approved faster.";
  const DOC = {
    name: "expense-process-notes.pdf",
    facts: ["Line managers approve every claim before finance", "Finance re-keys approved claims into SAP Concur", "Claims must follow the company expense policy"],
  };
  RGP.ORDER = ORDER; RGP.META = META; RGP.SEED_IDEA = SEED_IDEA; RGP.DOC = DOC;
  const DEFS = (RGP.DEFS = {});
  RGP.define = (def) => { DEFS[def.id] = Object.assign({}, META[def.id], def); };

  /* ---------------- helpers ---------------- */
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const $ = (sel, root) => (root || document).querySelector(sel);
  const clone = (o) => JSON.parse(JSON.stringify(o));
  let _n = 0;
  const nid = (p) => (p || "id") + "_" + Date.now().toString(36) + (++_n).toString(36);
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* ignore */ } },
    del(k) { try { localStorage.removeItem(k); } catch (e) { /* ignore */ } },
  };
  const P = (d) => `<svg class="i" viewBox="0 0 24 24" aria-hidden="true">${d}</svg>`;
  const I = {
    check: P('<path d="M5 12.5l4.5 4.5L19 7.5"/>'),
    x: P('<path d="M6 6l12 12M18 6L6 18"/>'),
    edit: P('<path d="M4 20h4L19 9l-4-4L4 16v4z"/>'),
    chev: P('<path d="M9 6l6 6-6 6"/>'),
    lock: P('<rect x="5" y="11" width="14" height="9"/><path d="M8 11V8a4 4 0 018 0v3"/>'),
    plus: P('<path d="M12 5v14M5 12h14"/>'),
    refresh: P('<path d="M20 11a8 8 0 10-2.3 5.7M20 5v6h-6"/>'),
    arrow: P('<path d="M5 12h14M13 6l6 6-6 6"/>'),
    back: P('<path d="M19 12H5M11 6l-6 6 6 6"/>'),
    file: P('<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4"/>'),
    alert: P('<path d="M12 4l9 16H3z"/><path d="M12 10v4M12 17v.5"/>'),
    pause: P('<path d="M9 6v12M15 6v12"/>'),
    undo: P('<path d="M9 7L4 12l5 5"/><path d="M4 12h10a6 6 0 010 12"/>'),
    down: P('<path d="M12 4v12M6 10l6 6 6-6M5 20h14"/>'),
    menu: P('<path d="M4 7h16M4 12h16M4 17h16"/>'),
    spark: P('<path d="M12 3v6M12 15v6M3 12h6M15 12h6"/>'),
    trash: P('<path d="M5 7h14M10 7V4h4v3M7 7l1 13h8l1-13"/>'),
  };
  /* text line: {id, t, o(origin), ol(label), q(source quote), s(source url)} */
  const ln = (t, o, extra) => Object.assign({ id: nid("l"), t, o: o || "ai" }, extra || {});
  /* user-override setter: keeps user changes through "Update from vX" */
  const uset = (item, k, v) => { item[k] = v; (item.u = item.u || {})[k] = v; };
  const getAt = (obj, path) => path.split(".").reduce((a, k) => (a == null ? a : a[k]), obj);
  const setAt = (obj, path, v) => { const ks = path.split("."); let o = obj; ks.slice(0, -1).forEach((k) => { if (o[k] == null || typeof o[k] !== "object") o[k] = {}; o = o[k]; }); o[ks[ks.length - 1]] = v; };
  Object.assign(RGP, { esc, wait, $, clone, nid, store, I, ln, uset, getAt, setAt });

  const ORIGINS = {
    idea: ["o-up", "From your idea"], up: ["o-up", "From upstream"], doc: ["o-doc", "From your document"], src: ["o-src", "Source-backed"],
    ai: ["o-ai", "AI inferred"], as: ["o-as", "Working assumption"], ans: ["o-ans", "From your answer"], ed: ["o-ed", "Edited by you"],
    acc: ["o-ed", "Accepted by you"], own: ["o-ed", "Added by you"], na: ["o-na", "Not known yet"], aip: ["o-ai", "AI perspective"],
    sug: ["o-ai", "AI suggestion"], est: ["o-ai", "AI estimate"], you: ["o-ed", "Set by you"],
  };
  const originTag = (o, label, q) => { const m = ORIGINS[o] || ORIGINS.ai; return `<span class="origin ${m[0]}"${q ? ` title="${esc("“" + q + "”")}"` : ""}>${esc(label || m[1])}</span>`; };
  RGP.originTag = originTag;

  /* ---------------- persisted page state + chain logic ---------------- */
  const BASE = { stage: "empty", d: null, dec: {}, ans: {}, f: {}, ver: 0, status: "draft", upV: 0, hist: [] };
  const key = (id) => `rgp.${id}.v1`;
  const readPage = (id) => Object.assign(clone(BASE), store.get(key(id), {}));
  const parentOf = (id) => { const i = ORDER.indexOf(id); return i > 0 ? ORDER[i - 1] : null; };
  function usable(id) {
    const s = readPage(id);
    if (s.status !== "confirmed") return false;
    const p = parentOf(id);
    if (!p) return true;
    return usable(p) && s.upV === readPage(p).ver;
  }
  function pageStatus(id) {
    const s = readPage(id), p = parentOf(id);
    if (s.stage === "empty" && s.ver === 0) return !p || usable(p) ? { label: "Start", cls: "" } : { label: "Locked", cls: "ghost" };
    if (p) {
      if (!usable(p)) return { label: "Paused", cls: "warn" };
      if (s.upV !== readPage(p).ver) return { label: "Outdated", cls: "warn" };
    }
    if (s.status === "confirmed") return { label: "v" + s.ver + ".0", cls: "ok" };
    return { label: "Draft", cls: "draft" };
  }
  const verLabel = (s) => (s.status === "confirmed" ? `v${s.ver}.0` : s.ver === 0 ? "Draft v0.1" : `Draft v${s.ver + 1}.0`);
  const out = (id) => { const d = DEFS[id]; const s = readPage(id); return d && s.d ? d.out(s) : null; };
  Object.assign(RGP, { readPage, parentOf, usable, pageStatus, verLabel, out });

  /* ---------------- shell ---------------- */
  const root = () => document.body.dataset.root || ".";
  const href = (id) => (id === "index" ? `${root()}/index.html` : `${root()}/pages/${id}.html`);
  RGP.href = href;
  let saveState = "saved";
  function paintSave(st) {
    if (st) saveState = st;
    const el = $("#savestate");
    if (!el) return;
    el.className = "savestate " + (saveState === "saving" ? "saving" : "");
    el.innerHTML = `<span class="dot"></span>${saveState === "saving" ? "Saving…" : "Saved just now"}`;
  }
  function renderShell(page) {
    const top = $("#topbar"), side = $("#sidenav");
    if (top) {
      top.innerHTML = `<button class="icon-btn menu-btn" data-shell="menu" aria-label="Menu">${I.menu}</button>
        <a class="brand" href="${href("index")}"><span class="brand-mark">SB</span>Solution Builder</a>
        <span class="proj">${esc(PROJECT)}</span><span class="spacer"></span>
        <span class="savestate" id="savestate"></span>`;
      paintSave();
    }
    if (side) {
      side.innerHTML = `<div class="eyebrow">Requirement gathering</div>
        <a class="nav-item ${page === "index" ? "on" : ""}" href="${href("index")}"><span class="nav-num">··</span><span class="nav-label">Overview</span></a>
        ${ORDER.map((id) => { const st = pageStatus(id); return `<a class="nav-item ${page === id ? "on" : ""} ${st.label === "Locked" ? "locked" : ""}" href="${href(id)}">
          <span class="nav-num">${META[id].num}</span><span class="nav-label">${esc(META[id].title)}</span><span class="pill ${st.cls}">${st.label}</span></a>`; }).join("")}
        <div class="nav-foot"><button class="btn-link" data-shell="reset">Reset prototype</button></div>`;
    }
  }
  RGP.renderShell = renderShell;
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-shell]");
    if (!b) return;
    if (b.dataset.shell === "menu") document.body.classList.toggle("nav-open");
    if (b.dataset.shell === "reset" && confirm("Clear all prototype data on this device?")) {
      ORDER.forEach((id) => store.del(key(id)));
      location.href = href("index");
    }
  });

  /* demo fast-forward: build + accept suggestions + confirm pages [0, upto) */
  RGP.autofill = function (upto) {
    ORDER.forEach((id, i) => { if (i >= upto) store.del(key(id)); });
    for (let i = 0; i < upto; i++) {
      const id = ORDER[i], def = DEFS[id];
      if (!def) break;
      const S = clone(BASE);
      if (def.demoInput) S.f = def.demoInput();
      S.d = def.build({ S, out });
      const p = parentOf(id);
      S.upV = p ? readPage(p).ver : 0;
      const dctx = { S, out, U: {}, d: S.d, ro: false };
      if (def.derive) def.derive(dctx);
      if (def.demo) def.demo(dctx); else if (def.suggest) def.suggest(dctx);
      if (def.derive) def.derive(dctx);
      S.stage = "ready"; S.ver = 1; S.status = "confirmed";
      S.hist = [{ v: "v1.0", at: Date.now(), note: "Confirmed (sample data)" }];
      store.set(key(id), S);
    }
  };

  /* ---------------- shared renderers (use RGP.cur) ---------------- */
  const H = (RGP.H = {});
  RGP.cur = { S: null, U: {}, ro: false };
  const C = () => RGP.cur;

  H.origin = (it) => originTag(it.o, it.ol, it.q);
  H.line = function (it, path, opts) {
    opts = opts || {};
    const c = C(), k = `${path}#${it.id}`, editing = c.U.edit === k && !c.ro;
    const txt = editing
      ? `<textarea class="inline-edit" data-edit="${esc(k)}">${esc(it.t)}</textarea><div class="edit-hint">Enter to save · Esc to cancel</div>`
      : `<div class="txt" ${c.ro ? "" : `data-act="edit" data-key="${esc(k)}" style="cursor:text"`}>${opts.num ? `<span class="mono muted">[${opts.num}]</span> ` : ""}${esc(it.t)}${it.cite ? it.cite.map((n) => `<span class="cite">[${n}]</span>`).join("") : ""}</div>`;
    const acts = c.ro || editing ? "" : `<div class="acts">
        ${it.o === "ai" || it.o === "sug" ? `<button class="btn btn-sm" data-act="accept" data-path="${path}" data-id="${it.id}" title="Accept">${I.check}Accept</button>` : ""}
        <button class="icon-btn" data-act="edit" data-key="${esc(k)}" title="Edit">${I.edit}</button>
        ${opts.off ? `<button class="icon-btn" data-act="toggle-off" data-path="${path}" data-id="${it.id}" title="${it.off ? "Restore" : esc(opts.off)}">${it.off ? I.undo : I.x}</button>` : ""}
        ${it.own ? `<button class="icon-btn" data-act="del" data-path="${path}" data-id="${it.id}" title="Remove">${I.trash}</button>` : ""}
      </div>`;
    const kk = opts.k || it.k;
    return `<div class="item ${it.off ? "off" : ""}">${kk ? `<div class="k">${esc(kk)}</div>` : ""}<div class="body">${txt}
      <div class="meta">${H.origin(it)}${it.s ? `<a class="srcl" href="https://${esc(it.s)}" target="_blank" rel="noopener">${esc(it.s)}</a>` : ""}${it.off ? `<span class="muted" style="font-size:12px">${esc(opts.offShown || "Marked not relevant")}</span>` : ""}${opts.extra ? opts.extra(it) : ""}</div>
      ${it.q && opts.quote ? `<div class="quote">“${esc(it.q)}”</div>` : ""}</div>${acts}</div>`;
  };
  H.lines = function (path, opts) {
    opts = opts || {};
    const c = C(), list = getAt(c.S.d, path) || [];
    let n = 0;
    const rows = list.map((it) => H.line(it, path, Object.assign({}, opts, { num: opts.number && !it.off ? ++n : null }))).join("");
    const add = opts.add && !c.ro ? H.addRow(path, opts.add, opts.addOrigin) : "";
    return `<div class="items">${rows || `<div class="muted" style="padding:6px 0">Nothing yet.</div>`}</div>${add}`;
  };
  H.addRow = (path, ph, origin) => `<div class="add-row"><input class="txt" data-add="${esc(path)}" data-origin="${origin || "own"}" placeholder="${esc(ph)}"><button class="btn btn-sm" data-act="add" data-path="${esc(path)}">${I.plus}Add</button></div>`;
  H.text = function (path, opts) { // single editable line object at path
    const it = getAt(C().S.d, path);
    return it ? H._single(it, path, opts || {}) : "";
  };
  H._single = function (it, path, opts) {
    const c = C(), k = `${path}#`, editing = c.U.edit === k && !c.ro;
    return `<div class="item"><div class="body">${editing
      ? `<textarea class="inline-edit" data-edit="${esc(k)}" style="min-height:${opts.tall ? 110 : 70}px">${esc(it.t)}</textarea><div class="edit-hint">Enter to save · Esc to cancel</div>`
      : `<div class="txt" style="${opts.big ? "font-size:15.5px;font-weight:500;line-height:1.55;" : ""}${c.ro ? "" : "cursor:text"}" ${c.ro ? "" : `data-act="edit" data-key="${esc(k)}"`}>${esc(it.t)}</div>`}
      <div class="meta">${H.origin(it)}${opts.extra || ""}</div></div>
      ${c.ro || editing ? "" : `<div class="acts">${opts.another ? `<button class="btn btn-sm" data-act="${opts.another}">${I.refresh}Another version</button>` : ""}<button class="icon-btn" data-act="edit" data-key="${esc(k)}" title="Edit">${I.edit}</button></div>`}</div>`;
  };
  H.chips = function (qid, opts, sug) {
    const c = C(), v = c.S.ans[qid];
    return `<div class="chips">${opts.map((o) => `<button class="chip ${v === o ? "on" : ""}" ${c.ro ? "disabled" : ""} data-act="answer" data-q="${esc(qid)}" data-v="${esc(o)}">${esc(o)}${sug === o ? `<span class="sg">Suggested</span>` : ""}</button>`).join("")}</div>`;
  };
  H.choice = function (key, id, inner, cls) {
    const c = C(), on = c.S.dec[key] === id;
    return `<button class="choice ${on ? "on" : ""} ${cls || ""}" ${c.ro ? "disabled" : ""} data-act="pick" data-key="${esc(key)}" data-v="${esc(id)}"><span class="radio"></span>${inner}</button>`;
  };
  H.cycle = (path, id, field, vals, cls, label, mark) => `<button class="${cls}" ${C().ro ? "disabled" : ""} data-act="cycle" data-path="${esc(path)}" data-id="${esc(id || "")}" data-field="${field}" data-vals="${vals.join(",")}"${mark ? ` data-mark="${mark}"` : ""}>${esc(label)}</button>`;
  H.bind = (path, val, attrs) => `<input class="${(attrs && attrs.cls) || "txt"}" data-bind="${esc(path)}" value="${esc(val == null ? "" : val)}" ${C().ro ? "disabled" : ""} ${(attrs && attrs.extra) || ""}>`;
  H.row = (k, v) => { const arr = Array.isArray(v); const empty = v == null || v === "" || (arr && !v.length); return { k, v: empty ? "Not provided" : v, na: empty }; };
  H.rateCls = (r) => ({ High: "H", Medium: "M", Low: "L" }[r] || "");
  H.on = (list) => (list || []).filter((x) => !x.off);

  /* ---------------- page controller ---------------- */
  function mountPage(def, main) {
    const id = def.id, parent = parentOf(id), next = ORDER[ORDER.indexOf(id) + 1];
    const S = readPage(id);
    if (S.stage === "working") S.stage = S.d ? "ready" : "empty";
    if (def.initInput && !S.f._init) Object.assign(S.f, def.initInput(), { _init: 1 });
    const U = { open: {}, edit: null, flash: null, showWork: false, chip: null, rail: 0, panelX: false };
    let timer = null;

    const upS = () => (parent ? readPage(parent) : null);
    const paused = () => !!parent && S.stage !== "empty" && !usable(parent);
    const outdated = () => !!parent && S.stage !== "empty" && usable(parent) && S.upV !== upS().ver;
    const gated = () => !!parent && S.stage === "empty" && !usable(parent);
    const locked = () => S.status === "confirmed";
    const readOnly = () => locked() || paused() || outdated();
    const ctx = () => ({ S, U, out, ro: readOnly(), d: S.d });

    function save() {
      paintSave("saving");
      clearTimeout(timer);
      timer = setTimeout(() => { store.set(key(id), S); paintSave("saved"); renderShell(id); }, 450);
    }
    function set(patch, scrollId) {
      if (patch) Object.assign(S, patch);
      save(); render();
      if (scrollId) scrollTo(scrollId);
    }
    function scrollTo(elId) {
      requestAnimationFrame(() => { const el = document.getElementById(elId); if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 76, behavior: "smooth" }); });
    }
    const todos = () => (S.d && def.todo ? def.todo(ctx()) : []);
    const railOf = () => (typeof def.rail === "function" ? def.rail(ctx()) : def.rail) || ["Reading the starting point", "Drafting", "Checking sources"];
    const canConfirm = () => S.stage === "ready" && !readOnly() && todos().length === 0;

    /* ---------- render pieces ---------- */
    function head() {
      const st = { cls: paused() || outdated() ? "warn" : "" };
      return `<div class="phead"><div><div class="eyebrow">Step ${def.num} of 10</div><h1>${esc(def.title)}</h1><p class="intro">${esc(def.intro || def.blurb)}</p></div>
        <div class="right">${S.stage !== "empty" ? `<span class="pill ${st.cls === "warn" ? "warn" : S.status === "confirmed" ? "ok" : "draft"}">${esc(def.brief)} · ${verLabel(S)}</span>` : ""}</div></div>`;
    }
    function notices() {
      let h = "";
      if (U.flash) h += `<div class="notice notice-ok">${I.check}<div class="grow">${U.flash}</div><button class="icon-btn" data-act="flash-x">${I.x}</button></div>`;
      if (paused()) {
        const ps = upS();
        h += `<div class="notice">${I.pause}<div class="grow"><b>Paused.</b> ${esc(META[parent].brief)} is being changed${ps.status === "draft" && ps.ver > 0 ? ` (${verLabel(ps)})` : ""}. This page is read-only until it is confirmed again.</div><a class="btn btn-sm" href="${href(parent)}">Open ${esc(META[parent].title)}</a></div>`;
      } else if (outdated()) {
        const ps = upS();
        h += `<div class="notice">${I.alert}<div class="grow"><b>Outdated.</b> ${esc(META[parent].brief)} is now v${ps.ver}.0 (this page was built from v${S.upV}.0). Updating rebuilds derived content and keeps your edits, additions and decisions${S.status === "confirmed" ? `; this page returns to draft as v${S.ver + 1}.0 and v${S.ver}.0 stays in history` : ""}.</div><button class="btn btn-sm btn-primary" data-act="update">${I.refresh}Update from v${ps.ver}.0</button></div>`;
      }
      return h;
    }
    function startStrip() {
      const uses = (def.uses || []).filter((u) => readPage(u).ver > 0);
      if (!uses.length) return "";
      const chip = U.chip && DEFS[U.chip] ? (() => { const s = readPage(U.chip); const c2 = { S: s, U: {}, out, ro: true, d: s.d }; const rows = DEFS[U.chip].rows(c2); return `<div class="start-detail"><div class="eyebrow" style="margin-bottom:6px">${esc(META[U.chip].brief)} · v${s.ver}.0 · read-only</div>${briefRows(rows.slice(0, 8))}</div>`; })() : "";
      return `<div class="start"><span class="lbl">Starting point</span>${uses.map((u) => `<button class="chip-up ${U.chip === u ? "on" : ""}" data-act="chip" data-v="${u}">${esc(META[u].brief)} <span class="v">v${readPage(u).ver}.0</span></button>`).join("")}<span class="muted" style="font-size:12px">Reused, not re-asked</span></div>${chip}`;
    }
    function briefRows(rows) {
      return rows.map((r) => `<div class="brief-row ${r.wide ? "wide" : ""}"><div class="eyebrow">${esc(r.k)}</div>${Array.isArray(r.v) ? `<ul>${r.v.map((x) => `<li>${x && x.html ? x.html : esc(x)}</li>`).join("")}</ul>` : `<div class="v ${r.na ? "na" : ""}">${r.html ? r.v : esc(r.v)}</div>`}</div>`).join("");
    }
    function gate() {
      return `<div class="gate"><div class="lock">${I.lock}</div><h2>Confirm the ${esc(META[parent].brief)} first</h2>
        <p class="muted">${esc(def.title)} starts from the confirmed ${esc(META[parent].brief)} so nothing is asked twice. ${readPage(parent).ver > 0 ? "It is currently being changed or is out of date." : "It hasn't been confirmed yet."}</p>
        <div class="gen-row"><a class="btn btn-primary" href="${href(parent)}">Go to ${esc(META[parent].title)} ${I.arrow}</a>
        <button class="btn" data-act="demo">Fill steps 01–${META[parent].num} with sample data</button></div></div>`;
    }
    function genStage() {
      const ok = !def.canGenerate || def.canGenerate(ctx());
      return `<div class="gen">${def.input ? def.input(ctx()) : `<div><h2>${esc(def.genTitle || def.title)}</h2><p class="muted" style="margin-top:4px">${esc(def.genText || "")}</p></div>`}
        ${def.youGet ? `<div><div class="eyebrow" style="margin-bottom:8px">One step drafts all of this — you review and decide</div><div class="what-you-get">${def.youGet.map((x) => `<span>${esc(x)}</span>`).join("")}</div></div>` : ""}
        <div class="gen-row"><button class="btn btn-primary btn-lg" data-act="gen" ${ok ? "" : "disabled"}>${I.spark}${esc(def.genLabel || "Draft")}</button>${def.genHint ? `<span class="muted" style="font-size:12.5px">${esc(def.genHint(ctx()) || "")}</span>` : ""}</div></div>`;
    }
    function working() {
      const steps = railOf();
      return `<div class="gen"><div><h2>${esc(def.genLabel || "Drafting")}…</h2><p class="muted" style="margin-top:4px">Simulated AI step — deterministic output, no invented figures.</p></div>
        <div class="rail">${steps.map((s, i) => `<div class="rail-step ${i < U.rail ? "done" : i === U.rail ? "on" : ""}"><span class="b">${i < U.rail ? I.check : ""}</span>${esc(s)}</div>`).join("")}</div>
        <div style="display:grid;gap:8px"><div class="shimmer" style="width:82%"></div><div class="shimmer" style="width:64%"></div><div class="shimmer" style="width:72%"></div></div></div>`;
    }
    function sections() {
      const c = ctx();
      const secs = def.sections.filter((s) => !s.when || s.when(c));
      const tools = `<div class="sec-tools"><button class="btn-link" data-act="expand-all">Expand all</button><button class="btn-link" data-act="collapse-all">Collapse all</button></div>`;
      return tools + secs.map((s, i) => {
        const need = !c.ro && s.need ? s.need(c) : null;
        const open = U.open[s.id] != null ? U.open[s.id] : !!need || i === 0;
        return `<section class="sec ${open ? "open" : ""} ${need ? "need" : ""}" id="sec-${s.id}">
          <div class="sec-h" data-act="toggle-sec" data-sec="${s.id}"><span class="sec-n">${String(i + 1).padStart(2, "0")}</span><span class="sec-t">${esc(s.title)}</span>${need ? `<span class="need-tag">${esc(need)}</span>` : ""}<span class="sec-sum">${esc(s.summary ? s.summary(c) : "")}</span><span class="chev">${I.chev}</span></div>
          <div class="sec-b">${open ? s.render(c) : ""}</div></section>`;
      }).join("");
    }
    function panel() {
      const c = ctx(), t = todos(), rows = def.rows(c);
      const footer = paused() || outdated()
        ? `<div class="hint">${paused() ? "Paused — waiting for upstream" : "Update from upstream to continue"}</div>`
        : locked() ? "" : `${t.length ? `<div class="todo">${t.map((x) => `<button data-act="goto" data-sec="${x.sec}"><span class="dot"></span>${esc(x.t)}</button>`).join("")}</div>${def.suggest ? `<button class="btn btn-block" data-act="suggest">${I.spark}${esc(def.suggestLabel || "Use all AI suggestions")}</button>` : ""}` : `<div class="ready-line">${I.check}Everything decided — ready to confirm</div>`}
          <button class="btn btn-ok btn-block btn-lg" data-act="confirm" ${canConfirm() ? "" : "disabled"}>Confirm ${esc(def.brief)}</button>
          <button class="btn-link mob-brief" data-act="panel-x" style="display:none">${U.panelX ? "Hide" : "View"} ${esc(def.brief)}</button>`;
      return `<aside class="panel ${U.panelX ? "expanded" : ""}"><div class="panel-h"><h3>${esc(def.brief)}</h3><span class="pill draft">${verLabel(S)}</span></div>
        <div class="panel-b">${briefRows(rows)}</div><div class="panel-f">${footer}</div></aside>`;
    }
    function confirmed() {
      const c = ctx(), nx = next ? META[next] : null;
      const hist = S.hist.slice().reverse();
      return `<div class="success"><span class="badge">${I.check}</span><div class="grow"><h2>${esc(def.brief)} confirmed · v${S.ver}.0</h2>
          <p class="muted">${esc(def.handoff ? def.handoff(c) : nx ? `${nx.title} starts from this.` : "")}</p></div>
          <div class="gen-row">${nx ? `<a class="btn btn-primary" href="${href(next)}">Continue to ${esc(nx.title)} ${I.arrow}</a>` : `<a class="btn btn-primary" href="${href("index")}">Back to overview</a>`}
          <button class="btn" data-act="reopen">${I.edit}Reopen to edit</button></div></div>
        ${def.confirmedExtra ? def.confirmedExtra(c) : ""}
        <div class="brief-full"><div class="brief-hero"><div><div class="eyebrow">${esc(def.brief)} · ${esc(PROJECT)}</div><h2>${esc(def.briefTitle ? def.briefTitle(c) : def.brief)}</h2></div><span class="pill ok">v${S.ver}.0</span></div>
          <div class="brief-grid">${briefRows(def.rows(c).map((r) => Object.assign({ wide: Array.isArray(r.v) && r.v.length > 3 }, r)))}</div>
          <div class="history"><span class="eyebrow">History</span>${hist.map((h) => `<span class="pill ${h.v === "v" + S.ver + ".0" ? "ok" : ""}">${esc(h.v)}</span><span>${esc(h.note || "")} ${new Date(h.at).toLocaleDateString()}</span>`).join(" · ")}
          <span class="spacer" style="flex:1"></span><button class="btn-link" data-act="show-work">${U.showWork ? "Hide" : "Show"} the working behind this brief</button></div></div>
        ${U.showWork ? `<div style="margin-top:14px" class="sections">${sections()}</div>` : ""}`;
    }
    function render() {
      RGP.cur = { S, U, ro: readOnly() };
      if (S.d && def.derive) def.derive(ctx());
      let body;
      if (gated()) body = gate();
      else if (S.stage === "empty") body = startStrip() + genStage();
      else if (S.stage === "working") body = startStrip() + working();
      else if (locked() && !paused() && !outdated()) body = notices() + confirmed();
      else body = notices() + startStrip() + `<div class="ws"><div class="sections">${sections()}</div>${panel()}</div>`;
      main.innerHTML = `<div class="page" data-screen-label="${def.num} ${esc(def.title)}">${head()}${body}</div>`;
      if (def.after) def.after(ctx(), main);
      const ta = main.querySelector("textarea.inline-edit");
      if (ta) { ta.focus(); ta.setSelectionRange(ta.value.length, ta.value.length); }
    }

    /* ---------- actions ---------- */
    async function generate() {
      S.stage = "working"; U.rail = 0; render();
      const steps = railOf();
      for (let i = 0; i < steps.length; i++) { await wait(750); U.rail = i + 1; render(); }
      await wait(250);
      S.d = def.build({ S, out });
      S.upV = parent ? upS().ver : 0;
      S.stage = "ready"; U.open = {};
      set(null);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    function countUser(o) { let n = 0; (function walk(x) { if (Array.isArray(x)) x.forEach(walk); else if (x && typeof x === "object") { if (x.u || x.own) n++; Object.values(x).forEach(walk); } })(o); return n; }
    function merge(old, fresh) {
      if (Array.isArray(fresh)) {
        if (!Array.isArray(old)) return fresh;
        const om = new Map(old.filter((x) => x && x.id).map((x) => [x.id, x]));
        const res = fresh.map((f) => { const o = f && f.id && om.get(f.id); return o ? Object.assign(merge(o, f), o.u ? clone(o.u) : {}, o.u ? { u: o.u } : {}) : f; });
        old.forEach((o) => { if (o && o.own && !res.find((r) => r.id === o.id)) res.push(o); });
        return res;
      }
      if (fresh && typeof fresh === "object") {
        if (!old || typeof old !== "object") return fresh;
        const r = {};
        Object.keys(fresh).forEach((k) => { r[k] = merge(old[k], fresh[k]); });
        if (old.u) { Object.assign(r, clone(old.u)); r.u = old.u; }
        return r;
      }
      return fresh;
    }
    function update() {
      const ps = upS(), fromV = S.upV, kept = countUser(S.d);
      S.d = merge(S.d, def.build({ S, out }));
      S.upV = ps.ver;
      if (S.status === "confirmed") { S.status = "draft"; S.hist.push({ v: `v${S.ver}.0`, at: Date.now(), note: "Kept as previous version" }); }
      if (def.onUpdate) def.onUpdate(ctx());
      U.flash = `Updated from ${esc(META[parent].brief)} v${ps.ver}.0 (was v${fromV}.0). Kept ${kept} edit${kept === 1 ? "" : "s"}/addition${kept === 1 ? "" : "s"} and all your decisions. Review, then confirm as v${S.ver + 1}.0.`;
      set(null);
    }
    function confirmBrief() {
      if (!canConfirm()) return;
      S.ver = S.ver + 1; S.status = "confirmed";
      S.hist.push({ v: `v${S.ver}.0`, at: Date.now(), note: "Confirmed" });
      U.flash = null; U.showWork = false;
      set(null); window.scrollTo({ top: 0, behavior: "smooth" });
    }
    const target = (path, idv) => { const x = path ? getAt(S.d, path) : S.d; return idv ? (x || []).find((i) => i.id === idv) : x; };
    function saveEdit(k, val) {
      const [path, idv] = k.split("#");
      const it = target(path, idv);
      val = (val || "").trim();
      if (it && val && val !== it.t) { uset(it, "t", val); if (!it.own) { uset(it, "o", "ed"); uset(it, "ol", "Edited by you"); } if (def.onEdit) def.onEdit(ctx(), path, it); }
      U.edit = null; set(null);
    }

    main.addEventListener("click", (e) => {
      const b = e.target.closest("[data-act]");
      if (!b || b.disabled) return;
      const a = b.dataset.act, ds = b.dataset, ro = readOnly();
      const mutating = !["toggle-sec", "expand-all", "collapse-all", "chip", "goto", "flash-x", "show-work", "reopen", "update", "demo", "panel-x"].includes(a);
      if (U.flash && a !== "flash-x" && mutating) U.flash = null;
      if (def.acts && def.acts[a]) { if (ro && !(def.roActs || []).includes(a)) return; const r = def.acts[a](ctx(), b, { set, render, save, scrollTo }); if (r !== false) set(null); return; }
      switch (a) {
        case "toggle-sec": { const el = b.closest(".sec"); U.open[ds.sec] = !el.classList.contains("open"); render(); return; }
        case "expand-all": def.sections.forEach((s) => (U.open[s.id] = true)); render(); return;
        case "collapse-all": def.sections.forEach((s) => (U.open[s.id] = false)); render(); return;
        case "goto": U.open[ds.sec] = true; U.panelX = false; render(); scrollTo("sec-" + ds.sec); return;
        case "chip": U.chip = U.chip === ds.v ? null : ds.v; render(); return;
        case "flash-x": U.flash = null; render(); return;
        case "panel-x": U.panelX = !U.panelX; render(); return;
        case "show-work": U.showWork = !U.showWork; render(); return;
        case "demo": RGP.autofill(ORDER.indexOf(id)); location.reload(); return;
        case "gen": if (!def.canGenerate || def.canGenerate(ctx())) generate(); return;
        case "confirm": confirmBrief(); return;
        case "reopen": S.status = "draft"; U.flash = `Reopened as ${verLabel(S)}. Pages after this one are paused until you confirm again.`; set(null); return;
        case "update": update(); return;
        case "suggest": def.suggest(ctx()); U.flash = "Applied the AI suggestions. Each one stays labelled — change any of them before confirming."; set(null); return;
      }
      if (ro) return;
      switch (a) {
        case "edit": U.edit = ds.key; render(); return;
        case "accept": { const it = target(ds.path, ds.id); if (it) { uset(it, "o", "acc"); uset(it, "ol", it.o === "sug" ? "Accepted by you" : "Accepted by you"); } set(null); return; }
        case "accept-all": { (target(ds.path) || []).forEach((it) => { if (it.o === "ai" || it.o === "sug") { uset(it, "o", "acc"); uset(it, "ol", "Accepted by you"); } }); set(null); return; }
        case "toggle-off": { const it = target(ds.path, ds.id); if (it) uset(it, "off", !it.off); set(null); return; }
        case "del": { const list = target(ds.path); const i = list.findIndex((x) => x.id === ds.id); if (i > -1) list.splice(i, 1); set(null); return; }
        case "add": {
          const inp = main.querySelector(`[data-add="${CSS.escape(ds.path)}"]`);
          const v = inp && inp.value.trim();
          if (!v) { inp && inp.focus(); return; }
          const list = target(ds.path);
          const o = inp.dataset.origin || "own";
          const item = Object.assign({ id: nid("own"), t: v, o, own: true }, def.newItem ? def.newItem(ds.path, v) : {});
          list.push(item); set(null);
          requestAnimationFrame(() => { const i2 = main.querySelector(`[data-add="${CSS.escape(ds.path)}"]`); if (i2) i2.focus(); });
          return;
        }
        case "pick": S.dec[ds.key] = ds.v; if (def.onPick) def.onPick(ctx(), ds.key, ds.v); set(null); return;
        case "answer": S.ans[ds.q] = S.ans[ds.q] === ds.v ? undefined : ds.v; if (def.onAnswer) def.onAnswer(ctx(), ds.q); set(null); return;
        case "cycle": {
          const it = target(ds.path, ds.id || undefined);
          const vals = ds.vals.split(",");
          if (it) { uset(it, ds.field, vals[(vals.indexOf(it[ds.field]) + 1) % vals.length]); if (ds.mark) uset(it, ds.mark, true); }
          set(null); return;
        }
      }
    });
    main.addEventListener("keydown", (e) => {
      const t = e.target;
      if (t.matches("textarea.inline-edit")) {
        if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); saveEdit(t.dataset.edit, t.value); }
        if (e.key === "Escape") { U.edit = null; render(); }
      }
      if (t.matches("[data-add]") && e.key === "Enter") { e.preventDefault(); const btn = t.parentElement.querySelector('[data-act="add"]'); btn && btn.click(); }
      if (t.matches("[data-add]") && e.key === "Escape") { t.value = ""; t.blur(); }
    });
    main.addEventListener("focusout", (e) => {
      const t = e.target;
      if (t.matches("textarea.inline-edit") && U.edit === t.dataset.edit) setTimeout(() => { if (U.edit === t.dataset.edit && document.activeElement !== t) saveEdit(t.dataset.edit, t.value); }, 120);
    });
    main.addEventListener("input", (e) => {
      const t = e.target;
      if (t.matches("[data-bind]")) { setAt(S.f, t.dataset.bind, t.value); save(); if (def.live) def.live(ctx(), main); clearTimeout(rT); rT = setTimeout(softRender, 700); }
    });
    let rT = null;
    function softRender() {
      const a = document.activeElement, p = a && a.dataset ? a.dataset.bind : null, pos = a && a.selectionStart;
      const y = window.scrollY;
      render();
      window.scrollTo(0, y);
      if (p) { const el = main.querySelector(`[data-bind="${CSS.escape(p)}"]`); if (el) { el.focus(); try { el.setSelectionRange(pos, pos); } catch (x) { /* select */ } } }
    }
    main.addEventListener("change", (e) => {
      if (!e.target.matches("select[data-bind]")) return;
      setAt(S.f, e.target.dataset.bind, e.target.value); save(); softRender();
    });
    if (def.mount) def.mount(ctx(), main, { set, render, save });
    render();
  }

  /* ---------------- overview (index) ---------------- */
  function overview(main) {
    const done = ORDER.filter((id) => readPage(id).status === "confirmed").length;
    main.innerHTML = `<div class="page" data-screen-label="00 Overview">
      <div class="ov-hero"><div><div class="eyebrow">Requirement gathering · prototype</div><h1>${esc(PROJECT)}</h1>
        <p class="seed">${esc(SEED_IDEA)}</p>
        <div class="flow">${ORDER.map((id, i) => `<span class="s">${esc(META[id].title.split(" ")[0])}</span>${i < ORDER.length - 1 ? "→" : ""}`).join("")}</div></div>
        <div class="card" style="display:grid;gap:12px;align-content:start">
          <div class="eyebrow">How each step works</div>
          <p style="font-size:13px">One <b>Draft</b> action prepares the whole step from what you already confirmed. You review short sections, decide the few things flagged in amber, and confirm. The brief on the right is the output that the next step reuses.</p>
          <div class="eyebrow" style="margin-top:4px">${done} of 10 confirmed</div>
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            <a class="btn btn-primary" href="${href(ORDER.find((id) => readPage(id).status !== "confirmed") || ORDER[0])}">${done ? "Continue" : "Start with your idea"} ${I.arrow}</a>
            <button class="btn" data-ov="5">Skip to 06 with sample data</button>
          </div></div></div>
      <div class="ov-grid">${ORDER.map((id) => { const st = pageStatus(id); return `<a class="ov-card ${st.label === "Locked" ? "locked" : ""}" href="${href(id)}">
        <div class="top"><span class="eyebrow">${META[id].num}</span><span class="pill ${st.cls}">${st.label}</span></div>
        <h3>${esc(META[id].title)}</h3><p>${esc(META[id].blurb)}</p><span class="eyebrow">Output · ${esc(META[id].brief)}</span></a>`; }).join("")}</div></div>`;
    main.addEventListener("click", (e) => { const b = e.target.closest("[data-ov]"); if (b) { RGP.autofill(+b.dataset.ov); location.href = href(ORDER[+b.dataset.ov]); } });
  }

  /* ---------------- boot ---------------- */
  document.addEventListener("DOMContentLoaded", () => {
    const page = document.body.dataset.page, main = $("#main");
    renderShell(page);
    if (page === "index") return overview(main);
    const def = DEFS[page];
    if (def) mountPage(def, main);
    else main.innerHTML = `<div class="page"><div class="gate"><h2>${esc((META[page] || {}).title || page)}</h2><p class="muted">Next in the journey.</p></div></div>`;
  });
  window.addEventListener("storage", () => renderShell(document.body.dataset.page));
})();
