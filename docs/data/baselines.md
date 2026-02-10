# Baselines (Released Jan 5, 2025)
---
We use the following 2 methods for our baselines:

1. **L2 penalized linear layer on BERT:**
    * Subtask 1: `Linear(BERT)`
    * Subtask 2: `Linear(BERT; Previous)`
2. **Random baselines:**
    * Subtask1: `rand(mean)` = predict the global mean from train for each text in Test.
    * Subtask2: `rand(zero)` = forecast no change (i.e., zero) in state change and disposition change for every user in Test.

### Baselines Training Details:

All baseline systems use BERT-base-uncased embeddings unless specified.

#### Subtask 1 with Linear(BERT) :
Train a ridge regression model on the train set using text embeddings (averaged token embeds) to produce V & A scores.
The trained model is then used to predict V & A scores for subtask 1 test set.

#### Subtask 2a with Linear(BERT, previous):
The training data consists of a sequence of texts and corresponding V & A scores.
The goal is to determine the state change. To create a baseline for predicting state change, corresponding to each text per user, we compute
$$\Delta_i = V_{i+1} - V_i \text{ (and similarly for A).}$$
For e.g., if a user has 5 texts, then we create 4 training instances for that user where each text has a state change label except the last one (since we do not have the future V & scores available to compute state change).

To predict the state change (i.e., $\Delta_i$), one can use all the texts before the text under consideration. For our baseline, we only use the corresponding text embeddings and the V (or A) as features for a ridge regression model to train for predicting $\Delta_i$ on these instances.

#### Subtask 2b with Linear(BERT, previous):
The training data consists of a sequence of texts and corresponding V & A scores.
The goal is to determine the disposition change. One can use the training set in different ways to create $\Delta_{avg}$ by dividing the texts per user into different groups. For our baseline, we divide the chronological texts from each user within the train set into 2 halves (at the halfway point for the number of texts per user). Consequently, we calculate mean_V (or mean_A) for each half.
$\Delta_{avg}$ labels are computed by subtracting the first half's mean_V (or mean_A) from the second half's mean_V (or mean_A) for each user.

For e.g., if a user has 6 texts, then we create two halves with the first 3 texts and the next 3 texts. $\Delta_{avg}$ for this use is computed by subtracting the average V (or A) of the second half from the first half.

We use an average of text embeddings of the first half of the texts from each user, along with the corresponding mean_V (or mean_A) as features for a ridge regression model to train for predicting $\Delta_{avg}$ on these instances.

<div align="center">
  <img src="https://i.imgur.com/o8XJDCg.png" alt="Baselines Table" width="90%" />
</div>
<div align="center">
  <img src="https://i.imgur.com/PJwsA8H.png" alt="Baselines Table" width="90%" />
</div>

<span style="font-style: italic; margin-left: 5px;">Note: The additional metrics are using the <strong>Linear(BERT)</strong> baseline.</span>
