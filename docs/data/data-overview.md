# Data 
---

Please register for the shared task to access the datasets on our [Codabench competition site](https://www.codabench.org/competitions/9963/) [https://www.codabench.org/competitions/9963/](https://www.codabench.org/competitions/9963/).
## Data Statistics

### Total dataset size
- Observations: **5,285** (language, EMA emotion pairs)
- Users: **182** (mean observations per user: **72.8**)
- Essays: median number of tokens: **53.9**
- Words: median number of tokens: **42.3**

### Data Format

<p>
The training and evaluation data consist of 5,285 longitudinal texts (“ecological essays and feeling words”) written by 182 authors collected over multiple years (2021 – 2024), consisting of real‑time essays and feeling words (e.g., happy, calm, sad, etc.) written by U.S. service‑industry workers about “how they are feeling”. More statistics on the data can be found in the <a href="https://semeval2026task2.github.io/SemEval-2026-Task2/data-statistics">
    Data Statistics
  </a> tab.
</p>
<p>
The way we describe and assign emotion words/labels to our feelings is a rich psychological process that is diagnostic of how our past experiences influence our current perception of how we relate to the world. Therefore, we include the "feeling words" data as well in our training and evaluation sets. Additionally, this increases the number of examples. <i>We suggest participants to consider modeling feeling-words separately or jointly with the essays.</i>
</p>

#### <u>Subtask 1 — Longitudinal Affect Assessment:</u>

<p>The training data (<strong><code>train_subtask1.csv</strong></code>) has the following format:</p>
<table style="border-collapse:collapse;width:100%;border:1px solid #ccc;font-size:14px;">
  <thead>
    <tr style="background:#f7f7f7;">
      <th style="padding:6px 8px;border:1px solid #ccc;"><strong>user_id</strong></th>
      <th style="padding:6px 8px;border:1px solid #ccc;"><strong>text_id</strong></th>
      <th style="padding:6px 8px;border:1px solid #ccc;"><strong>text</strong></th>
      <th style="padding:6px 8px;border:1px solid #ccc;"><strong>timestamp</strong></th>
      <th style="padding:6px 8px;border:1px solid #ccc;"><strong>collection_phase</strong></th>
			<th style="padding:6px 8px;border:1px solid #ccc;"><strong>is_words</strong></th>
      <th style="padding:6px 8px;border:1px solid #ccc;"><strong>valence</strong></th>
      <th style="padding:6px 8px;border:1px solid #ccc;"><strong>arousal</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding:6px 8px;border:1px solid #ccc;"><em>example_user_id</em></td>
      <td style="padding:6px 8px;border:1px solid #ccc;"><em>example_text_id</em></td>
      <td style="padding:6px 8px;border:1px solid #ccc;">example text</td>
      <td style="padding:6px 8px;border:1px solid #ccc;">example timestamp</td>
      <td style="padding:6px 8px;border:1px solid #ccc;">[1, 2, 3, 4, 5, 6, 7]</td>
			<td style="padding:6px 8px;border:1px solid #ccc;">[True, False]</td>
      <td style="padding:6px 8px;border:1px solid #ccc;">[-2, 1, 0, 1, 2]</td>
      <td style="padding:6px 8px;border:1px solid #ccc;">[0, 1, 2]</td>
    </tr>
  </tbody>
</table>

<details style="margin-top:8px;">
  <summary><strong>CSV example <code>train_subtask1.csv</code></strong></summary>
  <pre><code>user_id,text_id,text,timestamp,collection_phase,is_words,valence,arousal
137,684,"I felt calm after the shift.",2023-08-16 09:32:00,1,True,0.20,0.30
242,219,"Another example text here.",2023-08-20 18:05:12,2,False,-0.10,0.15
905,507,"More text for the demo.",2023-09-01 07:01:45,3,True,0.00,0.80
</code></pre>
</details>

</br>
<p>where,</p>
<ul>
  <li><code><strong>user_id</strong></code>: anonymous identifier for the author of the texts (essays/feeling words)</li>
  <li><code><strong>text_id</strong></code>: identifier for a specific text written by an author</li>
  <li><code><strong>text</strong></code>: the essay or the feeling words written by an author</li>
  <li><code><strong>timestamp</strong></code>: when the text was written</li>
  <li><code><strong>collection_phase</strong></code>: data collection phase (1–7)</li>
  <li><code><strong>is_words</strong></code>: boolean; <code>False</code> for essays, <code>True</code> for feeling words</li>
  <li><code><strong>valence</strong></code>: valence score associated with the text</li>
  <li><code><strong>arousal</strong></code>: arousal score associated with the text</li>
</ul>

<div role="note" aria-label="Note" style="margin:12px 0;padding:12px 14px;border:1px solid #d4b106;background:#fffbe6;border-radius:8px;">
  Predictions for <strong>valence</strong> and <strong>arousal</strong> should be real-valued numbers (floats).
</div>

#### <u>Subtask 2 — Forecasting Future Variation in Affect:</u>

<p>The training data for Subtask2 consists of all the columns as in Subtask1 (column definitions above):</p>
<table style="border-collapse:collapse;width:100%;border:1px solid #ccc;font-size:14px;">
  <thead>
    <tr style="background:#f7f7f7;">
      <th style="padding:6px 8px;border:1px solid #ccc;"><strong>user_id</strong></th>
      <th style="padding:6px 8px;border:1px solid #ccc;"><strong>text_id</strong></th>
      <th style="padding:6px 8px;border:1px solid #ccc;"><strong>text</strong></th>
      <th style="padding:6px 8px;border:1px solid #ccc;"><strong>timestamp</strong></th>
      <th style="padding:6px 8px;border:1px solid #ccc;"><strong>collection_phase</strong></th>
			<th style="padding:6px 8px;border:1px solid #ccc;"><strong>is_words</strong></th>
      <th style="padding:6px 8px;border:1px solid #ccc;"><strong>valence</strong></th>
      <th style="padding:6px 8px;border:1px solid #ccc;"><strong>arousal</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding:6px 8px;border:1px solid #ccc;"><em>example_user_id</em></td>
      <td style="padding:6px 8px;border:1px solid #ccc;"><em>example_text_id</em></td>
      <td style="padding:6px 8px;border:1px solid #ccc;">example text</td>
      <td style="padding:6px 8px;border:1px solid #ccc;">example timestamp</td>
      <td style="padding:6px 8px;border:1px solid #ccc;">[1, 2, 3, 4, 5, 6, 7]</td>
			<td style="padding:6px 8px;border:1px solid #ccc;">[True, False]</td>
      <td style="padding:6px 8px;border:1px solid #ccc;">[-2, 1, 0, 1, 2]</td>
      <td style="padding:6px 8px;border:1px solid #ccc;">[0, 1, 2]</td>
    </tr>
  </tbody>
</table>

##### <u>2A. State Change (<code>train_subtask2a.csv</code>)</u>

<table style="border-collapse:collapse;width:100%;border:1px solid #ccc;font-size:14px;margin-top:6px;">
  <thead>
    <tr style="background:#f7f7f7;">
      <th style="padding:6px 8px;border:1px solid #ccc;">state_change_valence</th>
      <th style="padding:6px 8px;border:1px solid #ccc;">state_change_arousal</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding:6px 8px;border:1px solid #ccc;">e.g., 0.42</td>
      <td 
					style="padding:6px 8px;border:1px solid #ccc;">e.g., -0.17</td>
    </tr>
  </tbody>
</table>

<details style="margin-top:8px;">
  <summary><strong>CSV example <code>train_subtask2a.csv</code> </strong></summary>
  <pre><code>user_id,state_change_valence,state_change_arousal
137,0.42,-0.17
242,-0.05,0.31
905,0.18,0.07
</code></pre>
</details>

</br>
<p>where,</p>
<ul>
  <li><code><strong>state_change_valence</strong></code> is computed per user by subtracting the valence of the current text from the valence of the following text. Texts are sorted in ascending temporal order per user using <code><strong>timestamp</strong></code>. For each user, the value is <code>NaN</code> for their last text.</li>
  <li><code><strong>state_change_arousal</strong></code> is computed per user by subtracting the arousal of the current text from the arousal of the following text. Texts are sorted in ascending temporal order per user using <code><strong>timestamp</strong></code>. For each user, the value is <code>NaN</code> for their last text.</li>
</ul>


<div role="note" aria-label="Note" style="margin:12px 0;padding:12px 14px;border:1px solid #d4b106;background:#fffbe6;border-radius:8px;">
  Predictions for <strong>state_change_valence</strong> and <strong>state_change_arousal</strong> should be real-valued numbers (floats).
</div>

##### <u>2B. Dispositional Change (<code>train_subtask2b.csv</code>)</u>
<p>Predictions for <strong>disposition_change_valence</strong> and <strong>disposition_change_arousal</strong> should be real-valued numbers (floats).</p>

<table style="border-collapse:collapse;width:100%;border:1px solid #ccc;font-size:14px;margin-top:6px;">
  <thead>
    <tr style="background:#f7f7f7;">
			<th style="padding:6px 8px;border:1px solid #ccc;">group</th>
      <th style="padding:6px 8px;border:1px solid #ccc;">disposition_change_valence</th>
      <th style="padding:6px 8px;border:1px solid #ccc;">disposition_change_arousal</th>
    </tr>
  </thead>
  <tbody>
    <tr>
			<td style="padding:6px 8px;border:1px solid #ccc;">e.g., 2</td>
      <td style="padding:6px 8px;border:1px solid #ccc;">e.g., -0.31</td>
      <td style="padding:6px 8px;border:1px solid #ccc;">e.g., 0.08</td>
    </tr>
  </tbody>
</table>

<details style="margin-top:8px;">
  <summary><strong>CSV example <code>train_subtask2b.csv</code> </strong></summary>
  <pre><code>user_id,group,disposition_change_valence,disposition_change_arousal
137,2,-0.31,0.08
242,1,0.12,-0.04
905,2,-0.27,0.22
</code></pre>
</details>

</br>
<p>where,</p>
<ul>
	<li><code><strong>group </strong></code> is the marker to designate texts per user into two halves, with group=1 being the first half for a user and <code>group=2</code> being the second half for that user.

  <li><code><strong>disposition_change_valence</strong></code> is computed per user by subtracting the mean valence of the first half of their texts (maked as group 1) from the mean valence of the second half of their texts. Texts are sorted in ascending temporal order per user using <code><strong>timestamp</strong></code>.</li>
  <li><code><strong>disposition_change_arousal</strong></code> is computed per user by subtracting the mean arousal of the first half of their texts from the mean arousal of the second half of their texts (maked as group 2). Texts are sorted in ascending temporal order per user using <code><strong>timestamp</strong></code>.</li>
</ul>


<div role="note" aria-label="Note" style="margin:12px 0;padding:12px 14px;border:1px solid #d4b106;background:#fffbe6;border-radius:8px;">
  Predictions for <strong>disposition_change_valence</strong> and <strong>disposition_change_arousal</strong> should be real-valued numbers (floats).
</div>


<p style="font-size: 0.95em; color:#444; margin-top:6px;">
  <strong>Note 1:</strong> This is one of the ways to compute instance– <code>disposition_change</code> label pairs. Note that for a given instance there is only one gold label. In the provided way, the texts corresponding to group 1 are the input instances used to predict the disposition label. You are encouraged to employ creative solutions to apply to the task which may include creating custom <code>disposition_change</code> labels (for e.g., dividing each user’s data into different number of parts and calculating disposition_change by subtracting one part from the next)
</p>

<p style="font-size: 0.95em; color:#444; margin-top:4px;">
  <strong>Note 2:</strong> We also provide additional columns in the detailed file <code>train_subtask2b_detailed.csv</code> to show the intermediate values used for computing the released labels: 
  <code>text_num</code>, <code>num_texts_per_user</code>, <code>group</code>, 
  <code>mean_valence_half1</code>, <code>mean_valence_half2</code>, 
  <code>mean_arousal_half1</code>, <code>mean_arousal_half2</code>.
</p>

<p style="font-size: 0.95em; color:#444; margin-top:4px;">
  <strong>Note 3:</strong> We also provide a trimmed version with only <code>user_id</code> and disposition_change columns (<code>train_subtask2b_user_disposition.csv</code>): 
  <code>user_id</code>, <code>disposition_change_valence</code>, <code>disposition_change_arousal</code>.
</p>

<p style="font-size: 0.95em; color:#444; margin-top:4px;">
  <strong>Note 4:</strong> Predictions for <code>disposition_change_valence</code> and <code>disposition_change_arousal</code> should be real-valued numbers (floats).
</p>

<div style="margin:16px 0;padding:12px 14px;border:1px solid #d4b106;background:#fffbe6;border-radius:8px;">
  Please go through the <a href="https://semeval2026task2.github.io/SemEval-2026-Task2/submission-instructions">
    Submission Instructions
  </a>  for additional details.
</div>