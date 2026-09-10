import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { baselines, systems, HUGGINGFACE_REPO, System, SubtaskScore } from "@/data/systems";

type SubtaskKey = "subtask1" | "subtask2a" | "subtask2b";

const SUBTASKS: { key: SubtaskKey; short: string; label: string; metric: string }[] = [
  { key: "subtask1", short: "Subtask 1", label: "Longitudinal Affect Assessment", metric: "r_composite" },
  { key: "subtask2a", short: "Subtask 2a", label: "Forecasting State Change", metric: "Pearson r" },
  { key: "subtask2b", short: "Subtask 2b", label: "Forecasting Dispositional Change", metric: "Pearson r" },
];

const fmt = (v: number | null | undefined) =>
  v === null || v === undefined ? "n/a" : v.toFixed(3);

const scoreColor = (v: number | null | undefined) =>
  v === null || v === undefined ? "text-muted-foreground" : v < 0 ? "text-red-600" : "text-foreground";

function ScoreRow({ subtask, score }: { subtask: (typeof SUBTASKS)[number]; score: SubtaskScore }) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 py-1.5 border-t border-border/60 text-sm">
      <span className="w-24 shrink-0 font-semibold">{subtask.short}</span>
      {score.rank !== undefined && (
        <span className="rounded bg-purple-100 px-1.5 py-0.5 text-xs font-semibold text-purple-800">
          #{score.rank}
        </span>
      )}
      <span className="text-muted-foreground">
        V <span className={`font-mono ${scoreColor(score.valence)}`}>{fmt(score.valence)}</span>
      </span>
      <span className="text-muted-foreground">
        A <span className={`font-mono ${scoreColor(score.arousal)}`}>{fmt(score.arousal)}</span>
      </span>
      <span className="text-muted-foreground">
        avg <span className={`font-mono font-semibold ${scoreColor(score.avg)}`}>{fmt(score.avg)}</span>
      </span>
    </div>
  );
}

function SystemCard({ system }: { system: System }) {
  const entered = SUBTASKS.filter((s) => system[s.key]);

  return (
    <li
      className={`rounded-lg border border-border p-5 ${
        system.originalTaskParticipant ? "bg-sky-50/80" : ""
      }`}
    >
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h3 className="text-lg font-bold">
          <a
            href={system.paper}
            target="_blank"
            rel="noopener noreferrer"
            title={`Read the ${system.team} system description paper on ACL Anthology`}
            className="text-purple-700 underline decoration-purple-300 underline-offset-2 transition-colors hover:text-purple-900 hover:decoration-purple-600 focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {system.team}
          </a>
        </h3>
        {system.postDeadline && (
          <span className="rounded border border-blue-300 bg-blue-100 px-1.5 py-0.5 text-[10px] font-semibold text-blue-800">
            POST-DEADLINE
          </span>
        )}
        <span className="text-sm text-muted-foreground">{system.authors}</span>
      </div>

      <p className="mt-1 text-sm italic text-muted-foreground">{system.title}</p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {system.backbone.map((b) => (
          <span key={b} className="rounded bg-muted px-2 py-0.5 text-xs font-medium">
            {b}
          </span>
        ))}
        {system.extras?.map((e) => (
          <span key={e} className="rounded border border-amber-300 bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-800">
            + {e}
          </span>
        ))}
      </div>

      <div className="mt-3">
        {entered.map((s) => (
          <ScoreRow key={s.key} subtask={s} score={system[s.key]!} />
        ))}
      </div>

      <p className="mt-3 text-sm leading-relaxed">{system.approach}</p>

      {system.findings && (
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted-foreground">
          {system.findings.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      )}
    </li>
  );
}

export default function ModelDownload() {
  const [query, setQuery] = useState("");
  const [subtaskFilter, setSubtaskFilter] = useState<"all" | SubtaskKey>("all");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const matches = systems.filter((s) => {
      if (subtaskFilter !== "all" && !s[subtaskFilter]) return false;
      if (!q) return true;
      return [s.team, s.authors, s.title, s.approach, ...s.backbone, ...(s.extras ?? [])]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });

    const sortKey: SubtaskKey = subtaskFilter === "all" ? "subtask1" : subtaskFilter;
    return [...matches].sort((a, b) => {
      const av = a[sortKey]?.avg;
      const bv = b[sortKey]?.avg;
      if (av === bv) return a.team.localeCompare(b.team);
      if (av === null || av === undefined) return 1;
      if (bv === null || bv === undefined) return -1;
      return bv - av;
    });
  }, [query, subtaskFilter]);

  return (
    <div className="not-prose">
      <h1 className="text-5xl font-extrabold mb-2">Get Models</h1>
      <hr className="my-4 border-t border-gray-300" />
      <p className="mb-6 text-xl text-muted-foreground">
        Baseline models for SemEval-2026 Task 2, and every participating system with its scores and approach
      </p>

      {/* ── Baselines ── */}
      <h2 className="text-2xl font-bold mb-2">Baseline models</h2>
      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
        The organizers' baselines are published as fitted ridge-regression pickles on Hugging Face, arranged by subtask.
        A dash means the baseline was not run on that subtask.
      </p>

      <a
        href={HUGGINGFACE_REPO}
        target="_blank"
        rel="noopener noreferrer"
        className="mb-6 inline-block rounded-md bg-purple-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-purple-700"
      >
        🤗 View baseline models on Hugging Face
      </a>

      <div className="mb-10 overflow-x-auto rounded-lg border border-border">
        <table className="w-full min-w-[43rem] border-collapse text-sm">
          <thead>
            <tr className="bg-muted/60 text-left">
              <th className="px-3 py-2 font-semibold">Baseline</th>
              {SUBTASKS.map((s) => (
                <th key={s.key} className="px-3 py-2 text-center font-semibold whitespace-nowrap">
                  {s.short}
                </th>
              ))}
              <th className="px-3 py-2 font-semibold">Weights</th>
            </tr>
          </thead>
          <tbody>
            {baselines.map((b) => (
              <tr key={b.name} className="border-t border-border align-top">
                <td className="px-3 py-3">
                  <div className="font-mono font-semibold whitespace-nowrap">{b.name}</div>
                  <p className="mt-1 max-w-[18rem] text-xs leading-relaxed text-muted-foreground">{b.description}</p>
                </td>
                {SUBTASKS.map((s) => {
                  const score = b[s.key];
                  return (
                    <td key={s.key} className="px-3 py-3 text-xs">
                      {score ? (
                        <dl className="space-y-0.5">
                          {(
                            [
                              ["V", score.valence, false],
                              ["A", score.arousal, false],
                              ["avg", score.avg, true],
                            ] as const
                          ).map(([label, value, bold]) => (
                            <div key={label} className="flex justify-between gap-2 whitespace-nowrap">
                              <dt className="text-muted-foreground">{label}</dt>
                              <dd className={`font-mono ${bold ? "font-bold" : ""} ${scoreColor(value)}`}>
                                {fmt(value)}
                              </dd>
                            </div>
                          ))}
                        </dl>
                      ) : (
                        <div className="text-center text-muted-foreground">—</div>
                      )}
                    </td>
                  );
                })}
                <td className="px-3 py-3">
                  <ul className="space-y-0.5 text-xs font-mono text-muted-foreground">
                    {b.files.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Participating systems ── */}
      <h2 className="text-2xl font-bold mb-2">Participating systems</h2>
      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
        All {systems.length} teams that submitted a system description paper. Every system was trained on the same
        EmoVAL dataset; the amber tags mark the extra resources a team brought in beyond it. Subtask 1 is scored with
        composite Pearson correlation (r<sub>composite</sub>), Subtasks 2a and 2b with Pearson r; higher is better for
        all three. Ranks are the official leaderboard positions and exclude baselines and post-deadline submissions.
        Scores and findings are drawn from the task description paper (Soni et al., 2026); each team name links to that
        team's system description paper on the ACL Anthology.
      </p>

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="relative min-w-[16rem] flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search team, author, or approach (e.g. DeBERTa, LSTM, lexicon)"
            className="w-full rounded-md border border-input-border py-2 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div className="flex flex-wrap gap-1.5">
          {(["all", ...SUBTASKS.map((s) => s.key)] as const).map((key) => {
            const label = key === "all" ? "All subtasks" : SUBTASKS.find((s) => s.key === key)!.short;
            const active = subtaskFilter === key;
            return (
              <button
                key={key}
                onClick={() => setSubtaskFilter(key)}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  active ? "bg-purple-600 text-white" : "bg-muted hover:bg-nav-hover"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <p className="mb-4 text-sm text-muted-foreground">
        Showing {visible.length} of {systems.length} systems
        {subtaskFilter !== "all" && `, sorted by ${SUBTASKS.find((s) => s.key === subtaskFilter)!.short} average`}.
      </p>

      <div className="mb-4 flex items-center gap-2 text-xs font-semibold text-muted-foreground">
        <span className="inline-block h-4 w-4 rounded border border-sky-200 bg-sky-50" />
        ORIGINAL TASK PARTICIPANT
      </div>

      {visible.length === 0 ? (
        <p className="rounded-lg border border-border p-6 text-center text-muted-foreground">
          No systems match “{query}”.
        </p>
      ) : (
        <ul className="space-y-4">
          {visible.map((s) => (
            <SystemCard key={s.team} system={s} />
          ))}
        </ul>
      )}
    </div>
  );
}
