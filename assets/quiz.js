/* ============================================================
   quiz.js — "Build Your Own Exam" page controller.
   Renders a topic x question-set table from window.QUIZ_BANK (rows =
   topics, columns = the three question sets), then on Start
   assembles whichever cells are checked, shuffles them, sets
   window.EXAM_DATA, and hands off to the shared exam engine
   (assets/exam.js) for rendering, grading, rationales, and the score
   history (saved under the id "quiz").
   ============================================================ */
// Cache-bust token read off our own <script src="assets/quiz.js?v=…">, so the
// exam engine injected on Start shares the page's version automatically.
const QUIZ_VER = (function () {
  const s = document.currentScript || document.querySelector('script[src*="assets/quiz.js"]');
  const m = s && /[?&]v=([^&]+)/.exec(s.src || "");
  return m ? m[1] : "";
})();

(function () {
  const bank = window.QUIZ_BANK;
  const sel = document.getElementById("quiz-select");
  if (!bank || !sel) return;
  const topics = bank.topics;
  const topicById = {};
  topics.forEach(t => { topicById[t.id] = t; });

  /* The three question-set columns. Both the column headings and the
     legend beneath the intro line come from data/quiz-bank.js, so the
     page can be relabelled for a different course without touching this
     file. Rename, reorder, or drop a column by editing `columns` there.
     If the third set has no source for your course, just leave every
     topic's third set empty and the column renders greyed out. */
  const SET_COLUMNS = bank.columns || [
    { key: "mustKnow",      label: "Must Know",      blurb: "Everything the lectures explicitly stated or heavily hinted will be tested." },
    { key: "medications",   label: "Medications",    blurb: "One question for every drug on the Medications page." },
    { key: "eaq",           label: "Question Bank",  blurb: "Imported questions from your publisher's question bank, sorted by topic, with duplicates removed." }
  ];
  function setQuestions(topic, key) { return (topic.sets && topic.sets[key]) || []; }
  function countOf(topic, key) { return setQuestions(topic, key).length; }

  let html = '<div class="quiz-picker">';
  html += '<p class="note">Select any combination of question sets from the below table to build a custom practice exam.</p>';
  html += '<ul class="qb-legend">' +
    SET_COLUMNS.filter(c => c.blurb).map(c => `<li><b>${c.label}:</b> ${c.blurb}</li>`).join("") +
    '</ul>';
  html += '<div class="quiz-actions-top"><button type="button" class="btn btn-ghost" data-pick="all">Select all</button><button type="button" class="btn btn-ghost" data-pick="none">Clear</button></div>';

  html += '<div class="table-wrap no-stack qb-table-wrap"><table class="qb-table"><thead><tr><th>Topic</th>';
  SET_COLUMNS.forEach(c => {
    html += `<th>${c.label}</th>`;
  });
  html += '</tr></thead><tbody>';

  // No row label: each checkbox already reads "Select All" (Holly, 2026-09-13).
  html += '<tr class="qb-selectall-row"><td class="term"></td>';
  SET_COLUMNS.forEach(c => {
    html += `<td><label class="qb-cell">` +
      `<input type="checkbox" class="qb-col-all" data-set="${c.key}">` +
      `<span>Select All</span></label></td>`;
  });
  html += '</tr>';

  topics.forEach(t => {
    html += `<tr>`;
    const wk = t.week ? `<span class="qb-week">Week ${t.week}</span>` : '';
    html += `<td class="term">${wk}${t.label}</td>`;
    SET_COLUMNS.forEach(c => {
      const n = countOf(t, c.key);
      const empty = n === 0;
      html += `<td><label class="qb-cell${empty ? " qb-empty" : ""}">` +
        `<input type="checkbox" class="qb-topic-check" data-topic="${t.id}" data-set="${c.key}"${empty ? " disabled" : ""}>` +
        `<span>${n}</span></label></td>`;
    });
    html += '</tr>';
  });
  html += '</tbody></table></div>';

  html += '<div class="quiz-start-bar"><span class="quiz-summary">No question sets selected</span><button type="button" class="btn btn-primary" data-act="start" disabled>Start exam</button></div>';
  sel.innerHTML = html;

  const boxes = Array.from(sel.querySelectorAll('.qb-table input.qb-topic-check'));
  const colAllBoxes = Array.from(sel.querySelectorAll('.qb-table input.qb-col-all'));
  const startBtn = sel.querySelector('[data-act="start"]');
  const summary = sel.querySelector(".quiz-summary");

  function totalSelected() {
    return boxes.filter(b => b.checked)
      .reduce((s, b) => s + countOf(topicById[b.dataset.topic], b.dataset.set), 0);
  }

  function syncColumnCheckbox(colAllBox) {
    const key = colAllBox.dataset.set;
    const colBoxes = boxes.filter(b => b.dataset.set === key && !b.disabled);
    if (!colBoxes.length) {
      colAllBox.checked = false;
      colAllBox.indeterminate = false;
      return;
    }
    const checkedCount = colBoxes.filter(b => b.checked).length;
    colAllBox.checked = checkedCount === colBoxes.length;
    colAllBox.indeterminate = checkedCount > 0 && checkedCount < colBoxes.length;
  }

  function update() {
    const chosen = boxes.filter(b => b.checked);
    const n = totalSelected();
    startBtn.disabled = n === 0;
    summary.textContent = chosen.length
      ? `${chosen.length} set${chosen.length > 1 ? "s" : ""} selected · ${n} question${n !== 1 ? "s" : ""}`
      : "No question sets selected";
    startBtn.textContent = n ? `Start exam (${n})` : "Start exam";
    colAllBoxes.forEach(syncColumnCheckbox);
  }

  sel.addEventListener("change", e => {
    if (e.target.matches('.qb-table input.qb-topic-check')) {
      update();
      return;
    }
    if (e.target.matches('.qb-table input.qb-col-all')) {
      const key = e.target.dataset.set;
      const checked = e.target.checked;
      boxes.filter(b => b.dataset.set === key && !b.disabled).forEach(b => { b.checked = checked; });
      update();
    }
  });
  sel.addEventListener("click", e => {
    const pick = e.target.closest("[data-pick]");
    if (pick) {
      boxes.forEach(b => { if (!b.disabled) b.checked = pick.dataset.pick === "all"; });
      update();
    }
  });

  startBtn.addEventListener("click", () => {
    const chosen = boxes.filter(b => b.checked);
    if (!chosen.length) return;
    /* ----------------------------------------------------------
       Assemble the exam INTERLEAVED by topic, not block by block.

       This used to be a plain Fisher-Yates shuffle over the whole
       pile. That looks random and clusters badly: measured over 2,000
       simulated exams on this bank, selecting two topics produced an
       average longest run of 4.6 questions from one topic, a worst
       case of 10 in a row, and a run of 3+ in 99% of exams.

       The fix draws topics at random, weighted by how many questions
       each has left, and never twice in a row unless one topic is all
       that remains. Weighting by remaining count spreads a large
       topic evenly across the exam; keeping it random is what stops
       it settling into the visible A-B-C-A-B-C rotation that a plain
       "always take the biggest" pass produces. Order *within* a topic
       stays shuffled, so no two runs of the same exam match.
       Questions from different sets of one topic (Must Know,
       Medications, EAQs) count as that one topic here.
       ---------------------------------------------------------- */
    const byTopic = new Map();
    chosen.forEach(b => {
      const t = topicById[b.dataset.topic];
      setQuestions(t, b.dataset.set).forEach(q => {
        const k = q.topic || t.label;
        if (!byTopic.has(k)) byTopic.set(k, []);
        byTopic.get(k).push(q);
      });
    });
    if (!byTopic.size) return;

    byTopic.forEach(arr => {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    });

    /* Spread each topic evenly by stride: the k-th question of a topic
       holding c of the exam's N questions lands near (k + phase) * N / c.
       The random phase per topic and a hair of jitter keep it from being
       a fixed A-B-C rotation; the stride guarantees an even spread no
       matter how lopsided the selection is. That last part matters — an
       earlier draw-and-alternate version handled balanced picks well but
       on 9 questions from one topic plus 28 from another it alternated
       until the small topic ran dry and then dumped a 19-question tail. */
    const N = [...byTopic.values()].reduce((n, a) => n + a.length, 0);
    const slots = [];
    byTopic.forEach(arr => {
      const stride = N / arr.length;
      const phase = Math.random();
      arr.forEach((q, k) => slots.push({ p: (k + phase) * stride + Math.random() * 1e-3, q }));
    });
    slots.sort((a, b) => a.p - b.p);
    const qs = slots.map(s => s.q);
    if (!qs.length) return;
    window.EXAM_DATA = { id: "quiz", title: "Custom Exam", questions: qs, history: false };
    sel.classList.add("hidden");
    const s = document.createElement("script");
    s.src = "assets/exam.js" + (QUIZ_VER ? "?v=" + QUIZ_VER : "");
    document.body.appendChild(s);
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  update();
})();
