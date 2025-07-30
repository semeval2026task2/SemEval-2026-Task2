# Tasks
---
#### **Subtask 1: Longitudinal Affect Assessment**

Given a sequence of *m* essays,  
$e_{1},\,\ldots,\,e_{m}$ in chronological order, produce **V & A** scores  

$$
(v_{1},a_{1}),\; \ldots ,\; (v_{m},a_{m})
$$

one pair for each essay (refer **Figure 1**).  
The training set includes sequences of essays and their associated **V & A** scores from multiple people.  

For this subtask the test split contains two marked groups  

1. **unseen users** – users for whom no data was observed during training  
2. **seen users** – users that also appear in the training set (but at future timesteps)  

---

#### **Subtask 2: Forecasting (future) Variation in Affect**

Given a sequence of the first *t* essays together with their **V & A** scores, this subtask asks systems to forecast two changes in **V & A** (refer **Figure 1**):

1. **State change** – change from the last observed timestep to the next  

   $$
   \Delta_{1}=v_{t+1}-v_{t}
   $$

2. **Dispositional change** – change from the average of the observed segment  
   to the average of an equally‑sized future segment  

   $$
   \Delta_{\text{avg}} = \operatorname{avg}\bigl(v_{t+1:n}\bigr)\;
                        -\; \operatorname{avg}\bigl(v_{1:t}\bigr)
   $$

---
| **User‑ID**      | **Text‑ID**      | **Text**        | **Timestamp**       | **Wave**        | **Valence**     | **Arousal** |
|------------------|------------------|-----------------|---------------------|-----------------|-----------------|-------------|
| *Example user‑id* | *Example text‑id* | Example text | Example timestamp | `[1,2,3,4,5,6]` | `[0,1,2,3,4]` | `[0,1,2]` |

*Dataset schema used in both Subtask 1 and Subtask 2.*