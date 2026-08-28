"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  FileSpreadsheet,
  FileText,
  Lightbulb,
  Loader2,
  Lock,
  Mail,
  Map as MapIcon,
  MessageSquare,
  Phone,
  Sparkles,
  Users,
  Wand2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "./AuthProvider";
import { ChatMarkdown } from "./ChatMarkdown";
import {
  useGetAdminBlueprintQuery,
  useGetAdminChatDetailQuery,
  useGetAdminChatsQuery,
  useGetAdminConciergeQuery,
  useGetAdminCoverRequestsQuery,
  useGetAdminLeadsQuery,
  useGetAdminOverviewQuery,
} from "@/lib/store/api";
import { exportToCsv, exportToPdf, type ExportColumn } from "@/lib/export";
import { cn } from "@/lib/utils";
import type { RTKQueryError } from "@/lib/rtkQueryError";
import { errorMessage } from "@/lib/rtkQueryError";

const TABS = [
  { key: "leads", label: "Quote Leads" },
  { key: "covers", label: "Cover Generator" },
  { key: "concierge", label: "AI Concierge" },
  { key: "blueprint", label: "AI Blueprint" },
  { key: "chats", label: "Chat Sessions" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

function formatDate(iso: string) {
  return new Date(iso).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function DashboardPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-sky" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky to-sky-bright text-white">
          <Lock className="h-6 w-6" strokeWidth={1.75} />
        </span>
        <h1 className="font-display text-2xl font-bold text-navy">
          Sign in required
        </h1>
        <p className="max-w-sm text-sm text-text-muted">
          This dashboard is only visible to The Readsy Publishers admin team.
        </p>
        <Link href="/login?next=/dashboard">
          <Button>Log In</Button>
        </Link>
      </div>
    );
  }

  if (!user.isAdmin) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy text-white">
          <Lock className="h-6 w-6" strokeWidth={1.75} />
        </span>
        <h1 className="font-display text-2xl font-bold text-navy">
          Admin access only
        </h1>
        <p className="max-w-sm text-sm text-text-muted">
          Your account ({user.email}) doesn&apos;t have dashboard access.
        </p>
      </div>
    );
  }

  return <DashboardShell />;
}

function DashboardShell() {
  const [tab, setTab] = useState<TabKey>("leads");
  const { data: overview, error: overviewError } = useGetAdminOverviewQuery();

  return (
    <section className="relative min-h-[80vh] overflow-hidden bg-[#f3f6f9] py-12">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 12% 0%, rgba(29,169,224,0.14), transparent 36%), linear-gradient(180deg, #ffffff 0%, #f3f6f9 100%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky">
              Admin
            </p>
            <h1 className="mt-1 font-display text-3xl font-bold tracking-tight text-navy">
              Leads Dashboard
            </h1>
          </div>
        </div>

        {overviewError ? (
          <p className="mt-4 text-sm text-red-600">
            {errorMessage(overviewError as RTKQueryError, "Could not load overview")}
          </p>
        ) : null}

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <StatCard icon={Mail} label="Quote Leads" value={overview?.counts.leads} />
          <StatCard icon={Wand2} label="Cover Requests" value={overview?.counts.coverRequests} />
          <StatCard icon={Lightbulb} label="AI Concierge" value={overview?.counts.conciergeRequests} />
          <StatCard icon={MapIcon} label="AI Blueprint" value={overview?.counts.blueprintRequests} />
          <StatCard icon={MessageSquare} label="Chat Sessions" value={overview?.counts.chatSessions} />
          <StatCard icon={Users} label="Accounts" value={overview?.counts.users} />
        </div>

        <div className="no-scrollbar -mx-4 mt-8 flex gap-2 overflow-x-auto border-b border-muted-border px-4 pb-3 sm:mx-0 sm:flex-wrap sm:px-0">
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className={cn(
                "shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition",
                tab === t.key
                  ? "bg-navy text-white"
                  : "border border-muted-border bg-white text-text-muted hover:border-sky/40 hover:text-navy",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-6">
          {tab === "leads" ? <LeadsTab /> : null}
          {tab === "covers" ? <CoversTab /> : null}
          {tab === "concierge" ? <ConciergeTab /> : null}
          {tab === "blueprint" ? <BlueprintTab /> : null}
          {tab === "chats" ? <ChatsTab /> : null}
        </div>
      </div>
    </section>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Mail;
  label: string;
  value?: number;
}) {
  return (
    <div className="rounded-2xl border border-muted-border bg-white p-4 shadow-[0_18px_40px_-32px_rgba(11,31,58,0.35)]">
      <Icon className="h-4 w-4 text-sky" strokeWidth={1.75} />
      <p className="mt-2 font-display text-2xl font-bold text-navy">
        {value ?? "–"}
      </p>
      <p className="text-xs text-text-muted">{label}</p>
    </div>
  );
}

function ExportButtons<T>({
  filename,
  title,
  columns,
  rows,
}: {
  filename: string;
  title: string;
  columns: ExportColumn<T>[];
  rows: T[];
}) {
  const disabled = rows.length === 0;
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        disabled={disabled}
        onClick={() => exportToCsv(filename, columns, rows)}
        className="inline-flex items-center gap-1.5 rounded-full border border-muted-border bg-white px-3.5 py-2 text-xs font-semibold text-navy transition hover:border-sky/40 hover:text-sky disabled:cursor-not-allowed disabled:opacity-40"
      >
        <FileSpreadsheet className="h-3.5 w-3.5" strokeWidth={1.75} />
        Export Excel
      </button>
      <button
        type="button"
        disabled={disabled}
        onClick={() => exportToPdf(title, columns, rows)}
        className="inline-flex items-center gap-1.5 rounded-full border border-muted-border bg-white px-3.5 py-2 text-xs font-semibold text-navy transition hover:border-sky/40 hover:text-sky disabled:cursor-not-allowed disabled:opacity-40"
      >
        <FileText className="h-3.5 w-3.5" strokeWidth={1.75} />
        Export PDF
      </button>
    </div>
  );
}

// Loading/error/empty gate shared by every tab. Renders nothing (null) once
// there's real data to show — the caller then renders the table (desktop)
// and card list (mobile) itself.
function DataState({
  loading,
  error,
  empty,
}: {
  loading: boolean;
  error: string;
  empty: boolean;
}) {
  if (loading) {
    return (
      <div className="flex h-40 items-center justify-center rounded-2xl border border-muted-border bg-white">
        <Loader2 className="h-5 w-5 animate-spin text-sky" />
      </div>
    );
  }
  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-600">
        {error}
      </div>
    );
  }
  if (empty) {
    return (
      <div className="flex h-40 flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-muted-border bg-white text-center">
        <Sparkles className="h-5 w-5 text-text-muted" strokeWidth={1.5} />
        <p className="text-sm text-text-muted">Nothing here yet.</p>
      </div>
    );
  }
  return null;
}

// Desktop-only table wrapper (below md, the same data renders as cards instead).
function TableCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="hidden overflow-x-auto rounded-2xl border border-muted-border bg-white shadow-[0_18px_40px_-32px_rgba(11,31,58,0.35)] md:block">
      <table className="w-full min-w-[720px] text-left text-sm">{children}</table>
    </div>
  );
}

// Mobile-only stacked cards — same data as the table, one card per row.
function CardList({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-3 md:hidden">{children}</div>;
}

function MobileCard({
  children,
  onClick,
  header,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  header?: React.ReactNode;
}) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "rounded-2xl border border-muted-border bg-white p-4 shadow-[0_18px_40px_-32px_rgba(11,31,58,0.35)]",
        onClick && "cursor-pointer transition active:scale-[0.99] active:bg-sky-soft/20",
      )}
    >
      {header ? <div className="mb-3 flex items-start justify-between gap-3">{header}</div> : null}
      <div className="space-y-2.5">{children}</div>
    </div>
  );
}

function MobileField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-3 text-sm">
      <span className="shrink-0 text-[11px] font-semibold uppercase tracking-wide text-text-muted">
        {label}
      </span>
      <span className="text-right text-navy">{children}</span>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="border-b border-muted-border bg-muted/50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-text-muted">
      {children}
    </th>
  );
}

function Td({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <td className={cn("border-b border-muted-border px-4 py-3 align-top text-navy", className)}>
      {children}
    </td>
  );
}

function LeadsTab() {
  const { data, isLoading, error } = useGetAdminLeadsQuery();
  const items = data?.items ?? [];

  const columns: ExportColumn<(typeof items)[number]>[] = [
    { header: "Date", value: (l) => formatDate(l.createdAt) },
    { header: "Name", value: (l) => l.name },
    { header: "Email", value: (l) => l.email },
    { header: "Phone", value: (l) => l.phone },
    { header: "Source", value: (l) => l.source },
    { header: "Project", value: (l) => l.project || "" },
  ];

  const hasData = !isLoading && !error && items.length > 0;

  return (
    <>
      <div className="mb-3 flex justify-end">
        <ExportButtons filename="readsy-quote-leads" title="Quote Leads" columns={columns} rows={items} />
      </div>
      <DataState loading={isLoading} error={errorMessage(error as RTKQueryError)} empty={items.length === 0} />
      {hasData ? (
        <>
          <TableCard>
            <thead>
              <tr>
                <Th>Date</Th>
                <Th>Name</Th>
                <Th>Contact</Th>
                <Th>Source</Th>
                <Th>Project</Th>
              </tr>
            </thead>
            <tbody>
              {items.map((lead) => (
                <tr key={lead.id} className="hover:bg-sky-soft/30">
                  <Td className="whitespace-nowrap text-xs text-text-muted">
                    {formatDate(lead.createdAt)}
                  </Td>
                  <Td className="font-semibold">{lead.name}</Td>
                  <Td>
                    <div className="flex flex-col gap-0.5 text-xs">
                      <a href={`mailto:${lead.email}`} className="text-sky hover:text-sky-bright">
                        {lead.email}
                      </a>
                      <a href={`tel:${lead.phone}`} className="text-text-muted hover:text-navy">
                        {lead.phone}
                      </a>
                    </div>
                  </Td>
                  <Td>
                    <span className="rounded-full bg-sky-soft px-2.5 py-1 text-[11px] font-semibold text-sky">
                      {lead.source}
                    </span>
                  </Td>
                  <Td className="max-w-xs">
                    <p className="line-clamp-2 text-xs text-text-muted">
                      {lead.project || "—"}
                    </p>
                  </Td>
                </tr>
              ))}
            </tbody>
          </TableCard>

          <CardList>
            {items.map((lead) => (
              <MobileCard
                key={lead.id}
                header={
                  <>
                    <p className="font-semibold text-navy">{lead.name}</p>
                    <span className="shrink-0 rounded-full bg-sky-soft px-2.5 py-1 text-[11px] font-semibold text-sky">
                      {lead.source}
                    </span>
                  </>
                }
              >
                <MobileField label="Date">{formatDate(lead.createdAt)}</MobileField>
                <MobileField label="Email">
                  <a href={`mailto:${lead.email}`} className="text-sky hover:text-sky-bright">
                    {lead.email}
                  </a>
                </MobileField>
                <MobileField label="Phone">
                  <a href={`tel:${lead.phone}`} className="hover:text-sky">
                    {lead.phone}
                  </a>
                </MobileField>
                {lead.project ? (
                  <div className="border-t border-muted-border pt-2.5 text-sm text-text-muted">
                    {lead.project}
                  </div>
                ) : null}
              </MobileCard>
            ))}
          </CardList>
        </>
      ) : null}
    </>
  );
}

function CoversTab() {
  const { data, isLoading, error } = useGetAdminCoverRequestsQuery();
  const items = data?.items ?? [];

  const columns: ExportColumn<(typeof items)[number]>[] = [
    { header: "Date", value: (i) => formatDate(i.createdAt) },
    { header: "Account Name", value: (i) => i.user.name },
    { header: "Account Email", value: (i) => i.user.email },
    { header: "Book Title", value: (i) => i.title },
    { header: "Author", value: (i) => i.author || "" },
    { header: "Genre", value: (i) => i.genre },
    { header: "Style", value: (i) => i.style },
    { header: "Images", value: (i) => i.imageCount },
  ];

  const hasData = !isLoading && !error && items.length > 0;

  return (
    <>
      <div className="mb-3 flex justify-end">
        <ExportButtons filename="readsy-cover-requests" title="Cover Generator Requests" columns={columns} rows={items} />
      </div>
      <DataState loading={isLoading} error={errorMessage(error as RTKQueryError)} empty={items.length === 0} />
      {hasData ? (
        <>
          <TableCard>
            <thead>
              <tr>
                <Th>Date</Th>
                <Th>Account</Th>
                <Th>Book</Th>
                <Th>Genre / Style</Th>
                <Th>Images</Th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-sky-soft/30">
                  <Td className="whitespace-nowrap text-xs text-text-muted">
                    {formatDate(item.createdAt)}
                  </Td>
                  <Td>
                    <p className="font-semibold">{item.user.name}</p>
                    <a
                      href={`mailto:${item.user.email}`}
                      className="text-xs text-sky hover:text-sky-bright"
                    >
                      {item.user.email}
                    </a>
                  </Td>
                  <Td>
                    <p className="font-semibold">{item.title}</p>
                    {item.author ? (
                      <p className="text-xs text-text-muted">by {item.author}</p>
                    ) : null}
                  </Td>
                  <Td className="text-xs text-text-muted">
                    {item.genre} · {item.style}
                  </Td>
                  <Td className="text-xs">{item.imageCount}</Td>
                </tr>
              ))}
            </tbody>
          </TableCard>

          <CardList>
            {items.map((item) => (
              <MobileCard
                key={item.id}
                header={
                  <>
                    <p className="font-semibold text-navy">{item.title}</p>
                    <span className="shrink-0 text-[11px] text-text-muted">{item.imageCount} images</span>
                  </>
                }
              >
                {item.author ? <MobileField label="Author">{item.author}</MobileField> : null}
                <MobileField label="Genre / Style">
                  {item.genre} · {item.style}
                </MobileField>
                <MobileField label="Date">{formatDate(item.createdAt)}</MobileField>
                <div className="border-t border-muted-border pt-2.5">
                  <p className="font-semibold text-navy">{item.user.name}</p>
                  <a
                    href={`mailto:${item.user.email}`}
                    className="text-xs text-sky hover:text-sky-bright"
                  >
                    {item.user.email}
                  </a>
                </div>
              </MobileCard>
            ))}
          </CardList>
        </>
      ) : null}
    </>
  );
}

function ConciergeTab() {
  const { data, isLoading, error } = useGetAdminConciergeQuery();
  const items = data?.items ?? [];

  const columns: ExportColumn<(typeof items)[number]>[] = [
    { header: "Date", value: (i) => formatDate(i.createdAt) },
    { header: "Genre", value: (i) => i.genre },
    { header: "Idea", value: (i) => i.idea },
    { header: "Analysis", value: (i) => i.analysis || "" },
  ];

  return (
    <>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-text-muted">
          Anonymous usage of the free AI Book Concierge tool — no contact info
          is collected here unless the visitor separately submits a quote.
        </p>
        <ExportButtons filename="readsy-ai-concierge" title="AI Book Concierge Requests" columns={columns} rows={items} />
      </div>
      <DataState loading={isLoading} error={errorMessage(error as RTKQueryError)} empty={items.length === 0} />
      {!isLoading && !error && items.length > 0 ? (
        <>
          <TableCard>
            <thead>
              <tr>
                <Th>Date</Th>
                <Th>Genre</Th>
                <Th>Idea</Th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-sky-soft/30">
                  <Td className="whitespace-nowrap text-xs text-text-muted">
                    {formatDate(item.createdAt)}
                  </Td>
                  <Td>
                    <span className="rounded-full bg-sky-soft px-2.5 py-1 text-[11px] font-semibold text-sky">
                      {item.genre}
                    </span>
                  </Td>
                  <Td className="max-w-md">
                    <p className="line-clamp-2 text-xs text-text-muted">{item.idea}</p>
                  </Td>
                </tr>
              ))}
            </tbody>
          </TableCard>

          <CardList>
            {items.map((item) => (
              <MobileCard
                key={item.id}
                header={
                  <>
                    <span className="rounded-full bg-sky-soft px-2.5 py-1 text-[11px] font-semibold text-sky">
                      {item.genre}
                    </span>
                    <span className="shrink-0 text-[11px] text-text-muted">{formatDate(item.createdAt)}</span>
                  </>
                }
              >
                <p className="text-sm text-navy">{item.idea}</p>
              </MobileCard>
            ))}
          </CardList>
        </>
      ) : null}
    </>
  );
}

function BlueprintTab() {
  const { data, isLoading, error } = useGetAdminBlueprintQuery();
  const items = data?.items ?? [];

  const columns: ExportColumn<(typeof items)[number]>[] = [
    { header: "Date", value: (i) => formatDate(i.createdAt) },
    { header: "Genre", value: (i) => i.genre },
    { header: "Goal", value: (i) => i.goal },
    { header: "Tone", value: (i) => i.tone },
    { header: "Idea", value: (i) => i.idea },
    { header: "Blueprint", value: (i) => i.blueprint || "" },
  ];

  return (
    <>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-text-muted">
          Anonymous usage of the free AI Book Blueprint tool.
        </p>
        <ExportButtons filename="readsy-ai-blueprint" title="AI Book Blueprint Requests" columns={columns} rows={items} />
      </div>
      <DataState loading={isLoading} error={errorMessage(error as RTKQueryError)} empty={items.length === 0} />
      {!isLoading && !error && items.length > 0 ? (
        <>
          <TableCard>
            <thead>
              <tr>
                <Th>Date</Th>
                <Th>Genre</Th>
                <Th>Goal</Th>
                <Th>Idea</Th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-sky-soft/30">
                  <Td className="whitespace-nowrap text-xs text-text-muted">
                    {formatDate(item.createdAt)}
                  </Td>
                  <Td>
                    <span className="rounded-full bg-sky-soft px-2.5 py-1 text-[11px] font-semibold text-sky">
                      {item.genre}
                    </span>
                  </Td>
                  <Td className="text-xs text-text-muted">{item.goal}</Td>
                  <Td className="max-w-sm">
                    <p className="line-clamp-2 text-xs text-text-muted">{item.idea}</p>
                  </Td>
                </tr>
              ))}
            </tbody>
          </TableCard>

          <CardList>
            {items.map((item) => (
              <MobileCard
                key={item.id}
                header={
                  <>
                    <span className="rounded-full bg-sky-soft px-2.5 py-1 text-[11px] font-semibold text-sky">
                      {item.genre}
                    </span>
                    <span className="shrink-0 text-[11px] text-text-muted">{formatDate(item.createdAt)}</span>
                  </>
                }
              >
                <MobileField label="Goal">{item.goal}</MobileField>
                <p className="border-t border-muted-border pt-2.5 text-sm text-navy">{item.idea}</p>
              </MobileCard>
            ))}
          </CardList>
        </>
      ) : null}
    </>
  );
}

function ChatsTab() {
  const { data, isLoading, error } = useGetAdminChatsQuery();
  const items = data?.items ?? [];
  const [activeId, setActiveId] = useState<string | null>(null);

  const columns: ExportColumn<(typeof items)[number]>[] = [
    { header: "Last active", value: (i) => formatDate(i.lastMessage) },
    { header: "Name", value: (i) => i.name || "" },
    { header: "Email", value: (i) => i.email || "" },
    { header: "Phone", value: (i) => i.phone || "" },
    { header: "Messages", value: (i) => i.messageCount },
    { header: "Last message", value: (i) => i.preview },
  ];

  return (
    <>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-text-muted">
          Every visitor conversation with the site chat assistant — click a row to read the full, word-for-word transcript.
        </p>
        <ExportButtons filename="readsy-chat-sessions" title="Chat Sessions" columns={columns} rows={items} />
      </div>
      <DataState loading={isLoading} error={errorMessage(error as RTKQueryError)} empty={items.length === 0} />
      {!isLoading && !error && items.length > 0 ? (
        <>
          <TableCard>
            <thead>
              <tr>
                <Th>Last active</Th>
                <Th>Visitor</Th>
                <Th>Messages</Th>
                <Th>Preview</Th>
              </tr>
            </thead>
            <tbody>
              {items.map((session) => (
                <tr
                  key={session.id}
                  onClick={() => setActiveId(session.id)}
                  className="cursor-pointer hover:bg-sky-soft/30"
                >
                  <Td className="whitespace-nowrap text-xs text-text-muted">
                    {formatDate(session.lastMessage)}
                  </Td>
                  <Td>
                    {session.name || session.email ? (
                      <>
                        <p className="font-semibold">{session.name || "Unknown name"}</p>
                        {session.email ? (
                          <p className="text-xs text-sky">{session.email}</p>
                        ) : null}
                      </>
                    ) : (
                      <span className="text-xs italic text-text-muted">Anonymous visitor</span>
                    )}
                  </Td>
                  <Td className="text-xs">{session.messageCount}</Td>
                  <Td className="max-w-sm">
                    <p className="line-clamp-1 text-xs text-text-muted">{session.preview}</p>
                  </Td>
                </tr>
              ))}
            </tbody>
          </TableCard>

          <CardList>
            {items.map((session) => (
              <MobileCard
                key={session.id}
                onClick={() => setActiveId(session.id)}
                header={
                  <>
                    {session.name || session.email ? (
                      <div>
                        <p className="font-semibold text-navy">{session.name || "Unknown name"}</p>
                        {session.email ? <p className="text-xs text-sky">{session.email}</p> : null}
                      </div>
                    ) : (
                      <span className="text-xs italic text-text-muted">Anonymous visitor</span>
                    )}
                    <span className="shrink-0 text-[11px] text-text-muted">
                      {formatDate(session.lastMessage)}
                    </span>
                  </>
                }
              >
                <p className="line-clamp-2 text-sm text-text-muted">{session.preview}</p>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-text-muted">
                  {session.messageCount} message{session.messageCount === 1 ? "" : "s"} · tap to read
                </p>
              </MobileCard>
            ))}
          </CardList>
        </>
      ) : null}

      <AnimatePresence>
        {activeId ? (
          <ChatTranscriptPanel id={activeId} onClose={() => setActiveId(null)} />
        ) : null}
      </AnimatePresence>
    </>
  );
}

function ChatTranscriptPanel({ id, onClose }: { id: string; onClose: () => void }) {
  const { data, isLoading, error } = useGetAdminChatDetailQuery(id);
  const session = data?.session ?? null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <motion.button
        type="button"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        aria-label="Close transcript"
        className="absolute inset-0 bg-navy-deep/60 backdrop-blur-sm"
      />
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-muted-border px-5 py-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-sky">
              Full conversation
            </p>
            <p className="font-display text-lg font-semibold text-navy">
              {session?.name || "Anonymous visitor"}
            </p>
            {session?.email ? (
              <p className="text-xs text-sky">{session.email}</p>
            ) : null}
            {session?.phone ? (
              <p className="flex items-center gap-1 text-xs text-text-muted">
                <Phone className="h-3 w-3" /> {session.phone}
              </p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-text-muted hover:bg-muted hover:text-navy"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="ai-scroll flex-1 space-y-4 overflow-y-auto px-5 py-5">
          {error ? (
            <p className="text-sm text-red-600">
              {errorMessage(error as RTKQueryError, "Failed to load transcript")}
            </p>
          ) : null}
          {isLoading ? (
            <div className="flex h-full items-center justify-center">
              <Loader2 className="h-5 w-5 animate-spin text-sky" />
            </div>
          ) : null}
          {session?.messages.map((m) => (
            <div key={m.id} className={cn("flex flex-col", m.role === "user" ? "items-end" : "items-start")}>
              <span className="mb-1 px-1 text-[10px] font-semibold uppercase tracking-wide text-text-muted">
                {m.role === "user" ? session.name || "Visitor" : "Readsy Assistant"}
              </span>
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                  m.role === "user"
                    ? "rounded-br-md bg-navy text-white"
                    : "rounded-bl-md border border-muted-border bg-muted/50 text-navy",
                )}
              >
                {m.role === "assistant" ? <ChatMarkdown content={m.content} /> : m.content}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
