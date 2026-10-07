/* Pages 01–05. Each page is a declarative definition handled by the engine in app.js. */
(function () {
  "use strict";
  const R = window.RGP, H = R.H, I = R.I, esc = R.esc, ln = R.ln, on = H.on;
  const T = (o, ol) => (t, extra) => ln(t, o, Object.assign(ol ? { ol } : {}, extra || {}));
  const pick = (arr, id) => (arr || []).find((x) => x.id === id);
  const lst = (a) => on(a).map((x) => x.t);

  /* =========================================================== 01 IDEA */
  const DIRS = [
    { id: "d_mobile", t: "Mobile capture with AI receipt reading", d: "Reps photograph receipts; AI reads amount, date and merchant and pre-fills the claim.", ai: true },
    { id: "d_workflow", t: "Digital approval workflow", d: "Replace email with a tracked claim form and approval queue for managers and finance." },
    { id: "d_inbox", t: "Receipt inbox by email", d: "Reps forward receipt photos to an inbox; finance builds claims from them." },
  ];
  const VISIONS = {
    d_mobile: ["Field sales reps capture a receipt the moment they pay and their claim moves to approval without paperwork or email.", "Every expense is captured on the phone at the point of purchase and reaches reimbursement through one tracked path."],
    d_workflow: ["Every expense claim follows one tracked digital path from submission to manager approval to finance.", "Claims stop living in email: reps, managers and finance work from the same queue."],
    d_inbox: ["Reps never keep paper again: every receipt is forwarded once and finance takes it from there.", "A single receipt inbox replaces paper and scattered email threads."],
  };
  R.define({
    id: "idea-understanding",
    intro: "Describe the idea and add any notes you have. One step turns it into a reviewable Idea Brief.",
    initInput: () => ({ idea: "", doc: false }),
    demoInput: () => ({ idea: R.SEED_IDEA, doc: true }),
    input: (c) => `<div><h2>What's the idea?</h2><p class="muted" style="margin-top:4px">Plain words are fine. Add a document if you have one — facts from it are tagged “From your document”.</p></div>
      <div><textarea class="big" data-bind="idea" placeholder="e.g. Our field sales reps lose paper receipts…">${esc(c.S.f.idea)}</textarea>
      ${c.S.f.idea ? "" : `<button class="btn-link" data-act="seed" style="margin-top:6px">Use the expense-claims example</button>`}</div>
      <div class="drop ${c.S.f.doc ? "has" : ""}" id="drop"><span class="file-ico">PDF</span>${c.S.f.doc
        ? `<div style="flex:1"><b>${esc(R.DOC.name)}</b><div class="muted" style="font-size:12px">Sample notes · 3 facts will be used</div></div><button class="btn btn-sm" data-act="nodoc">Remove</button>`
        : `<div style="flex:1"><b>Drop a document</b> <span class="muted">or</span> <button class="btn-link" data-act="usedoc">use sample notes</button><div class="muted" style="font-size:12px">Optional · PDF, DOCX, TXT</div></div>`}</div>`,
    canGenerate: (c) => (c.S.f.idea || "").trim().length > 12,
    genLabel: "Understand my idea",
    genHint: (c) => ((c.S.f.idea || "").trim().length > 12 ? "" : "Write a sentence or two first"),
    rail: (c) => ["Reading your idea", c.S.f.doc ? "Reading expense-process-notes.pdf" : "No document — skipping", "Filling the brief slots", "Preparing questions and directions"],
    youGet: ["Six brief slots with origins", "≤4 questions with suggested answers", "Three directions", "Vision statement"],
    mount(c, main, api) {
      main.addEventListener("dragover", (e) => { const d = e.target.closest("#drop"); if (d) { e.preventDefault(); d.classList.add("over"); } });
      main.addEventListener("dragleave", (e) => { const d = e.target.closest("#drop"); if (d) d.classList.remove("over"); });
      main.addEventListener("drop", (e) => { const d = e.target.closest("#drop"); if (d) { e.preventDefault(); c.S.f.doc = true; api.set(null); } });
    },
    build({ S }) {
      const doc = !!S.f.doc, ID = T("idea"), DC = T("doc"), AI = T("ai");
      const q = (s) => ({ q: s });
      return {
        doc,
        slots: {
          idea: [ID("Reps capture receipts on their phone so expense claims are approved faster", q("capture receipts on their phone and get claims approved faster"))],
          problem: [ID("Paper receipts get lost", q("lose paper receipts")), ID("Reimbursement takes weeks", q("wait weeks for expense reimbursement")), ID("Claims are handled through email and approved manually", q("claims are handled through email and approved manually"))],
          users: [ID("Field sales reps", q("Our field sales reps")), doc ? DC("Line managers — approve every claim", q(R.DOC.facts[0])) : AI("Approvers (who approves is not stated)"), doc ? DC("Finance team — re-keys claims into SAP Concur", q(R.DOC.facts[1])) : AI("Finance team")],
          outcome: [ID("Claims approved faster", q("get claims approved faster")), AI("No receipts lost between purchase and claim")],
          context: doc ? R.DOC.facts.map((f) => DC(f, q(f))) : [ln("Approval process — Not provided", "na")],
          uses: [AI("Rep photographs a receipt and submits a claim"), AI("Manager reviews and approves a claim"), doc ? DC("Finance moves approved claims into SAP Concur", q(R.DOC.facts[1])) : AI("Finance processes approved claims")],
        },
        vi: 0,
        vision: ln("", "ai"),
      };
    },
    derive(c) { const d = c.S.d, dir = c.S.dec.dir; if (dir && !(d.vision.u && d.vision.u.t)) { d.vision.t = VISIONS[dir][d.vi % 2]; } },
    acts: {
      seed: (c) => { c.S.f.idea = R.SEED_IDEA; },
      usedoc: (c) => { c.S.f.doc = true; },
      nodoc: (c) => { c.S.f.doc = false; },
      another: (c) => { c.S.d.vi++; if (c.S.d.vision.u) delete c.S.d.vision.u.t; c.S.d.vision.o = "ai"; delete c.S.d.vision.ol; },
    },
    questions(c) {
      const qs = [{ id: "speed", t: "What does “approved faster” mean for you?", o: ["Measure today first", "Within a week", "Within 48 hours"], sg: "Measure today first", why: "No current approval time was given, so a target would be a guess." }];
      if (c.S.d.doc) qs.push({ id: "approve", t: "Should line managers still approve every claim?", o: ["Yes, keep manager approval", "Auto-approve small claims", "Not decided"], sg: "Yes, keep manager approval", conflict: true });
      qs.push({ id: "capture", t: "How should receipts get in?", o: ["Phone camera only", "Phone + email forwarding", "Not sure yet"], sg: "Phone camera only" });
      qs.push({ id: "policy", t: "Should claims be checked against the expense policy?", o: ["Yes, at submission", "No, finance checks", "Not sure yet"], sg: c.S.d.doc ? "Yes, at submission" : null });
      return qs;
    },
    sections: [
      { id: "slots", title: "What we understood", summary: (c) => `${Object.values(c.d.slots).flat().length} lines · ${Object.values(c.d.slots).flat().filter((x) => x.o === "ai").length} AI-inferred to check`,
        render: (c) => `<div class="sec-tools" style="justify-content:flex-start;margin-top:0"><span class="muted" style="font-size:12px">Click any line to edit. Hover an origin tag to see the quote.</span><span style="flex:1"></span>${c.ro ? "" : `<button class="btn-link" data-act="accept-slots">Accept all AI-inferred lines</button>`}</div>
          ${[["idea", "Idea"], ["problem", "Problem"], ["users", "Intended users"], ["outcome", "Intended outcome"], ["context", "Context"], ["uses", "Use cases"]].map(([k, l]) => `<div class="sub-h">${l}</div>${H.lines("slots." + k)}`).join("")}` },
      { id: "qs", title: "A few questions", need: (c) => { const n = R.DEFS["idea-understanding"].questions(c).filter((q) => !c.S.ans[q.id]).length; return n ? `${n} to answer` : null; },
        summary: (c) => R.DEFS["idea-understanding"].questions(c).map((q) => c.S.ans[q.id]).filter(Boolean).join(" · "),
        render: (c) => R.DEFS["idea-understanding"].questions(c).map((q) => `<div class="q">${q.conflict ? `<div class="conflict"><b>Your idea and your document pull in different directions</b><div class="compare"><div><div class="eyebrow">Your idea</div>“get claims approved faster”</div><div><div class="eyebrow">Your document</div>“${esc(R.DOC.facts[0])}”</div></div></div>` : ""}
          <div class="q-t">${esc(q.t)}</div>${H.chips(q.id, q.o, q.sg)}${q.why ? `<p class="muted" style="font-size:12px;margin-top:6px">${esc(q.why)}</p>` : ""}</div>`).join("") },
      { id: "dir", title: "Direction & vision", need: (c) => (c.S.dec.dir ? null : "Pick one"), summary: (c) => (pick(DIRS, c.S.dec.dir) || {}).t || "",
        render: (c) => `<div class="choices">${DIRS.map((d) => H.choice("dir", d.id, `<span class="ct">${esc(d.t)}</span><span class="cd">${esc(d.d)}</span><span class="tags">${d.ai ? `<span class="ai-tag">Uses AI</span>` : ""}</span>`)).join("")}</div>
          ${c.S.dec.dir ? `<div class="sub-h" style="margin-top:16px">Vision</div>${H.text("vision", { big: true, another: "another" })}` : ""}` },
    ],
    roActs: [],
    todo(c) {
      const t = [], n = this.questions(c).filter((q) => !c.S.ans[q.id]).length;
      if (n) t.push({ sec: "qs", t: `Answer ${n} question${n > 1 ? "s" : ""}` });
      if (!c.S.dec.dir) t.push({ sec: "dir", t: "Pick a direction" });
      return t;
    },
    suggest(c) { this.questions(c).forEach((q) => { if (!c.S.ans[q.id] && q.sg) c.S.ans[q.id] = q.sg; if (!c.S.ans[q.id]) c.S.ans[q.id] = q.o[q.o.length - 1]; }); if (!c.S.dec.dir) c.S.dec.dir = "d_mobile"; },
    suggestLabel: "Use suggested answers",
    rows(c) {
      const d = c.d, a = c.S.ans;
      return [H.row("Idea", lst(d.slots.idea).join(" ")), H.row("Problem", lst(d.slots.problem)), H.row("Intended users", lst(d.slots.users)), H.row("Intended outcome", lst(d.slots.outcome).concat(a.speed ? ["Approval speed: " + a.speed] : [])),
        H.row("Context", lst(d.slots.context)), H.row("Direction", (pick(DIRS, c.S.dec.dir) || {}).t), H.row("Vision", c.S.dec.dir ? d.vision.t : ""),
        H.row("Decisions", [a.approve && "Manager approval: " + a.approve, a.capture && "Capture: " + a.capture, a.policy && "Policy check: " + a.policy].filter(Boolean))];
    },
    briefTitle: (c) => c.d.vision.t || "Idea Brief",
    handoff: () => "Opportunity & Discovery starts from this brief — idea, users and vision are reused, not asked again.",
    out(S) { const d = S.d; return { idea: lst(d.slots.idea)[0], problems: lst(d.slots.problem), users: lst(d.slots.users), outcome: lst(d.slots.outcome), context: lst(d.slots.context), uses: lst(d.slots.uses), dir: pick(DIRS, S.dec.dir), vision: d.vision.t, ans: S.ans, doc: d.doc }; },
  });
  R.DEFS["idea-understanding"].acts["accept-slots"] = (c) => Object.values(c.d.slots).flat().forEach((x) => { if (x.o === "ai") { R.uset(x, "o", "acc"); R.uset(x, "ol", "Accepted by you"); } });

  /* =========================================================== 02 OPPORTUNITY */
  const SRC = (t, s, extra) => ln(t, "src", Object.assign({ s }, extra || {}));
  R.define({
    id: "opportunity",
    intro: "Frame the opportunity, see what already exists in the market, and choose who the product is for first.",
    uses: ["idea-understanding"],
    genTitle: "Analyse the opportunity", genText: "Uses the confirmed Idea Brief. Market research only cites real products — no market sizes or statistics are invented.",
    genLabel: "Analyse & research", youGet: ["Opportunity statement", "4 lenses", "Source-backed findings", "Gaps not found", "Customer segments & personas"],
    rail: ["Reading the Idea Brief", "Framing four lenses", "Searching public sources", "Mapping customers"],
    build({ out }) {
      const b = out("idea-understanding") || {}, doc = b.doc, UP = T("up", "From Idea Brief");
      return {
        stmt: ln(`Make expense claims for field sales reps paperless and fast — from ${b.ans && b.ans.capture === "Phone + email forwarding" ? "phone or email" : "phone"} receipt capture through approval${doc ? " to finance entry in SAP Concur" : ""}.`, "ai"),
        lenses: [
          ln("Faster, tracked reimbursement with less manual handling by managers and finance.", "ai", { k: "Business", ol: "Builds on: outcome", ev: "Not evidenced yet" }),
          ln("Reps stop losing receipts and know where their claim is.", "ai", { k: "Customer", ol: "Builds on: problem", ev: "Stated in Idea Brief" }),
          ln("Several established expense tools already offer mobile receipt capture.", "src", { k: "Market", ol: "Builds on: research", ev: "Source-backed" }),
          ln(doc ? "Approved claims must reach SAP Concur, which finance uses today." : "Target finance system not known yet.", doc ? "doc" : "na", { k: "Technology", ol: doc ? "From your document" : "Not known yet", ev: doc ? "From your document" : "Not known" }),
        ],
        finds: [
          SRC("SAP Concur offers mobile receipt capture and an expense approval workflow.", "concur.com"),
          SRC("Expensify scans receipts from a phone photo and routes reports for approval.", "expensify.com"),
          SRC("Zoho Expense supports receipt scanning, policy rules and multi-level approval.", "zoho.com/expense"),
          SRC("Microsoft Power Automate can route approvals through Teams and email.", "learn.microsoft.com"),
        ].concat(doc ? [ln("Finance currently re-keys approved claims into SAP Concur.", "doc", { q: R.DOC.facts[1] })] : []),
        failed: true,
        gaps: [ln("Market size for field-sales expense tools — searched for, not found in reliable public sources", "na"), ln("Rate of lost receipts in field sales — searched for, not found", "na")],
        segs: [
          { id: "s_reps", t: "Field sales reps", role: "Submit claims", o: "up", wants: "Get reimbursed quickly", str: "Keeping paper receipts on the road", today: "Email receipts and wait" },
          { id: "s_mgr", t: "Line managers", role: "Approve claims", o: doc ? "doc" : "ai", wants: "Approve without chasing email", str: "Claims arrive scattered in the inbox", today: "Approve manually by email" },
          { id: "s_fin", t: "Finance team", role: "Check and pay", o: doc ? "doc" : "ai", wants: "Clean, policy-checked claims", str: doc ? "Re-keying claims into SAP Concur" : "Manual processing", today: doc ? "Re-key into SAP Concur" : "Not provided" },
        ],
        sugSeg: [{ id: "s_ops", t: "Sales operations", role: "Sets expense rules for the sales team", state: "open" }],
      };
    },
    acts: {
      retry: (c, b, api) => { b.disabled = true; b.textContent = "Retrying…"; setTimeout(() => { c.d.failed = false; c.d.finds.push(SRC("Google Document AI extracts fields such as totals and dates from receipt images.", "cloud.google.com")); api.set(null); }, 900); return false; },
      "seg-add": (c, b) => { const s = pick(c.d.sugSeg, b.dataset.id); R.uset(s, "state", "added"); },
      "seg-x": (c, b) => { const s = pick(c.d.sugSeg, b.dataset.id); R.uset(s, "state", "dismissed"); },
    },
    sections: [
      { id: "opp", title: "Opportunity", summary: (c) => c.d.stmt.t,
        render: (c) => `${H.text("stmt", { big: true })}<div class="sub-h" style="margin-top:14px">Four lenses</div>${H.lines("lenses", { extra: (it) => `<span class="muted" style="font-size:11.5px">Evidence: ${esc(it.ev)}</span>` })}` },
      { id: "mkt", title: "Market research", summary: (c) => `${on(c.d.finds).length} findings · ${c.d.gaps.length} gaps`,
        render: (c) => `${H.lines("finds", { number: true, off: "Not relevant", add: "Add a finding you know (no source → working assumption)", addOrigin: "as" })}
          ${c.d.failed ? `<div class="notice" style="margin:12px 0 0">${I.alert}<div class="grow">cloud.google.com couldn't be reached.</div>${c.ro ? "" : `<button class="btn btn-sm" data-act="retry">Retry</button>`}</div>` : ""}
          <div class="sub-h" style="margin-top:14px">Searched for, not found</div>${H.lines("gaps")}` },
      { id: "cust", title: "Customers", need: (c) => (c.S.dec.primary ? null : "Choose primary"), summary: (c) => "Primary: " + ((pick(c.d.segs, c.S.dec.primary) || {}).t || "not chosen"),
        render: (c) => `<p class="muted" style="font-size:12.5px;margin-bottom:10px">Pick the primary customer — the product is designed for them first.</p><div class="personas">${c.d.segs.concat(c.d.sugSeg.filter((s) => s.state === "added").map((s) => Object.assign({ o: "own" }, s))).map((s) => H.choice("primary", s.id, `<span class="ct">${esc(s.t)}</span><span class="cd">${esc(s.role)}</span>${s.wants ? `<div class="persona-row"><span>Wants</span><span>${esc(s.wants)}</span><span>Struggles</span><span>${esc(s.str)}</span><span>Today</span><span>${esc(s.today)}</span></div>` : ""}<span class="tags">${R.originTag(s.o === "up" ? "up" : s.o, s.o === "up" ? "From Idea Brief" : null)}</span>`)).join("")}
          ${c.d.sugSeg.filter((s) => s.state === "open").map((s) => `<div class="sugg"><b>${esc(s.t)}</b><span class="muted" style="font-size:12.5px">${esc(s.role)}</span>${R.originTag("sug", "Not in your brief")}${c.ro ? "" : `<div class="row"><button class="btn btn-sm" data-act="seg-add" data-id="${s.id}">${I.plus}Add</button><button class="btn btn-sm" data-act="seg-x" data-id="${s.id}">Dismiss</button></div>`}</div>`).join("")}</div>` },
    ],
    todo: (c) => (c.S.dec.primary ? [] : [{ sec: "cust", t: "Choose the primary customer" }]),
    suggest: (c) => { c.S.dec.primary = c.S.dec.primary || "s_reps"; },
    suggestLabel: "Use AI suggestion (Field sales reps)",
    rows(c) {
      const d = c.d; let n = 0;
      return [H.row("Opportunity", d.stmt.t), H.row("Primary customer", (pick(d.segs, c.S.dec.primary) || pick(d.sugSeg, c.S.dec.primary) || {}).t),
        H.row("Segments", d.segs.map((s) => s.t).concat(d.sugSeg.filter((s) => s.state === "added").map((s) => s.t))),
        H.row("Market findings", on(d.finds).map((f) => ({ html: `${esc(f.t)} <span class="cite">[${++n}]</span>` }))),
        H.row("Sources", on(d.finds).filter((f) => f.s).map((f) => f.s)), H.row("Open items", d.gaps.map((g) => g.t.split(" — ")[0]))];
    },
    briefTitle: (c) => c.d.stmt.t,
    out(S) { const d = S.d, segs = d.segs.concat(d.sugSeg.filter((s) => s.state === "added")); const p = pick(segs, S.dec.primary); return { stmt: d.stmt.t, segs: [p].concat(segs.filter((s) => s !== p)).filter(Boolean), primary: p, finds: on(d.finds), gaps: d.gaps }; },
  });

  /* =========================================================== 03 PROBLEM */
  const RC = [
    { id: "rc_capture", sym: "Receipts are lost", bec: "Receipts exist only on paper until the claim is written", root: "No capture at the point of purchase", q: "lose paper receipts" },
    { id: "rc_approval", sym: "Reimbursement takes weeks", bec: "Claims wait in managers' email inboxes", root: "Approval has no tracked queue or reminders", q: "claims are handled through email and approved manually" },
    { id: "rc_entry", sym: "Approved claims are slow to be paid", bec: "Finance re-keys every approved claim", root: "No link between approval and the finance system", q: R.DOC.facts[1] },
  ];
  const PQ = [
    { id: "claims", t: "How many claims does a rep submit per month?", o: ["1–3", "4–10", "More than 10", "Not known"] },
    { id: "wait", t: "How long does reimbursement take today?", o: ["Under a week", "1–3 weeks", "More than 3 weeks", "Not known"] },
    { id: "lost", t: "What happens when a receipt is lost?", o: ["Claim is rejected", "Rep pays it themselves", "Approved without receipt", "Not known"] },
    { id: "evid", t: "Do you have evidence of the problem beyond experience?", o: ["Yes, we have data", "Anecdotal only", "Not known"] },
  ];
  R.define({
    id: "problem-discovery",
    intro: "Confirm what's really going wrong, why, and how strongly it is evidenced.",
    uses: ["idea-understanding", "opportunity"],
    genTitle: "Discover the problem", genText: "Prefills the problem context from your confirmed briefs and traces root causes. Questions have no guessed answers.",
    genLabel: "Discover the problem", youGet: ["7 problem facets", "4 questions", "Root-cause chains", "3 framings", "Executive perspectives", "Evidence check"],
    rail: ["Reading Idea & Market briefs", "Prefilling problem context", "Tracing root causes", "Drafting framings"],
    build({ out }) {
      const b = out("idea-understanding") || {}, o = out("opportunity") || {}, UP = T("up", "From Idea Brief"), DC = T("doc");
      const docOK = b.doc;
      return {
        docOK,
        facets: [
          UP("Claims are emailed with receipts and approved manually", { k: "Current process" }),
          UP((b.problems || []).slice(0, 2).join("; "), { k: "Pain points" }),
          ln((o.segs || []).map((s) => s.t).join(", "), "up", { k: "Affected users", ol: "From Market brief" }),
          docOK ? DC("Finance re-keys approved claims into SAP Concur", { k: "Existing handling", q: R.DOC.facts[1] }) : ln("Not provided", "na", { k: "Existing handling" }),
          ln("Not known yet — see questions", "na", { k: "Frequency" }),
          UP("Reps wait weeks for money they have spent", { k: "Severity" }),
          docOK ? DC("Process notes document the approval chain", { k: "Evidence" }) : ln("Not known yet", "na", { k: "Evidence" }),
        ],
        rcs: RC.filter((r) => r.id !== "rc_entry" || docOK).map((r) => Object.assign({ t: r.root, o: r.id === "rc_entry" ? "doc" : "idea", ol: r.id === "rc_entry" ? "From your document" : "From your idea" }, r)),
        stmt: ln("", "ai"),
        persp: [
          ln("Slow reimbursement affects how field staff feel about working here.", "aip", { k: "CEO" }),
          ln("Manual re-keying and email approvals make spend hard to see before month-end.", "aip", { k: "CFO" }),
          ln("Managers and finance spend time chasing and re-typing claims.", "aip", { k: "COO" }),
          ln("Reps spend selling time on admin instead of customers.", "aip", { k: "CMO" }),
        ],
      };
    },
    framings(c) {
      const kept = on(c.d.rcs).map((r) => r.id), w = c.S.ans.wait;
      const waitTxt = w && w !== "Not known" ? ` (today: ${w.toLowerCase()})` : "";
      return [
        { id: "f_capture", t: "Capture problem", s: "Field sales reps lose paper receipts because nothing captures them when they pay, so claims are incomplete or rejected." },
        { id: "f_approval", t: "Approval problem", s: `Claims wait in managers' email with no tracking, so reimbursement is slow${waitTxt}.` },
        { id: "f_e2e", t: "End-to-end problem", rec: true, s: `Field sales reps wait too long to be reimbursed${waitTxt} because ${[kept.includes("rc_capture") && "receipts are captured on paper", kept.includes("rc_approval") && "approvals run through untracked email", kept.includes("rc_entry") && "finance re-keys every approved claim"].filter(Boolean).join(", ") || "of causes still to be confirmed"}.` },
      ];
    },
    derive(c) { const f = pick(this.framings(c), c.S.dec.framing); if (f && !(c.d.stmt.u && c.d.stmt.u.t)) c.d.stmt.t = f.s; },
    evidence(c) {
      const a = c.S.ans, st = (v) => (!v ? "Not answered" : v === "Not known" ? "Not known" : "Stated by you");
      return [
        { k: "Process & approval chain", v: c.d.docOK ? "Documented" : "Not known" },
        { k: "Finance re-keying", v: c.d.docOK ? "Documented" : "Not known" },
        { k: "Reimbursement wait", v: a.wait && a.wait !== "Not known" ? "Corroborated" : st(a.wait), note: "Idea Brief + your answer" },
        { k: "Claim volume", v: st(a.claims) },
        { k: "Supporting data", v: a.evid === "Yes, we have data" ? "Stated by you" : a.evid ? "Not known" : "Not answered" },
      ];
    },
    canValidate(c) { const ev = this.evidence(c); return ev.some((e) => e.v === "Documented") && !ev.some((e) => e.v === "Not known" || e.v === "Not answered"); },
    onAnswer(c) { if (c.S.dec.evid === "validated" && !this.canValidate(c)) delete c.S.dec.evid; },
    sections: [
      { id: "ctx", title: "Problem context", summary: (c) => `${c.d.facets.length} facets prefilled · ${c.d.facets.filter((f) => f.o === "na").length} not known`, render: (c) => H.lines("facets") },
      { id: "qs", title: "Questions", need: (c) => { const n = PQ.filter((q) => !c.S.ans[q.id]).length; return n ? `${n} to answer` : null; }, summary: (c) => PQ.map((q) => c.S.ans[q.id]).filter(Boolean).join(" · "),
        render: (c) => PQ.map((q) => `<div class="q">${q.id === "wait" && c.S.ans.wait === "Under a week" ? `<div class="conflict"><b>This conflicts with your Idea Brief</b><div class="compare"><div><div class="eyebrow">Idea Brief</div>“wait weeks for expense reimbursement”</div><div><div class="eyebrow">Your answer</div>Under a week</div></div><p style="font-size:12.5px">Keep your answer if it's more accurate — the problem statement will follow it.</p></div>` : ""}<div class="q-t">${esc(q.t)}</div>${H.chips(q.id, q.o)}</div>`).join("") },
      { id: "rc", title: "Root causes", summary: (c) => on(c.d.rcs).map((r) => r.t).join(" · "),
        render: (c) => H.lines("rcs", { off: "Not a cause", offShown: "Marked not a cause", quote: true, add: "Add a root cause you know", extra: (r) => r.sym ? `<span class="muted" style="font-size:11.5px">${esc(r.sym)} → because ${esc(r.bec.toLowerCase())}</span>` : "" }) },
      { id: "frame", title: "Problem statement", need: (c) => (c.S.dec.framing ? null : "Pick a framing"), summary: (c) => c.d.stmt.t,
        render: (c) => `<div class="choices">${R.DEFS["problem-discovery"].framings(c).map((f) => H.choice("framing", f.id, `<span class="ct">${esc(f.t)}${f.rec ? ` <span class="rec">AI pick</span>` : ""}</span><span class="cd">${esc(f.s)}</span>`)).join("")}</div>
          ${c.S.dec.framing ? `<div class="sub-h" style="margin-top:16px">Statement</div>${H.text("stmt", { big: true })}<div class="sub-h" style="margin-top:14px">Leadership perspectives</div>${H.lines("persp")}` : ""}` },
      { id: "ev", title: "Evidence check", need: (c) => (c.S.dec.evid ? null : "Decide"), summary: (c) => (c.S.dec.evid === "validated" ? "Validated problem" : c.S.dec.evid ? "Working assumption" : ""),
        render: (c) => { const D = R.DEFS["problem-discovery"], can = D.canValidate(c); return `<div class="items">${D.evidence(c).map((e) => `<div class="item"><div class="k">${esc(e.k)}</div><div class="body"><span class="origin ${e.v === "Documented" ? "o-doc" : e.v === "Corroborated" || e.v === "Stated by you" ? "o-ans" : "o-na"}">${esc(e.v)}</span>${e.note ? ` <span class="muted" style="font-size:11.5px">${esc(e.note)}</span>` : ""}</div></div>`).join("")}</div>
          <div class="choices" style="margin-top:12px">${H.choice("evid", "validated", `<span class="ct">Validated problem</span><span class="cd">${can ? "Something is documented and nothing key is unknown." : "Not available — something key is unknown or undocumented."}</span>`, can ? "" : "dashed\" disabled data-x=\"")}${H.choice("evid", "assumption", `<span class="ct">Working assumption</span><span class="cd">Carry forward and validate later.</span>`)}</div>`; } },
    ],
    todo(c) {
      const t = [], n = PQ.filter((q) => !c.S.ans[q.id]).length;
      if (n) t.push({ sec: "qs", t: `Answer ${n} question${n > 1 ? "s" : ""}` });
      if (!c.S.dec.framing) t.push({ sec: "frame", t: "Pick a problem framing" });
      if (!c.S.dec.evid) t.push({ sec: "ev", t: "Decide: validated or assumption" });
      return t;
    },
    suggest: (c) => { c.S.dec.framing = c.S.dec.framing || "f_e2e"; },
    suggestLabel: "Use AI framing (end-to-end)",
    demo(c) { Object.assign(c.S.ans, { claims: "4–10", wait: "1–3 weeks", lost: "Rep pays it themselves", evid: "Anecdotal only" }); c.S.dec.framing = "f_e2e"; c.S.dec.evid = "assumption"; },
    rows(c) {
      return [H.row("Problem statement", c.S.dec.framing ? c.d.stmt.t : ""), H.row("Root causes", on(c.d.rcs).map((r) => r.t)), H.row("Affected users", c.d.facets[2].t),
        H.row("Frequency", c.S.ans.claims ? c.S.ans.claims + " claims / rep / month" : ""), H.row("Reimbursement wait", c.S.ans.wait), H.row("Lost receipts", c.S.ans.lost),
        H.row("Status", c.S.dec.evid === "validated" ? "Validated problem" : c.S.dec.evid ? "Working assumption" : "")];
    },
    briefTitle: (c) => c.d.stmt.t,
    out(S) { const d = S.d; return { stmt: d.stmt.t, rcs: on(d.rcs), validated: S.dec.evid === "validated", ans: S.ans }; },
  });

  /* =========================================================== 04 SOLUTION */
  const CRIT = [["value", "User value"], ["feas", "Technical feasibility"], ["data", "Data readiness"], ["ai", "AI capability"], ["cx", "Complexity"], ["risk", "Risk"], ["impact", "Expected impact"]];
  const OPTS = [
    { id: "o_mobile", t: "Mobile app with AI receipt reading", d: "Capture on phone, AI pre-fills the claim, tracked approval, export to finance.", ai: true, rec: true, covers: ["rc_capture", "rc_approval", "rc_entry"],
      caps: [["cap_capture", "Photograph a receipt in the app", "rc_capture"], ["cap_extract", "AI reads amount, date and merchant", "rc_capture"], ["cap_queue", "Manager approval queue with reminders", "rc_approval"], ["cap_status", "Claim status visible to the rep", "rc_approval"], ["cap_export", "Send approved claims to SAP Concur", "rc_entry"]],
      r: { value: ["High", "From the problem"], feas: ["Medium", "Market research"], data: ["Medium", "AI estimate"], ai: ["High", "Market research"], cx: ["Medium", "AI estimate"], risk: ["Medium", "AI estimate"], impact: ["High", "From the problem"] } },
    { id: "o_workflow", t: "Digital approval workflow", d: "Web claim form with receipt upload and a tracked approval queue.", covers: ["rc_approval"],
      caps: [["cap_form", "Web claim form with receipt upload", "rc_capture"], ["cap_queue", "Manager approval queue with reminders", "rc_approval"]],
      r: { value: ["Medium", "From the problem"], feas: ["High", "Market research"], data: ["High", "Your earlier pages"], ai: ["Low", "AI estimate"], cx: ["Low", "AI estimate"], risk: ["Low", "AI estimate"], impact: ["Medium", "AI estimate"] } },
    { id: "o_inbox", t: "Receipt inbox by email", d: "Reps forward receipts to a shared inbox; finance builds the claim.", covers: ["rc_capture"],
      caps: [["cap_inbox", "Shared receipt inbox", "rc_capture"]],
      r: { value: ["Low", "AI estimate"], feas: ["High", "AI estimate"], data: ["Medium", "AI estimate"], ai: ["Low", "AI estimate"], cx: ["Low", "AI estimate"], risk: ["Medium", "AI estimate"], impact: ["Low", "AI estimate"] } },
  ];
  R.define({
    id: "solution-discovery",
    intro: "Compare solution options against the root causes and pick one. Ratings are High / Medium / Low with their basis — no scores.",
    uses: ["problem-discovery"],
    genTitle: "Find solution options", genText: "Builds three options from the confirmed Problem Statement and rates them against your root causes.",
    genLabel: "Find options", youGet: ["3 options + your own", "Coverage per root cause", "Evaluation with basis", "Capabilities linked to causes"],
    rail: ["Reading the Problem Statement", "Drafting options", "Rating against root causes"],
    build({ out }) {
      const p = out("problem-discovery") || { rcs: [] }, rcIds = p.rcs.map((r) => r.id);
      const d = { rcs: p.rcs.map((r) => ({ id: r.id, t: r.t })), validated: p.validated, opts: [], rate: [], caps: {} };
      OPTS.forEach((o) => {
        d.opts.push({ id: o.id, t: o.t, desc: o.d, ai: o.ai, rec: o.rec, covers: o.covers.filter((x) => rcIds.includes(x)) });
        d.caps[o.id] = o.caps.filter((c) => rcIds.includes(c[2])).map((c) => ({ id: c[0], t: c[1], rc: c[2], o: "ai", ol: "Linked to " + c[2].replace("rc_", "") }));
        CRIT.forEach(([k]) => d.rate.push({ id: o.id + ":" + k, r: o.r[k][0], b: o.r[k][1] }));
      });
      return d;
    },
    newItem: (path) => (path === "opts" ? { desc: "Your option", covers: [] } : path.indexOf("caps.") === 0 ? { rc: null } : {}),
    derive(c) { c.d.opts.forEach((o) => { if (!c.d.caps[o.id]) c.d.caps[o.id] = []; CRIT.forEach(([k]) => { if (!pick(c.d.rate, o.id + ":" + k)) c.d.rate.push({ id: o.id + ":" + k, r: "Not rated", b: "Not rated" }); }); }); },
    acts: { "ev-add": (c, b) => { const r = pick(c.d.rate, b.dataset.id); R.uset(r, "b", "Evidence added by you"); R.uset(r, "adj", true); } },
    sections: [
      { id: "opts", title: "Options", need: (c) => (c.S.dec.opt ? null : "Select one"), summary: (c) => "Selected: " + ((pick(c.d.opts, c.S.dec.opt) || {}).t || "none"),
        render: (c) => `<div class="choices">${c.d.opts.map((o) => H.choice("opt", o.id, `<span class="ct">${esc(o.t)}${o.rec ? ` <span class="rec">Recommended</span>` : ""}</span><span class="cd">${esc(o.desc)}</span>
          <span class="covers">${c.d.rcs.map((r) => `<span class="${o.covers.includes(r.id) ? "y" : "n"}">${o.covers.includes(r.id) ? I.check : I.x}${esc(r.t)}</span>`).join("")}</span><span class="tags">${o.ai ? `<span class="ai-tag">Uses AI</span>` : ""}${o.own ? R.originTag("own") : ""}</span>`)).join("")}</div>
          ${c.ro ? "" : H.addRow("opts", "Write your own option")}<p class="muted" style="font-size:12px;margin-top:8px">“Recommended” is an AI label. You decide.</p>` },
      { id: "eval", title: "Evaluation", summary: () => "7 criteria · click a rating to adjust it",
        render: (c) => `<div class="cmp-wrap"><table class="cmp"><thead><tr><th>Criterion</th>${c.d.opts.map((o) => `<th class="${c.S.dec.opt === o.id ? "sel" : ""}">${esc(o.t.split(" ").slice(0, 3).join(" "))}</th>`).join("")}</tr></thead><tbody>
          <tr><td>Root causes fixed</td>${c.d.opts.map((o) => `<td class="${c.S.dec.opt === o.id ? "sel" : ""}"><b>${o.covers.length}</b> of ${c.d.rcs.length}</td>`).join("")}</tr>
          ${CRIT.map(([k, l]) => `<tr><td>${l}</td>${c.d.opts.map((o) => { const r = pick(c.d.rate, o.id + ":" + k); return `<td class="${c.S.dec.opt === o.id ? "sel" : ""}">${H.cycle("rate", r.id, "r", ["High", "Medium", "Low"], "rating " + H.rateCls(r.r), r.r, "adj")}<span class="basis ${r.adj ? "ed" : ""}">${r.adj && r.b !== "Evidence added by you" ? "Adjusted by you" : esc(r.b)}</span>${c.S.dec.opt === o.id && r.b === "AI estimate" && !r.adj && !c.ro && ["value", "feas", "data"].includes(k) ? `<button class="btn-link" style="font-size:11px" data-act="ev-add" data-id="${r.id}">Add evidence</button>` : ""}</td>`; }).join("")}</tr>`).join("")}</tbody></table></div>` },
      { id: "caps", title: "Capabilities of the selected option", when: (c) => !!c.S.dec.opt, summary: (c) => `${(c.d.caps[c.S.dec.opt] || []).length} capabilities`,
        render: (c) => H.lines("caps." + c.S.dec.opt, { off: "Remove", offShown: "Removed", add: "Add a capability", extra: (it) => it.rc ? `<span class="muted" style="font-size:11.5px">Fixes: ${esc((pick(c.d.rcs, it.rc) || {}).t || it.rc)}</span>` : `<span class="muted" style="font-size:11.5px">No root cause linked</span>` }) },
    ],
    status(c) {
      const o = c.S.dec.opt; if (!o) return null;
      const est = ["value", "feas", "data"].filter((k) => { const r = pick(c.d.rate, o + ":" + k); return r && (r.b === "AI estimate" || r.b === "Not rated") && !r.adj; });
      return { ok: c.d.validated && !est.length, toValidate: (!c.d.validated ? ["Problem is a working assumption"] : []).concat(est.map((k) => CRIT.find((x) => x[0] === k)[1] + " is an AI estimate")) };
    },
    todo: (c) => (c.S.dec.opt ? [] : [{ sec: "opts", t: "Select a solution option" }]),
    suggest: (c) => { c.S.dec.opt = c.S.dec.opt || "o_mobile"; },
    suggestLabel: "Use recommended option",
    rows(c) {
      const o = pick(c.d.opts, c.S.dec.opt), st = this.status(c);
      return [H.row("Selected option", o && o.t), H.row("Capabilities", o ? on(c.d.caps[o.id]).map((x) => x.t) : []), H.row("Root causes addressed", o ? c.d.rcs.filter((r) => o.covers.includes(r.id)).map((r) => r.t) : []),
        H.row("Key ratings", o ? CRIT.slice(0, 4).map(([k, l]) => `${l}: ${pick(c.d.rate, o.id + ":" + k).r}`) : []),
        H.row("Status", st ? (st.ok ? "Evidence-backed" : "Working assumption") : ""), H.row("To validate", st ? st.toValidate : [])];
    },
    briefTitle: (c) => (pick(c.d.opts, c.S.dec.opt) || {}).t,
    out(S) {
      const d = S.d, o = pick(d.opts, S.dec.opt) || {};
      return { opt: o, caps: on(d.caps[o.id] || []), rcs: d.rcs, notChosen: d.opts.filter((x) => x.id !== o.id).map((x) => ({ t: x.t, caps: (d.caps[x.id] || []).filter((c) => !on(d.caps[o.id] || []).find((y) => y.id === c.id)) })),
        uncovered: d.rcs.filter((r) => !(o.covers || []).includes(r.id)), rate: Object.fromEntries(CRIT.map(([k, l]) => [k, Object.assign({ l }, pick(d.rate, o.id + ":" + k))])) };
    },
  });

  /* =========================================================== 05 BUSINESS */
  const CV = [["kp", "Key partners"], ["ka", "Key activities"], ["kr", "Key resources"], ["vp", "Value proposition"], ["cr", "Customer relationships"], ["ch", "Channels"], ["cs", "Customer segments"], ["co", "Cost structure"], ["rs", "Revenue / value streams"]];
  const num = (v) => { const n = parseFloat(String(v || "").replace(/[, ]/g, "")); return isNaN(n) ? null : n; };
  function fin(f) {
    const F = f.fin || {}, cost = num(F.cost), run = num(F.run), sav = num(F.save), oth = num(F.other);
    const net = sav != null && run != null ? sav + (oth || 0) - run : null;
    return { cur: F.cur || "EUR", net, pay: net != null && net > 0 && cost != null ? cost / net : null, any: [cost, run, sav, oth].some((x) => x != null) };
  }
  const money = (cur, n) => n == null ? "Not calculated" : new Intl.NumberFormat("en", { style: "currency", currency: cur, maximumFractionDigits: 0 }).format(n);
  R.define({
    id: "business-model",
    intro: "Lay out how the solution creates value. Money figures come only from you; everything else reuses earlier pages.",
    uses: ["opportunity", "solution-discovery"],
    genTitle: "Draft the business model", genText: "Reuses segments, the selected solution and its ratings. No financial figures are generated.",
    genLabel: "Draft the business model", youGet: ["Nine-block canvas", "Business case", "Your financial figures", "Risks & dependencies", "Feasibility verdict"],
    rail: ["Reading Solution & Market briefs", "Filling the canvas", "Listing risks and dependencies", "Assessing feasibility"],
    initInput: () => ({ fin: { cur: "EUR" } }),
    demoInput: () => ({ fin: { cur: "EUR" } }),
    build({ out }) {
      const o = out("opportunity") || { segs: [] }, s = out("solution-discovery") || { caps: [], rate: {} }, b = out("idea-understanding") || {};
      const UPs = T("up", "From Solution"), UPo = T("up", "From Market brief"), A = T("ai"), DOC = b.doc;
      return {
        cv: {
          kp: [DOC ? ln("SAP Concur (finance system)", "doc") : A("Finance system vendor — not known yet"), A("Receipt-reading AI service")],
          ka: [UPs("Run the claim and approval flow"), A("Maintain expense policy rules")],
          kr: [UPs("Mobile app and approval service"), DOC ? ln("Company expense policy", "doc") : A("Expense policy")],
          vp: [UPs(s.opt.t || "Selected solution"), UPo(o.stmt || "")],
          cr: [A("Self-service for reps; in-app reminders for managers")],
          ch: [A("Company mobile device management"), A("Manager notifications in email / Teams")],
          cs: (o.segs || []).map((x) => UPo(x.t)),
          co: [A("Build and run cost — figures from you"), A("AI usage per receipt — figure not known")],
          rs: [A("Internal value: time saved and faster reimbursement — not a revenue product")],
        },
        vp: ln(`${(o.primary || {}).t || "Reps"} get reimbursed without paper or chasing, and managers and finance handle claims in one tracked flow.`, "ai"),
        obj: [A("Remove paper receipts from the claim process"), A("Make every claim's approval status visible"), A("Remove manual re-keying by finance")].filter((x, i) => i < 2 || DOC),
        goals: [A("Shorten time from purchase to reimbursement"), A("Reduce claims rejected for missing receipts"), A("Reduce finance handling time per claim")],
        ben: [A("Reps spend less time on admin"), A("Managers approve from one queue"), A("Policy applied consistently at submission")],
        risks: [
          ln("Receipt reading is wrong on crumpled or foreign receipts", "ai", { id: "r1", sev: "Medium", mit: "Rep confirms extracted fields before submitting" }),
          ln("Managers ignore the new approval queue", "ai", { id: "r2", sev: "High", mit: "Reminders and escalation after a set number of days" }),
          ln("SAP Concur integration takes longer than planned", "ai", { id: "r3", sev: DOC ? "Medium" : "Low", mit: "Start with file export; integrate later" }),
        ],
        deps: [DOC ? ln("Access to SAP Concur import", "doc") : A("Finance system access"), A("Company devices or BYOD policy for the app")],
        cons: [DOC ? ln("Claims must follow the company expense policy", "doc", { q: R.DOC.facts[2] }) : A("Expense policy — not provided"), DOC ? ln("Line managers approve every claim before finance", "doc", { q: R.DOC.facts[0] }) : A("Approval chain — not provided")],
        assm: (s.rate && Object.values(s.rate).filter((r) => r.b === "AI estimate").map((r) => ln(r.l + " rated " + r.r + " (AI estimate)", "as"))) || [],
        feas: [
          { k: "Technical", r: (s.rate.feas || {}).r || "Not assessed", b: (s.rate.feas || {}).b || "" },
          { k: "Data", r: (s.rate.data || {}).r || "Not assessed", b: (s.rate.data || {}).b || "" },
          { k: "AI", r: (s.rate.ai || {}).r || "Not assessed", b: (s.rate.ai || {}).b || "" },
          { k: "Operational", r: "Medium", b: "AI estimate" },
        ],
      };
    },
    acts: {},
    live(c, main) { const F = fin(c.S.f), el = main.querySelector("#fin-out"); if (el) el.innerHTML = finOut(F); },
    sections: [
      { id: "canvas", title: "Business model canvas", summary: () => "Nine blocks · reuses Market & Solution briefs",
        render: (c) => `<div class="canvas">${CV.map(([k, l]) => `<div class="cv cv-${k}"><h4>${l}</h4><ul>${c.d.cv[k].map((it) => { const key = `cv.${k}#${it.id}`; return c.S && R.cur.U.edit === key && !c.ro ? `<li><textarea class="inline-edit" data-edit="${esc(key)}">${esc(it.t)}</textarea></li>` : `<li class="mini ${it.o === "ed" ? "e" : it.o === "ai" ? "a" : ""}" ${c.ro ? "" : `data-act="edit" data-key="${esc(key)}"`} title="${esc(R.originTag(it.o, it.ol).replace(/<[^>]+>/g, ""))}">${esc(it.t)}</li>`; }).join("")}</ul></div>`).join("")}</div>
          <p class="muted" style="font-size:12px;margin-top:8px">Amber = AI inferred · green = edited by you · black = from earlier pages or your document. Click to edit.</p>` },
      { id: "case", title: "Business case", summary: (c) => c.d.vp.t,
        render: (c) => `<div class="sub-h">Value proposition</div>${H.text("vp")}<div class="sub-h">Objectives</div>${H.lines("obj", { add: "Add objective" })}<div class="sub-h">Business goals <span style="text-transform:none;letter-spacing:0">(no targets — Product Definition sets metrics)</span></div>${H.lines("goals", { add: "Add goal" })}<div class="sub-h">Benefits</div>${H.lines("ben")}` },
      { id: "fin", title: "Financial figures", summary: (c) => { const F = fin(c.S.f); return F.any ? `Net yearly benefit ${money(F.cur, F.net)}` : "Optional · entered by you only"; },
        render: (c) => { const f = c.S.f.fin || {}; return `<p class="muted" style="font-size:12.5px;margin-bottom:10px">Nothing here is estimated by AI. Leave blank if not known — Business feasibility then stays “Not assessed”.</p>
          <div class="fin-grid"><label>Currency<select class="txt" data-bind="fin.cur" ${c.ro ? "disabled" : ""}>${["EUR", "USD", "GBP", "INR"].map((x) => `<option ${f.cur === x ? "selected" : ""}>${x}</option>`).join("")}</select></label>
          <label>One-off build cost${H.bind("fin.cost", f.cost, { extra: 'inputmode="decimal" placeholder="Not provided"' })}</label><label>Yearly running cost${H.bind("fin.run", f.run, { extra: 'inputmode="decimal" placeholder="Not provided"' })}</label><label>Yearly savings${H.bind("fin.save", f.save, { extra: 'inputmode="decimal" placeholder="Not provided"' })}</label></div>
          <div class="fin-out" id="fin-out">${finOut(fin(c.S.f))}</div>`; } },
      { id: "risk", title: "Risks, dependencies & constraints", summary: (c) => `${c.d.risks.length} risks · ${c.d.risks.filter((r) => r.sev === "High").length} high`,
        render: (c) => `${H.lines("risks", { extra: (r) => `${H.cycle("risks", r.id, "sev", ["High", "Medium", "Low"], "sev " + r.sev, r.sev)}<span class="muted" style="font-size:12px">Mitigation: ${esc(r.mit || "—")}</span>` })}
          <div class="sub-h">Dependencies</div>${H.lines("deps")}<div class="sub-h">Constraints</div>${H.lines("cons")}${c.d.assm.length ? `<div class="sub-h">Carried assumptions</div>${H.lines("assm")}` : ""}` },
      { id: "feas", title: "Feasibility", need: (c) => (c.S.dec.go ? null : "Decide"), summary: (c) => ({ go: "Proceed", cond: "Proceed with conditions", stop: "Do not proceed" }[c.S.dec.go] || ""),
        render: (c) => { const F = fin(c.S.f); return `<div class="items">${c.d.feas.map((f) => `<div class="item"><div class="k">${f.k}</div><div class="body"><span class="rating ${H.rateCls(f.r)}" style="cursor:default">${esc(f.r)}</span><span class="basis">${esc(f.b)}</span></div></div>`).join("")}
          <div class="item"><div class="k">Business</div><div class="body">${F.net != null ? `<span class="rating ${F.net > 0 ? "H" : "L"}" style="cursor:default">${F.net > 0 ? "Positive" : "Negative"}</span><span class="basis ed">From your figures</span>` : `<span class="origin o-na">Not assessed</span><span class="basis">Needs your figures</span>`}</div></div></div>
          <div class="choices" style="margin-top:12px">${H.choice("go", "go", `<span class="ct">Proceed</span>`)}${H.choice("go", "cond", `<span class="ct">Proceed with conditions</span><span class="cd">Validate AI estimates and integration access first.</span>`)}${H.choice("go", "stop", `<span class="ct">Do not proceed</span>`)}</div>`; } },
    ],
    todo: (c) => (c.S.dec.go ? [] : [{ sec: "feas", t: "Decide on feasibility" }]),
    demo: (c) => { c.S.dec.go = "cond"; },
    rows(c) {
      const F = fin(c.S.f);
      return [H.row("Value proposition", c.d.vp.t), H.row("Objectives", lst(c.d.obj)), H.row("Business goals", lst(c.d.goals)), H.row("Benefits", lst(c.d.ben)),
        H.row("Net yearly benefit", F.net != null ? money(F.cur, F.net) + " (from your figures)" : "Not provided"), H.row("Payback", F.pay != null ? F.pay.toFixed(1) + " years" : "Not calculated"),
        H.row("Top risks", c.d.risks.map((r) => `${r.sev}: ${r.t}`)), H.row("Verdict", { go: "Proceed", cond: "Proceed with conditions", stop: "Do not proceed" }[c.S.dec.go])];
    },
    briefTitle: (c) => c.d.vp.t,
    handoff: () => "Product Definition reuses the vision (Idea), users (Opportunity), features (Solution capabilities) and goals (this page).",
    out(S) { const d = S.d; return { vp: d.vp.t, goals: on(d.goals), obj: lst(d.obj), risks: d.risks, cons: lst(d.cons), deps: lst(d.deps), fin: fin(S.f), go: S.dec.go }; },
  });
  function finOut(F) { return `<div><span class="eyebrow">Net yearly benefit</span><b>${money(F.cur, F.net)}</b><span class="basis">savings − running cost</span></div><div><span class="eyebrow">Payback</span><b>${F.pay != null ? F.pay.toFixed(1) + " years" : "Not calculated"}</b><span class="basis">build cost ÷ net yearly benefit</span></div>`; }
})();
