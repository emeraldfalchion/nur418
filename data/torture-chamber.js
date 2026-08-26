/* ============================================================
   torture-chamber.js — "The Torture Chamber" practice exam.

   A cumulative exam where EVERY question is select-all-that-apply.
   Content comes only from lecture material already taught on the
   topic pages. Aim for roughly one question per 10 of your topic
   pages' content, weighted toward whatever the instructor says the
   final actually emphasizes.

   ============================================================
   THE FOUR ANTI-GIVEAWAY RULES. READ BEFORE ADDING QUESTIONS.
   ============================================================
   These exist because each one was violated first and fixed later.
   Authoring naturally produces all four defects; scan for them
   explicitly after writing questions in bulk.

   1. INTERLEAVE the correct and incorrect options.
      The failure mode: listing every correct option first and the
      wrong one last. In the original site 48 of 50 questions did
      this and 38 keys were literally [0,1,2,3] — the whole exam was
      answerable without reading a single option.
      Check: tabulate the positions of the WRONG options across the
      whole file. There should be no pattern.

   2. VARY the number of correct options, and keep the spread even.
      The failure mode: nearly every question having exactly four
      correct, which makes "pick four" a viable strategy. Mix 1, 2,
      3, 4, 5, and all-correct. A couple of all-correct items and a
      couple of single-correct items are what make the set feel
      genuinely uncertain. Also mix 5-option and 6-option questions
      so "4 of 5" is never the default shape.
      Check: count correct-options-per-question and look at the
      histogram.

   3. NO LENGTH BIAS, and NO SELF-EXPLAINING correct options.
      The failure mode: the right answer is the longest option and
      the only one carrying a "because…" clause, so it reads as the
      one that knows what it's talking about. Trim the explanation
      into the rationale, and give the distractors plausible-sounding
      reasoning of their own (right reasoning, wrong fact).
      Check: compare average correct-option length to average
      wrong-option length, per question.

   4. NO STEM-WORD ECHO.
      The failure mode: a distinctive phrase from the stem appears
      only in the correct options, so the key is readable from
      vocabulary alone. Reword the stem, or put the same phrasing
      into a distractor.
      Check: for each question, find words that appear in the stem
      and in the correct options but in no incorrect option.

   Distractors should be plausible near-misses built from the same
   lecture material — a flipped sign, a wrong threshold, the right
   action attributed to the wrong person, a therapeutic value offered
   as a toxic one. When you drop a correct option to rebalance rule 2,
   the best replacement distractor is usually built from the fact you
   just removed, stated wrongly. Nothing is lost; it gets tested from
   the other side.

   ============================================================
   ORDERING
   ============================================================
   Scramble with a RANDOM SHUFFLE plus rejection sampling, not a
   greedy "place the topic with the most remaining questions next"
   pass. Greedy satisfies the no-adjacent-duplicates rule and still
   clusters badly — it front-loads the big topics into a visible
   rotation and then leaves them sparse. Accept an arrangement only if:

     * no two adjacent questions share a topic;
     * no two adjacent questions are both all-correct;
     * every topic with 4+ questions has a minimum gap of 3;
     * no third of the exam holds far more of one topic than another;
     * no 3-topic cycle repeats three times running (A B C A B C A B C).

   ============================================================
   PROVENANCE NOTE
   ============================================================
   Keep a dated log here of what changed and why — question count,
   per-topic counts, the answer-count spread, and any rebalance. It is
   the only record of the design decisions once the questions are
   shuffled.
   ============================================================ */
window.EXAM_DATA = {
  id: "torture-chamber",
  title: "The Torture Chamber",

  questions: [
    {
      /* 2 correct of 5. Wrong options at 0, 2, 3 — interleaved. */
      stem: "Which of the following are true of the example concept? Select all that apply.",
      options: [
        "A near-miss: the right idea with the wrong threshold",
        "A correct statement",
        "A near-miss: the right action, credited to the wrong person",
        "A near-miss: a flipped sign or reversed direction",
        "A second correct statement"
      ],
      answers: [1, 4],
      rationale: "State why each correct option is correct, then name the specific error in the closest distractor — the wrong number, the reversed direction, the wrong role. That is what makes a near-miss teach something.",
      topic: "Example Topic"
    },
    {
      /* All 6 correct — the 'nothing is wrong here' trap. Include a
         couple of these, and never adjacent to each other. */
      stem: "Which of the following apply to the second example concept? Select all that apply.",
      options: [
        "A correct statement",
        "A second correct statement",
        "A third correct statement",
        "A fourth correct statement",
        "A fifth correct statement",
        "A sixth correct statement"
      ],
      answers: [0, 1, 2, 3, 4, 5],
      rationale: "Every option is correct. An all-correct item is only unsettling if the reader has already seen questions with one or two correct answers, which is why the spread in rule 2 matters.",
      topic: "Another Topic"
    },
    {
      /* 1 correct of 5 — the mirror-image trap. Put the single correct
         option mid-list, never at index 0. */
      stem: "Which of the following are true of the third example concept? Select all that apply.",
      options: [
        "A statement that describes a different concept entirely",
        "A statement that reverses the relationship",
        "The one correct statement",
        "A statement using a plausible but incorrect number",
        "A statement that is true of a related concept, not this one"
      ],
      answers: [2],
      rationale: "Only one option is correct. Name what each distractor actually describes, so the question teaches the discrimination rather than just marking it wrong.",
      topic: "A Third Topic"
    }
  ]
};

/* Display order for the topic-breakdown strip at the top of the page. */
window.TOPIC_ORDER = ["Example Topic", "Another Topic", "A Third Topic"];
