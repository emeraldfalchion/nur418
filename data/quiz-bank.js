/* ============================================================
   quiz-bank.js — the "Build Your Own Exam" question bank.

   Structure: one entry per TOPIC, each with three question SETS.
   The page renders topics as rows and sets as columns, so a topic
   with an empty set shows a greyed-out, unselectable cell.

   ------------------------------------------------------------
   THE THREE SETS, AND WHAT EACH IS FOR
   ------------------------------------------------------------
   mustKnow       Tracks the LEARNING OUTCOMES bullets on
                  must-know.html ONE FOR ONE. This is a hard
                  invariant. Cut a bullet there, the question goes
                  too — UNLESS a surviving bullet still depends on
                  it. Add a bullet, it needs a question.

                  SCOPE NOTE, 2026-08-29: must-know.html was
                  restructured that day into a Key Terms table plus a
                  Learning Outcomes list per topic. "One for one"
                  tracks the 67 Learning Outcomes bullets. The Key
                  Terms rows are not separately tracked — the table
                  carries its own self-quiz through the eye button,
                  and the terms are drawn on by extraPractice instead.

   medications    One question per drug on medications.html, filed
                  under the topic that teaches the drug, plus a few
                  select-all "which medications are indicated for…"
                  questions per topic. Only three topics have drugs
                  (Depressive, Bipolar, Substance Use); every other
                  topic's set is empty and its cell renders disabled.
                  Built 2026-09-13 (Holly). Sourced ONLY from
                  medications.html, and no question tests a point an
                  authored mustKnow question or a Lecture Review
                  question already tests. A comment above each names
                  its drug. Add a drug to medications.html, add its
                  question here.

   extraPractice  REMOVED 2026-09-13 (Holly). All 65 questions are
                  archived byte-for-byte, with restore steps, in
                  archive/extra-practice-questions.js (project root,
                  not deployed), with a readable .docx beside it.

   eaq            Imported Elsevier Adaptive Quizzing (Sherpath)
                  questions, in their original order and wording. A
                  topic with no imported questions has an empty set,
                  and that cell renders disabled. That is intentional.

   ------------------------------------------------------------
   INVARIANTS TO CHECK AFTER ANY EDIT
   ------------------------------------------------------------
     * Every topic carries at least 1 mustKnow SATA.
     * Every drug on medications.html has exactly one medications
       question (the SATA "indicated for" questions are extra).
     * No duplicate stems anywhere in the file.
     * No answer slot holds more than ~50% of a topic's questions.
     * Every question has topic, source, and a non-empty rationale.
     * Every answer/answers index is in range.

   ------------------------------------------------------------
   PROVENANCE
   ------------------------------------------------------------
   2026-08-29 — Built in full. 67 mustKnow (one per Learning
   Outcomes bullet: 14 intro, 14 neuro, 12 anger, 12 therapies, 15
   group/physio) + 25 extraPractice (5 per topic). Sourced only from
   the five Week 1 topic pages, which are themselves cross-checked
   against the decks. No live lecture existed for Week 1, so nothing
   here derives from in-class questions.

   2026-09-11 — WEEK 3 ADDED: topics 12 and 13, "Substance Use &
   Addictive Disorders" (13 mustKnow + 10 extraPractice) and
   "Personality Disorders" (7 mustKnow + 10 extraPractice). Holly set
   the extraPractice count at 10 per topic. Sourced only from the two
   Week 3 topic pages. No live lecture exists for Week 3 either, so
   these derive from the pre-lecture material — but the 18 clicker
   questions archived on week3-lecture-review.html DO exist, and no
   question here tests a point one of those already tests. Where a
   Learning Outcomes bullet and a clicker question cover the same
   ground, the question here takes a different angle on purpose.
   Both topic blocks carry a comment saying which.

   The "dual diagnosis versus comorbidity" question that would
   naturally have gone in topic 12's extraPractice was NOT written:
   week1-intro.mustKnow already tests that exact distinction. The
   DSM-5 criteria question took its place.

   2026-09-13 — WEEK 2 AND 3 EAQs IMPORTED: 140 questions from four
   quizzes (Week 2 and Week 3, each a 20-question ticket to class and
   a 50-question end of week), filed by subject into topics 8-13:
   Depressive 25, Bipolar 19, Suicide 24, NSSI 2, Substance Use 37,
   Personality 33. Extracted from the PDFs with tools/eaq-extract.js.
   No exact duplicates across all 190 eaq questions. Repairs and the
   near-duplicate pairs kept on purpose are listed in SESSION-LOG.md.

   2026-09-13 — RESTRUCTURED (Holly). The Extra Practice column was
   removed and archived (see above). A Medications column replaced
   it: 40 one-per-drug questions (17 Depressive, 12 Bipolar, 11
   Substance Use — diazepam and lorazepam count once per week, as
   they sit on both tabs with different indications) plus 9 SATA
   "indicated for" questions, 3 per topic. The "Cultural Care" topic
   was deleted and its 9 eaq questions moved into topic 6, which was
   renamed "Therapeutic Communication" (from "Therapeutic
   Communication & Relationships"). The imported questions' wording
   is untouched; only their topic tag changed.
   ============================================================ */
window.QUIZ_BANK = {

  columns: [
    /* NOTE: the EAQ blurb carries a HARDCODED COUNT. Update it whenever an EAQ
       set is added or a question is removed, or the page will quietly lie. */
    { key: "mustKnow",      label: "Must Know",      blurb: "One question for every Learning Outcome in the pre-lecture slides." },
    { key: "medications",   label: "Medications",    blurb: "One question for every drug on the Medications page, plus select-all questions on which drugs are indicated for what." },
    { key: "eaq",           label: "EAQs",           blurb: "All 190 Sherpath questions sorted by topic, with duplicates removed." }
  ],

  topics: [
    /* ==========================================================
       TOPIC 1 — INTRODUCTION TO PMH NURSING
       ========================================================== */
    {
      id: "week1-intro",
      label: "Introduction to PMH Nursing",
      week: 1,
      sets: {
        mustKnow: [
          {
            stem: "A client manages a demanding job well but since a recent divorce has slept poorly and struggled to concentrate. Where on the mental health–illness continuum does this client sit?",
            options: [
              "Well-being, because occupational functioning is intact",
              "Mental illness, because thinking and mood have altered",
              "Emotional problems or concerns",
              "Outside the continuum, because the stressor is situational"
            ],
            answer: 2,
            rationale: "Mild-to-moderate distress with mild impairment — trouble with concentration, appetite, or sleep — is the middle stage. Well-being means everyday stress does not impact daily functioning at all, which is no longer true here, and mental illness means marked distress with altered thinking, mood, and behavior. Everyone sits somewhere on the continuum, and movement runs in both directions.",
            topic: "Introduction to PMH Nursing",
            source: "quiz-bank"
          },
          {
            stem: "A nurse sorts the influences that shape a client's mental health. Which are sociocultural influences? Select all that apply.",
            options: [
              "Family stability",
              "Intelligence quotient",
              "Housing",
              "Nutrition",
              "Religion, values, and beliefs",
              "Emotional developmental level"
            ],
            answers: [0, 2, 4],
            rationale: "Sociocultural influences are family stability, ethnicity, housing, child-rearing patterns, economic level, and religion, values and beliefs. Intelligence quotient and emotional developmental level are psychological influences; nutrition is a biologic one, alongside prenatal events, physical health, neuroanatomy and physiology.",
            topic: "Introduction to PMH Nursing",
            source: "quiz-bank"
          },
          {
            stem: "A nurse is asked to define stigma at a community education session. Which definition is accurate?",
            options: [
              "Seeing someone in a negative way because of a characteristic, attribute, or personal trait",
              "A legal restriction placed on a person who carries a psychiatric diagnosis",
              "The inability of a person with severe mental illness to believe they are ill",
              "The distance between the care a population needs and the care actually available"
            ],
            answer: 0,
            rationale: "The first option is the definition used in the course. The third describes anosognosia, a feature of severe mental illness rather than a social attitude. The fourth describes barriers to care, which stigma contributes to but is not the same as.",
            topic: "Introduction to PMH Nursing",
            source: "quiz-bank"
          },
          {
            stem: "Which nursing actions work against the stigma of mental illness? Select all that apply.",
            options: [
              "Charting a client as \"a schizophrenic\" so the team identifies the diagnosis quickly",
              "Talking openly about mental health rather than steering conversation away from it",
              "Teaching other staff about mental illness, since education decreases stigma",
              "Avoiding all discussion of a client's psychiatric diagnosis to shield them from judgment",
              "Advocating as a nurse for mental health reform"
            ],
            answers: [1, 2, 4],
            rationale: "Talking openly, educating, and advocating are three of the listed ways to fight stigma, along with person-first language and decriminalization. The first option is exactly the language NAMI campaigns against — the person is not the disease. The fourth sounds protective but reinforces the cultural barrier of not talking about mental illness, which is what sustains stigma.",
            topic: "Introduction to PMH Nursing",
            source: "quiz-bank"
          },
          {
            stem: "A client is told the next available outpatient psychiatry appointment is in three months. Which barrier to mental health care does this illustrate?",
            options: [
              "Stigma from health care providers",
              "The limits of insurance parity",
              "Provider knowledge limitations",
              "Wait times"
            ],
            answer: 3,
            rationale: "Two to three months for an outpatient follow-up appointment is the wait-time barrier as taught. Parity limits concern what insurance will cover rather than when an appointment exists; provider knowledge limitations concern the quality of care available, not the delay in reaching it.",
            topic: "Introduction to PMH Nursing",
            source: "quiz-bank"
          },
          {
            stem: "A client is brought in by police and admitted against their will because the provider believes treatment is needed. Which statements about this admission are accurate? Select all that apply.",
            options: [
              "The hold runs 72 hours, not counting weekends and holidays",
              "Form 202A is completed by the APRN or MD to petition for longer commitment",
              "The client automatically loses the right to refuse visitors for the duration of the hold",
              "The client may improve during the hold and sign themselves in, becoming a voluntary admission",
              "The 72 hours begin only once a judge has reviewed the case"
            ],
            answers: [0, 1, 3],
            rationale: "The involuntary hold is 72 hours excluding weekends and holidays, a client who improves may convert to voluntary status by signing themselves in, and form 202A goes to the judge if treatment is still needed when the hold expires. Patients on a psychiatric unit keep the same rights as any other hospitalized patient, including having or refusing visitors. Judicial review comes at the end of the hold through 202A, not at the start.",
            topic: "Introduction to PMH Nursing",
            source: "quiz-bank"
          },
          {
            stem: "Four clients are evaluated in the emergency department. Which one meets a criterion for admission to the acute psychiatric unit?",
            options: [
              "A client with long-standing anxiety asking to have their medication changed",
              "A client with gross impairment of judgment who cannot protect themselves from harm",
              "A client whose family reports they have been withdrawn for the past two weeks",
              "A client requesting help sleeping after a recent job loss"
            ],
            answer: 1,
            rationale: "The three admission criteria are danger to self, danger to others, and inability to care for basic needs and/or gross impairment of judgment placing the person at imminent risk. The other three describe real needs, but they are met at a lower level of care — outpatient follow-up, day treatment, or partial hospitalization.",
            topic: "Introduction to PMH Nursing",
            source: "quiz-bank"
          },
          {
            stem: "A client in the day room is becoming loud and argumentative with another patient. Which action does the nurse take first?",
            options: [
              "Offer a PRN medication by mouth",
              "Escort the client to the seclusion room",
              "Assess what is driving the behavior",
              "Encourage the client to go to their room"
            ],
            answer: 2,
            rationale: "Least restrictive means begins with assessment — find what is actually driving the behavior before intervening. Reducing stimulation by moving the client to their room comes after verbal intervention, PRN medication after that, and seclusion near the end of the sequence. Acting before assessing risks escalating a situation that talking would have settled.",
            topic: "Introduction to PMH Nursing",
            source: "quiz-bank"
          },
          {
            stem: "A client refuses an offered PRN tablet and continues to threaten staff. Which statement about restrictiveness is accurate?",
            options: [
              "Four-point restraints are less restrictive than an intramuscular medication",
              "Chemical and mechanical restraints are considered equally restrictive",
              "A PRN may be given intramuscularly only after restraints have been applied and failed",
              "An intramuscular PRN is less restrictive than four-point restraints"
            ],
            answer: 3,
            rationale: "Chemical restraints — medications ordered specifically for agitation — are less restrictive than physical or mechanical interventions such as four-point restraints, so the IM comes first when the oral dose is refused. Reversing that order, or treating the two as equivalent, moves straight to the most restrictive option available.",
            topic: "Introduction to PMH Nursing",
            source: "quiz-bank"
          },
          {
            stem: "A nurse sets limits on a client's maladaptive behavior on the unit. Which component of the therapeutic milieu is being addressed?",
            options: [
              "Containment",
              "Validation",
              "Structure",
              "Involvement"
            ],
            answer: 2,
            rationale: "Structure is the control and limitation of maladaptive behaviors, which is what limit setting is. Containment is the provision of basic needs on a locked unit; validation is respecting privacy, cultural needs, and feelings; involvement promotes self-efficacy through self-care and stress management.",
            topic: "Introduction to PMH Nursing",
            source: "quiz-bank"
          },
          {
            stem: "A nurse documents that a client \"is a schizophrenic.\" Which wording reflects the language NAMI advocates?",
            options: [
              "\"The client is schizophrenic\"",
              "\"The client is a schizophrenia patient\"",
              "\"The client suffers from schizophrenia\"",
              "\"The client is a person who has schizophrenia\""
            ],
            answer: 3,
            rationale: "NAMI advocates person-first language: the person is not the disease. The first two options still make the diagnosis the identity, and the third replaces one label with a characterization of the experience the client has not offered.",
            topic: "Introduction to PMH Nursing",
            source: "quiz-bank"
          },
          {
            stem: "A newly admitted client asks whether being on a psychiatric unit changes their rights. Which response by the nurse is accurate?",
            options: [
              "\"You keep the same rights as any other hospitalized patient, including refusing treatment.\"",
              "\"Your right to refuse treatment is suspended while you are on this unit.\"",
              "\"You may have visitors, but you cannot refuse them once they have arrived.\"",
              "\"Psychiatric advance directives only apply once you have been discharged.\""
            ],
            answer: 0,
            rationale: "Patients admitted to a psychiatric hospital have the same rights as any other hospitalized patient: to have or refuse visitors, to receive or refuse treatment, and rights regarding psychiatric advance directives. Each of the other three names a real right and then withdraws it.",
            topic: "Introduction to PMH Nursing",
            source: "quiz-bank"
          },
          {
            stem: "A client explains the risks and benefits of a proposed medication back to the nurse and states a clear choice. What has the nurse assessed?",
            options: [
              "Competency",
              "Implied consent",
              "Capacity",
              "Adherence"
            ],
            answer: 2,
            rationale: "Capacity is a person's ability to make an informed decision, which is what a bedside assessment establishes. Competency is a legal term for the degree of mental soundness to make decisions or carry out specific acts, and is determined legally rather than by a nurse. Implied consent is a patient indicating willingness when approached with a medication, without this kind of discussion.",
            topic: "Introduction to PMH Nursing",
            source: "quiz-bank"
          },
          {
            stem: "Which situations require the nurse to break a client's confidentiality? Select all that apply.",
            options: [
              "The client names a specific person they intend to kill",
              "The client discloses suspected physical abuse of their elderly mother",
              "The client's employer telephones asking whether the client has been admitted",
              "The client reports having used cocaine on the day of admission",
              "The client's adult sibling asks how the client is doing"
            ],
            answers: [0, 1],
            rationale: "There are exactly two exceptions: a specific threat to kill someone, which carries a duty to warn and protect third parties, and suspected child or elder abuse, which must be reported. Substance use is clinical information and stays protected, and neither an employer nor a family member may be told anything without the client's permission — only those who need to know may know.",
            topic: "Introduction to PMH Nursing",
            source: "quiz-bank"
          }
        ],

        medications: [],
        eaq: [
          {
            stem: "Which action is described in the situation where a patient refuses to take oral medications, so the nurse administers the drug by injection?",
            options: [
              "Assault",
              "Battery",
              "Negligence",
              "False imprisonment"
            ],
            answer: 1,
            rationale: "Battery is the actual, harmful touching of another person or, in this case, administering an injection against the patient's will. Assault can be a verbal threat. Negligence would occur if the nurse failed to provide correct and adequate treatment. False imprisonment would occur if the patient was restrained without cause. (pp. 102, 103)",
            topic: "Introduction to PMH Nursing",
            source: "eaq"
          },
          {
            stem: "Which legal issue is presented when a patient who presents no danger to themselves or others is forced to take medication against their will?",
            options: [
              "Battery",
              "Assault",
              "Defamation",
              "Invasion of privacy"
            ],
            answer: 0,
            rationale: "Battery is the harmful, nonconsensual touching of another's person. Forceful administration of medication constitutes battery. Assault is an intentional threat designed to make another person fearful. Defamation refers to maligning another person's character. Invasion of privacy refers to breaking the patient's confidence or taking pictures without permission. (p. 101)",
            topic: "Introduction to PMH Nursing",
            source: "eaq"
          },
          {
            stem: "Which legal issue in psychiatric nursing describes discussing confidential information with persons other than those involved in nursing care?",
            options: [
              "Slander",
              "Libel",
              "Negligence",
              "Malpractice"
            ],
            answer: 0,
            rationale: "Slander describes the liability issue of sharing confidential information with nonmedical staff and persons not involved in the medical care of patients. Libel is sharing confidential health documents in a written format. Negligence is defined as failure to use ordinary care in any professional or personal situation when there is a duty to do so. Nursing malpractice is professional negligence by a nurse that fails to meet accepted standards of care, directly resulting in patient injury or harm. (pp. 101, 102)",
            topic: "Introduction to PMH Nursing",
            source: "eaq"
          },
          {
            stem: "Which court's decision affirmed that involuntarily hospitalized patients have the right to make treatment decisions such as refusing to take prescribed antipsychotic medication?",
            options: [
              "Federal district court",
              "US Supreme Court",
              "Federal court of appeals",
              "Massachusetts Supreme Judicial Court"
            ],
            answer: 2,
            rationale: "The federal court of appeals affirmed that involuntarily hospitalized patients have the right to make treatment decisions because they are competent enough to make decisions. The US Supreme Court had set the judgment of the court of appeals aside with instructions to consider the effect of an intervening court case at the state level. The federal district court ruled that medical staff have substantial discretion in an emergency situation. The Massachusetts Supreme Judicial Court ruled that involuntarily hospitalized patients have the right to make treatment decisions because they are competent unless they are judicially proven to be incompetent. (pp. 96, 97)",
            topic: "Introduction to PMH Nursing",
            source: "eaq"
          },
          {
            stem: "Which method is the best for the nurse to use to ensure that rights are respected and preserved for a patient being treated for a mental health disorder?",
            options: [
              "Educating each patient as to their legally protected rights",
              "Being knowledgeable of the state laws that regulate patient rights",
              "Participating as a member of the patient's multidisciplinary healthcare team",
              "Referring all issues of a legal nature to the appropriate facility committee"
            ],
            answer: 1,
            rationale: "The legal context of care is important for all psychiatric nurses because it focuses concern on the rights of patients and the quality of care they receive. However, laws vary from state to state, and nurses must become familiar with the laws of the state in which they practice. This knowledge enhances the freedom of both the nurse and the patient and ultimately results in legally appropriate care. Although patient education is an appropriate intervention, it cannot be done without first being knowledgeable of the patient's legal rights. Although an appropriate intervention, participating on the healthcare team will not necessarily ensure the preservation of patient rights but rather ensures holistic care. Although referring legal issues may be correct in some instances, it does not remove the nurse from the responsibility of advocating for the patient. (p. 94)",
            topic: "Introduction to PMH Nursing",
            source: "eaq"
          },
          {
            stem: "A patient has been admitted to a psychiatric facility away from home and requests that their own primary healthcare provider and regular mental healthcare provider be informed. For which reason must this request be honored?",
            options: [
              "The patient has a right to private healthcare providers.",
              "The patient may require transfer to another hospital.",
              "It cannot be honored; these providers are not on staff.",
              "The patient needs a referral in order for insurance to pay."
            ],
            answer: 0,
            rationale: "Included in the patient's right to treatment is the right to an attorney, clergy, and private healthcare providers. The patient may be transferred, but this is not why the request must be honored. The patient's insurance is not of consequence in this scenario. The patient's healthcare providers may not be on staff at the hospital where the patient is being treated, but the patient still has a right to consult with their personal healthcare providers. (p. 96)",
            topic: "Introduction to PMH Nursing",
            source: "eaq"
          },
          {
            stem: "Which concept is illustrated when a third-party insurer only pays for a set number of psychiatric care visits?",
            options: [
              "Nonparity",
              "Malfeasance",
              "Discrimination",
              "Preexisting conditions"
            ],
            answer: 0,
            rationale: "Parity describes equal payment for mental and physical health; only allowing a certain number of visits regardless of circumstances illustrates nonparity. Malfeasance is legal wrongdoing. Discrimination involves unjust treatment based on characteristics like race, age, or sex. Preexisting conditions occur before insurance has begun. (p. 94)",
            topic: "Introduction to PMH Nursing",
            source: "eaq"
          },
          {
            stem: "A patient is shouting loudly but has shown no signs of becoming physically violent. The nurse and staff members get disturbed by the patient's noise and seclude the patient in a room. Which statement describes the action performed by the nurse and the staff members?",
            options: [
              "They have performed false imprisonment.",
              "They have performed assault of the patient.",
              "They have performed breach of their duties.",
              "They have caused invasion of privacy of the patient."
            ],
            answer: 0,
            rationale: "False imprisonment occurs when a patient is unnecessarily confined to a specific area when there is no legal need for seclusion. The patient is not physically violent and has not demonstrated the potential to harm themselves or others. Therefore the patient does not need seclusion, and seclusion in this case is false imprisonment. Assault refers to the threat to cause harm. Breach of duty includes the act of omission and the acts of commission. Invasion of privacy happens when someone breaks a patient's confidence or takes photographs without permission. (p. 101)",
            topic: "Introduction to PMH Nursing",
            source: "eaq"
          },
          {
            stem: "Which statement describes the civil rights of individuals with mental illness who are hospitalized for treatment?",
            options: [
              "Their rights are the same as those for any other citizen.",
              "Civil rights are altered to prevent use of poor judgment.",
              "Patient rights are limited to provision of humane treatment.",
              "An appointment of a guardian ensures patient rights are promoted."
            ],
            answer: 0,
            rationale: "Civil rights are not lost because of hospitalization for mental illness. Civil rights are not altered to prevent use of poor judgment. Patient rights encompass much more than provision of humane treatment. Having a guardian appointed does not necessarily promote patient rights. (p. 96)",
            topic: "Introduction to PMH Nursing",
            source: "eaq"
          }
        ]
      }
    },

    /* ==========================================================
       TOPIC 2 — NEUROBIOLOGY & PHARMACOLOGY
       ========================================================== */
    {
      id: "week1-neurobiology",
      label: "Neurobiology & Pharmacology",
      week: 1,
      sets: {
        mustKnow: [
          {
            stem: "Which structures are among the five core structures covered in this course? Select all that apply.",
            options: [
              "Thalamus",
              "Corpus callosum",
              "Cerebellum",
              "Brainstem",
              "Basal ganglia",
              "Amygdala"
            ],
            answers: [0, 2, 3, 5],
            rationale: "The five are the thalamus, hypothalamus, cerebellum, brainstem, and amygdala; four of them appear here. The corpus callosum and basal ganglia are both taught, but as part of the emotion, memory and movement structures rather than the core five.",
            topic: "Neurobiology & Pharmacology",
            source: "quiz-bank"
          },
          {
            stem: "A client has lost the normal regulation of temperature, appetite, and sleep. Which structure is implicated?",
            options: [
              "The thalamus",
              "The hypothalamus",
              "The cerebellum",
              "The brainstem"
            ],
            answer: 1,
            rationale: "The hypothalamus holds the basic vital functions: temperature, appetite, sleep, sex drive, heart rate, and blood pressure. The thalamus is the main relay station, where sensory pathways synapse on their way to the cortex; the cerebellum handles motor coordination and equilibrium.",
            topic: "Neurobiology & Pharmacology",
            source: "quiz-bank"
          },
          {
            stem: "A client with a long history of alcohol use disorder has intact intelligence but cannot form new memories. Which structure has been damaged?",
            options: [
              "The amygdala",
              "The basal ganglia",
              "The hippocampus",
              "The corpus callosum"
            ],
            answer: 2,
            rationale: "The hippocampus governs both long- and short-term memory, and is heavily damaged in chronic alcoholism, which leads to Korsakoff syndrome and Wernicke's. Amygdala damage produces excessive emotional responses and rage rather than a memory deficit, and corpus callosum damage impairs the integration of logic with emotion.",
            topic: "Neurobiology & Pharmacology",
            source: "quiz-bank"
          },
{
            stem: "A client points at a coat rack across a dim room and says a person is standing there. How does the nurse document this?",
            options: [
              "A hallucination, because the perception does not match reality",
              "An illusion, because something really is there but is misperceived",
              "A delusion, because the client holds a fixed false belief",
              "Perseveration, because the client returns to the same idea"
            ],
            answer: 1,
            rationale: "In an illusion something really is there and is seen incorrectly — a coat rack taken for a person is the example used. In a hallucination nothing is there at all, which is the whole distinction. Perseveration is the persistence of a single thought, a frontal lobe finding.",
            topic: "Neurobiology & Pharmacology",
            source: "quiz-bank"
          },
          {
            stem: "A client is started on a medication that blocks the reuptake of a neurotransmitter to treat both depression and anxiety. Which neurotransmitter is targeted, and how is it altered in these disorders?",
            options: [
              "GABA, which is increased in both",
              "Dopamine, which is decreased in both",
              "Serotonin, which is decreased in both",
              "Norepinephrine, which is increased in both"
            ],
            answer: 2,
            rationale: "Serotonin is decreased in depressive and anxiety disorders, and blocking its reuptake treats both very successfully by keeping more of it in the synaptic gap. Norepinephrine is decreased in depression, not increased, and it is increased in anxiety — so the option is wrong in one direction and right in the other, which is what makes it the closest distractor.",
            topic: "Neurobiology & Pharmacology",
            source: "quiz-bank"
          },
          {
            stem: "A sedative-hypnotic acts on receptors for the major inhibitory neurotransmitter of the CNS. Which statement describes its effect?",
            options: [
              "Decreasing GABA decreases anxiety",
              "Increasing GABA decreases anxiety",
              "Increasing acetylcholine decreases anxiety",
              "Decreasing glutamate decreases aggression"
            ],
            answer: 1,
            rationale: "GABA is the major inhibitory neurotransmitter in the CNS, and many sedative-hypnotics act on its receptors: increase GABA to decrease anxiety. GABA is decreased in anxiety, mania, and schizophrenia, so lowering it further would worsen the symptom rather than relieve it.",
            topic: "Neurobiology & Pharmacology",
            source: "quiz-bank"
          },
          {
            stem: "A client experiencing psychosis has auditory hallucinations. Which pattern of neurotransmitter alteration fits?",
            options: [
              "Dopamine decreased and glutamate increased",
              "Both dopamine and glutamate increased",
              "Both dopamine and glutamate decreased",
              "Dopamine increased and glutamate decreased"
            ],
            answer: 3,
            rationale: "Too much dopamine can lead to auditory hallucinations, and dopamine plays a role in both the positive and negative symptoms of schizophrenia. Glutamate runs the opposite way — it is decreased in psychosis. Options that move the two in the same direction miss the point of the pairing.",
            topic: "Neurobiology & Pharmacology",
            source: "quiz-bank"
          },
          {
            stem: "Excessive release of glutamate has which consequences?",
            options: [
              "Sedation and slowed cognition",
              "Excitotoxicity and cell death",
              "Loss of fine muscle movement",
              "Suppression of the fight-or-flight response"
            ],
            answer: 1,
            rationale: "Excessive glutamate release leads to excitotoxicity and cell death, the neurodegeneration seen in Alzheimer's, and excess also over-stimulates the brain and causes seizures. Glutamate is used at most fast excitatory synapses, so sedation and suppression of fight-or-flight are the opposite of its action.",
            topic: "Neurobiology & Pharmacology",
            source: "quiz-bank"
          },
          {
            stem: "Which neurotransmitter is decreased in Alzheimer's disease and in sleep disorders, but increased in depression?",
            options: [
              "Acetylcholine",
              "Glutamate",
              "Histamine",
              "Serotonin"
            ],
            answer: 0,
            rationale: "Acetylcholine governs learning, memory, cognitive functioning, and sleep-wake cycles, and shows exactly this split pattern. Glutamate is implicated in Alzheimer's through excitotoxic cell death rather than through a decrease, and serotonin is decreased in depression, not increased.",
            topic: "Neurobiology & Pharmacology",
            source: "quiz-bank"
          },
          {
            stem: "A client in a manic episode is agitated and hyperaroused. Which statement about norepinephrine and epinephrine is accurate?",
            options: [
              "Norepinephrine is increased in mania and decreased in depression",
              "Norepinephrine is decreased in mania and increased in depression",
              "Epinephrine is the major inhibitory neurotransmitter of the CNS",
              "Norepinephrine acts only on the parasympathetic branch of the ANS"
            ],
            answer: 0,
            rationale: "Norepinephrine affects mood, attention, and arousal; it is decreased in depression and increased in mania, anxiety, and schizophrenia. It stimulates the sympathetic branch for fight-or-flight, not the parasympathetic. Epinephrine works alongside it in that response and is excitatory; GABA is the major inhibitory neurotransmitter.",
            topic: "Neurobiology & Pharmacology",
            source: "quiz-bank"
          },
          {
            stem: "Which imaging techniques show brain function and physiological activity rather than anatomy? Select all that apply.",
            options: [
              "Computed tomography (CT)",
              "Positron emission tomography (PET)",
              "Magnetic resonance imaging (MRI)",
              "Single photon emission computed tomography (SPECT)",
              "Functional MRI (fMRI)"
            ],
            answers: [1, 3, 4],
            rationale: "PET, SPECT, and functional MRI show function — the changes that correlate with behavioral or cognitive alterations, such as the reduced prefrontal activity PET shows in depression. CT and MRI are structural: they show anatomy and locate tumors, atrophy, and other abnormalities.",
            topic: "Neurobiology & Pharmacology",
            source: "quiz-bank"
          },
          {
            stem: "One biological theory links schizophrenia to synaptic pruning. Which statement describes it?",
            options: [
              "Too little pruning leaves excess synapses, producing negative symptoms",
              "Pruning stops entirely at the end of childhood, so no new pathways form",
              "Over-pruning can result in hallucinations, and the timing fits the surge in late adolescence",
              "Pruning damages the hippocampus, so new memories cannot be formed"
            ],
            answer: 2,
            rationale: "The theory is over-pruning, not under-pruning, and its plausibility rests on timing: pruning speeds up in the preteen years, and the onset of schizophrenia clusters in late adolescence and young adulthood. Pruning is ongoing across the lifespan rather than ending in childhood.",
            topic: "Neurobiology & Pharmacology",
            source: "quiz-bank"
          },
            {
              stem: "A nurse teaches the parents of a toddler about early learning experiences. Which statement should the nurse include?",
              options: [
                "Older brains are more plastic, so learning comes more easily at school age",
                "Rich sensory experiences and protective factors reduce maladaptive responses",
                "Experiences matter regardless of whether the child is developmentally ready",
                "Early responses are psychological and mental patterns, not physiologic ones"
              ],
              answer: 1,
              rationale: "Decreasing risk factors and increasing protective factors promotes resilience, and a rich sensory environment produces fewer maladaptive responses later on. Young brains are more receptive to environmental input than older ones, so intervention succeeds more readily the younger the child — the reverse of the first option. Experiences a child is not developmentally ready for can have unintended consequences, and these responses are physiologic patterns expressed cognitively and then behaviorally, not psychological ones.",
              topic: "Neurobiology & Pharmacology",
              source: "quiz-bank"
            }
        
        ],

        medications: [],
        eaq: [
          {
            stem: "Which area of the brain is associated with aggression?",
            options: [
              "Cochlea",
              "Amygdala",
              "Carotid body",
              "Parotid gland"
            ],
            answer: 1,
            rationale: "Different areas in the brain control different functions of the body. The area of the brain that is known to be associated with aggression is the amygdala, which is a part of the limbic system. The limbic system mediates primitive emotions and behaviors that are required for the survival of a person. Cochlea is not a part of the brain. It is the auditory portion of the inner ear. Carotid body refers to the group of receptors present in the bifurcation of the carotid artery. It detects changes in blood pressure. The parotid gland is not a part of the brain but part of the salivary glands. (p. 503)",
            topic: "Neurobiology & Pharmacology",
            source: "eaq"
          }
        ]
      }
    },

    /* ==========================================================
       TOPIC 3 — ANGER, AGGRESSION & VIOLENCE
       ========================================================== */
    {
      id: "week1-anger",
      label: "Anger, Aggression & Violence",
      week: 1,
      sets: {
        mustKnow: [
          {
            stem: "A client paces the hallway continuously and cannot sit still. A second client has a documented assault during a previous admission. Which statement about these two findings is accurate?",
            options: [
              "The pacing predicts future violence; the assault history predicts imminent violence",
              "The pacing predicts imminent violence; the assault history predicts future violence",
              "Both findings carry equal weight in predicting imminent violence on this shift",
              "Neither predicts anything until a structured risk assessment tool has been scored"
            ],
            answer: 1,
            rationale: "Hyperactivity — pacing and restlessness — is the most important predictor of imminent violence, while a history of violence is the single best predictor of future violence. The two predict on different timescales, and reversing them is the error the closest distractor makes. Structured tools support these judgments rather than replacing them.",
            topic: "Anger, Aggression & Violence",
            source: "quiz-bank"
          },
          {
            stem: "Which factors commonly precipitate anger in hospitalized clients? Select all that apply.",
            options: [
              "Withdrawal from a substance",
              "Sleep deprivation from staff entering the room overnight",
              "Being addressed in heavy medical jargon",
              "Being given two options about where to go",
              "Feeling a loss of personal power",
              "Unrelieved pain"
            ],
            answers: [0, 1, 2, 4, 5],
            rationale: "Withdrawal and substance use, sleep deprivation, differences in knowledge, feeling out of control, and pain are all listed precipitants, along with poor communication and differing expectations. Offering two options is an intervention, not a precipitant — it deliberately returns a measure of control to the client.",
            topic: "Anger, Aggression & Violence",
            source: "quiz-bank"
          },
          {
            stem: "A client who is normally talkative has become silent, sits with a rigid posture and clenched fists, and stares fixedly at staff. How does the nurse interpret this?",
            options: [
              "Reassuring, since the client is no longer verbally abusive",
              "A cluster of warning signs that usually precede violence",
              "Evidence of tension reduction following an earlier episode",
              "Expected withdrawal that requires no additional monitoring"
            ],
            answer: 1,
            rationale: "Stone silence is a speech change, clenched fists and rigid posture are tension signs, fixed staring is an eye-contact sign, and uncharacteristic isolation is its own warning — four categories at once. A change in either direction, loud to quiet or quiet to loud, is itself a warning; the drop in volume is not reassurance.",
            topic: "Anger, Aggression & Violence",
            source: "quiz-bank"
          },
          {
            stem: "During which nursing action does aggression most often occur?",
            options: [
              "Medication administration",
              "Morning report",
              "Limit setting",
              "Discharge teaching"
            ],
            answer: 2,
            rationale: "Aggression occurs most often in the context of limit setting, which is why stating expectations clearly and calmly matters so much. Medication administration can certainly provoke it, particularly where a client resists treatment, but limit setting is the context specifically identified.",
            topic: "Anger, Aggression & Violence",
            source: "quiz-bank"
          },
          {
            stem: "A client who was shouting and pounding a table is now quiet, tearful, and asking what happened. Which level has the client reached, and what is the nurse's goal?",
            options: [
              "Level 1 anxiety; the goal is to offer support and open a dialogue",
              "Level 2 loss of rationality; the goal is to isolate the interaction",
              "Level 3 aggression; the goal is to call for help and protect yourself",
              "Level 4 tension reduction; the goal is to re-establish rapport"
            ],
            answer: 3,
            rationale: "Energy decreases and rationality returns at tension reduction, which every situation eventually reaches — the reachable, teachable moment. The goal is to re-establish rapport, assess the triggers, review which coping strategies were used and why they failed, and revise the plan of care.",
            topic: "Anger, Aggression & Violence",
            source: "quiz-bank"
          },
          {
            stem: "A client's anger is escalating. Which nurse response is most appropriate?",
            options: [
              "\"I need you to calm down and go to your room now, okay?\"",
              "\"You seem to be very upset. Would you rather go to your room, or the quiet room?\"",
              "\"What is going on with you right now? This behavior is unacceptable.\"",
              "\"If you don't stop, we will have to put you in restraints.\""
            ],
            answer: 1,
            rationale: "Giving feedback on what you see opens the feelings up and may de-escalate, and offering two options decreases the sense of powerlessness that often precipitates violence. \"Okay?\" implies a choice where none exists, \"what is going on right now\" is a challenging question rather than an open-ended statement, and threatening restraint escalates rather than de-escalates.",
            topic: "Anger, Aggression & Violence",
            source: "quiz-bank"
          },
          {
            stem: "A nurse prepares to talk with a client who is becoming agitated in their room. Which action best protects the nurse's safety?",
            options: [
              "Stand directly in front of the client so eye contact is maintained",
              "Position the client between the nurse and the doorway",
              "Stand to the side at an angle, keeping a clear path to the door",
              "Close the door so other clients do not overhear the conversation"
            ],
            answer: 2,
            rationale: "Stand to the side or at an angle rather than directly in front of the client or the doorway, always leave an escape route, and never let the client be between you and the door. Talk somewhere quiet but still visible to other staff, so closing the door removes the very backup that makes the conversation safe.",
            topic: "Anger, Aggression & Violence",
            source: "quiz-bank"
          },
          {
            stem: "A client has just been placed in mechanical restraints. Which statements reflect the hard rules governing their use? Select all that apply.",
            options: [
              "The provider order and a face-to-face assessment must occur within one hour of initiation",
              "Two fingers should fit between the restraint and the limb",
              "A PRN order for restraint may be written in advance for clients with a violence history",
              "The client must never be restrained in the prone position",
              "A standing order covers repeat episodes during the same admission"
            ],
            answers: [0, 1, 3],
            rationale: "The order and face-to-face assessment by someone external to the situation come within one hour, two fingers fit under the restraint to check it is not too tight, and prone positioning is never used. There is never a PRN or standing order for restraint: a physician must come, lay eyes on the patient, and write the order every single time.",
            topic: "Anger, Aggression & Violence",
            source: "quiz-bank"
          },
          {
            stem: "Which actions silently meet the definition of a restraint or seclusion? Select all that apply.",
            options: [
              "Raising all four side rails on the bed of a client who is not on seizure precautions",
              "Tucking the bed sheets so tightly that the client cannot move",
              "Physically holding a client against their will",
              "Encouraging a client to go to their room and remain there voluntarily",
              "Keeping a client in their room by physical intervention"
            ],
            answers: [0, 1, 2, 4],
            rationale: "Four side rails up counts as a restraint except on seizure precautions, as do tightly tucked sheets and physically holding someone against their will; keeping a client in their room by physical intervention is seclusion. A client who agrees to go to their room has not been restrained — reducing stimulation with the client's cooperation is a least restrictive intervention.",
            topic: "Anger, Aggression & Violence",
            source: "quiz-bank"
          },
          {
            stem: "Verbal de-escalation and an offered PRN have both failed, and a client remains a danger to others. Which statement is accurate?",
            options: [
              "Restraints are applied first, since seclusion requires a separate order",
              "Seclusion is typically used before restraints, as it is less restrictive",
              "Seclusion may be used as a consequence once other interventions have failed",
              "Either may be used at this point, as they are equally restrictive"
            ],
            answer: 1,
            rationale: "Seclusion is less restrictive than restraint and is typically tried first. Neither is ever punitive — the goal is safety, and seclusion is only for violent or self-destructive behavior that jeopardizes immediate physical safety. Framing it as a consequence for failed cooperation is precisely the misuse the rule forbids.",
            topic: "Anger, Aggression & Violence",
            source: "quiz-bank"
          },
          {
            stem: "A client is in mechanical restraints in bed. Which nursing actions are correct?",
            options: [
              "Leave the client alone in the room so that stimulation is reduced",
              "Release all four restraints at once so range of motion is done efficiently",
              "Place a wedge pillow under the head and do range of motion one limb at a time",
              "Position the client flat without a pillow so that aspiration risk is reduced"
            ],
            answer: 2,
            rationale: "A patient in restraints is never left alone, range of motion is done on one limb at a time so the client is never fully released, and a wedge pillow always goes under the head because lying flat makes breathing harder — more so with any history of breathing difficulty, which is why an extra-elevated wedge exists for COPD.",
            topic: "Anger, Aggression & Violence",
            source: "quiz-bank"
          },
          {
            stem: "Which conditions are contraindications to seclusion and restraint? Select all that apply.",
            options: [
              "Chronic obstructive pulmonary disease",
              "Pregnancy",
              "A documented history of violence",
              "Spinal injury",
              "Delirium or dementia",
              "Seizure disorders"
            ],
            answers: [0, 1, 3, 4, 5],
            rationale: "The six contraindications are extremely unstable medical and psychiatric conditions, COPD, spinal injury, seizure disorders, pregnancy, and delirium or dementia — where seclusion may be intolerable because of the absence of stimulation. A history of violence raises risk and shapes the plan of care, but it is a risk factor rather than a contraindication.",
            topic: "Anger, Aggression & Violence",
            source: "quiz-bank"
          },
            {
              stem: "Which findings are recognized predictors of violence rather than warning signs of escalation? Select all that apply.",
              options: [
                "History of violence",
                "Clenched jaws and fists",
                "Recent acts of violence",
                "Using profanity",
                "Changes in speech rate or volume",
                "Hyperactivity"
              ],
              answers: [0, 2, 3, 5],
              rationale: "The four predictors are history of violence, recent acts of violence, using profanity, and hyperactivity. Clenched jaws and fists and a change in speech rate or volume are warning signs — what escalation looks like while it is happening — rather than predictors identified beforehand. The distinction matters in practice: predictors are assessed on admission from the history, while warning signs are what the nurse watches for continuously on the unit.",
              topic: "Anger, Aggression & Violence",
              source: "quiz-bank"
            }
        
        ],

        medications: [],
        eaq: [
          {
            stem: "Which term describes an emotional response to frustration of desires or a challenge?",
            options: [
              "Anger",
              "Violence",
              "Restraint",
              "Aggression"
            ],
            answer: 0,
            rationale: "Anger is the emotional response to frustration of desires, a threat to one's needs, or a challenge. Restraint is a manual method, physical or mechanical, or material that immobilizes or reduces the ability of a patient to act out violently. Violence is an act that involves intentional use of force and can cause injury to others. Aggression is an action or behavior that results in verbal or physical attack. (p. 502)",
            topic: "Anger, Aggression & Violence",
            source: "eaq"
          },
          {
            stem: "Which definition applies to anger?",
            options: [
              "Doing intentional harm to others",
              "An expression of conflict with others",
              "An unhealthy way of releasing anxiety",
              "A normal response to a perceived threat"
            ],
            answer: 3,
            rationale: "Anger is one of the primary emotions and is not in itself a disorder. Anger is not defined as an unhealthy way of releasing anxiety, doing intentional harm to others, or an expression of conflict with others. (p. 502)",
            topic: "Anger, Aggression & Violence",
            source: "eaq"
          },
          {
            stem: "In which area of a hospital are nursing staff most likely to be assaulted by patients?",
            options: [
              "Pediatrics",
              "Obstetrics",
              "Psychiatric",
              "Emergency"
            ],
            answer: 3,
            rationale: "Emergency department nurses are most likely to be physically assaulted. Psychiatric nurses have a high incidence, but it is lower than in the emergency department. Pediatrics and obstetrics do not rank as highly. (p. 105)",
            topic: "Anger, Aggression & Violence",
            source: "eaq"
          },
          {
            stem: "Which term is the most appropriate to use to mean the intentional use of force?",
            options: [
              "Anger",
              "Anxiety",
              "Violence",
              "Aggression"
            ],
            answer: 2,
            rationale: "Violence is an act that involves intentional use of force that can result in injury to another person. Anger is an emotional response to frustration or inability to fulfill desires. Anxiety is defined as a feeling of worry or nervousness when a person is in a situation of uncertainty. Aggression refers to the action or behavior that results in a verbal or physical attack. (p. 502)",
            topic: "Anger, Aggression & Violence",
            source: "eaq"
          },
          {
            stem: "Which factor is most likely to contribute to a patient's escalating anger?",
            options: [
              "Watching violence on television",
              "Another patient's depressed mood",
              "A staff member asking a patient to help another patient",
              "A staff member telling the patient they are inappropriate"
            ],
            answer: 3,
            rationale: "Punitive, threatening, accusatory, or challenging statements to the patient should be avoided; rather, the nurse should determine what is behind the patient's feelings and behaviors. Watching violence on television, another patient's depressed mood, and a staff member asking a patient to help another patient do not present a threat, accusation, or challenge to the patient. (pp. 504, 506)",
            topic: "Anger, Aggression & Violence",
            source: "eaq"
          },
          {
            stem: "Which statement explains the source of aggression, anger, and violence according to Menninger?",
            options: [
              "The threatened control over the life of a person",
              "Stimulus that is perceived as a threat to oneself",
              "The conflict between sexual needs and societal norms",
              "An assault to personal values, moral codes, and protective rules"
            ],
            answer: 0,
            rationale: "Different researchers have given different views over the source of aggression, anger, and violence. According to Menninger, everyone wants to control their own life. If this control over one's life is threatened, a person experiences trauma, and this results in anger, aggression, and violence. According to Skinner, anger is caused when any stimulus is perceived as potentially dangerous. Freud indicated that the conflict between sexual desires and societal norms results in aggressive behavior. According to Beck, assault to values, moral codes, and protective roles causes anger and aggression. (p. 511)",
            topic: "Anger, Aggression & Violence",
            source: "eaq"
          },
          {
            stem: "Which patient assessment indicates the highest risk for violence?",
            options: [
              "Poor coping skills",
              "History of violence",
              "Diagnosis of schizophrenia",
              "A diagnosis of antisocial personality disorder"
            ],
            answer: 1,
            rationale: "A history of violence is the single best predictor of future violence. Most reactions to stimuli come from one's previous experiences. Patients diagnosed with poor coping skills or schizophrenia may express themselves in many ways but not necessarily through violence. Patients diagnosed with antisocial personality disorder have a high risk of violence, but not a higher risk than a patient with a history of violence. (p. 505)",
            topic: "Anger, Aggression & Violence",
            source: "eaq"
          },
          {
            stem: "Which definition describes anger?",
            options: [
              "A normal human emotion",
              "Evidence of ineffective coping",
              "An indication of mental illness",
              "Usually accompanied by aggression"
            ],
            answer: 0,
            rationale: "Anger is an emotional response to frustration of desires, a threat to one's needs (emotional or physical), or a challenge. It is a normal emotion. It can be healthy and positive when expressed in a healthy way or used as a motivator or an aid in survival. Anger is not exclusively evidence of ineffective coping, an indication of mental illness, or usually accompanied by aggression. (pp. 502, 503)",
            topic: "Anger, Aggression & Violence",
            source: "eaq"
          },
          {
            stem: "Which assessment would lead to the conclusion that a patient may have aggressive behavior?",
            options: [
              "Makes vague statements",
              "Has restricted movements",
              "Talks indistinctly and quietly",
              "Unable to make decisions"
            ],
            answer: 2,
            rationale: "The nurse can assess violent behavior in the patient by checking the patient's symptoms. The patient may mumble or talk indistinctly and quietly, making it difficult for others to hear. A patient with violent and aggressive behavior does not make vague statements. That is seen in schizophrenic patients. Patients with violent and aggressive behavior are restless and have excessive movement. These patients can make decisions. Decision-making ability is impaired in severe anxiety as decision-making skills get disrupted. (p. 504)",
            topic: "Anger, Aggression & Violence",
            source: "eaq"
          },
          {
            stem: "Which drug is used for the management of aggression in children with attention-deficit/hyperactivity disorder (ADHD)?",
            options: [
              "Lithium",
              "Gabapentin",
              "Benzodiazepine",
              "Psychostimulants"
            ],
            answer: 3,
            rationale: "Psychostimulants are the drug of choice in the management of chronic aggression for children with ADHD. Lithium is used for patients with antisocial behavior, mental retardation, or brain injury. Gabapentin and benzodiazepine are used for patients with anxiety disorder or personality disorder. (p. 511)",
            topic: "Anger, Aggression & Violence",
            source: "eaq"
          },
          {
            stem: "Which term is used to identify the concept that violence may result from a history of victimization?",
            options: [
              "Aired grievances",
              "Shared governance",
              "Trauma-informed care",
              "Learned helplessness"
            ],
            answer: 2,
            rationale: "Trauma-informed care is an older concept of providing care that has been reintroduced. It is based on the notion that disruptive patients often have histories that include violence and victimization. These traumatic histories can impede patients' ability to self-soothe, result in negative coping responses, and create a vulnerability to coercive interventions (e.g., restraint) by staff. Trauma-informed care focuses on the patient's past experiences of violence or trauma and the role it currently plays in their life. Aired grievances, shared governance, and learned helplessness do not refer to a care concept that helps reduce violence. (pp. 504-505)",
            topic: "Anger, Aggression & Violence",
            source: "eaq"
          }
        ]
      }
    },

    /* ==========================================================
       TOPIC 4 — ASSESSMENT, THEORIES & THERAPIES
       ========================================================== */
    {
      id: "week1-therapies",
      label: "Assessment, Theories & Therapies",
      week: 1,
      sets: {
        mustKnow: [
          {
            stem: "Which are purposes of the psychiatric mental health nursing assessment? Select all that apply.",
            options: [
              "Establish rapport",
              "Assign a DSM-5 diagnosis",
              "Review physical status and obtain baseline vital signs",
              "Identify mutual goals with the client",
              "Assess risk and safety",
              "Determine the client's legal competency",
              "Understand the current problem, including the chief complaint"
            ],
            answers: [0, 2, 3, 4, 6],
            rationale: "The purposes are to establish rapport, understand the current problem, review physical status, assess risk and safety, assess psychosocial status, identify mutual goals, and formulate a plan of care. Diagnosis under the DSM-5 belongs to the provider, and competency is a legal determination made through the courts, not through a nursing assessment.",
            topic: "Assessment, Theories & Therapies",
            source: "quiz-bank"
          },
          {
            stem: "A client on a medical unit appears withdrawn and tearful. Which nursing action is indicated?",
            options: [
              "Document the observation and continue to monitor over the next several shifts",
              "Avoid raising the subject, since asking about suicide may plant the idea",
              "Wait until the psychiatric consult is completed before discussing the client's mood",
              "Ask directly whether the client is depressed and whether they might hurt themselves"
            ],
            answer: 3,
            rationale: "If a person is depressed they must be assessed for suicidal tendencies, and the assessment is direct: \"Are you depressed?\" and then \"Do you feel that you might hurt yourself?\" Waiting or avoiding the question leaves a risk unassessed, and asking does not create it.",
            topic: "Assessment, Theories & Therapies",
            source: "quiz-bank"
          },
          {
            stem: "A nurse charts: \"Client states 'I feel hopeless.' Tearful, poor eye contact, shoulders stooped.\" Which part of this entry documents affect?",
            options: [
              "The tearfulness, eye contact, and posture",
              "The client's quoted statement about feeling hopeless",
              "Both the quotation and the observations, equally",
              "Neither; affect can only be documented with a rating scale"
            ],
            answer: 0,
            rationale: "Affect is what you see — the observed responsiveness of a person's emotional state, its physical manifestations and observable behavior. Mood is the emotional state in the person's own words, which is what the quotation records. Documenting the client's own description of mood is specifically expected, and \"hopeless\" is a word to capture.",
            topic: "Assessment, Theories & Therapies",
            source: "quiz-bank"
          },
          {
            stem: "A client shows no expression on the face whatsoever, resembling the masking seen in Parkinson's disease. How is this affect documented?",
            options: [
              "Constricted",
              "Blunted",
              "Flat",
              "Labile"
            ],
            answer: 2,
            rationale: "Flat affect is no emotion on the face at all — a blank canvas. Blunted affect is limited expression with some still present; the client may smile a little at times, which is the discrimination between the two. Constricted is only slightly less expression than normal, and labile describes mood rather than affect.",
            topic: "Assessment, Theories & Therapies",
            source: "quiz-bank"
          },
          {
            stem: "A client says \"I'm extremely happy today\" in a flat tone while crying. How does the nurse document this finding?",
            options: [
              "Incongruent mood and affect",
              "Congruent mood and affect",
              "Euthymic mood with full affect",
              "Cyclothymic mood with blunted affect"
            ],
            answer: 0,
            rationale: "Congruency asks whether mood and affect match. They do not here — the stated mood and the observed presentation contradict each other, which is incongruence. Euthymic means a normal mood, and cyclothymic means a cycling one; neither describes a single mismatched observation.",
            topic: "Assessment, Theories & Therapies",
            source: "quiz-bank"
          },
          {
            stem: "Which term describes a chronically low mood?",
            options: [
              "Euthymic",
              "Labile",
              "Euphoric",
              "Dysthymic"
            ],
            answer: 3,
            rationale: "Dysthymic is chronically low mood. Euthymic is normal mood, labile means the mood goes up and down, and euphoric or elated means abnormally elevated. Alongside these psychiatric terms, everyday descriptors are documented too — calm, anxious, agitated, overwhelmed, helpless, and hopeless, which is very important to capture.",
            topic: "Assessment, Theories & Therapies",
            source: "quiz-bank"
          },
          {
            stem: "Which interventions are psychosocial interventions? Select all that apply.",
            options: [
              "Teaching a client to journal their mood and sleep",
              "Titrating a client's antidepressant dose",
              "Setting limits on sexually inappropriate remarks in a matter-of-fact way",
              "Teaching positive self-talk to modify negative thought patterns",
              "Discharge planning",
              "Ordering a laboratory panel to check a drug level"
            ],
            answers: [0, 2, 3, 4],
            rationale: "Psychosocial interventions are non-pharmacological techniques that address the psychological, societal, familial, and cultural aspects of care: self-monitoring through journaling, limit setting, positive self-talk, and discharge planning are all on the list. Dose titration and laboratory ordering are pharmacological and diagnostic actions.",
            topic: "Assessment, Theories & Therapies",
            source: "quiz-bank"
          },
          {
            stem: "A therapist helps a client see how unresolved conflict with a parent is shaping their behavior in a current marriage. Which interpersonal therapy technique is this?",
            options: [
              "Identification of emotion",
              "Expression of emotion",
              "Dealing with emotional baggage",
              "Free association"
            ],
            answer: 2,
            rationale: "Dealing with emotional baggage examines how unresolved issues carried from past relationships affect present ones, and the mood and behavior they produce. Identification of emotion names what the feeling is and where it comes from, and expression of emotion is conveying it in a healthy way. Free association belongs to psychoanalysis, not interpersonal therapy.",
            topic: "Assessment, Theories & Therapies",
            source: "quiz-bank"
          },
          {
            stem: "A client taking disulfiram (Antabuse) for alcohol dependence drinks and becomes nauseated, dizzy, and flushed. Which therapy does this illustrate?",
            options: [
              "Operant conditioning",
              "Systematic desensitization",
              "Aversion therapy",
              "Biofeedback"
            ],
            answer: 2,
            rationale: "Aversion therapy pairs an unwanted behavior with a negative stimulus so the behavior decreases, and it is the opposite of operant conditioning, which uses positive reinforcement to increase behaviors you want to see. Systematic desensitization combines relaxation with graded exposure for a phobia, and biofeedback teaches control of involuntary bodily responses.",
            topic: "Assessment, Theories & Therapies",
            source: "quiz-bank"
          },
{
            stem: "Which are the four skill sets taught in dialectical behavior therapy? Select all that apply.",
            options: [
              "Emotional regulation",
              "Free association",
              "Interpersonal effectiveness",
              "Distress tolerance",
              "Mindfulness",
              "Dream analysis"
            ],
            answers: [0, 2, 3, 4],
            rationale: "The four skill sets are emotional regulation, interpersonal effectiveness, distress tolerance (which also appears as self-management), and mindfulness. Free association and dream analysis are psychoanalytic tools, used to uncover unconscious conflict rather than to build skills.",
            topic: "Assessment, Theories & Therapies",
            source: "quiz-bank"
          },
          {
            stem: "A client asks how dialectical behavior therapy will be delivered and how long it takes to work. Which response is accurate?",
            options: [
              "\"It is delivered in group sessions only, and most people see the best results within about six weeks.\"",
              "\"It is an inpatient-only therapy, and the best results are usually seen before you are discharged home.\"",
              "\"It is delivered by one primary therapist alone, and the best results usually appear within three months.\"",
              "\"It uses group skills training, individual therapy, phone contact, and team consultation, over one to two years.\""
            ],
            answer: 3,
            rationale: "The four primary modes are group skills training, individual psychotherapy, telephone contact, and therapist consultation and team meetings, delivered by a team that includes a psychiatrist. It runs both inpatient and outpatient but more often outpatient, precisely because it takes one to two years before the best results show.",
            topic: "Assessment, Theories & Therapies",
            source: "quiz-bank"
          }
        ],

        medications: [],
        eaq: []
      }
    },

    /* ==========================================================
       TOPIC 5 — GROUP & PHYSIOLOGIC THERAPIES
       ========================================================== */
    {
      id: "week1-group-physio",
      label: "Group & Physiologic Therapies",
      week: 1,
      sets: {
        mustKnow: [
{
            stem: "Which are among the seven physiological treatments covered in this course? Select all that apply.",
            options: [
              "Phototherapy",
              "Systematic desensitization",
              "Vagus nerve stimulation",
              "Exercise",
              "Herbal treatments",
              "Biofeedback"
            ],
            answers: [0, 2, 3, 4],
            rationale: "The seven are phototherapy, ECT, VNS, TMS, DBS, herbal treatments, and exercise; four appear here. Systematic desensitization and biofeedback are behavioral therapies rather than physiological treatments — both are real, and both belong to a different list.",
            topic: "Group & Physiologic Therapies",
            source: "quiz-bank"
          },
          {
            stem: "A group member repeatedly interrupts others, boasts about their achievements, and steers every discussion back to themselves. Which category of role is this?",
            options: [
              "A task role",
              "A building and maintenance role",
              "An individual role",
              "A leadership role"
            ],
            answer: 2,
            rationale: "Individual roles meet the need of only one member and hamper rather than enhance group functioning — the aggressor, blocker, recognition seeker, play person, and dominator. Task roles move the group's work forward, and building and maintenance roles strengthen and regulate the group itself.",
            topic: "Group & Physiologic Therapies",
            source: "quiz-bank"
          },
          {
            stem: "Which are characteristics of a group? Select all that apply.",
            options: [
              "Size",
              "Defined purpose",
              "Degree of similarity among members",
              "A minimum of eight members",
              "Rules and boundaries",
              "Content and process"
            ],
            answers: [0, 1, 2, 4, 5],
            rationale: "The characteristics are size, defined purpose, degree of similarity, rules, boundaries, and content and process — what is talked about and what goes on inside the group. There is no minimum of eight: a group is two or more people pursuing common goals or interests, which is why patient and family education counts as leading one.",
            topic: "Group & Physiologic Therapies",
            source: "quiz-bank"
          },
          {
            stem: "A registered nurse without an advanced degree asks which groups they may lead. Which response is accurate?",
            options: [
              "\"Any group, provided a psychiatrist reviews the notes.\"",
              "\"Activity, educational, task, and support groups.\"",
              "\"Only educational groups, because the others require an advanced degree.\"",
              "\"Group psychotherapy, as long as a social worker co-leads it.\""
            ],
            answer: 1,
            rationale: "A registered nurse may lead activity, educational, task, and support groups. Group psychotherapy requires an advanced degree because it aims at bringing about personality change, and no amount of supervision or co-leadership moves it into basic-level scope.",
            topic: "Group & Physiologic Therapies",
            source: "quiz-bank"
          },
          {
            stem: "A nurse on a medical-surgical floor runs a session teaching clients with diabetes about symptom management. Which type of group is this?",
            options: [
              "A dual diagnosis group",
              "A recreational activity group",
              "A medication or health education group",
              "A therapeutic community meeting"
            ],
            answer: 2,
            rationale: "Medication and health education groups cover symptom management or disease education, and a diabetes group on a med-surg floor is the example used. A therapeutic community meeting is the essential inpatient group covering unit disruptions and rules, and a dual diagnosis group serves clients with both a substance use disorder and another mental health disorder.",
            topic: "Group & Physiologic Therapies",
            source: "quiz-bank"
          },
          {
            stem: "Which are advantages of group therapy?",
            options: [
              "It guarantees that whatever members share in the room stays confidential",
              "It gives each member more individual attention than one-to-one therapy does",
              "It works equally well for clients who are acutely psychotic or intoxicated",
              "It engages several clients at once and draws on their experience"
            ],
            answer: 3,
            rationale: "Group engages several clients in treatment at the same time — which is why it is the main treatment on the units — and members benefit from the feedback, knowledge, and life experience of others, in a safe setting to try new behaviors. The other three options each name a known disadvantage and state it backwards.",
            topic: "Group & Physiologic Therapies",
            source: "quiz-bank"
          },
          {
            stem: "Which are disadvantages of group therapy? Select all that apply.",
            options: [
              "Confidentiality cannot be guaranteed",
              "Time constraints mean each member's participation time is short",
              "Members cannot receive feedback from anyone but the leader",
              "A member who is acutely manic or intoxicated does not benefit",
              "It promotes a feeling of belonging"
            ],
            answers: [0, 1, 3],
            rationale: "There is no promise that every member keeps what is said in the group, a unit group runs about 45 minutes across many clients, and someone acutely psychotic, manic, or intoxicated cannot sit through a group or interact effectively. Peer feedback is one of group's main advantages, as is the feeling of belonging.",
            topic: "Group & Physiologic Therapies",
            source: "quiz-bank"
          },
          {
            stem: "A leader opens a group, offers no direction, and lets the discussion go wherever the members take it. Which leadership style is this?",
            options: [
              "Autocratic",
              "Democratic",
              "Laissez-faire",
              "Task-oriented"
            ],
            answer: 2,
            rationale: "Laissez-faire allows members to behave however they choose without controlling the group's direction. Autocratic leaders exert control and do not encourage much interaction, as in an information-heavy educational group; democratic leaders support extensive interaction in problem-solving. AA groups are usually democratic or laissez-faire.",
            topic: "Group & Physiologic Therapies",
            source: "quiz-bank"
          },
          {
            stem: "A client with depression that worsens each winter is being considered for light therapy. Which assessment is most important before starting?",
            options: [
              "Whether the client has a history of seizures",
              "Whether the client has metal implants",
              "Whether the diagnosis might actually be bipolar disorder",
              "Whether the client has a cardiac history"
            ],
            answer: 2,
            rationale: "Light therapy can trigger mania or hypomania, so the diagnosis must be investigated thoroughly to rule out bipolar disorder before it is prescribed. Otherwise phototherapy is very safe, with headache and jitteriness as the usual side effects. Seizure history and metal implants are TMS concerns, and cardiac status is an ECT concern.",
            topic: "Group & Physiologic Therapies",
            source: "quiz-bank"
          },
          {
            stem: "A nurse observes an ECT treatment. Which findings are expected? Select all that apply.",
            options: [
              "An electrical current lasting 1 second or less",
              "A seizure lasting 30 to 60 seconds",
              "A seizure lasting 3 to 5 minutes",
              "One extremity left un-paralyzed so the convulsion can be observed",
              "The client awake and conversational throughout"
            ],
            answers: [0, 1, 3],
            rationale: "The stimulus is a current of 1 second or less, producing a brief seizure of 30 to 60 seconds that is monitored throughout, with one extremity left un-paralyzed so the convulsion can be seen. ECT is done under anesthesia with a muscle relaxant, so the client is not awake — that describes TMS, where the client is awake and alert.",
            topic: "Group & Physiologic Therapies",
            source: "quiz-bank"
          },
          {
            stem: "Which condition contraindicates ECT?",
            options: [
              "A subdural hematoma",
              "Treatment-resistant depression",
              "Catatonia in schizophrenia",
              "Malnutrition and dehydration"
            ],
            answer: 0,
            rationale: "ECT stresses the brain through increased cerebral oxygen demand, blood flow, and intracranial pressure, so it is contraindicated in brain tumors and subdural hematomas. The heart is also heavily stressed at seizure onset and for up to ten minutes after. The other three are indications: refractory depression, catatonia, and severe depression with malnutrition or dehydration — rehydrate first.",
            topic: "Group & Physiologic Therapies",
            source: "quiz-bank"
          },
          {
            stem: "A client's family asks what to expect after an outpatient ECT treatment. Which response is accurate?",
            options: [
              "\"He will be fully oriented the moment he wakes, so no special precautions are needed.\"",
              "\"He will wake in about 15 minutes, may be confused for hours, and may not recall it.\"",
              "\"He will lose memories from the past several years, and those memories do not return.\"",
              "\"He will sleep for the rest of the day, and he should not be woken before evening.\""
            ],
            answer: 1,
            rationale: "Clients wake about 15 minutes after the procedure, confusion and disorientation are very common and last several hours, and most experience retrograde amnesia for the events leading up to and including the treatment — usually just the morning before and shortly after, not years. Reorienting afterward is part of the procedure, and outpatient families are told they may need to do the same.",
            topic: "Group & Physiologic Therapies",
            source: "quiz-bank"
          },
          {
            stem: "Which finding is the one contraindication to transcranial magnetic stimulation?",
            options: [
              "A history of treatment-resistant depression",
              "Current use of antidepressant medication",
              "Metal in the area of stimulation",
              "Inability to tolerate general anesthesia"
            ],
            answer: 2,
            rationale: "The one contraindication is metal in the area of stimulation — brain stimulators, cochlear implants, medication pumps, bullet fragments — and TMS is also avoided with a pacemaker or a history of seizures. Treatment-resistant depression is the FDA-approved indication, patients continue their medications during treatment, and TMS uses no anesthesia at all.",
            topic: "Group & Physiologic Therapies",
            source: "quiz-bank"
          },
          {
            stem: "A client six weeks after vagus nerve stimulator placement reports that their voice sounds different. How does the nurse respond?",
            options: [
              "\"That suggests the device has migrated, and it needs urgent evaluation.\"",
              "\"That is unrelated to the stimulator, which only acts on your mood.\"",
              "\"Voice changes mean the stimulator should be switched off permanently.\"",
              "\"Voice alteration affects nearly 60% of patients and decreases with time.\""
            ],
            answer: 3,
            rationale: "Voice alteration occurs in nearly 60% of patients, alongside hoarseness, headache, neck pain, cough, paresthesia, and dyspnea, and these all decrease with time. The device stimulates the left cervical vagus nerve, which supplies the larynx, so the change is expected rather than a sign of malfunction.",
            topic: "Group & Physiologic Therapies",
            source: "quiz-bank"
          }
        ],

        medications: [],
        eaq: []
      }
    },

    /* ==========================================================
       TOPIC 6 — THERAPEUTIC COMMUNICATION

       Renamed from "Therapeutic Communication & Relationships" on
       2026-09-13, when the separate "Cultural Care" topic was deleted
       and its 9 eaq questions moved to the END of this eaq set (Holly).
       Those 9 come from the EAQ "Week 1: EAQ Quiz" (30 questions,
       completed 2026-08-26) and cover textbook pp. 79-86: ethnicity,
       race, minority, multiple heritage, cultural norms, Latinx,
       culturally congruent practice, and the Susto cultural syndrome.

       The first 20 eaq questions come from the Elsevier Adaptive
       Quizzing "Week 1 ticket to class quiz" (20 questions, completed
       2026-08-23, scored 100%). The subject is textbook pp. 125-147 —
       the therapeutic relationship and therapeutic communication.

       This material is NOT taught on any of the five topic pages.
       That is why it sits in its own topic rather than being
       folded into "Assessment, Theories & Therapies": putting it
       there would tell the topic-breakdown strip that the site
       teaches this, and it does not. (4 mustKnow questions were
       added on 2026-09-01, when the exam blueprint gave this
       material 5 exam questions.)

       Wording is kept as close to the original as possible per
       CLAUDE.md rule 6. Only conversion artifacts were repaired
       (displaced apostrophes and en dashes, a duplicated phrase, a
       truncated word, stray markup) — each one is listed in
       SESSION-LOG.md. The generic "Test-Taking Tip" blocks and the
       "Report content error" UI chrome were dropped; the textbook
       page reference at the end of each rationale was kept.
       ========================================================== */
    {
      id: "week1-therapeutic-communication",
      label: "Therapeutic Communication",
      week: 1,
      sets: {
        mustKnow: [
            {
              stem: "A nurse plans an interaction with a newly admitted patient. Which planned approaches are therapeutic communication techniques? Select all that apply.",
              options: [
                "Maintaining silence so the patient can continue at their pace",
                "Telling the patient what you would do in their situation",
                "Presenting reality when the patient misperceives an event",
                "Telling the patient that they were right to leave the relationship",
                "Encouraging the patient to formulate a plan of action",
                "Asking the patient why they stopped taking the medication"
              ],
              answers: [0, 2, 4],
              rationale: "Maintaining silence, presenting reality, and encouraging formulation of a plan of action all appear on the list of therapeutic techniques. The other three are barriers: saying what you would do is giving advice, endorsing the patient's decision is giving approval, and a \"why\" question is routinely heard as accusatory. Advice and approval both move the conversation off the patient's own reasoning and onto the nurse's.",
              topic: "Therapeutic Communication",
              source: "quiz-bank"
            },
            {
              stem: "A patient says, “I stopped my medication because it made me feel like a zombie.” Which response by the nurse is a barrier to communication?",
              options: [
                "“Tell me more about how the medication made you feel.”",
                "“It sounds like those side effects were hard to live with.”",
                "“You should never stop a medication without calling first.”",
                "“What was different about the days when you did take it?”"
              ],
              answer: 2,
              rationale: "Giving advice is a barrier: it virtually terminates the conversation and fosters dependency by implying the patient cannot make the decision himself. The other three are therapeutic — inviting more detail, reflecting the feeling back, and seeking clarification about what was different. None of them closes the exchange down or passes judgment on the decision the patient already made.",
              topic: "Therapeutic Communication",
              source: "quiz-bank"
            },
            {
              stem: "A patient tells the nurse she was fired the day after disclosing her diagnosis to her manager. Which response by the nurse is most therapeutic?",
              options: [
                "“I can put you in touch with someone in human resources about that.”",
                "“How did it feel to have that happen right after you told her?”",
                "“That sounds like discrimination, and you should file a complaint.”",
                "“At least you know now what your manager really thinks of you.”"
              ],
              answer: 1,
              rationale: "The most therapeutic response focuses on the patient's feelings and encourages the widest range of replies, which makes the patient an active participant in the conversation. Referring her to human resources passes the responsibility to someone else, telling her to file a complaint is giving advice, and the last option is judgmental — and any judgmental approach is non-therapeutic.",
              topic: "Therapeutic Communication",
              source: "quiz-bank"
            },
            {
              stem: "A patient who has been isolated for months says he would like to start getting out again. Which principle should guide the order of the nurse's questions?",
              options: [
                "Logistics first, since transportation and cost decide what is actually possible",
                "Companionship first, since another person is what sustains the change",
                "All areas at once, so that nothing important is missed at the outset",
                "Past interests first, since what he enjoyed is where re-socialization begins"
              ],
              answer: 3,
              rationale: "Knowing what the patient enjoyed in the past is the best place to begin helping him re-socialize. Who he would go with, how he would get there, and what he can afford are all relevant questions, but they are asked after the activity itself is identified. Starting with logistics puts the obstacles in front of the motivation, which is the opposite of what the patient just offered.",
              topic: "Therapeutic Communication",
              source: "quiz-bank"
            }
          ],
        medications: [],
        eaq: [
          {
            stem: "Which factor promoting patient growth describes the ability to view another person as worthy of caring about and as someone who has strengths and achievement potential?",
            options: ["Empathy", "Genuineness", "Positive regard", "Countertransference"],
            answer: 2,
            rationale: "Positive regard implies respect; it is the ability to view another person as being worthy of caring about and as someone who has strengths and achievement potential. Empathy occurs when the nurse attempts to understand the world from the patient's perspective. Genuineness refers to the nurse's ability to be open, honest, and authentic in interactions with patients. Countertransference does not promote patient growth. It occurs when the nurse unconsciously displaces feelings related to significant figures in the nurse's past onto the patient. (p. 132)",
            topic: "Therapeutic Communication",
            source: "eaq"
          },
          {
            stem: "Which factor promoting patient growth occurs when the nurse attempts to understand the world from the patient's perspective?",
            options: ["Empathy", "Genuineness", "Positive regard", "Countertransference"],
            answer: 0,
            rationale: "Empathy occurs when the nurse attempts to understand the world from the patient's perspective. Genuineness refers to the nurse's ability to be open, honest, and authentic in interactions with patients. Positive regard implies respect; it is the ability to view another person as being worthy of caring about and as someone who has strengths and achievement potential. Countertransference does not promote patient growth. It occurs when the nurse unconsciously displaces feelings related to significant figures in the nurse's past onto the patient. (p. 132)",
            topic: "Therapeutic Communication",
            source: "eaq"
          },
          {
            stem: "Which nursing competency refers to the patient as a full partner in care whose values, preferences, and needs are respected?",
            options: ["Patient-centered care", "Nurse-patient relationship", "Therapeutic communication", "Sender-messenger feedback loop"],
            answer: 0,
            rationale: "Quality and Safety Education for Nurses (QSEN) identifies competencies in nursing practice that relate to communication and interaction with patients. Patient-centered care is a QSEN competency that refers to the patient as a full partner in care whose values, preferences, and needs are respected. The nurse-patient relationship is based on mutual trust. Therapeutic communication is a crucial aspect of developing patient-centered care. The sender-messenger feedback loop is a diagram explaining delivery and interpretation of communication. (p. 136)",
            topic: "Therapeutic Communication",
            source: "eaq"
          },
          {
            stem: "Which factor promoting patient growth refers to the nurse's ability to be open, honest, and authentic in interactions with patients?",
            options: ["Empathy", "Genuineness", "Positive regard", "Countertransference"],
            answer: 1,
            rationale: "Genuineness refers to the nurse's ability to be open, honest, and authentic in interactions with patients. Empathy occurs when the nurse attempts to understand the world from the patient's perspective. Positive regard implies respect; it is the ability to view another person as being worthy of caring about and as someone who has strengths and achievement potential. Countertransference does not promote patient growth. It occurs when the nurse unconsciously displaces feelings related to significant figures in the nurse's past onto the patient. (p. 132)",
            topic: "Therapeutic Communication",
            source: "eaq"
          },
          {
            stem: "Which therapeutic communication technique is most appropriate for the nurse to use with a patient experiencing hallucinations who states, \"I see green men in the dining room\"?",
            options: ["Voicing doubt", "Giving information", "Using consensual validation", "Verbalizing the implied"],
            answer: 0,
            rationale: "The most appropriate therapeutic communication technique for the nurse to use for a patient who is hallucinating is voicing doubt. Voicing doubt is expressing uncertainty regarding the reality of the patient's perceptions, especially during hallucinations. Giving information supplies knowledge from which decisions can be made or conclusions drawn. Consensual validation clarifies that both the nurse and the patient share mutual understanding of communication. Verbalizing the implied puts into concrete terms what the patient implies, making the patient's communication more explicit. (p. 142)",
            topic: "Therapeutic Communication",
            source: "eaq"
          },
          {
            stem: "Which example is considered physical noise according to the transactional model of communication?",
            options: [
              "A patient reports a headache.",
              "A patient appears weak and fatigued.",
              "A patient is preoccupied with upcoming visiting hours.",
              "The television in the patient's room is playing loudly in the background."
            ],
            answer: 3,
            rationale: "Noise is a barrier to communication. According to the transactional model of communication, physical noise is experienced by such conditions as a television playing loudly in the background. The patient reporting a headache is an example of physiological distraction. Weakness and fatigue are examples of physiological noise. Psychological noise refers to the factors within a person's mind such as not wanting to communicate because of a preoccupation with upcoming visiting hours. (p. 138)",
            topic: "Therapeutic Communication",
            source: "eaq"
          },
          {
            stem: "When interacting with a patient, the nurse develops a message and sends it to the patient. In turn, the patient interprets the message. According to the transactional model of communication, which term is used to describe this interaction?",
            options: ["Channel", "Feedback", "Communicator", "Encoding/decoding"],
            answer: 3,
            rationale: "According to the transactional model of communication, encoding/decoding refers to an interaction in which a person develops a message and sends it to another. In turn, the receiver decodes the message. Channel refers to a method by which communication takes place. Feedback refers to messaging that takes place with constant feedback being given by both parties. Feedback for one is the message for the other. Senders and receivers are both considered to be communicators, which makes roles fluid and communicators interdependent. (p. 137)",
            topic: "Therapeutic Communication",
            source: "eaq"
          },
          {
            stem: "In which phase of the nurse-patient relationship would the nurse provide education about the patient's disorder and relevant medication?",
            options: ["Working", "Orientation", "Termination", "Preorientation"],
            answer: 0,
            rationale: "The working phase involves gathering further data, identifying problem-solving skills and self-esteem, providing education about the disorder, promoting symptom management, providing medication education, and evaluating progress. The orientation phase of the nurse-patient relationship involves establishing rapport, specifying a contract, and explaining confidentiality. The termination phase involves summarizing the goals and objectives achieved in the relationship, discussing ways for the patient to incorporate into daily life any new coping strategies learned, reviewing situations that occurred during the nurse-patient relationship, and exchanging memories to help validate the experience. Preorientation involves reviewing the patient's chart, conducting research, consulting with staff, and exploring feelings about the first encounter. (p. 131)",
            topic: "Therapeutic Communication",
            source: "eaq"
          },
          {
            stem: "Which concept provides the foundation for the development of a therapeutic nurse-patient relationship?",
            options: ["Culture", "Environment", "Communication", "Nonverbal behavior"],
            answer: 2,
            rationale: "Communication provides the foundation for the development of a therapeutic nurse-patient relationship. Therapeutic relationships are influenced by effective (positive) and ineffective (negative) communication. Culture may influence verbal and nonverbal aspects of communication. The physical environment may affect communication; for example, excessive noise may decrease attention to the message sent. Nonverbal behavior is another aspect of communication and is significant in sending messages to the receiver. (p. 136)",
            topic: "Therapeutic Communication",
            source: "eaq"
          },
          {
            stem: "The nurse is participating in therapeutic communication with the patient. Which personal factor may impede accurate interpretation of messages?",
            options: ["Interruptions", "Lack of privacy", "Language barriers", "Uncomfortable accommodations"],
            answer: 2,
            rationale: "Personal factors can impede accurate transmission or interpretation of messages. Language barriers are personal factors that may reduce the normal flow of communication. Interruptions, lack of privacy, and uncomfortable accommodations are examples of environmental factors that can impede communication. (p. 138)",
            topic: "Therapeutic Communication",
            source: "eaq"
          },
          {
            stem: "Which factor serves as a barrier to communication because of inequality?",
            options: ["Personal factors", "Relationship factors", "Environmental factors", "Neurocognitive factors"],
            answer: 1,
            rationale: "Relationship factors refer to the level of equality within the relationship. When two participants are equal, the relationship is symmetrical. When there is a difference in status or power, the relationship is characterized by inequality. Personal factors are those that impede accurate transmission or interpretation of messages such as neurocognitive disorders or psychotic states. Environmental factors such as background noise, lack of privacy, and uncomfortable accommodations are barriers that do not create inequality between the nurse and patient. Neurocognitive factors exemplify personal factors. (p. 139)",
            topic: "Therapeutic Communication",
            source: "eaq"
          },
          {
            stem: "The nurse is uncertain of the meaning of the patient's statement. Which therapeutic communication technique is helpful in clarifying the patient's message?",
            options: ["Silence", "Restating", "Open-ended questions", "Closed-ended questions"],
            answer: 1,
            rationale: "Restating is an active listening strategy that helps the nurse to understand what the patient is saying. Clarifying the message can be done by restating or paraphrasing what the patient said. Silence gives the patient time to collect thoughts or think through a point. Open-ended questions encourage the patient to share information about experiences, perceptions, or response to a situation. Closed-ended questions are used to yield \"yes\" or \"no\" answers. (p. 142)",
            topic: "Therapeutic Communication",
            source: "eaq"
          },
          {
            stem: "The patient states, \"I wish I were dead.\" The nurse replies, \"Things get worse before they get better.\" The nurse's response is an example of which type of nontherapeutic communication?",
            options: ["Disagreeing", "Giving approval", "Falsely reassuring", "Minimizing feelings"],
            answer: 3,
            rationale: "Nontherapeutic communication techniques are those that impede or shut down the nurse-patient interaction. The nurse's response to the patient is minimizing the patient's feelings. Disagreeing would be a response such as, \"You do not wish you were dead.\" Giving approval would be a response such as, \"I agree with you.\" False reassurance would be a response such as, \"Everything will be all right.\" (p. 144)",
            topic: "Therapeutic Communication",
            source: "eaq"
          },
          {
            stem: "Which person leads the content and direction of the clinical interview?",
            options: ["Nurse", "Patient", "Physician", "Counselor"],
            answer: 1,
            rationale: "Psychiatric conditions may cause changes in the ability to process information. Therefore, it is critical to any kind of counseling to permit the patient to set the pace of the clinical interview rather than the nurse, physician, or counselor. (p. 147)",
            topic: "Therapeutic Communication",
            source: "eaq"
          },
          {
            stem: "During which phase of the nurse-patient relationship is rapport established with the patient?",
            options: ["Working", "Orientation", "Termination", "Preorientation"],
            answer: 1,
            rationale: "The orientation phase of the nurse-patient relationship involves establishing rapport, specifying a contract, and explaining confidentiality. The working phase involves gathering further data, identifying problem-solving skills and self-esteem, providing education about the disorder, promoting symptom management, providing medication education, and evaluating progress. The termination phase involves summarizing the goals and objectives achieved in the relationship, discussing ways for the patient to incorporate into daily life any new coping strategies learned, reviewing situations that occurred during the nurse-patient relationship, and exchanging memories to help validate the experience. Preorientation involves reviewing the patient's chart, conducting research, consulting with staff, and exploring feelings about the first encounter. (p. 129)",
            topic: "Therapeutic Communication",
            source: "eaq"
          },
          {
            stem: "Which type of gift is appropriate for the nurse to accept from the patient?",
            options: [
              "Expensive and is given at the end of hospitalization.",
              "Inexpensive and is given at the end of hospitalization.",
              "Expensive and is given at the beginning of the relationship.",
              "Inexpensive and is given at the beginning of the relationship."
            ],
            answer: 1,
            rationale: "Accepting a gift from a patient is appropriate only if the gift is inexpensive and is given at the end of hospitalization. It is never appropriate for the nurse to accept an expensive gift from a patient, either before or after hospitalization. The nurse should also graciously refuse an inexpensive gift given at the beginning of the relationship, while exploring with the patient the meaning behind the gift. (pp. 129-130)",
            topic: "Therapeutic Communication",
            source: "eaq"
          },
          {
            stem: "Which emotion does the nurse express when they state, \"Those sounds were so frustrating and overwhelming; the sounds could make the other patients react in an aggressive manner,\" after listening to hallucinations from a patient diagnosed with schizophrenia?",
            options: ["Surprise", "Empathy", "Sympathy", "Anticipation"],
            answer: 1,
            rationale: "Acknowledging the patient's feelings and emotions indicates empathy. This helps the nurse understand the patient's perceptions and provide effective care and treatment. One of the teaching strategies for nursing is stimulation education, in which the nurse can experience what the patients feel and can develop empathy toward them. Surprise is the feeling expressed in unexpected situations. The nurse feels sympathy for the patient based on self-perceptions. Sympathy is not a therapeutic response because it is associated with feelings of pity and commiseration. Anticipation means to positively look forward to something that is going to happen. (p. 132)",
            topic: "Therapeutic Communication",
            source: "eaq"
          },
          {
            stem: "Which therapeutic communication technique is being used when a nurse asks a patient, \"I realize that you lost your wife recently. Can you tell me about how you have been doing since this loss\"?",
            options: ["Restating", "Giving information", "Making observations", "Exploring"],
            answer: 3,
            rationale: "Exploring is the therapeutic communication technique used in this example. Exploring is used to examine patient experiences more fully. Restating involves repeating the main ideas expressed by the patient to give the patient an idea of what has been communicated. Giving information involves informing the patient of facts needed to make decisions or come to realistic conclusions. Making observations involves assessing nonverbal communication. (p. 142)",
            topic: "Therapeutic Communication",
            source: "eaq"
          },
          {
            stem: "During a therapeutic encounter the nurse remarks to a patient, \"I noticed anger in your voice when you spoke of your parent. Tell me about that.\" Which communication techniques are the nurse using?",
            options: [
              "Reflecting and exploring",
              "Clarifying and suggesting collaboration",
              "Presenting reality and encouraging planning",
              "Giving information and encouraging evaluation"
            ],
            answer: 0,
            rationale: "Reflecting conveys the nurse's observations of the patient when a sensitive issue is being discussed. Exploring seeks to examine a certain idea more fully. Clarification helps the patient to better understand one's own thoughts, and the nurse did not suggest collaboration. The nurse did not present reality or encourage planning. Giving information supplies the patient with knowledge to help make decisions. (p. 142)",
            topic: "Therapeutic Communication",
            source: "eaq"
          },
          {
            stem: "Which kind of relationship occurs between people who have an emotional connection to each other?",
            options: ["Social", "Intimate", "Therapeutic", "Inappropriate"],
            answer: 1,
            rationale: "Intimate relationships occur between people who have an emotional commitment to each other. Within intimate relationships, mutual needs are met, and intimate desires and hopes are shared. Morally, legally, and ethically, nurses and nursing students do not have intimate relationships with patients. A social relationship is primarily initiated for the purpose of friendship, socialization, enjoyment, or accomplishment of a task. In a therapeutic relationship, the nurse maximizes communication skills, understanding of human behaviors, and personal strengths to enhance the patient's growth. An inappropriate relationship occurs when professional boundaries between the nurse and patient are not maintained. (p. 125)",
            topic: "Therapeutic Communication",
            source: "eaq"
          },
          {
            stem: "Which information refers to an ethnic group?",
            options: [
              "Sharing the same practices",
              "Sharing a common heritage",
              "Coming from the same sociocultural group",
              "Sharing a religious identity that differs from the majority of the population"
            ],
            answer: 1,
            rationale: "Ethnic groups refer to people who share a common heritage, as well as history. Sharing the same practices is referred to as culture. People who come from the same sociocultural group are referred to as a race. Sharing a religious identity differing from the majority of the population is referred to as a minority. (p. 80)",
            topic: "Therapeutic Communication",
            source: "eaq"
          },
          {
            stem: "Which term is used to describe groups of people in the United States who do not identify in terms of a single race or ethnicity?",
            options: [
              "Race",
              "Minority",
              "Cultural norms",
              "Multiple heritage"
            ],
            answer: 3,
            rationale: "Multiple heritage describes groups of people in the United States who do not identify in terms of a single race or ethnicity. Race has been traditionally reflected by a social definition based on biology, anthropology, and genetics. Race categories are now recognized as including racial and national origins and sociocultural groups. The term minority refers to groups characterized by their own cultural, ethnic, religion, or religious identity, which differs from that of the majority of the population. Cultural norms are attitudes and behaviors that are culturally defined and considered normal, typical, or average within a given group. (p. 80)",
            topic: "Therapeutic Communication",
            source: "eaq"
          },
          {
            stem: "Which factor would the nurse base culturally congruent practice on when caring for a patient?",
            options: [
              "Values",
              "Gender",
              "Education",
              "Socioeconomic status"
            ],
            answer: 0,
            rationale: "Culturally congruent practice should be based on a patient's values, beliefs, practices, and worldview. Culturally congruent practice is not based on gender, education, or socioeconomic status. (p. 86)",
            topic: "Therapeutic Communication",
            source: "eaq"
          },
          {
            stem: "Which description defines the term Latinx?",
            options: [
              "Newly immigrated Latinos",
              "People of Latin American origin, regardless of gender",
              "Spanish-speaking people",
              "Latino people from South America"
            ],
            answer: 1,
            rationale: "Latinx is a gender-neutral or nonbinary form of Latino and Latina and relates to people of Latin American origin or descent. All of its members are also members of a racial group or groups, such as White, Black, Native American, Mexican American, Puerto Rican, and Cuban American. The term Latinx does not refer to newly immigrated Latinos or the Spanish-speaking population or refer solely to the Latino population from South America. (p. 80)",
            topic: "Therapeutic Communication",
            source: "eaq"
          },
          {
            stem: "Which finding in a patient's electronic healthcare record (EHR) is an indication of a minority group?",
            options: [
              "Marital status",
              "Gender",
              "Employment status",
              "Level of education"
            ],
            answer: 1,
            rationale: "The term minority refers to groups characterized by their own cultural, ethnic, religious, or religious identity, which differs from that of the majority of the population. Minority groups also include disabled individuals, gender, sexuality, and political minorities. A patient's marital status, employment status, or level of education are not associated with the term minority group. (p. 79)",
            topic: "Therapeutic Communication",
            source: "eaq"
          },
          {
            stem: "Which example is reflective of a cultural norm?",
            options: [
              "Shared family history",
              "Family of origin from Mexico",
              "Shaking hands when meeting someone",
              "Common genetic traits within a group of people"
            ],
            answer: 2,
            rationale: "Cultural norms are culturally defined attitudes and behaviors considered normal, typical, or average within a given group. Shaking hands when meeting someone is an example of a cultural norm frequently practiced in Western culture. A shared family history refers to ethnicity. The national origin of the family refers to race. Common genetic traits within a group of people refer to ethnicity. (p. 80)",
            topic: "Therapeutic Communication",
            source: "eaq"
          },
          {
            stem: "Which factor reflects the proper use of the term minority as related to concepts of cultural care? Select all that apply.",
            options: [
              "Culture",
              "Genetics",
              "Ethnicity",
              "Religion",
              "Racial group"
            ],
            answers: [0, 2, 3],
            rationale: "The term minority refers to groups characterized by their own culture, ethnicity, religion, or religious identity, which differs from that of the majority of the people. Race has been traditionally reflected by social definitions based on biology, anthropology, and genetics. A racial group encompasses racial categories, which include racial and national origins and sociocultural groups. (p. 79)",
            topic: "Therapeutic Communication",
            source: "eaq"
          },
          {
            stem: "Which component is included in how race categories are currently recognized by the US Census Bureau? Select all that apply.",
            options: [
              "Racial origins",
              "National origins",
              "Religious identity",
              "Common heritage",
              "Sociocultural groups"
            ],
            answers: [0, 1, 4],
            rationale: "Race categories are now recognized as including racial and national origins and sociocultural groups. Religious identity is not a category of race. Sharing a common heritage is an attribute of ethnicity. (pp. 79-80)",
            topic: "Therapeutic Communication",
            source: "eaq"
          },
          {
            stem: "A patient reports seeking treatment for Susto with an espiritista. Which disorder correlates with the patient's symptoms?",
            options: [
              "Depression",
              "Schizophrenia",
              "Bipolar disorder",
              "Posttraumatic stress disorder"
            ],
            answer: 3,
            rationale: "Susto is a cultural syndrome associated with the Latin American culture characterized by a broad range of somatic and psychological symptoms similar to posttraumatic stress disorder. The cultural syndrome is believed to be caused by a traumatic incident or fright that caused the patient's soul to leave the body and is treated by an espiritista, or spiritual healer. The patient's symptoms will not necessarily specifically correlate with depression, schizophrenia, or bipolar disorder. (p. 85)",
            topic: "Therapeutic Communication",
            source: "eaq"
          }
        ]
      }
    },

    /* ==========================================================
       TOPIC 7 — DEPRESSIVE DISORDERS  (Week 2)
       9 mustKnow, one per Learning Outcomes bullet on
       must-know.html#depressive. 5 extraPractice from the Key Terms
       table and other high-yield material.
       ========================================================== */
    {
      id: "week2-depressive",
      label: "Depressive Disorders",
      week: 2,
      sets: {
        mustKnow: [
          {
            stem: "A 71-year-old is admitted with a first episode of major depression six months after their spouse died. Which contributing factor is most specific to this patient's stage of life?",
            options: [
              "Bereavement, declining health, and social isolation",
              "A first-degree relative with a mood disorder",
              "Chronic exposure to occupational stress",
              "Learned helplessness formed in early childhood"
            ],
            answer: 0,
            rationale: "Contributing factors shift across the lifespan, and in older adults loss, physical decline, and isolation predominate. Genetic vulnerability, chronic stress, and learned helplessness are all real etiological contributors, but none of them is particular to late life — a family history matters at any age, and learned helplessness is a childhood-origin cognitive factor, not a late-life one.",
            topic: "Depressive Disorders",
            source: "quiz-bank"
          },
          {
            stem: "A 9-year-old has had severe temper outbursts several times a week at home and at school for the past 14 months, with an angry, irritable mood between the outbursts. Which depressive disorder best fits?",
            options: [
              "Persistent depressive disorder",
              "Premenstrual dysphoric disorder",
              "Disruptive mood dysregulation disorder",
              "Major depressive disorder, recurrent"
            ],
            answer: 2,
            rationale: "DMDD is diagnosed only in children 6 to 18 and requires outbursts at least three times weekly for at least a year in at least two settings, with persistent irritability between them — which is exactly this picture. Persistent depressive disorder is a chronically low mood rather than an outburst pattern, premenstrual dysphoric disorder is tied to the luteal phase, and major depressive disorder requires the five-symptom, two-week criteria set rather than chronic irritability.",
            topic: "Depressive Disorders",
            source: "quiz-bank"
          },
          {
            stem: "A student is grouping the antidepressants by classification in order to study their side effects. Which grouping reflects how the classes are organized?",
            options: [
              "Fluoxetine and phenelzine share a class because both raise serotonin",
              "Amitriptyline and venlafaxine can be studied together because both are reuptake inhibitors",
              "Bupropion and mirtazapine belong to the SSRI class alongside sertraline",
              "Sertraline and duloxetine can be studied together as serotonin reuptake inhibitors"
            ],
            answer: 3,
            rationale: "SSRIs and SNRIs are grouped together as serotonin reuptake inhibitors because they share most of their side effects, so studying them as one block works. Fluoxetine is an SSRI and phenelzine an MAOI — very different precautions. Amitriptyline is a tricyclic, not an SNRI. Bupropion is an NDRI and mirtazapine a NaSSA; neither is an SSRI.",
            topic: "Depressive Disorders",
            source: "quiz-bank"
          },
          {
            stem: "A patient on sertraline was started on a second serotonergic agent 4 hours ago and now has diaphoresis, muscle twitching, hyperreflexia, agitation, and a temperature of 38.9°C. Which actions does the nurse anticipate? Select all that apply.",
            options: [
              "Discontinue the serotonergic agents",
              "Administer a benzodiazepine such as diazepam",
              "Administer haloperidol for the agitation",
              "Provide IV fluids and oxygen",
              "Add a second serotonergic agent to stabilize receptor activity"
            ],
            answers: [0, 1, 3],
            rationale: "Serotonin syndrome comes from overactivation of central serotonin receptors, so stopping the causative agents is the first action, benzodiazepines control the myoclonus and agitation, and fluids and oxygen are supportive care. Haloperidol is avoided — antipsychotics can worsen hyperthermia and provoke a neuroleptic malignant syndrome-like reaction. Adding another serotonergic agent would deepen the overactivation and could be fatal. Onset is fast: 60% of cases begin within 6 hours.",
            topic: "Depressive Disorders",
            source: "quiz-bank"
          },
          {
            stem: "A patient taking phenelzine reports a sudden severe occipital headache, palpitations, and neck stiffness two hours after dinner. Which meal is the most likely cause?",
            options: [
              "Grilled chicken breast with white rice",
              "Salami and aged cheddar on a roll",
              "Scrambled eggs with fresh spinach",
              "Baked cod with steamed carrots"
            ],
            answer: 1,
            rationale: "Hypertensive crisis follows tyramine ingestion on an MAOI, and cured meats and aged cheeses are the classic pairing; the crisis begins 15 to 90 minutes after the contraindicated food. Fresh poultry, eggs, fresh fish, and fresh vegetables are all low in tyramine and safe. Prevention is the tyramine-restricted diet, and blood pressure is monitored routinely, especially through the first 6 weeks.",
            topic: "Depressive Disorders",
            source: "quiz-bank"
          },
          {
            stem: "An older adult started on amitriptyline reports dry mouth, blurred vision, and constipation, and has not voided in 10 hours. Which explanation should the nurse give?",
            options: [
              "These are anticholinergic effects, and the urinary retention needs to be reported now",
              "These indicate the drug is reaching a toxic serum level and it must be held",
              "These are early signs of serotonin syndrome and require a benzodiazepine",
              "These are withdrawal effects and will resolve once the dose is increased"
            ],
            answer: 0,
            rationale: "Dry mouth, blurred vision, constipation, and urinary retention are the anticholinergic cluster tricyclics produce, and retention is the one that needs prompt reporting rather than watchful waiting. Serotonin syndrome presents with hyperthermia, myoclonus, and hyperreflexia, not this cluster. Nothing here indicates a toxic level, and these are side effects of taking the drug rather than of stopping it, so raising the dose would worsen them.",
            topic: "Depressive Disorders",
            source: "quiz-bank"
          },
          {
            stem: "A patient started on an antidepressant 10 days ago says, \"It isn't working, so I'm going to stop taking it.\" Which response by the nurse is most accurate?",
            options: [
              "\"You are right that 10 days is long enough to judge whether it works.\"",
              "\"Stopping now is safe because antidepressants are not addictive.\"",
              "\"It can take 4 to 6 weeks to feel better, and stopping abruptly causes withdrawal.\"",
              "\"Physical symptoms are the last thing to improve, so give it more time.\""
            ],
            answer: 2,
            rationale: "Symptom improvement may not appear for 4 to 6 weeks, and although antidepressants are not addictive, stopping abruptly produces nausea, anxiety, insomnia, and flu-like symptoms. Ten days is too early to judge the drug. The claim about safety confuses \"not addictive\" with \"safe to stop suddenly,\" which are different things. And the physical symptoms improve first, not last — that ordering is what creates the early window of raised suicide risk.",
            topic: "Depressive Disorders",
            source: "quiz-bank"
          },
          {
            stem: "A patient describes feeling that \"everything seems gray,\" says they have nothing to offer anyone, and mentions being ashamed of themselves. Which documentation best records these findings?",
            options: [
              "Patient says everything seems gray; appears to have a poor attitude",
              "Patient is uncooperative and resistant to encouragement",
              "Patient denies suicidal ideation and is oriented to person, place, and time",
              "Patient reports that \"everything seems gray\"; voices worthlessness and shame"
            ],
            answer: 3,
            rationale: "Hopelessness, worthlessness, and shame are core signs of depression and belong in the record in the patient's own words, which is what makes the entry usable by the next clinician. Pairing the quotation with \"a poor attitude\" buries it under an interpretation, and \"uncooperative and resistant\" is judgmental rather than descriptive. The orientation entry is accurate charting but records none of the findings actually presented.",
            topic: "Depressive Disorders",
            source: "quiz-bank"
          },
          {
            stem: "A newly admitted patient with major depression sits motionless and takes long pauses before answering. Applying the clinical judgment model, which cue should the nurse recognize as the priority to analyze first?",
            options: [
              "The patient has not attended the unit's morning group",
              "The patient has eaten only part of one meal today",
              "The patient has not been asked about thoughts of self-harm",
              "The patient's family has not yet been contacted"
            ],
            answer: 2,
            rationale: "Recognizing and analyzing cues puts safety ahead of everything else, and an unasked question about self-harm is the gap that matters on a newly admitted depressed patient. Poor intake and group non-attendance are both real cues worth acting on, but neither is the immediate safety risk, and family contact is a planning step rather than a cue to analyze.",
            topic: "Depressive Disorders",
            source: "quiz-bank"
          }
        ],
        medications: [
          /* fluoxetine */
          {
            stem: "A 15-year-old diagnosed with major depressive disorder is starting medication. Which antidepressant does the nurse expect to be prescribed first?",
            options: [
              "Amitriptyline",
              "Venlafaxine",
              "Fluoxetine",
              "Tranylcypromine"
            ],
            answer: 2,
            rationale: "Fluoxetine is the first-line antidepressant for children and teens. Venlafaxine is the closest distractor: it is also used in this age group, but off label rather than first-line. Amitriptyline is a TCA, and TCAs are avoided in children and adolescents because of dysrhythmias, lethality in overdose, and greater impulsivity. Tranylcypromine is an MAOI, the third choice, reserved for treatment-resistant depression.",
            topic: "Depressive Disorders",
            source: "quiz-bank"
          },
          /* paroxetine */
          {
            stem: "Three weeks after starting paroxetine, a patient quietly reports difficulty reaching orgasm and asks whether to stop the medication. Which response by the nurse is appropriate?",
            options: [
              "Keep taking it, and ask the provider about a dose change or another SSRI.",
              "Ask about switching to an MAOI, which does not have this side effect.",
              "This effect is rare with an SSRI, so another cause should be looked for.",
              "Hold it for a few days and see whether the problem clears up."
            ],
            answer: 0,
            rationale: "Sexual problems — reduced desire, difficulty reaching orgasm, or trouble maintaining an erection — occur in up to 80% of patients on SSRIs and are among the four most common side effects, so they are not a sign of another cause. Side effects are usually managed by adjusting the dose or switching to another drug in the same class. Holding the drug invites abrupt-discontinuation effects and relapse, and an MAOI is no fix: MAOIs list reduced sexual desire or orgasm among their own side effects and are reserved for treatment-resistant depression.",
            topic: "Depressive Disorders",
            source: "quiz-bank"
          },
          /* sertraline */
          {
            stem: "A patient taking sertraline every morning reports feeling drowsy through most of the day. What does the nurse suggest?",
            options: [
              "Increase fluids and fiber through the day.",
              "Take the dose at night instead.",
              "Keep the morning dose and take it with food.",
              "Avoid caffeine for the rest of the day."
            ],
            answer: 1,
            rationale: "Drowsiness on an SSRI is managed by moving the dose to night. Taking it with food is the remedy for nausea, avoiding caffeine is for nervousness or agitation, and more fluids and fiber address diarrhea. A morning dose is the answer to the opposite problem, insomnia.",
            topic: "Depressive Disorders",
            source: "quiz-bank"
          },
          /* citalopram */
          {
            stem: "A patient started on citalopram 3 weeks ago asks how they will know it is beginning to work. Which early changes does the nurse describe?",
            options: [
              "Better sleep, less daytime fatigue, and less crying",
              "Fewer thoughts of hopelessness before any physical change",
              "Fewer side effects, a sign that the dose is right",
              "A lifted mood, followed later by more energy"
            ],
            answer: 0,
            rationale: "Physiological symptoms improve before psychological ones: patients should look first for improved sleep, less daytime fatigue, less crying and irritability, and better frustration tolerance. A mood that lifts before energy returns reverses that order — and the real order matters, because energy returning while mood is still low is when suicide risk is highest. Side effects easing over 4–6 weeks is not a measure of therapeutic effect.",
            topic: "Depressive Disorders",
            source: "quiz-bank"
          },
          /* escitalopram */
          {
            stem: "A patient has taken escitalopram for 2 months, feels well, and asks when it can be stopped. Which response is accurate?",
            options: [
              "It can be tapered now, after 2 months of feeling well.",
              "It is continued 4 to 8 weeks past symptom relief, then stopped.",
              "It is usually continued 6 to 9 months past symptom relief, then tapered.",
              "It is usually continued for life, since depression returns without it."
            ],
            answer: 2,
            rationale: "Medication is needed for 6–9 months past symptom relief, so most patients take an antidepressant for 12–24 months before tapering; stopping when feeling better causes relapse. The 4–8 week figure is how long an SSRI takes to become effective, not how long it continues afterward. The teaching is a defined course followed by a taper, not lifelong use.",
            topic: "Depressive Disorders",
            source: "quiz-bank"
          },
          /* venlafaxine */
          {
            stem: "A nurse compares venlafaxine with sertraline for a patient's teaching plan. Which difference is accurate?",
            options: [
              "Venlafaxine is cardiotoxic and lethal in overdose, so an ECG comes first.",
              "Venlafaxine is a metabolite of sertraline, so it has fewer side effects.",
              "Venlafaxine also acts on norepinephrine and usually has a few more side effects.",
              "Venlafaxine blocks monoamine oxidase, so it requires a tyramine-restricted diet."
            ],
            answer: 2,
            rationale: "Venlafaxine is a SNaRI: it acts on both serotonin and norepinephrine and usually carries a few more side effects than an SSRI such as sertraline. Blocking monoamine oxidase and the tyramine restriction belong to the MAOIs; cardiotoxicity, lethality in overdose and a baseline ECG belong to the TCAs. A metabolite relationship does exist, but between a different pair — desvenlafaxine is a metabolite of venlafaxine.",
            topic: "Depressive Disorders",
            source: "quiz-bank"
          },
          /* duloxetine */
          {
            stem: "A patient is starting duloxetine. Which findings should the nurse monitor for? Select all that apply.",
            options: [
              "Orthostatic hypotension",
              "A low white blood cell count",
              "Manic symptoms",
              "Increased blood pressure",
              "Suicidal ideation"
            ],
            answers: [2, 3, 4],
            rationale: "SSRIs and SNRIs call for monitoring of suicidal ideation, extreme agitation, fever, increased blood pressure, and manic symptoms. A low white blood cell count is the carbamazepine risk that calls for a CBC, and orthostatic hypotension comes from the alpha-adrenergic blockade of the TCAs — the direction of the blood pressure change is the discrimination here.",
            topic: "Depressive Disorders",
            source: "quiz-bank"
          },
          /* desvenlafaxine */
          {
            stem: "A patient who did well on venlafaxine is switched to desvenlafaxine and asks how the two are related. Which answer is accurate?",
            options: [
              "Desvenlafaxine is a metabolite of venlafaxine.",
              "Desvenlafaxine is the transdermal form of venlafaxine.",
              "Desvenlafaxine is the tricyclic version of venlafaxine.",
              "Venlafaxine is a metabolite of desvenlafaxine."
            ],
            answer: 0,
            rationale: "Desvenlafaxine, an SNRI, is a metabolite of venlafaxine — not the other way around. The transdermal patch belongs to the MAOI selegiline (Emsam), and desvenlafaxine is not a tricyclic; the TCAs are imipramine, doxepin and amitriptyline.",
            topic: "Depressive Disorders",
            source: "quiz-bank"
          },
          /* imipramine */
          {
            stem: "A patient is prescribed imipramine. Which finding in the patient's history is a contraindication?",
            options: [
              "Thyroid disease",
              "Renal disease",
              "A current eating disorder",
              "Narrow-angle glaucoma"
            ],
            answer: 3,
            rationale: "TCA contraindications are a recent MI or other cardiovascular disease, narrow-angle glaucoma, any history of seizures, and pregnancy. An eating disorder is a contraindication for bupropion, and renal and thyroid disease are contraindications for lithium — each a real contraindication, attached to a different drug.",
            topic: "Depressive Disorders",
            source: "quiz-bank"
          },
          /* doxepin */
          {
            stem: "Doxepin has been ordered for a patient with depression. Which assessment should be completed before the first dose?",
            options: [
              "A complete blood count",
              "A serum drug level",
              "Thyroid function tests",
              "An ECG"
            ],
            answer: 3,
            rationale: "Before a TCA is started, an ECG checks for cardiac disorder and the history is checked for seizures — the cardiovascular effects (dysrhythmias, tachycardia, MI, heart block) are the serious ones. Serum levels are checked for valproate and carbamazepine, a CBC at the start and every 6 months belongs to carbamazepine, and thyroid function is monitored with lithium.",
            topic: "Depressive Disorders",
            source: "quiz-bank"
          },
          /* amitriptyline */
          {
            stem: "A patient asks why amitriptyline is prescribed at bedtime. Which explanation is accurate?",
            options: [
              "A bedtime dose makes the drug less lethal if too much is taken.",
              "Its sedation aids sleep, and side effects fall during sleeping hours.",
              "A bedtime dose prevents the insomnia this drug commonly causes.",
              "A bedtime dose lowers the risk of a hypertensive crisis overnight."
            ],
            answer: 1,
            rationale: "TCAs are often given at night because the sedation aids sleep and the side effects fall during sleeping hours. Hypertensive crisis is the MAOI danger. Insomnia on a TCA is handled the other way — sleep hygiene and a morning dose — and dose timing does nothing to the lethality of a TCA overdose.",
            topic: "Depressive Disorders",
            source: "quiz-bank"
          },
          /* phenelzine */
          {
            stem: "A patient is started on phenelzine. Which monitoring is the priority during the first 6 weeks?",
            options: [
              "Serum drug levels, checked weekly",
              "A CBC for low white cell counts",
              "Blood pressure, checked routinely",
              "Creatinine and thyroid hormones"
            ],
            answer: 2,
            rationale: "Blood pressure is monitored routinely on an MAOI, especially during the first 6 weeks, because a hypertensive crisis can follow a contraindicated food or drug within 15–90 minutes. Serum levels are checked for valproate and carbamazepine, creatinine and thyroid hormones every 6 months belong to lithium, and the CBC for low white cell counts belongs to carbamazepine.",
            topic: "Depressive Disorders",
            source: "quiz-bank"
          },
          /* tranylcypromine */
          {
            stem: "A patient taking tranylcypromine is admitted for surgery. Which medication order should the nurse question?",
            options: [
              "Phentolamine if a hypertensive crisis develops",
              "Oxygen to maintain normal levels",
              "Lorazepam for short-term agitation",
              "Demerol for postoperative pain"
            ],
            answer: 3,
            rationale: "Demerol is to be avoided with an MAOI, OTC cold medications need great care, and an SSRI is rarely combined with one because of serotonin syndrome. Phentolamine is not a problem but a treatment — it reverses the hypertensive crisis an MAOI can cause. Short-term lorazepam and supportive oxygen are not among the MAOI restrictions.",
            topic: "Depressive Disorders",
            source: "quiz-bank"
          },
          /* selegiline */
          {
            stem: "The provider chooses selegiline (Emsam) rather than phenelzine for a patient. Which feature best explains the choice?",
            options: [
              "Far fewer diet and drug restrictions",
              "Preferred when fatigue is the main symptom",
              "Considered a first-line antidepressant",
              "Acts on norepinephrine as well as serotonin"
            ],
            answer: 0,
            rationale: "Selegiline is an MAOI given as a transdermal patch, which carries far fewer dietary restrictions and drug interactions than an oral MAOI like phenelzine. It is still an MAOI, so it is not first-line. Being chosen when fatigue is prominent describes bupropion, and acting on both serotonin and norepinephrine describes the SNaRIs.",
            topic: "Depressive Disorders",
            source: "quiz-bank"
          },
          /* bupropion */
          {
            stem: "Bupropion is being considered for a patient with depression. Which finding would make it contraindicated?",
            options: [
              "Fatigue as the most prominent symptom",
              "Sexual side effects on a previous SSRI",
              "A plan to quit smoking",
              "A current eating disorder"
            ],
            answer: 3,
            rationale: "Bupropion is contraindicated in eating disorders and in any history of seizures. The other three are reasons to choose it: it is considered energizing, so it is used when fatigue is prominent; it has fewer sexual side effects; and it is used for smoking cessation as Zyban.",
            topic: "Depressive Disorders",
            source: "quiz-bank"
          },
          /* trazodone */
          {
            stem: "A patient with depression has an order for trazodone 100 mg PO at bedtime PRN. What is this order intended to treat?",
            options: [
              "Smoking cessation",
              "Insomnia",
              "Severe agitation",
              "The depressed mood"
            ],
            answer: 1,
            rationale: "At 50–200 mg at bedtime PRN, trazodone is a sleep agent; an antidepressant effect needs 300–500 mg, so 100 mg is not treating the mood. It is preferred for sleep because it is not addicting. Severe agitation is treated short-term with a benzodiazepine, and smoking cessation is a use of bupropion (Zyban).",
            topic: "Depressive Disorders",
            source: "quiz-bank"
          },
          /* mirtazapine */
          {
            stem: "Which antidepressant is given at bedtime and is known to be good for sleep?",
            options: [
              "Bupropion",
              "Mirtazapine",
              "Venlafaxine",
              "Tranylcypromine"
            ],
            answer: 1,
            rationale: "Mirtazapine, a NaSSA, is given at bedtime and is good for sleep. Bupropion is the opposite — considered energizing, and chosen when fatigue is prominent. Venlafaxine is a SNaRI for MDD and tranylcypromine an MAOI for treatment-resistant depression; neither is used for its effect on sleep.",
            topic: "Depressive Disorders",
            source: "quiz-bank"
          },
          /* SATA — which medications are indicated */
          {
            stem: "A patient taking an MAOI develops a hypertensive crisis. Which medications are indicated to treat it? Select all that apply.",
            options: [
              "Phentolamine",
              "Phenylephrine",
              "Sublingual nifedipine",
              "Haloperidol",
              "Cyproheptadine"
            ],
            answers: [0, 2],
            rationale: "Hypertensive crisis is treated with phentolamine, an alpha-adrenergic blocker and vasodilator, and sublingual nifedipine, a calcium channel blocker, alongside supportive care. Cyproheptadine is the serotonin-production blocker used for serotonin syndrome when other treatments fail. Phenylephrine is given for hypotension in serotonin syndrome, the opposite problem, and haloperidol is avoided in serotonin syndrome.",
            topic: "Depressive Disorders",
            source: "quiz-bank"
          },
          /* SATA — which medications are indicated */
          {
            stem: "Which medications are indicated as first-line treatment for major depressive disorder? Select all that apply.",
            options: [
              "Paroxetine",
              "Doxepin",
              "Sertraline",
              "Amitriptyline",
              "Phenelzine",
              "Fluoxetine"
            ],
            answers: [0, 2, 5],
            rationale: "SSRIs — including sertraline, paroxetine and fluoxetine — are first-line therapy for depression, and if one fails a second SSRI is tried before moving on. TCAs such as amitriptyline and doxepin are the second choice, and MAOIs such as phenelzine the third.",
            topic: "Depressive Disorders",
            source: "quiz-bank"
          },
          /* SATA — which medications are indicated */
          {
            stem: "Which medications are indicated for treatment-resistant depression? Select all that apply.",
            options: [
              "Bupropion",
              "Mirtazapine",
              "Phenelzine",
              "Tranylcypromine",
              "Escitalopram"
            ],
            answers: [2, 3],
            rationale: "MAOIs such as phenelzine and tranylcypromine are usually the third choice, reserved for treatment-resistant depression because of their food and drug restrictions. Escitalopram is an SSRI, the first-line class; mirtazapine is a bedtime antidepressant valued for sleep; and bupropion is chosen when fatigue is prominent.",
            topic: "Depressive Disorders",
            source: "quiz-bank"
          }
        ],
        eaq: [
          /* Imported 2026-09-13 from the Week 2 EAQ quizzes (ticket to class, then end of week),
             in their original order and wording. Repairs are itemised in SESSION-LOG.md. */
          {
            stem: "A patient says to the nurse, \"Life doesn't have any joy in it anymore. Things I once did for pleasure aren't fun.\" Which term would the nurse use to document this report?",
            options: [
              "Dysthymia",
              "Anhedonia",
              "Euphoria",
              "Psychomotor retardation"
            ],
            answer: 1,
            rationale: "Anhedonia is a common finding in many types of depression. It refers to feelings of a loss of pleasure in formerly pleasurable activities. Dysthymic disorder is characterized by chronic low-level depression while euphoria is an extreme sense of joy. Psychomotor retardation is related to physical movement not emotion. (p. 251)",
            topic: "Depressive Disorders",
            source: "eaq"
          },
          {
            stem: "Which teaching point would be most beneficial for the parents of a teenager who was admitted several weeks ago after a suicide attempt?",
            options: [
              "Depression is beyond voluntary control, but it can be managed.",
              "The patient needs to be able to express anger directly at the parents.",
              "The parents should also seek therapeutic help because depression is hereditary.",
              "The patient should stop taking prescribed medicines if the patient mentions suicide."
            ],
            answer: 0,
            rationale: "Family support is key to improving the prognosis for depressed teenagers. Crucial to this is the parents' understanding that depression is involuntary but can be managed. The patient does need to find ways to express feelings, but expressing anger is not always a solution. Depression can be hereditary, but this does not address the parent's concern. The patient should not stop taking prescribed medications without consulting the doctor. (p. 254)",
            topic: "Depressive Disorders",
            source: "eaq"
          },
          {
            stem: "A patient says to the nurse, \"I had my first episode of depression after I got divorced about 10 years ago. I recognized what was happening to me because both of my parents suffer from depression.\" Which theory regarding the etiology of depression has the patient described?",
            options: [
              "Cognitive theory",
              "Biochemical factors",
              "Inflammation",
              "Diathesis-stress model"
            ],
            answer: 3,
            rationale: "The diathesis-stress model of depression takes into account the interplay between genetic and biological predisposition toward depression and life events. The physiological vulnerabilities, such as genetic predispositions, biochemical makeup, and personality structure, are referred to as a diathesis. The stress part of this model refers to the life events that affect individual vulnerabilities. Cognitive theory recognizes the role of early life experiences in the development of depression. Biochemical factors include genetic and biological variables in the etiology of depression. Inflammation may be the result of psychological, as well as physical injury, but this does not explain the patient's depression. (p. 246)",
            topic: "Depressive Disorders",
            source: "eaq"
          },
          {
            stem: "A nurse is caring for a patient with severe depression. After 4 months of treatment, the nurse tells the patient, \"Depression is an illness that is beyond a person's voluntary control.\" In which phase of treatment is this an appropriate statement by the nurse?",
            options: [
              "Acute phase",
              "Orientation phase",
              "Continuation phase",
              "Maintenance phase"
            ],
            answer: 2,
            rationale: "There are three phases of treatment for depression: the acute phase, the continuation phase, and the maintenance phase. After 4 to 9 months of treatment, patients are in the continuation phase, during which they are educated about depression in hopes that they will better adhere to the treatment plan and avoid relapse. Explaining depression is beyond a person's control is an example of this teaching. The other stages of treatment have different goals, such as the acute phase (the initial 12 weeks) in which the patient is given interventions to simply reduce symptoms of depression. The orientation phase is not one of the three phases of the treatment. After 1 year of treatment, patients are typically in the maintenance phase, where they may already be well educated about depression and the treatment focuses on avoiding further complications from relapse of the illness. (p. 253)",
            topic: "Depressive Disorders",
            source: "eaq"
          },
          {
            stem: "During an assessment, the nurse says to the patient with breast cancer, \"You are wearing a pretty dress.\" Which patient activity is the reason for giving this statement?",
            options: [
              "Behaving irritably",
              "Looking very worried",
              "Not interacting with the nurse",
              "Frequently looking at her outfit"
            ],
            answer: 2,
            rationale: "Patients with depression tend to remain silent and are unwilling to interact with people. By telling the patient that she is wearing a pretty dress, the nurse is encouraging the patient to interact by drawing her attention to the surroundings. This helps the patient to emphasize and focus on reality. If the patient looks irritable, the nurse should ask, \"What are you irritated at?\" This would help the nurse understand the patient's feelings. If the patient looks worried, the nurse should ask the patient, \"What is bothering you?\" This can help the nurse to know the patient's perceptions and feelings. If the patient is frequently looking at her attire, then the nurse should draw the patient's attention to the present discussion by saying, \"It's time to discuss your illness.\" (p. 253)",
            topic: "Depressive Disorders",
            source: "eaq"
          },
          {
            stem: "A nurse is caring for a patient with anorexia. After several weeks, the patient is energetic and has an improved appetite. Which effective nursing intervention did the nurse likely use with the patient?",
            options: [
              "The nurse offered foods that the patient liked.",
              "The nurse instructed the patient to avoid exercising.",
              "The nurse offered three high-calorie meals during the day.",
              "The nurse provided high-fat foods to help the patient gain weight."
            ],
            answer: 0,
            rationale: "Anorexia is characterized by reduced appetite and low body weight. The nurse should follow proper nursing interventions to provide good nutrition to the patient, which may include offering foods that the patient prefers. A patient with anorexia may benefit from light (but not excessive) physical activity as it may stimulate the appetite. The patient may not be able to eat one complete meal at a time. Several high-calorie, high-protein snacks during the day is preferred. The nurse should give the patient high-calorie foods in small quantities to meet the nutritional demands of the body. (p. 256)",
            topic: "Depressive Disorders",
            source: "eaq"
          },
          {
            stem: "Which is the recommended starting dose of selective serotonin reuptake inhibitors in older adult patients with depression?",
            options: [
              "The lowest adult dose",
              "The normal adult dose",
              "Half the lowest adult dose",
              "Half the normal adult dose"
            ],
            answer: 2,
            rationale: "Older adult patients with depression are frequently prescribed selective serotonin reuptake inhibitors as a first-line treatment. They must be administered half the lowest adult dose to avoid adverse effects from drug accumulation. The lowest adult dose, normal adult dose, and half the normal adult should not be administered to older adult patients. These doses would cause severe toxic effects in older adult patients. (p. 261)",
            topic: "Depressive Disorders",
            source: "eaq"
          },
          {
            stem: "Which statement would show acceptance of a patient who is depressed, withdrawn, and silent?",
            options: [
              "\"I will be spending time with you each day to try to improve your mood.\"",
              "\"I would like to sit with you for 15 minutes now and again this afternoon.\"",
              "\"Each day we will spend time together to talk about things that are bothering you.\"",
              "\"It is important for you to share your thoughts with someone who can help you evaluate your thinking.\""
            ],
            answer: 1,
            rationale: "Spending time with the patient without making demands is a good way to show acceptance. Telling the patient that the nurse will try to improve the patient's mood is false reassurance and not likely to improve the patient's depression. A patient who is withdrawn and silent is not ready to talk about things that are bothering them or share their thoughts with others. (p. 253)",
            topic: "Depressive Disorders",
            source: "eaq"
          },
          {
            stem: "Which statement by a patient indicates understanding of the medication teaching provided concerning a prescribed selective serotonin reuptake inhibitor (SSRI)?",
            options: [
              "\"I will make sure to get plenty of sunshine and not use sunscreen to avoid a skin reaction.\"",
              "\"I will not take any over-the-counter medication while on this medication.\"",
              "\"I will immediately report any symptoms of high fever, fast heartbeat, or abdominal pain.\"",
              "\"I will report increased thirst and urination to my healthcare provider.\""
            ],
            answer: 2,
            rationale: "High fever, fast heartbeat, or abdominal pain describe symptoms of serotonin syndrome, a life-threatening complication of SSRI medication. The other options are incorrect because the patient should be wearing sunscreen to avoid sunburn, may take over-the-counter medications if sanctioned by the healthcare provider, and would not have been educated to report increased thirst and urination as a side effect of an SSRI. (pp. 257, 259)",
            topic: "Depressive Disorders",
            source: "eaq"
          },
          {
            stem: "A patient has been taking citalopram for 2 years for depression. The patient's outcomes have been achieved, and the patient wants to discontinue the medication. After consultation with the healthcare provider, which information should the nurse provide?",
            options: [
              "\"Citalopram is an antidepressant medication that usually is taken for life.\"",
              "\"Stopping this medication suddenly can cause serotonin syndrome.\"",
              "\"Because your depression is alleviated, you may discontinue the medication.\"",
              "\"It's important for you to gradually stop taking this drug over 2 to 4 weeks.\""
            ],
            answer: 3,
            rationale: "Selective serotonin reuptake inhibitors (SSRIs) should be tapered off gradually over a period of 2 to 4 weeks to avoid a withdrawal syndrome. Symptoms of the withdrawal syndrome include headache, gastrointestinal upset, dizziness, insomnia, anxiety, and flulike symptoms. Citalopram is not necessarily given for life. Serotonin syndrome is a potentially life-threatening consequence of drug interactions with SSRIs. The patient should not be advised to discontinue the medication unless the healthcare provider has advised it and the patient can be safely tapered down. (pp. 258-259)",
            topic: "Depressive Disorders",
            source: "eaq"
          },
          {
            stem: "A patient hospitalized for major depression has been taking sertraline for the past week and has verbalized increased energy and improved sleep. Which question is the highest priority the nurse would ask?",
            options: [
              "\"Do you think your depression is less severe?\"",
              "\"Are you having any thoughts of harming yourself?\"",
              "\"Have you experienced any side effects from this drug?\"",
              "\"How has your appetite changed since starting this drug?\""
            ],
            answer: 1,
            rationale: "The patient is starting to experience increased energy, but suicidal thoughts may still remain. The patient may now have the energy for self-harm. Asking the patient if they feel the depression is lifting is not as high a priority as asking about suicidal thoughts. It is important to assess for other side effects, such as appetite changes and depression, but suicide is the highest priority. (p. 252)",
            topic: "Depressive Disorders",
            source: "eaq"
          },
          {
            stem: "Beck's cognitive theory suggests that the etiology of depression is related to which process?",
            options: [
              "Sleep abnormalities",
              "Serotonin circuit dysfunction",
              "Negative processing of information",
              "A belief that one has caused the symptoms purposefully"
            ],
            answer: 2,
            rationale: "Beck is a cognitive theorist who developed the theory of the cognitive triad of three automatic thoughts responsible for people becoming depressed: (1) a negative, self-deprecating view of oneself; (2) a pessimistic view of the world; and (3) the belief that negative reinforcement will continue. Beck's theory does not suggest the etiology is related to sleep abnormalities, serotonin dysfunction, or a belief that a patient has caused the symptoms purposefully. (p. 247)",
            topic: "Depressive Disorders",
            source: "eaq"
          },
          {
            stem: "Which individual demonstrates the greatest risk for experiencing major depression?",
            options: [
              "A male teenager who failed to make the football team",
              "A female young adult who recently gave birth to her first child",
              "An older adult woman who retired after 25 years of factory work",
              "A middle-aged man who is a self-employed small business owner"
            ],
            answer: 1,
            rationale: "Among women, rates peak between adolescence and early adulthood. It is particularly important to screen for depression among women of reproductive age, especially those who have children or plan to become pregnant. Although the male teenager and the retired woman do have characteristics that put them at risk for depression (e.g., disappointment, being a teenager, retirement, being female), they are less at risk than the female young adult who recently gave birth. The middle-aged man's risk for major depression is relatively small. (p. 244)",
            topic: "Depressive Disorders",
            source: "eaq"
          },
          {
            stem: "A patient diagnosed with major depressive disorder has vegetative symptoms. With which aspect is the patient likely to have the most difficulty?",
            options: [
              "Grooming",
              "Anger at God",
              "Hallucinations",
              "Excessive eating"
            ],
            answer: 0,
            rationale: "Vegetative signs of depression include grooming and hygiene deficiencies; significantly reduced appetite; and changes in sleeping, eating, elimination, and sexual patterns. Spiritual distress, hallucinations from disturbed thought processes, and excessive eating are not associated with the vegetative signs of depression. (pp. 252, 256)",
            topic: "Depressive Disorders",
            source: "eaq"
          },
          {
            stem: "Which risk factor would likely result in a diagnosis of major depressive disorder?",
            options: [
              "Neuroticism",
              "Parents' divorce",
              "Optimal physical health",
              "A cousin with depression"
            ],
            answer: 0,
            rationale: "Neuroticism is a negative personality trait often seen in patients with major depressive disorder. A divorce of the parents may have an effect on a child, but it is less of a risk factor than neuroticism. Physical health would be a factor if the patient was in poor health. Family history generally only extends to first-degree family members. (p. 245)",
            topic: "Depressive Disorders",
            source: "eaq"
          },
          {
            stem: "Subsyndromal depression primarily occurs in which population?",
            options: [
              "Adults",
              "Older adults",
              "Children",
              "Teenagers"
            ],
            answer: 1,
            rationale: "Subsyndromal depression is most prevalent in older adults. It occurs when the patient experiences some, but not all, of the symptoms that are seen in a major depressive episode. Children, adolescents, and adults are less susceptible to subsyndromal depression. (pp. 243-244)",
            topic: "Depressive Disorders",
            source: "eaq"
          },
          {
            stem: "Which report regarding sleep would the nurse expect from a patient diagnosed with major depression?",
            options: [
              "\"I usually take a nap for about 30 minutes in the afternoon.\"",
              "\"It takes me about 15 minutes to fall asleep. I often have vivid dreams.\"",
              "\"I wake up about 4 am and cannot go back to sleep. I feel tired all the time.\"",
              "\"I often fall asleep in the middle of an activity. When I wake up, I feel better.\""
            ],
            answer: 2,
            rationale: "Change in sleep patterns is a cardinal sign of depression. Often, people experience insomnia, wake frequently, and have a total reduction in sleep, especially deep-stage sleep. One of the hallmark symptoms of depression is waking at 3 or 4 am and then staying awake or sleeping for only short periods. Napping and vivid dreams identify normal sleep variations. Falling asleep in the middle of an activity identifies narcolepsy. (p. 250)",
            topic: "Depressive Disorders",
            source: "eaq"
          },
          {
            stem: "Which statement regarding how depression affects patients in varying age ranges is true? Select all that apply.",
            options: [
              "Children and older adults share similar symptoms of depression.",
              "Depression among older adults is believed to be a normal occurrence related to aging.",
              "Depression increases the risk for suicide among those older adults experiencing the disorder.",
              "Incidence of depression among children between ages 12 and 17 warrants screening of that population.",
              "The younger one is when the initial episode of depression occurs, the higher the risk of recurring episodes."
            ],
            answers: [2, 3, 4],
            rationale: "Because symptoms vary by age and circumstance, depression in children, until recently, has been underrecognized. Children and adolescents between 12 and 17 years of age have about 13% prevalence of depression. If the first episode of depression occurs in childhood or adolescence, the likelihood of recurrence is high, setting the stage for recurrent depression. Children may experience sadness and loss of pleasure. A child may become withdrawn or refuse to go to school. Adolescents may become irritable, abuse substances, become sexually promiscuous, or have thoughts of death or suicide. Although depression in older adults is common, it is not a normal result of aging. A disproportionate number of older adults with depression are likely to die by suicide. (pp. 243-244, 251)",
            topic: "Depressive Disorders",
            source: "eaq"
          },
          {
            stem: "Dysthymia cannot be diagnosed unless it has existed for which length of time?",
            options: [
              "At least 1 year",
              "At least 2 years",
              "At least 6 months",
              "At least 3 months"
            ],
            answer: 1,
            rationale: "Dysthymia is a chronic condition that, by definition, must have existed for longer than 2 years. Three months, 6 months, and 1 year do not meet this requirement. (p. 241)",
            topic: "Depressive Disorders",
            source: "eaq"
          },
          {
            stem: "A patient says to the nurse, \"I once enjoyed going to parks and museums with my family, but that is not fun anymore.\" How would the nurse document this report?",
            options: [
              "Anergia",
              "Euthymia",
              "Anhedonia",
              "Self-deprecation"
            ],
            answer: 2,
            rationale: "Anhedonia means that there is no pleasure or joy in life. It is a common finding with depression. Anergia refers to a lack of energy or physical passivity. Euthymia refers to a mood state that is normal and moderate, with neither depression nor mania. Self-deprecation refers to negative statements about self. (p. 250)",
            topic: "Depressive Disorders",
            source: "eaq"
          },
          {
            stem: "Which is the major reason for hospitalization for patients who are experiencing depression?",
            options: [
              "Inability to go to work",
              "Suicidal ideation",
              "Loss of appetite",
              "Psychomotor agitation"
            ],
            answer: 1,
            rationale: "Suicidal thoughts are a major reason for hospitalization for patients with major depression. It is imperative to intervene with such patients to keep them safe from self-harm. Inability to go to work, loss of appetite, and psychomotor agitation describe symptoms of major depression but are not by themselves the major reason for hospitalization. (p. 247)",
            topic: "Depressive Disorders",
            source: "eaq"
          },
          {
            stem: "It is likely that a patient diagnosed with seasonal affective disorder will begin to experience fewer symptoms beginning in which season?",
            options: [
              "Fall",
              "Winter",
              "Spring",
              "Summer"
            ],
            answer: 2,
            rationale: "Seasonal affective disorder occurs during the months when sunlight diminishes. Patients may begin to feel effects in the late fall and will be affected throughout the winter. They improve during the spring. There is a small subset who experience summer depression, but most feel well during the summer. (p. 243)",
            topic: "Depressive Disorders",
            source: "eaq"
          },
          {
            stem: "Which neurotransmitter is considered a main regulator of mood? Select all that apply.",
            options: [
              "Acetylcholine",
              "Dopamine",
              "Glutamate",
              "Norepinephrine",
              "Serotonin"
            ],
            answers: [3, 4],
            rationale: "The two main neurotransmitters involved in mood are serotonin (5-hydroxytryptamine [5-HT]) and norepinephrine. Research suggests that depression results from the dysregulation of a number of neurotransmitter systems beyond serotonin and norepinephrine. Dopamine, acetylcholine, and glutamate also are believed to be involved in the pathophysiology of a major depressive episode. (p. 245)",
            topic: "Depressive Disorders",
            source: "eaq"
          },
          {
            stem: "Which statement regarding depression is true? Select all that apply.",
            options: [
              "Depression can be seen in association with other mental and physical disorders.",
              "While depression coexists with other disorders, it does not affect these disorders.",
              "The symptomology of depression is relatively similar regardless of age.",
              "Social relationships can suffer when an individual is depressed.",
              "Depression can range from mild to severe in its effect on individuals."
            ],
            answers: [0, 3, 4],
            rationale: "Depression can exist alone or in conjunction with other disorders and illnesses. Depression results in significant pain and suffering that disrupts social relationships. Depression can present differently in different populations and different age groups and can be manifested on a continuum from mild to severe. Depression also has a negative effect on physical well-being and the course of other medical diagnoses. (pp. 241, 242-243)",
            topic: "Depressive Disorders",
            source: "eaq"
          },
          {
            stem: "Which statement is associated directly with Beck's cognitive triad? Select all that apply.",
            options: [
              "\"I'm not worth much; I can't do anything right.\"",
              "\"Things will only get worse; they never get better.\"",
              "\"I'll never find anyone who loves or values me.\"",
              "\"I don't think other people are worthless.\"",
              "\"Good luck happens to good people.\""
            ],
            answers: [0, 1, 2],
            rationale: "Three assumptions constitute Beck's cognitive triad: (1) a negative, self-deprecating view of self; (2) a pessimistic view of the world; and (3) the belief that negative reinforcement (or no validation for the self) will continue in the future. Statements such as \"I don't think other people are worthless\" and \"Good luck happens to good people\" lack the negative assumptions associated with the cognitive triad. (p. 247)",
            topic: "Depressive Disorders",
            source: "eaq"
          }
        ]
      }
    },

    /* ==========================================================
       TOPIC 8 — BIPOLAR & RELATED DISORDERS  (Week 2)
       7 mustKnow, one per Learning Outcomes bullet on
       must-know.html#bipolar. 5 extraPractice.
       ========================================================== */
    {
      id: "week2-bipolar",
      label: "Bipolar & Related Disorders",
      week: 2,
      sets: {
        mustKnow: [
          {
            stem: "A patient has had two major depressive episodes and one period of four days of elevated mood and increased energy that coworkers noticed but that never required hospitalization or produced psychosis. Which diagnosis fits?",
            options: [
              "Bipolar I disorder",
              "Bipolar II disorder",
              "Major depressive disorder with anxious distress",
              "Substance-induced mood disorder"
            ],
            answer: 1,
            rationale: "Bipolar II requires at least one hypomanic episode plus at least one major depressive episode and never a manic one, which is exactly this history. Bipolar I requires at least one full manic episode and is the more severe form, carrying the highest mortality. The depressive episodes plus a hypomanic one rule out plain major depressive disorder, and nothing here points to a substance.",
            topic: "Bipolar & Related Disorders",
            source: "quiz-bank"
          },
          {
            stem: "Which findings distinguish a manic episode from a hypomanic episode? Select all that apply.",
            options: [
              "Duration of at least 1 week",
              "Elevated, expansive, or irritable mood",
              "Marked impairment in functioning or need for hospitalization",
              "Increased activity or energy",
              "Psychotic features may be present"
            ],
            answers: [0, 2, 4],
            rationale: "The three that separate the two are duration, severity, and psychosis: mania runs at least 1 week to hypomania's minimum of 4 consecutive days, mania causes marked impairment or requires hospitalization while hypomania does neither, and psychotic features can occur in mania — a hypomanic episode with psychosis is by definition manic. Elevated or irritable mood and increased activity appear in both, which is why neither one discriminates.",
            topic: "Bipolar & Related Disorders",
            source: "quiz-bank"
          },
          {
            stem: "A prescriber wants to add an anticonvulsant mood stabilizer for a patient with bipolar disorder. Which medication fits that description?",
            options: [
              "Aripiprazole",
              "Clonazepam",
              "Carbamazepine",
              "Lithium carbonate"
            ],
            answer: 2,
            rationale: "Carbamazepine is an anticonvulsant used as a mood stabilizer, alongside valproate, divalproex, lamotrigine, and gabapentin. Aripiprazole is a second-generation antipsychotic and clonazepam a benzodiazepine used short-term for severe agitation. Lithium is the classic mood stabilizer but is an antimanic agent, not an anticonvulsant — the distinction the question turns on.",
            topic: "Bipolar & Related Disorders",
            source: "quiz-bank"
          },
          {
            stem: "A patient on lithium has a level of 2.2 mEq/L with ataxia, blurred vision, and clonic movements. What does the nurse anticipate?",
            options: [
              "Symptoms will subside as treatment continues; keep the dose low",
              "Withhold the next dose, redraw a level, and re-evaluate the dosage",
              "Hospitalization, with the drug stopped and excretion hastened",
              "Hemodialysis, as this level is uniformly fatal without it"
            ],
            answer: 2,
            rationale: "At 2.0 to 2.5 mEq/L the toxicity is advanced — ataxia, serious EEG changes, blurred vision, clonic movements, seizures, stupor — and hospitalization is indicated with the drug stopped and excretion hastened. Expectant management belongs under 1.5 mEq/L, and withholding with a redraw belongs to early toxicity at 1.5 to 2.0. Hemodialysis is reserved for severe cases over 2.5 mEq/L, so it overstates what this level calls for.",
            topic: "Bipolar & Related Disorders",
            source: "quiz-bank"
          },
          {
            stem: "A patient started on lamotrigine three weeks ago calls to report a rash spreading across the chest. What should the nurse instruct?",
            options: [
              "Stop the medication now and contact the provider",
              "Take an antihistamine and continue the medication",
              "Reduce to half the dose and monitor for two more days",
              "Continue the drug, as rash after two weeks is not the dangerous one"
            ],
            answer: 0,
            rationale: "Any rash on lamotrigine means stopping the drug immediately and calling the provider, because it can advance to Stevens-Johnson syndrome and then to toxic epidermal necrolysis, which can be fatal. Stopping almost always resolves it. Treating through it with an antihistamine, halving the dose, or waiting all leave the patient on the drug. The timing offers no reassurance either — the rash usually appears in the first few months but can occur at any time, including after years and with dose changes.",
            topic: "Bipolar & Related Disorders",
            source: "quiz-bank"
          },
          {
            stem: "A patient maintained on lithium for two years is admitted in an acute manic episode. What change to the regimen should the nurse anticipate?",
            options: [
              "The lithium will be stopped and an antidepressant started in its place instead",
              "The lithium dose will be halved until the mania resolves",
              "The lithium will be replaced by a long-acting benzodiazepine indefinitely",
              "An antipsychotic will be added, then stopped once the mania is controlled"
            ],
            answer: 3,
            rationale: "Treating an acute manic episode is not the same as maintenance treatment: something heavier is added on top — typically an antipsychotic such as risperidone or olanzapine — and it comes back off once the mania is controlled while the lithium continues. Stopping the mood stabilizer or cutting its dose removes the maintenance protection at the worst moment. An antidepressant alone can drive a patient further into mania, and benzodiazepines are for short-term agitation, not long-term replacement.",
            topic: "Bipolar & Related Disorders",
            source: "quiz-bank"
          },
          {
            stem: "A patient in acute mania has been pacing for hours and refuses to sit for meals. Which intervention best fits the plan of care?",
            options: [
              "Offer high-protein finger foods and keep fluids within reach",
              "Schedule a competitive volleyball game to expend energy",
              "Serve meals in the dining room and require the patient to remain seated",
              "Provide a jigsaw puzzle to occupy attention between meals"
            ],
            answer: 0,
            rationale: "A patient in mania will not slow down to sit and eat, so nutrition is delivered in a form that travels — high-protein finger foods offered frequently, with fluids always on hand. Volleyball is too strenuous and overstimulating for a patient already exhausted, requiring them to stay seated sets up a confrontation they cannot meet, and a puzzle demands a level of sustained concentration mania takes away.",
            topic: "Bipolar & Related Disorders",
            source: "quiz-bank"
          }
        ],
        medications: [
          /* lithium carbonate */
          {
            stem: "A patient on lithium has a new coarse hand tremor, slurred speech, and GI upset. What does the nurse do first?",
            options: [
              "Restrict sodium and fluids until the tremor eases.",
              "Give the next lithium dose with food and recheck tomorrow.",
              "Explain that these early effects usually subside.",
              "Hold the next dose and request a lithium level."
            ],
            answer: 3,
            rationale: "Coarse hand tremor, slurred speech, ataxia, confusion or GI upset on lithium means holding the next dose and requesting a level — these signal early toxicity (1.5–2.0 mEq/L) and must not be treated as an expected reaction that will subside. It is a fine hand tremor that is the expected side effect below 1.5 mEq/L. Restricting sodium or fluids increases the potential for toxicity; intake should stay normal and steady.",
            topic: "Bipolar & Related Disorders",
            source: "quiz-bank"
          },
          /* valproate / divalproex */
          {
            stem: "Which feature distinguishes divalproex from the other anticonvulsant mood stabilizers?",
            options: [
              "Broader efficacy and longer periods of mood stabilization",
              "Reserved for when there has been no response to lithium",
              "Requires a CBC because of low white blood cell counts",
              "Preferred for rapid cycling and the depressed phase"
            ],
            answer: 0,
            rationale: "Divalproex (valproate) has a broader spectrum of efficacy against bipolar symptoms and longer periods of mood stabilization than the alternatives, and its serum levels are checked. Rapid cycling and the depressed phase describe lamotrigine. Use after no response to lithium, and the CBC for low white cell counts, both describe carbamazepine.",
            topic: "Bipolar & Related Disorders",
            source: "quiz-bank"
          },
          /* carbamazepine */
          {
            stem: "A patient with bipolar disorder is starting carbamazepine. Which monitoring does the nurse plan?",
            options: [
              "Creatinine and thyroid hormones every 6 months",
              "A CBC, serum levels, and liver and kidney function",
              "Blood pressure routinely during the first 6 weeks",
              "An ECG before starting, plus a seizure history"
            ],
            answer: 1,
            rationale: "Carbamazepine carries a risk of low white blood cell counts, so a CBC is checked at the start and every 6 months, along with serum levels and hepatic and renal function. Routine blood pressure in the first 6 weeks belongs to the MAOIs, a baseline ECG and seizure history to the TCAs, and creatinine and thyroid hormones every 6 months to lithium.",
            topic: "Bipolar & Related Disorders",
            source: "quiz-bank"
          },
          /* lamotrigine */
          {
            stem: "A patient has taken lamotrigine for 4 years and had a dose increase last week. The patient asks whether the rash warning still matters. Which response is accurate?",
            options: [
              "Yes — the rash can appear at any time, including after a dose change.",
              "No — the risk of the rash ends after the first few months.",
              "Only if the lamotrigine is taken together with lithium.",
              "Only if the rash starts on the arms or legs rather than the trunk."
            ],
            answer: 0,
            rationale: "The lamotrigine rash usually occurs in the first few months, but it can happen at any time, including after years on the drug and with dose changes — and any rash means stopping the drug immediately and calling the provider. It usually appears first on the chest or trunk, so the location in the distractor is reversed, and the warning is not limited to use with lithium.",
            topic: "Bipolar & Related Disorders",
            source: "quiz-bank"
          },
          /* gabapentin */
          {
            stem: "A patient taking gabapentin for mood stabilization asks whether the serious rash warning for lamotrigine applies to them. Which response is accurate?",
            options: [
              "No — that rash is unique to lamotrigine.",
              "No — only drugs that need serum levels carry it.",
              "Yes — gabapentin can cause the same kind of rash.",
              "Only if gabapentin is combined with an SSRI."
            ],
            answer: 2,
            rationale: "Carbamazepine, phenobarbital, phenytoin (Dilantin), Bactrim, gabapentin and methotrexate can all cause the same rash as lamotrigine, which can advance to Stevens-Johnson syndrome and toxic epidermal necrolysis. The warning is not unique to lamotrigine, and it is not limited to drugs that need serum levels or to SSRI combinations.",
            topic: "Bipolar & Related Disorders",
            source: "quiz-bank"
          },
          /* olanzapine */
          {
            stem: "Olanzapine is added to divalproex for a patient in acute, severe mania. How does the nurse classify olanzapine's role?",
            options: [
              "An antipsychotic given with the mood stabilizer",
              "A mood stabilizer used alone for less severe mania",
              "A benzodiazepine for short-term severe agitation",
              "An anticonvulsant used for rapid cycling"
            ],
            answer: 0,
            rationale: "Olanzapine is a second-generation antipsychotic; in acute, severe mania it is combined with a mood stabilizer — lithium or divalproex, as in divalproex with olanzapine. Lithium or divalproex alone may be enough for less severe mania. Short-term use for severe agitation describes the benzodiazepines, and rapid cycling describes lamotrigine and gabapentin.",
            topic: "Bipolar & Related Disorders",
            source: "quiz-bank"
          },
          /* risperidone */
          {
            stem: "A patient on lithium has mania that borders on hypomania. The team discusses adding risperidone. What does the nurse anticipate?",
            options: [
              "Lithium will be stopped and risperidone used alone.",
              "Risperidone will be added and continued as maintenance.",
              "Lithium alone may be enough at this severity.",
              "Risperidone will replace lithium once the mania is controlled."
            ],
            answer: 2,
            rationale: "Lithium plus an antipsychotic such as risperidone is the combination for acute, severe mania; for less severe mania bordering on hypomania, lithium or divalproex alone may be enough. When the combination is used, it is the lithium that continues and the antipsychotic that is stopped once the mania is controlled — the reverse of each distractor.",
            topic: "Bipolar & Related Disorders",
            source: "quiz-bank"
          },
          /* aripiprazole */
          {
            stem: "Aripiprazole is ordered for a young patient in acute, severe mania. Which detail must the nurse confirm first?",
            options: [
              "A baseline serum drug level",
              "An age older than 10",
              "A tyramine-free diet in place",
              "No history of seizures"
            ],
            answer: 1,
            rationale: "Aripiprazole is a second-generation antipsychotic for acute, severe mania, for use over age 10. Serum levels are checked for valproate and carbamazepine, the tyramine restriction belongs to the MAOIs, and a seizure history is checked before a TCA and contraindicates bupropion.",
            topic: "Bipolar & Related Disorders",
            source: "quiz-bank"
          },
          /* quetiapine */
          {
            stem: "A patient in acute, severe mania is prescribed quetiapine. Which medication belongs to the same class?",
            options: [
              "Lithium carbonate",
              "Risperidone",
              "Carbamazepine",
              "Lorazepam"
            ],
            answer: 1,
            rationale: "Quetiapine is a second-generation antipsychotic, like risperidone, olanzapine and aripiprazole. Carbamazepine is an anticonvulsant mood stabilizer, lorazepam a benzodiazepine, and lithium carbonate a mood stabilizer — all used in mania, which is what makes them tempting.",
            topic: "Bipolar & Related Disorders",
            source: "quiz-bank"
          },
          /* Symbyax */
          {
            stem: "Symbyax is prescribed for a patient with bipolar II disorder whose illness is predominantly depressed. Which drugs does it combine?",
            options: [
              "Olanzapine and lithium",
              "Risperidone and fluoxetine",
              "Quetiapine and sertraline",
              "Olanzapine and fluoxetine"
            ],
            answer: 3,
            rationale: "Symbyax combines the second-generation antipsychotic olanzapine with the SSRI fluoxetine, and is used when bipolar illness is predominantly depressed, as in bipolar II where full mania does not occur. Each distractor swaps one half for a drug from a related class, so the discrimination is knowing both components.",
            topic: "Bipolar & Related Disorders",
            source: "quiz-bank"
          },
          /* diazepam */
          {
            stem: "A patient in acute mania is severely agitated and receives diazepam. Which statement about its use is accurate?",
            options: [
              "It continues as maintenance once the mania resolves.",
              "It is preferred because it is not addictive.",
              "It is used only when needed and only short-term.",
              "It stabilizes mood in the same way lithium does."
            ],
            answer: 2,
            rationale: "Benzodiazepines such as diazepam calm agitation and reduce aggression, panic and insomnia, but they are sedative-hypnotics and addictive, so they are used only when necessary and only short-term. Continuing as maintenance describes lithium, and mood stabilization is what lithium and the anticonvulsants provide, not a benzodiazepine.",
            topic: "Bipolar & Related Disorders",
            source: "quiz-bank"
          },
          /* lorazepam */
          {
            stem: "Lorazepam is ordered for a patient with mania who is pacing, shouting and unable to settle. Which effects does the nurse expect? Select all that apply.",
            options: [
              "Long-term mood stabilization",
              "Improved sleep",
              "Prevention of future manic episodes",
              "Less panic",
              "Less aggression",
              "Reduced agitation"
            ],
            answers: [1, 3, 4, 5],
            rationale: "Benzodiazepines such as lorazepam calm agitation and reduce aggression, panic and insomnia. They are not mood stabilizers and do not prevent future episodes — they are addictive, so they are used only when necessary and only short-term, while lithium or an anticonvulsant provides the stabilization.",
            topic: "Bipolar & Related Disorders",
            source: "quiz-bank"
          },
          /* SATA — which medications are indicated */
          {
            stem: "Which medications are indicated for acute, severe mania? Select all that apply.",
            options: [
              "Lamotrigine",
              "Risperidone",
              "Symbyax",
              "Trazodone",
              "Olanzapine",
              "Quetiapine"
            ],
            answers: [1, 4, 5],
            rationale: "Second-generation antipsychotics — olanzapine, risperidone, quetiapine, and aripiprazole over age 10 — are used for acute, severe mania, usually with a mood stabilizer. Lamotrigine is for rapid cycling and the depressed phase, Symbyax is for predominantly depressed bipolar illness, and trazodone is mainly a bedtime sleep agent.",
            topic: "Bipolar & Related Disorders",
            source: "quiz-bank"
          },
          /* SATA — which medications are indicated */
          {
            stem: "A patient with bipolar disorder is in the depressed phase. Which medications are indicated for the depressive symptoms? Select all that apply.",
            options: [
              "Diazepam",
              "Sertraline",
              "Fluoxetine",
              "Lamotrigine",
              "Symbyax"
            ],
            answers: [3, 4],
            rationale: "Lamotrigine is used for rapid cycling and the depressed phase of bipolar illness, and Symbyax — olanzapine plus fluoxetine — for predominantly depressed bipolar illness. An antidepressant such as fluoxetine or sertraline given on its own can throw the patient into mania, and diazepam is for short-term severe agitation.",
            topic: "Bipolar & Related Disorders",
            source: "quiz-bank"
          },
          /* SATA — which medications are indicated */
          {
            stem: "Which medications are indicated for rapid cycling in bipolar disorder? Select all that apply.",
            options: [
              "Gabapentin",
              "Lamotrigine",
              "Lorazepam",
              "Quetiapine",
              "Carbamazepine",
              "Aripiprazole"
            ],
            answers: [0, 1],
            rationale: "Lamotrigine is used for rapid cycling and the depressed phase, and gabapentin for acute mania, mood stabilization and rapid cycling. Carbamazepine is used when lithium fails or for breakthrough mania, aripiprazole and quetiapine for acute severe mania, and lorazepam for short-term severe agitation.",
            topic: "Bipolar & Related Disorders",
            source: "quiz-bank"
          }
        ],
        eaq: [
          /* Imported 2026-09-13 from the Week 2 EAQ quizzes (ticket to class, then end of week),
             in their original order and wording. Repairs are itemised in SESSION-LOG.md. */
          {
            stem: "Which comorbid disorder is most prevalent in patients with bipolar II disorder?",
            options: [
              "Anxiety",
              "Phobias",
              "Sleep disorders",
              "Attention-deficit/hyperactivity disorder (ADHD)"
            ],
            answer: 0,
            rationale: "About 75% of patients with bipolar II disorder have comorbid anxiety disorders. Phobias are more common in patients with bipolar I disorder. Sleep disorders are common in cyclothymic disorder. ADHD is common in children with cyclothymic disorder. (p. 222)",
            topic: "Bipolar & Related Disorders",
            source: "eaq"
          },
          {
            stem: "Which condition is a sign of advanced lithium toxicity?",
            options: [
              "Sedation",
              "Confusion",
              "Mild thirst",
              "Blurred vision"
            ],
            answer: 3,
            rationale: "Blurred vision is a sign of advanced lithium toxicity that is seen when the blood plasma level of lithium is 2 to 2.5 mEq/L. Sedation and confusion are early signs of lithium toxicity that are seen when the blood plasma level of lithium is 1.5 to 2 mEq/L. Mild thirst is not associated with signs of advanced toxicity. (p. 233)",
            topic: "Bipolar & Related Disorders",
            source: "eaq"
          },
          {
            stem: "Which is the usual age of onset for cyclothymic disorders?",
            options: [
              "Childhood",
              "Adolescence",
              "Middle adulthood",
              "Late adulthood"
            ],
            answer: 1,
            rationale: "Cyclothymic disorders usually begin in adolescence or early adulthood. They typically begin later than childhood but earlier than middle or late adulthood. (p. 222)",
            topic: "Bipolar & Related Disorders",
            source: "eaq"
          },
          {
            stem: "Which statement regarding bipolar I disorder is true? Select all that apply.",
            options: [
              "The mean age for onset is 18 years.",
              "Approximately 6% of the adult population has bipolar I disorder.",
              "The disorder is more common among women than men.",
              "Severe postpartum psychosis increases the risk for developing the disorder.",
              "Men with a bipolar disorder are more likely than women to commit acts of violence."
            ],
            answers: [0, 3, 4],
            rationale: "The mean age of onset for bipolar I disorder is 18 years. Women who experience a severe postpartum psychosis within 2 weeks of giving birth have a four times greater chance of subsequent conversion to bipolar disorder. Men with a bipolar disorder are more likely than women to commit acts of violence. The percentage of the population at risk for bipolar I or bipolar II disorder is nearly 4%. Men and women have nearly equal rates of bipolar disorders. (p. 221)",
            topic: "Bipolar & Related Disorders",
            source: "eaq"
          },
          {
            stem: "Which intervention would be included in the plan of care for a patient who takes lithium?",
            options: [
              "Dietary teaching to restrict daily sodium intake",
              "Periodic laboratory monitoring of renal and thyroid function",
              "Required laboratory tests to monitor serum potassium level",
              "Importance of discontinuing the medication if weight gain occurs"
            ],
            answer: 1,
            rationale: "Two major long-term risks of lithium therapy are hypothyroidism and impairment of the kidney's ability to concentrate urine; therefore a person receiving lithium therapy must have periodic follow-ups to assess thyroid and renal function. Sodium intake for patients who take lithium is not restricted. Potassium levels are not affected by this medication. Weight gain is a common side effect associated with this medication, but the patient should continue taking the medication. (p. 234)",
            topic: "Bipolar & Related Disorders",
            source: "eaq"
          },
          {
            stem: "Which term applies to the patient's behavior when displaying a period of intense mood disturbance with persistent elevation, expansiveness, irritability, and extremely goal-directed activity?",
            options: [
              "Mania",
              "Hypomania",
              "Flight of ideas",
              "Loose associations"
            ],
            answer: 0,
            rationale: "Mania is a period of intense mood disturbance with persistent elevation, expansiveness, irritability, and extremely goal-directed activity or energy. Mania commonly occurs with bipolar I disorder. Hypomania refers to a low-level and less-dramatic mania. Flight of ideas is a continuous flow of accelerated speech with abrupt changes from topic to topic. Loose associations represent the disordered way that a person is processing information and thoughts that are only loosely connected to each other in the person's conversation. (p. 220)",
            topic: "Bipolar & Related Disorders",
            source: "eaq"
          },
          {
            stem: "Which outcome noted in the plan of care is the most important for a patient in the manic phase of bipolar I disorder?",
            options: [
              "Decreasing food intake",
              "Increasing physical activity",
              "Sleeping for 8 to 10 hours a night",
              "Maintaining a stable cardiac status"
            ],
            answer: 3,
            rationale: "During the manic phase of bipolar I disorder, the most important outcome for the patient is to maintain a stable cardiac status because cardiac problems can be life threatening. Other important outcomes include increasing food and fluid intake, ensuring at least 4 to 6 hours of sleep a night, and decreasing physical activity. (p. 227)",
            topic: "Bipolar & Related Disorders",
            source: "eaq"
          },
          {
            stem: "Which is the priority of care for a patient experiencing hyperactive mania?",
            options: [
              "Preventing injury",
              "Improving self-esteem",
              "Encouraging mobility",
              "Improving verbal communication"
            ],
            answer: 0,
            rationale: "Risk for injury is high, which is related to the patient's hyperactivity and poor judgment. Patients with mania have overinflated self-esteem. Hyperactivity is a common symptom in mania; patients do not need encouragement to be more mobile. Another feature of mania is loud, rapid and clanging verbal communication. (pp. 228-229)",
            topic: "Bipolar & Related Disorders",
            source: "eaq"
          },
          {
            stem: "Which action must occur before the nurse can administer lithium in a patient who is experiencing mania?",
            options: [
              "The physical examination and laboratory tests are analyzed.",
              "The initial doses of antipsychotic medication have brought behavior under control.",
              "Seclusion has proven ineffective as a means of controlling assaultive behavior.",
              "Electroconvulsive therapy can be scheduled to coincide with lithium administration."
            ],
            answer: 0,
            rationale: "Lithium should not be given to patients with impaired renal or thyroid function. A thorough physical examination and various laboratory tests are necessary to rule out other organic causes for the behavior and to ensure that the lithium can be excreted normally. Frequently, antipsychotic medications are prescribed until the effects of lithium are present, usually after 10 days. Seclusion is not indicated. Lithium does not have to be scheduled with electroconvulsive therapy. (p. 232)",
            topic: "Bipolar & Related Disorders",
            source: "eaq"
          },
          {
            stem: "Which outcome for a patient with mania during the acute phase indicates that the treatment plan was successful?",
            options: [
              "Is free of injury",
              "Is highly distractible",
              "Ignores food and fluid",
              "Reports racing thoughts"
            ],
            answer: 0,
            rationale: "Risk for injury is a diagnosis of high priority for patients with mania because of their hyperactivity. Lack of injury is a highly desirable outcome. A patient with mania will be distractible and report racing thoughts as part of the disease process. This is not as high a priority as injury prevention. Ignoring the need for food and fluid is common during the acute phase and could eventually lead to hypovolemia and starvation; however, the higher priority is preventing injury. (p. 227)",
            topic: "Bipolar & Related Disorders",
            source: "eaq"
          },
          {
            stem: "Patients with which condition can be safely prescribed lithium therapy to treat bipolar disorder?",
            options: [
              "Renal disease",
              "Thyroid disorder",
              "Myasthenia gravis",
              "Erectile dysfunction"
            ],
            answer: 3,
            rationale: "Patients with erectile dysfunction can be prescribed lithium therapy because lithium does not interfere with sexual function. Lithium causes impairment in kidney functioning. It should not be prescribed to patients with renal diseases. Lithium causes hypothyroidism by reducing the levels of thyroxine hormone. It should not be prescribed to patients with thyroid disorder. Lithium therapy must be avoided in patients with myasthenia gravis because it causes ataxia and severe muscle weakness. (p. 232)",
            topic: "Bipolar & Related Disorders",
            source: "eaq"
          },
          {
            stem: "When a nurse caring for a patient with mania observes that the patient has persistent gastrointestinal upset, believes that the patient is showing advanced signs of lithium toxicity, and tests the serum levels of lithium in the patient, which concentration of lithium does the nurse expect to find in the patient's blood serum?",
            options: [
              "0.5 mEq/L",
              "2.1 mEq/L",
              "2.5 mEq/L",
              "3.4 mEq/L"
            ],
            answer: 1,
            rationale: "Serum levels of 2.0-2.5 mEq/L can cause advanced signs of toxicity such as gastrointestinal upset, mental confusion, incoordination, and sedation. A serum level of 0.5 mEq/L indicates the therapeutic level of lithium. Serum levels of 2.5 and 3.4 mEq/L indicate severe toxicity. The symptoms of severe toxicity include oliguria, convulsions, severe hypotension, and death. (p. 233)",
            topic: "Bipolar & Related Disorders",
            source: "eaq"
          },
          {
            stem: "Which statement is true of the relationship between bipolar disorder and suicide in adolescence?",
            options: [
              "Patients need to be monitored only in the depressed phase because this is when suicides occur.",
              "Suicide is a serious risk because nearly 20% of those diagnosed with bipolar disorder commit suicide.",
              "Patients with bipolar disorder are not considered high risk for suicide.",
              "As long as patients with bipolar disorder adhere to their medication regimen, there is little risk for suicide."
            ],
            answer: 1,
            rationale: "Overall, the suicide statistics for bipolar disorder are severe. Suicide accounts for 5% of deaths among women and 10% among men with bipolar disorder. With adolescents, suicide attempts associated with bipolar disorder are about 18% according to one study. Suicides occur in both the depressed and the manic phase. Patients with bipolar disorder are always considered high risk for suicide because of impulsivity while in the manic phase and hopelessness when in the depressed phase. Although staying on medications may decrease risk, there is no evidence to suggest that only patients who stop medications commit suicide. (pp. 219, 220, 222)",
            topic: "Bipolar & Related Disorders",
            source: "eaq"
          },
          {
            stem: "Which instruction will the nurse include when teaching a patient and their family about lithium therapy? Select all that apply.",
            options: [
              "\"Restrict the sodium in your diet.\"",
              "\"Take lithium on an empty stomach.\"",
              "\"Take lithium with meals to avoid an upset stomach.\"",
              "\"Lithium is a mood stabilizer that helps prevent relapse.\"",
              "\"Maintain a consistent fluid intake of 1500 to 3000 mL per day.\"",
              "\"You should stop taking lithium if you have excessive diarrhea, vomiting, or sweating.\""
            ],
            answers: [2, 3, 4, 5],
            rationale: "The patient and family should be instructed to take lithium with a meal to avoid stomach irritation. The patient should be taught the purpose of lithium as a mood stabilizer and its significance in preventing relapse. Patients receiving lithium therapy should be taught the importance of maintaining a consistent fluid intake of 1500 to 3000 mL per day to avoid toxicity. The patient should be taught to stop taking lithium and notify prescriber if diarrhea, vomiting, or excessive sweating occur as these symptoms can lead to dehydration and lithium toxicity. Sodium in the diet should be consistent, not restricted. Taking lithium on an empty stomach should be avoided because of possible gastrointestinal upset. (p. 234)",
            topic: "Bipolar & Related Disorders",
            source: "eaq"
          },
          {
            stem: "A patient experiencing mania has not slept for 3 days and states, \"I am not tired. I have so much energy!\" Which nursing intervention will assist the patient in getting adequate rest?",
            options: [
              "Keep patient stimulated during daylight hours.",
              "Recommend frequent rest periods during the day.",
              "Suggest the patient remain awake during the day.",
              "Encourage hot tea at bedtime to promote relaxation."
            ],
            answer: 1,
            rationale: "Adequate rest, sleep, and nutrition are essential during mania. The nurse should encourage the patient with mania who has not slept to take frequent rest periods during the day. Hot tea at bedtime would not be appropriate since some teas contain caffeine, which should be avoided. The patient should be encouraged to rest during the day, not remain awake. The patient's environment should be one with low stimulation. (pp. 228-229)",
            topic: "Bipolar & Related Disorders",
            source: "eaq"
          },
          {
            stem: "Which behavior would be characteristic of a patient during a manic episode?",
            options: [
              "Watching others intently and talking little",
              "Going rapidly from one activity to another",
              "Taking frequent rest periods and naps during the day",
              "Being unwilling to leave home to see other people"
            ],
            answer: 1,
            rationale: "Hyperactivity and distractibility are basic to manic episodes. A patient with mania talks a great deal, has difficulty resting and sleeping, and may leave the home to try to pursue unsafe or inappropriate activity. (p. 225)",
            topic: "Bipolar & Related Disorders",
            source: "eaq"
          },
          {
            stem: "Which appropriate action would the nurse take to help a patient with mania sleep better?",
            options: [
              "Provide a low-protein diet.",
              "Provide tea or coffee before sleep.",
              "Provide warm milk and play soft music.",
              "Help the patient perform intense physical activity."
            ],
            answer: 2,
            rationale: "The nurse can provide calming activities such as warm milk or playing soft music. Patients with mania are usually overactive, so they must be provided high-calorie and high-protein foods. The patient must be given decaffeinated coffee, cola, and tea because caffeine can interfere with sleep. The patient with mania must be given frequent rest periods during a physical activity. Lack of rest can cause exhaustion and death. (pp. 229-230)",
            topic: "Bipolar & Related Disorders",
            source: "eaq"
          },
          {
            stem: "A patient with bipolar disorder takes lithium. After playing soccer on a hot summer day, the patient reports nausea, vomiting, diarrhea, and thirst. The patient's hands begin to tremble and the gait becomes unsteady. Which is the appropriate nursing intervention? Select all that apply.",
            options: [
              "Administer a medication to induce vomiting.",
              "Collaborate with the healthcare provider regarding increasing the daily lithium dose.",
              "Instruct the patient not to take any more lithium until directed by the healthcare provider.",
              "Collaborate with the healthcare provider about drawing a serum lithium level immediately.",
              "Complete an abnormal involuntary movement scale (AIMS) evaluation on this patient immediately."
            ],
            answers: [2, 3],
            rationale: "The patient likely became dehydrated by the high activity in the summer heat. Lithium toxicity probably has developed. The patient should be instructed not to take further lithium doses. The lithium must be held, and a serum lithium level needs to be drawn. It is the nurse's responsibility to discuss possible toxicity with the healthcare provider. It would not be appropriate to induce vomiting as this would cause further dehydration and could potentially cause aspiration. If the lithium level is elevated, the healthcare provider should lower the dose. The AIMS evaluation would not be of value in this case, as the scale is used to evaluate effects of antipsychotic medications. (pp. 232, 233)",
            topic: "Bipolar & Related Disorders",
            source: "eaq"
          },
          {
            stem: "Which symptom related to communication is likely to be present in a patient experiencing mania?",
            options: [
              "Mutism",
              "Poverty of ideas",
              "Clang associations",
              "Psychomotor retardation"
            ],
            answer: 2,
            rationale: "Clang associations are the stringing together of words because of their rhyming sounds, without regard to their meaning. This communication style occurs commonly in persons experiencing mania. Mutism, poverty of ideas, and psychomotor retardation are assessment findings usually associated with depression. (p. 226)",
            topic: "Bipolar & Related Disorders",
            source: "eaq"
          }
        ]
      }
    },

    /* ==========================================================
       TOPIC 9 — SUICIDE  (Week 2)
       7 mustKnow, one per Learning Outcomes bullet on
       must-know.html#suicide. 5 extraPractice from the Key Terms table.
       ========================================================== */
    {
      id: "week2-suicide",
      label: "Suicide",
      week: 2,
      sets: {
        mustKnow: [
          {
            stem: "A nurse is charting after a patient death. Which phrasing is acceptable?",
            options: [
              "The patient committed suicide",
              "The patient died by suicide",
              "The patient's suicide attempt was successful",
              "The patient completed suicide"
            ],
            answer: 1,
            rationale: "\"Died by suicide\" is the accepted phrasing, and \"suicide attempt\" replaces the older language for a non-fatal act. \"Committed\" carries the connotation of a crime or a sin. \"Successful\" and \"completed\" both frame a death as an achievement, which is precisely what the terminology change was made to stop.",
            topic: "Suicide",
            source: "quiz-bank"
          },
          {
            stem: "A patient screens positive for suicide risk on admission. Which tool structures the plan the patient helps build for coping with a future crisis?",
            options: [
              "The C-SSRS severity rating scale",
              "The SAFE-T triage framework",
              "The Stanley-Brown safety plan",
              "The Self-Harm Inventory"
            ],
            answer: 2,
            rationale: "The Stanley-Brown safety plan is the collaborative plan the patient builds for what to do in a future crisis. The C-SSRS is the severity rating scale used to screen and assess risk, and SAFE-T is the five-step evaluation and triage framework — both assess rather than plan. The Self-Harm Inventory is the scale used when nonsuicidal self-injury is suspected.",
            topic: "Suicide",
            source: "quiz-bank"
          },
          {
            stem: "Which findings increase a patient's immediate suicide risk? Select all that apply.",
            options: [
              "A history of a previous suicide attempt",
              "Increasing alcohol use over recent weeks",
              "A strong sense of responsibility to dependent children",
              "Withdrawing from friends and family",
              "An ongoing relationship with an outpatient provider"
            ],
            answers: [0, 1, 3],
            rationale: "A past attempt is among the strongest predictors, and rising substance use and social withdrawal are both warning signs of escalating risk. Responsibility for dependent children and a working relationship with a provider are protective factors — they lower risk rather than raise it. Distinguishing risk factors, warning signs, and protective factors is the point of a comprehensive assessment.",
            topic: "Suicide",
            source: "quiz-bank"
          },
          {
            stem: "A patient is admitted on suicide precautions. Which action reflects correct environmental safety practice?",
            options: [
              "Return belongings once the patient is taken off precautions",
              "Allow the patient to keep a belt if they promise not to use it",
              "Search belongings and perform a full skin assessment on entry",
              "Place the patient in a private room at the end of the hall"
            ],
            answer: 2,
            rationale: "Searching belongings and doing a full skin assessment on entry is standard, both to remove means and to find injuries the patient has not reported. Belongings are held until discharge, not returned when precautions lift — patients move around the unit, so an item returned early puts others at risk too. A no-harm promise is not a safety intervention, and an isolated room at the end of a hall reduces observation rather than increasing it.",
            topic: "Suicide",
            source: "quiz-bank"
          },
          {
            stem: "A patient admitted after a suicide attempt sits alone and says nothing about what happened. Which nursing action best promotes recovery?",
            options: [
              "Avoid raising the attempt until the patient brings it up",
              "Encourage the patient to put their feelings into words",
              "Provide extended time alone for private reflection",
              "Redirect the conversation whenever the attempt is mentioned"
            ],
            answer: 1,
            rationale: "Recovery after an attempt depends on the patient talking about what they feel, and encouraging that is the therapeutic move. Waiting for the patient to raise it and redirecting away from it both signal the subject is off limits. Extended time alone delays the conversation and cuts observation of a patient who has just attempted suicide.",
            topic: "Suicide",
            source: "quiz-bank"
          },
          {
            stem: "Which pharmacological intervention is used specifically to reduce suicidal ideation quickly?",
            options: [
              "Low-dose lithium, about 25 mg PO daily for a few weeks",
              "A tricyclic antidepressant taken at bedtime for its sedation",
              "An MAOI with a tyramine-restricted diet",
              "A long-acting benzodiazepine taken daily"
            ],
            answer: 0,
            rationale: "Low-dose lithium, about 25 mg PO daily for a few weeks, reduces suicidal ideation quickly, though the mechanism is not established. A tricyclic is the opposite choice for a patient at risk, being deadly in overdose. MAOIs sit last on the drug ladder and carry the tyramine restriction, and daily benzodiazepines are sedative-hypnotics that are addictive and used only short-term.",
            topic: "Suicide",
            source: "quiz-bank"
          },
          {
            stem: "During a routine assessment a patient says, \"Honestly, some mornings I wonder why I bother getting up at all.\" What should the nurse do first?",
            options: [
              "Note the statement and continue the physical assessment",
              "Reassure the patient that many people feel this way",
              "Ask directly whether the patient is thinking of killing themselves",
              "Arrange a psychiatric consult before discussing it further"
            ],
            answer: 2,
            rationale: "Safety comes before anything else, and the way to establish it is to ask about suicide directly — asking does not increase risk or plant the idea; it opens the door to help. Continuing the assessment lets the cue pass. Reassurance minimizes what the patient just disclosed and tends to close the conversation. A consult may well follow, but it does not replace assessing the risk in front of you now.",
            topic: "Suicide",
            source: "quiz-bank"
          }
        ],
        medications: [],
        eaq: [
          /* Imported 2026-09-13 from the Week 2 EAQ quizzes (ticket to class, then end of week),
             in their original order and wording. Repairs are itemised in SESSION-LOG.md. */
          {
            stem: "The patient tells their pastor, \"I want to return to heaven.\" Which action is the pastor's best course of action, knowing the patient has firearms?",
            options: [
              "The patient requires emergency intervention.",
              "The pastor should inform the patient's family.",
              "There is no way for the pastor to stop the patient.",
              "The pastor should inform the patient that suicide is a sin."
            ],
            answer: 0,
            rationale: "When a patient details a plan for suicide, emergency intervention is required. This may include involuntary admission for observation. The pastor can involve the family if possible as part of emergency intervention. The pastor should do everything possible to stop the patient. The pastor and patient may believe that suicide is a sin, but this may not be enough for a patient with disordered thinking. (p. 252)",
            topic: "Suicide",
            source: "eaq"
          },
          {
            stem: "Which substance is the most prevalently associated with suicide?",
            options: [
              "Opiates",
              "Alcohol",
              "Cocaine",
              "Marijuana"
            ],
            answer: 1,
            rationale: "Alcohol is the most prevalent substance associated with suicide and is followed by marijuana, cocaine, and then opiates or prescription pain killers. (p. 473)",
            topic: "Suicide",
            source: "eaq"
          },
          {
            stem: "Which information is accurate regarding the statistics related to suicide?",
            options: [
              "Women die by suicide more than men.",
              "Substances are often associated with suicide.",
              "Men under 25 years of age have the highest suicide rate of any group.",
              "Jumping from a significant height is the most common method of suicide."
            ],
            answer: 1,
            rationale: "Substances are often associated with suicide. Men die by suicide more than women. Men ages 85 years and older have the highest suicide rate of any group. Firearms are the most common method of death by suicide. (p. 473)",
            topic: "Suicide",
            source: "eaq"
          },
          {
            stem: "Which cue is a protective factor that makes a patient being treated for bipolar disorder less likely to attempt suicide?",
            options: [
              "Having children",
              "Being unemployed",
              "Being a single parent",
              "Having an unfinished education"
            ],
            answer: 0,
            rationale: "Having children is a protective factor that makes individuals less likely to consider, attempt, or die by suicide. Unemployment, single parenting, and unfinished education are not factors associated with the decreased likelihood of suicide. (p. 475)",
            topic: "Suicide",
            source: "eaq"
          },
          {
            stem: "Which neurological chemical is a prescriptive treatment intended to target a patient contemplating suicide?",
            options: [
              "Oxytocin",
              "Endorphin",
              "Dopaminergic",
              "Norepinephrine"
            ],
            answer: 2,
            rationale: "There is some evidence to support the use of medications targeting the dopaminergic, serotonin, and opioid systems. Oxytocin, endorphin, and norepinephrine are not neurological chemicals for which there is evidence to support the use of medications for a patient contemplating suicide. (p. 485)",
            topic: "Suicide",
            source: "eaq"
          },
          {
            stem: "Which classification of medication is prescribed to a patient with suicidal thoughts?",
            options: [
              "Amphetamines",
              "Anticonvulsants",
              "Monoamine oxidase inhibitors (MAOIs)",
              "Selective serotonin reuptake inhibitors (SSRIs)"
            ],
            answer: 3,
            rationale: "SSRIs are a classification of medication prescribed for patients with suicidal thoughts. Amphetamines, anticonvulsants, and MAOIs are not prescribed for the treatment of suicidal thoughts. (p. 485)",
            topic: "Suicide",
            source: "eaq"
          },
          {
            stem: "Which problem has the highest correlation with death by suicide?",
            options: [
              "Housing problems",
              "Substance use problems",
              "Financial problems",
              "Relationship problems"
            ],
            answer: 3,
            rationale: "Relationship problems have the highest correlation with death by suicide. This is followed by problematic substance use, financial problems, and housing problems. (p. 474)",
            topic: "Suicide",
            source: "eaq"
          },
          {
            stem: "Which outcome would the nurse incorporate into the plan of care for a patient with a nursing diagnosis of hopelessness?",
            options: [
              "Remains free from injury",
              "Describes feelings of self-worth",
              "Expresses willingness to call on others for help",
              "Identifies coping mechanisms to assist in crises"
            ],
            answer: 2,
            rationale: "The patient lacks hope for the future, so an appropriate outcome for this patient is expressing willingness to call on others for help. Describing feelings of self-worth would be more appropriate for a patient with chronic low self-esteem. Remaining free from injury would be more appropriate for a patient with a nursing diagnosis of risk for suicide. Identifying coping mechanisms to assist in crises would be more appropriate for a patient with a nursing diagnosis of ineffective coping. (p. 477)",
            topic: "Suicide",
            source: "eaq"
          },
          {
            stem: "Which item would the nurse remove from the meal tray before serving it to a patient who is suicidal?",
            options: [
              "Plastic plate",
              "Cloth napkin",
              "Metal utensils",
              "Styrofoam cup"
            ],
            answer: 2,
            rationale: "To minimize suicidal behavior within inpatient facilities, metal dinnerware utensils are not used. In most healthcare agencies, suicidal patients receive plastic dinnerware on their meal trays. Cloth napkins and Styrofoam cups are also used for safety. (p. 481)",
            topic: "Suicide",
            source: "eaq"
          },
          {
            stem: "Which change in neurotransmission is associated with suicidal thinking?",
            options: [
              "Increased norepinephrine reserves in the thalamus and pons",
              "Decreased serotonin activity in the brainstem and prefrontal cortex",
              "Increased γ-aminobutyric acid (GABA) activity in the hypothalamus",
              "Decreased numbers of glutamate receptors in the temporal lobes"
            ],
            answer: 1,
            rationale: "Low serotonin levels are related to depressed mood, and depression is commonly associated with suicide. Postmortem examinations of individuals who complete suicide also reveal a low level of serotonin in the brainstem or the frontal cortex. Increased norepinephrine is associated with stimulation of the sympathetic nervous system. GABA is associated with anxiety. Increased, not decreased, numbers of glutamate receptors may reduce suicidal ideation. (p. 473)",
            topic: "Suicide",
            source: "eaq"
          },
          {
            stem: "A patient tells the nurse they believe their situation is intolerable. The nurse notes the patient is also isolating socially. Which nursing problem would the nurse consider developing into the plan of care?",
            options: [
              "Feeling hopeless",
              "Knowledge deficit",
              "Low self-esteem",
              "Impaired coping"
            ],
            answer: 0,
            rationale: "The defining characteristics are present for the nursing diagnosis of hopelessness. The defining characteristics do not support a knowledge deficit, low self-esteem, or impaired coping. (pp. 475, 476, 480)",
            topic: "Suicide",
            source: "eaq"
          },
          {
            stem: "An identical twin adolescent recently committed suicide, and the parent tells the nurse, \"Thank heavens suicide does not run in families. I won't have to worry about my other son.\" Which information would the nurse base a response?",
            options: [
              "Twin studies suggest no genetic factor is involved in suicide.",
              "Twin studies suggest the presence of genetic factors in suicide.",
              "The parent has failed to consider the importance of the \"copycat\" factor.",
              "The parent is likely denying the possibility of a parental role in the causation of the suicide."
            ],
            answer: 1,
            rationale: "Twin studies show that a genetic component of suicide may be present. Concordance rates are higher among identical twins than among fraternal twins. Although suicide of a relative may result in a copycat suicide, in this particular situation, the mother is discussing a genetic disposition. The parent is not denying a parental role, they are discussing a genetic disposition regarding suicide. (pp. 472-473)",
            topic: "Suicide",
            source: "eaq"
          },
          {
            stem: "Which action would assist the unit manager in ensuring that all items brought onto the unit by visitors are effectively and efficiently inspected?",
            options: [
              "Have a staff member sit at the door and check packages as visitors enter.",
              "Ask all visitors to report to the nurses' station before visiting a patient.",
              "Have a staff member make frequent rounds during visiting hours to inspect gifts.",
              "Ask patients to give staff any unsafe item that might have been left by a visitor."
            ],
            answer: 0,
            rationale: "A number of ways to inspect items are possible. Taking all potentially harmful gifts from visitors before allowing them to see patients, going through patient's belongings (with patient present) and removing all potentially harmful objects, ensuring that visitors do not leave potentially harmful objects in the patient's room, and searching patients for harmful objects on return from pass are all effective methods to ensure a high rate of patient safety. Asking visitors to check in at the nurses' station before visiting a patient, having staff members inspect gifts during visitors hours, and asking patients to turn in any unsafe items that may have been left behind are not practical and efficient methods for monitoring items brought onto the unit by outside visitors. (p. 481)",
            topic: "Suicide",
            source: "eaq"
          },
          {
            stem: "Which statement by a patient with chronic depression indicates the need for further assessment?",
            options: [
              "\"I think things will be better soon.\"",
              "\"I know a lot of people care about me and want me to get better.\"",
              "\"I don't have a good support system, but I am planning on joining a recovery group.\"",
              "\"I have suicidal thoughts at times, but I don't have any plan and don't think I would ever actually hurt myself.\""
            ],
            answer: 0,
            rationale: "The response \"I think things will be better soon\" may be a covert, or indirect, clue that the patient is thinking of suicide. \"I know a lot of people care about me and want me to get better,\" \"I have suicidal thoughts at times, but I don't have any plan and don't think I would ever actually hurt myself,\" and \"I don't have a good support system, but I am planning on joining a recovery group\" are all statements that, while they may be discussed further, are not clues to suicide but rather clear communication. (p. 485)",
            topic: "Suicide",
            source: "eaq"
          },
          {
            stem: "Which timeframe do individuals usually commit copycat suicide?",
            options: [
              "After a person loses their job",
              "After a person loses their self-esteem",
              "After a highly publicized suicide of a public figure",
              "After losing freedom resulting from imminent incarceration"
            ],
            answer: 2,
            rationale: "Theories of suicide have recently focused on a combination of suicidal fantasies with loss of job, rage, guilt, or identification with an individual who has committed suicide. A person commits copycat suicide after a highly publicized suicide of a public figure, an idol, or a peer in the community. Losing a job, losing self-esteem as a result of various reasons, and feeling trapped in a jail may also be reasons for committing suicide, but they are not the reasons for a copycat suicide. (p. 473)",
            topic: "Suicide",
            source: "eaq"
          },
          {
            stem: "Which factor would be irrelevant when assessing the lethality of a patient's plan for suicide?",
            options: [
              "Whether the plan has specific details",
              "How long the patient has been suicidal",
              "Whether the method is one that causes death quickly",
              "Whether the patient has the means to implement the plan"
            ],
            answer: 1,
            rationale: "Lethality refers to how deadly a plan is. The length of time a patient has been suicidal has nothing to do with the lethality of the plan. Evaluation of specific details, speed of death, and means to implement the plan all contribute to the lethality of a plan. (p. 476)",
            topic: "Suicide",
            source: "eaq"
          },
          {
            stem: "Which action would a charge nurse take to ensure patient safety on the unit? Select all that apply.",
            options: [
              "Count the kitchen utensils daily.",
              "Lock the utility rooms, kitchen, and office.",
              "Install unbreakable shower rods in the bathroom.",
              "Ensure that the windows remain open in the morning.",
              "Decorate the unit with flowers in beautiful glass vases."
            ],
            answers: [0, 1],
            rationale: "To ensure patient safety on the unit, the nurse should lock the utility rooms, kitchen, and offices and instruct all the staff members to do so. The nurse should count the number of utensils daily to ensure that the patients do not take harmful objects from the kitchen. The ward must be kept free of harmful objects, like glass vases and nails. The nurse should close the windows to prevent the patients from escaping. The bathrooms must be made jump-proof and hanging-proof by installing breakaway showers. (p. 481)",
            topic: "Suicide",
            source: "eaq"
          },
          {
            stem: "Which situation is considered a protective factor against suicide? Select all that apply.",
            options: [
              "Marriage",
              "Economic security",
              "Strong religious beliefs",
              "College-level education",
              "Extended family members"
            ],
            answers: [0, 2, 4],
            rationale: "Protective factors against suicide include marriage, religious beliefs, and connections with extended family members. Financial security and education are not protective factors in this situation. (pp. 473, 474, 475)",
            topic: "Suicide",
            source: "eaq"
          },
          {
            stem: "Which patient problem would the nurse incorporate into the plan of care for a patient with gallbladder cancer who states, \"Although my family is very supportive, I feel like a burden on my family\"?",
            options: [
              "Social isolation",
              "Poor family coping",
              "Limited social interaction",
              "Low self-esteem based on the situation"
            ],
            answer: 3,
            rationale: "Patients with low self-esteem based on their current situation have feelings of worthlessness and being a burden on family and others. Poor family coping is characterized by ineffective communication with the family and unavailability of the family. Patients with impaired social interaction have few supportive groups and do not interact with others. Intense feeling of isolation, deprivation, and lack of love can be seen in patients with social isolation. (p. 477)",
            topic: "Suicide",
            source: "eaq"
          },
          {
            stem: "Which suicide intervention has the greatest effect on a patient's safety?",
            options: [
              "One-on-one observation by the staff",
              "Educating visitors about potentially dangerous gifts",
              "Removal of personal items that might prove harmful",
              "Restricting the patient from potentially dangerous areas of the unit"
            ],
            answer: 0,
            rationale: "One-on-one observation allows for constant supervision, which minimizes the patient's opportunities to cause self-harm. Although educating visitors about potentially dangerous gifts, restricting the patient from potentially dangerous areas of the unit, and removal of personal items that might prove harmful are appropriate are important, they do not have the effect that one-on-one observation has. (p. 480)",
            topic: "Suicide",
            source: "eaq"
          },
          {
            stem: "Which medication would the nurse anticipate incorporating into the plan of care for a suicidal patient with bipolar manic episodes?",
            options: [
              "Fluoxetine",
              "Clozapine",
              "Haloperidol",
              "Diazepam"
            ],
            answer: 1,
            rationale: "Antipsychotics such as clozapine may be prescribed to suicidal patients who experience psychotic or bipolar manic episodes. Fluoxetine is an antidepressant, which would not be prescribed to this patient. Haloperidol is a first-generation antipsychotic with a greater risk for adverse side effects. Diazepam is an antianxiety medication, which would not be prescribed to this patient. (p. 485)",
            topic: "Suicide",
            source: "eaq"
          },
          {
            stem: "Which time frame would the nurse document the whereabouts and record mood, verbatim statements, and behavior for a patient who is at a high risk of suicide?",
            options: [
              "Every other day",
              "Three times a day",
              "Every 15 to 30 minutes",
              "Every 60 to 120 minutes"
            ],
            answer: 2,
            rationale: "When patients are at high risk of suicide and assessment shows that they may follow a plan of self-harm, the nurse should keep them under 24-hour surveillance. The nurse should chart the patient's whereabouts and record their mood, verbatim statements, and behavior every 15 to 30 minutes. The patients may cause self-harm if the interval between two checks is large, such as three times a day, every 60 to 120 minutes, or every other day. (p. 480)",
            topic: "Suicide",
            source: "eaq"
          },
          {
            stem: "If a patient experiencing suicidal ideation is to be treated outside the hospital, which intervention would the nurse incorporate into the plan of care?",
            options: [
              "Arrange for a police visit every 24 hours.",
              "Provide a 1-week supply of antidepressant medication.",
              "Make sure the patient has food enough to last for 2 to 3 days.",
              "Have the patient identify three people to call if the patient is overwhelmed by hopelessness."
            ],
            answer: 3,
            rationale: "For patients with suicidal ideation who are treated in the community, establishing a network of individuals to whom the patient may turn if the suicidal urge becomes great is important. Police welfare checks every 24 hours would be a misuse of the police force. Upon discharge, prescriptions are provided for the patient to be filled at the pharmacy of their choosing. Medications are not dispensed to the patient upon discharged from the hospital. Before discharge, it is not the responsibility of the nurse to ensure the patient has enough food at home. However, if the patient has difficulty obtaining food, the nurse can refer the patient to the appropriate community resources. (pp. 478, 479)",
            topic: "Suicide",
            source: "eaq"
          },
          {
            stem: "Which patient is at a greater risk of suicide?",
            options: [
              "A patient in a religious environment",
              "A patient on lithium for a mood disorder",
              "A patient on clozapine for schizophrenia",
              "A patient on chemotherapy for breast cancer"
            ],
            answer: 3,
            rationale: "The nurse should be aware of risk factors and protective factors for suicide. Having a chronic illness such as cancer is a risk factor for suicide. A patient who is undergoing treatment for a critical illness such as breast cancer is at a high risk of committing suicide. Religious environment acts as a protective factor. Clozapine reduces the risk of suicide in patients with schizophrenia, and lithium reduces the risk in patients with mood disorders. (p. 475)",
            topic: "Suicide",
            source: "eaq"
          }
        ]
      }
    },

    /* ==========================================================
       TOPIC 10 — NONSUICIDAL SELF-INJURY  (Week 2)
       4 mustKnow, one per Learning Outcomes bullet on
       must-know.html#nssi. That section has NO Key Terms table (the
       Exam Focus deck has no Key Terms slide for NSSI), so the 5
       extraPractice draw on the topic page instead.
       ========================================================== */
    {
      id: "week2-nssi",
      label: "Nonsuicidal Self-Injury",
      week: 2,
      sets: {
        mustKnow: [
          {
            stem: "Which statement best defines nonsuicidal self-injury?",
            options: [
              "Any self-inflicted injury, regardless of the person's intent",
              "A suicide attempt that results in no lasting physical harm",
              "Self-inflicted destruction of body tissue without suicidal intent",
              "Risk-taking behavior that could foreseeably cause injury"
            ],
            answer: 2,
            rationale: "NSSI is the deliberate, self-inflicted destruction or injury of body tissue without suicidal intent, and the absence of intent is the entire distinction from a suicide attempt. Defining it by injury alone drops that distinction. A low-lethality suicide attempt still carries intent to die, so it is not NSSI. Risk-taking without deliberate tissue injury does not meet the definition either.",
            topic: "Nonsuicidal Self-Injury",
            source: "quiz-bank"
          },
          {
            stem: "Which findings meet the DSM-5 criteria for nonsuicidal self-injury? Select all that apply.",
            options: [
              "Self-injury on at least 5 days in the past year",
              "Getting a tattoo as part of a cultural ritual",
              "Injuring oneself to relieve negative thoughts or feelings",
              "Preoccupation with the behavior that is difficult to resist",
              "Self-injury occurring only during episodes of psychosis"
            ],
            answers: [0, 2, 3],
            rationale: "The criteria require at least 5 days of the behavior in the past year — not necessarily consecutive days — done to relieve negative feelings, resolve an interpersonal difficulty, or induce a positive state, and preceded by negative thoughts, conflict, or a preoccupation that is hard to resist. Socially sanctioned body modification such as tattooing or piercing is explicitly excluded, and the diagnosis does not apply if the behavior occurs solely within another mental disorder.",
            topic: "Nonsuicidal Self-Injury",
            source: "quiz-bank"
          },
          {
            stem: "A patient discloses ongoing self-injury during an ED visit for an unrelated complaint. Which nursing action is most important beyond caring for the wounds?",
            options: [
              "Assess previous coping mechanisms and build healthier alternatives",
              "Advise the patient to stop the behavior and explain its dangers",
              "Arrange an involuntary psychiatric admission",
              "Have the patient sign an agreement not to self-injure again"
            ],
            answer: 0,
            rationale: "Establishing the relationship and building coping mechanisms the patient can use instead of self-harm is the psychotherapeutic core of the care, and asking what has helped before gives something concrete to reinforce. Instructing the patient to stop offers no replacement for what the behavior does for them. Involuntary admission is not indicated by self-injury without suicidal intent, and a signed agreement is not a safety intervention.",
            topic: "Nonsuicidal Self-Injury",
            source: "quiz-bank"
          },
          {
            stem: "Which therapies are described as successful for nonsuicidal self-injury, inpatient or outpatient?",
            options: [
              "Electroconvulsive therapy and bright light phototherapy together",
              "Cognitive behavioral therapy and dialectical behavior therapy",
              "Psychoanalysis and free association",
              "Aversion therapy and flooding"
            ],
            answer: 1,
            rationale: "CBT and DBT are both described as successful for this condition in either setting, alongside group therapy and psychopharmacology; DBT in particular targets the distress tolerance and emotion regulation that self-injury substitutes for. ECT and phototherapy are physiological treatments for mood disorders. Psychoanalysis and the behavioral exposure therapies are not the treatments named for NSSI.",
            topic: "Nonsuicidal Self-Injury",
            source: "quiz-bank"
          }
        ],
        medications: [],
        eaq: [
          /* Imported 2026-09-13 from the Week 2 EAQ quizzes (ticket to class, then end of week),
             in their original order and wording. Repairs are itemised in SESSION-LOG.md. */
          {
            stem: "Which patient behavior is consistent with nonsuicidal self-injury?",
            options: [
              "Ingesting sleeping pills",
              "Scratching one's own face",
              "Jumping from a tall building",
              "Shooting oneself with a gun"
            ],
            answer: 1,
            rationale: "Nonsuicidal self-injury is the term used when a person directly and deliberately attempts to injure their own body, which does not result in death. Examples of such actions include scratching skin, cutting, biting, burning, and skin pricking. Jumping off a tall building, shooting oneself with a gun, and taking sleeping pills are all lethal methods of suicide. These can cause immediate death of the patient. (p. 483)",
            topic: "Nonsuicidal Self-Injury",
            source: "eaq"
          },
          {
            stem: "Which nursing assessment datum supports a diagnosis of nonsuicidal self-injury?",
            options: [
              "Reports of cutting since the age of 11",
              "Attempted suicide on three other occasions",
              "Use of alcohol since the age of 16 and smoking since age 12",
              "Although acknowledging suicidal thoughts, denies any plan."
            ],
            answer: 0,
            rationale: "Nonsuicidal self-injury involves any activity harmful to the person's physical well-being. This type of injury is the intentional damage to one's own body tissue, without conscious suicidal intent and for purposes not socially or culturally sanctioned. Cutting is an example of a nonsuicidal self-injury. A suicide attempt is a direct self-destructive behavior and would not be classified as a nonsuicidal self-injury. Use of alcohol since the age of 16 and smoking since age of 12 are poor habits to pick up at an early age, but they are not classified as nonsuicidal self-injuries. Suicidal thoughts without a plan are considered direct self-destructive behaviors, not nonsuicidal self-injuries. (p. 483)",
            topic: "Nonsuicidal Self-Injury",
            source: "eaq"
          }
        ]
      }
    },

    /* ==========================================================
       TOPIC 11 — SUBSTANCE USE & ADDICTIVE DISORDERS  (Week 3)
       13 mustKnow, one per Learning Outcomes bullet on
       must-know.html#sud. 10 extraPractice from the Key Terms table
       and other high-yield material on the topic page.

       NONE of these repeats a point tested by the 18 verbatim
       questions on week3-lecture-review.html. Where a bullet and a
       clicker question cover the same ground, the question here takes
       a different angle deliberately — the COWS question asks about
       assessment technique rather than the symptom list, and the
       Wernicke-Korsakoff one asks which stage the patient has reached
       rather than what causes it.
       ========================================================== */
    {
      id: "week3-sud",
      label: "Substance Use & Addictive Disorders",
      week: 3,
      sets: {
        mustKnow: [
          {
            stem: "Two patients are admitted the same evening — one in opioid withdrawal, one in alcohol withdrawal. Which statement should guide the nurse's planning?",
            options: [
              "Both syndromes carry the same mortality risk and both require inpatient detoxification",
              "Alcohol withdrawal can be fatal; opioid withdrawal is severely uncomfortable but rarely deadly",
              "Opioid withdrawal is more dangerous than alcohol withdrawal because of its cardiovascular effects",
              "Neither syndrome requires medication as long as vital signs remain stable and the patient is oriented"
            ],
            answer: 1,
            rationale: "Alcohol and sedative-hypnotic withdrawal progresses through seizures to delirium tremens and can kill, so it is medicated against a CIWA score; opioid withdrawal is extremely uncomfortable and is typically managed outpatient. Treating them as equivalent risks under-monitoring the alcohol patient. Opioid withdrawal does raise pulse and blood pressure, but that is the reverse of intoxication rather than a lethal course, and withholding medication until vital signs change is how withdrawal seizures happen.",
            topic: "Substance Use & Addictive Disorders",
            source: "quiz-bank"
          },
          {
            stem: "A nurse is about to score a patient on the Clinical Opiate Withdrawal Scale. Which action makes the resting pulse rate valid?",
            options: [
              "Take the pulse immediately on entering the room",
              "Take the pulse right after the patient walks back from the bathroom",
              "Have the patient sit quietly for five minutes first",
              "Use the pulse recorded on the last set of routine vital signs"
            ],
            answer: 2,
            rationale: "The item is the resting pulse, and activity raises heart rate, so the patient sits for five minutes before it is counted — the same care the tool asks for elsewhere, assessing pupils in good lighting and checking gooseflesh by running fingertips over the inner forearm. A pulse taken on arrival or straight after walking reflects exertion, not withdrawal, and an earlier routine reading does not describe the patient now.",
            topic: "Substance Use & Addictive Disorders",
            source: "quiz-bank"
          },
          {
            stem: "A patient treated for Wernicke's encephalopathy now fills gaps in conversation with invented detail and cannot retain new information. What has happened?",
            options: [
              "The thiamine dose is too high and has produced confusion",
              "This is the expected response to intravenous thiamine",
              "The patient has relapsed and is intoxicated again",
              "The patient has progressed to Korsakoff syndrome"
            ],
            answer: 3,
            rationale: "Confabulation and severe, persistent memory impairment including anterograde amnesia mark the chronic second stage, which is not typically reversible and carries a recovery rate of only about 20%; thiamine then continues for 3 to 12 months rather than the 1 to 2 weeks of the acute stage. Wernicke's itself presents with confusion, ataxia and eye findings, not invented memories. Nothing about thiamine replacement causes this, and intoxication does not produce anterograde amnesia of this kind.",
            topic: "Substance Use & Addictive Disorders",
            source: "quiz-bank"
          },
          {
            stem: "Which medication is an alpha agonist given to relieve withdrawal symptoms?",
            options: [
              "Clonidine",
              "Acamprosate",
              "Disulfiram",
              "Buprenorphine"
            ],
            answer: 0,
            rationale: "Clonidine is an antihypertensive and alpha agonist that eases withdrawal by blocking the neurotransmitters driving sympathetic activity; lofexidine is the newer drug in the same class. Acamprosate reduces alcohol cravings in recovery and disulfiram deters drinking, and neither treats withdrawal. Buprenorphine does relieve opioid withdrawal, but as a long-acting partial opioid agonist rather than an alpha agonist.",
            topic: "Substance Use & Addictive Disorders",
            source: "quiz-bank"
          },
          {
            stem: "A nurse realizes they feel irritated by a patient with a substance use disorder, and that the patient resembles a relative whose drinking marked the nurse's childhood. What is occurring, and what addresses it?",
            options: [
              "Transference, addressed by reassigning the patient to another nurse",
              "Compassion fatigue, addressed by taking time off the unit",
              "Countertransference, addressed by self-assessment of one's own attitudes",
              "Denial, addressed by documenting the patient's behavior objectively in the chart"
            ],
            answer: 2,
            rationale: "Countertransference is the healthcare worker unconsciously displacing feelings about significant figures from their own past onto the patient, and the stated counter to it is examining one's own attitudes about substance use and recognizing how past experience shapes care. Transference runs the other direction, from patient to nurse. Reassignment avoids the feeling rather than addressing it, and neither compassion fatigue nor denial names what is happening here.",
            topic: "Substance Use & Addictive Disorders",
            source: "quiz-bank"
          },
          {
            stem: "Which entry in the chart uses person-first language?",
            options: [
              "Client is a longtime abuser of alcohol",
              "Client has an alcohol use disorder",
              "Client is a recovering alcoholic",
              "Client was admitted drunk"
            ],
            answer: 1,
            rationale: "Person-first language describes the illness as one part of a person's life instead of defining the person by it, so the disorder is something the client has. Abuser, alcoholic and drunk are all on the list of words providers avoid; if a patient uses such a term about themselves that is their right, but it does not belong in the nurse's documentation.",
            topic: "Substance Use & Addictive Disorders",
            source: "quiz-bank"
          },
          {
            stem: "Which findings raise a patient's risk of developing a substance use disorder? Select all that apply.",
            options: [
              "A sibling with a substance use disorder",
              "Childhood exposure to physical or sexual abuse",
              "A brain that reached full maturity by age 18",
              "Coping that has shifted onto the substance",
              "Ready access to the substance",
              "Dopamine that returns to baseline between uses of the substance"
            ],
            answers: [0, 1, 3, 4],
            rationale: "Addiction runs in families, trauma exposure is a major risk factor, ineffective coping that shifts onto the substance is a named risk, and access to an addictive substance is another, alongside chronic stress, socioeconomic factors, anxiety, and use among family or peers. The brain is not fully developed until about age 24 — immaturity is the risk, so maturity by 18 is a flipped fact. Dopamine returning to baseline is also backwards: the substance floods the brain with 5 to 10 times the normal level, and it is the low between uses that brings anhedonia and craving.",
            topic: "Substance Use & Addictive Disorders",
            source: "quiz-bank"
          },
          {
            stem: "A patient asks why one use of a drug can start a pattern they cannot break. Which explanation reflects the mesolimbic reward pathway?",
            options: [
              "The substance floods the brain with dopamine, the brain ties it to reward, and craving follows",
              "The substance depletes serotonin, and low serotonin produces the compulsion to use",
              "The substance destroys the nucleus accumbens, so pleasure can no longer be felt naturally",
              "The substance blocks endorphin receptors, so pain relief requires steadily larger doses"
            ],
            answer: 0,
            rationale: "The pathway runs dopamine surge, reinforcement, then craving and repeat use: dopamine floods to 5 to 10 times normal, the brain remembers and associates the substance with euphoric reward, and low dopamine between uses leaves anhedonia. Serotonin, GABA, glutamate and endorphins are all involved, but dopamine is the central one. The nucleus accumbens is flooded with dopamine, not destroyed, and opioids mimic endorphins rather than blocking their receptors.",
            topic: "Substance Use & Addictive Disorders",
            source: "quiz-bank"
          },
          {
            stem: "A hospitalized patient is found unresponsive with pinpoint pupils and a respiratory rate of 6. What does the nurse do first?",
            options: [
              "Administer naloxone and then reassess in 30 minutes",
              "Call 9-1-1 and stay with the patient",
              "Obtain a urine drug screen to confirm the substance",
              "Open the airway, aspirate secretions and ventilate"
            ],
            answer: 3,
            rationale: "Coma, pinpoint pupils and respiratory depression are the cardinal signs of opioid overdose, and in the hospital breathing is promoted first — aspirate secretions, insert an airway, ventilate — with naloxone given alongside. Naloxone matters, but its half-life is shorter than the opioid's, so the patient is watched continuously and redosed if signs return rather than left for 30 minutes. Calling 9-1-1 is the out-of-hospital action, and confirming the substance delays treatment of an airway emergency.",
            topic: "Substance Use & Addictive Disorders",
            source: "quiz-bank"
          },
          {
            stem: "At which point does a patient in alcohol withdrawal receive chlordiazepoxide, diazepam or lorazepam?",
            options: [
              "Only once hallucinations or seizures have appeared",
              "On admission, regardless of symptoms",
              "At a CIWA-Ar score of 8 to 10 or more",
              "When the blood alcohol concentration falls below 0.08"
            ],
            answer: 2,
            rationale: "Benzodiazepines are given against the score, at a CIWA-Ar of 8 to 10 or more, often as a fixed regimen with PRN doses for breakthrough autonomic symptoms — the goals being to control agitation, decrease seizure risk, and reduce morbidity and mortality. Waiting for hallucinations or seizures forfeits the prevention the protocol exists for. Blanket dosing ignores the tool, and blood alcohol concentration measures intoxication rather than withdrawal severity.",
            topic: "Substance Use & Addictive Disorders",
            source: "quiz-bank"
          },
          {
            stem: "A patient is admitted in withdrawal from long-term benzodiazepine use. Which tool applies, and how often is it usually done?",
            options: [
              "The COWS, every 4 hours and PRN",
              "The CIWA, every 4 hours and PRN",
              "The COWS, once on admission",
              "The CIWA, once every 24 hours"
            ],
            answer: 1,
            rationale: "The CIWA is the tool for sedative-hypnotic and alcohol withdrawal, and benzodiazepines are sedative-hypnotics, so it applies here; it is usually ordered every 4 hours and repeated PRN, sometimes only 30 minutes later if the patient reports worsening symptoms. The COWS scores opioid withdrawal. A single admission score or a daily one would miss the point at which a patient crosses the medication threshold.",
            topic: "Substance Use & Addictive Disorders",
            source: "quiz-bank"
          },
          {
            stem: "A patient leaving inpatient treatment will attend a non-residential program of highly structured scheduled groups with at least one regular individual session. Which level of care is this?",
            options: [
              "A halfway house",
              "A medically managed detoxification program",
              "A partial hospitalization program",
              "An intensive outpatient program"
            ],
            answer: 3,
            rationale: "An intensive outpatient program is the non-residential, highly structured option built on scheduled treatment groups with at least one regular individual session. A halfway house is residential, substance-free communal living that allows independent growth. Detoxification is the medically managed first step, not a discharge destination. Partial hospitalization sits on the continuum too but is not the description given here.",
            topic: "Substance Use & Addictive Disorders",
            source: "quiz-bank"
          },
          {
            stem: "Which discharge action has the largest documented effect on relapse rates?",
            options: [
              "Involving relatives in the patient's treatment",
              "Providing written material on the effects of the substance",
              "Scheduling a follow-up appointment before discharge",
              "Recommending a smartphone app that tracks relapse cues"
            ],
            answer: 0,
            rationale: "Involving relatives in treatment decreases relapse rates by 20 to 50 percent, which is why family education and therapy sit in the plan rather than beside it. Teaching the nature of the illness, arranging follow-up and using apps that track behavior patterns and relapse cues all belong to discharge planning, but none of them carries a documented effect of that size.",
            topic: "Substance Use & Addictive Disorders",
            source: "quiz-bank"
          }
        ],
        medications: [
          /* naloxone */
          {
            stem: "A patient given naloxone for an opioid overdose is now awake and breathing well. What is the nurse's next priority?",
            options: [
              "Keep monitoring and be ready to repeat the dose.",
              "Start methadone to prevent the withdrawal that follows.",
              "Give naltrexone now to block the opioid from returning.",
              "Discharge once alert, since the overdose is reversed."
            ],
            answer: 0,
            rationale: "Naloxone's half-life is shorter than that of opioids, so the patient must keep being watched and the dose repeated if signs return. Naltrexone is the recovery-phase antagonist, not an overdose drug, and it requires 10 to 14 days opioid-free before the first dose. Methadone is a maintenance medication, not a step in reversing an overdose.",
            topic: "Substance Use & Addictive Disorders",
            source: "quiz-bank"
          },
          /* methadone */
          {
            stem: "A patient is beginning methadone maintenance for opioid use disorder. Which teaching is accurate?",
            options: [
              "It carries no risk of an overdose at any dose.",
              "It can be stopped all at once when the patient is stable.",
              "It is given as a long-acting intramuscular injection.",
              "Expect daily clinic visits with close monitoring."
            ],
            answer: 3,
            rationale: "Methadone must be monitored closely, with daily clinic visits. It carries significant overdose potential and dependence is still possible — it is buprenorphine that lacks methadone's overdose potential. For replacement therapy the patient is stabilized, then tapered slowly until off, to prevent more severe withdrawal. The long-acting IM injection describes naltrexone.",
            topic: "Substance Use & Addictive Disorders",
            source: "quiz-bank"
          },
          /* buprenorphine */
          {
            stem: "A patient is starting treatment for opioid use disorder under a provider's direct supervision. Which product is preferred for this induction?",
            options: [
              "Clonidine",
              "Naltrexone",
              "Buprenorphine alone",
              "Buprenorphine & naloxone"
            ],
            answer: 2,
            rationale: "Buprenorphine alone is preferred for induction, when treatment starts under a healthcare provider's supervision. Buprenorphine & naloxone is the usual switch after that initial period, once the medication is no longer taken under direct supervision. Naltrexone requires 10 to 14 days opioid-free first, and clonidine relieves withdrawal symptoms rather than serving as the treatment medication.",
            topic: "Substance Use & Addictive Disorders",
            source: "quiz-bank"
          },
          /* buprenorphine & naloxone */
          {
            stem: "A patient taking buprenorphine & naloxone at home asks what the naloxone part is for. Which explanation is accurate?",
            options: [
              "It adds a reduction in alcohol cravings to the buprenorphine.",
              "It reverses an overdose if too much of the tablet is taken.",
              "It causes withdrawal only if the medication is injected.",
              "It prevents withdrawal symptoms while the dose is tapered down."
            ],
            answer: 2,
            rationale: "Naloxone is a safety feature that discourages dissolving and injecting the medication: it is absorbed only if the medication is injected instead of dissolved in the mouth as directed, and then it causes uncomfortable withdrawal symptoms. Taken as directed, it is not absorbed, so it does not serve as a built-in overdose reversal. Reducing alcohol cravings describes naltrexone and acamprosate.",
            topic: "Substance Use & Addictive Disorders",
            source: "quiz-bank"
          },
          /* naltrexone */
          {
            stem: "A patient who last used heroin 5 days ago asks to start naltrexone today to help stay off opioids. What does the nurse explain?",
            options: [
              "It can start today, since it relieves withdrawal.",
              "It can start today, since 3 to 5 days is enough.",
              "It needs 7 days of methadone treatment first.",
              "It needs 10 to 14 days opioid-free first."
            ],
            answer: 3,
            rationale: "Naltrexone requires 10 to 14 days opioid-free before the first dose; starting sooner precipitates a rapid, severe withdrawal. It does not treat withdrawal symptoms — it blocks the effects of opioids and alcohol to reduce cravings and prevent relapse. Methadone is not a prerequisite for it.",
            topic: "Substance Use & Addictive Disorders",
            source: "quiz-bank"
          },
          /* clonidine */
          {
            stem: "A patient with delirium tremens has an elevated blood pressure. Which medication is indicated for it?",
            options: [
              "Acamprosate",
              "Clonidine",
              "Naltrexone",
              "Phentolamine"
            ],
            answer: 1,
            rationale: "In delirium tremens, elevated blood pressure is treated with clonidine, which relieves withdrawal symptoms — especially heart rate and blood pressure — in withdrawal from alcohol, opioids or nicotine. Phentolamine treats the hypertensive crisis of an MAOI. Acamprosate and naltrexone are recovery-phase medications and do not treat withdrawal.",
            topic: "Substance Use & Addictive Disorders",
            source: "quiz-bank"
          },
          /* diazepam */
          {
            stem: "Why is diazepam the benzodiazepine standard for alcohol withdrawal at UK HealthCare?",
            options: [
              "Its short half-life allows quick adjustment",
              "Its long half-life, and its effect on seizures",
              "It carries no potential for dependence",
              "It reduces alcohol cravings after withdrawal"
            ],
            answer: 1,
            rationale: "Diazepam is the current standard at UK HealthCare because its long half-life works better and it is particularly effective at decreasing seizures. A short half-life is the opposite of its advantage. Benzodiazepines do not reduce cravings — that is naltrexone and acamprosate — and they are addictive, which is why their use is limited.",
            topic: "Substance Use & Addictive Disorders",
            source: "quiz-bank"
          },
          /* lorazepam */
          {
            stem: "A patient on a scheduled diazepam regimen for alcohol withdrawal becomes delirious. Which change does the nurse anticipate?",
            options: [
              "IV lorazepam",
              "An extra oral diazepam dose",
              "IV diazepam",
              "Clonidine"
            ],
            answer: 0,
            rationale: "In delirium tremens, delirium calls for IV lorazepam. IV diazepam is the choice for seizures, oral diazepam for acute agitation, tremors, impending DTs and hallucinosis, and clonidine for elevated blood pressure — each right for a different DT finding.",
            topic: "Substance Use & Addictive Disorders",
            source: "quiz-bank"
          },
          /* disulfiram */
          {
            stem: "A patient taking disulfiram says, \"I still crave a drink every day, so this pill isn't working.\" Which response is accurate?",
            options: [
              "Cravings fade after 10 to 14 days on the medication.",
              "The dose likely needs to go up until the cravings stop.",
              "It deters drinking; it was never meant to reduce cravings.",
              "Cravings mean withdrawal is starting, so a CIWA is needed."
            ],
            answer: 2,
            rationale: "Disulfiram prevents the breakdown of acetaldehyde, so drinking while taking it produces a severely unpleasant flu-like illness; it does not reduce cravings, so ongoing cravings are not a sign it has failed. A higher dose will not change that — reducing cravings is what naltrexone and acamprosate do. The 10 to 14 days is the opioid-free period required before naltrexone.",
            topic: "Substance Use & Addictive Disorders",
            source: "quiz-bank"
          },
          /* acamprosate */
          {
            stem: "A patient in active alcohol withdrawal has acamprosate on the medication list. Which understanding should guide the nurse?",
            options: [
              "It supports abstinence in recovery; withdrawal is treated separately.",
              "It deters drinking by causing illness if alcohol is taken.",
              "It is the main treatment for the patient's withdrawal symptoms.",
              "It is given for the elevated heart rate and blood pressure."
            ],
            answer: 0,
            rationale: "Acamprosate reduces alcohol cravings and helps maintain abstinence. None of the three alcohol use disorder recovery medications treats withdrawal — those symptoms are treated symptomatically, and thiamine is replaced daily. Causing illness if alcohol is taken describes disulfiram, and heart rate and blood pressure are the focus of clonidine.",
            topic: "Substance Use & Addictive Disorders",
            source: "quiz-bank"
          },
          /* thiamine */
          {
            stem: "A patient is diagnosed with Wernicke's encephalopathy. Which thiamine regimen does the nurse expect?",
            options: [
              "Oral, once daily for 3 to 12 months",
              "IV, 2 to 3 times daily for 1 to 2 weeks",
              "IV, once weekly for 6 months",
              "IM, a single large dose on admission"
            ],
            answer: 1,
            rationale: "Wernicke's encephalopathy is treated with large IV doses of thiamine 2–3 times daily for 1–2 weeks, typically about 10 days; it is acute and reversible. Replacement for 3–12 months is the Korsakoff syndrome regimen, which is chronic and not typically reversible. Neither stage is treated with a single dose or weekly dosing.",
            topic: "Substance Use & Addictive Disorders",
            source: "quiz-bank"
          },
          /* SATA — which medications are indicated */
          {
            stem: "Which medications are indicated for opioid use disorder? Select all that apply.",
            options: [
              "Naltrexone",
              "Disulfiram",
              "Buprenorphine",
              "Buprenorphine & naloxone",
              "Acamprosate",
              "Methadone"
            ],
            answers: [0, 2, 3, 5],
            rationale: "Methadone, buprenorphine, buprenorphine & naloxone, and naltrexone are all medication-assisted treatments for opioid use disorder; naltrexone is used in alcohol use disorder as well. Acamprosate and disulfiram are alcohol use disorder medications only.",
            topic: "Substance Use & Addictive Disorders",
            source: "quiz-bank"
          },
          /* SATA — which medications are indicated */
          {
            stem: "Which medications are indicated to help a patient with alcohol use disorder maintain recovery? Select all that apply.",
            options: [
              "Diazepam",
              "Methadone",
              "Disulfiram",
              "Acamprosate",
              "Naltrexone"
            ],
            answers: [2, 3, 4],
            rationale: "Naltrexone blocks the euphoric effects of alcohol and reduces cravings, disulfiram deters drinking by causing severe illness, and acamprosate reduces cravings and helps maintain abstinence — all recovery-phase medications. Diazepam treats alcohol withdrawal rather than recovery, and methadone is an opioid use disorder medication.",
            topic: "Substance Use & Addictive Disorders",
            source: "quiz-bank"
          },
          /* SATA — which medications are indicated */
          {
            stem: "Which medications are indicated to manage alcohol withdrawal symptoms? Select all that apply.",
            options: [
              "Diazepam",
              "Buprenorphine",
              "Acamprosate",
              "Naltrexone",
              "Disulfiram",
              "Clonidine",
              "Lorazepam"
            ],
            answers: [0, 5, 6],
            rationale: "Benzodiazepines — diazepam and lorazepam — control agitation, decrease the risk of seizures, and reduce morbidity and mortality in alcohol withdrawal, and clonidine relieves withdrawal symptoms, especially heart rate and blood pressure. Acamprosate, naltrexone and disulfiram are recovery-phase medications that do not treat withdrawal, and buprenorphine is an opioid use disorder medication.",
            topic: "Substance Use & Addictive Disorders",
            source: "quiz-bank"
          }
        ],
        eaq: [
          /* Imported 2026-09-13 from the Week 3 EAQ quizzes (ticket to class, then end of week),
             in their original order and wording. Repairs are itemised in SESSION-LOG.md. */
          {
            stem: "Which term relates to what is occurring in the patient with a substance abuse disorder who no longer responds to the effect of the substance?",
            options: [
              "Addiction",
              "Tolerance",
              "Withdrawal",
              "Intoxication"
            ],
            answer: 1,
            rationale: "A patient with a substance abuse disorder who no longer responds to the effect of the substance is experiencing tolerance. Addiction is a primary chronic disease of dysregulation in the hedonic (pleasure-seeking) or reward pathway of the brain. Withdrawal is a set of physiological symptoms that occur when a person stops using a substance. Intoxication occurs when a substance is used to excess. (p. 407)",
            topic: "Substance Use & Addictive Disorders",
            source: "eaq"
          },
          {
            stem: "Which drug classification are magic mushrooms considered?",
            options: [
              "Opioids",
              "Stimulants",
              "Cannabinoids",
              "Hallucinogens"
            ],
            answer: 3,
            rationale: "Substances may be classified according to their mechanism of action. Magic mushrooms, a common street name of psilocybin, can be classified as hallucinogens for their severe hallucinogenic effects. Heroin and opium are opioids. Stimulants, cannabinoids, and opioids are other categories of substances. Cocaine, amphetamine, and methamphetamine are stimulants. They cause hyperreactivity and provide feelings of exhilaration. Marijuana and hashish are cannabinoids. (p. 412)",
            topic: "Substance Use & Addictive Disorders",
            source: "eaq"
          },
          {
            stem: "Which term is used to identify a syndrome that occurs after stopping the long-term use of a drug?",
            options: [
              "Enabling",
              "Amnesia",
              "Tolerance",
              "Withdrawal"
            ],
            answer: 3,
            rationale: "Withdrawal is a condition marked by physical and psychological symptoms that occur when a drug that has been taken for a long time is stopped or drastically reduced in dosage. Amnesia, tolerance, and enabling are not used to identify the described event. (p. 407)",
            topic: "Substance Use & Addictive Disorders",
            source: "eaq"
          },
          {
            stem: "Which substance abuse would the nurse inquire about with a patient diagnosed with mouth cancer?",
            options: [
              "Opium",
              "Alcohol",
              "Cocaine",
              "Tobacco"
            ],
            answer: 3,
            rationale: "Substance use disorders arise from cravings for drugs or other substances and eventually turn to physical addictions. Oral and injection are the common routes of administration. Addiction to tobacco causes disorders like hypertension, chronic lung disorders, and mouth cancer. These symptoms are not seen in cases of opium, alcohol, and cocaine addictions. Addiction to opium may result in constipation, hepatitis, and endocarditis. Addiction to alcohol may result in loss of consciousness, visual distortions, sexual dysfunction, and liver and heart disorders. Addiction to cocaine may result in hypertension. (pp. 408-409)",
            topic: "Substance Use & Addictive Disorders",
            source: "eaq"
          },
          {
            stem: "Which drug prescribed to a patient for treatment of alcohol addiction may be associated with intense vomiting, respiratory difficulty, and mental confusion?",
            options: [
              "Disulfiram",
              "Phenobarbital",
              "Chlordiazepoxide",
              "Acamprosate calcium"
            ],
            answer: 0,
            rationale: "Disulfiram is used for the maintenance of alcohol abstinence. However, the medication should be taken consistently to maintain the alcohol aversion. Alcohol consumption while on disulfiram leads to a toxic reaction that results in symptoms such as intense nausea, vomiting, respiratory difficulty, and mental confusion. Chlordiazepoxide is used to reduce withdrawal agitation and can cause sedation and seizures. Phenobarbital could result in sedation. Acamprosate calcium causes side effects such as itching, diarrhea, and intestinal gas. (p. 425)",
            topic: "Substance Use & Addictive Disorders",
            source: "eaq"
          },
          {
            stem: "Which chemical in tobacco causes addiction?",
            options: [
              "Opium",
              "Nicotine",
              "Cocaine",
              "Cannabinoids"
            ],
            answer: 1,
            rationale: "Nicotine is found in tobacco and causes an addictive disorder. This chemical overpowers the reward pathway circuit and releases the neurotransmitter dopamine, which gradually becomes more important than the reward of pleasure. The increased saliency of the addictive process cancels the inhibitory function of the frontal cortex, leading to craving. Opium and cocaine are other substances that cause addiction. These are not found in tobacco. Cannabinoids are the chemicals found in marijuana. (pp. 408-409, 416)",
            topic: "Substance Use & Addictive Disorders",
            source: "eaq"
          },
          {
            stem: "Which tool is used to evaluate a patient for the effectiveness of addiction treatment?",
            options: [
              "Brief Patient Health Questionnaire (Brief PHQ)",
              "Functional Assessment Screening Tool (FAST)",
              "Recovery Attitude and Treatment Evaluator (RAATE)",
              "Scale for Assessment of Negative Symptoms (SANS)"
            ],
            answer: 2,
            rationale: "The Recovery Attitude and Treatment Evaluator (RAATE) scale is used to assess substance use disorders as it is specific to substance abuse. The Brief Patient Health Questionnaire is a tool used for assessment of anxiety. The Functional Assessment Screening Tool is used to evaluate the cognitive abilities of a patient. The Scale for the Assessment of Negative Symptoms is a tool for assessing schizophrenia. (p. 116)",
            topic: "Substance Use & Addictive Disorders",
            source: "eaq"
          },
          {
            stem: "Which nursing diagnosis is the most appropriate for a patient who exhibits impulsiveness and experiences a loss of relationships and occupation because of a focus on alcohol use?",
            options: [
              "Risk for injury",
              "Hopelessness",
              "Risk for suicide",
              "Ineffective coping"
            ],
            answer: 2,
            rationale: "The nursing diagnosis that is most appropriate for a patient who exhibits impulsiveness and experiences a loss of relationships and occupation because of a focus on alcohol use is risk for suicide. The impulsive behavior is the key component that may result in the patient harming themselves. A patient at risk for injury exhibits signs that include impairment, overdose, withdrawal from substances, and hallucinations. A patient who displays hopelessness presents with a lack of initiative, is passive, and reports seeing no alternatives or personal control. Signs and symptoms of a patient with ineffective coping include the decreased use of social support, destructive behavior toward themselves and others, inadequate problem solving, poor concentration, and a reported inability to cope. (p. 423)",
            topic: "Substance Use & Addictive Disorders",
            source: "eaq"
          },
          {
            stem: "Which schedule of drugs has a high potential for abuse, are considered dangerous, and are only available by prescription?",
            options: [
              "Schedule I",
              "Schedule II",
              "Schedule III",
              "Schedule V"
            ],
            answer: 1,
            rationale: "Schedule II drugs have a high potential for abuse, are considered dangerous, and are only available by prescription. Schedule I drugs carry a high potential for abuse and have no medical use. Schedule III drugs have a low to moderate potential for misuse and are available only by prescription. Schedule V drugs contain limited quantities of certain narcotics. (p. 407)",
            topic: "Substance Use & Addictive Disorders",
            source: "eaq"
          },
          {
            stem: "Which drug represents part of an aversive therapy approach to treatment of addiction?",
            options: [
              "Disulfiram",
              "Naltrexone",
              "Quetiapine fumarate",
              "Acamprosate calcium"
            ],
            answer: 0,
            rationale: "When taking disulfiram, an individual who ingests alcohol will experience a toxic reaction that causes intense nausea and vomiting, headache, sweating, flushed skin, respiratory difficulties, and confusion. These symptoms are intended to create an aversion to the use of alcohol. Naltrexone, quetiapine fumarate, and acamprosate calcium are medications prescribed to reduce discomfort associated with withdrawal. (p. 423)",
            topic: "Substance Use & Addictive Disorders",
            source: "eaq"
          },
          {
            stem: "Which abuse-related outcome exists when a patient hospitalized after a heroin overdose shares, \"I've been using more heroin lately to get my usual high\"?",
            options: [
              "Tolerance",
              "Addiction",
              "Intoxication",
              "Withdrawal"
            ],
            answer: 0,
            rationale: "Tolerance is described as needing increasingly greater amounts of a substance to become intoxicated or finding that using the same amount over time results in a much-diminished effect. Addiction is loss of behavioral control with craving and inability to abstain, loss of emotional regulation, and loss of the ability to identify problematic behaviors and relationships. Intoxication is the effect of the drug. Withdrawal is a set of symptoms patients experience when they stop taking the drug. (p. 407)",
            topic: "Substance Use & Addictive Disorders",
            source: "eaq"
          },
          {
            stem: "Which condition is suspected when a patient is brought to the emergency department with tachycardia, hypertension, hyperthermia, dilated pupils, and heightened reflexes?",
            options: [
              "Opioid withdrawal",
              "Opioid intoxication",
              "Alcohol withdrawal",
              "Stimulant withdrawal"
            ],
            answer: 0,
            rationale: "Opioid withdrawal manifests as a set of physiological symptoms that begin to occur when the concentration of opium decreases in the patient's bloodstream. It is characterized by tachycardia, hypertension, and hyperthermia. These symptoms are not caused by opioid intoxication, alcohol withdrawal, or stimulant withdrawal. Opioid intoxication is characterized by decreased heart rate, blood pressure, body temperature, body reflexes, and pinpoint pupils. Alcohol withdrawal is characterized by restlessness, irritability, impairment in functioning, and trembling. Stimulant withdrawal is characterized by depression, poor concentration, and paranoia. (p. 413)",
            topic: "Substance Use & Addictive Disorders",
            source: "eaq"
          },
          {
            stem: "Which need has the highest priority when caring for a patient who is intoxicated from alcohol?",
            options: [
              "Self-esteem needs",
              "Safety and security",
              "Physiological stability",
              "Cultural preferences"
            ],
            answer: 1,
            rationale: "When caring for a patient intoxicated from alcohol, safety is the highest priority because the patient is at imminent risk for injury due to impaired judgment, coordination, and level of consciousness. Although physiological needs are fundamental according to Maslow's hierarchy, in acute alcohol intoxication the immediate concern is preventing harm from falls, aspiration, or erratic behavior. Physiological stability is the second highest priority. Self-esteem needs and cultural preferences do not hold the highest priority for care. (p. 424)",
            topic: "Substance Use & Addictive Disorders",
            source: "eaq"
          },
          {
            stem: "Which information given by the nurse is appropriate about disulfiram?",
            options: [
              "\"You may experience adverse effects if you consume alcohol.\"",
              "\"You may experience nausea during the course of medication.\"",
              "\"You may experience seizures during the course of medication.\"",
              "\"You may experience sedation during the course of medication.\""
            ],
            answer: 0,
            rationale: "Disulfiram is used to treat substance abuse in patients. It is helpful in the period of maintenance. However, the patient should be sure to avoid consuming alcohol during the course of medication. The drug reacts with alcohol to form a toxic reaction, resulting in gastrointestinal and respiratory disorders. Nausea, seizures, and sedation are not observed in the course of medication. Nausea is observed when a patient consumes alcohol during the course of drug therapy. Seizures and sedation are observed during the course of medications like chlordiazepoxide, phenobarbital, and diazepam. (p. 425)",
            topic: "Substance Use & Addictive Disorders",
            source: "eaq"
          },
          {
            stem: "Which drug would the nurse suspect the patient is abusing when multiple injection marks are observed on the arm?",
            options: [
              "Opium",
              "Heroin",
              "Hashish",
              "Mescaline"
            ],
            answer: 1,
            rationale: "Heroin is a highly addictive, illicit, and rapidly acting opioid drug synthesized from morphine, a natural substance extracted from the seed pod of certain opium poppy plants. It acts as a central nervous system depressant, binding to opioid receptors in the brain to produce intense euphoria, pain relief, and sedation. It is typically injected, smoked, or snorted. Opium, hashish, and mescaline are usually swallowed or smoked. (pp. 408-409)",
            topic: "Substance Use & Addictive Disorders",
            source: "eaq"
          },
          {
            stem: "Which type of drug causes increased mental alertness?",
            options: [
              "Alcohol",
              "Opioids",
              "Stimulants",
              "Cannabinoids"
            ],
            answer: 2,
            rationale: "Stimulants have a stimulating effect that increases energy, heart rate, and mental alertness. Alcohol can cause mild stimulation and relaxation but in higher doses causes impaired memory. Opioids cause impaired coordination, confusion, and drowsiness. Cannabinoids cause relaxation, disturbed balance and coordination, and impaired memory and learning. (p. 416)",
            topic: "Substance Use & Addictive Disorders",
            source: "eaq"
          },
          {
            stem: "Which information is important for the nurse to understand when initiating the use of naltrexone prescribed for alcohol relapse prevention?",
            options: [
              "The tablets will be taken three times a day.",
              "Medication can begin on the fifth day of abstinence from alcohol.",
              "The patient needs to be opiate-free for 10 days before starting the medication.",
              "The patient must avoid all alcohol and substances such as cough syrup and mouthwash containing alcohol."
            ],
            answer: 2,
            rationale: "It is important that the nurse ensure the patient is opiate-free for 10 days before starting naltrexone for alcohol relapse prevention. Acamprosate calcium tablets are taken three times a day and initiated on the fifth day of abstinence from alcohol. The patient prescribed disulfiram should avoid all alcohol and substances such as cough syrup and mouthwash containing alcohol. (p. 425)",
            topic: "Substance Use & Addictive Disorders",
            source: "eaq"
          },
          {
            stem: "Which withdrawal symptom is anticipated after administration of naloxone for opioid overdose? Select all that apply.",
            options: [
              "Yawning",
              "Rhinorrhea",
              "Nystagmus",
              "Lacrimation",
              "Piloerection"
            ],
            answers: [0, 1, 3, 4],
            rationale: "Withdrawal symptoms the nurse can anticipate include yawning, rhinorrhea, lacrimation, and piloerection. Nystagmus occurs in patients experiencing phencyclidine intoxication. (p. 413)",
            topic: "Substance Use & Addictive Disorders",
            source: "eaq"
          },
          {
            stem: "Which type of substance abuse is suspected when nasal damage is present in a patient with a drug addiction?",
            options: [
              "Opium",
              "Cocaine",
              "Hashish",
              "Lysergic acid diethylamide (LSD)"
            ],
            answer: 1,
            rationale: "Cocaine is a stimulant and is administered by smoking, injecting, or snorting. Snorting cocaine causes nasal damage. Opium is an opioid that is swallowed or smoked. Hashish is a cannabinoid that is smoked or swallowed. LSD is a hallucinogen that is swallowed or absorbed through tissues in the mouth. (pp. 408-409)",
            topic: "Substance Use & Addictive Disorders",
            source: "eaq"
          },
          {
            stem: "Which sign would the nurse emphasize when discussing opioid withdrawal during an educational session for parents of children with a history of opioid abuse? Select all that apply.",
            options: [
              "Sweating",
              "Runny nose",
              "Sleeplessness",
              "Slurred speech",
              "Enlarged pupils"
            ],
            answers: [0, 1, 2, 4],
            rationale: "The nurse should educate the family about signs of opioid withdrawal which include dilated pupils, insomnia, diaphoresis, and rhinorrhea. Slurred speech is associated with opioid intoxication. (p. 413)",
            topic: "Substance Use & Addictive Disorders",
            source: "eaq"
          },
          {
            stem: "Which substance is most likely being abused when a patient describes experiences of having blackouts?",
            options: [
              "Alcohol",
              "Cocaine",
              "Mescaline",
              "Psilocybin"
            ],
            answer: 0,
            rationale: "Chronic abuse of alcohol is associated with blackouts (periods for which the patient has no memory). Abuse of cocaine produces feelings of euphoria. Abuse of mescaline and psilocybin causes alterations in perception. (p. 420)",
            topic: "Substance Use & Addictive Disorders",
            source: "eaq"
          },
          {
            stem: "Which statement is true regarding substance addiction? Select all that apply.",
            options: [
              "Intoxication occurs as a result of years of substance use.",
              "Addiction is the result of emotional, not physical, factors.",
              "Behavioral addictions involve the same physical signs as drug addiction.",
              "Addiction is chronic with cycles of relapse and remission.",
              "The term commonly used to describe substance use disorders is \"addiction.\""
            ],
            answers: [3, 4],
            rationale: "A term that people commonly use to describe substance use disorders is addiction. Addiction is a chronic, physical medical condition with roots in the environment, neurotransmission, genetics, and life experiences. Behavioral addictions, also called process addictions, do not involve the same physical signs as drug addiction; however, compulsive actions do activate the reward or pleasure pathways in the brain similarly to substances. When people are in the process of using a substance to excess, they are said be experiencing intoxication. (p. 407)",
            topic: "Substance Use & Addictive Disorders",
            source: "eaq"
          },
          {
            stem: "Which cognitive-behavioral therapy is indicated in a patient with an addiction?",
            options: [
              "Enhance motivation in the patient.",
              "Allow a sustainable recovery lifestyle.",
              "Break the denial behavior of the patient.",
              "Identify irrational core beliefs in the patient."
            ],
            answer: 3,
            rationale: "Cognitive-behavioral therapy is conducted for a patient who has an addiction to identify irrational core beliefs. Motivational interviewing is a technique that helps assess the status of the patient and break denial while enhancing motivation. Mindfulness and meditation are helpful in sustaining a recovery lifestyle. Cognitive-behavioral therapy aids the patient in exploring thought patterns so that core beliefs can be analyzed. (p. 424)",
            topic: "Substance Use & Addictive Disorders",
            source: "eaq"
          },
          {
            stem: "Which common substance is abused through swallowing? Select all that apply.",
            options: [
              "Opium",
              "Heroin",
              "Alcohol",
              "Nicotine",
              "Marijuana"
            ],
            answers: [0, 2, 4],
            rationale: "The substances that are abused by swallowing include opium, alcohol, and marijuana. Opium is an opioid that can be swallowed and smoked. Alcohol is found in liquor, beer, and wine and is abused through swallowing. Marijuana is a cannabinoid and can be swallowed and smoked. Heroin is an opioid and can be injected, snorted, and smoked. Nicotine is the main ingredient in tobacco and is smoked, snorted, or chewed. (pp. 408-409)",
            topic: "Substance Use & Addictive Disorders",
            source: "eaq"
          },
          {
            stem: "Which type of facility would best support the needs of an impaired patient who needs long-term help related to hallucinogen abuse?",
            options: [
              "Halfway house",
              "Partial hospitalization",
              "Intensive outpatient program",
              "Residential rehabilitation center"
            ],
            answer: 3,
            rationale: "A patient with severe impairment as a result of hallucinogen abuse can receive long-term professional medical care in a residential rehabilitation center. Residents of halfway houses reside at the house but continue working outside. These patients may be more vulnerable to relapse. Partial hospitalization provides a combination of psychotherapy and educational groups without having to reside at the hospital but is not the best support for the patient who is severely impaired. An intensive outpatient program is a nonresidential setup that only provides medication oversight, and this would not be the best choice to a patient who is severely impaired. (p. 426)",
            topic: "Substance Use & Addictive Disorders",
            source: "eaq"
          },
          {
            stem: "Which finding can be observed with cocaine withdrawal? Select all that apply.",
            options: [
              "Fatigue",
              "Depression",
              "Increased energy",
              "Poor concentration",
              "Decreased appetite"
            ],
            answers: [0, 1, 3],
            rationale: "Cocaine is a stimulant, and its withdrawal may cause symptoms opposite to the stimulant effect. These include fatigue, depression, and poor concentration. Cocaine overdose may cause increased energy and decreased appetite as a result of its stimulant effect. (p. 416)",
            topic: "Substance Use & Addictive Disorders",
            source: "eaq"
          },
          {
            stem: "Which symptom is an effect of mild alcohol withdrawal? Select all that apply.",
            options: [
              "Anorexia",
              "Insomnia",
              "Restlessness",
              "Hypersensitivity",
              "Grand mal seizures"
            ],
            answers: [0, 1, 2],
            rationale: "Mild alcohol withdrawal occurs as the alcohol concentration in the blood slightly reduces. It can lead to anorexia or loss of appetite, insomnia or lack of sleep, and restlessness. Hypersensitivity to noise and light and grand mal seizures occur in extreme cases of severe alcohol withdrawal as the alcohol concentration in the blood is greatly reduced. (p. 419)",
            topic: "Substance Use & Addictive Disorders",
            source: "eaq"
          },
          {
            stem: "Which health effect of high quantities of alcohol would the nurse expect to find in the patient? Select all that apply.",
            options: [
              "Drowsiness",
              "Constipation",
              "Slurred speech",
              "Loss of coordination",
              "Low body temperature"
            ],
            answers: [0, 2, 3, 4],
            rationale: "High doses of alcohol adversely affect the nervous system and may cause drowsiness, slurred speech, loss of coordination, and reduction in body temperature. These effects are the result of the depressive action of alcohol on the brain and the nervous system. Constipation is an aftereffect seen with the intake of opium. (p. 408)",
            topic: "Substance Use & Addictive Disorders",
            source: "eaq"
          },
          {
            stem: "Which statement provides accurate information after a patient states, \"I have been smoking pot for several years to help me sleep, and I want to quit\"?",
            options: [
              "\"You may experience insomnia and disturbing dreams.\"",
              "\"Marijuana has very little effect on the quality of your sleep.\"",
              "\"You may gain some weight after you quit.\"",
              "\"You should not experience any symptoms if you only smoke it at night.\""
            ],
            answer: 0,
            rationale: "When people use cannabis as a sleep aid, insomnia and disturbing dreams may ensue without it. Cannabis causes drowsiness and impairs motor skills for 8 to 10 hours. Cannabis use increases the appetite, and weight loss can occur upon withdrawal. The patient will experience some symptoms after a prolonged use of the drug, even if use has only been at night. (p. 412)",
            topic: "Substance Use & Addictive Disorders",
            source: "eaq"
          },
          {
            stem: "Which form of substance abuse is suspected in a patient who has significant dental problems?",
            options: [
              "Opiates",
              "Alcohol",
              "Inhalants",
              "Methamphetamines"
            ],
            answer: 3,
            rationale: "Abuse of methamphetamine is associated with severe dental problems. If opiates are injected, damage to the skin and veins occurs. Alcohol abuse is associated with gastrointestinal erosion, as well as other physiological consequences. Abuse of inhalants is damaging to the respiratory tract. (pp. 408-409)",
            topic: "Substance Use & Addictive Disorders",
            source: "eaq"
          },
          {
            stem: "Which statement describes the correct way to deal with transference or countertransference for patient care in substance use disorders?",
            options: [
              "A nurse remains objective throughout the process.",
              "A residential care facility is needed for monitoring.",
              "An ongoing evaluation of the patient may not be necessary.",
              "A new nurse will take over the responsibility of patient care in each session."
            ],
            answer: 0,
            rationale: "The nurse remains cautious about personal thoughts, opinions, and feelings and remains objective throughout the process. A therapeutic relationship should be established between the nurse and the patient. A residential care facility is needed depending on the patient's health-related issues. This has no effect on the nurse–patient relationship. An ongoing evaluation of the process must be conducted to eliminate transference or countertransference. This is done to maintain the objectivity of the treatment process and teach the patient new skills to acquire a healthy lifestyle after recovery. There is no need to introduce a new nurse in each session. (p. 423)",
            topic: "Substance Use & Addictive Disorders",
            source: "eaq"
          },
          {
            stem: "Which statement explains how the advanced practice nurse integrates motivational interviewing as a tool in the treatment plan of a patient with a substance use disorder?",
            options: [
              "It introduces an alternative treatment process that is parallel to the current treatment process.",
              "It assesses the substance-related disorder and determines if other comorbidities are present.",
              "It modifies the current treatment process by allowing the nurse to evaluate the process frequently and gives input related to healthcare.",
              "It helps the advanced practice nurse assess the stage of change the patient is in and match it with an appropriate treatment process."
            ],
            answer: 3,
            rationale: "An advanced practice nurse first understands the change that is occurring in the individual as it relates to the patient's substance use disorder. Then the nurse assists the patient in correlating the change in the individual with the treatment process. A nurse works as a part of the treatment process rather than introducing an alternative plan. A nurse assists the patient to develop coping skills and motivates the patient to follow the treatment plan. The evaluation of the treatment plan is not a part of counseling. The assessment of substance use disorder and comorbidities is done after the screening, and based on that assessment, the counseling starts. (p. 424)",
            topic: "Substance Use & Addictive Disorders",
            source: "eaq"
          },
          {
            stem: "Which initial brief intervention is appropriate for a patient addicted to cigarettes?",
            options: [
              "Give feedback to the patient about personal risk.",
              "Provide information about smoking cessation tools.",
              "Set agreeable goals for reducing cigarette smoking.",
              "Arrange a follow-up or specialty referral for the patient."
            ],
            answer: 0,
            rationale: "The nurse can begin an effective intervention for a patient who is addicted to cigarettes by first providing feedback to the patient about personal risk. This first step helps the patient understand the benefits of smoking cessation. Setting agreeable goals for reducing smoking is a follow-up intervention once the patient is ready to begin cessation. The nurse should later arrange a follow-up or specialty referral for the patient and provide information regarding tools that may help the patient quit smoking. (pp. 408-409)",
            topic: "Substance Use & Addictive Disorders",
            source: "eaq"
          },
          {
            stem: "Which clinical feature is assessed with fetal alcohol syndrome? Select all that apply.",
            options: [
              "Spina bifida",
              "Short stature",
              "Microcephaly",
              "Renal agenesis",
              "Craniofacial malformations"
            ],
            answers: [1, 2, 4],
            rationale: "Clinical features of fetal alcohol syndrome include short stature, microcephaly, and craniofacial malformations. Spina bifida and renal agenesis are not associated with fetal alcohol syndrome. (p. 420)",
            topic: "Substance Use & Addictive Disorders",
            source: "eaq"
          },
          {
            stem: "Which symptom in a patient abusing stimulants creates a risk for suicide? Select all that apply.",
            options: [
              "Hallucinations",
              "Impulsiveness",
              "Social isolation",
              "Loss of occupation",
              "Elevated temperature"
            ],
            answers: [1, 2, 3],
            rationale: "Impulsiveness decreases the decision-making abilities and increases the patient's risk for suicide. Social isolation and loss of occupation can make the patient feel depressed and lonely, which increases the patient's risk for suicide. Hallucinations are altered perceptions, which may interfere with clear thinking and increase the patient's risk for injuries. Elevated temperature increases the patient's risk for injuries. (p. 416)",
            topic: "Substance Use & Addictive Disorders",
            source: "eaq"
          },
          {
            stem: "Which statement supports that the patient may be developing a tolerance? Select all that apply.",
            options: [
              "\"Over the years it has taken more alcohol to get me drunk.\"",
              "\"If I don't drink my usual amount of alcohol, I get nervous and jumpy.\"",
              "\"I've learned that I may develop a tolerance for my heart medicine.\"",
              "\"Drinking a bottle of wine today doesn't affect me like it did 5 years ago.\"",
              "\"I need to tell my healthcare provider that my antidepressant isn't working like it did.\""
            ],
            answers: [0, 2, 3, 4],
            rationale: "People with addictions experience tolerance to the effects of their respective substances. Tolerance is either needing increasing amounts of a substance to receive the desired result or finding that using the same amount over time results in a much-diminished effect. Some prescribed medications might have the same effect, such as some antianxiety medications, analgesics, and beta-blockers. Even antidepressants may result in tolerance. Withdrawal is a set of physiological symptoms such as nervousness and jitters that begin to occur as the concentration of the chemical decreases in an individual's bloodstream. It will be specific to the substance ingested, and each substance will have its own characteristic syndrome. (p. 407)",
            topic: "Substance Use & Addictive Disorders",
            source: "eaq"
          },
          {
            stem: "Which statement reflects a codependent attitude toward the addiction of a family member? Select all that apply.",
            options: [
              "\"I'll handle paying the family bills.\"",
              "\"He can't be relied upon to be there on time.\"",
              "\"A good spouse doesn't leave when things get difficult.\"",
              "\"If I had been there, I could have stopped the drinking.\"",
              "\"I can't have my children growing up in this environment.\""
            ],
            answers: [0, 2, 3],
            rationale: "Understanding the process of addiction from a family perspective requires careful attention to the family. Codependence is a cluster of behaviors originally identified through research involving the families of patients who misused alcohol. People who are codependent often exhibit overresponsible behavior: doing for others what others could just as well do for themselves. Symptomatic of codependence is valuing oneself by what one does, what one looks like, and what one has, rather than by who one is. People who are codependent often define their self-worth in terms of caring for others to the exclusion of their own needs. Not relying on a spouse or not wanting children to be affected by addiction expresses dissatisfaction with the situation and recognition of its problems, not codependence. (p. 423)",
            topic: "Substance Use & Addictive Disorders",
            source: "eaq"
          }
        ]
      }
    },

    /* ==========================================================
       TOPIC 12 — PERSONALITY DISORDERS  (Week 3)
       7 mustKnow, one per Learning Outcomes bullet on
       must-know.html#personality. 10 extraPractice from the cluster
       table and the per-disorder sections of the topic page.

       The clicker questions on week3-lecture-review.html already test
       recognition of borderline, obsessive-compulsive, schizoid,
       antisocial, paranoid and narcissistic presentations, so nothing
       here re-tests those. The questions below work on the cluster
       taxonomy, the disorders the clicker set never reaches, and
       nursing care.
       ========================================================== */
    {
      id: "week3-personality",
      label: "Personality Disorders",
      week: 3,
      sets: {
        mustKnow: [
          {
            stem: "What turns a personality trait into a personality disorder?",
            options: [
              "The trait becomes noticeable to other people",
              "The trait first appears in adulthood rather than developing early in life, when traits normally form",
              "The trait deviates markedly from cultural expectation, turns rigid and inflexible, and impairs functioning",
              "The trait persists after treatment for another mental health condition"
            ],
            answer: 2,
            rationale: "Traits are patterns a person is born with or develops early, largely outside their awareness; they become a disorder when they deviate markedly from cultural expectation, become rigid and inflexible, and produce maladaptive behavior, impaired functioning and distress, with dysfunction across cognition, impulse control, relationships and affect. Visibility to others is not the test, the pattern is enduring rather than new in adulthood, and persistence after treatment for something else is not what defines it.",
            topic: "Personality Disorders",
            source: "quiz-bank"
          },
          {
            stem: "Which disorders make up Cluster C?",
            options: [
              "Paranoid, schizoid and schizotypal",
              "Dependent, obsessive-compulsive and avoidant",
              "Borderline, antisocial, histrionic and narcissistic",
              "Schizotypal, borderline and dependent"
            ],
            answer: 1,
            rationale: "The DSM-5 sorts 10 personality disorders into three clusters, and Cluster C is the anxious or fearful group: dependent, obsessive-compulsive and avoidant — the party is DOA. Cluster A is the odd or eccentric group, paranoid, schizoid and schizotypal. Cluster B is the dramatic, emotional and erratic group, borderline, antisocial, histrionic and narcissistic. Symptoms do overlap across clusters, but the membership itself does not.",
            topic: "Personality Disorders",
            source: "quiz-bank"
          },
          {
            stem: "Which behaviors are characteristic of dependent personality disorder? Select all that apply.",
            options: [
              "Difficulty making everyday decisions without reassurance",
              "Avoiding activities involving contact with others for fear of criticism",
              "Intense anxiety when left alone, even briefly",
              "Staying in an unhealthy or abusive relationship rather than being alone",
              "Preoccupation with orderliness and control at the expense of flexibility"
            ],
            answers: [0, 2, 3],
            rationale: "Dependent personality disorder is submissive, clinging behavior driven by an overwhelming need to be cared for: the person distrusts their own judgment, struggles to start projects or decide alone, becomes intensely anxious when left even briefly, and will go to great lengths to keep a relationship, urgently seeking a new one if it ends. Avoiding contact for fear of criticism is avoidant, and preoccupation with orderliness and control is obsessive-compulsive — the two Cluster C disorders most easily confused with it.",
            topic: "Personality Disorders",
            source: "quiz-bank"
          },
          {
            stem: "A patient whose mother has a personality disorder develops one herself after a violent assault. Which explanation fits?",
            options: [
              "The disorder was inherited directly from her mother, as personality disorders are genetically transmitted",
              "The assault alone caused it, since trauma is the only established cause",
              "Neurotransmitters regulate temperament, so the disorder reflects a chemical imbalance",
              "The diathesis-stress model — a biological predisposition plus a stressor that brings out the disorder"
            ],
            answer: 3,
            rationale: "The diathesis-stress model pairs a genetic or biological predisposition with a stressor that brings the actual disorder out, which is what this history shows. Personality traits are inherited but the disorders themselves are not, so direct transmission is wrong. Trauma is a major risk factor rather than the only cause, and while neurotransmitters do regulate and influence temperament, that is one contributing theory rather than an account of this patient.",
            topic: "Personality Disorders",
            source: "quiz-bank"
          },
          {
            stem: "Why is short-term treatment focused on problem-solving, social skills and coping increasingly used for personality disorders?",
            options: [
              "Restructuring a personality takes years of psychotherapy, time and money",
              "Personality disorders resolve on their own within several months",
              "Medications have replaced psychotherapy as the long-term treatment of choice",
              "Insight-oriented therapy is contraindicated in personality disorders"
            ],
            answer: 0,
            rationale: "Restructuring a personality through psychotherapy takes years and considerable expense, so treatment increasingly targets immediate problem-solving, social skills and coping skills, alongside DBT, family education, social skills groups and group therapy. These disorders do not resolve on their own. Medications are rarely indicated long-term — they are used briefly to keep patients safe and to manage anxiety or psychotic symptoms — so they have replaced nothing.",
            topic: "Personality Disorders",
            source: "quiz-bank"
          },
          {
            stem: "Two patients carry the same personality disorder diagnosis. What most determines the difference in their prognosis?",
            options: [
              "Which cluster the diagnosis belongs to — A, B or C",
              "The age at which the pattern was first noticed by others",
              "The degree of impairment and the person's motivation for help",
              "Whether medication is prescribed as part of long-term treatment"
            ],
            answer: 2,
            rationale: "Prognosis rests on the degree of impairment and on motivation — the patient has to want change — and the current view is that these disorders are treatable, because people keep growing and changing throughout life. The obstacle is that many do not believe a problem exists, do not see themselves as its cause, or are unaware their behavior is unusual. Cluster membership, age at recognition and long-term medication are not what the outcome turns on.",
            topic: "Personality Disorders",
            source: "quiz-bank"
          },
          {
            stem: "A patient with borderline personality disorder tells the nurse she is the only one on the unit who understands, and that the other nurses are useless. What should the nurse do?",
            options: [
              "Accept the compliment and agree to be the patient's primary contact",
              "Recognize splitting and keep limits consistent across the staff",
              "Tell the patient the statement is manipulative and end the conversation",
              "Document the other nurses' failings and report them to the manager"
            ],
            answer: 1,
            rationale: "Splitting is a defense mechanism in which the person cannot integrate positive and negative feelings, so people and situations are all good or all bad — the same nurse may be the best they have ever had and then, after one perceived slight, the worst. The care is consistency and reliability across the team, which also counters the fear of abandonment. Accepting the role feeds the split, and naming the patient manipulative damages the relationship rather than setting a limit.",
            topic: "Personality Disorders",
            source: "quiz-bank"
          }
        ],
        medications: [],
        eaq: [
          /* Imported 2026-09-13 from the Week 3 EAQ quizzes (ticket to class, then end of week),
             in their original order and wording. Repairs are itemised in SESSION-LOG.md. */
          {
            stem: "Which information would the nurse include when providing education on personality disorders to a newly diagnosed patient?",
            options: [
              "Personalities are fixed.",
              "Personality disorders are difficult to treat.",
              "Personalities are unable to be altered after age 30.",
              "Patients can be taught more adaptive social functioning."
            ],
            answer: 3,
            rationale: "Until quite recently, it was believed that personalities were fairly fixed entities. More contemporary views challenge this notion. Rather than being set like plaster, the rate of personality change slows over time but does not cease. Because personality traits evolve continually across the life span, the healthcare team has the opportunity to help the patient develop and support more adaptive functioning and social relationships. Personalities are not fixed. Telling the patient personality disorders are difficult to treat does not address their concern and is not appropriate. Personalities are able to be altered after age 30. (p. 451)",
            topic: "Personality Disorders",
            source: "eaq"
          },
          {
            stem: "Which behavior does dialectical behavioral therapy target for an antisocial personality disorder?",
            options: [
              "Passive",
              "Suicidal",
              "Assertive",
              "Dependent"
            ],
            answer: 1,
            rationale: "Dialectical behavioral therapy targets three behaviors, which include the quality of life behaviors, therapy interfering behaviors, and suicidal behavior. Passive, dependent, and assertive behaviors are not characteristic of patient with an antisocial personality disorder. (p. 464)",
            topic: "Personality Disorders",
            source: "eaq"
          },
          {
            stem: "Which type of therapy is included in the treatment plan for a patient with an antisocial personality disorder?",
            options: [
              "Somatic",
              "Exposure",
              "Expressive arts",
              "Dialectical behavioral"
            ],
            answer: 3,
            rationale: "Dialectical behavior therapy, which is similar to cognitive-behavioral therapy, focuses on regulating emotions and being mindful; it is also useful in treating antisocial personality disorder. Somatic, exposure, and expressive arts therapies are not types of therapy included in the treatment of antisocial personality disorder. (p. 464)",
            topic: "Personality Disorders",
            source: "eaq"
          },
          {
            stem: "Which statement is true of pharmacological therapies for treatment of personality disorders?",
            options: [
              "Research has shown that psychotropic drugs have not been shown to be effective in treating personality disorders.",
              "Patients with narcissistic personality disorder and obsessive-compulsive personality disorder benefit from the use of antianxiety medications along with use of selective serotonin reuptake inhibitors (SSRIs).",
              "Patients with personality disorders benefit from specific off-label uses of antipsychotics, mood stabilizers, and antidepressants.",
              "Patients with personality disorders are resistant to taking medications, and providers therefore often do not prescribe psychotropic drugs to these patients."
            ],
            answer: 2,
            rationale: "At this time in the United States, there are no medications approved by the Food and Drug Administration (FDA) for treating personality disorders. Prescribers are using the medications \"off-label\" until evidence-based pharmacotherapies are proven to be safe and effective. There is evidence that mood stabilizers, antidepressants, and atypical antipsychotics are helpful in specific personality disorders. Pharmacological evidence is lacking for the treatment of persons with narcissistic and obsessive-compulsive personality disorders. Although patients with personality disorders usually do not like taking medicine unless it calms them down and are fearful about taking something over which they have no control, providers do attempt to mediate symptoms with psychotropic agents for improved quality of life. (pp. 464, 467)",
            topic: "Personality Disorders",
            source: "eaq"
          },
          {
            stem: "A nurse caring for a patient with a dependent personality disorder begins avoiding the patient because of the patient's repeated states of crisis and demand for extra time. Which term would be used to describe what has occurred in the nurse–patient relationship?",
            options: [
              "Projection",
              "Conversion disorder",
              "Defense mechanism",
              "Countertransference"
            ],
            answer: 3,
            rationale: "Countertransference occurs when the feeling of wanting to avoid the patient is based on prior interaction with the patient. Projection is a psychological defense mechanism in which individuals attribute characteristics they find unacceptable in themselves to another person. A conversion disorder consists of neurological symptoms or deficits that develop unconsciously and cannot be explained by medical evaluation. A defense mechanism is an unconscious way to cope with anxiety. (p. 456)",
            topic: "Personality Disorders",
            source: "eaq"
          },
          {
            stem: "Which medication would the nurse anticipate incorporating into the plan of care for a patient diagnosed with antisocial personality disorder displaying aggressive behavior?",
            options: [
              "Fluoxetine",
              "Clonazepam",
              "Valproic acid",
              "Methylphenidate"
            ],
            answer: 2,
            rationale: "The nurse can anticipate a prescription for valproic acid, which will help with aggression, depression, and impulsivity. Fluoxetine may be administered to decrease irritability and help with anxiety and depression. Clonazepam is a benzodiazepine that may help with anxiety but should be used with caution because it is an addictive agent. Methylphenidate is used if there is a comorbidity of attention-deficit/hyperactivity disorder (ADHD). (p. 467)",
            topic: "Personality Disorders",
            source: "eaq"
          },
          {
            stem: "Which term describes the behavior of a cluster B personality disorder?",
            options: [
              "Odd",
              "Anxious",
              "Aggressive",
              "Antagonistic"
            ],
            answer: 3,
            rationale: "The behavior of a cluster B personality disorder is described as antagonistic, such as being deceitful and manipulative for personal gain or hostile if one's needs are blocked. The behaviors in a cluster A personality disorder are described as odd or eccentric. Anxious or fearful behavior is descriptive of a cluster C personality disorder. Aggressive or destructive behaviors are not descriptive of any cluster of personality disorders. (p. 457)",
            topic: "Personality Disorders",
            source: "eaq"
          },
          {
            stem: "Which personality disorder is most common among population samples in the community?",
            options: [
              "Avoidant",
              "Paranoid",
              "Histrionic",
              "Narcissistic"
            ],
            answer: 3,
            rationale: "The prevalence of narcissistic personality disorder ranges from 0% to up to 6% in community samples. Avoidant personality disorder occurs in 2.4% of community samples. Paranoid personality disorder is seen in 2% to 4% of community samples. Histrionic personality disorder is seen in 2% of community samples. (p. 452)",
            topic: "Personality Disorders",
            source: "eaq"
          },
          {
            stem: "Which type of dialectical behavior therapy (DBT) for borderline personality disorder aims to reduce a person's destructive behavior?",
            options: [
              "Aftercare therapy",
              "Inpatient treatment",
              "Outpatient skills group",
              "Intensive outpatient treatment"
            ],
            answer: 3,
            rationale: "During the intensive outpatient treatment phase of DBT, the aim is to reduce the patient's destructive behaviors, such as property damage. Aftercare therapy helps the person improve quality of life skills and reinforces adaptive behaviors. During inpatient treatment, the goal is primarily to reduce the risk of suicide. DBT provided in the outpatient skills group aims at helping the patient stabilize, acquire skills for behavioral function, and become more functional. (pp. 459, 464)",
            topic: "Personality Disorders",
            source: "eaq"
          },
          {
            stem: "The nurse explains to a patient with a borderline personality disorder that the patient's former psychiatrist resigned, and a new psychiatrist has been hired. Which patient reaction would the nurse anticipate?",
            options: [
              "Rage",
              "Silence",
              "Anxiety",
              "Withdrawal"
            ],
            answer: 0,
            rationale: "An individual with a borderline personality disorder tends to experience anger or rage when feeling rejected or ignored. Silence, anxiety, and withdrawal are not expected reactions. (pp. 459-460)",
            topic: "Personality Disorders",
            source: "eaq"
          },
          {
            stem: "Which behavioral characteristic would the nurse associate with a patient diagnosed with antisocial personality disorder?",
            options: [
              "Lack of empathy",
              "Preoccupation with detail",
              "Avoidance of interpersonal contact",
              "A need for others to assume responsibility for decision making"
            ],
            answer: 0,
            rationale: "Antisocial patients have no conscience. Their sense of right and wrong is impaired, and they tend to do whatever serves them best without consideration for the rights or feelings of others. Individuals with obsessive-compulsive disorder (OCD) have a preoccupation with detail. Individuals with avoidant personality disorder avoid interpersonal contact. Individuals with dependent personality disorder need for others to assume responsibility for decision making. (p. 464)",
            topic: "Personality Disorders",
            source: "eaq"
          },
          {
            stem: "Which assessment datum regarding a patient's childhood may relate to a patient's borderline personality disorder?",
            options: [
              "Sleeping most of the time at the age of 0 to 1 month",
              "Starting to explore their environment at the age of 11 to 18 months",
              "Getting emotional support from their parents at the age of 2 to 5 years",
              "Seeking emotional support from their parent at the age of 18 to 24 months"
            ],
            answer: 3,
            rationale: "Patients with borderline personality disorder may have disrupted childhoods, which means that there is a lack of attachment with the primary caregiver. At the age of 18 to 24 months, a child moves away from the parent and tries to become independent. The child does not require emotional support but comes back to the parent for emotional refueling. This phase is called rapprochement. Disruption or the lack of attachment in this phase can be crucial for causing personality disorders. At the age of 0 to 1 month, the infant spends most of their time sleeping. The child learns to walk and starts exploring things between 11 to 18 months of age. When the child reaches the ages of 2 to 5 years, the child becomes an individual and does not seek emotional support from the parent. However, the child is confident to get support from their parent whenever needed. (p. 460)",
            topic: "Personality Disorders",
            source: "eaq"
          },
          {
            stem: "Which statement about persons diagnosed with personality disorders is accurate?",
            options: [
              "Patients readily recognize their problems and seek professional assistance.",
              "Extended hospitalization is the best intervention and commonly needed for stabilization.",
              "Patients display significant challenges in self-identity and have problems with intimacy within their relationships.",
              "Research has produced multiple medications that effectively manage symptoms of personality disorders."
            ],
            answer: 2,
            rationale: "The presence of a personality disorder interferes with, or complicates, social and interpersonal function. Individuals who meet criteria for these disorders have problems with self-identity and empathy or intimacy within their relationships. Persons diagnosed with personality disorders tend not to perceive themselves as having a problem but instead believe their problems are caused by how others behave toward them. Although short-term hospitalization may sometimes be necessary when acute problems occur, extended hospitalizations tend to be counterproductive for this population. In the United States, there are no medications approved by the Food and Drug Administration (FDA) specifically for treating personality disorders; however, some healthcare providers prescribe selected psychotropic medications for off-label use. (p. 541)",
            topic: "Personality Disorders",
            source: "eaq"
          },
          {
            stem: "Which statement accurately describes patients with a personality disorder?",
            options: [
              "They are resistant to behavioral change.",
              "They have an ability to tolerate frustration and pain.",
              "They usually seek help to change maladaptive behaviors.",
              "They have little difficulty forming satisfying and intimate relationships."
            ],
            answer: 0,
            rationale: "Personality disorders are deeply ingrained and pervasive. This disorder makes a patient easily frustrated and intolerant of pain. Patients with personality disorders find it very difficult, if not nearly impossible, to change and are not open to changing their behavior and thus do not usually seek help. They have difficulty establishing and maintaining intimate relationships that are satisfying. (p. 468)",
            topic: "Personality Disorders",
            source: "eaq"
          },
          {
            stem: "Which statement about histrionic personality disorder is accurate?",
            options: [
              "The child is afraid of retaliation by the opposite-sex parent.",
              "Antidepressants are the treatment of choice for this disorder.",
              "The disorder begins when the person is in the mid-teenage years.",
              "People who are egocentric by birth are predisposed to the disorder."
            ],
            answer: 3,
            rationale: "Certain inborn traits predispose people to histrionic personality disorder. Those showing egocentricity or emotional expressiveness are predisposed to this disorder. The child is excessively attached to the opposite-sex parent. Antidepressants may be given to reduce symptoms of the disorder. Psychotherapy is the treatment of choice. The psychodynamic etiology begins when the person is 3 to 5 years old. (p. 454)",
            topic: "Personality Disorders",
            source: "eaq"
          },
          {
            stem: "Which sign or symptom would be associated with the nursing diagnosis of difficulty coping for patients with borderline personality? Select all that apply.",
            options: [
              "Interdependence",
              "Self-mutilation",
              "Manipulation",
              "Destructive behavior",
              "Difficulty in relationships"
            ],
            answers: [1, 2, 3, 4],
            rationale: "The characteristics for difficulty coping include self-mutilation, manipulation, destructive behavior, and difficulty in relationships. Interdependence would not be considered a symptom for difficulty coping. (p. 466)",
            topic: "Personality Disorders",
            source: "eaq"
          },
          {
            stem: "A patient reports to the nurse they have special powers, and they are withdrawn and overly suspicious. Which personality disorder would the nurse suspect?",
            options: [
              "Avoidant",
              "Narcissistic",
              "Schizotypal",
              "Obsessive-compulsive"
            ],
            answer: 2,
            rationale: "The main traits that describe schizotypal are psychoticism, such as eccentricity, odd or unusual beliefs and thought processes, and social detachment by preferring to be socially isolated, as well as being overly suspicious or anxious. Traits of avoidant personality disorder include low self-esteem, feelings of inferiority compared with peers, and a reluctance to engage in unfamiliar activities involving new people. People with narcissistic personality disorder come across as arrogant, with an inflated view of their self-importance. They have a need for constant admiration, along with a lack of empathy for others, a factor that strains most relationships over time. In obsessive-compulsive personality disorder, the main pathological personality traits are rigidity and inflexible standards of self and others, along with persistence to goals long after it is necessary, even if it is self-defeating or negatively affects relationships. (p. 453)",
            topic: "Personality Disorders",
            source: "eaq"
          },
          {
            stem: "Which behavior would the nurse expect to find when assessing a patient with narcissistic personality disorder?",
            options: [
              "Submissive to others",
              "Exploitation of others",
              "Hypervigilant of others",
              "Aggressive toward others"
            ],
            answer: 1,
            rationale: "People with narcissistic personality disorder are arrogant and need constant admiration. They lack social empathy and may exploit others for their own benefit. People with dependent personality disorders feel insecure and may be submissive to others. People with paranoid personality disorder view others with suspicion and may be hypervigilant of them. People with borderline personality disorder and antisocial personality disorder are often aggressive to others. (p. 455)",
            topic: "Personality Disorders",
            source: "eaq"
          },
          {
            stem: "Research has indicated that the antisocial personality may present with which characteristic?",
            options: [
              "Social isolation",
              "Lack of remorse",
              "Learning difficulties",
              "Difficulty with reality testing"
            ],
            answer: 1,
            rationale: "Individuals with an antisocial personality exhibit a lack of remorse when confronted with the results of their thoughtless, irresponsible behavior toward others. Social isolation, learning difficulties, and difficulty with reality generally are not associated with personality disorders. (p. 464)",
            topic: "Personality Disorders",
            source: "eaq"
          },
          {
            stem: "Which feature is associated with antisocial personality disorder?",
            options: [
              "High levels of serotonin",
              "Self-destructive behaviors",
              "Symptoms peak around 30 years of age",
              "Low levels of 5-hydroxyindoleacetic acid in the urine"
            ],
            answer: 3,
            rationale: "Levels of a metabolite of serotonin, 5-hydroxyindoleacetic acid has been found to be lower in individuals with antisocial personality disorder. Low levels of serotonin are found in individuals with antisocial personality disorder. The symptoms peak in the late teenage years and the mid-20s. A change in serotonin transmission has been implicated in aggression and impulsivity seen in this disorder. Self-destructive behavior is common in borderline personality disorder. In antisocial personality disorder, the person is exploitative of others. (p. 465)",
            topic: "Personality Disorders",
            source: "eaq"
          },
          {
            stem: "Which behavior would the nurse identify as feature of paranoid personality disorder?",
            options: [
              "Excessive emotionality",
              "Dichotomous thinking",
              "Deferring questions to their mother",
              "Reluctance to answer any questions"
            ],
            answer: 3,
            rationale: "A person with paranoid personality disorder generally views others with suspicion and may be reluctant to answer any questions. People with histrionic personality disorder may exhibit excessive emotionality to the extent of being considered melodramatic. A person with borderline personality disorder may have dichotomous thinking. This is because of splitting or an inability to view both the positive and negative aspects of a person as a part of the whole. A person with dependent personality disorder may have low self-esteem and may be dependent on others for minor issues. For instance, the person may ask a family member to answer questions during an interview. (p. 452)",
            topic: "Personality Disorders",
            source: "eaq"
          },
          {
            stem: "Which personality disorder would the nurse suspect when a patient refuses treatment because of the belief that staff are planning to harm them?",
            options: [
              "Schizoid",
              "Paranoid",
              "Narcissistic",
              "Obsessive-compulsive"
            ],
            answer: 1,
            rationale: "Patients with paranoid personality disorder are suspicious and believe that others want to exploit, harm, and deceive them. They develop a defense system and try to counterattack the other person and reject the treatment. They behave rudely and develop jealousy toward others. Patients with schizoid personality disorder have reduced emotional attachment and depression. In narcissistic personality disorder, patients are extremely worried about their prestige. They feel intense shame and fear of abandonment by others. Patients with obsessive-compulsive personality disorder have repetitive behavior. They remain preoccupied with minute details. (p. 452)",
            topic: "Personality Disorders",
            source: "eaq"
          },
          {
            stem: "Which behavior is demonstrated by a patient who engages in splitting?",
            options: [
              "Lacks personal boundaries",
              "Sees things as divided into \"all good\" or \"all bad\"",
              "Places responsibility for behavior outside the self",
              "Unconsciously represses undesirable aspects of self"
            ],
            answer: 1,
            rationale: "Splitting demonstrates the failure to integrate the positive and negative into a cohesive whole. An individual is not seen as a person with good and bad traits, but rather as all good or all bad. Splitting is not described accurately by evidence of lack of personal boundaries, placing responsibility for behavior outside of self, or unconsciously repressing undesirable aspects of self. (p. 458)",
            topic: "Personality Disorders",
            source: "eaq"
          },
          {
            stem: "Which personality disorder would the nurse suspect when a patient behaves in a dramatic way and acts flirtatiously?",
            options: [
              "Schizoid",
              "Paranoid",
              "Histrionic",
              "Narcissistic"
            ],
            answer: 2,
            rationale: "People with histrionic personality disorder have emotional attention-seeking behaviors. They are often melodramatic and act flirtatiously. People with schizoid personality disorder exhibit emotional detachment and are viewed as loners. People with paranoid personality disorder are extremely suspicious and often believe others will harm them. People with narcissistic personality disorder are arrogant and need constant admiration. (p. 454)",
            topic: "Personality Disorders",
            source: "eaq"
          },
          {
            stem: "Which personality disorder would the nurse suspect when assessing a patient who seems to have some intellectual and perceptual distortions but can be made aware of the misinterpretations of reality?",
            options: [
              "Schizoid",
              "Paranoid",
              "Schizotypal",
              "Obsessive-compulsive"
            ],
            answer: 2,
            rationale: "People with schizotypal personality disorder have severe social and interpersonal deficits. They experience anxiety in social situations. They may have some intellectual and perceptual distortions but can be made aware of reality, unlike those with schizophrenia. Schizoid personality disorder can be a precursor to schizophrenia or delusional disorder. People with this disorder are emotionally detached loners who do not seek out or enjoy close relationships. People with paranoid personality disorder tend to be afraid that others will harm or deceive them. Therefore they are hostile and view others with suspicion. People with obsessive-compulsive disorder have a fear of imminent catastrophe. They tend to rehearse over and over how they will respond in a social circumstance. (p. 453)",
            topic: "Personality Disorders",
            source: "eaq"
          },
          {
            stem: "Which strategy would the nurse utilize when interacting with a patient displaying manipulative and aggressive behavior?",
            options: [
              "Ask questions to explore the patient's situation.",
              "Show sympathy to help decrease aggressive outbursts.",
              "Avoid attempting to explain the present situation of the patient.",
              "Use closed-ended statements when interacting with the patient for the time being."
            ],
            answer: 0,
            rationale: "The nurse should try to explore the patient's feelings by asking questions about the situation. It helps to assess the patient's condition and to prepare an effective treatment plan. The nurse should employ empathy, not sympathy, to help decrease aggressive outburst. The patient must be given an explanation of their present condition because it helps to reorient the patient to reality. Making closed-ended statements hinders communication. (p. 467)",
            topic: "Personality Disorders",
            source: "eaq"
          },
          {
            stem: "Which behavior would the nurse expect to find when conducting an assessment on a patient with a personality disorder?",
            options: [
              "Abnormal ego functioning",
              "Frequent episodes of psychosis",
              "Inflexible and maladaptive responses to stress",
              "Constant involvement with the needs of significant others"
            ],
            answer: 2,
            rationale: "Inflexible and maladaptive responses to stress are characteristic of individuals with a personality disorder. Abnormal ego functioning, psychosis, and caregiving tendencies generally are not characteristic of personality disorders. (pp. 451, 468)",
            topic: "Personality Disorders",
            source: "eaq"
          },
          {
            stem: "Which response would the nurse provide a patient with borderline personality disorder who asks why they are receiving naltrexone after an attempted suicide?",
            options: [
              "\"The medication will reduce the risk of self-harm.\"",
              "\"The medication is going to treat your diagnosis.\"",
              "\"The medication will help stabilize your mood so you will feel better.\"",
              "\"The medication will help you control your anger so you will not harm yourself.\""
            ],
            answer: 0,
            rationale: "Naltrexone is an opioid receptor antagonist that has been found to reduce self-injurious behavior in patients with borderline personality disorder. There are no medications approved to treat borderline personality disorder itself. Psychotropic medications are used to maintain the patient's cognitive function, provide symptom relief, and improve the quality of life, while selective serotonin reuptake inhibitors, anticonvulsants, and lithium are used to stabilize the patient's mood. Second-generation antipsychotics may be used to help control anger. (p. 464)",
            topic: "Personality Disorders",
            source: "eaq"
          },
          {
            stem: "Which coping behavior is a patient with borderline personality disorder displaying when they tell the nurse, \"I only want that one nurse taking care of me. All the other nurses are horrible and don't care about their patients\"?",
            options: [
              "Splitting",
              "Emotional lability",
              "Separation individuation",
              "Emotional dysregulation"
            ],
            answer: 0,
            rationale: "The patient is displaying splitting, an unusual feature of borderline personality disorder, which is characterized by the inability to view both positive and negative aspects of others as part of a whole. Emotional lability is the rapid movement of one emotional extreme to another. Separation individuation occurs in infants. Separation refers to the development of limits and the differentiation between the infant and the mother, whereas individuation refers to the infant's ability to recognize distinctness from the mother. Emotional dysregulation is a term that describes poorly modulated mood characterized by mood swings. (p. 458)",
            topic: "Personality Disorders",
            source: "eaq"
          },
          {
            stem: "Which behavior is demonstrated by a patient diagnosed with narcissism?",
            options: [
              "Grandiose",
              "Perfectionism",
              "Withdrawn behavior",
              "Dramatic expression of emotion"
            ],
            answer: 0,
            rationale: "Narcissistic patients give the impression of grandiosity—being invulnerable and superior to others to protect their fragile self-esteem. Perfectionism, withdrawn behavior, and a dramatic expression of emotion are not associated with narcissism. (p. 455)",
            topic: "Personality Disorders",
            source: "eaq"
          },
          {
            stem: "A patient diagnosed with obsessive-compulsive disorder (OCD) reports to the nurse, \"I need to wash my hands for 10 minutes before I can come to breakfast.\" Which response would the nurse provide?",
            options: [
              "\"You can wash your hands for 9 minutes.\"",
              "\"OK, your breakfast will be in the dining area when you are done.\"",
              "\"We are going to start decreasing the amount of time you can wash your hands.\"",
              "\"Can you tell me why you feel you need to wash your hands for 10 minutes?\""
            ],
            answer: 1,
            rationale: "The most therapeutic response to the patient diagnosed with OCD is \"OK, your breakfast will be in the dining area when you are done.\" Although structure should be provided, the nurse should allow the patient the extra time to complete the habitual behavior. The patient with OCD is aware that the action is unreasonable but is unable to stop. Decreasing the time to 9 minutes is unlikely to be beneficial in this situation. Asking the patient to decrease the amount of time a patient can carry out a ritual can occur when coping techniques have been identified and can be utilized to decrease the anxiety and stress of slowly altering the ritual or behavior. The question \"Can you tell me why you feel you need to wash your hands for 10 minutes\" may interfere with establishing a therapeutic relationship. (p. 457)",
            topic: "Personality Disorders",
            source: "eaq"
          },
          {
            stem: "Which guideline for nursing care would the nurse implement when caring for a patient with schizoid personality disorder?",
            options: [
              "Avoid being too nice or friendly.",
              "Teach and role model assertiveness.",
              "Maintain strict adherence to schedules.",
              "Respect the patient's need for social isolation."
            ],
            answer: 0,
            rationale: "When caring for the patient with schizoid personality disorder, the guideline for nursing care is to avoid being too nice and friendly. Patients with this disorder are somewhat expressionless and operate with a restricted range of emotional expression. They do not seek out or enjoy close relationships. Teaching and role modeling assertiveness is beneficial for the patient diagnosed with histrionic personality disorder. Because of suspicion and distrust, maintaining strict adherence to schedules is important when caring for a patient with a paranoid personality disorder. Respecting the patient's need for social isolation is important when caring for a patient diagnosed with schizotypal personality disorder. (p. 453)",
            topic: "Personality Disorders",
            source: "eaq"
          },
          {
            stem: "Which response would the nurse provide when a patient diagnosed with a borderline personality disorder shows the nurse multiple new, shallow self-inflicted cuts?",
            options: [
              "\"I will not be caught up or manipulated by your attention-seeking behavior.\"",
              "\"This suicide attempts scare me. I am placing you on suicide precautions immediately.\"",
              "\"These are shallow wounds that do not need attention. It's time for you to go to group now.\"",
              "\"I will care for your wounds, and then you should write down what you were thinking and feeling when this happened. We will discuss it later.\""
            ],
            answer: 3,
            rationale: "An approach useful for patients with borderline personality disorder relates to responses to superficial self-destructive behaviors. The nurse should remain neutral and provide wound care in a matter-of-fact manner. Then the patient is instructed to write down the sequence of events leading up to the injury, as well as the consequences, before staff will discuss the event. This cognitive exercise encourages the patient to think independently about their behavior instead of merely ventilating feelings. It facilitates the discussion with staff about alternative actions. It is not therapeutic to deny the seriousness of the wounds or confront the patient with the behavior. Instituting suicide precautions reinforces the behavior. (p. 463)",
            topic: "Personality Disorders",
            source: "eaq"
          }
        ]
      }
    },

    /* ==========================================================
       TOPIC 13 — EATING & FEEDING DISORDERS  (Week 4)
       One mustKnow question per Learning Outcomes bullet on
       must-know.html#eating (11 of them), two of which are SATA.
       NO medications set: that deck has no Medications slide, so the
       topic contributes nothing to medications.html (rule 4b, confirmed
       by Holly 2026-09-16). The empty set renders the cell disabled,
       which is correct, not missing content.
       ========================================================== */
    {
      id: "week4-eating",
      label: "Eating & Feeding Disorders",
      week: 4,
      sets: {
        mustKnow: [
          {
            /* LO: compare and contrast the physical characteristics */
            stem: "A patient of normal body weight reports fatigue. The nurse notes calluses across the knuckles, swelling along the jaw, and eroded tooth enamel. Which disorder do these findings together suggest?",
            options: [
              "Binge-eating disorder",
              "Anorexia nervosa, restricting type",
              "Avoidant/restrictive food intake disorder",
              "Bulimia nervosa"
            ],
            answer: 3,
            rationale: "Calluses on the back of the hands and knuckles are Russell's Sign, caused by self-induced vomiting, and parotid swelling and enamel erosion are the other purging signs. Normal body weight is typical of bulimia and is what keeps it hidden. Anorexia would present with a significantly low BMI, lanugo and low vital signs. Binge-eating disorder involves no compensatory behavior, so none of the purging signs appear.",
            topic: "Eating & Feeding Disorders",
            source: "quiz-bank"
          },
          {
            /* LO: compare and contrast the epidemiology */
            stem: "Which statement about the epidemiology of eating disorders is accurate?",
            options: [
              "Anorexia nervosa is the most common and has the lowest sex ratio.",
              "Bulimia nervosa is the most common, at a ratio of 3:1 female to male.",
              "Binge-eating disorder is the most common, affecting 3.6% of women.",
              "All three occur at roughly equal lifetime prevalence."
            ],
            answer: 2,
            rationale: "Binge-eating disorder is the most common eating disorder, with a lifetime incidence of 3.6% for women and 2.1% for men. Anorexia is the least common of the three at 0.5% and carries the 3:1 ratio. Bulimia sits between them at 2.3% of women with the widest sex ratio, 10:1.",
            topic: "Eating & Feeding Disorders",
            source: "quiz-bank"
          },
          {
            /* LO: compare signs, symptoms and risk factors */
            stem: "Which features are shared risk factors across anorexia nervosa, bulimia nervosa and binge-eating disorder? Select all that apply.",
            options: [
              "Body dissatisfaction",
              "A history of abuse or trauma",
              "Amenorrhea",
              "Low self-esteem",
              "Comorbid anxiety or depression",
              "Compensatory purging behavior"
            ],
            answers: [0, 1, 3, 4],
            rationale: "Body dissatisfaction, a history of abuse or trauma, low self-esteem and comorbid anxiety or depression run through all three disorders. Amenorrhea is a physical consequence of starvation specific to anorexia, not a risk factor. Compensatory behavior is a diagnostic feature that separates the disorders rather than a factor they share: it is always present in bulimia, present only in the binge-purge type of anorexia, and absent in binge-eating disorder.",
            topic: "Eating & Feeding Disorders",
            source: "quiz-bank"
          },
          {
            /* LO: distinguish the two types of anorexia nervosa */
            stem: "A patient with anorexia nervosa has lost weight over the past year through fasting and running twice daily, with no vomiting or laxative use in that time. How should the nurse expect this presentation to be classified?",
            options: [
              "Restricting type, based on behavior over the last 3 months",
              "Binge-eating and purging type, because exercise is a compensatory behavior",
              "Restricting type, based on behavior over the last 12 months",
              "Unspecified, because the type requires a BMI to assign"
            ],
            answer: 0,
            rationale: "The type is assigned on behavior during the last 3 months. Restricting type describes weight loss accomplished through dieting, fasting and excessive exercise without regular binge eating or purging. Although excessive exercise is compensatory in bulimia, in anorexia it is part of the restricting picture, and purging type requires self-induced vomiting or misuse of laxatives, diuretics or enemas. BMI determines severity, not type.",
            topic: "Eating & Feeding Disorders",
            source: "quiz-bank"
          },
          {
            /* LO: state the DSM-5 criteria for each disorder */
            stem: "Which behaviors count toward the DSM-5 requirement that binge-eating disorder episodes be associated with three or more features? Select all that apply.",
            options: [
              "Eating much more rapidly than normal",
              "Eating until uncomfortably full",
              "Self-induced vomiting or laxative use after the episode",
              "Eating alone because of embarrassment over the amount",
              "Feeling disgusted, depressed or very guilty afterward"
            ],
            answers: [0, 1, 3, 4],
            rationale: "The DSM-5 lists five features, three or more of which must accompany the binge episodes: eating much more rapidly than normal, eating until uncomfortably full, eating large amounts when not physically hungry, eating alone from embarrassment, and feeling disgusted, depressed or very guilty afterward. Self-induced vomiting is a compensatory behavior, and its recurrent presence would make the diagnosis bulimia nervosa instead.",
            topic: "Eating & Feeding Disorders",
            source: "quiz-bank"
          },
          {
            /* LO: describe the biological factors */
            stem: "A student asks which neurotransmitter is implicated in the biology of eating disorders. Which response is correct?",
            options: [
              "Serotonin, through appetite, mood and impulse control",
              "Dopamine, through the reward pathway",
              "Norepinephrine, through the stress response",
              "GABA, through inhibition of appetite signalling"
            ],
            answer: 0,
            rationale: "Altered brain serotonin function contributes to the dysregulation of appetite, mood and impulse control, and bulimia nervosa specifically involves lower brain serotonin. This is also why SSRIs are the pharmacologic option in bulimia and binge-eating disorder. Dopamine, norepinephrine and GABA are not the pathways described for these disorders.",
            topic: "Eating & Feeding Disorders",
            source: "quiz-bank"
          },
          {
            /* LO: describe the cognitive and environmental factors */
            stem: "A patient with anorexia nervosa states that she understands the medical risks of her low weight but believes staying thin is worth them. Which concept does this illustrate?",
            options: [
              "Anosognosia",
              "Denial of the medical findings",
              "An ego-syntonic disorder",
              "Concrete thinking"
            ],
            answer: 2,
            rationale: "Anorexia nervosa is ego-syntonic: the person knows the actions are harmful but believes the benefits outweigh the harm. That is what makes motivation to change so low. Anosognosia is an inability to recognize illness caused by the illness itself, which is a cognitive symptom of schizophrenia rather than a weighed judgment. She is not denying the findings, she is accepting them and valuing thinness more.",
            topic: "Eating & Feeding Disorders",
            source: "quiz-bank"
          },
          {
            /* LO: describe the criteria for hospitalization */
            stem: "Which assessment finding in a patient with anorexia nervosa meets the criteria for hospitalization?",
            options: [
              "Weight at 82% of ideal body weight",
              "A temperature of 97.4 degrees Fahrenheit",
              "A systolic blood pressure of 94",
              "A daytime heart rate of 46 beats per minute"
            ],
            answer: 3,
            rationale: "A daytime heart rate below 50 is one of the hospitalization criteria, along with weight below 75% of ideal body weight, less than 10% body fat, a systolic blood pressure below 90, a temperature below 96 degrees Fahrenheit, arrhythmias, and extreme electrolyte imbalance. The other three findings are abnormal but each falls on the safe side of its threshold, which is why the exact cutoffs matter.",
            topic: "Eating & Feeding Disorders",
            source: "quiz-bank"
          },
          {
            /* LO: describe the biological treatments */
            stem: "A patient with bulimia nervosa asks whether any medication is approved for her condition. Which response is accurate?",
            options: [
              "No medication is FDA-approved for any eating disorder.",
              "Lisdexamfetamine dimesylate is approved, and works best alone.",
              "Fluoxetine is approved, but only after maintenance weight is reached.",
              "Fluoxetine is approved, and works best alongside CBT."
            ],
            answer: 3,
            rationale: "Fluoxetine is the only FDA-approved medication for bulimia nervosa in adults, and is most effective in conjunction with CBT. The qualifier about maintenance weight belongs to anorexia nervosa, where fluoxetine helps obsessive-compulsive behavior only after weight is restored, and where no medication is FDA-approved at all. Lisdexamfetamine dimesylate is used in binge-eating disorder, not bulimia.",
            topic: "Eating & Feeding Disorders",
            source: "quiz-bank"
          },
          {
            /* LO: describe the psychological therapies */
            stem: "Which statement about psychological therapy for eating disorders is accurate?",
            options: [
              "Family-based treatment is first-line for adults with anorexia nervosa.",
              "CBT is first-line for bulimia nervosa.",
              "Family therapy is the usual approach for adults with bulimia nervosa.",
              "No therapy has evidence in any age group with anorexia nervosa."
            ],
            answer: 1,
            rationale: "CBT is the first-line treatment for bulimia nervosa. Family therapy is not usually used in bulimia because of the age of the patient. In anorexia there is no empirical support for any specific model in adults, but in adolescents there is evidence for insight-oriented therapy, family-based treatment, adolescent-focused therapy and CBT, so the evidence depends on age rather than being absent entirely.",
            topic: "Eating & Feeding Disorders",
            source: "quiz-bank"
          },
          {
            /* LO: describe the three feeding disorders */
            stem: "A caregiver reports that their 8-month-old brings food back up into the mouth after feeds, chews it again and swallows it. The infant is gaining weight poorly. Which disorder does the nurse suspect, and what is the first intervention?",
            options: [
              "Pica, and monitoring the infant's eating behavior",
              "Rumination disorder, and repositioning during feeding",
              "ARFID, and behavioral modification to increase intake",
              "Rumination disorder, and immediate family therapy"
            ],
            answer: 1,
            rationale: "Rumination disorder is undigested food returned to the mouth to be rechewed, reswallowed or spit out, and in infants onset is usually between 3 and 12 months. Interventions begin with repositioning during feeding, improving caregiver and child interaction, and distracting the child when the behavior starts. Family therapy may be required but is not the first step. Pica is the ingestion of non-nutritive substances, and ARFID is food avoidance often tied to the sensory qualities of food.",
            topic: "Eating & Feeding Disorders",
            source: "quiz-bank"
          }
        ],
        medications: [],
        eaq: []
      }
    },

    /* ==========================================================
       TOPIC 14 — SCHIZOPHRENIA & SCHIZOAFFECTIVE DISORDER  (Week 4)
       ONE topic, even though Week 4 has three topic pages: the
       schizophrenia topic page was split on size grounds but the deck
       carries one set of Learning Outcomes and Key Terms, so
       must-know.html and this bank both keep it whole.

       14 mustKnow, one per Learning Outcomes bullet on
       must-know.html#schizophrenia, two of them SATA.
       21 medications: one per drug on the medications.html Week 4 tab
       (18 of them) plus 3 "which are indicated for" SATA questions.
       Every medications question is sourced from medications.html alone
       and takes a DIFFERENT angle from the four starred mustKnow
       bullets, which already cover what each classification treats,
       which drugs fall under each, how side effects are managed, and
       clozapine's agranulocytosis monitoring.
       ========================================================== */
    {
      id: "week4-schizophrenia",
      label: "Schizophrenia & Schizoaffective Disorder",
      week: 4,
      sets: {
        mustKnow: [
          {
            /* STARRED LO: which symptoms each classification treats */
            stem: "A patient taking chlorpromazine has no hallucinations or delusions but remains withdrawn, unmotivated and flat in affect. Which explanation best accounts for this?",
            options: [
              "The medication has not yet reached a therapeutic level.",
              "Typical antipsychotics have little effect on negative symptoms.",
              "These residual findings indicate the dose is too high.",
              "The patient is experiencing extrapyramidal side effects."
            ],
            answer: 1,
            rationale: "Typical antipsychotics primarily treat the positive symptoms and have little effect on the negative symptoms, which is exactly this picture: the hallucinations and delusions have resolved while affective blunting, avolition and asociality remain. Atypical antipsychotics treat both. A subtherapeutic level would leave the positive symptoms present as well. Extrapyramidal side effects are movement findings, not flat affect and withdrawal.",
            topic: "Schizophrenia & Schizoaffective Disorder",
            source: "quiz-bank"
          },
          {
            /* STARRED LO: which medications fall under each classification */
            stem: "Which medications are atypical antipsychotics? Select all that apply.",
            options: [
              "Chlorpromazine",
              "Clozapine",
              "Haloperidol",
              "Quetiapine",
              "Aripiprazole",
              "Benztropine"
            ],
            answers: [1, 3, 4],
            rationale: "Clozapine, quetiapine and aripiprazole are atypical antipsychotics, along with olanzapine, risperidone and paliperidone palmitate. Chlorpromazine and haloperidol are the two typical antipsychotics. Benztropine is an anticholinergic given to treat the extrapyramidal side effects of antipsychotics, not an antipsychotic itself.",
            topic: "Schizophrenia & Schizoaffective Disorder",
            source: "quiz-bank"
          },
          {
            /* STARRED LO: how to treat or manage side effects */
            stem: "A patient started on haloperidol three days ago is pacing constantly and cannot sit still. Which action should the nurse take first?",
            options: [
              "Administer a PRN dose of the antipsychotic for agitation",
              "Assess whether the restlessness is akathisia rather than anxiety",
              "Request an order for the AIMS scale",
              "Prepare to stop all antipsychotics immediately"
            ],
            answer: 1,
            rationale: "Akathisia is motor restlessness that is easily mistaken for anxiety or agitation, and treating it as agitation means giving more of the drug that caused it, which makes it worse. Assessment comes before medicating. Once identified, treatment is a dose reduction or medication change, benztropine, and possibly propranolol or a short-term benzodiazepine. The AIMS assesses tardive dyskinesia, not akathisia. Stopping all antipsychotics immediately is the response to neuroleptic malignant syndrome.",
            topic: "Schizophrenia & Schizoaffective Disorder",
            source: "quiz-bank"
          },
          {
            /* STARRED LO: agranulocytosis and clozapine */
            stem: "A patient has been taking clozapine for six weeks. Which laboratory value requires the most urgent nursing action?",
            options: [
              "A fasting blood glucose of 118 mg/dL",
              "A total cholesterol trending upward",
              "A white blood cell count that has dropped",
              "A mildly elevated alanine aminotransferase"
            ],
            answer: 2,
            rationale: "Agranulocytosis is the potentially fatal side effect specific to clozapine, and it presents as white blood cell counts dropping to dangerous levels, limiting the ability to fight infection. Risk is greatest during the first months, which is why WBC is monitored weekly for the first 18 weeks, and the drug is discontinued for leucopenia or neutropenia. It is reversible if treated early. Elevated glucose and cholesterol reflect metabolic syndrome, which matters but is not the acute threat here.",
            topic: "Schizophrenia & Schizoaffective Disorder",
            source: "quiz-bank"
          },
          {
            /* LO: etiologies and epidemiology */
            stem: "Which statement about the epidemiology of schizophrenia is accurate?",
            options: [
              "It affects about 1% of the world's population, with peak onset between 15 and 35.",
              "It affects about 5% of the world's population, with peak onset after age 40.",
              "It is diagnosed more frequently in women and in rural areas.",
              "New cases are most common in children under 10."
            ],
            answer: 0,
            rationale: "Schizophrenia affects roughly 1% to 1.1% of the world's population regardless of racial, ethnic or economic background, about 3.5 million people in the United States, with peak onset between 15 and 35 and half of cases beginning before age 25. It is diagnosed more frequently among males and in urban areas. New cases are rare before age 10 and after age 40, and childhood diagnosis is uncommon at about 1 in 40,000.",
            topic: "Schizophrenia & Schizoaffective Disorder",
            source: "quiz-bank"
          },
          {
            /* LO: differentiate the positive symptoms */
            stem: "A patient says: I heard the bell. Well, hell then I fell. Which alteration does this demonstrate?",
            options: [
              "Word salad",
              "Neologism",
              "Clang association",
              "Echolalia"
            ],
            answer: 2,
            rationale: "Clang association is choosing words based on their sound rather than their meaning, often a rhyme, which is exactly what bell, hell and fell are doing here. Word salad is a string of totally unconnected words that carries no structure at all. A neologism is a made-up word meaningful only to the patient. Echolalia is the pathological repetition of another person's words.",
            topic: "Schizophrenia & Schizoaffective Disorder",
            source: "quiz-bank"
          },
          {
            /* LO: differentiate the negative symptoms */
            stem: "Which findings are negative symptoms of schizophrenia? Select all that apply.",
            options: [
              "Avolition",
              "Thought insertion",
              "Anhedonia",
              "Alogia",
              "Echopraxia",
              "Asociality"
            ],
            answers: [0, 2, 3, 5],
            rationale: "Negative symptoms are those that should be present but are not: affective blunting, alogia, anhedonia, apathy, asociality and avolition. Thought insertion is a positive symptom, an alteration in thought, and echopraxia is a positive symptom, an alteration in behavior. Both of those are things that exist but should not, which is the defining difference between the two categories.",
            topic: "Schizophrenia & Schizoaffective Disorder",
            source: "quiz-bank"
          },
          {
            /* LO: differentiate the cognitive and affective symptoms */
            stem: "A patient with schizophrenia repeatedly stops taking medication, insisting there is nothing wrong with him. Which cognitive symptom does this reflect?",
            options: [
              "Concrete thinking",
              "Impaired executive functioning",
              "Anosognosia",
              "Impaired information processing"
            ],
            answer: 2,
            rationale: "Anosognosia is the inability to realize one is ill, caused by the illness itself, and it commonly results in resistance to or cessation of treatment. It is often combined with paranoia, which makes accepting help close to impossible. Concrete thinking is an impaired ability to think abstractly. Impaired executive functioning affects reasoning and planning, and impaired information processing produces delayed responses and misperceptions.",
            topic: "Schizophrenia & Schizoaffective Disorder",
            source: "quiz-bank"
          },
          {
            /* LO: DSM-5 criteria for schizophrenia */
            stem: "Which combination satisfies the DSM-5 symptom requirement for a diagnosis of schizophrenia?",
            options: [
              "Negative symptoms and disorganized behavior for 1 month",
              "Delusions and negative symptoms for 1 month",
              "Any one characteristic symptom for 6 months",
              "Catatonic behavior alone for 6 months"
            ],
            answer: 1,
            rationale: "Two or more characteristic symptoms must be present for a significant portion of a 1-month period, and at least one must be delusions, hallucinations or disorganized speech. Delusions plus negative symptoms satisfies both parts. Negative symptoms with disorganized behavior gives two symptoms but neither is from the required first three. A single symptom is never sufficient. The separate 6-month requirement applies to continuous signs of the disturbance, not to one symptom alone.",
            topic: "Schizophrenia & Schizoaffective Disorder",
            source: "quiz-bank"
          },
          {
            /* LO: name the phases */
            stem: "A patient's positive symptoms have largely resolved, a new baseline has been established, but negative and cognitive symptoms continue to interfere with work. Which phase does this describe?",
            options: [
              "Prodromal",
              "Acute",
              "Stabilization",
              "Maintenance or residual"
            ],
            answer: 3,
            rationale: "In the maintenance or residual phase the condition has stabilized and a new baseline is set, with positive symptoms usually absent or significantly diminished while negative and cognitive symptoms continue to be a concern. Stabilization is the phase before it, where symptoms are still diminishing and moving toward the previous level of function. The prodromal phase precedes the first full episode by 1 to 12 months, and the acute phase is when symptoms are active and disabling.",
            topic: "Schizophrenia & Schizoaffective Disorder",
            source: "quiz-bank"
          },
          {
            /* LO: schizoaffective disorder symptoms and treatments */
            stem: "Which finding distinguishes schizoaffective disorder from a mood disorder with psychotic features?",
            options: [
              "Hallucinations and delusions for two or more weeks with no major mood episode",
              "The presence of both manic and depressive episodes over the course of the illness",
              "Psychotic symptoms that appear only during the mood episodes",
              "A lifetime prevalence higher than that of schizophrenia"
            ],
            answer: 0,
            rationale: "Schizoaffective disorder requires hallucinations and delusions for two or more weeks in the absence of a major mood episode at some point in the illness. The schizophrenia symptoms persist even after the mood episodes subside, which is precisely what psychotic symptoms confined to a mood episode do not do. Having both manic and depressive episodes describes the bipolar type rather than the diagnosis itself, and at 0.3% its prevalence is lower than that of schizophrenia.",
            topic: "Schizophrenia & Schizoaffective Disorder",
            source: "quiz-bank"
          },
          {
            /* LO: care considerations */
            stem: "Which outcome statement for a patient with schizophrenia is written correctly?",
            options: [
              "The patient will decrease auditory hallucinations.",
              "The patient will have improved coping by discharge.",
              "The patient will state 2 to 3 coping strategies prior to discharge.",
              "The patient will increase participation in unit activities."
            ],
            answer: 2,
            rationale: "Outcomes are specific and measurable with a timeframe, and are developed alongside the patient. Stating 2 to 3 coping strategies prior to discharge attaches both a number and a deadline. Open words like increase and decrease are avoided precisely because they cannot be measured, and improved coping by discharge names a timeframe but no measurable quantity.",
            topic: "Schizophrenia & Schizoaffective Disorder",
            source: "quiz-bank"
          },
          {
            /* LO: non-adherence and relapse */
            stem: "A patient asks why he must keep taking his antipsychotic when his symptoms are gone. Which response is accurate?",
            options: [
              "Most patients can taper off safely once their symptoms have fully resolved.",
              "Stopping almost certainly leads to relapse, 80% within 2 years.",
              "Relapse becomes uncommon once a patient has been stable for a full year.",
              "Medication can be stopped so long as weekly psychotherapy continues."
            ],
            answer: 1,
            rationale: "Stopping medication almost certainly leads to relapse, with 80% relapsing within 2 years, and non-adherence is the major reason relapse occurs at all. Between 80% and 90% of patients relapse during the course of the illness, and each relapse takes longer to recover from. Combining medication with psychotherapy reduces the severity and frequency of relapses, but psychotherapy does not replace the medication.",
            topic: "Schizophrenia & Schizoaffective Disorder",
            source: "quiz-bank"
          },
          {
            /* LO: intervening with delusions and hallucinations */
            stem: "A patient states that the staff are part of a plot to poison his food. Which nursing response is therapeutic?",
            options: [
              "Point out that no one has been harmed by the food on the unit.",
              "Agree with the patient so that trust can be established.",
              "Explain the kitchen procedures that make poisoning impossible.",
              "Acknowledge that this must feel frightening and offer to stay with him."
            ],
            answer: 3,
            rationale: "The therapeutic approach addresses the underlying theme of fear and helps the patient feel safe, rather than engaging the delusional content. Offering presence and acknowledging the fear does that. Pointing to evidence and explaining kitchen procedures are both attempts to disprove the delusion, which intensifies it and makes staff appear untrustworthy. Agreeing with the delusion is never appropriate, since it confirms a false belief and undermines reality testing.",
            topic: "Schizophrenia & Schizoaffective Disorder",
            source: "quiz-bank"
          }
        ],
        medications: [
          {
            /* chlorpromazine */
            stem: "A patient is prescribed chlorpromazine. Which statement about its place in therapy is accurate?",
            options: [
              "It treats negative symptoms more effectively than atypical agents.",
              "It carries no risk of extrapyramidal side effects.",
              "It requires weekly white blood cell monitoring.",
              "It is as effective as newer agents for positive symptoms and costs less."
            ],
            answer: 3,
            rationale: "Chlorpromazine is a typical antipsychotic, and typicals are as effective as newer antipsychotics for positive symptoms and much less expensive, which is why they remain an option when cost or metabolic risk matters. They have little effect on negative symptoms. Extrapyramidal side effects are their most common and distressing problem. Weekly WBC monitoring belongs to clozapine.",
            topic: "Schizophrenia & Schizoaffective Disorder",
            source: "quiz-bank"
          },
          {
            /* haloperidol */
            stem: "A patient receiving haloperidol intramuscularly for acute agitation should be monitored especially closely for which reason?",
            options: [
              "Side effects are intensified and less easily managed by the IM route.",
              "The IM route delays the onset of action by several weeks.",
              "IM administration eliminates the risk of extrapyramidal symptoms.",
              "The drug loses potency when given outside the oral route."
            ],
            answer: 0,
            rationale: "Short-acting injectable antipsychotics are used primarily for agitation in psychiatric emergencies, and their side effects can be intensified and are less easily managed when the medication is administered intramuscularly. Onset is faster by this route, not slower, and the two to six week window applies to therapeutic effect on psychosis rather than to acute agitation. The IM route does not remove EPS risk.",
            topic: "Schizophrenia & Schizoaffective Disorder",
            source: "quiz-bank"
          },
          {
            /* haloperidol decanoate */
            stem: "A patient with repeated hospitalizations for stopping his oral antipsychotic is switched to haloperidol decanoate. What is the primary advantage?",
            options: [
              "It eliminates extrapyramidal side effects entirely.",
              "It allows the patient to skip all routine laboratory monitoring.",
              "It works within hours rather than over several weeks.",
              "It is dosed every 2 to 4 weeks, which improves adherence."
            ],
            answer: 3,
            rationale: "Haloperidol decanoate is the long-acting injectable form, given every 2 to 4 weeks or up to months. Requiring less frequent administration reduces conflict about taking medication and improves adherence, which is exactly the problem here. It remains a typical antipsychotic, so EPS risk persists and the AIMS is still done. The patient must have transportation to receive the injection.",
            topic: "Schizophrenia & Schizoaffective Disorder",
            source: "quiz-bank"
          },
          {
            /* olanzapine */
            stem: "A patient started on olanzapine six months ago has gained 30 pounds, mostly around the abdomen. Which laboratory tests should the nurse anticipate?",
            options: [
              "White blood cell count and absolute neutrophil count",
              "Blood glucose and a lipid panel",
              "Serum lithium level and thyroid function",
              "Liver enzymes and ammonia"
            ],
            answer: 1,
            rationale: "Olanzapine is an atypical antipsychotic, and all atypicals carry a risk of metabolic syndrome: weight gain especially abdominal, dyslipidemia, increased blood glucose and insulin resistance. Monitoring covers weight and girth, an initial glucose tolerance test and regular blood glucose. WBC and neutrophil monitoring is specific to clozapine. Lithium levels and thyroid studies belong to mood stabilization.",
            topic: "Schizophrenia & Schizoaffective Disorder",
            source: "quiz-bank"
          },
          {
            /* quetiapine */
            stem: "A patient taking quetiapine reports that he feels very drowsy during the day. Which statement by the nurse is accurate?",
            options: [
              "Sedation is a recognized side effect of atypical antipsychotics.",
              "Drowsiness means the drug has reached a toxic level.",
              "This indicates the early stage of neuroleptic malignant syndrome.",
              "Sedation only occurs with typical antipsychotics."
            ],
            answer: 0,
            rationale: "Sedation is a recognized side effect of the atypical antipsychotics, alongside sexual dysfunction and the metabolic effects. It does not by itself indicate toxicity. Neuroleptic malignant syndrome presents with severe muscle rigidity, altered mental status and a temperature over 103 degrees Fahrenheit, not isolated drowsiness. Sedation occurs with both classifications.",
            topic: "Schizophrenia & Schizoaffective Disorder",
            source: "quiz-bank"
          },
          {
            /* aripiprazole */
            stem: "Aripiprazole is being considered for a 15-year-old with schizophrenia. Which statement supports this choice?",
            options: [
              "It is the only antipsychotic approved for any age group.",
              "It carries no risk of metabolic effects in adolescents.",
              "It is one of the agents used in children and adolescents.",
              "It is a typical antipsychotic, which is preferred in younger patients."
            ],
            answer: 2,
            rationale: "Risperidone and aripiprazole are the antipsychotics named for use in children and adolescents, alongside individual and family psychotherapy, social and academic skills training, and hospitalization where needed. Aripiprazole is an atypical antipsychotic, not a typical one, and as an atypical it still carries metabolic risk that must be monitored.",
            topic: "Schizophrenia & Schizoaffective Disorder",
            source: "quiz-bank"
          },
          {
            /* risperidone */
            stem: "Which statement about risperidone is accurate?",
            options: [
              "It is available only in oral form.",
              "It is available as both an oral drug and a long-acting injection.",
              "It is a typical antipsychotic with strong anticholinergic effects.",
              "It requires a 10 to 14 day washout before the first dose."
            ],
            answer: 1,
            rationale: "Risperidone is an atypical antipsychotic available both orally and as a long-acting injectable, which makes it useful where adherence is a concern. As an atypical it is less likely than typicals to produce anticholinergic effects. The requirement for a drug-free interval before the first dose belongs to naltrexone in opioid use disorder, not to any antipsychotic.",
            topic: "Schizophrenia & Schizoaffective Disorder",
            source: "quiz-bank"
          },
          {
            /* paliperidone palmitate */
            stem: "Before a patient is started on paliperidone palmitate, which practical factor must be assessed?",
            options: [
              "Whether the patient has reliable transportation to the clinic",
              "Whether the patient can tolerate weekly blood draws",
              "Whether the patient has a 10-day opioid-free period",
              "Whether the patient can swallow tablets without difficulty"
            ],
            answer: 0,
            rationale: "Paliperidone palmitate is a long-acting injectable, given every 2 to 4 weeks or up to months, and the patient must have transportation to receive the injection. That is the practical barrier that decides whether this form will work. Weekly blood draws are the clozapine requirement. Difficulty swallowing is a reason to choose a liquid or fast-dissolving form, and it is not an obstacle for an injectable.",
            topic: "Schizophrenia & Schizoaffective Disorder",
            source: "quiz-bank"
          },
          {
            /* clozapine — different angle from the starred mustKnow question */
            stem: "Under which circumstance is a clozapine trial justified?",
            options: [
              "As the first-line agent for any newly diagnosed patient",
              "Whenever a patient reports extrapyramidal side effects",
              "Only after tardive dyskinesia has already developed",
              "After two monotherapy trials with other antipsychotics have failed"
            ],
            answer: 3,
            rationale: "A clozapine trial is justified after the failure of two monotherapy trials, and it is considered the gold standard in treatment-resistant schizophrenia, which accounts for about 30% of the thought disorder population. It is not first-line precisely because of agranulocytosis. Extrapyramidal side effects are managed with dose changes or anticholinergics rather than by moving straight to clozapine, and waiting for tardive dyskinesia is not the trigger.",
            topic: "Schizophrenia & Schizoaffective Disorder",
            source: "quiz-bank"
          },
          {
            /* benztropine */
            stem: "A patient given benztropine for pseudoparkinsonism should be taught to expect which set of effects?",
            options: [
              "Increased salivation, diarrhea, bradycardia and sweating",
              "Weight gain, increased thirst, polyuria and blurred vision",
              "Muscle rigidity, high fever, diaphoresis and incontinence",
              "Dry mouth, blurred vision and urinary retention"
            ],
            answer: 3,
            rationale: "Benztropine is an anticholinergic, so it produces anticholinergic effects: dry mouth, blurred vision, dry eyes, constipation, urinary retention or hesitancy, drowsiness, dizziness, confusion, tachycardia and skin flushing from decreased sweating. The first option lists cholinergic effects, the opposite pattern. Muscle rigidity with fever and diaphoresis describes neuroleptic malignant syndrome.",
            topic: "Schizophrenia & Schizoaffective Disorder",
            source: "quiz-bank"
          },
          {
            /* trihexyphenidyl */
            stem: "Trihexyphenidyl is added for a patient with a shuffling gait and pill-rolling tremor on an antipsychotic. What is the purpose of this addition?",
            options: [
              "To treat the underlying psychosis more aggressively",
              "To prevent agranulocytosis from developing",
              "To alleviate the symptoms of pseudoparkinsonism",
              "To reverse tardive dyskinesia that has already appeared"
            ],
            answer: 2,
            rationale: "Trihexyphenidyl is an oral anticholinergic added to alleviate the symptoms of pseudoparkinsonism, alongside identifying the causative medication for slow, safe discontinuation or a dose reduction. It treats the side effect, not the schizophrenia. Agranulocytosis is prevented by WBC monitoring on clozapine, and tardive dyskinesia is managed with valbenazine or deutetrabenazine.",
            topic: "Schizophrenia & Schizoaffective Disorder",
            source: "quiz-bank"
          },
          {
            /* propranolol */
            stem: "Propranolol is prescribed alongside a dose reduction for a patient with antipsychotic-induced akathisia. What is its role?",
            options: [
              "An added agent used when the dose change alone is not enough.",
              "It is the first-line treatment for acute dystonic reactions.",
              "It reverses the metabolic effects of atypical antipsychotics.",
              "It prevents the progression of tardive dyskinesia."
            ],
            answer: 0,
            rationale: "For akathisia the provider may add propranolol, lorazepam or diazepam on top of a dose reduction or medication change and an anticholinergic such as benztropine. Acute dystonic reactions are monitored for and acted on emergently if the airway is involved. Propranolol does nothing for metabolic syndrome, which is managed by monitoring weight, girth and glucose, and it does not affect tardive dyskinesia.",
            topic: "Schizophrenia & Schizoaffective Disorder",
            source: "quiz-bank"
          },
          {
            /* lorazepam */
            stem: "Lorazepam appears twice in the care of a patient on antipsychotics. Which two uses are correct?",
            options: [
              "Short-term for akathisia, and for agitation in NMS",
              "For agranulocytosis, and for metabolic syndrome",
              "For tardive dyskinesia, and for acute dystonic reactions",
              "For long-term maintenance, and for negative symptoms"
            ],
            answer: 0,
            rationale: "Lorazepam may be added for akathisia, on a short-term basis only, and is used for agitation in neuroleptic malignant syndrome alongside dantrolene sodium and bromocriptine mesylate. Agranulocytosis is managed by stopping clozapine, and metabolic syndrome by monitoring and lifestyle support. Tardive dyskinesia is managed with valbenazine or deutetrabenazine. Benzodiazepines are never the maintenance treatment for schizophrenia.",
            topic: "Schizophrenia & Schizoaffective Disorder",
            source: "quiz-bank"
          },
          {
            /* diazepam */
            stem: "A provider adds diazepam for a patient with akathisia. Which instruction is most important?",
            options: [
              "The drug should be continued indefinitely to prevent recurrence.",
              "Benzodiazepines in this situation are for short-term use only.",
              "The dose should be increased if restlessness persists beyond a week.",
              "The antipsychotic should be stopped while diazepam is given."
            ],
            answer: 1,
            rationale: "Benzodiazepines added for akathisia are for short-term use only, because longer use risks dependence and adds sedation to a patient already at risk of it. The primary interventions remain a dose reduction or medication change plus an anticholinergic. Stopping the antipsychotic entirely is the response to neuroleptic malignant syndrome, not to akathisia.",
            topic: "Schizophrenia & Schizoaffective Disorder",
            source: "quiz-bank"
          },
          {
            /* valbenazine */
            stem: "Valbenazine is prescribed for a patient with established tardive dyskinesia. What should the nurse teach about what to expect?",
            options: [
              "It reverses the movements completely within a few days.",
              "It allows the antipsychotic dose to be safely doubled.",
              "It prevents tardive dyskinesia from ever developing.",
              "It manages the symptoms, which usually persist after dose changes."
            ],
            answer: 3,
            rationale: "Valbenazine is one of two FDA-approved medications that help manage tardive dyskinesia symptoms. Symptoms usually persist even after the antipsychotic dose is lowered or stopped, so these agents manage rather than reverse the condition. It is not a preventive drug, and the way to reduce risk is regular AIMS assessment and choosing an agent with lower risk.",
            topic: "Schizophrenia & Schizoaffective Disorder",
            source: "quiz-bank"
          },
          {
            /* deutetrabenazine */
            stem: "Which medication, along with valbenazine, is FDA-approved to manage tardive dyskinesia?",
            options: [
              "Bromocriptine mesylate",
              "Deutetrabenazine",
              "Dantrolene sodium",
              "Trihexyphenidyl"
            ],
            answer: 1,
            rationale: "Valbenazine and deutetrabenazine are the two FDA-approved medications for managing the symptoms of tardive dyskinesia. Dantrolene sodium and bromocriptine mesylate treat neuroleptic malignant syndrome by relieving muscle rigidity and reducing fever. Trihexyphenidyl is an anticholinergic used for pseudoparkinsonism.",
            topic: "Schizophrenia & Schizoaffective Disorder",
            source: "quiz-bank"
          },
          {
            /* dantrolene sodium */
            stem: "A patient with neuroleptic malignant syndrome is admitted to the ICU. What is the purpose of dantrolene sodium in this patient?",
            options: [
              "To restore the white blood cell count",
              "To sedate the patient for the duration of treatment",
              "To relieve muscle rigidity and reduce fever",
              "To replace the antipsychotic at a lower dose"
            ],
            answer: 2,
            rationale: "Dantrolene sodium and bromocriptine mesylate relieve muscle rigidity and reduce the fever in neuroleptic malignant syndrome, alongside supportive care, hydration, cooling measures and vital sign monitoring. Lorazepam is what is used for agitation. All antipsychotics are stopped immediately rather than replaced at a lower dose, and white cell counts relate to clozapine-induced agranulocytosis.",
            topic: "Schizophrenia & Schizoaffective Disorder",
            source: "quiz-bank"
          },
          {
            /* bromocriptine mesylate */
            stem: "Bromocriptine mesylate is given to a patient being treated for neuroleptic malignant syndrome. Which nursing action accompanies it?",
            options: [
              "Restart the antipsychotic at half the previous dose",
              "Draw a white blood cell count weekly for 18 weeks",
              "Perform the AIMS assessment every 3 months",
              "Monitor vital signs and continue cooling and hydration"
            ],
            answer: 3,
            rationale: "Neuroleptic malignant syndrome is managed with symptomatic and supportive treatment: hydration with oral and IV fluids, monitoring vital signs, cooling measures as ordered, correcting electrolyte imbalances and treating any dysrhythmia, all in the ICU. The antipsychotic is stopped, not restarted. Weekly WBC monitoring belongs to clozapine, and the AIMS is for tardive dyskinesia.",
            topic: "Schizophrenia & Schizoaffective Disorder",
            source: "quiz-bank"
          },
          {
            /* SATA 1 — long-acting injectables */
            stem: "Which medications are available as long-acting injections for schizophrenia? Select all that apply.",
            options: [
              "Haloperidol decanoate",
              "Chlorpromazine",
              "Risperidone",
              "Paliperidone palmitate",
              "Benztropine",
              "Quetiapine"
            ],
            answers: [0, 2, 3],
            rationale: "Haloperidol decanoate, risperidone and paliperidone palmitate are the long-acting injectable forms, given every 2 to 4 weeks or up to months for patients at risk of non-adherence. Chlorpromazine and quetiapine appear in oral form here, and benztropine is an anticholinergic used to treat side effects rather than an antipsychotic.",
            topic: "Schizophrenia & Schizoaffective Disorder",
            source: "quiz-bank"
          },
          {
            /* SATA 2 — treating EPS */
            stem: "Which medications are indicated for treating the extrapyramidal side effects of antipsychotics? Select all that apply.",
            options: [
              "Benztropine",
              "Clozapine",
              "Trihexyphenidyl",
              "Propranolol",
              "Diazepam",
              "Dantrolene sodium"
            ],
            answers: [0, 2, 3, 4],
            rationale: "Benztropine and trihexyphenidyl are the anticholinergics used for akathisia and pseudoparkinsonism. Propranolol may be added for akathisia, as may diazepam or lorazepam, on a short-term basis only. Dantrolene sodium treats neuroleptic malignant syndrome, which is an adverse event rather than an extrapyramidal side effect. Clozapine is an antipsychotic and a cause of side effects, not a treatment for them.",
            topic: "Schizophrenia & Schizoaffective Disorder",
            source: "quiz-bank"
          },
          {
            /* SATA 3 — indicated in NMS */
            stem: "Which medications are indicated in the treatment of neuroleptic malignant syndrome? Select all that apply.",
            options: [
              "Dantrolene sodium",
              "Valbenazine",
              "Bromocriptine mesylate",
              "Lorazepam",
              "Haloperidol"
            ],
            answers: [0, 2, 3],
            rationale: "Dantrolene sodium and bromocriptine mesylate relieve muscle rigidity and reduce fever, and lorazepam is used for agitation. Valbenazine manages tardive dyskinesia, a different adverse effect. Haloperidol is an antipsychotic and would be stopped immediately, since the first action in neuroleptic malignant syndrome is to discontinue all antipsychotics.",
            topic: "Schizophrenia & Schizoaffective Disorder",
            source: "quiz-bank"
          }
        ],
        eaq: []
      }
    }

  ]
};

/* Display order for the topic-breakdown strip on a custom exam. */
window.TOPIC_ORDER = [
  "Introduction to PMH Nursing",
  "Neurobiology & Pharmacology",
  "Anger, Aggression & Violence",
  "Assessment, Theories & Therapies",
  "Group & Physiologic Therapies",
  "Therapeutic Communication",
  "Depressive Disorders",
  "Bipolar & Related Disorders",
  "Suicide",
  "Nonsuicidal Self-Injury",
  "Substance Use & Addictive Disorders",
  "Personality Disorders",
  "Eating & Feeding Disorders",
  "Schizophrenia & Schizoaffective Disorder"
];
