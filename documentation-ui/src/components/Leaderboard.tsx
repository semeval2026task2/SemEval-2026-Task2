import { useState, useEffect, useRef, useCallback } from "react";
import { Upload } from "lucide-react";
import { parseWorkbook, ParsedSheet, ParsedTable, ColDef, RowData } from "../hooks/useLeaderboard";
import { systems } from "@/data/systems";

const GOOGLE_SHEET_PREVIEW_URL =
  "https://docs.google.com/spreadsheets/d/12qG8JXyN3Ulra8vS-FGL717J_FovKiLrjEXPDCB8ApQ/preview?rm=minimal&widget=true&headers=false";

const normalizeTeamName = (name: string) => name.toLowerCase().replace(/[^a-z0-9]/g, "");

const ORIGINAL_TASK_TEAMS = new Set(
  [
    ...systems.filter((system) => system.originalTaskParticipant).map((system) => system.team),
    // Names used in the original leaderboard that differ from system-paper team names.
    "YNU",
    "Student Of University Information Of Technology",
    "mcmaster4z03",
  ].map(normalizeTeamName)
);

/* ── Color scale ── */
function getColor(value: number, min: number, max: number, higherIsBetter: boolean): string {
  if (max === min) return "";
  const t = (value - min) / (max - min);
  const norm = higherIsBetter ? t : 1 - t;
  const r = norm < 0.5 ? 255 : Math.round(255 * (1 - (norm - 0.5) * 2));
  const g = norm > 0.5 ? 255 : Math.round(255 * norm * 2);
  return `rgba(${r},${g},80,0.28)`;
}

function colRange(rows: RowData[], key: string) {
  const vals = rows.map((r) => r[key]).filter((v): v is number => typeof v === "number" && isFinite(v));
  if (!vals.length) return { min: 0, max: 0 };
  return { min: Math.min(...vals), max: Math.max(...vals) };
}

/* ── Tag badge ── */
const TAG_COLORS: Record<string, string> = {
  WITHDRAWN:    "bg-yellow-100 text-yellow-800 border-yellow-300",
  DISQUALIFIED: "bg-red-100 text-red-800 border-red-300",
  BASELINE:     "bg-gray-100 text-gray-600 border-gray-300",
  "POST-DEADLINE": "bg-blue-100 text-blue-800 border-blue-300",
};

function TagBadge({ tag }: { tag?: string }) {
  if (!tag) return null;
  return (
    <span className={`ml-2 text-[10px] font-semibold px-1.5 py-0.5 rounded border whitespace-nowrap ${TAG_COLORS[tag] ?? "bg-gray-100 text-gray-600 border-gray-300"}`}>
      {tag}
    </span>
  );
}

/* ── Single table ── */
function DataTable({ table }: { table: ParsedTable }) {
  const { columns, rows, headerGroups } = table;
  const numCols = columns.filter((c) => c.key !== "team");
  const ranges = Object.fromEntries(numCols.map((c) => [c.key, colRange(rows, c.key)]));
  const hasGroups = headerGroups.length > 0;

  return (
  <div className="mb-6">
    {table.title && (
      <div className="px-4 py-2 bg-muted/50 border border-b-0 border-border rounded-t-lg font-semibold text-sm">
        {table.title}
      </div>
    )}
    {/* ↓ scroll wrapper wraps the table */}
    <div
      className="overflow-x-auto rounded-lg border border-border"
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      <table
        className="text-sm border-collapse"
        style={{ minWidth: "max-content", width: "100%" }}
        >
        <thead>
          {hasGroups && (
            <tr className="bg-muted/80">
              <th className="px-3 py-1.5 text-left" />
              {headerGroups.map((g, i) => (
                <th
                  key={i}
                  colSpan={g.span}
                  className="px-3 py-1.5 text-center font-semibold text-xs uppercase tracking-wide border-l border-border"
                >
                  {g.label}
                </th>
              ))}
            </tr>
          )}
          <tr className="bg-muted/60">
            <th className="px-3 py-2 text-left font-semibold text-xs uppercase tracking-wide whitespace-nowrap sticky left-0 bg-muted/60 z-10">
              Team
            </th>
            {numCols.map((c, i) => (
              <th
                key={c.key}
                className={`px-3 py-2 text-center font-semibold text-xs uppercase tracking-wide whitespace-nowrap
                  ${hasGroups && i === 0 ? "border-l border-border" : ""}`}
              >
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => {
            const tag = row._tag as string | undefined;
            const teamName = String(row.team ?? "");
            const isBaseline =
              tag === "BASELINE" ||
              teamName.startsWith("linear") ||
              teamName === "rand";
            const isDimmed = tag === "WITHDRAWN" || tag === "DISQUALIFIED";
            const isOriginalTaskParticipant =
              !isBaseline && ORIGINAL_TASK_TEAMS.has(normalizeTeamName(teamName));

            return (
              <tr
                key={ri}
                className={`border-t border-border transition-colors
                  ${isDimmed ? "opacity-40" : ""}
                  ${isBaseline ? "bg-muted/30 italic" : "hover:bg-muted/30"}
                  ${isOriginalTaskParticipant ? "bg-sky-50/80" : ""}
                `}
              >
                <td
                  className={`px-3 py-2 font-medium whitespace-nowrap sticky left-0 z-10 ${
                    isOriginalTaskParticipant ? "bg-sky-50" : "bg-background"
                  }`}
                >
                  <span>{teamName}</span>
                  <TagBadge tag={tag} />
                </td>
                {numCols.map((c) => {
                  const v = row[c.key];
                  if (v === null || v === undefined) {
                    return (
                      <td key={c.key} className="px-3 py-2 text-center text-muted-foreground text-xs">
                        —
                      </td>
                    );
                  }
                  const { min, max } = ranges[c.key];
                  const bg = getColor(v as number, min, max, c.higherIsBetter);
                  return (
                    <td
                      key={c.key}
                      className="px-3 py-2 text-center tabular-nums text-sm"
                      style={{ backgroundColor: bg }}
                    >
                      {(v as number).toFixed(3)}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    </div>
  );
}

/* ── Upload placeholder ── */
function UploadPrompt({ onFile }: { onFile: (f: File) => void }) {
  const ref = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handle = useCallback(
    (f: File) => {
      if (f.name.endsWith(".xlsx") || f.name.endsWith(".xls")) onFile(f);
    },
    [onFile]
  );

  return (
    <div
      className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-16 cursor-pointer transition-colors
        ${dragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}
      onClick={() => ref.current?.click()}
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f) handle(f); }}
    >
      <Upload className="w-10 h-10 text-muted-foreground mb-4" />
      <p className="font-semibold text-lg mb-1">Drop your leaderboard .xlsx here</p>
      <p className="text-muted-foreground text-sm">or click to browse</p>
      <input
        ref={ref}
        type="file"
        accept=".xlsx,.xls"
        className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handle(f); }}
      />
    </div>
  );
}

/* ── Main component ── */
// Replace the useState/handleFile section at the top of the component with:

export default function Leaderboard() {
  const [sheets, setSheets] = useState<ParsedSheet[]>([]);
  const [activeSheet, setActiveSheet] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const base = import.meta.env.BASE_URL.replace(/\/$/, ""); // strips trailing slash
    fetch(`${base}/SemEval2026_Task2_Scores_Leaderboard.xlsx`)
        .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.arrayBuffer();
        })
        .then((buf) => {
        const parsed = parseWorkbook(buf);
        setSheets(parsed.filter((s) => s.tables.length > 0));
        setActiveSheet(0);
        })
        .catch((err) => setError("Failed to load leaderboard data: " + err.message))
        .finally(() => setLoading(false));
    }, []);

  // remove the handleFile callback and fileName state entirely

  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-5xl font-bold">Leaderboard</h1>
        <p className="text-sm text-muted-foreground mt-2">
          Teams from the original SemEval-2026 shared task are labeled below. New scores may be added as the community
          continues working on EmoVAL.
        </p>
      </div>

      {loading && (
        <div className="flex items-center gap-3 text-muted-foreground py-12 justify-center">
          <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
          </svg>
          Loading leaderboard...
        </div>
      )}

      {error && (
        <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}

      {!loading && sheets.length > 0 && (
        <>
          {/* Sheet tabs */}
          <div className="flex gap-1 overflow-x-auto pb-2 mb-6 border-b border-border">
            {sheets.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setActiveSheet(i)}
                className={`px-4 py-2 rounded-t-lg text-sm font-medium whitespace-nowrap transition-colors
                  ${activeSheet === i
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {sheets[activeSheet]?.tables.map((table, ti) => (
            <DataTable key={ti} table={table} />
          ))}

          {/* Legend */}
          <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground flex-wrap">
            <div className="flex items-center gap-1.5">
              <span className="inline-block w-4 h-4 rounded" style={{ background: "rgba(0,255,80,0.28)" }} />
              Best score
            </div>
            <div className="flex items-center gap-1.5">
              <span className="inline-block w-4 h-4 rounded" style={{ background: "rgba(255,0,80,0.28)" }} />
              Worst score
            </div>
            <div className="flex items-center gap-1.5">
              <span className="italic text-muted-foreground">Italic</span> = Baseline
            </div>
            <div className="flex items-center gap-1.5">
              <TagBadge tag="WITHDRAWN" />
              <TagBadge tag="DISQUALIFIED" />
              <TagBadge tag="POST-DEADLINE" />
            </div>
            <div className="flex items-center gap-1.5 font-semibold">
              <span className="inline-block h-4 w-4 rounded border border-sky-200 bg-sky-50" />
              ORIGINAL TASK PARTICIPANT
            </div>
          </div>
        </>
      )}

      <section className="mt-10">
        <div className="mb-3">
          <h2 className="text-2xl font-bold">Detailed metrics spreadsheet</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Browse the complete leaderboard and its detailed metric tabs in this read-only view.
          </p>
        </div>
        <div className="overflow-hidden rounded-xl border border-border bg-white shadow-sm">
          <iframe
            src={GOOGLE_SHEET_PREVIEW_URL}
            title="EmoVAL detailed leaderboard metrics"
            loading="lazy"
            className="h-[70vh] min-h-[560px] w-full"
          />
        </div>
      </section>
    </div>
  );
}