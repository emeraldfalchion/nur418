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
    { key: "extraPractice", label: "Extra Practice", blurb: "Other topics from the lecture content, prioritized by highest yield." },
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

  html += '<tr class="qb-selectall-row"><td class="term">Select All</td>';
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
    const qs = [];
    chosen.forEach(b => {
      const t = topicById[b.dataset.topic];
      setQuestions(t, b.dataset.set).forEach(q => qs.push(q));
    });
    if (!qs.length) return;
    for (let i = qs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [qs[i], qs[j]] = [qs[j], qs[i]];
    }
    window.EXAM_DATA = { id: "quiz", title: "Custom Exam", questions: qs, history: false };
    sel.classList.add("hidden");
    const s = document.createElement("script");
    s.src = "assets/exam.js" + (QUIZ_VER ? "?v=" + QUIZ_VER : "");
    document.body.appendChild(s);
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  update();
})();
