# Overview
---
Emotions are a fundamental aspect of human expression.  
The widely used *affective circumplex model* proposes that all emotions can be described as points in a two‑dimensional space defined by **valence** (pleasantness) and **arousal** (activation) (Russell, 1980) (Figure 2).  
Affect assessment benefits many applications, such as assessing customer satisfaction (Homburg et al., 2006), well‑being (Andrews and McKennell, 1980), and mental health (Headey et al., 1993).
Most prior NLP work on affect has focused on social‑media datasets whose momentary affect is judged by annotators (Mohammad et al., 2018; Preoţiuc‑Pietro et al., 2016; Al Zoubi et al., 2022).  
However, by their very nature, emotions are subjective and change over time; they are best described by the person experiencing them in their natural environment, not by annotators perceiving affect from social‑media posts.  
To the best of our knowledge, no publicly available datasets account for these characteristics.

This shared task aims to reduce this gap by introducing a **longitudinal** dataset (“ecological essays”) collected over multiple years (2021 – 2024) consisting of real‑time essays written by U.S. service‑industry workers about “how they are feeling.” The essays represent *ecologically embedded affect*—allowing the study of emotions in their natural environment—and are associated with self‑reported affect over the circumplex (Figure 2). This enables us to analyze changes in affect over shorter timespans and situations (e.g., different days and different times of the day) as well as over longer periods (e.g., across years).

The data in this task consist of chronological essays written by various people. Each essay is associated with self‑reported **valence** (V) (0 – 4, highly negative to highly positive affect) and **arousal** (A) (0 – 2, low to high energy) scores.[^1]
| ![](https://i.imgur.com/L1hODvI.png) | ![](https://i.imgur.com/jk1LH7C.png) |
|-------------------------------------|-------------------------------------|

Figure 2: Left: Affective circumplex model reflecting
the two-dimensional space of valence (pleasantness) and
arousal (activation) used to describe emotions. Right:
The affective circumplex grid used to self-report affect
during the collection of ‘ecological essays’ dataset.

[^1]: Smaller scale for arousal since it is difficult for people to report finer‑grained levels of physiological activation.