import * as XLSX from "xlsx";

export type CellValue = string | number | null;
export type RowData = Record<string, CellValue> & { _tag?: string };

export interface ColDef {
  key: string;
  label: string;
  higherIsBetter: boolean;
}

export interface HeaderGroup {
  label: string;
  span: number;
}

export interface ParsedTable {
  title: string;
  headerGroups: HeaderGroup[];
  columns: ColDef[];
  rows: RowData[];
}

export interface ParsedSheet {
  id: string;
  label: string;
  tables: ParsedTable[];
}

/* ── utils ── */
function parseNum(v: CellValue): number | null {
  if (v === null || v === undefined || v === "" || v === "-") return null;
  // strip trailing backslash, asterisks, superscripts that xlsx may keep
  const cleaned = String(v).replace(/[\\*⁺]/g, "").trim();
  const n = Number(cleaned);
  return isFinite(n) ? n : null;
}

function isTag(s: string): string {
  const t = s.trim().toUpperCase();
  if (t === "WITHDRAWN" || t === "WITHDRWAN") return "WITHDRAWN";
  if (t === "DISQUALIFIED") return "DISQUALIFIED";
  if (t === "POST-DEADLINE") return "POST-DEADLINE";
  if (t === "BASELINE") return "BASELINE";
  return "";
}

function higherIsBetter(label: string): boolean {
  const l = label.toLowerCase();
  return !l.includes("⬇") && !l.startsWith("mae");
}

/* ── main entry ── */
export function parseWorkbook(buffer: ArrayBuffer): ParsedSheet[] {
  const wb = XLSX.read(buffer, { type: "array", cellText: false, cellDates: false });
  return wb.SheetNames.map((name) => parseSheet(wb, name)).filter(
    (s) => s.tables.length > 0
  );
}

function parseSheet(wb: XLSX.WorkBook, sheetName: string): ParsedSheet {
  const ws = wb.Sheets[sheetName];

  const raw = XLSX.utils.sheet_to_json<CellValue[]>(ws, {
    header: 1,
    defval: null,
    blankrows: true,
    raw: true,
  }) as CellValue[][];

  const tables = extractTables(raw);

  return {
    id: sheetName.replace(/\s+/g, "_").toLowerCase(),
    label: sheetName,
    tables,
  };
}

/* split sheet into logical tables separated by blank rows or "Table N:" captions */
function extractTables(raw: CellValue[][]): ParsedTable[] {
  const chunks: { title: string; rows: CellValue[][] }[] = [];
  let current: CellValue[][] = [];
  let pendingTitle = "";

  for (const row of raw) {
    const nonNull = row.filter((c) => c !== null && c !== "");

    // completely blank row → flush
    if (nonNull.length === 0) {
      if (current.length > 0) {
        chunks.push({ title: pendingTitle, rows: current });
        current = [];
        pendingTitle = "";
      }
      continue;
    }

    // single cell that looks like a caption → treat as title for next chunk
    if (
      nonNull.length === 1 &&
      typeof nonNull[0] === "string" &&
      (String(nonNull[0]).startsWith("Table") ||
        String(nonNull[0]).startsWith(",Table"))
    ) {
      if (current.length > 0) {
        chunks.push({ title: pendingTitle, rows: current });
        current = [];
      }
      pendingTitle = String(nonNull[0]).replace(/^,/, "").split("\\n")[0].trim();
      continue;
    }

    current.push(row);
  }
  if (current.length > 0) chunks.push({ title: pendingTitle, rows: current });

  return chunks.flatMap(({ title, rows }) => buildTable(title, rows)).filter(
    (t) => t.rows.length > 0
  );
}

function buildTable(title: string, rows: CellValue[][]): ParsedTable[] {
  if (rows.length < 2) return [];

  // find the "Team" header row
  const teamRowIdx = rows.findIndex(
    (r) => r.some((c) => String(c ?? "").trim().toLowerCase() === "team")
  );
  if (teamRowIdx === -1) return [];

  const teamRow = rows[teamRowIdx];
  const dataRows = rows.slice(teamRowIdx + 1);

  // row before teamRow might be a group-header row
  let headerGroups: HeaderGroup[] = [];
  if (teamRowIdx > 0) {
    const groupRow = rows[teamRowIdx - 1];
    headerGroups = buildHeaderGroups(groupRow, teamRow);
  }

  // derive title from the row before group row (if any)
  let resolvedTitle = title;
  if (!resolvedTitle && teamRowIdx >= 2) {
    const candidate = rows[teamRowIdx - 2].filter((c) => c !== null && c !== "");
    if (candidate.length === 1) resolvedTitle = String(candidate[0]).trim();
  }
  if (!resolvedTitle && teamRowIdx >= 1 && headerGroups.length === 0) {
    const candidate = rows[teamRowIdx - 1].filter((c) => c !== null && c !== "");
    if (candidate.length === 1) resolvedTitle = String(candidate[0]).trim();
  }

  // build column defs from Team row
  const cols = buildColDefs(teamRow);

  // parse data rows
  const parsed: RowData[] = [];
  for (const row of dataRows) {
    if (!row || row.every((c) => c === null || c === "")) continue;

    // skip caption / footnote rows
    const firstCell = String(row[0] ?? "").trim();
    if (firstCell.startsWith("Table") || firstCell.startsWith("*") || firstCell.startsWith(",Table"))
      continue;

    const obj: RowData = {};
    let tag = "";

    // check last non-null cell for a tag
    const lastNonNullIdx = row.reduce(
      (acc, c, i) => (c !== null && c !== "" ? i : acc),
      -1
    );
    if (lastNonNullIdx >= 0) {
      const lastCell = String(row[lastNonNullIdx] ?? "").trim();
      const t = isTag(lastCell);
      if (t) {
        tag = t;
      }
    }

    cols.forEach((col, ci) => {
      const raw = row[ci] ?? null;
      if (col.key === "team") {
        obj.team = String(raw ?? "").replace(/[\\*⁺]/g, "").trim();
      } else {
        obj[col.key] = parseNum(raw);
      }
    });

    if (tag) obj._tag = tag;

    const teamVal = String(obj.team ?? "").trim();
    if (teamVal && teamVal !== "-" && teamVal !== "") {
      parsed.push(obj);
    }
  }

  return [
    {
      title: resolvedTitle,
      headerGroups,
      columns: cols,
      rows: parsed,
    },
  ];
}

function buildHeaderGroups(groupRow: CellValue[], colRow: CellValue[]): HeaderGroup[] {
  const groups: HeaderGroup[] = [];
  let label = "";
  let span = 0;

  for (let i = 1; i < colRow.length; i++) {
    if (colRow[i] === null || colRow[i] === "") continue;
    const g = String(groupRow[i] ?? "").trim();
    if (g && g !== label) {
      if (label) groups.push({ label, span });
      label = g;
      span = 1;
    } else {
      span++;
    }
  }
  if (label) groups.push({ label, span });
  return groups;
}

function buildColDefs(colRow: CellValue[]): ColDef[] {
  const cols: ColDef[] = [];
  for (let i = 0; i < colRow.length; i++) {
    const raw = String(colRow[i] ?? "").trim();
    if (raw === "" && i > 0) continue;
    if (i === 0) {
      cols.push({ key: "team", label: "Team", higherIsBetter: true });
    } else {
      const key = `c${i}_${raw.replace(/[^a-zA-Z0-9]/g, "_").slice(0, 20)}`;
      cols.push({ key, label: raw, higherIsBetter: higherIsBetter(raw) });
    }
  }
  return cols;
}