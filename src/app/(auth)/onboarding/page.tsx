/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useMemo, useState } from "react";

// Demo Prototype: EateryIQ Post‑Signup Onboarding (interactive)
// Added in this version:
// - CSV template download (Sales)
// - POS OAuth mock screen for connectors
// - Persists progress to localStorage (key: EIQ_ONBOARDING_STATE)

const STORAGE_KEY = "EIQ_ONBOARDING_STATE";

const WEIGHTS = {
  account: 10,
  location: 15,
  franchise: 15,
  menu: 15,
  sales: 15,
  labor: 10,
  documents: 10,
  marketingPolicies: 10,
};

const initialState = {
  account: { ownerName: "", brandName: "", email: "" },
  location: { name: "", address: "", timezone: "", serviceModel: "" },
  franchise: { isFranchise: "", brand: "", locationsOwned: "", region: "" },
  menu: { url: "", files: [] as string[] },
  sales: { inStoreMonth: "", inStoreYear: "", onlineMonth: "", onlineYear: "" },
  labor: { employeesFOH: "", employeesBOH: "", payCadence: "" },
  documents: { files: [] as string[] },
  marketingPolicies: { budget: "", policies: "" },
  currentStep: 0,
};

const steps = [
  { key: "account", label: "Account Setup", required: false },
  { key: "location", label: "Business Location", required: true },
  { key: "franchise", label: "Franchise & Brand", required: true },
  { key: "menu", label: "Menu Upload", required: false },
  { key: "sales", label: "Sales Baseline", required: false },
  { key: "labor", label: "Labor & Staff", required: false },
  { key: "documents", label: "Documents", required: false },
  { key: "marketingPolicies", label: "Marketing & Policies", required: false },
  { key: "complete", label: "Completion", required: false },
] as const;

type State = typeof initialState;

type StepKey = keyof Pick<
  State,
  | "account"
  | "location"
  | "franchise"
  | "menu"
  | "sales"
  | "labor"
  | "documents"
  | "marketingPolicies"
>;

export default function OnboardingPage() {
  const [state, setState] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : initialState;
    }
    return initialState; // return default if server-side
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const percent = useMemo(() => calculatePercent(state), [state]);
  const canUsePlatformNow = state.location.name && state.location.address; // Name+Location unlocks
  const requiredGateSatisfied =
    isLocationComplete(state) && isFranchiseComplete(state);
  const current = steps[state.currentStep];

  function gotoStep(i: number) {
    setState((s: any) => ({
      ...s,
      currentStep: Math.max(0, Math.min(i, steps.length - 1)),
    }));
  }

  function next() {
    if (
      !requiredGateSatisfied &&
      (current.key === "location" || current.key === "franchise")
    )
      return;
    gotoStep(state.currentStep + 1);
  }

  function skip() {
    if (current.required) return; // cannot skip required
    gotoStep(state.currentStep + 1);
  }

  function resetAll() {
    localStorage.removeItem(STORAGE_KEY);
    setState(initialState);
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Sticky Banner */}
      <div className="sticky top-0 z-30 border-b bg-white/90 backdrop-blur">
        <div className="container mx-auto px-12 py-3 flex items-center gap-4">
          <RadialProgress value={percent} size={42} stroke={8} />
          <div className="flex-1">
            <div className="text-sm font-medium">
              Onboarding progress: <span className="font-bold">{percent}%</span>
            </div>
            {!isComplete(percent) ? (
              <div className="text-xs text-gray-600">
                Finish onboarding to maximize insights, benchmarking, and
                automations.
              </div>
            ) : (
              <div className="text-xs text-blue-600">
                All set! You’re fully onboarded.
              </div>
            )}
          </div>
          <button
            onClick={resetAll}
            className="text-xs rounded-full border px-3 py-1 hover:bg-gray-100"
            title="Reset demo"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
        {/* Sidebar Steps */}
        <aside className="bg-white rounded-2xl shadow-sm border p-4 h-fit">
          <h2 className="font-semibold mb-3">Setup Checklist</h2>
          <ol className="space-y-2">
            {steps.map((s, i) => (
              <li key={s.key}>
                <button
                  onClick={() => gotoStep(i)}
                  className={`w-full text-left px-3 py-2 rounded-xl border flex items-center justify-between ${
                    i === state.currentStep
                      ? "bg-gray-100 border-gray-300"
                      : "bg-white border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <span>
                    {s.label}{" "}
                    {s.required && (
                      <span className="text-[10px] text-red-500 ml-1">
                        Required
                      </span>
                    )}
                  </span>
                  <span className="text-xs">
                    {isStepComplete(state, s.key as StepKey) ? "✅" : "⏳"}
                  </span>
                </button>
              </li>
            ))}
          </ol>

          {/* Platform Access Notice */}
          <div className="mt-4 p-3 rounded-xl bg-amber-50 border border-amber-200 text-sm">
            <div className="font-semibold mb-1">Platform Access</div>
            {canUsePlatformNow ? (
              <p>
                Core features are unlocked. You’ll see reminders until
                onboarding is complete.
              </p>
            ) : (
              <p>
                Enter your <b>Business Name</b> and <b>Location</b> to unlock
                the platform.
              </p>
            )}
          </div>
        </aside>

        {/* Main Panel */}
        <main className="space-y-6">
          <Card>
            <header className="p-5 border-b">
              <h1 className="text-xl font-bold">{current.label}</h1>
              <p className="text-sm text-gray-600">
                Complete the fields below. You can skip non‑required steps.
              </p>
            </header>
            <section className="p-5 space-y-4">
              {current.key === "account" && (
                <AccountStep state={state} setState={setState} />
              )}
              {current.key === "location" && (
                <LocationStep state={state} setState={setState} />
              )}
              {current.key === "franchise" && (
                <FranchiseStep state={state} setState={setState} />
              )}
              {current.key === "menu" && (
                <MenuStep state={state} setState={setState} />
              )}
              {current.key === "sales" && (
                <SalesStep state={state} setState={setState} />
              )}
              {current.key === "labor" && (
                <LaborStep state={state} setState={setState} />
              )}
              {current.key === "documents" && (
                <DocumentsStep state={state} setState={setState} />
              )}
              {current.key === "marketingPolicies" && (
                <MarketingPoliciesStep state={state} setState={setState} />
              )}
              {current.key === "complete" && (
                <Completion state={state} percent={percent} />
              )}
            </section>
            <footer className="p-5 border-t flex items-center gap-3">
              {!current.required && current.key !== "complete" && (
                <button
                  onClick={skip}
                  className="px-4 py-2 rounded-full border hover:bg-gray-50"
                >
                  Skip
                </button>
              )}
              {current.key !== "complete" && (
                <button
                  onClick={next}
                  className={`px-5 py-2 rounded-full text-white ${
                    (current.key === "location" &&
                      !isLocationComplete(state)) ||
                    (current.key === "franchise" && !isFranchiseComplete(state))
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  Continue
                </button>
              )}
              {current.key !== "complete" && (
                <div className="ml-auto text-xs text-gray-500">
                  You’re {percent}% complete
                </div>
              )}
            </footer>
          </Card>

          {/* Demo: Platform Surface with Reminder Banner */}
          <Card>
            <header className="p-5 border-b flex items-center justify-between">
              <h2 className="font-semibold">Platform Home (Demo)</h2>
              <span className="text-xs text-gray-500">
                Accessible after Name + Location
              </span>
            </header>
            <section className="p-5 space-y-4">
              {canUsePlatformNow ? (
                <div>
                  {!isComplete(percent) && (
                    <div className="mb-4 p-3 rounded-xl bg-blue-50 border border-blue-200 text-sm">
                      <b>{percent}% Complete</b> — Finish onboarding (menu,
                      sales, docs) to unlock benchmarked insights & automations.
                    </div>
                  )}
                  <div className="grid md:grid-cols-3 gap-4">
                    <MetricCard
                      title="Est. In‑Store Sales"
                      value={state.sales.inStoreMonth || "—"}
                      sub="Last Month (est)"
                    />
                    <MetricCard
                      title="Est. Online/3P Sales"
                      value={state.sales.onlineMonth || "—"}
                      sub="Last Month (est)"
                    />
                    <MetricCard
                      title="Menu Items Parsed"
                      value={state.menu.files.length + (state.menu.url ? 1 : 0)}
                      sub="Uploads + URL"
                    />
                  </div>
                </div>
              ) : (
                <div className="text-sm text-gray-600">
                  Please complete <b>Business Location</b> to access the
                  platform.
                </div>
              )}
            </section>
          </Card>
        </main>
      </div>
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
      {children}
    </div>
  );
}

function MetricCard({
  title,
  value,
  sub,
}: {
  title: string;
  value: React.ReactNode;
  sub?: string;
}) {
  return (
    <div className="p-4 rounded-xl border bg-white">
      <div className="text-xs text-gray-500">{sub}</div>
      <div className="text-sm font-semibold">{title}</div>
      <div className="text-2xl mt-1">{value}</div>
    </div>
  );
}

function RadialProgress({
  value,
  size = 40,
  stroke = 6,
}: {
  value: number;
  size?: number;
  stroke?: number;
}) {
  const clamped = Math.max(0, Math.min(100, value));
  const angle = (clamped / 100) * 360;
  const bg = `conic-gradient(#2563eb ${angle}deg, #e5e7eb ${angle}deg)`; // blue → gray
  return (
    <div
      className="rounded-full grid place-items-center"
      style={{ width: size, height: size, background: bg }}
    >
      <div
        className="bg-white rounded-full"
        style={{ width: size - stroke * 2, height: size - stroke * 2 }}
      />
    </div>
  );
}

// ===== Step Components =====
function Input({ label, value, onChange, placeholder = "" }: any) {
  return (
    <label className="block">
      <div className="text-xs text-gray-600 mb-1">{label}</div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </label>
  );
}

function Select({ label, value, onChange, options }: any) {
  return (
    <label className="block">
      <div className="text-xs text-gray-600 mb-1">{label}</div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select…</option>
        {options.map((o: any) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

function FileDrop({
  label,
  onFiles,
}: {
  label: string;
  onFiles: (names: string[]) => void;
}) {
  return (
    <div className="border-2 border-dashed rounded-xl p-5 text-center">
      <div className="text-sm mb-2">{label}</div>
      <input
        type="file"
        multiple
        onChange={(e) => {
          const files = Array.from(e.target.files || []).map(
            (f: any) => f.name
          );
          onFiles(files);
        }}
      />
      <div className="text-xs text-gray-500 mt-1">
        PDF, CSV, DOCX, PNG/JPG supported (demo)
      </div>
    </div>
  );
}

function AccountStep({
  state,
  setState,
}: {
  state: State;
  setState: React.Dispatch<React.SetStateAction<State>>;
}) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <Input
        label="Owner Name"
        value={state.account.ownerName}
        onChange={(v: string) =>
          setState((s) => ({ ...s, account: { ...s.account, ownerName: v } }))
        }
      />
      <Input
        label="Brand Name / DBA"
        value={state.account.brandName}
        onChange={(v: string) =>
          setState((s) => ({ ...s, account: { ...s.account, brandName: v } }))
        }
      />
      <Input
        label="Email"
        value={state.account.email}
        onChange={(v: string) =>
          setState((s) => ({ ...s, account: { ...s.account, email: v } }))
        }
      />
    </div>
  );
}

function LocationStep({
  state,
  setState,
}: {
  state: State;
  setState: React.Dispatch<React.SetStateAction<State>>;
}) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <Input
        label="Business Name"
        value={state.location.name}
        onChange={(v: string) =>
          setState((s) => ({ ...s, location: { ...s.location, name: v } }))
        }
      />
      <Input
        label="Address"
        value={state.location.address}
        onChange={(v: string) =>
          setState((s) => ({ ...s, location: { ...s.location, address: v } }))
        }
      />
      <Select
        label="Timezone"
        value={state.location.timezone}
        onChange={(v: string) =>
          setState((s) => ({ ...s, location: { ...s.location, timezone: v } }))
        }
        options={[
          "America/Los_Angeles",
          "America/Denver",
          "America/Chicago",
          "America/New_York",
        ]}
      />
      <Select
        label="Service Model"
        value={state.location.serviceModel}
        onChange={(v: string) =>
          setState((s) => ({
            ...s,
            location: { ...s.location, serviceModel: v },
          }))
        }
        options={[
          "QSR",
          "Fast Casual",
          "Full Service",
          "Cafe",
          "Bar",
          "Catering",
          "Ghost Kitchen",
        ]}
      />
    </div>
  );
}

function FranchiseStep({
  state,
  setState,
}: {
  state: State;
  setState: React.Dispatch<React.SetStateAction<State>>;
}) {
  const isYes = state.franchise.isFranchise === "Yes";
  return (
    <div className="space-y-4">
      <Select
        label="Is this restaurant part of a franchise?"
        value={state.franchise.isFranchise}
        onChange={(v: string) =>
          setState((s) => ({
            ...s,
            franchise: { ...s.franchise, isFranchise: v },
          }))
        }
        options={["Yes", "No"]}
      />
      {isYes ? (
        <div className="grid md:grid-cols-2 gap-4">
          <Input
            label="Franchise / Brand Name"
            value={state.franchise.brand}
            onChange={(v: string) =>
              setState((s) => ({
                ...s,
                franchise: { ...s.franchise, brand: v },
              }))
            }
            placeholder="e.g., Chipotle, Subway, Local Brand"
          />
          <Input
            label="Locations Owned / Operated"
            value={state.franchise.locationsOwned}
            onChange={(v: string) =>
              setState((s) => ({
                ...s,
                franchise: { ...s.franchise, locationsOwned: v },
              }))
            }
          />
          <Input
            label="Region / Market"
            value={state.franchise.region}
            onChange={(v: string) =>
              setState((s) => ({
                ...s,
                franchise: { ...s.franchise, region: v },
              }))
            }
          />
        </div>
      ) : state.franchise.isFranchise === "No" ? (
        <div className="text-sm text-gray-600">
          Marked as <b>Independent Operator</b>. Brand benchmarks will use
          cuisine & local peers.
        </div>
      ) : null}
    </div>
  );
}

function MenuStep({
  state,
  setState,
}: {
  state: State;
  setState: React.Dispatch<React.SetStateAction<State>>;
}) {
  return (
    <div className="space-y-4">
      <Input
        label="Menu URL (optional)"
        value={state.menu.url}
        onChange={(v: string) =>
          setState((s) => ({ ...s, menu: { ...s.menu, url: v } }))
        }
        placeholder="https://yourmenu.com"
      />
      <FileDrop
        label="Upload menu files (PDF, CSV, images)"
        onFiles={(names) =>
          setState((s) => ({
            ...s,
            menu: { ...s.menu, files: [...s.menu.files, ...names] },
          }))
        }
      />
      {state.menu.files.length > 0 && (
        <div className="text-xs text-gray-600">
          Uploaded: {state.menu.files.join(", ")}
        </div>
      )}
    </div>
  );
}

function SalesStep({
  state,
  setState,
}: {
  state: State;
  setState: React.Dispatch<React.SetStateAction<State>>;
}) {
  return (
    <div className="grid gap-4">
      <div className="grid md:grid-cols-2 gap-4">
        <Input
          label="Estimated In‑Store Sales — Last Month ($)"
          value={state.sales.inStoreMonth}
          onChange={(v: string) =>
            setState((s) => ({ ...s, sales: { ...s.sales, inStoreMonth: v } }))
          }
        />
        <Input
          label="Estimated Online/3P Sales — Last Month ($)"
          value={state.sales.onlineMonth}
          onChange={(v: string) =>
            setState((s) => ({ ...s, sales: { ...s.sales, onlineMonth: v } }))
          }
        />
        <Input
          label="Estimated In‑Store Sales — Last 12 Months ($)"
          value={state.sales.inStoreYear}
          onChange={(v: string) =>
            setState((s) => ({ ...s, sales: { ...s.sales, inStoreYear: v } }))
          }
        />
        <Input
          label="Estimated Online/3P Sales — Last 12 Months ($)"
          value={state.sales.onlineYear}
          onChange={(v: string) =>
            setState((s) => ({ ...s, sales: { ...s.sales, onlineYear: v } }))
          }
        />
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => downloadSalesCSVTemplate()}
          className="px-4 py-2 rounded-full border bg-white hover:bg-gray-50 text-sm"
        >
          Download Sales CSV Template
        </button>
        <span className="text-xs text-gray-500">
          CSV includes headers for month/year by channel.
        </span>
      </div>
    </div>
  );
}

function LaborStep({
  state,
  setState,
}: {
  state: State;
  setState: React.Dispatch<React.SetStateAction<State>>;
}) {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      <Input
        label="FOH Employees"
        value={state.labor.employeesFOH}
        onChange={(v: string) =>
          setState((s) => ({ ...s, labor: { ...s.labor, employeesFOH: v } }))
        }
      />
      <Input
        label="BOH Employees"
        value={state.labor.employeesBOH}
        onChange={(v: string) =>
          setState((s) => ({ ...s, labor: { ...s.labor, employeesBOH: v } }))
        }
      />
      <Select
        label="Pay Cadence"
        value={state.labor.payCadence}
        onChange={(v: string) =>
          setState((s) => ({ ...s, labor: { ...s.labor, payCadence: v } }))
        }
        options={["Weekly", "Bi‑Weekly", "Semi‑Monthly", "Monthly"]}
      />
    </div>
  );
}

function DocumentsStep({
  state,
  setState,
}: {
  state: State;
  setState: React.Dispatch<React.SetStateAction<State>>;
}) {
  return (
    <div className="space-y-3">
      <FileDrop
        label="Upload leases, vendor & employment contracts, P&L, etc."
        onFiles={(names) =>
          setState((s) => ({
            ...s,
            documents: { files: [...s.documents.files, ...names] },
          }))
        }
      />
      {state.documents.files.length > 0 && (
        <div className="text-xs text-gray-600">
          Uploaded: {state.documents.files.join(", ")}
        </div>
      )}
    </div>
  );
}

function MarketingPoliciesStep({
  state,
  setState,
}: {
  state: State;
  setState: React.Dispatch<React.SetStateAction<State>>;
}) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <Input
        label="Monthly Marketing Budget ($)"
        value={state.marketingPolicies.budget}
        onChange={(v: string) =>
          setState((s) => ({
            ...s,
            marketingPolicies: { ...s.marketingPolicies, budget: v },
          }))
        }
      />
      <Input
        label="Key Policies (tips, comps, waste)"
        value={state.marketingPolicies.policies}
        onChange={(v: string) =>
          setState((s) => ({
            ...s,
            marketingPolicies: { ...s.marketingPolicies, policies: v },
          }))
        }
        placeholder="Tip pooling, discounts approval, waste logging cadence…"
      />
    </div>
  );
}

function Completion({ state, percent }: { state: State; percent: number }) {
  return (
    <div className="text-center py-10">
      {isComplete(percent) ? (
        <>
          <div className="text-3xl font-bold text-blue-600 mb-2">
            🎉 Onboarding Complete!
          </div>
          <p className="text-gray-700">
            You’re ready to unlock full EateryGPT insights and automations.
          </p>
        </>
      ) : (
        <>
          <div className="text-2xl font-semibold mb-2">
            You’re {percent}% complete
          </div>
          <p className="text-gray-700 max-w-xl mx-auto">
            Finish remaining steps (menu, sales, integrations, documents) to
            maximize accuracy of forecasts, benchmarking, and recommendations.
          </p>
        </>
      )}
    </div>
  );
}

// ===== Helpers =====
function isLocationComplete(state: State) {
  return Boolean(
    state.location.name &&
      state.location.address &&
      state.location.timezone &&
      state.location.serviceModel
  );
}

function isFranchiseComplete(state: State) {
  if (state.franchise.isFranchise === "Yes") {
    return Boolean(state.franchise.brand && state.franchise.locationsOwned);
  }
  return state.franchise.isFranchise === "No"; // must choose Yes/No
}

function isStepComplete(state: State, key: StepKey) {
  switch (key) {
    case "location":
      return isLocationComplete(state);
    case "franchise":
      return isFranchiseComplete(state);
    case "menu":
      return Boolean(state.menu.url || state.menu.files.length > 0);
    case "sales":
      return Boolean(
        state.sales.inStoreMonth ||
          state.sales.onlineMonth ||
          state.sales.inStoreYear ||
          state.sales.onlineYear
      );
    case "labor":
      return Boolean(
        state.labor.employeesFOH ||
          state.labor.employeesBOH ||
          state.labor.payCadence
      );
    case "documents":
      return state.documents.files.length > 0;
    case "marketingPolicies":
      return Boolean(
        state.marketingPolicies.budget || state.marketingPolicies.policies
      );
    case "account":
      return Boolean(
        state.account.ownerName ||
          state.account.brandName ||
          state.account.email
      );
    default:
      return false;
  }
}

function calculatePercent(state: State) {
  const parts: Array<[StepKey, number]> = [
    ["account", WEIGHTS.account],
    ["location", WEIGHTS.location],
    ["franchise", WEIGHTS.franchise],
    ["menu", WEIGHTS.menu],
    ["sales", WEIGHTS.sales],
    ["labor", WEIGHTS.labor],
    ["documents", WEIGHTS.documents],
    ["marketingPolicies", WEIGHTS.marketingPolicies],
  ];
  const achieved = parts.reduce(
    (sum, [k, w]) => sum + (isStepComplete(state, k) ? w : 0),
    0
  );
  return Math.min(100, Math.round(achieved));
}

function isComplete(p: number) {
  return p >= 100;
}

// ===== CSV Template Utility =====
function downloadSalesCSVTemplate() {
  const headers = [
    "period_type", // month|year
    "period_label", // e.g., 2025-09 or 2024
    "channel", // in_store|online_3p
    "sales_amount",
    "orders",
  ];
  const rows = [
    ["month", "2025-09", "in_store", "45000", "1800"],
    ["month", "2025-09", "online_3p", "12000", "400"],
    ["year", "2024", "in_store", "520000", "20000"],
    ["year", "2024", "online_3p", "140000", "4800"],
  ];
  const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "eateryiq_sales_template.csv";
  a.click();
  URL.revokeObjectURL(url);
}
