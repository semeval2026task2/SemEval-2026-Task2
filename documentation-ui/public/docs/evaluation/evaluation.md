# Evaluation (Released Dec 6, 2025)

All submissions are evaluated using **Pearson r** and **Mean Absolute Error (MAE)**, applied in subtask-specific ways. Each subtask requires predictions for two outcomes: **valence** and **arousal**.

Evaluation script can be found on [Github](https://github.com/semeval2026task2/EmotionValArouTimeVariation2026/tree/main/semeval2026-task2-eval)

---

## Subtask 1 — Longitudinal Affect Assessment

For each outcome (valence and arousal), evaluation is based on three correlation measures:

### 1. Between-user correlation
For each user, the **mean predicted text score** and **mean gold text score** are computed across all texts associated with that user. Pearson $r$ is then calculated across users using these per-user means:

$$
r_{\text{between}}(\{\hat{y}_{u,t}\}, \{y_{u,t}\}) = r\left(\{mean_{t \in u}(\hat{y}_{u,t})\}_{u=1}^N, \{mean_{t \in u}(y_{u,t})\}_{u=1}^N\right)
$$

Similarly, $\text{MAE}_{\text{between}}$ is computed:

$$
mae_{\text{between}}(\{\hat{y}_{u,t}\}, \{y_{u,t}\}) = mae\left(\{mean_{t \in u}(\hat{y}_{u,t})\}_{u=1}^N, \{mean_{t \in u}(y_{u,t})\}_{u=1}^N\right)
$$

*Where $u$ is a user, and $t$ is a text.*

### 2. Within-user correlation
For each user, Pearson $r$ is computed between the predicted and gold text scores across that user’s texts. These per-user correlations are then averaged across users.

$$
r_{\text{within}}(\{\hat{y}_{u,t}\}, \{y_{u,t}\}) = mean_{\forall u}\left(r_u(\{\hat{y}_{u,t}\}_{t \in u}, \{y_{u,t}\}_{t \in u})\right)
$$

Similarly, $\text{MAE}_{\text{within}}$ is computed:

$$
mae_{\text{within}}(\{\hat{y}_{u,t}\}, \{y_{u,t}\}) = mean_{\forall u}\left(mae_u(\{\hat{y}_{u,t}\}_{t \in u}, \{y_{u,t}\}_{t \in u})\right)
$$

*Where $u$ is a user, and $t$ is a text.*

### 3. Composite correlation (used for ranking)
Between-user and within-user correlations are combined using Fisher’s z-transformation:

$$
r_{\text{composite}} = \tanh\left(\frac{\text{arctanh}(r_{\text{within}}) + \text{arctanh}(r_{\text{between}})}{2}\right)
$$

Similarly, $\text{MAE}_{\text{composite}}$ is computed:

$$
mae_{\text{composite}} = \tanh\left(\frac{\text{arctanh}(mae_{\text{within}}) + \text{arctanh}(mae_{\text{between}})}{2}\right)
$$

### Leaderboard policy for Subtask 1:
* Leaderboard ordering is based on the **composite correlation ($r_{\text{composite}}$)**.
* Results for **between-user** and **within-user** correlations will also be highlighted separately.

---

## Subtask 2 — Forecasting Future Variation in Affect

Each subtask evaluates Pearson $r$ for **valence** and **arousal** independently. Participants must predict two outcomes (valence and arousal) for each subtask.

### Subtask 2A — State Change
Pearson $r$ between predicted and gold **state change** values per user.

$$
r(\hat{y}_u, y_u)
$$

Similarly, MAE is computed:

$$
mae(\hat{y}_u, y_u)
$$

*Where $u$ is a user.*

### Subtask 2B — Disposition Change
Pearson $r$ between predicted and gold **disposition change** values per user.

$$
r(\hat{y}_u, y_u)
$$

Similarly, MAE is computed:

$$
mae(\hat{y}_u, y_u)
$$

*Where $u$ is a user.*

