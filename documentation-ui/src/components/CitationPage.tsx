// components/CitationPage.tsx
import CitationBox from "@/components/CitationBox";

const acl = `Nikita Soni, H. Andrew Schwartz, Ryan L. Boyd, Phi Long Bui, Syeda Mahwish, August Håkan Nilsson, Adithya V Ganesan, Lyle Ungar, Niranjan Balasubramanian, and Saif M. Mohammad. 2026. SemEval-2026 task 2: Predicting variation in emotional valence and arousal over time from ecological essays. In Proceedings of the 20th International Workshop on Semantic Evaluation (SemEval-2026). Association for Computational Linguistics.`;

const bibtex = `@inproceedings{soni-etal-2026-semeval,
    title = "{S}em{E}val-2026 Task 2: Predicting Variation in Emotional Valence and Arousal over Time from Ecological Essays",
    author = "Soni, Nikita  and
      Schwartz, H. Andrew  and
      Boyd, Ryan L.  and
      Bui, Phi Long  and
      Mahwish, Syeda  and
      Nilsson, August H{\\aa}kan  and
      V Ganesan, Adithya  and
      Ungar, Lyle  and
      Balasubramanian, Niranjan  and
      Mohammad, Saif M.",
    booktitle = "Proceedings of the 20th International Workshop on Semantic Evaluation (SemEval-2026)",
    year = "2026",
    publisher = "Association for Computational Linguistics",
}`;

const apa = `Soni, N., Schwartz, H. A., Boyd, R. L., Bui, P. L., Mahwish, S., Nilsson, A. H., V Ganesan, A., Ungar, L., Balasubramanian, N., & Mohammad, S. M. (2026). SemEval-2026 Task 2: Predicting variation in emotional valence and arousal over time from ecological essays. In Proceedings of the 20th International Workshop on Semantic Evaluation (SemEval-2026). Association for Computational Linguistics.`;

const markdownCitation = `[SemEval-2026 Task 2: Predicting Variation in Emotional Valence and Arousal over Time from Ecological Essays](https://aclanthology.org/2026.semeval-1.451/) (Soni et al., SemEval 2026)`;

export default function CitationPage() {
  return (
    <div>
      <h1 className="text-5xl font-extrabold mb-4">Citation</h1>
        <hr className="my-4 border-t border-gray-300" />

      <CitationBox label="ACL" text={acl} />
      <CitationBox label="BibTeX" text={bibtex} isCode />
      <CitationBox label="APA" text={apa} />
      <CitationBox label="Markdown (Informal)" text={markdownCitation} />
    </div>
  );
}