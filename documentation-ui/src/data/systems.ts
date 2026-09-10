/**
 * Participating systems and baselines for SemEval-2026 Task 2.
 *
 * Every number here is transcribed from the task description paper
 * (Soni et al., 2026): Subtask 1 from Table 1, Subtask 2a from Table 2,
 * Subtask 2b from Table 3, core approaches from Tables 10-12, and the
 * per-team findings from Sections 5.1-5.6. Ranks exclude baselines and
 * post-deadline submissions, matching the official leaderboard.
 */

export interface SubtaskScore {
  /** Pearson r (r_composite for Subtask 1). */
  valence: number | null;
  arousal: number | null;
  avg: number | null;
  /** Official leaderboard position; absent for baselines and post-deadline entries. */
  rank?: number;
}

export interface System {
  team: string;
  /** True for teams that participated in the original SemEval-2026 shared task. */
  originalTaskParticipant: boolean;
  authors: string;
  title: string;
  /** ACL Anthology page for the system description paper. */
  paper: string;
  /** Submitted after the deadline, so excluded from the official rankings. */
  postDeadline?: boolean;
  subtask1?: SubtaskScore;
  subtask2a?: SubtaskScore;
  subtask2b?: SubtaskScore;
  /** Model families the system is built on, used for filtering. */
  backbone: string[];
  /** External data or lexicons beyond the task dataset. */
  extras?: string[];
  approach: string;
  findings?: string[];
}

export interface Baseline {
  name: string;
  description: string;
  subtask1?: SubtaskScore;
  subtask2a?: SubtaskScore;
  subtask2b?: SubtaskScore;
  /** Directories in the Hugging Face repo, empty when nothing is published. */
  files: string[];
}

export const HUGGINGFACE_REPO = "https://huggingface.co/hlab/semeval-2026-task2-models/tree/main";

export const baselines: Baseline[] = [
  {
    name: "linear(BERT)",
    description:
      "L2-regularized (ridge) linear regression on mean-pooled BERT-base-uncased token embeddings, predicting valence and arousal directly from the text.",
    subtask1: { valence: 0.557, arousal: 0.299, avg: 0.428 },
    subtask2a: { valence: 0.29, arousal: 0.199, avg: 0.245 },
    subtask2b: { valence: -0.088, arousal: 0.07, avg: -0.009 },
    files: ["subtask1/linear_bert", "subtask2a/linear_bert", "subtask2b/linear_bert"],
  },
  {
    name: "linear(BERT; prev)",
    description:
      "Ridge regression on the current text embedding together with the user's current valence/arousal value as an extra feature.",
    subtask2a: { valence: 0.43, arousal: 0.405, avg: 0.418 },
    subtask2b: { valence: -0.029, arousal: 0.019, avg: -0.005 },
    files: ["subtask2a/linear_bert_prev", "subtask2b/linear_bert_prev"],
  },
  {
    name: "linear(prev)",
    description:
      "Ridge regression on the current valence/arousal value alone, with no text representation. The strongest forecaster in the task: only two teams beat it on Subtask 2a arousal, and none beat it overall on Subtask 2b.",
    subtask2a: { valence: 0.615, arousal: 0.67, avg: 0.643 },
    subtask2b: { valence: 0.434, arousal: 0.584, avg: 0.509 },
    files: ["subtask2a/linear_prev", "subtask2b/linear_prev"],
  },
];

const originalTaskSystems: Omit<System, "originalTaskParticipant">[] = [
  {
    team: "UKP_Psycontrol",
    authors: "Hryhoryeva, Zurinaga, Jamalabadi & Gurevych",
    title: "Modeling Valence and Arousal Dynamics from Text",
    paper: "https://aclanthology.org/2026.semeval-1.76/",
    subtask1: { valence: 0.667, arousal: 0.554, avg: 0.611, rank: 1 },
    subtask2a: { valence: 0.675, arousal: 0.683, avg: 0.679, rank: 1 },
    backbone: ["GPT-5", "RoBERTa"],
    approach:
      "User-aware GPT-5 prompting with discrete emotion labels and separate strategies for seen and unseen users. Forecasting used a RoBERTa-base encoder with a trainable user embedding and the previous state change fed into an MLP regressor.",
    findings: [
      "Top overall system on Subtask 1 and the best arousal score in the task (r = 0.554).",
      "Also won Subtask 2a outright, the only team to lead both an assessment and a forecasting subtask.",
      "One of only three systems that predicted arousal worse for unseen users than seen users (ΔA = −0.068), a sign its personal-context modeling genuinely used user history.",
    ],
  },
  {
    team: "YNU-HPCC",
    authors: "Lan, Wang & Zhang",
    title: "Contrastive Calibration and Temporal Modeling for Continuous Valence-Arousal Prediction",
    paper: "https://aclanthology.org/2026.semeval-1.43/",
    subtask1: { valence: 0.677, arousal: 0.528, avg: 0.603, rank: 2 },
    subtask2a: { valence: 0.692, arousal: 0.647, avg: 0.67, rank: 2 },
    backbone: ["RoBERTa", "LSTM"],
    approach:
      "RoBERTa with contrastive learning and prompt reformulation for assessment, plus a time-aware LSTM gated on log-transformed inter-post intervals for forecasting.",
    findings: [
      "Best Subtask 2a valence score in the task (r = 0.692), ahead of the strong linear(prev) baseline.",
      "Ranked in the top five for both valence and arousal on Subtask 1, suggesting temporal modeling helped both dimensions.",
      "Near-identical performance on seen and unseen users (ΔV = −0.007) — it generalized through temporal text dynamics rather than user-specific signal.",
    ],
  },
  {
    team: "cclin",
    authors: "Lin",
    title: "SLM-Enhanced Lightweight Multi-BERT Ensemble for Longitudinal Affect Assessment",
    paper: "https://aclanthology.org/2026.semeval-1.29/",
    subtask1: { valence: 0.647, arousal: 0.527, avg: 0.587, rank: 3 },
    backbone: ["BERT", "Mistral", "Qwen"],
    approach:
      "An ensemble of lightweight BERT models enhanced by LoRA-tuned small language models (Mistral and Qwen).",
    findings: ["Third-best arousal score in the task (r = 0.527) without any explicit temporal component."],
  },
  {
    team: "AFourP",
    authors: "Thota, Swaminatha Rao, SK, RA, Muralidharan & Madhavan",
    title: "Predicting Variation in Emotional Valence and Arousal over Time from Ecological Essays",
    paper: "https://aclanthology.org/2026.semeval-1.217/",
    subtask1: { valence: 0.679, arousal: 0.466, avg: 0.573, rank: 4 },
    backbone: ["RoBERTa"],
    approach: "RoBERTa-base with a linear regression head — one of the simplest systems in the top five.",
    findings: [
      "Fourth overall on Subtask 1 with a minimal architecture, showing how far a well-tuned encoder plus regression head goes on assessment.",
      "Gained substantially on unseen users for arousal (ΔA = +0.246).",
      "One of only three teams that did better on essays than on feeling words for valence.",
    ],
  },
  {
    team: "lamanhnguyen",
    authors: "Nguyen",
    title: "Uncovering Lexical Bias and Momentum Lag in Longitudinal Emotion Prediction using Multi-task DeBERTa",
    paper: "https://aclanthology.org/2026.semeval-1.91/",
    subtask1: { valence: 0.687, arousal: 0.458, avg: 0.573, rank: 5 },
    subtask2a: { valence: -0.273, arousal: -0.275, avg: -0.274, rank: 14 },
    subtask2b: { valence: -0.398, arousal: -0.577, avg: -0.488, rank: 12 },
    backbone: ["DeBERTa"],
    approach:
      "Two DeBERTa-v3-base variants trained with complementary regimes — one with strict early stopping for stability, one trained longer for sensitivity to high-variance emotional states — combined by a weighted linear blend, followed by momentum-based post-processing.",
    findings: [
      "Second-best valence score in the task on Subtask 1 (r = 0.687).",
      "Finished last on both forecasting subtasks. The paper attributes this to momentum-based dampening, which is counterproductive for predicting long-term dispositional change.",
      "The clearest illustration that strong assessment performance does not transfer to forecasting.",
    ],
  },
  {
    team: "CSIRO-LT",
    authors: "Chen, Bölücü, Karimi, Molla & Paris",
    title: "In-the-Wild Valence and Arousal Forecasting on Ecological Text Time Series",
    paper: "https://aclanthology.org/2026.semeval-1.24/",
    subtask1: { valence: 0.656, arousal: 0.488, avg: 0.572, rank: 6 },
    subtask2a: { valence: 0.621, arousal: 0.477, avg: 0.549, rank: 6 },
    subtask2b: { valence: -0.147, arousal: 0.114, avg: -0.017, rank: 8 },
    backbone: ["RoBERTa"],
    approach:
      "RoBERTa-Twitter with temporal feature diffusion — a 24 × 1 temporal feature embedding concatenated with the [CLS] token, over a 5-post window for Subtask 2a and a 15-post window for Subtask 2b.",
    findings: [
      "One of four teams to beat the linear(prev) baseline on Subtask 2a valence, all of which used an explicit sequential component conditioned on temporal history.",
      "Entered all three subtasks.",
    ],
  },
  {
    team: "CuriosAI",
    authors: "Beppu, Takushima, Manoj, Yamaga, Shibata & Hori",
    title: "Predicting Emotion using RoBERTa-large model",
    paper: "https://aclanthology.org/2026.semeval-1.18/",
    subtask1: { valence: 0.683, arousal: 0.451, avg: 0.567, rank: 7 },
    subtask2a: { valence: 0.467, arousal: 0.275, avg: 0.371, rank: 9 },
    subtask2b: { valence: -0.161, arousal: 0.011, avg: -0.075, rank: 9 },
    backbone: ["RoBERTa"],
    extras: ["EmoBank"],
    approach:
      "A two-phase training curriculum: RoBERTa-large first fine-tuned on EmoBank for broadly grounded dimensional affect regression, then on the task data with multi-task fine-tuning.",
    findings: [
      "Third-best valence score on Subtask 1 (r = 0.683); the top three were separated by fewer than 0.006 points.",
      "Pre-training on EmoBank anchored the model's prediction scale before task-specific fine-tuning.",
      "Among the larger drops on unseen users for valence (ΔV = −0.069), consistent with an architecture built for prospective prediction.",
    ],
  },
  {
    team: "Bison AI4PC",
    authors: "Shah, Shah & Aryal",
    title: "Fine-Tuning DistilBERT, DeBERTa and ModernBERT for Valence–Arousal Prediction and Change Estimation",
    paper: "https://aclanthology.org/2026.semeval-1.89/",
    subtask1: { valence: 0.665, arousal: 0.468, avg: 0.567, rank: 8 },
    subtask2a: { valence: 0.379, arousal: 0.085, avg: 0.232, rank: 10 },
    subtask2b: { valence: -0.12, arousal: -0.103, avg: -0.111, rank: 10 },
    backbone: ["DistilBERT"],
    approach:
      "DistilBERT with an MLP head and user-based train/validation splits, extended with history statistics (mean, trend) for Subtask 2a and a BiLSTM over affect statistics for Subtask 2b.",
    findings: ["Entered all three subtasks with a deliberately lightweight encoder."],
  },
  {
    team: "CITD@UIT",
    authors: "Phuong, Ngo, Dao & Nguyen",
    title: "Temporal Mixture-of-Experts for Longitudinal Valence and Arousal Prediction from Ecological Essays",
    paper: "https://aclanthology.org/2026.semeval-1.25/",
    subtask1: { valence: 0.637, arousal: 0.489, avg: 0.563, rank: 9 },
    subtask2a: { valence: 0.629, arousal: 0.633, avg: 0.631, rank: 5 },
    subtask2b: { valence: -0.169, arousal: -0.06, avg: -0.114, rank: 11 },
    backbone: ["RoBERTa", "Mixture-of-Experts"],
    approach:
      "RoBERTa-Cardiff feeding a Mixture-of-Experts head trained with Concordance Correlation Coefficient (CCC) loss, processing a sliding window of the previous k = 8 texts for forecasting.",
    findings: [
      "One of four teams to beat the linear(prev) baseline on Subtask 2a valence.",
      "CCC loss jointly penalizes deviations in mean, variance and correlation, unlike plain MSE.",
    ],
  },
  {
    team: "McMaster NLP",
    authors: "Zhang, Hu & Lahnala",
    title: "A Lightweight Multi-Feature System for Predicting Emotional Valence and Arousal over Time",
    paper: "https://aclanthology.org/2026.semeval-1.98/",
    subtask1: { valence: 0.665, arousal: 0.46, avg: 0.562, rank: 10 },
    backbone: ["Sentence embeddings", "MLP"],
    extras: ["LIWC"],
    approach:
      "Sentence embeddings combined with LIWC features, seed-word similarity scores and user embeddings, fed to an MLP.",
    findings: ["The strongest system that did not fine-tune a transformer encoder end to end."],
  },
  {
    team: "Perspicere",
    authors: "Zehab, Poulaei & Mozayani",
    title: "Modeling Longitudinal Valence and Arousal via Dense Embeddings and Agentic Reasoning",
    paper: "https://aclanthology.org/2026.semeval-1.97/",
    subtask1: { valence: 0.623, arousal: 0.497, avg: 0.56, rank: 11 },
    backbone: ["Jasper embeddings", "SVM"],
    approach: "Frozen Jasper (Matryoshka) embeddings with a support vector machine on top — no encoder fine-tuning at all.",
    findings: ["Fourth-best arousal score in the task (r = 0.497) from entirely frozen representations."],
  },
  {
    team: "NLPGroup8",
    authors: "Arthur, Kelley & Reschke",
    title: "Diverse Ensembles and Hierarchical Transformers for Emotional State Prediction",
    paper: "https://aclanthology.org/2026.semeval-1.56/",
    subtask1: { valence: 0.688, arousal: 0.416, avg: 0.552, rank: 12 },
    subtask2a: { valence: 0.152, arousal: 0.126, avg: 0.139, rank: 11 },
    subtask2b: { valence: 0.354, arousal: 0.388, avg: 0.371, rank: 2 },
    backbone: ["RoBERTa", "Transformer decoder"],
    approach:
      "Five independent RoBERTa models with different output objectives — sigmoid regression, ordinal decomposition via SoftMax, and binary threshold formulations — averaged into one prediction. Trained with a composite 90% Pearson r / 10% MSE loss that directly optimizes the leaderboard metric. Forecasting used a transformer decoder over a sliding window.",
    findings: [
      "Best valence score in the entire task on Subtask 1 (r = 0.688).",
      "Yet scored r = 0.152 on Subtask 2a valence, below every baseline — the sharpest example of assessment representations failing to transfer to temporal change prediction.",
      "Recovered to second place on Subtask 2b, the harder forecasting subtask.",
      "Largest arousal improvement on unseen users of any system (+0.304, from 0.297 seen to 0.601 unseen).",
    ],
  },
  {
    team: "Cherish",
    authors: "Parahita",
    title: "Enhancing RoBERTa-Based Models for Emotional Valence and Arousal Prediction with Personalized PLoRA and Temporal Embeddings",
    paper: "https://aclanthology.org/2026.semeval-1.348/",
    subtask1: { valence: 0.596, arousal: 0.505, avg: 0.551, rank: 13 },
    subtask2a: { valence: null, arousal: null, avg: null, rank: 15 },
    backbone: ["RoBERTa", "BERT"],
    approach:
      "RoBERTa/BERT with PLoRA-based per-user personalization and temporal embeddings, extended with a GRU for forecasting.",
    findings: [
      "Fifth-best arousal score on Subtask 1 (r = 0.505).",
      "Its Subtask 2a submission returned NaN and could not be scored.",
      "One of only three teams that did better on essays than feeling words for valence.",
    ],
  },
  {
    team: "Ajman University",
    authors: "Jumakhan, Assad, Abdullah & Al-Ayyoub",
    title: "Overcoming Scale Collapse in Temporal Emotion Modeling via Residual Learning",
    paper: "https://aclanthology.org/2026.semeval-1.66/",
    subtask1: { valence: 0.656, arousal: 0.439, avg: 0.548, rank: 14 },
    subtask2a: { valence: 0.615, arousal: 0.67, avg: 0.642, rank: 4 },
    subtask2b: { valence: -0.124, arousal: 0.456, avg: 0.166, rank: 5 },
    backbone: ["DistilBERT", "DeBERTa", "BiLSTM"],
    approach:
      "DistilBERT with a BiLSTM and gated user embeddings for assessment; DeBERTa-v3-base with a “Megaphone” MLP and CCC loss for state change; DeBERTa-v3-large with Siamese difference pooling for dispositional change.",
    findings: [
      "Essentially tied with the linear(prev) baseline on Subtask 2a (0.642 vs 0.643).",
      "Third-best arousal score on Subtask 2b (r = 0.456) despite a negative valence correlation.",
      "One of three teams that used CCC loss.",
    ],
  },
  {
    team: "VerbaNex AI",
    authors: "Moreno, Martinez Santos & Puertas",
    title: "DeBERTa for Longitudinal Valence and Arousal Prediction",
    paper: "https://aclanthology.org/2026.semeval-1.92/",
    subtask1: { valence: 0.632, arousal: 0.463, avg: 0.547, rank: 15 },
    backbone: ["RoBERTa"],
    extras: ["NRC VAD lexicon"],
    approach: "RoBERTa-base augmented with NRC VAD lexicon features.",
    findings: ["Second-largest arousal gain on unseen users (+0.269)."],
  },
  {
    team: "IMEZO / Khaleesiyali",
    authors: "Tee",
    title: "Lexicon-Augmented RoBERTa for Valence–Arousal Regression on Ecological Essays",
    paper: "https://aclanthology.org/2026.semeval-1.75/",
    subtask1: { valence: 0.656, arousal: 0.437, avg: 0.547, rank: 16 },
    backbone: ["RoBERTa"],
    extras: ["NRC VAD lexicon"],
    approach: "RoBERTa-base with NRC VAD lexicon augmentation.",
  },
  {
    team: "AI4PC-Howard University",
    authors: "Shah, Shah & Aryal",
    title: "Fine-Tuning DistilBERT, DeBERTa and ModernBERT for Valence–Arousal Prediction and Change Estimation",
    paper: "https://aclanthology.org/2026.semeval-1.89/",
    subtask1: { valence: 0.631, arousal: 0.462, avg: 0.546, rank: 17 },
    subtask2a: { valence: 0.597, arousal: 0.413, avg: 0.505, rank: 7 },
    subtask2b: { valence: 0.046, arousal: 0.348, avg: 0.197, rank: 4 },
    backbone: ["DeBERTa", "ModernBERT", "GRU"],
    approach:
      "Fine-tuned DeBERTa and ModernBERT with a GRU sequence encoder for assessment and state change, and an MLP over pooled embeddings for dispositional change.",
    findings: [
      "Smallest seen/unseen valence gap of any system (ΔV = −0.002) — the DeBERTa + GRU architecture generalized across user types without explicit seen/unseen routing.",
      "One of only five teams with a positive valence correlation on Subtask 2b.",
    ],
  },
  {
    team: "LexMachina",
    authors: "Ganguli, Dutta, Datta, Barman & Naskar",
    title: "Predicting Variation in Emotional Valence and Arousal over Time from Ecological Essays",
    paper: "https://aclanthology.org/2026.semeval-1.79/",
    subtask1: { valence: 0.645, arousal: 0.434, avg: 0.539, rank: 18 },
    backbone: ["DeBERTa", "DANN"],
    approach:
      "DeBERTa-v3 with a domain-adversarial (DANN) head on the arousal branch that explicitly penalizes encoding user identity during training.",
    findings: [
      "A structurally different take on user modeling: rather than adding user embeddings, it removes user identity to stop the model collapsing to each person's mean score instead of modeling within-person dynamics.",
      "Fourth-largest arousal gain on unseen users (+0.231).",
    ],
  },
  {
    team: "Emo-tica",
    authors: "Noor & Fatima",
    title: "Trait–State Affect Forecaster for Longitudinal Valence and Arousal",
    paper: "https://aclanthology.org/2026.semeval-1.31/",
    subtask1: { valence: 0.645, arousal: 0.409, avg: 0.527, rank: 19 },
    subtask2a: { valence: 0.424, arousal: 0.355, avg: 0.39, rank: 8 },
    subtask2b: { valence: 0.257, arousal: 0.418, avg: 0.337, rank: 3 },
    backbone: ["DistilBERT", "Ridge", "LightGBM"],
    approach:
      "A DistilBERT Trait–State model with learned user embeddings for assessment. For forecasting it largely sidestepped text modeling, fitting ridge regression (valence) and LightGBM (arousal) on user-level trajectory statistics: mean, standard deviation, trend slope, extrema and time span.",
    findings: [
      "Third on Subtask 2b, showing that hand-crafted trajectory features were more robust than end-to-end neural forecasting.",
      "One of only five teams with a positive valence correlation on Subtask 2b.",
    ],
  },
  {
    team: "AGI",
    authors: "Rathva",
    title: "Predicting Variation in Emotional Valence and Arousal over Time from Ecological Essays",
    paper: "https://aclanthology.org/2026.semeval-1.21/",
    subtask1: { valence: 0.6, arousal: 0.452, avg: 0.526, rank: 20 },
    subtask2a: { valence: -0.167, arousal: -0.147, avg: -0.157, rank: 13 },
    subtask2b: { valence: 0.086, arousal: -0.081, avg: 0.003, rank: 6 },
    backbone: ["RoBERTa", "GRU"],
    approach:
      "RoBERTa-large with a unidirectional GRU and an inertia gate, trained on a correlation-first phased schedule with explicit variance-preservation terms. Subtask 2a added a zero-inflated change model and 2b a time-weighted exponential moving average.",
    findings: [
      "Identified prediction collapse as a specific risk for arousal, where low label variance pushes models toward near-constant outputs, and designed the loss schedule to counter it.",
      "One of only five teams with a positive valence correlation on Subtask 2b.",
    ],
  },
  {
    team: "EcoAffectTrack",
    authors: "Kumar & Joshi",
    title: "A Hierarchical DeBERTa-Transformer Framework with CCC Optimization for Longitudinal Affect Modeling",
    paper: "https://aclanthology.org/2026.semeval-1.77/",
    subtask1: { valence: 0.663, arousal: 0.373, avg: 0.518, rank: 21 },
    subtask2a: { valence: -0.243, arousal: -0.011, avg: -0.127, rank: 12 },
    subtask2b: { valence: -0.243, arousal: 0.226, avg: -0.009, rank: 7 },
    backbone: ["DeBERTa", "LSTM"],
    approach:
      "DeBERTa-v3-base trained with CCC loss, extended with a frozen-encoder LSTM and instance normalization for state change, and ridge regression on DeBERTa user-profile embeddings for dispositional change.",
    findings: ["One of three teams that used CCC loss rather than plain MSE."],
  },
  {
    team: "UAlberta",
    authors: "Ho, Bui, Teodorescu & Kondrak",
    title: "Temporal Fusion Models for Predicting Affect Over Time",
    paper: "https://aclanthology.org/2026.semeval-1.87/",
    subtask1: { valence: 0.556, arousal: 0.444, avg: 0.5, rank: 22 },
    subtask2a: { valence: 0.615, arousal: 0.674, avg: 0.645, rank: 3 },
    subtask2b: { valence: 0.405, arousal: 0.602, avg: 0.503, rank: 1 },
    backbone: ["BERT", "BiLSTM", "Temporal Fusion Transformer"],
    approach:
      "BERT with BiLSTM temporal sequence modeling, and a Temporal Fusion Transformer for state change. For dispositional change it used an indirect strategy: rather than regressing a single per-user change label, it predicted mean affect for each longitudinal segment separately and derived the change by differencing the predicted group means.",
    findings: [
      "Won Subtask 2b, and posted the single best arousal score there (r = 0.602) — the only score to exceed the linear(prev) baseline on that dimension.",
      "The indirect group-mean strategy let it reuse the Subtask 1 affect signal instead of learning a sparse long-term difference signal from scratch.",
      "Middling on Subtask 1 (22nd) and the largest valence drop on unseen users among submitted systems (ΔV = −0.111), the cost of optimizing for prospective prediction.",
    ],
  },
  {
    team: "NLP-FSDM",
    authors: "Benlahbib, Essalmani, Boumhidi, Fahfouh & Alami",
    title: "Temporal Smoothing and CCC-MAE Optimization for Balanced Longitudinal Affect Assessment",
    paper: "https://aclanthology.org/2026.semeval-1.49/",
    subtask1: { valence: 0.546, arousal: 0.453, avg: 0.499, rank: 23 },
    backbone: ["ModernBERT"],
    approach: "ModernBERT with temporal smoothing and ensembling, optimized on a combined CCC-MAE objective.",
  },
  {
    team: "VAP-GameController",
    authors: "Le, Phu, Tran, Nguyen & Choudhury",
    title: "Lexical-based and Emotion-Aware Approaches for Longtitudinal Emotion Prediction",
    paper: "https://aclanthology.org/2026.semeval-1.37/",
    subtask1: { valence: 0.615, arousal: 0.322, avg: 0.469, rank: 24 },
    backbone: ["LLM"],
    extras: ["NRC VAD lexicon"],
    approach: "NRC VAD lexicon features combined with an LLM and time-aware fusion.",
  },
  {
    team: "One and Only",
    authors: "Dinh",
    title: "Evaluating Zero-Shot Autonomous LLM Agents and Heuristic Proxies in Ecological Affect Forecasting",
    paper: "https://aclanthology.org/2026.semeval-1.162/",
    subtask1: { valence: 0.527, arousal: 0.315, avg: 0.421, rank: 25 },
    subtask2a: { valence: -0.194, arousal: -0.423, avg: -0.308 },
    subtask2b: { valence: -0.185, arousal: 0.016, avg: -0.084 },
    postDeadline: true,
    backbone: ["GPT-5"],
    extras: ["Lexicon"],
    approach: "Zero-shot GPT-5 prompting with lexicon support and no fine-tuning at all.",
    findings: [
      "One of three teams to fall below the linear(BERT) baseline on Subtask 1 valence; all three relied on zero-shot LLM inference or models trained from scratch.",
      "Largest gain from feeling words over essays for valence in the whole task (ΔV = +0.212), consistent with LLMs reading short, emotionally direct labels well but struggling to extract valence from unstructured narrative.",
      "Its Subtask 1 entry made the official leaderboard; the forecasting entries were post-deadline.",
    ],
  },
  {
    team: "Momentum",
    authors: "Nadiger, Saumya, Pujari, Hiremath, Chikaraddi & Kadkol",
    title: "LongVA-RoBERTa, a Transformer-Based Longitudinal Valence and Arousal Modeling",
    paper: "https://aclanthology.org/2026.semeval-1.78/",
    postDeadline: true,
    subtask1: { valence: 0.638, arousal: 0.455, avg: 0.547 },
    subtask2a: { valence: 0.553, arousal: 0.589, avg: 0.571 },
    backbone: ["RoBERTa"],
    approach: "LongVA-RoBERTa, a transformer-based model for longitudinal valence and arousal.",
    findings: [
      "Scores would have placed it around 15th on Subtask 1 and 6th on Subtask 2a had it met the deadline.",
    ],
  },
  {
    team: "ES4MLL",
    authors: "Lolli, Lunazzi, Coppola & Giobergia",
    title: "Set Attention Aggregation and Recurrent Temporal Modeling for Longitudinal Affect Prediction",
    paper: "https://aclanthology.org/2026.semeval-1.102/",
    postDeadline: true,
    subtask1: { valence: 0.65, arousal: 0.433, avg: 0.541 },
    backbone: ["Set attention", "RNN"],
    approach: "Set attention aggregation over a user's texts combined with recurrent temporal modeling.",
  },
  {
    team: "Draken",
    authors: "Sivanaiah, Angel Deborah S, Krishna Varun R & Krishnaraj N",
    title: "Frozen BERT Embeddings with Ridge Regression for Predicting Emotional Valence and Arousal",
    paper: "https://aclanthology.org/2026.semeval-1.55/",
    postDeadline: true,
    subtask1: { valence: 0.594, arousal: 0.296, avg: 0.445 },
    backbone: ["BERT", "Ridge"],
    approach: "Frozen BERT embeddings with ridge regression, closely mirroring the organizers' linear(BERT) baseline.",
  },
];

export const systems: System[] = originalTaskSystems.map((system) => ({
  ...system,
  originalTaskParticipant: true,
}));
