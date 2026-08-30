/* ============================================================
   torture-chamber.js — "The Torture Chamber" practice exam.

   A cumulative exam where EVERY question is select-all-that-apply.
   Content comes only from lecture material already taught on the
   topic pages.

   ============================================================
   EVERY QUESTION LINKS TO A MUST KNOW BULLET
   ============================================================
   Set by Holly on 2026-08-29. Each question carries a comment
   naming the must-know.html section and the bullet or key term it
   serves, so a cut bullet can be traced to the questions that go
   with it. The angle is always different from the corresponding
   quiz-bank.js mustKnow question — same bullet, different
   discrimination — so no two questions test the same point.

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
   PROVENANCE
   ============================================================
   2026-08-29 — Built in full, replacing the three template demo
   questions. 25 questions, 5 per topic across the five Week 1
   topics. Order produced by random shuffle with rejection sampling
   against all five constraints above (accepted after 2,349 draws).

   Correct-options-per-question spread:
     1 correct  ×2   (T4Q4 RET, T5Q4 TMS)
     2 correct  ×4
     3 correct  ×7
     4 correct  ×6
     5 correct  ×4
     all correct ×2  (T2Q3 neurotransmitters, T3Q5 debriefing)

   No live lecture existed for Week 1, so nothing here derives from
   in-class questions. Sourced only from the five topic pages.
   ============================================================ */
window.EXAM_DATA = {
  id: "torture-chamber",
  title: "The Torture Chamber",

  questions: [
    {
      /* Must Know → Assessment, Theories & Therapies → Key Terms,
         "★ Cognitive distortions (stinkin' thinkin')".
         3 correct of 5. Wrong options at 0, 2. */
      stem: "A client makes the following statements during a session. Which are examples of cognitive distortions? Select all that apply.",
      options: [
        "\"I noticed that I have been more tired than usual this week.\"",
        "\"I made one mistake on the report, so I am a complete failure.\"",
        "\"I would like to talk to someone about how I have been feeling.\"",
        "\"I felt anxious all morning, so something bad must be coming.\"",
        "\"My manager praised the team, but that doesn't count — she praises everyone.\""
      ],
      answers: [1, 3, 4],
      rationale: "Calling yourself a failure over one mistake is labeling, taking a feeling as evidence that something bad will happen is emotional reasoning, and rejecting praise as not counting is discounting the positive. The other two statements are an accurate observation and a request for help — neither distorts anything, and noticing a change in your own energy is exactly the self-monitoring that therapy encourages.",
      topic: "Assessment, Theories & Therapies"
    },
    {
      /* Must Know → Anger, Aggression & Violence → "A restrained patient
         is never left alone…". 4 correct of 6. Wrong options at 1, 4. */
      stem: "A client has been placed in violent restraints. Which nursing actions are correct? Select all that apply.",
      options: [
        "Check that two fingers fit between the restraint and the limb",
        "Leave the client alone in the room so that stimulation is reduced",
        "Assess level of awareness, level of activity, and vital signs",
        "Offer fluids, food, and the opportunity for elimination",
        "Position the client prone in the restraints to limit thrashing",
        "Remove the restraints one limb at a time to perform range of motion"
      ],
      answers: [0, 2, 3, 5],
      rationale: "Two fingers under the restraint checks it is not too tight, and awareness, activity, vital signs, circulation, hydration, nutrition, and toileting are all part of the ongoing assessment, with range of motion done one limb at a time. A patient in restraints is never left alone — someone sits with them and observes directly — and a patient is never restrained prone, which is a hard rule rather than a matter of positioning preference.",
      topic: "Anger, Aggression & Violence"
    },
    {
      /* Must Know → Introduction to PMH Nursing → "Patient rights…".
         4 correct of 6. Wrong options at 1, 4. */
      stem: "Which rights does a client keep after admission to a psychiatric unit? Select all that apply.",
      options: [
        "The right to have or refuse visitors",
        "The right to leave the psychiatric unit at will during an involuntary hold",
        "The right to receive or refuse treatment",
        "Rights regarding psychiatric advance directives",
        "The right to have staff update any family member who telephones",
        "The right to be told risks, benefits, and alternatives before consenting"
      ],
      answers: [0, 2, 3, 5],
      rationale: "Patients admitted to a psychiatric hospital have the same rights as any other hospitalized patient, and informed consent means being told the risks, benefits, and alternatives before voluntarily accepting treatment. An involuntary hold is precisely the circumstance in which a client cannot leave at will, and confidentiality means only those who need to know may know — a telephoning relative is not automatically among them.",
      topic: "Introduction to PMH Nursing"
    },
    {
      /* Must Know → Assessment, Theories & Therapies → Key Terms,
         "★ The five behavioral therapies". 5 correct of 6. Wrong at 1. */
      stem: "Which pairings of behavioral technique and description are correct? Select all that apply.",
      options: [
        "Modeling — demonstrating more effective behaviors, much like role playing",
        "Operant conditioning — a negative stimulus applied to decrease a behavior",
        "Systematic desensitization — relaxation combined with gradual exposure",
        "Aversion therapy — disulfiram producing nausea and flushing after alcohol",
        "Biofeedback — learning to control normally involuntary bodily responses",
        "Operant conditioning — tokens earned toward privileges for desired behaviors"
      ],
      answers: [0, 2, 3, 4, 5],
      rationale: "Modeling is role play, systematic desensitization pairs relaxation with graded exposure, disulfiram is the aversion example, biofeedback teaches control of involuntary responses, and the token level system is operant conditioning. The one wrong pairing describes aversion therapy under the operant conditioning label — operant conditioning uses positive reinforcement to increase wanted behaviors, and aversion therapy is its opposite.",
      topic: "Assessment, Theories & Therapies"
    },
    {
      /* Must Know → Neurobiology & Pharmacology → Key Terms,
         "★ The eight neurotransmitters". ALL 5 CORRECT. */
      stem: "Which substances are among the eight neurotransmitters covered in this course? Select all that apply.",
      options: [
        "GABA",
        "Histamine",
        "Glutamate",
        "Acetylcholine",
        "Epinephrine"
      ],
      answers: [0, 1, 2, 3, 4],
      rationale: "Every option is on the list. The eight are grouped as inhibitory — serotonin and GABA; excitatory — dopamine, glutamate, epinephrine, and norepinephrine; and other — acetylcholine and histamine. The three not shown here are serotonin, dopamine, and norepinephrine. Histamine is the one whose functions are never given, which does not remove it from the list.",
      topic: "Neurobiology & Pharmacology"
    },
    {
      /* Must Know → Introduction to PMH Nursing → "Barriers to care…".
         3 correct of 5. Wrong options at 1, 3. */
      stem: "Which are barriers to the delivery of adequate and accessible mental health care? Select all that apply.",
      options: [
        "A two-to-three-month wait for an outpatient follow-up appointment",
        "Expanded Medicaid eligibility under the Affordable Care Act",
        "Lack of transportation to appointments",
        "Growth in the number of peer support specialists on treatment teams",
        "The limits of what insurance parity actually covers"
      ],
      answers: [0, 2, 4],
      rationale: "Wait times, transportation, and the limits of parity are listed barriers, alongside too few providers, provider knowledge limitations, low income and cost, and stigma. Expanded Medicaid eligibility and peer support specialists acting as systems navigators both widen access — they are responses to the barriers rather than examples of them.",
      topic: "Introduction to PMH Nursing"
    },
    {
      /* Must Know → Group & Physiologic Therapies → "★ The task, building,
         and maintenance roles…". 5 correct of 6. Wrong at 1. */
      stem: "Which behaviors in a therapy group are individual roles? Select all that apply.",
      options: [
        "Criticizing and attacking another member's ideas or feelings",
        "Reconciling differences between two members of the group",
        "Arguing and resisting the group's progress beyond reason",
        "Boasting about personal achievements to draw attention",
        "Horsing around, telling jokes, and playing on a phone",
        "Interrupting and manipulating others to assert superiority"
      ],
      answers: [0, 2, 3, 4, 5],
      rationale: "The individual roles are the aggressor, blocker, recognition seeker, play person, and dominator — they meet the need of only one member and hamper group functioning. Reconciling differences is the harmonizer, a building and maintenance role oriented toward keeping the group working.",
      topic: "Group & Physiologic Therapies"
    },
    {
      /* Must Know → Neurobiology & Pharmacology → "Frontal damage…
         Temporal damage…". 4 correct of 6. Wrong options at 1, 4. */
      stem: "Which findings suggest frontal lobe damage? Select all that apply.",
      options: [
        "Persistence of a single thought",
        "Difficulty recognizing familiar faces",
        "Inability to express language",
        "Emotional lability and personality change",
        "Inability to recognize movement",
        "Difficulty planning a sequence of actions"
      ],
      answers: [0, 2, 3, 5],
      rationale: "Perseveration, Broca's aphasia, emotional lability with personality change, and loss of the ability to plan sequences are all frontal findings, which follow from the lobe's role in executive function. Prosopagnosia is temporal, and movement agnosia is occipital — both are real deficits attached to the wrong lobe.",
      topic: "Neurobiology & Pharmacology"
    },
    {
      /* Must Know → Anger, Aggression & Violence → "Nurse safety…".
         4 correct of 6. Wrong options at 1, 5. */
      stem: "Which actions protect the nurse when approaching a client whose anger is escalating? Select all that apply.",
      options: [
        "Stand at an angle rather than directly in front of the client",
        "Wear a lanyard and hoop earrings so the client can identify staff",
        "Stay about one foot further away than the client can reach",
        "Bring enough staff for backup, with only one person speaking",
        "Position yourself between the client and the doorway",
        "Move the conversation somewhere quiet and out of view of other staff"
      ],
      answers: [0, 2, 3, 4],
      rationale: "Stand to the side rather than in front, allow extra personal space, bring backup while only one person talks, and keep yourself nearer the door — the client must never be between the nurse and the exit. Dangling earrings and necklaces can be grabbed and cause serious injury, and the conversation should be somewhere quiet but still visible to other staff, since out of view removes the backup entirely.",
      topic: "Anger, Aggression & Violence"
    },
    {
      /* Must Know → Group & Physiologic Therapies → "TMS's one
         contraindication…". 1 correct of 5. */
      stem: "Which finding contraindicates transcranial magnetic stimulation? Select all that apply.",
      options: [
        "Currently taking an antidepressant medication",
        "A previous completed course of electroconvulsive therapy",
        "A cochlear implant",
        "A diagnosis of treatment-resistant depression",
        "Mild scalp tingling reported during a previous session"
      ],
      answers: [2],
      rationale: "Only one option is a contraindication. Metal in the area of stimulation — brain stimulators, cochlear implants, medication pumps, bullet fragments — is the one contraindication for TMS, along with a pacemaker or a seizure history. Patients continue their medications during a course, treatment-resistant depression is the FDA-approved indication rather than a barrier, and scalp tingling and discomfort at the site are the expected mild reactions.",
      topic: "Group & Physiologic Therapies"
    },
    {
      /* Must Know → Introduction to PMH Nursing → "The therapeutic milieu
         — five components". 5 correct of 6. Wrong at 2. */
      stem: "Which are components of the therapeutic milieu? Select all that apply.",
      options: [
        "Containment",
        "Validation",
        "Diversion",
        "Structure",
        "Involvement",
        "Support"
      ],
      answers: [0, 1, 3, 4, 5],
      rationale: "The five components are containment, support, validation, structure, and involvement. Diversion is a real intervention but it belongs to the least restrictive means sequence, where providing a diversion is sometimes enough on its own to avoid restraint.",
      topic: "Introduction to PMH Nursing"
    },
    {
      /* Must Know → Anger, Aggression & Violence → Key Terms,
         "★ Critical incident debriefing". ALL 6 CORRECT. */
      stem: "Which questions does the critical incident debriefing after a restraint episode address? Select all that apply.",
      options: [
        "Could anything have been done that would have prevented the episode?",
        "Did the team respond as a team?",
        "Was safety maintained throughout?",
        "Did we follow hospital policies?",
        "What could we have done differently?",
        "Which areas of staff education would help in future episodes?"
      ],
      answers: [0, 1, 2, 3, 4, 5],
      rationale: "Every option is addressed. Debriefing is immediate and mandatory after every restraint episode, with the patient and with the staff who took part or witnessed it, and if it cannot happen immediately it must occur within the first couple of hours or at least within the shift. If something could have prevented the episode, the debriefing also asks why it was not done this time.",
      topic: "Anger, Aggression & Violence"
    },
    {
      /* Must Know → Assessment, Theories & Therapies → "Affect range,
         most to least expressive…". 2 correct of 5. Wrong at 0, 2, 4. */
      stem: "Which statements about the range of affect are accurate? Select all that apply.",
      options: [
        "Blunted affect shows no expression at all, like a blank canvas",
        "Flat affect shows no emotion on the face whatsoever",
        "Full or broad affect is seen only in clients with no psychiatric diagnosis",
        "Constricted affect shows slightly less expression than normal",
        "Blunted affect is less expressive than flat affect"
      ],
      answers: [1, 3],
      rationale: "The range runs full or broad, constricted, blunted, flat. Flat is no expression whatsoever — the blank canvas, like the masking of Parkinson's — and constricted is a little less than normal. Blunted sits between the two: limited expression with some still present, so a client may smile a little at times, which makes it more expressive than flat, not less. Full affect is normal expression of feeling, which having a diagnosis does not preclude.",
      topic: "Assessment, Theories & Therapies"
    },
    {
      /* Must Know → Neurobiology & Pharmacology → Key Terms,
         "★ Neuroplasticity" and "Synaptic pruning", plus the over-pruning
         bullet. 3 correct of 5. Wrong options at 2, 4. */
      stem: "Which statements about how the brain changes over a lifetime are accurate? Select all that apply.",
      options: [
        "Neuroplasticity is the brain's lifelong ability to reorganize neural pathways",
        "Learning a fact or skill requires persistent functional changes in the brain",
        "Synaptic pruning strengthens the brain's weakest and least used synapses",
        "Over-pruning is one biological theory of the origin of schizophrenia",
        "Neuroplasticity ends once pruning speeds up in the preteen years"
      ],
      answers: [0, 1, 3],
      rationale: "Neuroplasticity runs lifelong, learning lays down new pathways through persistent functional change, and over-pruning in late adolescence is one biological theory of schizophrenia. Pruning removes weaker, seldom-used synapses rather than strengthening them — that is how it improves the brain's networking capacity — and the two processes run alongside each other rather than one ending the other.",
      topic: "Neurobiology & Pharmacology"
    },
    {
      /* Must Know → Anger, Aggression & Violence → "Warning signs…".
         5 correct of 6. Wrong at 2. */
      stem: "Which findings are warning signs of potential violence? Select all that apply.",
      options: [
        "Pacing, restlessness, and fidgeting",
        "Clenched jaws or fists and a rigid posture",
        "Asking the nurse for a PRN medication for anxiety",
        "Glaring, or avoiding eye contact completely",
        "Isolation that is uncharacteristic for that individual",
        "A change in voice volume in either direction"
      ],
      answers: [0, 1, 3, 4, 5],
      rationale: "Motor signs, tension signs, eye contact at either extreme, uncharacteristic withdrawal, and speech changes in either direction are all warning signs, and a change from calm to loud or loud to calm counts. Asking for a PRN is the opposite: the client is using an available coping strategy and communicating a need, which is what de-escalation aims to produce.",
      topic: "Anger, Aggression & Violence"
    },
    {
      /* Must Know → Introduction to PMH Nursing → "Least restrictive means,
         in order…" and "Chemical restraint is less restrictive…".
         4 correct of 6. Wrong options at 3, 5. */
      stem: "Which interventions are less restrictive than applying four-point restraints? Select all that apply.",
      options: [
        "Offering a PRN medication by mouth",
        "Encouraging the client to leave the day room for their own room",
        "Escorting the client to seclusion with their agreement",
        "Applying a mechanical restraint device to all four limbs",
        "Providing a diversional activity",
        "Tucking the bed sheets tightly so the client stays in bed"
      ],
      answers: [0, 1, 2, 4],
      rationale: "PRN medication by mouth, reducing stimulation, diversion, and seclusion all sit above restraint on the least restrictive sequence — seclusion included, since it is less restrictive than restraints and is typically tried first. A four-limb mechanical device is the restraint being compared against, and tightly tucked sheets silently meet the definition of a restraint themselves.",
      topic: "Introduction to PMH Nursing"
    },
    {
      /* Must Know → Assessment, Theories & Therapies → "The ABCs of RET…".
         1 correct of 5. */
      stem: "In rational emotive therapy, which element does the therapist work on to change the client's emotional response? Select all that apply.",
      options: [
        "The activating event that set the sequence off",
        "The emotional consequences the client reports",
        "The beliefs the client holds about the event",
        "The client's earliest childhood memories of similar events",
        "The client's observable behavior during the session"
      ],
      answers: [2],
      rationale: "Only B is worked on, because changing beliefs changes the emotional consequences that follow. The activating event is usually outside the client's control, and the consequence is what the therapy changes indirectly rather than attacking head-on. Working from childhood memories is psychoanalytic, and observable behavior is the target of the behavioral therapies.",
      topic: "Assessment, Theories & Therapies"
    },
    {
      /* Must Know → Group & Physiologic Therapies → "★ Yalom's 11
         therapeutic factors". 3 correct of 5. Wrong options at 2, 4. */
      stem: "Which pairings of a group observation and Yalom's therapeutic factors are correct? Select all that apply.",
      options: [
        "A member gains from supporting another through a hard week — altruism",
        "A member says \"you got better, so maybe I can too\" — instillation of hope",
        "A member copies the leader's calm way of speaking — catharsis",
        "Members examine loneliness and mortality together — existential resolution",
        "A member gains insight from others' feedback — universality"
      ],
      answers: [0, 1, 3],
      rationale: "Altruism is gaining from giving support, instillation of hope is shared optimism about improvement, and existential resolution is examining what affects everyone and constructing meaning. Copying a leader's behavior is imitative behavior, not catharsis, which is the therapeutic discharge of emotion. Gaining insight from feedback is interpersonal learning; universality is the realization of not being alone.",
      topic: "Group & Physiologic Therapies"
    },
    {
      /* Must Know → Neurobiology & Pharmacology → "Parietal damage…
         Occipital damage…". 3 correct of 5. Wrong options at 1, 4. */
      stem: "Which findings suggest occipital lobe damage? Select all that apply.",
      options: [
        "Defects in the visual field",
        "Difficulty distinguishing left from right",
        "Visual hallucinations",
        "Inability to recognize movement",
        "Short- and long-term memory loss"
      ],
      answers: [0, 2, 3],
      rationale: "The occipital lobe is the vision center, so damage produces visual field cuts, hallucinations, visual illusions, inability to recognize words and drawn objects, and movement agnosia. Left-right confusion is parietal, and memory loss is temporal — both are genuine findings assigned to the wrong lobe.",
      topic: "Neurobiology & Pharmacology"
    },
    {
      /* Must Know → Assessment, Theories & Therapies → "The three IPT
         techniques…". 3 correct of 5. Wrong options at 1, 4. */
      stem: "Which are techniques of interpersonal therapy? Select all that apply.",
      options: [
        "Identifying what the emotion is and where it is coming from",
        "Analyzing the content of the client's dreams for meaning",
        "Expressing emotion calmly rather than acting out of anger",
        "Examining unresolved issues carried in from past relationships",
        "Pairing a behavior with a condition that reinforces it"
      ],
      answers: [0, 2, 3],
      rationale: "The three techniques are identification of emotion, expression of emotion, and dealing with emotional baggage. Dream analysis is a psychoanalytic tool for uncovering unconscious conflict, and pairing a behavior with a reinforcing condition is conditioning, the basis of the behavioral therapies.",
      topic: "Assessment, Theories & Therapies"
    },
    {
      /* Must Know → Anger, Aggression & Violence → "De-escalation…".
         3 correct of 5. Wrong options at 2, 4. */
      stem: "Which nurse responses are appropriate as a client's anger escalates? Select all that apply.",
      options: [
        "\"You seem to be very upset right now.\"",
        "\"Would you rather go to your room, or to the quiet room?\"",
        "\"You need to calm down and stop this behavior, okay?\"",
        "\"You feel that people here are treating you unfairly.\"",
        "\"What exactly is going on with you right now?\""
      ],
      answers: [0, 1, 3],
      rationale: "Giving feedback on what you see opens the feelings up, offering two options decreases the powerlessness that often precipitates violence, and an open-ended statement invites the client to say more. Ending with \"okay?\" implies a choice where none exists, and \"what is going on right now\" is a challenging question rather than an open-ended statement — the specific contrast drawn in the de-escalation guidance.",
      topic: "Anger, Aggression & Violence"
    },
    {
      /* Must Know → Group & Physiologic Therapies → Key Terms,
         "Electroconvulsive therapy (ECT)", and the ECT contraindications
         bullet. 4 correct of 6. Wrong options at 1, 5. */
      stem: "Which are indications for electroconvulsive therapy? Select all that apply.",
      options: [
        "Severe long-term depression with malnutrition and dehydration",
        "A subdural hematoma accompanied by mood changes",
        "Delusional depression",
        "Catatonia in a client with schizophrenia",
        "Depression that has not responded to multiple medication trials",
        "Mild depression, as a first-line treatment before medication is tried"
      ],
      answers: [0, 2, 3, 4],
      rationale: "ECT is the primary treatment in severe long-term depression with malnutrition, exhaustion or dehydration — rehydrate first — and works especially well in delusional depression and in catatonia, with refractory depression a standard indication. A subdural hematoma is a contraindication, since ECT raises cerebral blood flow and intracranial pressure. ECT is not usually first-line: it follows failed medication trials.",
      topic: "Group & Physiologic Therapies"
    },
    {
      /* Must Know → Introduction to PMH Nursing → "Admission criteria for
         an acute unit…". 2 correct of 5. Wrong options at 0, 2, 4. */
      stem: "Which findings meet a criterion for admission to an acute psychiatric unit? Select all that apply.",
      options: [
        "A request for a medication adjustment after a stable year",
        "Homicidal ideation directed at a named person",
        "A family's report that the client has seemed sad since a bereavement",
        "Gross impairment of judgment placing the client at imminent risk",
        "Difficulty falling asleep over the past two weeks"
      ],
      answers: [1, 3],
      rationale: "The three criteria are danger to self, danger to others, and inability to care for basic needs and/or gross impairment of judgment placing the individual at imminent risk through an inability to protect themselves. Homicidal ideation is danger to others. Sadness after a bereavement, insomnia, and a routine medication adjustment are all real clinical needs met at a lower level of care.",
      topic: "Introduction to PMH Nursing"
    },
    {
      /* Must Know → Neurobiology & Pharmacology → "GABA is the major
         inhibitory neurotransmitter…". 2 correct of 5. Wrong at 0, 2, 4. */
      stem: "Which statements about GABA are accurate? Select all that apply.",
      options: [
        "It is increased in anxiety, mania, and schizophrenia",
        "It is the major inhibitory neurotransmitter in the CNS",
        "It is the neurotransmitter most associated with auditory hallucinations",
        "Increasing it decreases anxiety",
        "It is classified as excitatory"
      ],
      answers: [1, 3],
      rationale: "GABA is the major inhibitory neurotransmitter in the CNS, and increasing it decreases anxiety, which is why many sedative-hypnotics act on GABA receptors. It is decreased, not increased, in anxiety, mania, and schizophrenia — raising it further would be pointless if it were already high. Auditory hallucinations are associated with too much dopamine.",
      topic: "Neurobiology & Pharmacology"
    },
    {
      /* Must Know → Group & Physiologic Therapies → "Leadership styles…".
         2 correct of 5. Wrong options at 0, 3, 4. */
      stem: "Which statements about group leadership styles are accurate? Select all that apply.",
      options: [
        "A laissez-faire leader closely controls the direction the group takes",
        "An autocratic leader runs the group and limits interaction between members",
        "A democratic leader supports extensive interaction in problem-solving",
        "AA groups are usually run autocratically",
        "Only an advanced practice nurse may lead a democratic group"
      ],
      answers: [1, 2],
      rationale: "Autocratic leaders exert control and do not encourage much member interaction, as in an information-heavy educational group, while democratic leaders support extensive interaction in problem-solving, as in psychotherapy groups and AA. Laissez-faire is the opposite of controlling: the leader starts the group and lets it go where it goes. AA groups are usually democratic or laissez-faire, and leadership style has nothing to do with degree — what requires an advanced degree is group psychotherapy.",
      topic: "Group & Physiologic Therapies"
    }
  ]
};

/* Display order for the topic-breakdown strip at the top of the page. */
window.TOPIC_ORDER = [
  "Introduction to PMH Nursing",
  "Neurobiology & Pharmacology",
  "Anger, Aggression & Violence",
  "Assessment, Theories & Therapies",
  "Group & Physiologic Therapies"
];
