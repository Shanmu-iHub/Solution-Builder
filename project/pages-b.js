/* Pages 06–10. */
(function () {
  "use strict";
  const R = window.RGP, H = R.H, I = R.I, esc = R.esc, ln = R.ln, on = H.on;
  const pick = (arr, id) => (arr || []).find((x) => x.id === id);
  const lst = (a) => on(a).map((x) => x.t);
  const PRI = ["Must", "Should", "Could", "Wont"];
  const priLabel = (p) => (p === "Wont" ? "Won't" : p);

  /* =========================================================== 06 PRODUCT DEFINITION */
  const AI_PRI = { cap_capture: "Must", cap_extract: "Should", cap_queue: "Must", cap_status: "Should", cap_export: "Could", cap_form: "Must", cap_inbox: "Must" };
  const JOURNEY = {
    s_reps: "Pays → photographs the receipt → checks the fields AI read → submits → follows status → is reimbursed",
    s_mgr: "Gets a reminder → opens the approval queue → reviews claim and receipt → approves or returns with a note",
    s_fin: "Sees approved claims → reviews policy flags → sends them to SAP Concur",
    s_ops: "Updates expense rules → rules apply to new claims at submission",
  };
  const METRIC = ["Days from purchase to reimbursement", "Share of claims returned for a missing receipt", "Finance handling time per claim"];
  R.define({
    id: "product-definition",
    intro: "Define what the product is and who it's for. Everything starts from your confirmed briefs — only priorities and metric values are new.",
    uses: ["idea-understanding", "opportunity", "solution-discovery", "business-model"],
    genTitle: "Define the product", genText: "Vision from the Idea Brief, users from the Market brief, features from the Solution capabilities (same IDs), goals from the Business Model.",
    genLabel: "Define the product", youGet: ["Vision & purpose", "Target users", "Scope in / out", "Features by root cause", "AI-suggested priorities", "Journeys & screens", "Success metrics"],
    rail: ["Reading four confirmed briefs", "Carrying over vision, users and features", "Drafting scope and journeys", "Linking goals to metrics"],
    build({ out }) {
      const b = out("idea-understanding") || {}, o = out("opportunity") || { segs: [] }, s = out("solution-discovery") || { caps: [], rcs: [], notChosen: [], uncovered: [] }, bm = out("business-model") || { goals: [] }, p = out("problem-discovery") || {};
      const scope = s.caps.map((c) => ({ id: "sc_" + c.id, t: c.t, why: "Capability of the selected solution", o: "up", ol: "From Solution" }));
      const seen = new Set(s.caps.map((c) => c.id));
      s.notChosen.forEach((n) => n.caps.forEach((c) => { if (!seen.has(c.id)) { seen.add(c.id); scope.push({ id: "sc_" + c.id, t: c.t, out: true, why: `Part of “${n.t}”, not chosen`, o: "up", ol: "From Solution" }); } }));
      s.uncovered.forEach((r) => scope.push({ id: "sc_rc_" + r.id, t: "Fixing: " + r.t, out: true, why: "Root cause not covered by the selected solution", o: "up", ol: "From Solution" }));
      if (b.ans && b.ans.approve === "Yes, keep manager approval") scope.push({ id: "sc_auto", t: "Auto-approval of small claims", out: true, why: "You chose to keep manager approval", o: "ans" });
      return {
        vision: ln(b.vision || "Not provided", "up", { ol: "From Idea Brief" }),
        purpose: ln(p.stmt || "Not provided", "up", { ol: "From Problem Statement" }),
        users: o.segs.map((x, i) => ({ id: x.id, t: x.t, role: x.role, wants: x.wants, primary: i === 0 })),
        scope,
        features: s.caps.map((c) => ({ id: c.id, t: c.t, rc: c.rc, pri: AI_PRI[c.id] || "Should", o: "up", ol: "From Solution · " + c.id })),
        rcs: s.rcs,
        journeys: o.segs.slice(0, 4).map((x) => ln(JOURNEY[x.id] || "Journey to define", JOURNEY[x.id] ? "ai" : "na", { id: "j_" + x.id, k: x.t })),
        principles: [ln("Submitting a claim takes a few taps, one-handed", "ai"), ln("The rep always confirms what AI read before submitting", "ai"), ln("Claim status is visible at every step", "ai")],
        screens: [ln("Receipt capture (camera)", "ai"), ln("Claim review & submit", "ai"), ln("My claims & status", "ai"), ln("Approval queue (managers)", "ai"), ln("Finance export", "ai")].filter((x) => x.t !== "Finance export" || s.caps.find((c) => c.id === "cap_export")),
        metrics: bm.goals.map((g, i) => ({ id: "m_" + g.id, t: METRIC[i] || "Metric to define", goal: g.t, o: METRIC[i] ? "ai" : "na" })),
      };
    },
    newItem: (path) => (path === "features" ? { rc: null, pri: "Should", set: "you" } : path === "metrics" ? { goal: "Added by you" } : {}),
    acts: {
      "scope-move": (c, b) => { const it = pick(c.d.scope, b.dataset.id); R.uset(it, "out", !it.out); R.uset(it, "why", it.out ? "Moved out by you" : "Moved in by you"); },
    },
    mount(c, main, api) { main.addEventListener("change", (e) => { const t = e.target; if (t.matches("[data-featrc]")) { const it = pick(c.S.d.features, t.dataset.featrc); if (it) R.uset(it, "rc", t.value || null); api.set(null); } }); },
    sections: [
      { id: "vision", title: "Vision & purpose", summary: (c) => c.d.vision.t,
        render: (c) => `<div class="sub-h">Vision</div>${H.text("vision", { big: true })}<div class="sub-h">Problem it solves</div>${H.text("purpose")}` },
      { id: "users", title: "Target users", summary: (c) => c.d.users.map((u) => u.t).join(", "),
        render: (c) => `<div class="items">${c.d.users.map((u) => `<div class="item"><div class="body"><div class="txt"><b>${esc(u.t)}</b> ${u.primary ? `<span class="pill ok" style="margin-left:4px">Primary</span>` : ""}</div><div class="meta"><span class="muted" style="font-size:12.5px">${esc(u.role || "")}${u.wants ? " · wants to " + esc(u.wants.charAt(0).toLowerCase() + u.wants.slice(1)) : ""}</span>${R.originTag("up", "From Market brief")}</div></div></div>`).join("")}</div>
          <p class="muted" style="font-size:12px;margin-top:6px">Change users or the primary customer in Opportunity & Discovery.</p>` },
      { id: "scope", title: "Scope", summary: (c) => `${c.d.scope.filter((x) => !x.out).length} in · ${c.d.scope.filter((x) => x.out).length} out`,
        render: (c) => `<div class="scope">${[["in", "In scope", false], ["out", "Out of scope", true]].map(([cls, l, isOut]) => `<div class="${cls}"><h4>${l}</h4><div class="items">${c.d.scope.filter((x) => !!x.out === isOut).map((x) => `<div class="item"><div class="body"><div class="txt">${esc(x.t)}</div><div class="meta"><span class="muted" style="font-size:11.5px">${esc(x.why)}</span></div></div>${c.ro ? "" : `<button class="btn btn-sm" data-act="scope-move" data-id="${x.id}">${isOut ? "Move in" : "Move out"}</button>`}</div>`).join("") || `<div class="muted" style="padding:8px 0">Nothing</div>`}</div></div>`).join("")}</div>` },
      { id: "feat", title: "Features", need: (c) => { const n = c.d.features.filter((f) => !f.set).length; return n ? `${n} AI priorities to review` : null; },
        summary: (c) => PRI.map((p) => `${c.d.features.filter((f) => f.pri === p).length} ${priLabel(p)}`).join(" · "),
        render: (c) => { const groups = c.d.rcs.map((r) => ({ id: r.id, t: r.t })).concat([{ id: null, t: "Not linked to a root cause" }]);
          return `<p class="muted" style="font-size:12.5px;margin-bottom:6px">Same capabilities as the Solution Brief — not regenerated. Click a priority to change it.</p>
          ${groups.map((g) => { const fs = c.d.features.filter((f) => (f.rc || null) === g.id); if (!fs.length) return ""; return `<div class="group-h"><span class="eyebrow">Fixes</span><b>${esc(g.t)}</b></div><div class="items">${fs.map((f) => H.line(f, "features", { extra: (it) => `${H.cycle("features", it.id, "pri", PRI, "pri " + it.pri, priLabel(it.pri), "set")}${it.set ? `<span class="origin o-ed">Priority ${it.set === "acc" ? "accepted" : "set by you"}</span>` : `<span class="origin o-ai">AI-suggested priority</span>`}${it.own && !c.ro ? `<select class="txt" style="height:24px;width:auto;font-size:11.5px;padding:0 4px" data-featrc="${it.id}"><option value="">Link to root cause…</option>${c.d.rcs.map((r) => `<option value="${r.id}" ${it.rc === r.id ? "selected" : ""}>${esc(r.t)}</option>`).join("")}</select>` : ""}` })).join("")}</div>`; }).join("")}
          ${c.ro ? "" : H.addRow("features", "Add a feature")}`; } },
      { id: "ux", title: "User experience", summary: (c) => `${c.d.journeys.length} journeys · ${on(c.d.screens).length} screen areas`,
        render: (c) => `<div class="sub-h">Journeys</div>${H.lines("journeys")}<div class="sub-h">UX principles</div>${H.lines("principles", { add: "Add a principle" })}<div class="sub-h">Screen areas</div>${H.lines("screens", { off: "Remove", offShown: "Removed", add: "Add a screen area" })}` },
      { id: "metrics", title: "Goals & success metrics", summary: (c) => `${c.d.metrics.length} metrics · values from you`,
        render: (c) => { const m = c.S.f.m || {}; return `<p class="muted" style="font-size:12.5px;margin-bottom:10px">Each metric serves a Business Model goal. Baselines and targets come only from you — a blank baseline is “To be measured”.</p>
          <div class="cmp-wrap"><table class="cmp"><thead><tr><th>Metric</th><th>Business goal</th><th>Baseline</th><th>Target</th></tr></thead><tbody>${c.d.metrics.map((x) => `<tr><td>${esc(x.t)}<span class="basis">${x.o === "ai" ? "AI suggestion" : "To define"}</span></td><td>${esc(x.goal)}<span class="basis">From Business Model</span></td>
            <td>${H.bind(`m.${x.id}.base`, (m[x.id] || {}).base, { cls: "cell", extra: 'placeholder="To be measured"' })}</td><td>${H.bind(`m.${x.id}.target`, (m[x.id] || {}).target, { cls: "cell", extra: 'placeholder="Not provided"' })}</td></tr>`).join("")}</tbody></table></div>`; } },
    ],
    todo(c) { const n = c.d.features.filter((f) => !f.set).length; return n ? [{ sec: "feat", t: `Review ${n} AI-suggested priorit${n > 1 ? "ies" : "y"}` }] : []; },
    suggest: (c) => c.d.features.forEach((f) => { if (!f.set) R.uset(f, "set", "acc"); }),
    suggestLabel: "Accept AI priorities",
    rows(c) {
      const m = c.S.f.m || {};
      return [H.row("Vision", c.d.vision.t), H.row("Target users", c.d.users.map((u) => u.t + (u.primary ? " (primary)" : ""))),
        H.row("In scope", c.d.scope.filter((x) => !x.out).map((x) => x.t)), H.row("Out of scope", c.d.scope.filter((x) => x.out).map((x) => x.t)),
        H.row("Features", c.d.features.filter((f) => !f.off).map((f) => `${priLabel(f.pri)} · ${f.t}`)), H.row("Screen areas", lst(c.d.screens)),
        H.row("Success metrics", c.d.metrics.map((x) => `${x.t} — baseline: ${(m[x.id] || {}).base || "to be measured"}; target: ${(m[x.id] || {}).target || "not provided"}`))];
    },
    briefTitle: (c) => c.d.vision.t,
    handoff: () => "Requirements turns features, journeys, screens and metrics into traceable requirements — nothing here is asked again.",
    out(S) { const d = S.d, m = S.f.m || {}; return { vision: d.vision.t, purpose: d.purpose.t, users: d.users, scopeIn: d.scope.filter((x) => !x.out), scopeOut: d.scope.filter((x) => x.out), features: d.features.filter((f) => !f.off), rcs: d.rcs, journeys: on(d.journeys), principles: lst(d.principles), screens: lst(d.screens), metrics: d.metrics.map((x) => Object.assign({}, x, { base: (m[x.id] || {}).base || "", target: (m[x.id] || {}).target || "" })) }; },
  });

  /* =========================================================== 07 REQUIREMENTS */
  const TYPES = [["BR", "Business"], ["UR", "User"], ["FR", "Functional"], ["AI", "AI"], ["NFR", "Non-functional"], ["DATA", "Data"], ["INT", "Integration"], ["UI", "UI"], ["SEC", "Security"]];
  const UR_TXT = { s_reps: "Field sales reps shall be able to submit a claim from their phone without keeping paper receipts", s_mgr: "Line managers shall be able to approve or return claims from one queue", s_fin: "Finance shall receive approved, policy-checked claims", s_ops: "Sales operations shall be able to maintain expense rules" };
  R.define({
    id: "requirements",
    intro: "Every requirement has a type, a source and a trace back to features, root causes or goals. Approve them into one baseline.",
    uses: ["product-definition", "business-model"],
    genTitle: "Write the requirements", genText: "Derives requirements from the confirmed Product Brief, Business Model and your document. Unknown targets stay “Not provided”.",
    genLabel: "Write requirements", youGet: ["9 requirement types", "IDs & traceability", "Source per line", "Approve one by one or all"],
    rail: ["Reading the Product Brief", "Deriving business & user requirements", "Deriving functional, AI & data requirements", "Linking traceability"],
    build({ out }) {
      const pd = out("product-definition") || { features: [], users: [], screens: [], metrics: [] }, bm = out("business-model") || { goals: [], cons: [] }, b = out("idea-understanding") || {};
      const reqs = [], cnt = {};
      const add = (type, t, src, trace, o, key) => { cnt[type] = (cnt[type] || 0) + 1; reqs.push({ id: key || `${type}-${String(cnt[type]).padStart(3, "0")}`, rid: `${type}-${String(cnt[type]).padStart(3, "0")}`, type, t, src, trace: trace || [], o: o || "up", st: "Proposed" }); };
      bm.goals.forEach((g) => add("BR", `The solution shall support the goal: ${g.t.charAt(0).toLowerCase() + g.t.slice(1)}`, "Business Model", [g.id]));
      if (b.doc) add("BR", "Claims shall be checked against the company expense policy", "Your document", ["constraint"], "doc");
      pd.users.forEach((u) => add("UR", UR_TXT[u.id] || `${u.t} shall be able to ${u.role ? u.role.toLowerCase() : "use the product"}`, "Product Brief · users", [u.id]));
      pd.features.filter((f) => f.pri !== "Wont").forEach((f) => add("FR", `The system shall let users ${f.t.charAt(0).toLowerCase() + f.t.slice(1)}`, "Product Brief · features", [f.id, f.rc].filter(Boolean), "up"));
      if (pd.features.find((f) => f.id === "cap_extract")) {
        add("AI", "AI shall read amount, date and merchant from a receipt photo and show them for the rep to confirm", "Feature cap_extract", ["cap_extract", "rc_capture"]);
        add("AI", "Fields read with low confidence shall be highlighted for the rep", "AI inferred", ["cap_extract"], "ai");
      }
      add("NFR", "A claim shall be saved and queued when the rep has no connection", "AI inferred", ["s_reps"], "ai");
      add("NFR", "Response-time and availability targets — Not provided, to be agreed with the team", "Not known yet", [], "na");
      add("DATA", "Receipt images shall be stored with their claim for the retention period in the company policy (period: Not provided)", "AI inferred", ["cap_capture"], "ai");
      if (pd.features.find((f) => f.id === "cap_export")) add("INT", "Approved claims shall be sent to SAP Concur without re-keying", b.doc ? "Your document" : "Product Brief", ["cap_export", "rc_entry"], b.doc ? "doc" : "up");
      pd.screens.forEach((s) => add("UI", `The product shall provide a “${s}” screen`, "Product Brief · screens", [/approv/i.test(s) ? "s_mgr" : /finance/i.test(s) ? "s_fin" : "s_reps"]));
      add("SEC", "Only the claim's rep, approver and finance shall see a claim and its receipt", "AI inferred", pd.users.map((u) => u.id), "ai");
      add("SEC", "Users shall sign in with their company account", "Working assumption", [], "as");
      return { reqs };
    },
    derive(c) { const cnt = {}; c.d.reqs.forEach((r) => { cnt[r.type] = (cnt[r.type] || 0) + 1; r.rid = `${r.type}-${String(cnt[r.type]).padStart(3, "0")}`; }); },
    acts: {
      filter: (c, b, api) => { c.U.f = c.U.f === b.dataset.v ? null : b.dataset.v; api.render(); return false; },
      st: (c, b) => { const r = pick(c.d.reqs, b.dataset.id); R.uset(r, "st", r.st === b.dataset.v ? "Proposed" : b.dataset.v); },
      "req-add": (c, b, api) => { const main = b.closest("main"), t = main.querySelector("#req-new").value.trim(), ty = main.querySelector("#req-type").value; if (!t) return false; c.d.reqs.push({ id: R.nid("req"), type: ty, t, src: "Added by you", trace: [], o: "own", own: true, st: "Proposed" }); },
    },
    roActs: ["filter"],
    sections: [
      { id: "list", title: "Requirements", need: (c) => { const n = c.d.reqs.filter((r) => r.st === "Proposed").length; return n ? `${n} to review` : null; },
        summary: (c) => `${c.d.reqs.length} requirements · ${c.d.reqs.filter((r) => r.st === "Approved").length} approved`,
        render: (c) => { const f = c.U.f, rows = c.d.reqs.filter((r) => !f || r.type === f || (f === "open" && r.st === "Proposed"));
          return `<div class="filters"><button class="chip ${!f ? "on" : ""}" data-act="filter" data-v="">All <span class="c">${c.d.reqs.length}</span></button><button class="chip ${f === "open" ? "on" : ""}" data-act="filter" data-v="open">Not reviewed <span class="c">${c.d.reqs.filter((r) => r.st === "Proposed").length}</span></button>
            ${TYPES.map(([k, l]) => { const n = c.d.reqs.filter((r) => r.type === k).length; return n ? `<button class="chip ${f === k ? "on" : ""}" data-act="filter" data-v="${k}">${l} <span class="c">${n}</span></button>` : ""; }).join("")}</div>
          <div class="cmp-wrap"><table class="cmp" style="min-width:760px"><thead><tr><th>ID</th><th>Requirement</th><th>Source</th><th>Traces to</th><th>Status</th></tr></thead><tbody>
          ${rows.map((r) => { const key = `reqs#${r.id}`, ed = c.U.edit === key && !c.ro; return `<tr class="${r.st === "Rejected" ? "rejected" : ""}"><td><span class="req-id">${r.rid}</span></td>
            <td>${ed ? `<textarea class="inline-edit" data-edit="${esc(key)}">${esc(r.t)}</textarea>` : `<span class="txtc" ${c.ro ? "" : `data-act="edit" data-key="${esc(key)}" style="cursor:text"`}>${esc(r.t)}</span>`}${r.u && r.u.t ? `<span class="basis ed">Edited by you</span>` : ""}</td>
            <td>${R.originTag(r.o === "own" ? "own" : r.o, r.src)}</td><td><div class="trace">${r.trace.map((t) => `<span>${esc(t)}</span>`).join("") || `<span class="muted" style="background:none">—</span>`}</div></td>
            <td><div class="st-btns"><button class="st ok ${r.st === "Approved" ? "on" : ""}" ${c.ro ? "disabled" : ""} data-act="st" data-id="${r.id}" data-v="Approved" title="Approve">${I.check}</button><button class="st no ${r.st === "Rejected" ? "on" : ""}" ${c.ro ? "disabled" : ""} data-act="st" data-id="${r.id}" data-v="Rejected" title="Reject">${I.x}</button></div></td></tr>`; }).join("")}</tbody></table></div>
          ${c.ro ? "" : `<div class="add-row"><select class="txt" id="req-type" style="width:150px">${TYPES.map(([k, l]) => `<option value="${k}">${l}</option>`).join("")}</select><input class="txt" id="req-new" placeholder="Add a requirement"><button class="btn btn-sm" data-act="req-add">${I.plus}Add</button></div>`}`; } },
    ],
    todo(c) { const n = c.d.reqs.filter((r) => r.st === "Proposed").length; return n ? [{ sec: "list", t: `Review ${n} requirement${n > 1 ? "s" : ""}` }] : []; },
    suggest: (c) => c.d.reqs.forEach((r) => { if (r.st === "Proposed") R.uset(r, "st", "Approved"); }),
    suggestLabel: "Approve all remaining",
    rows(c) {
      const ok = c.d.reqs.filter((r) => r.st === "Approved");
      return [H.row("Approved", `${ok.length} of ${c.d.reqs.length}`), H.row("Rejected", String(c.d.reqs.filter((r) => r.st === "Rejected").length)),
        H.row("By type", TYPES.map(([k, l]) => { const n = ok.filter((r) => r.type === k).length; return n ? `${l}: ${n}` : null; }).filter(Boolean)),
        H.row("Not traced", c.d.reqs.filter((r) => r.st !== "Rejected" && !r.trace.length).map((r) => r.rid))];
    },
    briefTitle: (c) => `${c.d.reqs.filter((r) => r.st === "Approved").length} approved requirements`,
    handoff: () => "Documents generates the BRD, PRD and SRS from this one approved baseline.",
    out(S) { return { reqs: S.d.reqs.filter((r) => r.st === "Approved"), ver: S.ver }; },
  });

  /* =========================================================== 08 DOCUMENTS */
  const DOCS = [["brd", "BRD", "Business Requirements"], ["prd", "PRD", "Product Requirements"], ["srs", "SRS", "Software Requirements Specification"]];
  function docData(out) {
    const rq = out("requirements") || { reqs: [] }, pd = out("product-definition") || {}, bm = out("business-model") || { fin: {} }, p = out("problem-discovery") || {}, o = out("opportunity") || { segs: [] }, s = out("solution-discovery") || { opt: {} };
    const R_ = (types) => rq.reqs.filter((r) => types.includes(r.type)).map((r) => `${r.rid} — ${r.t}`);
    const money = (n) => (n == null ? "Not provided" : new Intl.NumberFormat("en", { style: "currency", currency: bm.fin.cur || "EUR", maximumFractionDigits: 0 }).format(n));
    return {
      brd: [["Purpose", [p.stmt]], ["Business objectives", bm.obj], ["Business goals", (bm.goals || []).map((g) => g.t)], ["Stakeholders", o.segs.map((x) => `${x.t} — ${x.role}`)],
        ["Scope", (pd.scopeIn || []).map((x) => "In: " + x.t).concat((pd.scopeOut || []).map((x) => "Out: " + x.t))], ["Business requirements", R_(["BR"])],
        ["Financial summary", [`Net yearly benefit: ${bm.fin.net != null ? money(bm.fin.net) + " (from your figures)" : "Not provided"}`, `Payback: ${bm.fin.pay != null ? bm.fin.pay.toFixed(1) + " years" : "Not calculated"}`]],
        ["Risks", (bm.risks || []).map((r) => `${r.sev}: ${r.t} — ${r.mit}`)], ["Constraints", bm.cons]],
      prd: [["Vision", [pd.vision]], ["Target users", (pd.users || []).map((u) => u.t + (u.primary ? " (primary)" : ""))], ["Features", (pd.features || []).map((f) => `${priLabel(f.pri)} — ${f.t} [${f.id}]`)],
        ["User journeys", (pd.journeys || []).map((j) => `${j.k}: ${j.t}`)], ["UX principles", pd.principles], ["Success metrics", (pd.metrics || []).map((m) => `${m.t} — baseline: ${m.base || "to be measured"}; target: ${m.target || "not provided"}`)],
        ["Product requirements", R_(["UR", "FR", "UI"])]],
      srs: [["System overview", [s.opt.t]], ["Functional requirements", R_(["FR"])], ["AI requirements", R_(["AI"])], ["Non-functional requirements", R_(["NFR"])], ["Data requirements", R_(["DATA"])],
        ["Integration requirements", R_(["INT"])], ["Security requirements", R_(["SEC"])], ["Traceability", rq.reqs.filter((r) => r.trace.length).map((r) => `${r.rid} → ${r.trace.join(", ")}`)]],
      reqVer: rq.ver, pdVer: R.readPage("product-definition").ver,
    };
  }
  function paper(d, k) {
    const m = DOCS.find((x) => x[0] === k);
    return `<div class="doc-paper"><div class="eyebrow">${m[1]} · Expense Claims for Field Sales Teams</div><h3 style="margin:4px 0 2px">${m[2]}</h3><p class="muted" style="font-size:12px">Built from Requirements baseline v${d.reqVer}.0 · Product Brief v${d.pdVer}.0</p>
      ${d[k].map(([h, items], i) => `<h5>${i + 1}. ${esc(h)}</h5>${items && items.filter(Boolean).length ? `<ul>${items.filter(Boolean).map((x) => `<li>${esc(x)}</li>`).join("")}</ul>` : `<p><i>Not provided</i></p>`}`).join("")}</div>`;
  }
  R.paper = paper; R.DOCS = DOCS;
  R.define({
    id: "documents",
    intro: "BRD, PRD and SRS are generated from the one approved requirements baseline, so they can't disagree.",
    uses: ["requirements", "product-definition"],
    genTitle: "Generate documents", genText: "One action writes all three documents from the approved baseline.",
    genLabel: "Generate BRD, PRD & SRS", youGet: ["BRD", "PRD", "SRS", "Same baseline version in all three"],
    rail: ["Reading the approved baseline", "Writing the BRD", "Writing the PRD", "Writing the SRS"],
    build: ({ out }) => docData(out),
    acts: { doc: (c, b, api) => { c.U.doc = b.dataset.v; api.render(); return false; } },
    roActs: ["doc"],
    sections: [
      { id: "docs", title: "Document set", summary: (c) => DOCS.map((x) => x[1]).join(" · ") + ` · baseline v${c.d.reqVer}.0`,
        render: (c) => { const k = c.U.doc || "brd"; return `<div class="doc-pick">${DOCS.map(([id, s, l]) => `<button class="doc-card ${k === id ? "on" : ""}" data-act="doc" data-v="${id}"><b>${s}</b><span class="muted" style="font-size:12px">${l}</span><span class="basis">${c.d[id].length} sections · ${c.d[id].reduce((n, x) => n + (x[1] || []).filter(Boolean).length, 0)} lines</span></button>`).join("")}</div>${paper(c.d, k)}`; } },
    ],
    todo: () => [],
    rows: (c) => DOCS.map(([id, s, l]) => H.row(s, `${l} · ${c.d[id].length} sections`)).concat([H.row("Baseline", `Requirements v${c.d.reqVer}.0`)]),
    briefTitle: () => "BRD · PRD · SRS",
    handoff: () => "Review runs consistency, traceability and coverage checks on this set.",
    out(S) { return S.d; },
  });

  /* =========================================================== 09 REVIEW */
  function runChecks(out) {
    const docs = out("documents") || {}, rq = out("requirements") || { reqs: [] }, pd = out("product-definition") || { features: [], rcs: [], metrics: [] }, bm = out("business-model") || { fin: {} };
    const rqS = R.readPage("requirements"), allowed = new Set();
    const ans = Object.assign({}, (out("idea-understanding") || {}).ans, (out("problem-discovery") || {}).ans);
    Object.values(ans).forEach((v) => String(v || "").replace(/\d+(?:[.,]\d+)?/g, (m) => allowed.add(m)));
    pd.metrics.forEach((m) => (m.base + " " + m.target).replace(/\d+(?:[.,]\d+)?/g, (x) => allowed.add(x)));
    const F = R.readPage("business-model").f.fin || {};
    ["cost", "run", "save"].forEach((k) => String(F[k] || "").replace(/\d+(?:[.,]\d+)?/g, (x) => allowed.add(x)));
    if (bm.fin.net != null) String(Math.round(bm.fin.net)).replace(/\d+/g, (x) => allowed.add(x));
    let found = 0, bad = [];
    ["brd", "prd", "srs"].forEach((k) => (docs[k] || []).forEach(([h, items]) => (items || []).forEach((t) => {
      String(t || "").replace(/\b[A-Z]+-\d{3}\b/g, "").replace(/\b[a-z]+_[a-z0-9_]+/gi, "").replace(/v\d+\.\d/g, "").replace(/[€$£₹]?\d[\d,.]*/g, (m) => { found++; const n = m.replace(/[€$£₹,]/g, ""); if (!allowed.has(n) && !allowed.has(m.replace(/[€$£₹]/g, "")) && !(bm.fin.pay != null && n === bm.fin.pay.toFixed(1))) bad.push(m); });
    })));
    const fr = rq.reqs.filter((r) => r.type === "FR");
    const uncRc = pd.rcs.filter((rc) => !rq.reqs.some((r) => r.trace.includes(rc.id)));
    const untraced = rq.reqs.filter((r) => !r.trace.length);
    const noTarget = pd.metrics.filter((m) => !m.target);
    const mustNoFr = pd.features.filter((f) => f.pri === "Must" && !fr.some((r) => r.trace.includes(f.id)));
    return [
      { id: "ck_cons", k: "Consistency", ok: docs.reqVer === rqS.ver, d: docs.reqVer === rqS.ver ? `BRD, PRD and SRS all built from Requirements v${rqS.ver}.0` : "Documents use an older baseline" },
      { id: "ck_ver", k: "Versions", ok: true, d: R.ORDER.slice(0, 8).map((id) => `${R.META[id].num} v${R.readPage(id).ver}.0`).join(" · ") },
      { id: "ck_num", k: "Unsupported numbers", ok: !bad.length, d: bad.length ? `${bad.length} number(s) not traced to your input: ${bad.slice(0, 4).join(", ")}` : `${found} number${found === 1 ? "" : "s"} found in documents — all from your own answers or figures (requirement IDs excluded)` },
      { id: "ck_trace", k: "Traceability", ok: !untraced.length, d: untraced.length ? `${untraced.length} approved requirement(s) have no trace: ${untraced.map((r) => r.rid).join(", ")}` : "Every approved requirement traces to a feature, root cause, user or goal" },
      { id: "ck_cov", k: "Coverage — root causes", ok: !uncRc.length, d: uncRc.length ? `Not covered: ${uncRc.map((r) => r.t).join("; ")}` : `All ${pd.rcs.length} root causes are covered by requirements` },
      { id: "ck_must", k: "Coverage — Must features", ok: !mustNoFr.length, d: mustNoFr.length ? `No functional requirement for: ${mustNoFr.map((f) => f.t).join("; ")}` : "Every Must feature has a functional requirement" },
      { id: "ck_metric", k: "Metric targets", ok: !noTarget.length, d: noTarget.length ? `${noTarget.length} metric(s) have no target yet — documents say “not provided”` : "Every metric has a target from you" },
    ];
  }
  function exportDocs(kind) {
    const d = R.out("documents");
    if (!d) return;
    const css = `body{font:13px/1.55 Poppins,Arial,sans-serif;color:#18191b;max-width:760px;margin:32px auto;padding:0 24px}h3{font-size:20px}h5{font-size:13px;margin:16px 0 4px}.eyebrow{font:11px monospace;text-transform:uppercase;color:#6b6f76}.muted{color:#6b6f76}ul{padding-left:18px}.doc-paper{page-break-after:always;margin-bottom:40px}`;
    const html = `<!doctype html><html><head><meta charset="utf-8"><title>Expense Claims — Document set</title><style>${css}</style></head><body>${DOCS.map(([k]) => paper(d, k)).join("")}</body></html>`;
    if (kind === "pdf") { const w = window.open("", "_blank"); if (w) { w.document.write(html); w.document.close(); setTimeout(() => w.print(), 400); } }
    else { const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([html], { type: "application/msword" })); a.download = "expense-claims-document-set.doc"; a.click(); }
  }
  R.define({
    id: "review",
    intro: "Automatic checks across the document set. Approve the BRD, PRD and SRS together as one set.",
    uses: ["documents", "requirements"],
    genTitle: "Run the review", genText: "Checks consistency, versions, unsupported numbers, traceability and coverage across the whole set.",
    genLabel: "Run checks", youGet: ["Consistency", "Versions", "Unsupported numbers", "Traceability", "Coverage", "Export PDF / DOCX"],
    rail: ["Comparing document baselines", "Scanning for unsupported numbers", "Tracing requirements", "Checking coverage"],
    initInput: () => ({ approver: "" }),
    demoInput: () => ({ approver: "Product owner" }),
    build: ({ out }) => ({ checks: runChecks(out) }),
    acts: {
      ack: (c, b) => { const ck = pick(c.d.checks, b.dataset.id); R.uset(ck, "ack", !ck.ack); },
      "export-pdf": () => { exportDocs("pdf"); return false; },
      "export-doc": () => { exportDocs("doc"); return false; },
      rerun: (c) => { const fresh = runChecks(R.out); c.d.checks = fresh.map((f) => { const o = pick(c.d.checks, f.id); return o && o.ack && !f.ok ? Object.assign(f, { ack: true, u: { ack: true } }) : f; }); },
    },
    roActs: ["export-pdf", "export-doc"],
    sections: [
      { id: "checks", title: "Checks", need: (c) => { const n = c.d.checks.filter((x) => !x.ok && !x.ack).length; return n ? `${n} to acknowledge` : null; },
        summary: (c) => `${c.d.checks.filter((x) => x.ok).length} passed · ${c.d.checks.filter((x) => !x.ok).length} need attention`,
        render: (c) => `<div class="items checks">${c.d.checks.map((x) => `<div class="item"><span class="ico ${x.ok ? "pass" : "warn"}">${x.ok ? I.check : I.alert}</span><div class="body"><div class="txt"><b>${esc(x.k)}</b></div><div class="muted" style="font-size:12.5px">${esc(x.d)}</div>${!x.ok && x.ack ? `<div class="meta"><span class="origin o-ed">Accepted as a known gap</span></div>` : ""}</div>
          ${!x.ok && !c.ro ? `<button class="btn btn-sm" data-act="ack" data-id="${x.id}">${x.ack ? "Undo" : "Accept as known gap"}</button>` : ""}</div>`).join("")}</div>${c.ro ? "" : `<button class="btn-link" data-act="rerun" style="margin-top:8px">Re-run checks</button>`}` },
      { id: "approve", title: "Approval", need: (c) => ((c.S.f.approver || "").trim() ? null : "Add approver"), summary: (c) => c.S.f.approver || "",
        render: (c) => `<label style="display:grid;gap:4px;max-width:360px;font-size:12.5px;color:var(--muted)">Approved by (name or role)${H.bind("approver", c.S.f.approver, { extra: 'placeholder="e.g. Product owner"' })}</label>
          <div class="gen-row" style="margin-top:14px"><button class="btn btn-sm" data-act="export-pdf">${I.down}Export PDF</button><button class="btn btn-sm" data-act="export-doc">${I.down}Export DOCX</button><span class="muted" style="font-size:12px">Draft exports are marked by version in the header.</span></div>` },
    ],
    todo(c) {
      const t = [], n = c.d.checks.filter((x) => !x.ok && !x.ack).length;
      if (n) t.push({ sec: "checks", t: `Acknowledge ${n} check${n > 1 ? "s" : ""}` });
      if (!(c.S.f.approver || "").trim()) t.push({ sec: "approve", t: "Add the approver" });
      return t;
    },
    demo: (c) => c.d.checks.forEach((x) => { if (!x.ok) R.uset(x, "ack", true); }),
    rows: (c) => [H.row("Checks", `${c.d.checks.filter((x) => x.ok).length} of ${c.d.checks.length} passed`), H.row("Known gaps", c.d.checks.filter((x) => !x.ok).map((x) => x.k)), H.row("Approved by", c.S.f.approver), H.row("Set", "BRD · PRD · SRS approved together")],
    briefTitle: () => "Document set approved",
    confirmedExtra: () => `<div class="gen-row" style="margin-bottom:14px"><button class="btn" data-act="export-pdf">${I.down}Export PDF</button><button class="btn" data-act="export-doc">${I.down}Export DOCX</button></div>`,
    handoff: () => "Handoff packages the approved set with every brief and open item.",
    out(S) { return { checks: S.d.checks, approver: S.f.approver }; },
  });

  /* =========================================================== 10 HANDOFF */
  R.define({
    id: "handoff",
    intro: "One package for the delivery team: approved documents, every brief with its version, and what's still open.",
    uses: ["review"],
    genTitle: "Prepare the handoff package", genText: "Collects all confirmed briefs, the approved document set and every open item.",
    genLabel: "Prepare package", youGet: ["Package contents", "Open items to validate", "Next steps", "Download"],
    rail: ["Collecting confirmed briefs", "Collecting open items", "Assembling package"],
    initInput: () => ({ lead: "" }),
    demoInput: () => ({ lead: "Delivery lead" }),
    build({ out }) {
      const p = out("problem-discovery") || {}, o = out("opportunity") || { gaps: [] }, pd = out("product-definition") || { metrics: [] }, rv = out("review") || { checks: [] };
      const sS = R.readPage("solution-discovery");
      const sStat = (sS.d && R.DEFS["solution-discovery"].status({ S: sS, d: sS.d })) || { toValidate: [] };
      const open = [];
      if (!p.validated) open.push(ln("Problem is a working assumption — validate with real claim data", "as"));
      sStat.toValidate.forEach((t) => open.push(ln(t, "as")));
      o.gaps.forEach((g) => open.push(ln(g.t.split(" — ")[0] + " — not found", "na")));
      pd.metrics.filter((m) => !m.base).forEach((m) => open.push(ln(`Baseline to be measured: ${m.t}`, "na")));
      rv.checks.filter((c) => !c.ok).forEach((c) => open.push(ln(`Known gap from review: ${c.k}`, "as")));
      return {
        pkg: R.ORDER.slice(0, 9).map((id) => ({ id: "p_" + id, t: R.META[id].brief, v: R.readPage(id).ver })),
        open,
        next: [ln("Walk the delivery team through the PRD and SRS", "ai"), ln("Validate open items before sprint planning", "ai"), ln("Agree performance targets for the non-functional requirements", "ai")],
      };
    },
    acts: {
      download: () => {
        const pkg = { project: "Expense Claims for Field Sales Teams", generated: new Date().toISOString(), pages: {} };
        R.ORDER.forEach((id) => { const s = R.readPage(id); if (s.d) pkg.pages[id] = { version: s.ver, status: s.status, output: R.out(id) }; });
        const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([JSON.stringify(pkg, null, 2)], { type: "application/json" })); a.download = "expense-claims-handoff.json"; a.click(); return false;
      },
    },
    roActs: ["download"],
    sections: [
      { id: "pkg", title: "Package contents", summary: (c) => `${c.d.pkg.length} briefs + BRD, PRD, SRS`,
        render: (c) => `<div class="items">${c.d.pkg.map((x) => `<div class="item"><div class="body"><div class="txt">${esc(x.t)}</div></div><span class="pill ok">v${x.v}.0</span></div>`).join("")}</div>` },
      { id: "open", title: "Open items", summary: (c) => `${c.d.open.length} to validate`, render: () => H.lines("open", { add: "Add an open item" }) },
      { id: "to", title: "Receiving team", need: (c) => ((c.S.f.lead || "").trim() ? null : "Add lead"), summary: (c) => c.S.f.lead || "",
        render: (c) => `<label style="display:grid;gap:4px;max-width:360px;font-size:12.5px;color:var(--muted)">Delivery lead (name or role)${H.bind("lead", c.S.f.lead, { extra: 'placeholder="e.g. Delivery lead"' })}</label><div class="sub-h" style="margin-top:16px">Next steps</div>${H.lines("next", { add: "Add a next step" })}` },
    ],
    todo: (c) => ((c.S.f.lead || "").trim() ? [] : [{ sec: "to", t: "Name the delivery lead" }]),
    rows: (c) => [H.row("Package", c.d.pkg.map((x) => `${x.t} v${x.v}.0`)), H.row("Open items", String(on(c.d.open).length)), H.row("Delivery lead", c.S.f.lead)],
    briefTitle: () => "Handoff package",
    confirmedExtra: () => `<div class="gen-row" style="margin-bottom:14px"><button class="btn btn-primary" data-act="download">${I.down}Download package (JSON)</button></div>`,
    handoff: () => "The requirement gathering journey is complete.",
    out(S) { return { open: lst(S.d.open), lead: S.f.lead }; },
  });
})();
