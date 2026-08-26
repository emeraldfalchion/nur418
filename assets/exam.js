/* ============================================================
   exam.js — practice-exam engine.
   An exam page includes a data file that sets `window.EXAM_DATA`,
   then includes this file. It renders the exam into #exam-root,
   grades on submit, marks right/wrong with rationales, and lets
   the user filter to just the ones they missed.

   EXAM_DATA shape — each question is one of:

   Single answer (radio buttons):
     {
       stem: "Question text…",
       options: ["A text", "B text", "C text", "D text"],
       answer: 2,                 // index of the one correct option
       rationale: "Why…"
     }

   Select all that apply (checkboxes):
     {
       stem: "Question text…",
       options: [...],
       answers: [0, 2, 3],        // indices of ALL correct options
       rationale: "Why…"
     }
   SATA is graded all-or-nothing: the selected set must exactly match.
   ============================================================ */
(function () {
  const data = window.EXAM_DATA;
  const root = document.getElementById("exam-root");
  if (!data || !root) return;

  const LETTERS = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const questions = data.questions || [];

  // Canonical topic order (matches data/quiz-bank.js's topic order / week sequence).
  /* Display order for the topic-breakdown strip at the top of an exam.
     Set window.TOPIC_ORDER in a page or data file to the topic labels in
     the order you want them shown (usually course order). Any topic not
     listed is appended in the order it is first seen, so leaving this
     unset is harmless. */
  const TOPIC_ORDER = (window.TOPIC_ORDER || []).slice();

  /* ---- Topic breakdown (only renders if questions carry a `topic` field) ----
     A concise per-topic question count near the top of the page. Reads
     the topic straight off each question, so editing the exam's question
     mix later just works — no manual recount needed. */
  (function renderTopicBreakdown() {
    const counts = {};
    let any = false;
    questions.forEach(q => {
      if (!q.topic) return;
      any = true;
      counts[q.topic] = (counts[q.topic] || 0) + 1;
    });
    if (!any) return;

    const order = TOPIC_ORDER.filter(t => counts[t]);
    Object.keys(counts).forEach(t => { if (!order.includes(t)) order.push(t); });

    const wrap = document.createElement("div");
    wrap.className = "topic-breakdown";
    wrap.innerHTML = '<span class="tb-label">Topic breakdown:</span>' +
      order.map(t => `<span class="badge">${t} · ${counts[t]}</span>`).join("") +
      `<span class="tb-total">${questions.length} total</span>`;
    root.appendChild(wrap);
  })();

  // ---- Score history (per page, saved locally) ----
  const SCORE_KEY = (window.STORE_PREFIX || "study") + "-scores";
  const scoreId = data.id || (location.pathname.split("/").pop() || "exam");
  const trackHistory = data.history !== false;
  function saveScore(entry) {
    let all; try { all = JSON.parse(localStorage.getItem(SCORE_KEY)) || {}; } catch (e) { all = {}; }
    (all[scoreId] = all[scoreId] || []).push(entry);
    if (all[scoreId].length > 12) all[scoreId] = all[scoreId].slice(-12);
    try { localStorage.setItem(SCORE_KEY, JSON.stringify(all)); } catch (e) {}
    return all[scoreId];
  }
  function fmtDate(ts) {
    const d = new Date(ts);
    return d.toLocaleDateString(undefined, { month: "short", day: "numeric" }) + " " +
           d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
  }

  // Normalize: figure out SATA vs single, and the sorted correct-index set.
  const model = questions.map(q => {
    const isSata = Array.isArray(q.answers);
    const correct = (isSata ? q.answers.slice() : [q.answer]).sort((a, b) => a - b);
    return { q, isSata, correct };
  });

  // answers[qi]: single -> number|null ; sata -> array of indices
  const answers = model.map(m => (m.isSata ? [] : null));
  let graded = false;

  /* ---- In-progress answers, so a stray reload doesn't wipe 65 questions ----
     Stored against a fingerprint of the question set, so answers are only
     restored into the exact same exam — edit a data file and the stale
     progress is ignored rather than mapped onto the wrong questions.
     Skipped for the custom Build-Your-Own exam (history:false), which
     reshuffles its questions on every run. */
  const PROG_KEY = (window.STORE_PREFIX || "study") + "-progress";
  const persist = trackHistory;
  const fingerprint = (() => {
    const s = questions.map(q => q.stem).join("|");
    let h = 0;
    for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
    return questions.length + ":" + h;
  })();
  function readProgress() {
    if (!persist) return null;
    try {
      const rec = (JSON.parse(localStorage.getItem(PROG_KEY)) || {})[scoreId];
      return rec && rec.fp === fingerprint && Array.isArray(rec.a) && rec.a.length === questions.length ? rec.a : null;
    } catch (e) { return null; }
  }
  function saveProgress() {
    if (!persist || graded) return;
    try {
      const all = JSON.parse(localStorage.getItem(PROG_KEY)) || {};
      all[scoreId] = { fp: fingerprint, a: answers };
      localStorage.setItem(PROG_KEY, JSON.stringify(all));
    } catch (e) {}
  }
  function clearProgress() {
    if (!persist) return;
    try {
      const all = JSON.parse(localStorage.getItem(PROG_KEY)) || {};
      delete all[scoreId];
      localStorage.setItem(PROG_KEY, JSON.stringify(all));
    } catch (e) {}
  }
  const restored = readProgress();
  if (restored) restored.forEach((v, i) => { answers[i] = v; });

  /* ---------- Build the quiz form ---------- */
  const form = document.createElement("form");
  form.className = "exam-form";
  form.setAttribute("novalidate", "");

  model.forEach((m, qi) => {
    const { q, isSata } = m;
    const card = document.createElement("section");
    card.className = "q-card" + (isSata ? " q-sata" : "");
    card.id = "q" + (qi + 1);
    card.dataset.qi = qi;
    const sataTag = isSata ? '<span class="sata-tag">Select all that apply</span>' : "";
    card.innerHTML =
      `<div class="q-head"><span class="q-num">${qi + 1}</span>
         <div class="q-stemwrap"><p class="q-stem">${q.stem}</p>${sataTag}</div></div>`;

    const ul = document.createElement("ul");
    ul.className = "options";
    q.options.forEach((opt, oi) => {
      const li = document.createElement("li");
      const label = document.createElement("label");
      label.className = "option";
      label.dataset.oi = oi;
      label.innerHTML =
        `<input type="${isSata ? "checkbox" : "radio"}" name="q${qi}" value="${oi}">
         <span class="opt-letter">${LETTERS[oi]}</span>
         <span class="opt-text">${opt}</span>`;
      const input = label.querySelector("input");
      const prior = answers[qi];
      if (isSata ? (prior || []).indexOf(oi) >= 0 : prior === oi) input.checked = true;
      input.addEventListener("change", e => {
        if (graded) return;
        if (isSata) {
          const set = new Set(answers[qi]);
          if (e.target.checked) set.add(oi); else set.delete(oi);
          answers[qi] = Array.from(set);
        } else {
          answers[qi] = oi;
        }
        saveProgress();
        updateProgress();
      });
      li.appendChild(label);
      ul.appendChild(li);
    });
    card.appendChild(ul);
    form.appendChild(card);
  });

  /* ---------- Submit bar (sticky, bottom; hidden after grading) ---------- */
  const actions = document.createElement("div");
  actions.className = "exam-actions";
  form.appendChild(actions);

  if (restored) {
    const note = document.createElement("p");
    note.className = "note resume-note";
    note.innerHTML = 'Picked up where you left off — your earlier answers are still selected. ' +
      '<button type="button" class="btn btn-ghost" data-act="fresh">Start over</button>';
    note.querySelector('[data-act="fresh"]').addEventListener("click", () => {
      clearProgress();
      location.reload();
    });
    root.appendChild(note);
  }

  root.appendChild(form);

  actions.addEventListener("click", e => {
    const btn = e.target.closest("[data-act]");
    if (btn && btn.dataset.act === "submit") trySubmit();
  });

  function isAnswered(qi) {
    const a = answers[qi];
    return model[qi].isSata ? (Array.isArray(a) && a.length > 0) : (a !== null);
  }
  function answeredCount() {
    let n = 0;
    for (let i = 0; i < questions.length; i++) if (isAnswered(i)) n++;
    return n;
  }

  function renderActionsPrompt() {
    actions.classList.remove("hidden");
    actions.innerHTML = `
      <span class="progress"></span>
      <span class="spacer"></span>
      <button type="button" class="btn btn-primary" data-act="submit">Submit exam</button>`;
    updateProgress();
  }
  function updateProgress() {
    const el = actions.querySelector(".progress");
    if (el) el.textContent = `Answered ${answeredCount()} of ${questions.length}`;
  }

  function trySubmit() {
    const missing = questions.length - answeredCount();
    if (missing > 0 &&
        !confirm(`You have ${missing} unanswered question${missing > 1 ? "s" : ""}. Submit anyway? Unanswered questions are counted as incorrect.`)) {
      return;
    }
    gradeExam();
  }

  function sameSet(a, b) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
    return true;
  }

  /* ---------- Grading ---------- */
  function gradeExam() {
    graded = true;
    clearProgress();                       // the attempt is finished
    form.classList.add("exam-graded");
    const rn = root.querySelector(".resume-note");
    if (rn) rn.remove();
    let correctCount = 0;

    model.forEach((m, qi) => {
      const { q, isSata, correct } = m;
      const card = form.querySelector("#q" + (qi + 1));
      const chosen = isSata
        ? (answers[qi] || []).slice().sort((a, b) => a - b)
        : (answers[qi] === null ? [] : [answers[qi]]);
      const isCorrect = sameSet(chosen, correct);
      if (isCorrect) correctCount++;

      card.classList.add(isCorrect ? "correct" : "incorrect");
      card.dataset.correct = isCorrect ? "1" : "0";

      const tag = document.createElement("span");
      tag.className = "q-result-tag " + (isCorrect ? "correct" : "incorrect");
      tag.textContent = isCorrect ? "Correct" : (chosen.length ? "Incorrect" : "Skipped");
      card.querySelector(".q-head").appendChild(tag);

      const correctSet = new Set(correct);
      const chosenSet = new Set(chosen);
      card.querySelectorAll(".option").forEach(label => {
        const oi = Number(label.dataset.oi);
        label.querySelector("input").disabled = true;
        if (correctSet.has(oi)) {
          label.classList.add("opt-correct");
          label.insertAdjacentHTML("beforeend", '<span class="opt-mark">✓</span>');
        } else if (chosenSet.has(oi)) {
          label.classList.add("opt-chosen-wrong");
          label.insertAdjacentHTML("beforeend", '<span class="opt-mark">✕</span>');
        }
      });

      const letters = correct.map(i => LETTERS[i]).join(", ");
      const rat = document.createElement("div");
      rat.className = "rationale";
      rat.innerHTML =
        `<span class="r-answer">${isSata ? "Correct answers" : "Correct answer"} — ${letters}.</span>
         <div>${q.rationale || ""}</div>`;
      card.appendChild(rat);
    });

    actions.classList.add("hidden");
    const lead = document.querySelector(".lead");
    if (lead) lead.classList.add("hidden");
    renderResult(correctCount);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ---------- Result summary + incorrect-only filter ---------- */
  function renderResult(correct) {
    const total = questions.length;
    const pct = total ? Math.round((correct / total) * 100) : 0;

    const history = trackHistory ? saveScore({ d: Date.now(), c: correct, t: total, p: pct }) : [];

    const result = document.createElement("div");
    result.className = "result-card";
    result.id = "exam-result";
    result.innerHTML = `
      <div class="result-ring" style="--pct:${pct}"><span>${pct}%</span></div>
      <div class="result-score">${correct} / ${total}</div>
      <div class="result-detail">
        <p class="rmsg">Review your answers below, or retake for a fresh attempt.</p>
        <button type="button" class="btn btn-ghost" data-act="retake">↻ Retake exam</button>
      </div>`;

    const filter = document.createElement("div");
    filter.className = "filter-row";
    filter.innerHTML = `
      <div class="exam-filter" role="group" aria-label="Filter questions">
        <button type="button" class="active" data-filter="all">Show all</button>
        <button type="button" data-filter="wrong">Show incorrect only</button>
      </div>
      <span class="fcount"></span>`;

    root.insertBefore(result, form);
    if (trackHistory && history.length > 1) {
      const hist = document.createElement("div");
      hist.className = "score-history";
      const rows = history.slice().reverse().map((h, i) =>
        `<li${i === 0 ? ' class="latest"' : ''}><span class="sh-date">${fmtDate(h.d)}</span><span class="sh-score">${h.c}/${h.t}</span><span class="sh-pct">${h.p}%</span></li>`).join("");
      hist.innerHTML = `<h3 class="sh-title">Your recent attempts</h3><ul>${rows}</ul>`;
      root.insertBefore(hist, form);
    }
    root.insertBefore(filter, form);
    result.querySelector('[data-act="retake"]').addEventListener("click", () => location.reload());

    const fcount = filter.querySelector(".fcount");
    const wrongCount = total - correct;

    function applyFilter(mode) {
      let shown = 0;
      form.querySelectorAll(".q-card").forEach(card => {
        const visible = mode === "all" || card.dataset.correct === "0";
        card.classList.toggle("filtered-out", !visible);
        if (visible) shown++;
      });
      let empty = form.querySelector(".empty-note");
      if (mode === "wrong" && wrongCount === 0) {
        if (!empty) {
          empty = document.createElement("p");
          empty.className = "empty-note";
          empty.textContent = "Nothing to review — you didn't miss any questions.";
          form.insertBefore(empty, form.firstChild);
        }
        empty.classList.remove("hidden");
      } else if (empty) {
        empty.classList.add("hidden");
      }
      fcount.textContent = `Showing ${shown} of ${total}`;
    }

    filter.querySelectorAll("[data-filter]").forEach(b => {
      b.addEventListener("click", () => {
        filter.querySelectorAll("[data-filter]").forEach(x => x.classList.remove("active"));
        b.classList.add("active");
        applyFilter(b.dataset.filter);
      });
    });
    applyFilter("all");
  }

  /* ---------- Start ---------- */
  renderActionsPrompt();
})();
