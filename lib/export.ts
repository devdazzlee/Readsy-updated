// Lightweight, dependency-free CSV/Excel + PDF export helpers for the admin
// dashboard tables. CSV opens cleanly in Excel/Sheets; PDF export uses the
// browser's native print dialog ("Save as PDF") against a clean, isolated
// printable table so we don't need to ship a PDF-generation library.

export type ExportColumn<T> = {
  header: string;
  value: (row: T) => string | number | null | undefined;
};

function csvCell(value: string | number | null | undefined): string {
  const str = value === null || value === undefined ? "" : String(value);
  if (/[",\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export function exportToCsv<T>(
  filename: string,
  columns: ExportColumn<T>[],
  rows: T[],
) {
  if (typeof window === "undefined") return;

  const lines = [
    columns.map((c) => csvCell(c.header)).join(","),
    ...rows.map((row) => columns.map((c) => csvCell(c.value(row))).join(",")),
  ];
  // Leading BOM keeps accented characters intact when Excel opens the file.
  const csv = "﻿" + lines.join("\r\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename.endsWith(".csv") ? filename : `${filename}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function exportToPdf<T>(
  title: string,
  columns: ExportColumn<T>[],
  rows: T[],
) {
  if (typeof window === "undefined") return;

  const win = window.open("", "_blank", "width=1000,height=800");
  if (!win) {
    window.alert("Please allow pop-ups to export as PDF.");
    return;
  }

  const head = columns.map((c) => `<th>${escapeHtml(c.header)}</th>`).join("");
  const body = rows
    .map((row) => {
      const cells = columns
        .map((c) => {
          const value = c.value(row);
          return `<td>${escapeHtml(value === null || value === undefined ? "" : String(value))}</td>`;
        })
        .join("");
      return `<tr>${cells}</tr>`;
    })
    .join("");

  win.document.write(`<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<title>${escapeHtml(title)}</title>
<style>
  * { box-sizing: border-box; }
  body { font-family: -apple-system, "Segoe UI", Arial, sans-serif; color: #141d29; padding: 32px; }
  h1 { font-size: 18px; margin: 0 0 4px; }
  p.meta { font-size: 11px; color: #5a6b7d; margin: 0 0 20px; }
  table { width: 100%; border-collapse: collapse; font-size: 11px; }
  th, td { border: 1px solid #d5e2ee; padding: 6px 8px; text-align: left; vertical-align: top; }
  th { background: #f3f7fb; text-transform: uppercase; letter-spacing: 0.04em; font-size: 9px; color: #5a6b7d; }
  tr:nth-child(even) td { background: #fafcfe; }
  @media print {
    body { padding: 0; }
  }
</style>
</head>
<body>
  <h1>${escapeHtml(title)}</h1>
  <p class="meta">The Readsy Publishers &middot; exported ${escapeHtml(new Date().toLocaleString())} &middot; ${rows.length} record${rows.length === 1 ? "" : "s"}</p>
  <table>
    <thead><tr>${head}</tr></thead>
    <tbody>${body}</tbody>
  </table>
</body>
</html>`);
  win.document.close();
  win.focus();

  // Give the new document a beat to finish rendering before invoking print.
  setTimeout(() => {
    win.print();
  }, 300);
}
