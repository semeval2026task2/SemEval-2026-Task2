# Data 
---

Please register for the shared task to access the datasets on our [Codabench competition site](https://www.codabench.org/competitions/9963/) [https://www.codabench.org/competitions/9963/](https://www.codabench.org/competitions/9963/).

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
      <td style="padding:6px 8px;border:1px solid #ccc;">[1, 2, 3, 4, 5, 6, 7]</td>
			<td style="padding:6px 8px;border:1px solid #ccc;">[True, False]</td>
      <td style="padding:6px 8px;border:1px solid #ccc;">[-2, -1, 0, 1, 2]</td>
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

### Total Dataset Size

<table style="border-collapse:collapse;width:100%;border:1px solid #ccc;font-size:14px;">
  <thead>
    <tr style="background:#f7f7f7;">
      <th style="padding:6px 8px;border:1px solid #ccc;"></th>
      <th style="padding:6px 8px;border:1px solid #ccc;"><strong>Number of Texts per User</strong></th>
      <th style="padding:6px 8px;border:1px solid #ccc;"><strong>Number of Essays per User</strong></th>
      <th style="padding:6px 8px;border:1px solid #ccc;"><strong>Number of Feeling-Word instances per User</strong></th>
      <th style="padding:6px 8px;border:1px solid #ccc;"><strong>Number of Words per Text</strong></th>
      <th style="padding:6px 8px;border:1px solid #ccc;"><strong>Number of Words per Essay</strong></th>
      <th style="padding:6px 8px;border:1px solid #ccc;"><strong>Number of Words per Feeling-Word Text</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th style="padding:6px 8px;border:1px solid #ccc;text-align:left;">count</th>
      <td style="padding:6px 8px;border:1px solid #ccc;">5,285.00</td>
      <td style="padding:6px 8px;border:1px solid #ccc;">2,628.00</td>
      <td style="padding:6px 8px;border:1px solid #ccc;">2,657.00</td>
      <td style="padding:6px 8px;border:1px solid #ccc;">5,285.00</td>
      <td style="padding:6px 8px;border:1px solid #ccc;">2,628.00</td>
      <td style="padding:6px 8px;border:1px solid #ccc;">2,657.00</td>
    </tr>
    <tr>
      <th style="padding:6px 8px;border:1px solid #ccc;text-align:left;">mean</th>
      <td style="padding:6px 8px;border:1px solid #ccc;">72.83</td>
      <td style="padding:6px 8px;border:1px solid #ccc;">53.09</td>
      <td style="padding:6px 8px;border:1px solid #ccc;">48.28</td>
      <td style="padding:6px 8px;border:1px solid #ccc;">34.39</td>
      <td style="padding:6px 8px;border:1px solid #ccc;">60.34</td>
      <td style="padding:6px 8px;border:1px solid #ccc;">8.73</td>
    </tr>
    <tr>
      <th style="padding:6px 8px;border:1px solid #ccc;text-align:left;">std</th>
      <td style="padding:6px 8px;border:1px solid #ccc;">72.33</td>
      <td style="padding:6px 8px;border:1px solid #ccc;">60.98</td>
      <td style="padding:6px 8px;border:1px solid #ccc;">58.85</td>
      <td style="padding:6px 8px;border:1px solid #ccc;">32.47</td>
      <td style="padding:6px 8px;border:1px solid #ccc;">27.89</td>
      <td style="padding:6px 8px;border:1px solid #ccc;">1.76</td>
    </tr>
    <tr>
      <th style="padding:6px 8px;border:1px solid #ccc;text-align:left;">min</th>
      <td style="padding:6px 8px;border:1px solid #ccc;">3.00</td>
      <td style="padding:6px 8px;border:1px solid #ccc;">1.00</td>
      <td style="padding:6px 8px;border:1px solid #ccc;">1.00</td>
      <td style="padding:6px 8px;border:1px solid #ccc;">5.00</td>
      <td style="padding:6px 8px;border:1px solid #ccc;">9.00</td>
      <td style="padding:6px 8px;border:1px solid #ccc;">5.00</td>
    </tr>
    <tr>
      <th style="padding:6px 8px;border:1px solid #ccc;text-align:left;">25%</th>
      <td style="padding:6px 8px;border:1px solid #ccc;">25.00</td>
      <td style="padding:6px 8px;border:1px solid #ccc;">13.00</td>
      <td style="padding:6px 8px;border:1px solid #ccc;">13.00</td>
      <td style="padding:6px 8px;border:1px solid #ccc;">9.00</td>
      <td style="padding:6px 8px;border:1px solid #ccc;">48.00</td>
      <td style="padding:6px 8px;border:1px solid #ccc;">9.00</td>
    </tr>
    <tr>
      <th style="padding:6px 8px;border:1px solid #ccc;text-align:left;">50%</th>
      <td style="padding:6px 8px;border:1px solid #ccc;">35.00</td>
      <td style="padding:6px 8px;border:1px solid #ccc;">18.00</td>
      <td style="padding:6px 8px;border:1px solid #ccc;">18.00</td>
      <td style="padding:6px 8px;border:1px solid #ccc;">14.00</td>
      <td style="padding:6px 8px;border:1px solid #ccc;">53.00</td>
      <td style="padding:6px 8px;border:1px solid #ccc;">9.00</td>
    </tr>
    <tr>
      <th style="padding:6px 8px;border:1px solid #ccc;text-align:left;">75%</th>
      <td style="padding:6px 8px;border:1px solid #ccc;">152.00</td>
      <td style="padding:6px 8px;border:1px solid #ccc;">117.00</td>
      <td style="padding:6px 8px;border:1px solid #ccc;">42.00</td>
      <td style="padding:6px 8px;border:1px solid #ccc;">53.00</td>
      <td style="padding:6px 8px;border:1px solid #ccc;">62.00</td>
      <td style="padding:6px 8px;border:1px solid #ccc;">9.00</td>
    </tr>
    <tr>
      <th style="padding:6px 8px;border:1px solid #ccc;text-align:left;">max</th>
      <td style="padding:6px 8px;border:1px solid #ccc;">215.00</td>
      <td style="padding:6px 8px;border:1px solid #ccc;">168.00</td>
      <td style="padding:6px 8px;border:1px solid #ccc;">177.00</td>
      <td style="padding:6px 8px;border:1px solid #ccc;">230.00</td>
      <td style="padding:6px 8px;border:1px solid #ccc;">230.00</td>
      <td style="padding:6px 8px;border:1px solid #ccc;">42.00</td>
    </tr>
  </tbody>
</table>
