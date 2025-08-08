# Data 
---

Dataset Download can be found in: [https://www.codabench.org/competitions/9963/](https://www.codabench.org/competitions/9963/)
### Data Format
<!-- Dataset schema used in both Subtask 1 and Subtask 2 -->
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
      <td style="padding:6px 8px;border:1px solid #ccc;">Example text</td>
      <td style="padding:6px 8px;border:1px solid #ccc;">Example timestamp</td>
      <td style="padding:6px 8px;border:1px solid #ccc;">[1, 2, 3, 4, 5, 6]</td>
			<td style="padding:6px 8px;border:1px solid #ccc;">[0, 1]</td>
      <td style="padding:6px 8px;border:1px solid #ccc;">[0, 1, 2, 3, 4]</td>
      <td style="padding:6px 8px;border:1px solid #ccc;">[0, 1, 2]</td>
    </tr>
  </tbody>
</table>

<p style="margin-top:6px;"><em>Dataset schema used in both Subtask 1 and Subtask 2.</em></p>

<p style="font-size: 0.9em; color: #555; margin-top: 0.5em;">
  Note 1: The data was collected in 7 different phases over multiple years (2021–2024).  
  We provide the <strong>collection_phase</strong> as additional information in case it is helpful.
</p>
<p style="font-size: 0.9em; color: #555; margin-top: 0.2em;">
  Note 2: The participants in the dataset collection study could describe "how they are feeling"  
  by writing an essay or writing 1 to 5 feeling words (e.g., happy, calm, sad, etc.).  
  We provide a boolean column <strong>is_words</strong> to distinguish the two forms.
</p>