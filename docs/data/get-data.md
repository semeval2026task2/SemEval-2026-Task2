<style>
  .gd-info {
    background: #eef7fb;
    border: 1px solid #d9ecf7;
    border-radius: 12px;
    padding: 16px 20px;
    margin: 20px 0;
    line-height: 1.55;
    box-shadow: inset 0 1px 0 rgba(0,0,0,0.03);
  }
  .gd-info a { font-weight: 600; text-decoration: none; }
  .gd-info a:hover { text-decoration: underline; }

  .gd-note {
    background: #fffbe6;
    border: 1px solid #d4b106;
    border-radius: 12px;
    padding: 14px 18px;
    margin: 20px 0;
    line-height: 1.55;
  }

  .gd-footnote {
    font-size: 0.95em;
    color: #444;
    margin-top: 6px;
  }
</style>

<!-- <div class="gd-info">
  Please <a href="https://www.codabench.org/competitions/9963/" target="_blank" rel="noopener noreferrer">register for the shared task</a> to access the datasets on our Codabench competition site.
</div> -->

## Data Statistics

The full release covers **5,285** observations (language, EMA emotion pairs) from **182** users. The training split is a subset of that release.

|                             | Full dataset | Training split |
| --------------------------- | -----------: | -------------: |
| Observations                |    **5,285** |      **2,764** |
| Users                       |      **182** |        **137** |
| Mean texts per user         |     **72.8** |       **58.7** |
| — mean essays per user      |         53.1 |           40.3 |
| — mean feeling-words / user |         48.3 |           42.0 |
| Median texts per user       |     **35.0** |       **31.0** |
| — median essays per user    |         18.0 |           14.0 |
| — median feeling-words/user |         18.0 |           16.0 |

## About the Data

The training and evaluation data consist of 5,285 longitudinal texts (“ecological essays and feeling words”) written by 182 authors collected over multiple years (2021 – 2024), consisting of real‑time essays and feeling words (e.g., happy, calm, sad, etc.) written by U.S. service‑industry workers about “how they are feeling”. More statistics on the data can be found in the [Data Statistics](#data-statistics) section above.

The way we describe and assign emotion words/labels to our feelings is a rich psychological process that is diagnostic of how our past experiences influence our current perception of how we relate to the world. Therefore, we include the "feeling words" data as well in our training and evaluation sets. Additionally, this increases the number of examples. *We suggest participants to consider modeling feeling-words separately or jointly with the essays.*

## Data Format

### Subtask 1 — Longitudinal Affect Assessment

The training data (`train_subtask1.csv`) has the following format:

| user_id           | text_id           | text         | timestamp         | collection_phase      | is_words       | valence          | arousal   |
| ----------------- | ----------------- | ------------ | ----------------- | --------------------- | -------------- | ---------------- | --------- |
| *example_user_id* | *example_text_id* | example text | example timestamp | [1, 2, 3, 4, 5, 6, 7] | [True, False]  | [-2, 1, 0, 1, 2] | [0, 1, 2] |

<details>
  <summary><strong>CSV example <code>train_subtask1.csv</code></strong></summary>
  <pre><code>user_id,text_id,text,timestamp,collection_phase,is_words,valence,arousal
137,684,"I felt calm after the shift.",2023-08-16 09:32:00,1,True,0.20,0.30
242,219,"Another example text here.",2023-08-20 18:05:12,2,False,-0.10,0.15
905,507,"More text for the demo.",2023-09-01 07:01:45,3,True,0.00,0.80
</code></pre>
</details>

where,

- `user_id`: anonymous identifier for the author of the texts (essays/feeling words)
- `text_id`: identifier for a specific text written by an author
- `text`: the essay or the feeling words written by an author
- `timestamp`: when the text was written
- `collection_phase`: data collection phase (1–7)
- `is_words`: boolean; `False` for essays, `True` for feeling words
- `valence`: valence score associated with the text
- `arousal`: arousal score associated with the text

<div class="gd-note">
  Predictions for <strong>valence</strong> and <strong>arousal</strong> should be real-valued numbers (floats).
</div>

### Subtask 2 — Forecasting Future Variation in Affect

The training data for Subtask 2 consists of all the columns as in Subtask 1 (column definitions above):

| user_id           | text_id           | text         | timestamp         | collection_phase      | is_words      | valence          | arousal   |
| ----------------- | ----------------- | ------------ | ----------------- | --------------------- | ------------- | ---------------- | --------- |
| *example_user_id* | *example_text_id* | example text | example timestamp | [1, 2, 3, 4, 5, 6, 7] | [True, False] | [-2, 1, 0, 1, 2] | [0, 1, 2] |

#### 2A. State Change (`train_subtask2a.csv`)

| state_change_valence | state_change_arousal |
| -------------------- | -------------------- |
| e.g., 0.42           | e.g., -0.17          |

<details>
  <summary><strong>CSV example <code>train_subtask2a.csv</code></strong></summary>
  <pre><code>user_id,state_change_valence,state_change_arousal
137,0.42,-0.17
242,-0.05,0.31
905,0.18,0.07
</code></pre>
</details>

where,

- `state_change_valence` is computed per user by subtracting the valence of the current text from the valence of the following text. Texts are sorted in ascending temporal order per user using `timestamp`. For each user, the value is `NaN` for their last text.
- `state_change_arousal` is computed per user by subtracting the arousal of the current text from the arousal of the following text. Texts are sorted in ascending temporal order per user using `timestamp`. For each user, the value is `NaN` for their last text.

<div class="gd-note">
  Predictions for <strong>state_change_valence</strong> and <strong>state_change_arousal</strong> should be real-valued numbers (floats).
</div>

#### 2B. Dispositional Change (`train_subtask2b.csv`)

| group   | disposition_change_valence | disposition_change_arousal |
| ------- | -------------------------- | -------------------------- |
| e.g., 2 | e.g., -0.31                | e.g., 0.08                 |

<details>
  <summary><strong>CSV example <code>train_subtask2b.csv</code></strong></summary>
  <pre><code>user_id,group,disposition_change_valence,disposition_change_arousal
137,2,-0.31,0.08
242,1,0.12,-0.04
905,2,-0.27,0.22
</code></pre>
</details>

where,

- `group` is the marker to designate texts per user into two halves, with `group=1` being the first half for a user and `group=2` being the second half for that user.
- `disposition_change_valence` is computed per user by subtracting the mean valence of the first half of their texts (marked as group 1) from the mean valence of the second half of their texts. Texts are sorted in ascending temporal order per user using `timestamp`.
- `disposition_change_arousal` is computed per user by subtracting the mean arousal of the first half of their texts from the mean arousal of the second half of their texts (marked as group 2). Texts are sorted in ascending temporal order per user using `timestamp`.

<div class="gd-note">
  Predictions for <strong>disposition_change_valence</strong> and <strong>disposition_change_arousal</strong> should be real-valued numbers (floats).
</div>

<p class="gd-footnote"><strong>Note 1:</strong> This is one of the ways to compute instance–<code>disposition_change</code> label pairs. Note that for a given instance there is only one gold label. In the provided way, the texts corresponding to group 1 are the input instances used to predict the disposition label. You are encouraged to employ creative solutions to apply to the task which may include creating custom <code>disposition_change</code> labels (for e.g., dividing each user’s data into different number of parts and calculating disposition_change by subtracting one part from the next).</p>

<p class="gd-footnote"><strong>Note 2:</strong> We also provide additional columns in the detailed file <code>train_subtask2b_detailed.csv</code> to show the intermediate values used for computing the released labels: <code>text_num</code>, <code>num_texts_per_user</code>, <code>group</code>, <code>mean_valence_half1</code>, <code>mean_valence_half2</code>, <code>mean_arousal_half1</code>, <code>mean_arousal_half2</code>.</p>

<p class="gd-footnote"><strong>Note 3:</strong> We also provide a trimmed version with only <code>user_id</code> and disposition_change columns (<code>train_subtask2b_user_disposition.csv</code>): <code>user_id</code>, <code>disposition_change_valence</code>, <code>disposition_change_arousal</code>.</p>

<!-- <div class="gd-info">
  Please go through the <a href="https://semeval2026task2.github.io/SemEval-2026-Task2/submission-instructions">Submission Instructions</a> for additional details.
</div> -->
