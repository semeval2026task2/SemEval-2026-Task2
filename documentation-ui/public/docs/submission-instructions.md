<!-- ===== Submission Instructions ===== -->
<h2>Submission Instructions</h2>

<p>
  Upload <strong>one ZIP archive</strong> that contains up to three CSV files—one per subtask.
  Each file must keep the exact filename and column order shown below.
</p>

<hr>

<!-- ===== Subtask 1 ===== -->
<h3>Subtask&nbsp;1 — Longitudinal Affect Assessment</h3>

<table style="border-collapse:collapse;width:100%;border:1px solid #ccc;font-size:14px;">
  <thead style="background:#f7f7f7;">
    <tr>
      <th style="padding:6px 10px;border:1px solid #ccc;">Required&nbsp;filename</th>
      <th style="padding:6px 10px;border:1px solid #ccc;">Column order (header row <strong>must</strong> be present)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding:6px 10px;border:1px solid #ccc;"><code>pred_subtask1.csv</code></td>
      <td style="padding:6px 10px;border:1px solid #ccc;"><code>user_id,text_id,pred_valence,pred_arousal</code></td>
    </tr>
  </tbody>
</table>

<details style="margin-top:8px;">
  <summary><strong>CSV example <code>pred_subtask1.csv</code></strong></summary>
  <pre><code>user_id,text_id,pred_valence,pred_arousal
10,1,0.27,0.42
11,2,0.31,0.55
12,3,-0.12,0.18</code></pre>
</details>

<hr>

<!-- ===== Subtask 2A ===== -->
<h3>Subtask&nbsp;2A — State Change Forecasting</h3>

<table style="border-collapse:collapse;width:100%;border:1px solid #ccc;font-size:14px;">
  <thead style="background:#f7f7f7;">
    <tr>
      <th style="padding:6px 10px;border:1px solid #ccc;">Required&nbsp;filename</th>
      <th style="padding:6px 10px;border:1px solid #ccc;">Column order</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding:6px 10px;border:1px solid #ccc;"><code>pred_subtask2a.csv</code></td>
      <td style="padding:6px 10px;border:1px solid #ccc;"><code>user_id,pred_state_change_valence,pred_state_change_arousal</code></td>
    </tr>
  </tbody>
</table>

<details style="margin-top:8px;">
  <summary><strong>CSV example <code>pred_subtask2a.csv</code></strong></summary>
  <pre><code>user_id,pred_state_change_valence,pred_state_change_arousal
101,0.04,0.13
102,-0.05,-0.02</code></pre>
</details>

<hr>

<!-- ===== Subtask 2B ===== -->
<h3>Subtask&nbsp;2B — Dispositional Change Forecasting</h3>

<table style="border-collapse:collapse;width:100%;border:1px solid #ccc;font-size:14px;">
  <thead style="background:#f7f7f7;">
    <tr>
      <th style="padding:6px 10px;border:1px solid #ccc;">Required&nbsp;filename</th>
      <th style="padding:6px 10px;border:1px solid #ccc;">Column order</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding:6px 10px;border:1px solid #ccc;"><code>pred_subtask2b.csv</code></td>
      <td style="padding:6px 10px;border:1px solid #ccc;"><code>user_id,pred_dispo_change_valence,pred_dispo_change_arousal</code></td>
    </tr>
  </tbody>
</table>

<details style="margin-top:8px;">
  <summary><strong>CSV example <code>pred_subtask2b.csv</code></strong></summary>
  <pre><code>user_id,pred_dispo_change_valence,pred_dispo_change_arousal
101,0.10,0.08
202,-0.22,-0.15</code></pre>
</details>

<hr>

<!-- ===== Packaging ===== -->
<h3>Packaging Your Submission</h3>

<pre><code>submission.zip
├─ pred_subtask1.csv 
├─ pred_subtask2a.csv 
└─ pred_subtask2b.csv </code></pre>

<p>Upload <code>submission.zip</code> on the Codabench task page.</p>

<p>If you encounter any problems, contact the task organizers.</p>