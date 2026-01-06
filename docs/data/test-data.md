# Test Data
---
### Subtask 1: Longitudinal Affect Assessment (`test_subtask1.csv`)

The evaluation data for subtask1 consists of 1,737 **longitudinal texts** (“ecological essays and feeling words”) written by 91 authors.

The data has the same format as the training data along with an additional marker:

* `is_seen_user`: a boolean (True/False) to identify the users whose partial data was released in the training set.

### Subtask 2 — Forecasting Future Variation in Affect
**(`subtask2a_forecasting_user_marker.csv`, `subtask2b_forecasting_user_marker.csv`, `test_subtask2.csv`)**

The evaluation data for subtask2 releases the marker to submit the forecasted outcomes for the users under evaluation:

* `is_forecasting_user`: a boolean to identify the users whose partial data was released in the training set and will be evaluated for forecasting state_change and disposition_change outcomes.

We are also releasing additional information for the forecasting users as part of the test set (`test_subtask2.csv`), which consists of:

* `timestamp_min`: this is the timestamp when the immediate future text was written by the author as part of the dataset.
* `timestamp_max`: this is the timestamp when the last text was written by the author as part of the dataset.
* `collection_phase_min`: this is the collection_phase when the immediate future text was written by the author as part of the dataset.
* `collection_phase_max`: this is the collection_phase when the last text was written by the author as part of the dataset.

Please take a look at the Data section to learn more about the data format and statistics.