/* ============================================================
   lecture-review-template.js — the data format every exam page uses.

   Copy this file for each new lecture review, rename it, and point
   the matching .html page's <script> tag at the new name.

   ------------------------------------------------------------
   THE QUESTION FORMAT (used by assets/exam.js everywhere)
   ------------------------------------------------------------
   Single answer   ->  answer:  <index>      renders radio buttons
   Select all      ->  answers: [<indices>]  renders checkboxes,
                                             graded all-or-nothing

   Both are ZERO-BASED. answer: 2 means the THIRD option.

   Fields:
     stem       required. Rendered as HTML, so &amp; and <b> work,
                and an <img class="q-img" src="..."> can be embedded
                for a picture question.
     options    required. 4 is standard for single-answer; SATA
                questions usually run 5-6.
     answer /
     answers    required, exactly one of the two.
     rationale  required. Explain why the right answer is right AND
                why the tempting wrong one is wrong.
     topic      optional. If present on every question, the exam page
                renders a topic-breakdown strip at the top. Must match
                a quiz-bank topic `label` exactly if you want the two
                to line up.
     source     optional. Provenance tag; useful in quiz-bank.js.

   ------------------------------------------------------------
   PROVENANCE — fill this in honestly, every time
   ------------------------------------------------------------
   Say where the stems, options, and answers each came from, and flag
   anything reconstructed. A future you will want to know which parts
   are verbatim. Example of a good header:

     "Stems and options are VERBATIM from the instructor's own slide
      deck (23 slides), verified programmatically. The deck marks no
      answers and has no speaker notes, so ANSWERS come from the
      transcript. Q7 is not in the deck but was polled in class; its
      options are RECONSTRUCTED."
   ============================================================ */
window.EXAM_DATA = {
  id: "lecture-review-template",   // unique; keys this page's score history
  title: "Lecture Review Template",
  // history: false,               // uncomment to skip saving scores

  questions: [
    {
      stem: "A single-answer question. Which option is correct?",
      options: [
        "A plausible wrong answer",
        "The correct answer",
        "Another plausible wrong answer",
        "A fourth option, similar in length to the others"
      ],
      answer: 1,
      rationale: "Why the correct answer is correct, and why the most tempting distractor is not. Keep the distractors the same length and register as the answer — a longer, more explanatory option is a giveaway."
    },
    {
      stem: "A select-all-that-apply question. Which of the following apply? Select all that apply.",
      options: [
        "A correct one",
        "A wrong one",
        "Another correct one",
        "Another wrong one",
        "A third correct one"
      ],
      answers: [0, 2, 4],
      rationale: "Interleave the correct and incorrect options rather than listing all the right ones first — that alone makes the key readable without knowing the content. Vary how many are correct from question to question."
    },
    {
      stem: "A question with a topic tag, so the breakdown strip renders.",
      options: [
        "First option",
        "Second option",
        "Third option",
        "Fourth option"
      ],
      answer: 3,
      rationale: "Tag every question in a file, or none — the strip only appears when the field is present.",
      topic: "Example Topic"
    }
  ]
};

/* Optional: the display order for the topic-breakdown strip. Any topic
   not listed here is appended in the order it is first seen, so this is
   safe to leave commented out.
window.TOPIC_ORDER = ["Example Topic", "Another Topic"];
*/
