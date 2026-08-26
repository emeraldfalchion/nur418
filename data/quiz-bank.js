/* ============================================================
   quiz-bank.js — the "Build Your Own Exam" question bank.

   Structure: one entry per TOPIC, each with three question SETS.
   The page renders topics as rows and sets as columns, so a topic
   with an empty set shows a greyed-out, unselectable cell. Nothing
   breaks if a set is empty — leave it [] until you have content.

   ------------------------------------------------------------
   THE THREE SETS, AND WHAT EACH IS FOR
   ------------------------------------------------------------
   mustKnow       Tracks the bullets on must-know.html ONE FOR ONE.
                  This is a hard invariant. Cut a bullet there, the
                  question goes too — UNLESS a surviving bullet still
                  depends on it. Add a bullet, it needs a question.

   extraPractice  High-yield lecture content that is NOT on the Must
                  Know page. Must not test the same point as any
                  mustKnow question in the same topic.

   eaq            Imported from an outside question bank (a publisher's
                  adaptive quizzing product, a question app, whatever).
                  Rename the column in `columns` below to suit. If your
                  course has no such source, leave every one empty and
                  the column simply renders as disabled.

   ------------------------------------------------------------
   INVARIANTS TO CHECK AFTER ANY EDIT (see RULES.md)
   ------------------------------------------------------------
     * Every topic carries exactly 1 mustKnow SATA + 1 extraPractice
       SATA (topics with very little content are the only exception,
       and should be listed as exceptions in your CLAUDE.md).
     * No duplicate stems anywhere in the file.
     * No answer slot holds more than ~50% of a topic's questions.
       Authoring naturally puts the right answer first — rotate them
       deliberately, asserting the option SET is unchanged so no
       content drifts.
     * Every question has topic, source, and a non-empty rationale.
     * Every answer/answers index is in range.

   ------------------------------------------------------------
   ADDING A TOPIC
   ------------------------------------------------------------
   Copy a whole { id, label, week, sets } block. `label` is what shows
   in the row and in the topic-breakdown strip, and every question's
   `topic` field in that block must match it EXACTLY.
   ============================================================ */
window.QUIZ_BANK = {

  /* Column headings and the legend under the intro line. Rename these
     for your course — "EAQs" only means something in a nursing program. */
  columns: [
    { key: "mustKnow",      label: "Must Know",      blurb: "Everything the lectures explicitly stated or heavily hinted will be tested." },
    { key: "extraPractice", label: "Extra Practice", blurb: "Other topics from the lecture content, prioritized by highest yield." },
    { key: "eaq",           label: "Question Bank",  blurb: "Imported questions from an outside question bank, sorted by topic, with duplicates removed." }
  ],

  topics: [
    {
      id: "example-topic",
      label: "Example Topic",
      week: 1,
      sets: {
        mustKnow: [
          {
            stem: "A short clinical or applied scenario, then the question. Which response is correct?",
            options: [
              "A plausible wrong answer",
              "The correct answer",
              "Another plausible wrong answer",
              "A fourth, similar in length"
            ],
            answer: 1,
            rationale: "Why this is right and why the closest distractor is wrong. Each mustKnow question should map to exactly one bullet on must-know.html.",
            topic: "Example Topic",
            source: "quiz-bank"
          },
          {
            stem: "The one select-all-that-apply question this set needs. Which apply? Select all that apply.",
            options: [
              "A correct one",
              "A wrong one",
              "Another correct one",
              "Another wrong one"
            ],
            answers: [0, 2],
            rationale: "Every topic keeps exactly one mustKnow SATA. If you cut the bullet a SATA was serving, convert another surviving question rather than losing the invariant — this trap has bitten more than once.",
            topic: "Example Topic",
            source: "quiz-bank"
          }
        ],

        extraPractice: [
          {
            stem: "A question on high-yield material that is NOT on the Must Know page.",
            options: [
              "First option",
              "Second option",
              "The correct answer",
              "Fourth option"
            ],
            answer: 2,
            rationale: "Extra Practice exists so the bank covers more than the hint list. Check it does not duplicate a mustKnow question in the same topic before adding it.",
            topic: "Example Topic",
            source: "quiz-bank"
          },
          {
            stem: "The extraPractice select-all-that-apply. Which apply? Select all that apply.",
            options: [
              "A wrong one",
              "A correct one",
              "Another wrong one",
              "Another correct one",
              "A third correct one"
            ],
            answers: [1, 3, 4],
            rationale: "One SATA per set per topic, so a topic-filtered custom exam always includes some.",
            topic: "Example Topic",
            source: "quiz-bank"
          }
        ],

        eaq: [
          {
            stem: "An imported question from an outside bank, kept close to its original wording.",
            options: [
              "The correct answer",
              "Second option",
              "Third option",
              "Fourth option"
            ],
            answer: 0,
            rationale: "Imported rationale. Fix conversion artifacts (scrambled word order, stray markup) but don't rewrite the content.",
            topic: "Example Topic",
            source: "eaq"
          }
        ]
      }
    },

    {
      /* A second topic, showing what an empty set looks like: its cells
         render greyed out and unselectable until you fill them. */
      id: "empty-topic",
      label: "Topic With No Questions Yet",
      week: 1,
      sets: { mustKnow: [], extraPractice: [], eaq: [] }
    },

    {
      /* A topic with no `week` shows just its label — use this shape for a
         catch-all row of imported questions that don't map to any lecture. */
      id: "other",
      label: "Other Imported Questions",
      sets: { mustKnow: [], extraPractice: [], eaq: [] }
    }
  ]
};

/* Display order for the topic-breakdown strip on a custom exam.
   List your topic labels in course order. */
window.TOPIC_ORDER = ["Example Topic", "Topic With No Questions Yet", "Other Imported Questions"];
