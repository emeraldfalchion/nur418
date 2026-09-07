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

   extraPractice  High-yield content NOT covered by a mustKnow
                  question in the same topic — largely the Key Terms
                  tables. Must not test the same point as any
                  mustKnow question in that topic.

   eaq            Imported from an outside question bank. NUR418 has
                  no such source, so every set is empty and the column
                  renders disabled. That is intentional.

   ------------------------------------------------------------
   INVARIANTS TO CHECK AFTER ANY EDIT
   ------------------------------------------------------------
     * Every topic carries at least 1 mustKnow SATA and 1
       extraPractice SATA.
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
   ============================================================ */
window.QUIZ_BANK = {

  columns: [
    /* NOTE: the EAQ blurb carries a HARDCODED COUNT. Update it whenever an EAQ
       set is added or a question is removed, or the page will quietly lie. */
    { key: "mustKnow",      label: "Must Know",      blurb: "One question for every Learning Outcome in the pre-lecture slides." },
    { key: "extraPractice", label: "Extra Practice", blurb: "Key terms and other high-yield material not covered in the Learning Outcomes." },
    { key: "eaq",           label: "EAQs",           blurb: "All 50 Sherpath questions sorted by topic, with duplicates removed." }
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

        extraPractice: [
          {
            stem: "Two siblings are raised in the same household and one develops a mental illness in adulthood while the other does not. Which model best explains this?",
            options: [
              "The germ theory of mental illness",
              "The diathesis-stress model",
              "Moral degeneracy theory",
              "Inheritance theory"
            ],
            answer: 1,
            rationale: "The diathesis-stress model is the most accepted explanation: many people carry the biological predisposition, but it does not become illness unless a certain emotional or environmental stress occurs. Inheritance theory, an early nineteenth-century idea, holds that \"insanity\" simply passes from one generation to the next, which would not account for the difference between siblings.",
            topic: "Introduction to PMH Nursing",
            source: "quiz-bank"
          },
          {
            stem: "A client carries diagnoses of major depressive disorder and alcohol use disorder. A second client carries diagnoses of depression and diabetes. Which statement is accurate?",
            options: [
              "Both clients meet the definition of dual diagnosis",
              "Neither client meets the definition of dual diagnosis",
              "Only the first client has a dual diagnosis; the second has comorbidity",
              "Only the second client has a dual diagnosis, because one condition is medical"
            ],
            answer: 2,
            rationale: "Dual diagnosis requires that one of the two disorders be a substance use disorder, which is true of the first client only. Comorbidity is the broader term for any two co-occurring chronic illnesses, whether two mental health disorders or a mental and a medical one, which describes the second client.",
            topic: "Introduction to PMH Nursing",
            source: "quiz-bank"
          },
          {
            stem: "Which statements about deinstitutionalization and its consequences are accurate? Select all that apply.",
            options: [
              "Kennedy's 1963 Community Mental Health Act accelerated the movement out of state hospitals",
              "Community mental health centers grew slowly and were understaffed, without job training or life skills training",
              "Revolving-door treatment describes repeated ED visits and inpatient readmissions",
              "It expanded the nurse's role, since nurses could give the new medications and assist with therapies",
              "Most people leaving state hospitals had been taught the living skills they would need"
            ],
            answers: [0, 1, 2, 3],
            rationale: "The 1963 act accelerated the movement and expanded nursing practice, but the community centers meant to receive people were slow to grow and understaffed, which is what produced the revolving door. The last option reverses the central problem: people had been institutionalized and had no coping skills, no jobs, nowhere to live, and no ability to care for themselves.",
            topic: "Introduction to PMH Nursing",
            source: "quiz-bank"
          },
          {
            stem: "A client needs some supervision but not hospitalization, and attends about six hours of treatment several days a week before going home. Which setting is this?",
            options: [
              "Day treatment",
              "Residential treatment",
              "Acute care hospitalization",
              "Partial hospitalization"
            ],
            answer: 3,
            rationale: "Partial hospitalization is the transitional step between inpatient care and fully independent home life, running about six hours a day, multiple days a week. Day treatment sits one step below it at two to three times a week for about a month, and serves ongoing chronic illness rather than transition out of hospital.",
            topic: "Introduction to PMH Nursing",
            source: "quiz-bank"
          },
          {
            stem: "A nurse describes a client as having \"the optimism, competence, and sense of mastery to get through this.\" Which concept is being described, and why does it matter?",
            options: [
              "Recovery, which is only possible where the illness can actually be cured",
              "Resilience, which determines the incidence, severity, and prognosis of illness",
              "Adherence, which replaced compliance because of its negative connotation",
              "Capacity, which determines whether the client can consent to their treatment"
            ],
            answer: 1,
            rationale: "Resilience is the ability and capacity to secure the resources needed to support personal well-being, and it determines the incidence, severity, and prognosis of mental illness. Recovery is a real and separate concept, but the option misstates it: recovery is possible even where cure is not — schizophrenia cannot be cured, and a person with schizophrenia can still recover.",
            topic: "Introduction to PMH Nursing",
            source: "quiz-bank"
          }
        ],

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

        extraPractice: [
          {
            stem: "A client recovering from a stroke practices the same hand movement daily and slowly regains function. Which concept explains the improvement?",
            options: [
              "Synaptic pruning",
              "Neuroplasticity",
              "Negative feedback",
              "Excitotoxicity"
            ],
            answer: 1,
            rationale: "Neuroplasticity is the brain's lifelong ability to change with learning by reorganizing neural pathways, and it is why repetition of a skill or a behavior change matters. Synaptic pruning is the opposite process — removing unnecessary or damaged structures and weeding out weak, seldom-used synapses.",
            topic: "Neurobiology & Pharmacology",
            source: "quiz-bank"
          },
          {
            stem: "Which statements about synaptic pruning are accurate? Select all that apply.",
            options: [
              "It removes neuronal structures that are unnecessary or damaged",
              "It weeds out weaker synapses, improving the brain's networking capacity",
              "It occurs only during prenatal development and stops entirely at birth",
              "It speeds up in the preteen years and again at midlife",
              "Simpler childhood associations are replaced by more complex structures"
            ],
            answers: [0, 1, 3, 4],
            rationale: "Pruning removes damaged and unused structures, improves the brain's networking capacity, and is thought to replace simpler childhood associations with more complex ones. It is ongoing rather than confined to gestation, though it does speed up prenatally through age two, in the preteen years, and at midlife.",
            topic: "Neurobiology & Pharmacology",
            source: "quiz-bank"
          },
          {
            stem: "A client stopped an antidepressant abruptly and now reports both the return of the original low mood and new symptoms that were not present before. How does the nurse interpret this?",
            options: [
              "Withdrawal from a drug of addiction, since antidepressants are habit-forming",
              "Discontinuation syndrome, which is why psychotropics are tapered",
              "A paradoxical reaction requiring an immediate dose increase",
              "Expected rebound that resolves within a few hours without intervention"
            ],
            answer: 1,
            rationale: "A sudden decrease or stop of certain psychotropics causes discontinuation syndrome, in which the original symptoms rebound and new physical or psychological symptoms appear. Antidepressants are not addicting — people neither abuse nor crave them — but the body does get used to them, which is why they are tapered rather than stopped.",
            topic: "Neurobiology & Pharmacology",
            source: "quiz-bank"
          },
          {
            stem: "An older adult is starting treatment for a new psychiatric diagnosis. Which prescribing approach reflects the principles of psychopharmacology?",
            options: [
              "Begin two medications together, so that a response appears sooner",
              "Begin at the usual adult dose, reducing it only if side effects appear",
              "Begin one medication at a low dose and titrate up slowly",
              "Begin at a high dose and taper down once the symptoms improve"
            ],
            answer: 2,
            rationale: "Start low and titrate up slowly, use the lowest effective dose, and start only one new medication at a time so a side effect can be traced to the drug that caused it. Starting two at once destroys that traceability, and risks weigh especially heavily in older adults, who may be more sensitive and are often already on several medications.",
            topic: "Neurobiology & Pharmacology",
            source: "quiz-bank"
          },
          {
            stem: "Which structure alerts a person to danger with enough fear and anxiety to protect them, and plays a large role in anxiety and OCD?",
            options: [
              "The amygdala",
              "The hippocampus",
              "The thalamus",
              "The limbic system as a whole"
            ],
            answer: 0,
            rationale: "The amygdala is the emotional center of the brain — emotion, anxiety, fear, and pleasure — and part of the fight-or-flight system. The limbic system is the broader structure governing learning, memories, and emotions and coordinating visceral responses; naming it here is correct but not specific enough to the finding described.",
            topic: "Neurobiology & Pharmacology",
            source: "quiz-bank"
          }
        ],

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

        extraPractice: [
          {
            stem: "A client shoves a staff member who is blocking a doorway. A second client pushes past someone to escape a fire. Which statement distinguishes these acts?",
            options: [
              "Both acts are violence, because physical force was used in each of them",
              "Neither act is violence, because neither one of them caused an injury",
              "The first is aggression; the second is violence, because escape was the motive",
              "The first is violence; the second is aggression, sometimes appropriate"
            ],
            answer: 3,
            rationale: "Violence is always an objectionable act — that is exactly what separates it from aggression. Aggression is a verbal or physical attack intended to threaten or injure, virtually always designed to punish, but not always inappropriate: it is sometimes necessary for self-protection. Injury does not have to occur for an act to be violent; the potential is enough.",
            topic: "Anger, Aggression & Violence",
            source: "quiz-bank"
          },
          {
            stem: "Which statements correctly describe anger as taught in this course? Select all that apply.",
            options: [
              "It is a normal human emotion, like anxiety",
              "It ranges from mild irritation to intense fury and rage",
              "It is always pathological and requires intervention",
              "Expressed assertively, it can solve problems and drive decisions",
              "It becomes a problem when it is expressed aggressively"
            ],
            answers: [0, 1, 3, 4],
            rationale: "Anger is an emotional response to frustrated desires, a threat, or a challenge; it is normal, capable of being under personal control, and productive when expressed assertively. It becomes a problem only when expressed aggressively — which is why treating anger itself as pathological misreads the concept.",
            topic: "Anger, Aggression & Violence",
            source: "quiz-bank"
          },
          {
            stem: "Which definition of restraint is accurate?",
            options: [
              "Any device or method that reduces a patient's ability to move freely",
              "Only a mechanical device applied to the wrists or the ankles by trained staff",
              "Involuntary confinement of a patient alone in a room they cannot leave",
              "Any medication given to a patient who is actively refusing nursing care"
            ],
            answer: 0,
            rationale: "Restraint covers any manual method, physical or mechanical device, material, or equipment that immobilizes or reduces the ability to move arms, legs, body, or head freely — which is why side rails and tucked sheets can qualify. The third option defines seclusion. A medication is a chemical restraint only when ordered specifically for agitation.",
            topic: "Anger, Aggression & Violence",
            source: "quiz-bank"
          },
          {
            stem: "A restraint episode has just ended. Which statement about the critical incident debriefing is accurate?",
            options: [
              "It is optional, and is held only when a staff member requests one afterward",
              "It is immediate and mandatory, with the client and the staff involved",
              "It involves staff only, so that the client is not re-traumatized by the review",
              "It is scheduled within 72 hours, to allow everyone time to reflect first"
            ],
            answer: 1,
            rationale: "Debriefing is immediate and mandatory after every restraint episode, and includes both the client and the staff who participated or witnessed. If it cannot happen immediately it must occur within the first couple of hours, or at least within the shift — not days later. It asks what could have prevented the episode, whether the team responded as a team, and what would be done differently.",
            topic: "Anger, Aggression & Violence",
            source: "quiz-bank"
          },
          {
            stem: "A client is placed in seclusion. Which statement reflects its correct use?",
            options: [
              "It is more restrictive than mechanical restraint, so it is used last",
              "It may be used when a client repeatedly refuses to attend a scheduled group",
              "It is involuntary confinement alone, used only for immediate safety",
              "It requires the client's agreement before it can be initiated by staff"
            ],
            answer: 2,
            rationale: "Seclusion is involuntary confinement of a patient alone in a room or area they are physically prevented from leaving, and it is never punitive: the goal is safety, and it is only for violent or self-destructive behavior that jeopardizes immediate physical safety. It is less restrictive than restraint, and using it for non-participation in treatment would be punitive.",
            topic: "Anger, Aggression & Violence",
            source: "quiz-bank"
          }
        ],

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

        extraPractice: [
          {
            stem: "A client on an inpatient unit earns tokens for attending groups, completing ADLs, and asking for medications, and can trade them for privileges. Which behavioral therapy is in use?",
            options: [
              "Modeling",
              "Aversion therapy",
              "Systematic desensitization",
              "Operant conditioning"
            ],
            answer: 3,
            rationale: "Operant conditioning uses positive reinforcement to increase desired behaviors, and the token level system is its classic form. Modeling demonstrates more effective behaviors and is much like role play; aversion therapy uses a negative stimulus to decrease an unwanted behavior, which is the opposite approach.",
            topic: "Assessment, Theories & Therapies",
            source: "quiz-bank"
          },
          {
            stem: "A client says \"My boss ruined my whole day by criticizing my report.\" Which response reflects the core premise of cognitive behavioral therapy?",
            options: [
              "\"What were you thinking when he criticized it, and how did that feel?\"",
              "\"Your boss should not have spoken to you in that way at all.\"",
              "\"Let's look at what in your childhood makes criticism feel so painful.\"",
              "\"Try to avoid contact with your boss for the rest of this week.\""
            ],
            answer: 0,
            rationale: "CBT holds that our thoughts cause our feelings and behaviors, not external things like people or situations — so the intervention targets the thought about the criticism. Tracing the reaction to childhood is a psychoanalytic move, and avoiding the trigger changes the situation rather than the thinking.",
            topic: "Assessment, Theories & Therapies",
            source: "quiz-bank"
          },
          {
            stem: "Which statements about dialectical behavior therapy are accurate? Select all that apply.",
            options: [
              "It was originally developed to treat chronically suicidal individuals",
              "Many of those clients had borderline personality disorder",
              "It combines cognitive and behavioral techniques with mindfulness",
              "It is used only for suicidal ideation and no other presentation",
              "It involves the integration of opposites"
            ],
            answers: [0, 1, 2, 4],
            rationale: "DBT integrates opposites, combining cognitive and behavioral technique with mindfulness, and was developed for chronically suicidal individuals, many with borderline personality disorder. It also helps with other self-destructive or self-injurious behaviors, including eating disorders and substance abuse, so restricting it to suicidal ideation understates its use.",
            topic: "Assessment, Theories & Therapies",
            source: "quiz-bank"
          },
          {
            stem: "A client is referred for a therapy that targets relationships by improving functioning and communication patterns. What should the nurse tell the client about its length?",
            options: [
              "It runs two to three times a week for several years",
              "It is very short-term, at 12 to 16 sessions",
              "It continues indefinitely as maintenance therapy",
              "It takes one to two years to show the best results"
            ],
            answer: 1,
            rationale: "Interpersonal therapy is very short-term at 12 to 16 sessions. Two to three times a week for several years describes psychoanalysis, which is not seen inpatient, and one to two years describes DBT — both are real durations attached to the wrong therapy.",
            topic: "Assessment, Theories & Therapies",
            source: "quiz-bank"
          },
          {
            stem: "A client who was passed over for one promotion says \"I am never going to get promoted, ever.\" Which cognitive distortion is this?",
            options: [
              "Overgeneralization",
              "Mental filter",
              "Emotional reasoning",
              "Personalization"
            ],
            answer: 0,
            rationale: "Overgeneralization turns a single negative event into an always or never. Mental filter is dwelling on one negative while ignoring all the positive feedback, emotional reasoning treats a feeling as evidence of fact, and personalization holds oneself responsible for something outside one's control.",
            topic: "Assessment, Theories & Therapies",
            source: "quiz-bank"
          }
        ],

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

        extraPractice: [
          {
            stem: "A nurse teaches a client and their spouse about a new medication. Does this meet the definition of a group?",
            options: [
              "No, because patient teaching is not a form of therapy",
              "Yes, because a group is two or more people with common goals",
              "No, because a group must have at least four members present",
              "Yes, but only when a second nurse co-leads the session"
            ],
            answer: 1,
            rationale: "A group is two or more people pursuing common goals or interests and benefiting by mutually giving and receiving feedback, so patient and family education counts as leading a group. There is no minimum of four members and no co-leader requirement.",
            topic: "Group & Physiologic Therapies",
            source: "quiz-bank"
          },
          {
            stem: "Which instructions are correct for a client starting phototherapy? Select all that apply.",
            options: [
              "Use a light source of about 10,000 lux",
              "Look directly into the light for the full session",
              "Use it for 30 to 45 minutes a day",
              "Use it in the morning",
              "Position the light box off to the side"
            ],
            answers: [0, 2, 3, 4],
            rationale: "Phototherapy uses a fluorescent light box with a strong UV filter at about 10,000 lux, placed off to the side, for 30 to 45 minutes a day, usually in the morning and most often during fall and winter. The client should not look directly into it — that is what the side positioning is for.",
            topic: "Group & Physiologic Therapies",
            source: "quiz-bank"
          },
          {
            stem: "A client asks how many ECT treatments they will need and how often. Which response is accurate?",
            options: [
              "\"Five days a week, for four to six weeks.\"",
              "\"One treatment a month, for about six months.\"",
              "\"Daily treatments until the symptoms fully resolve.\"",
              "\"Two to three treatments a week, for a total of 6 to 12.\""
            ],
            answer: 3,
            rationale: "ECT runs two to three treatments a week for a total of 6 to 12, and it is the most effective treatment for depression. Five days a week for four to six weeks is the TMS schedule — a real course length attached to the wrong treatment.",
            topic: "Group & Physiologic Therapies",
            source: "quiz-bank"
          },
          {
            stem: "Which statements about transcranial magnetic stimulation are accurate? Select all that apply.",
            options: [
              "The patient remains awake and alert during treatment",
              "It is delivered outpatient over about 30 minutes",
              "It requires general anesthesia and a muscle relaxant",
              "Patients can continue their medications during the course",
              "Headache and lightheadedness are the reported adverse reactions"
            ],
            answers: [0, 1, 3, 4],
            rationale: "TMS is non-invasive: the patient is awake and alert, sessions run about 30 minutes on an outpatient basis, medications continue, and the adverse reactions are headache and lightheadedness, with scalp tingling and discomfort at the site. Anesthesia and a muscle relaxant belong to ECT.",
            topic: "Group & Physiologic Therapies",
            source: "quiz-bank"
          },
          {
            stem: "A client says they take St. John's Wort for low mood and asks whether it is safe. Which point is most important to include?",
            options: [
              "It is FDA regulated, so the dose is consistent from one brand to the next",
              "Herbals are not FDA regulated, and active ingredient concentrations vary by brand",
              "It has no effect on neurotransmitters, so it cannot interact with medications",
              "It is only used for severe depression that has not responded to medication"
            ],
            answer: 1,
            rationale: "Herbals are not regulated by the FDA, the concentration of active ingredients varies between brands and formulas, and much more research is needed. St. John's Wort is thought to increase serotonin, norepinephrine, and dopamine, and it is used for mild-to-moderate depression rather than refractory severe depression.",
            topic: "Group & Physiologic Therapies",
            source: "quiz-bank"
          }
        ],

        eaq: []
      }
    },

    /* ==========================================================
       TOPIC 6 — THERAPEUTIC COMMUNICATION & RELATIONSHIPS

       IMPORTED, NOT LECTURED. Every question here comes from the
       Elsevier Adaptive Quizzing "Week 1 ticket to class quiz"
       (20 questions, completed 2026-08-23, scored 100%). The
       subject is textbook pp. 125-147 — the therapeutic
       relationship and therapeutic communication.

       This material is NOT taught on any of the five topic pages.
       That is why it sits in its own topic rather than being
       folded into "Assessment, Theories & Therapies": putting it
       there would tell the topic-breakdown strip that the site
       teaches this, and it does not. mustKnow and extraPractice
       are deliberately empty, so those two cells render disabled.

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
      label: "Therapeutic Communication & Relationships",
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
              topic: "Therapeutic Communication & Relationships",
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
              topic: "Therapeutic Communication & Relationships",
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
              topic: "Therapeutic Communication & Relationships",
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
              topic: "Therapeutic Communication & Relationships",
              source: "quiz-bank"
            }
          ],
        extraPractice: [],
        eaq: [
          {
            stem: "Which factor promoting patient growth describes the ability to view another person as worthy of caring about and as someone who has strengths and achievement potential?",
            options: ["Empathy", "Genuineness", "Positive regard", "Countertransference"],
            answer: 2,
            rationale: "Positive regard implies respect; it is the ability to view another person as being worthy of caring about and as someone who has strengths and achievement potential. Empathy occurs when the nurse attempts to understand the world from the patient's perspective. Genuineness refers to the nurse's ability to be open, honest, and authentic in interactions with patients. Countertransference does not promote patient growth. It occurs when the nurse unconsciously displaces feelings related to significant figures in the nurse's past onto the patient. (p. 132)",
            topic: "Therapeutic Communication & Relationships",
            source: "eaq"
          },
          {
            stem: "Which factor promoting patient growth occurs when the nurse attempts to understand the world from the patient's perspective?",
            options: ["Empathy", "Genuineness", "Positive regard", "Countertransference"],
            answer: 0,
            rationale: "Empathy occurs when the nurse attempts to understand the world from the patient's perspective. Genuineness refers to the nurse's ability to be open, honest, and authentic in interactions with patients. Positive regard implies respect; it is the ability to view another person as being worthy of caring about and as someone who has strengths and achievement potential. Countertransference does not promote patient growth. It occurs when the nurse unconsciously displaces feelings related to significant figures in the nurse's past onto the patient. (p. 132)",
            topic: "Therapeutic Communication & Relationships",
            source: "eaq"
          },
          {
            stem: "Which nursing competency refers to the patient as a full partner in care whose values, preferences, and needs are respected?",
            options: ["Patient-centered care", "Nurse-patient relationship", "Therapeutic communication", "Sender-messenger feedback loop"],
            answer: 0,
            rationale: "Quality and Safety Education for Nurses (QSEN) identifies competencies in nursing practice that relate to communication and interaction with patients. Patient-centered care is a QSEN competency that refers to the patient as a full partner in care whose values, preferences, and needs are respected. The nurse-patient relationship is based on mutual trust. Therapeutic communication is a crucial aspect of developing patient-centered care. The sender-messenger feedback loop is a diagram explaining delivery and interpretation of communication. (p. 136)",
            topic: "Therapeutic Communication & Relationships",
            source: "eaq"
          },
          {
            stem: "Which factor promoting patient growth refers to the nurse's ability to be open, honest, and authentic in interactions with patients?",
            options: ["Empathy", "Genuineness", "Positive regard", "Countertransference"],
            answer: 1,
            rationale: "Genuineness refers to the nurse's ability to be open, honest, and authentic in interactions with patients. Empathy occurs when the nurse attempts to understand the world from the patient's perspective. Positive regard implies respect; it is the ability to view another person as being worthy of caring about and as someone who has strengths and achievement potential. Countertransference does not promote patient growth. It occurs when the nurse unconsciously displaces feelings related to significant figures in the nurse's past onto the patient. (p. 132)",
            topic: "Therapeutic Communication & Relationships",
            source: "eaq"
          },
          {
            stem: "Which therapeutic communication technique is most appropriate for the nurse to use with a patient experiencing hallucinations who states, \"I see green men in the dining room\"?",
            options: ["Voicing doubt", "Giving information", "Using consensual validation", "Verbalizing the implied"],
            answer: 0,
            rationale: "The most appropriate therapeutic communication technique for the nurse to use for a patient who is hallucinating is voicing doubt. Voicing doubt is expressing uncertainty regarding the reality of the patient's perceptions, especially during hallucinations. Giving information supplies knowledge from which decisions can be made or conclusions drawn. Consensual validation clarifies that both the nurse and the patient share mutual understanding of communication. Verbalizing the implied puts into concrete terms what the patient implies, making the patient's communication more explicit. (p. 142)",
            topic: "Therapeutic Communication & Relationships",
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
            topic: "Therapeutic Communication & Relationships",
            source: "eaq"
          },
          {
            stem: "When interacting with a patient, the nurse develops a message and sends it to the patient. In turn, the patient interprets the message. According to the transactional model of communication, which term is used to describe this interaction?",
            options: ["Channel", "Feedback", "Communicator", "Encoding/decoding"],
            answer: 3,
            rationale: "According to the transactional model of communication, encoding/decoding refers to an interaction in which a person develops a message and sends it to another. In turn, the receiver decodes the message. Channel refers to a method by which communication takes place. Feedback refers to messaging that takes place with constant feedback being given by both parties. Feedback for one is the message for the other. Senders and receivers are both considered to be communicators, which makes roles fluid and communicators interdependent. (p. 137)",
            topic: "Therapeutic Communication & Relationships",
            source: "eaq"
          },
          {
            stem: "In which phase of the nurse-patient relationship would the nurse provide education about the patient's disorder and relevant medication?",
            options: ["Working", "Orientation", "Termination", "Preorientation"],
            answer: 0,
            rationale: "The working phase involves gathering further data, identifying problem-solving skills and self-esteem, providing education about the disorder, promoting symptom management, providing medication education, and evaluating progress. The orientation phase of the nurse-patient relationship involves establishing rapport, specifying a contract, and explaining confidentiality. The termination phase involves summarizing the goals and objectives achieved in the relationship, discussing ways for the patient to incorporate into daily life any new coping strategies learned, reviewing situations that occurred during the nurse-patient relationship, and exchanging memories to help validate the experience. Preorientation involves reviewing the patient's chart, conducting research, consulting with staff, and exploring feelings about the first encounter. (p. 131)",
            topic: "Therapeutic Communication & Relationships",
            source: "eaq"
          },
          {
            stem: "Which concept provides the foundation for the development of a therapeutic nurse-patient relationship?",
            options: ["Culture", "Environment", "Communication", "Nonverbal behavior"],
            answer: 2,
            rationale: "Communication provides the foundation for the development of a therapeutic nurse-patient relationship. Therapeutic relationships are influenced by effective (positive) and ineffective (negative) communication. Culture may influence verbal and nonverbal aspects of communication. The physical environment may affect communication; for example, excessive noise may decrease attention to the message sent. Nonverbal behavior is another aspect of communication and is significant in sending messages to the receiver. (p. 136)",
            topic: "Therapeutic Communication & Relationships",
            source: "eaq"
          },
          {
            stem: "The nurse is participating in therapeutic communication with the patient. Which personal factor may impede accurate interpretation of messages?",
            options: ["Interruptions", "Lack of privacy", "Language barriers", "Uncomfortable accommodations"],
            answer: 2,
            rationale: "Personal factors can impede accurate transmission or interpretation of messages. Language barriers are personal factors that may reduce the normal flow of communication. Interruptions, lack of privacy, and uncomfortable accommodations are examples of environmental factors that can impede communication. (p. 138)",
            topic: "Therapeutic Communication & Relationships",
            source: "eaq"
          },
          {
            stem: "Which factor serves as a barrier to communication because of inequality?",
            options: ["Personal factors", "Relationship factors", "Environmental factors", "Neurocognitive factors"],
            answer: 1,
            rationale: "Relationship factors refer to the level of equality within the relationship. When two participants are equal, the relationship is symmetrical. When there is a difference in status or power, the relationship is characterized by inequality. Personal factors are those that impede accurate transmission or interpretation of messages such as neurocognitive disorders or psychotic states. Environmental factors such as background noise, lack of privacy, and uncomfortable accommodations are barriers that do not create inequality between the nurse and patient. Neurocognitive factors exemplify personal factors. (p. 139)",
            topic: "Therapeutic Communication & Relationships",
            source: "eaq"
          },
          {
            stem: "The nurse is uncertain of the meaning of the patient's statement. Which therapeutic communication technique is helpful in clarifying the patient's message?",
            options: ["Silence", "Restating", "Open-ended questions", "Closed-ended questions"],
            answer: 1,
            rationale: "Restating is an active listening strategy that helps the nurse to understand what the patient is saying. Clarifying the message can be done by restating or paraphrasing what the patient said. Silence gives the patient time to collect thoughts or think through a point. Open-ended questions encourage the patient to share information about experiences, perceptions, or response to a situation. Closed-ended questions are used to yield \"yes\" or \"no\" answers. (p. 142)",
            topic: "Therapeutic Communication & Relationships",
            source: "eaq"
          },
          {
            stem: "The patient states, \"I wish I were dead.\" The nurse replies, \"Things get worse before they get better.\" The nurse's response is an example of which type of nontherapeutic communication?",
            options: ["Disagreeing", "Giving approval", "Falsely reassuring", "Minimizing feelings"],
            answer: 3,
            rationale: "Nontherapeutic communication techniques are those that impede or shut down the nurse-patient interaction. The nurse's response to the patient is minimizing the patient's feelings. Disagreeing would be a response such as, \"You do not wish you were dead.\" Giving approval would be a response such as, \"I agree with you.\" False reassurance would be a response such as, \"Everything will be all right.\" (p. 144)",
            topic: "Therapeutic Communication & Relationships",
            source: "eaq"
          },
          {
            stem: "Which person leads the content and direction of the clinical interview?",
            options: ["Nurse", "Patient", "Physician", "Counselor"],
            answer: 1,
            rationale: "Psychiatric conditions may cause changes in the ability to process information. Therefore, it is critical to any kind of counseling to permit the patient to set the pace of the clinical interview rather than the nurse, physician, or counselor. (p. 147)",
            topic: "Therapeutic Communication & Relationships",
            source: "eaq"
          },
          {
            stem: "During which phase of the nurse-patient relationship is rapport established with the patient?",
            options: ["Working", "Orientation", "Termination", "Preorientation"],
            answer: 1,
            rationale: "The orientation phase of the nurse-patient relationship involves establishing rapport, specifying a contract, and explaining confidentiality. The working phase involves gathering further data, identifying problem-solving skills and self-esteem, providing education about the disorder, promoting symptom management, providing medication education, and evaluating progress. The termination phase involves summarizing the goals and objectives achieved in the relationship, discussing ways for the patient to incorporate into daily life any new coping strategies learned, reviewing situations that occurred during the nurse-patient relationship, and exchanging memories to help validate the experience. Preorientation involves reviewing the patient's chart, conducting research, consulting with staff, and exploring feelings about the first encounter. (p. 129)",
            topic: "Therapeutic Communication & Relationships",
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
            topic: "Therapeutic Communication & Relationships",
            source: "eaq"
          },
          {
            stem: "Which emotion does the nurse express when they state, \"Those sounds were so frustrating and overwhelming; the sounds could make the other patients react in an aggressive manner,\" after listening to hallucinations from a patient diagnosed with schizophrenia?",
            options: ["Surprise", "Empathy", "Sympathy", "Anticipation"],
            answer: 1,
            rationale: "Acknowledging the patient's feelings and emotions indicates empathy. This helps the nurse understand the patient's perceptions and provide effective care and treatment. One of the teaching strategies for nursing is stimulation education, in which the nurse can experience what the patients feel and can develop empathy toward them. Surprise is the feeling expressed in unexpected situations. The nurse feels sympathy for the patient based on self-perceptions. Sympathy is not a therapeutic response because it is associated with feelings of pity and commiseration. Anticipation means to positively look forward to something that is going to happen. (p. 132)",
            topic: "Therapeutic Communication & Relationships",
            source: "eaq"
          },
          {
            stem: "Which therapeutic communication technique is being used when a nurse asks a patient, \"I realize that you lost your wife recently. Can you tell me about how you have been doing since this loss\"?",
            options: ["Restating", "Giving information", "Making observations", "Exploring"],
            answer: 3,
            rationale: "Exploring is the therapeutic communication technique used in this example. Exploring is used to examine patient experiences more fully. Restating involves repeating the main ideas expressed by the patient to give the patient an idea of what has been communicated. Giving information involves informing the patient of facts needed to make decisions or come to realistic conclusions. Making observations involves assessing nonverbal communication. (p. 142)",
            topic: "Therapeutic Communication & Relationships",
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
            topic: "Therapeutic Communication & Relationships",
            source: "eaq"
          },
          {
            stem: "Which kind of relationship occurs between people who have an emotional connection to each other?",
            options: ["Social", "Intimate", "Therapeutic", "Inappropriate"],
            answer: 1,
            rationale: "Intimate relationships occur between people who have an emotional commitment to each other. Within intimate relationships, mutual needs are met, and intimate desires and hopes are shared. Morally, legally, and ethically, nurses and nursing students do not have intimate relationships with patients. A social relationship is primarily initiated for the purpose of friendship, socialization, enjoyment, or accomplishment of a task. In a therapeutic relationship, the nurse maximizes communication skills, understanding of human behaviors, and personal strengths to enhance the patient's growth. An inappropriate relationship occurs when professional boundaries between the nurse and patient are not maintained. (p. 125)",
            topic: "Therapeutic Communication & Relationships",
            source: "eaq"
          }
        ]
      }
    },

    /* ==========================================================
       TOPIC 7 — CULTURAL CARE

       IMPORTED, NOT LECTURED. From the EAQ "Week 1: EAQ Quiz"
       (30 questions, completed 2026-08-26, scored 86.67%). These 9
       cover textbook pp. 79-86: ethnicity, race, minority, multiple
       heritage, cultural norms, Latinx, culturally congruent
       practice, and the Susto cultural syndrome.

       A grep confirmed none of this is on any topic page, so it gets
       its own row rather than being folded into an existing topic.
       The other 21 questions from that quiz DID map onto taught
       subjects and went into the eaq sets of Introduction (legal and
       rights, 9), Anger (11), and Neurobiology (1).
       ========================================================== */
    {
      id: "week1-cultural-care",
      label: "Cultural Care",
      week: 1,
      sets: {
        mustKnow: [],
        extraPractice: [],
        eaq: [
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
            topic: "Cultural Care",
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
            topic: "Cultural Care",
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
            topic: "Cultural Care",
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
            topic: "Cultural Care",
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
            topic: "Cultural Care",
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
            topic: "Cultural Care",
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
            topic: "Cultural Care",
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
            topic: "Cultural Care",
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
            topic: "Cultural Care",
            source: "eaq"
          }
        ]
      }
    },
    /* ==========================================================
       TOPIC 8 — DEPRESSIVE DISORDERS  (Week 2)
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
        extraPractice: [
          {
            stem: "A patient's mood shifts from tearful to laughing and back several times within an hour. Which term describes this?",
            options: [
              "Anhedonia",
              "Lability",
              "Psychomotor agitation",
              "Rapid cycling"
            ],
            answer: 1,
            rationale: "Lability is rapid, exaggerated shifting of emotional expression, typically over one or two hours. Anhedonia is loss of pleasure, not a shift in expression. Psychomotor agitation is increased motor activity from mental tension, which is movement rather than mood. Rapid cycling is measured in mood episodes across a year, not shifts within an hour.",
            topic: "Depressive Disorders",
            source: "quiz-bank"
          },
          {
            stem: "A patient who was an avid gardener and choir member now says none of it interests them and nothing feels enjoyable. Which term best captures this finding?",
            options: [
              "Indolence",
              "Inappetence",
              "Anhedonia",
              "Impedance"
            ],
            answer: 2,
            rationale: "Anhedonia is the loss of interest or pleasure in almost all activities, and it is one of the two symptoms at least one of which must be present to diagnose major depressive disorder. Indolence is laziness, inappetence is loss of appetite, and impedance is a hindrance — none of them names a loss of pleasure.",
            topic: "Depressive Disorders",
            source: "quiz-bank"
          },
          {
            stem: "Which findings indicate psychomotor agitation rather than psychomotor retardation? Select all that apply.",
            options: [
              "Pacing the hallway continuously",
              "Taking a long time to cross the room",
              "Tapping the fingers and feet",
              "Long pauses before speaking",
              "Slow chewing with long waits between bites"
            ],
            answers: [0, 2],
            rationale: "Psychomotor agitation is an increase in activity driven by mental tension — pacing and tapping here — and it is associated with agitated depression. Slow movement across a room, long pauses before speech, and slow chewing with long waits between bites are all psychomotor retardation, a visible slowing associated with severe depression. The two are opposite directions of the same dimension, which is why they are easy to confuse.",
            topic: "Depressive Disorders",
            source: "quiz-bank"
          },
          {
            stem: "A patient reports a low, joyless mood on most days for the past three years, never severe enough to stop working. Which disorder fits this presentation?",
            options: [
              "Persistent depressive disorder",
              "Disruptive mood dysregulation disorder",
              "Premenstrual dysphoric disorder",
              "Major depressive disorder, single episode"
            ],
            answer: 0,
            rationale: "Persistent depressive disorder is a chronically low mood over a long span at a severity below that of a major depressive episode, which is what continued employment reflects here. DMDD is diagnosed only in children and centers on temper outbursts, and premenstrual dysphoric disorder is confined to the luteal phase. Major depressive disorder would require a discrete episode meeting the full symptom criteria rather than years of steady low mood.",
            topic: "Depressive Disorders",
            source: "quiz-bank"
          },
          {
            stem: "Why does a tricyclic antidepressant carry particular risk for a patient with active suicidal ideation living at home?",
            options: [
              "It reaches a therapeutic serum level considerably faster than an SSRI",
              "It is lethal in overdose through cardiac effects and CNS depression",
              "It causes serotonin syndrome more often than an SSRI",
              "It cannot be tapered and must be stopped abruptly"
            ],
            answer: 1,
            rationale: "Tricyclics are deadly in overdose — dysrhythmias, tachycardia, MI, and heart block, plus fatal CNS depression, and equally so combined with alcohol — which is why quantity dispensed matters for a patient at risk. They are in fact slower to work than an SSRI, taking 10 to 14 days for results. Serotonin syndrome is more associated with serotonergic combinations, and no antidepressant should be stopped abruptly.",
            topic: "Depressive Disorders",
            source: "quiz-bank"
          }
        ],
        eaq: []
      }
    },

    /* ==========================================================
       TOPIC 9 — BIPOLAR & RELATED DISORDERS  (Week 2)
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
        extraPractice: [
          {
            stem: "A patient has had five distinct mood episodes in the past 12 months, each lasting more than two weeks, with partial remission between them. Which term applies?",
            options: [
              "Mood lability",
              "Rapid cycling",
              "Hypomania",
              "Cyclothymia"
            ],
            answer: 1,
            rationale: "Rapid cycling means four or more episodes for at least 2 weeks within 12 months, with partial or full remission between them or a switch to the opposite pole, and it carries a high risk of recurrence. Mood lability is the trap here: it shifts every one or two hours rather than across a year. Hypomania names a single episode type, and cyclothymia is a milder fluctuating pattern with no full episode of either pole.",
            topic: "Bipolar & Related Disorders",
            source: "quiz-bank"
          },
          {
            stem: "Which features are part of DIG FAST, the clinical picture of mania and hypomania? Select all that apply.",
            options: [
              "Distractibility",
              "Flight of ideas",
              "Psychomotor retardation",
              "Grandiosity",
              "Sleep deficit"
            ],
            answers: [0, 1, 3, 4],
            rationale: "DIG FAST is distractibility, indiscretion, grandiosity, flight of ideas, activity increase, sleep deficit, and talkativeness — and it covers both mania and hypomania. Psychomotor retardation is the visible slowing seen in severe depression, the opposite pole, which is what makes it the tempting wrong answer in a bipolar question.",
            topic: "Bipolar & Related Disorders",
            source: "quiz-bank"
          },
          {
            stem: "A patient on lithium works outdoors year-round and asks about salt intake before shifts. What should the nurse teach?",
            options: [
              "Load up on salty foods before every shift spent working outdoors",
              "Restrict sodium intake to protect kidney function",
              "Keep sodium intake steady, and hydrate more before the shift",
              "Skip the morning dose on days spent working outdoors"
            ],
            answer: 2,
            rationale: "Sodium intake stays steady, which is also what makes the monitored lithium levels interpretable, and extra hydration covers the sweating. Pre-loading sodium before a habitual daily activity is the classic wrong answer — that activity is already the baseline the levels reflect; extra sodium is for an unaccustomed exertion. Restricting sodium raises toxicity risk, because losing sodium makes the kidneys retain lithium. Skipping doses is never patient-directed.",
            topic: "Bipolar & Related Disorders",
            source: "quiz-bank"
          },
          {
            stem: "A patient on lithium develops dry skin, hair loss, constipation, bradycardia, and cold intolerance after 10 months. What does the nurse suspect?",
            options: [
              "Decreased thyroid function",
              "Early lithium toxicity",
              "Impaired renal function",
              "An anticholinergic reaction"
            ],
            answer: 0,
            rationale: "Thyroid function may decrease on lithium, usually after 6 to 18 months, and this cluster is the hypothyroid picture — which is why thyroid hormones are checked every 6 months. Early toxicity presents with GI upset, coarse tremor, and confusion instead. Renal damage is a real long-term risk but shows in creatinine rather than in these symptoms, and lithium is not an anticholinergic drug.",
            topic: "Bipolar & Related Disorders",
            source: "quiz-bank"
          },
          {
            stem: "A patient with bipolar disorder in a depressive phase asks why an antidepressant alone will not be prescribed. Which explanation is correct?",
            options: [
              "An antidepressant alone has no effect on the depressive phase",
              "Antidepressants interact with every mood stabilizer in use",
              "An antidepressant alone can precipitate a manic episode",
              "Antidepressants must be reserved until lithium has failed"
            ],
            answer: 2,
            rationale: "An antidepressant given alone can throw a patient with bipolar disorder into mania, which is why mood stabilizers are the first medications used and why Symbyax pairs fluoxetine with olanzapine rather than giving the SSRI on its own. Antidepressants do work on depressive symptoms, so the first option is simply false. The blanket interaction claim is not the reason, and lamotrigine, not a failed lithium trial, is what targets the depressed phase.",
            topic: "Bipolar & Related Disorders",
            source: "quiz-bank"
          }
        ],
        eaq: []
      }
    },

    /* ==========================================================
       TOPIC 10 — SUICIDE  (Week 2)
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
        extraPractice: [
          {
            stem: "A support group is offered for people whose family member died by suicide. Which term describes these participants?",
            options: [
              "Suicide survivors",
              "Interrupted self-directed violence, by other",
              "Suicide attempt survivors",
              "A suicide cluster"
            ],
            answer: 0,
            rationale: "Suicide survivor means the family and friends grieving a loved one's suicide — not the person who attempted, which is the common misreading. Interrupted self-directed violence by other describes someone stopped mid-act by another person. A cluster is an increase in suicides in a population, not a group of bereaved people.",
            topic: "Suicide",
            source: "quiz-bank"
          },
          {
            stem: "After a student's suicide, mental health professionals are sent into the school and reporters are asked to omit details of the method. What are they trying to prevent?",
            options: [
              "Interrupted self-directed violence",
              "Suicide contagion",
              "Non-suicidal self-directed violence",
              "A rise in nonsuicidal self-injury"
            ],
            answer: 1,
            rationale: "Suicide contagion is the increase in suicides that follows prominent, lengthy, or dramatic reporting, and detailing a method increases the use of that method — which is why press guidelines exist and why professionals go into a school afterward. The interrupted and non-suicidal terms describe individual behaviors rather than a population effect, and the concern here is suicide rather than self-injury without intent.",
            topic: "Suicide",
            source: "quiz-bank"
          },
          {
            stem: "A patient begins a suicide attempt and then stops on their own before serious injury. Which term applies?",
            options: [
              "Interrupted self-directed violence, by other",
              "Non-suicidal self-directed violence",
              "Interrupted self-directed violence, by self",
              "A non-fatal suicide attempt"
            ],
            answer: 2,
            rationale: "Interrupted self-directed violence by self is exactly this: the person takes steps toward injury and then stops themselves before the fatal injury. \"By other\" would require another person to intervene. Non-suicidal self-directed violence would mean no evidence of suicidal intent, and the intent here is present. A completed non-fatal attempt would mean the act was carried through.",
            topic: "Suicide",
            source: "quiz-bank"
          },
          {
            stem: "Which behaviors are classified as suicidal self-directed violence rather than non-suicidal self-directed violence? Select all that apply.",
            options: [
              "Overdosing on pills intending to die",
              "Cutting the forearm to relieve emotional tension",
              "Driving into a barrier hoping not to survive",
              "Scratching the skin during a panic episode",
              "Taking a lethal dose of a medication by accident"
            ],
            answers: [0, 2],
            rationale: "The dividing line is evidence of suicidal intent, not the severity of the injury or the method. Overdosing to die and crashing hoping not to survive both carry intent. Cutting for relief of tension and scratching during panic are self-injury without intent to die, which makes them non-suicidal self-directed violence however serious the wound looks. An accidental lethal dose carries no intent at all, so it falls outside both categories — lethality alone never establishes intent.",
            topic: "Suicide",
            source: "quiz-bank"
          },
          {
            stem: "A patient took a non-lethal quantity of pills and later says they had hoped not to wake up. Which two terms does this history establish?",
            options: [
              "Suicidal plan and suicide contagion",
              "Suicide attempt and suicide intent",
              "Suicidal ideation only, with no attempt",
              "Non-suicidal self-directed violence and suicidal ideation"
            ],
            answer: 1,
            rationale: "A suicide attempt is a non-fatal self-directed potentially injurious behavior with any intent to die, and suicide intent is the wish to die at the time of the act — both are established here, and lethality does not enter the definition. A plan is the organized method and time frame, which was not described, and contagion is a population effect. Ideation alone would mean no act occurred, and the presence of intent rules out the non-suicidal category.",
            topic: "Suicide",
            source: "quiz-bank"
          }
        ],
        eaq: []
      }
    },

    /* ==========================================================
       TOPIC 11 — NONSUICIDAL SELF-INJURY  (Week 2)
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
        extraPractice: [
          {
            stem: "A patient with a history of cutting is admitted voicing hopelessness and behaving impulsively. What must the nurse determine?",
            options: [
              "Whether the wounds require sutures before the psychiatric assessment",
              "Whether the family is aware of the self-injury",
              "Whether suicidal ideation, a plan, and the means are present",
              "Whether the behavior meets the 5-day DSM-5 threshold"
            ],
            answer: 2,
            rationale: "NSSI and suicidal ideation are not the same thing and the nurse has to tell them apart — a patient showing self-injury with impulsivity and hopelessness gets asked directly about thoughts of suicide, a plan, and the means. Wound care matters but does not settle the question of risk. Family awareness and the diagnostic day-count are both assessment details that can wait behind safety.",
            topic: "Nonsuicidal Self-Injury",
            source: "quiz-bank"
          },
          {
            stem: "Which observations should raise suspicion of nonsuicidal self-injury? Select all that apply.",
            options: [
              "Long sleeves and long pants worn in hot weather",
              "Frequently reported accidents and mishaps",
              "Keeping sharp objects on hand",
              "Consistent attendance at group therapy",
              "Persistent questions about personal identity"
            ],
            answers: [0, 1, 2, 4],
            rationale: "Concealing clothing in hot weather, a pattern of claimed accidents, keeping sharps available, and persistent \"who am I\" questioning are all recognized signs, along with scars, time spent alone, and voiced worthlessness. Consistent group attendance is engagement in treatment, not a warning sign — it is the option that tests whether the pattern is being recognized rather than any negative-sounding detail being selected.",
            topic: "Nonsuicidal Self-Injury",
            source: "quiz-bank"
          },
          {
            stem: "A school nurse suspects self-harm in a student. Which scale is used?",
            options: [
              "The Self-Harm Inventory",
              "The C-SSRS",
              "The Brøset Violence Checklist",
              "SAFE-T"
            ],
            answer: 0,
            rationale: "The Self-Harm Inventory is the scale used when self-harm is suspected, in a school, a primary care office, the ED, or a medical unit; mental health leans on scales because there are no lab values for a condition like NSSI. The C-SSRS and SAFE-T assess suicide risk specifically, and the Brøset checklist predicts imminent violence toward others.",
            topic: "Nonsuicidal Self-Injury",
            source: "quiz-bank"
          },
          {
            stem: "Which statement about nonsuicidal self-injury is accurate?",
            options: [
              "It is always an attempt to manipulate other people",
              "It reliably indicates a wish to die",
              "It is typically a way to get relief from distress",
              "It occurs only in adolescents"
            ],
            answer: 2,
            rationale: "Self-injury typically functions as a release from distress rather than as an attempt to die, which is what the \"without suicidal intent\" in the definition captures. Calling it manipulation is one of the misconceptions that damages the therapeutic relationship. Reading it as a wish to die collapses the distinction the whole diagnosis rests on, and it is not confined to adolescence.",
            topic: "Nonsuicidal Self-Injury",
            source: "quiz-bank"
          },
          {
            stem: "A patient asks why a facial piercing they got last month is not considered self-injury. What is the basis for the distinction?",
            options: [
              "The piercing was not severe enough to qualify as tissue damage",
              "It was performed by another person rather than by the patient themselves",
              "It caused no clinically significant distress",
              "Body piercing is socially sanctioned behavior and is excluded"
            ],
            answer: 3,
            rationale: "The criteria exclude socially sanctioned behavior outright — body piercing, tattooing, and injury that is part of a religious or cultural ritual — so the exclusion is categorical rather than a judgment about the wound. Severity does not appear in the criteria. Who performed it is not the test either, and while distress is a separate criterion, the sanctioned-behavior exclusion is what settles this case.",
            topic: "Nonsuicidal Self-Injury",
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
  "Therapeutic Communication & Relationships",
  "Cultural Care",
  "Depressive Disorders",
  "Bipolar & Related Disorders",
  "Suicide",
  "Nonsuicidal Self-Injury"
];
