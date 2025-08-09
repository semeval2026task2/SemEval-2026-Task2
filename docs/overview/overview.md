# Overview
---
[<img src=https://img.shields.io/badge/SemEval2026%20Task%202%20Website-blue>](https://semeval2026task2.github.io/SemEval-2026-Task2/)
[<img src=https://img.shields.io/badge/Codabench%20Competition%20Page-purple>](https://www.codabench.org/competitions/9963/)
[<img src=https://img.shields.io/badge/GitHub%20Repository%20-yellow>](https://github.com/semeval2026task2/EmotionValArouTimeVariation2026)

![](https://i.imgur.com/okG0fuV.png)

<p style="font-size: 0.9em; color: #555; margin-top: 0.2em;">
Figure 1: Moving from traditional emotion assessments to psychologically and longitudinally grounded emotion assessments.
</p>

Emotions are a fundamental aspect of human expression. The widely used *affective circumplex model* proposes that all emotions can be described as points in a two‑dimensional space defined by **valence** (pleasantness) and **arousal** (activation) (Figure 2). Affect assessment benefits many applications, such as assessing customer satisfaction, well‑being, and mental health. Most prior NLP work on affect has focused on social‑media datasets whose momentary affect is judged by annotators. However, by their very nature, emotions are subjective and change over time; they are best described by the person experiencing them in their natural environment, not by annotators perceiving affect from social‑media posts. To the best of our knowledge, no publicly available datasets account for these characteristics.

This shared task aims to reduce this gap by introducing a **longitudinal** dataset (Figure 1) (“ecological essays and feeling words”) collected over multiple years (2021 – 2024) consisting of real‑time essays and feeling words ((e.g., happy, calm, sad, etc.) written by U.S. service‑industry workers about “how they are feeling.” The essays and feeling words represent *ecologically embedded affect*—allowing the study of emotions in their natural environment—and are associated with self‑reported affect over the circumplex (Figure 2). This enables us to analyze changes in affect over shorter timespans and situations (e.g., different days and different times of the day) as well as over longer periods (e.g., across years).

The data in this task consist of chronological texts (essays and feeling words) written by various people. Each text is associated with self‑reported **valence** (V) (0 – 4, highly negative to highly positive affect) and **arousal** (A) (0 – 2, low to high energy) scores.
| ![](https://i.imgur.com/L1hODvI.png) | ![](https://i.imgur.com/jk1LH7C.png) |
|-------------------------------------|-------------------------------------|

<p style="font-size: 0.9em; color: #555; margin-top: 0.2em;">
  Figure 2: Left: Affective circumplex model reflecting the two-dimensional space of valence (pleasantness) and arousal (activation) used to describe emotions. Right: The affective circumplex grid used to self-report affect
during the collection of ‘ecological essays and feeling words’ dataset.
</p>

## Importance and Impact

This task represents a shift toward modeling emotion as a lived, dynamic experience rather than an annotated perception of expressed emotion or a single static snapshot. Unlike social media datasets, which often must rely on performative or the "perceived" affect as annotated by third parties, the longitudinal ecological essays and feeling words offer introspective, self-reported data grounded in natural, real-world settings. This allows for the development of models that not only generalize across individuals but also adapt to the emotional rhythms of a single person over time, crucial for building tools that are emotionally intelligent and personalized. The data's temporal depth and free-text format provide a rare opportunity to uncover how subtle verbal behavioral cues track with self-identified internal affective states, enabling research into affective trajectories, tipping points, and resilience. By modeling how emotions unfold and are conveyed in self-described experience — rather than merely how they are perceived by outside parties, we open the door to next-generation affective systems that can proactively support mental health, augment therapeutic processes and interventions, and bridge into smarter, ambient, emotion-aware technologies.

The NLP community has huge collections of datasets labeled with "sentiment" (e.g., how people like a given movie or product, based on the number of stars they give it), but a dearth of datasets that are labeled with actual first-person affective experience. Studying such data will allow the community to understand the similarity and difference between first-party experiences and third-party annotations. Being able to assess affect, longitudinally, can also offer a step towards assessment tools for personalized mental health care, and will eventually allow better connection to objective behaviors.

## Ethical Considerations

The "Data Science and Alcohol Consumption Study" to collect 'ecological essays and feeling words' dataset and assess affect underwent ethical review by central IRB. We sought further approval from IRB to consent our existing participants, using additional consent form via Qualtrics, to publicly share their anonymized daily survey responses for research purposes. Although participants were not asked to enter any identifiable information in this data, we additionally removed all named entities (named persons, places, organizations, or things) or contact information (phone numbers, addresses, URLs) from the written responses via an automated named entity and contact recognizer. We also manually review the data to verify anonymization before releasing it, and we will publicly share the anonymized data only from individuals who have given their consent.

While our shared task predicts emotions from ecological essays and feeling words, such automated systems should not be mistaken for objective measures of emotional state. Language is inherently subjective and shaped by personal, social, and cultural contexts, meaning that similar emotions may be expressed differently across individuals. Ignoring this variability risks oversimplifying or misrepresenting emotions, making it essential to interpret predictions with caution and a clear awareness of these limitations. More on ethics for AI tasks can be found at https://aclanthology.org/2022.acl-long.573/.

