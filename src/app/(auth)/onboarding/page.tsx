/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  useGetOnboardingProgressQuery,
  useSubmitAccountSetupMutation,
  useSkipAccountSetupMutation,
  useSubmitBusinessLocationMutation,
  useSubmitFranchiseBrandMutation,
  useSubmitMenuUploadMutation,
  useSkipMenuUploadMutation,
  useSubmitSalesBaselineMutation,
  useSkipSalesBaselineMutation,
  useSubmitLaborStaffMutation,
  useSkipLaborStaffMutation,
  useSubmitDocumentsMutation,
  useSkipDocumentsMutation,
  useSubmitMarketingPoliciesMutation,
  useSkipMarketingPoliciesMutation,
} from "@/redux/features/onboarding/onboardingApi";
import { toast } from "sonner";

const steps = [
  { key: "account_setup", label: "Account Setup", required: false },
  { key: "business_location", label: "Business Location", required: true },
  { key: "franchise_brand", label: "Franchise & Brand", required: true },
  { key: "menu_upload", label: "Menu Upload", required: false },
  { key: "sales_baseline", label: "Sales Baseline", required: false },
  { key: "labor_staff", label: "Labor & Staff", required: false },
  { key: "documents", label: "Documents", required: false },
  { key: "marketing_policies", label: "Marketing & Policies", required: false },
  { key: "completion", label: "Completion", required: false },
] as const;

type StepKey = (typeof steps)[number]["key"];

export default function OnboardingPage() {
  const router = useRouter();
  const { data: progressData, isLoading } = useGetOnboardingProgressQuery();
  const [currentStep, setCurrentStep] = useState(0);

  // Check if onboarding is complete
  useEffect(() => {
    if (progressData?.data) {
      const progress = progressData.data.progress;

      // If both required steps are completed, redirect to dashboard
      if (progress === 100) {
        router.push("/dashboard");
      }
    }
  }, [progressData, router]);

  // Set initial step based on progress
  useEffect(() => {
    if (progressData?.data) {
      const stepsArray = Object.keys(progressData.data.steps);
      const firstIncompleteIndex = stepsArray.findIndex((key) => {
        const step = progressData.data.steps[key as StepKey];
        return step.status === "pending";
      });

      if (firstIncompleteIndex !== -1) {
        setCurrentStep(firstIncompleteIndex);
      }
    }
  }, [progressData]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading onboarding...</p>
        </div>
      </div>
    );
  }

  const progress = progressData?.data?.progress || 0;
  const current = steps[currentStep];

  function gotoStep(i: number) {
    setCurrentStep(Math.max(0, Math.min(i, steps.length - 1)));
  }

  function next() {
    gotoStep(currentStep + 1);
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Sticky Banner */}
      <div className="sticky top-0 z-30 border-b bg-white/90 backdrop-blur">
        <div className="container mx-auto px-12 py-3 flex items-center gap-4">
          <RadialProgress value={progress} size={42} stroke={8} />
          <div className="flex-1">
            <div className="text-sm font-medium">
              Onboarding progress:{" "}
              <span className="font-bold">{progress}%</span>
            </div>
            {progress < 100 ? (
              <div className="text-xs text-gray-600">
                Complete required steps (Business Location & Franchise Brand) to
                access the platform.
              </div>
            ) : (
              <div className="text-xs text-blue-600">
                All set! You&apos;re fully onboarded.
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
        {/* Sidebar Steps */}
        <aside className="bg-white rounded-2xl shadow-sm border p-4 h-fit">
          <h2 className="font-semibold mb-3">Setup Checklist</h2>
          <ol className="space-y-2">
            {steps.map((s, i) => {
              const stepStatus = progressData?.data?.steps[s.key as StepKey];
              return (
                <li key={s.key}>
                  <button
                    onClick={() => gotoStep(i)}
                    className={`w-full text-left px-3 py-2 rounded-xl border flex items-center justify-between ${
                      i === currentStep
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
                      {stepStatus?.status === "completed"
                        ? "✅"
                        : stepStatus?.status === "skipped"
                        ? "⏭️"
                        : "⏳"}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          {/* Platform Access Notice */}
          <div className="mt-4 p-3 rounded-xl bg-amber-50 border border-amber-200 text-sm">
            <div className="font-semibold mb-1">Platform Access</div>
            <p>
              Complete <b>Business Location</b> and <b>Franchise & Brand</b> to
              unlock the platform.
            </p>
          </div>
        </aside>

        {/* Main Panel */}
        <main className="space-y-6">
          <Card>
            <header className="p-5 border-b">
              <h1 className="text-xl font-bold">{current.label}</h1>
              <p className="text-sm text-gray-600">
                {current.required
                  ? "This step is required to proceed."
                  : "Complete the fields below or skip to continue."}
              </p>
            </header>
            <section className="p-5">
              {current.key === "account_setup" && <AccountStep onNext={next} />}
              {current.key === "business_location" && (
                <LocationStep onNext={next} />
              )}
              {current.key === "franchise_brand" && (
                <FranchiseStep onNext={next} />
              )}
              {current.key === "menu_upload" && <MenuStep onNext={next} />}
              {current.key === "sales_baseline" && <SalesStep onNext={next} />}
              {current.key === "labor_staff" && <LaborStep onNext={next} />}
              {current.key === "documents" && <DocumentsStep onNext={next} />}
              {current.key === "marketing_policies" && (
                <MarketingPoliciesStep onNext={next} />
              )}
              {current.key === "completion" && (
                <Completion progress={progress} />
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
  const bg = `conic-gradient(#2563eb ${angle}deg, #e5e7eb ${angle}deg)`;
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

// ===== Helper Components =====
function Input({
  label,
  value,
  onChange,
  placeholder = "",
  type = "text",
}: any) {
  return (
    <label className="block">
      <div className="text-xs text-gray-600 mb-1">{label}</div>
      <input
        type={type}
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
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

// ===== Step Components =====
function AccountStep({ onNext }: { onNext: () => void }) {
  const [submitAccountSetup, { isLoading }] = useSubmitAccountSetupMutation();
  const [skipAccountSetup, { isLoading: isSkipping }] =
    useSkipAccountSetupMutation();
  const [formData, setFormData] = useState({
    owner_name: "",
    brand_name: "",
    email: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitAccountSetup(formData).unwrap();
      onNext();
    } catch (error) {
      console.error("Failed to submit account setup:", error);
    }
  };

  const handleSkip = async () => {
    try {
      await skipAccountSetup().unwrap();
      onNext();
    } catch (error) {
      console.error("Failed to skip account setup:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <Input
          label="Owner Name"
          value={formData.owner_name}
          onChange={(v: string) => setFormData({ ...formData, owner_name: v })}
        />
        <Input
          label="Brand Name / DBA"
          value={formData.brand_name}
          onChange={(v: string) => setFormData({ ...formData, brand_name: v })}
        />
        <Input
          label="Email"
          type="email"
          value={formData.email}
          onChange={(v: string) => setFormData({ ...formData, email: v })}
        />
      </div>
      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={handleSkip}
          disabled={isSkipping}
          className="px-4 py-2 rounded-full border hover:bg-gray-50 disabled:opacity-50"
        >
          {isSkipping ? "Skipping..." : "Skip"}
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-5 py-2 rounded-full text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? "Saving..." : "Continue"}
        </button>
      </div>
    </form>
  );
}

function LocationStep({ onNext }: { onNext: () => void }) {
  const [submitBusinessLocation, { isLoading }] =
    useSubmitBusinessLocationMutation();
  const [formData, setFormData] = useState({
    business_name: "",
    address: "",
    timezone: "",
    service_model: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.business_name ||
      !formData.address ||
      !formData.timezone ||
      !formData.service_model
    ) {
      toast.warning("All fields are required for Business Location");
      return;
    }
    try {
      await submitBusinessLocation(formData).unwrap();
      onNext();
    } catch (error) {
      console.error("Failed to submit business location:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <Input
          label="Business Name *"
          value={formData.business_name}
          onChange={(v: string) =>
            setFormData({ ...formData, business_name: v })
          }
        />
        <Input
          label="Address *"
          value={formData.address}
          onChange={(v: string) => setFormData({ ...formData, address: v })}
        />
        <Select
          label="Timezone *"
          value={formData.timezone}
          onChange={(v: string) => setFormData({ ...formData, timezone: v })}
          options={[
            { value: "America/Los_Angeles", label: "America/Los_Angeles" },
            { value: "America/Denver", label: "America/Denver" },
            { value: "America/Chicago", label: "America/Chicago" },
            { value: "America/New_York", label: "America/New_York" },
          ]}
        />
        <Select
          label="Service Model *"
          value={formData.service_model}
          onChange={(v: string) =>
            setFormData({ ...formData, service_model: v })
          }
          options={[
            { value: "qsr", label: "QSR" },
            { value: "fast_casual", label: "Fast Casual" },
            { value: "full_service", label: "Full Service" },
            { value: "cafe", label: "Cafe" },
            { value: "bar", label: "Bar" },
            { value: "catering", label: "Catering" },
            { value: "ghost_kitchen", label: "Ghost Kitchen" },
          ]}
        />
      </div>
      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="px-5 py-2 rounded-full text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? "Saving..." : "Continue"}
        </button>
      </div>
    </form>
  );
}

function FranchiseStep({ onNext }: { onNext: () => void }) {
  const [submitFranchiseBrand, { isLoading }] =
    useSubmitFranchiseBrandMutation();
  const [formData, setFormData] = useState({
    is_franchise: false,
    franchise_name: "",
    locations_owned: "",
    region_market: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        is_franchise: formData.is_franchise,
        franchise_name: formData.is_franchise ? formData.franchise_name : null,
        locations_owned:
          formData.is_franchise && formData.locations_owned
            ? Number(formData.locations_owned)
            : null,
        region_market: formData.is_franchise ? formData.region_market : null,
      };
      await submitFranchiseBrand(payload).unwrap();
      onNext();
    } catch (error) {
      console.error("Failed to submit franchise brand:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Select
        label="Is this restaurant part of a franchise? *"
        value={formData.is_franchise ? "yes" : "no"}
        onChange={(v: string) =>
          setFormData({ ...formData, is_franchise: v === "yes" })
        }
        options={[
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ]}
      />
      {formData.is_franchise && (
        <div className="grid md:grid-cols-2 gap-4">
          <Input
            label="Franchise / Brand Name"
            value={formData.franchise_name}
            onChange={(v: string) =>
              setFormData({ ...formData, franchise_name: v })
            }
            placeholder="e.g., Chipotle, Subway, Local Brand"
          />
          <Input
            label="Locations Owned / Operated"
            type="number"
            value={formData.locations_owned}
            onChange={(v: string) =>
              setFormData({ ...formData, locations_owned: v })
            }
          />
          <Input
            label="Region / Market"
            value={formData.region_market}
            onChange={(v: string) =>
              setFormData({ ...formData, region_market: v })
            }
          />
        </div>
      )}
      {!formData.is_franchise && (
        <div className="text-sm text-gray-600">
          Marked as <b>Independent Operator</b>. Brand benchmarks will use
          cuisine & local peers.
        </div>
      )}
      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="px-5 py-2 rounded-full text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? "Saving..." : "Continue"}
        </button>
      </div>
    </form>
  );
}

function MenuStep({ onNext }: { onNext: () => void }) {
  const [submitMenuUpload, { isLoading }] = useSubmitMenuUploadMutation();
  const [skipMenuUpload, { isLoading: isSkipping }] =
    useSkipMenuUploadMutation();
  const [menuUrl, setMenuUrl] = useState("");
  const [menuFile, setMenuFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      if (menuUrl) formData.append("menu_url", menuUrl);
      if (menuFile) formData.append("menu_file", menuFile);

      await submitMenuUpload(formData).unwrap();
      onNext();
    } catch (error) {
      console.error("Failed to submit menu upload:", error);
    }
  };

  const handleSkip = async () => {
    try {
      await skipMenuUpload().unwrap();
      onNext();
    } catch (error) {
      console.error("Failed to skip menu upload:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Menu URL (optional)"
        value={menuUrl}
        onChange={(v: string) => setMenuUrl(v)}
        placeholder="https://yourmenu.com"
      />
      <div className="border-2 border-dashed rounded-xl p-5 text-center">
        <div className="text-sm mb-2">Upload menu file (PDF, CSV, images)</div>
        <input
          type="file"
          accept=".pdf,.csv,.png,.jpg,.jpeg"
          onChange={(e) => setMenuFile(e.target.files?.[0] || null)}
        />
        {menuFile && (
          <div className="text-xs text-gray-600 mt-2">
            Selected: {menuFile.name}
          </div>
        )}
      </div>
      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={handleSkip}
          disabled={isSkipping}
          className="px-4 py-2 rounded-full border hover:bg-gray-50 disabled:opacity-50"
        >
          {isSkipping ? "Skipping..." : "Skip"}
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-5 py-2 rounded-full text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? "Saving..." : "Continue"}
        </button>
      </div>
    </form>
  );
}

function SalesStep({ onNext }: { onNext: () => void }) {
  const [submitSalesBaseline, { isLoading }] = useSubmitSalesBaselineMutation();
  const [skipSalesBaseline, { isLoading: isSkipping }] =
    useSkipSalesBaselineMutation();
  const [formData, setFormData] = useState({
    in_store_last_month: "",
    online_last_month: "",
    in_store_last_12_month: "",
    online_last_12_month: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        in_store_last_month: Number(formData.in_store_last_month),
        online_last_month: Number(formData.online_last_month),
        in_store_last_12_month: Number(formData.in_store_last_12_month),
        online_last_12_month: Number(formData.online_last_12_month),
      };
      await submitSalesBaseline(payload).unwrap();
      onNext();
    } catch (error) {
      console.error("Failed to submit sales baseline:", error);
    }
  };

  const handleSkip = async () => {
    try {
      await skipSalesBaseline().unwrap();
      onNext();
    } catch (error) {
      console.error("Failed to skip sales baseline:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <Input
          label="Estimated In‑Store Sales — Last Month ($)"
          type="number"
          value={formData.in_store_last_month}
          onChange={(v: string) =>
            setFormData({ ...formData, in_store_last_month: v })
          }
        />
        <Input
          label="Estimated Online/3P Sales — Last Month ($)"
          type="number"
          value={formData.online_last_month}
          onChange={(v: string) =>
            setFormData({ ...formData, online_last_month: v })
          }
        />
        <Input
          label="Estimated In‑Store Sales — Last 12 Months ($)"
          type="number"
          value={formData.in_store_last_12_month}
          onChange={(v: string) =>
            setFormData({ ...formData, in_store_last_12_month: v })
          }
        />
        <Input
          label="Estimated Online/3P Sales — Last 12 Months ($)"
          type="number"
          value={formData.online_last_12_month}
          onChange={(v: string) =>
            setFormData({ ...formData, online_last_12_month: v })
          }
        />
      </div>
      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={handleSkip}
          disabled={isSkipping}
          className="px-4 py-2 rounded-full border hover:bg-gray-50 disabled:opacity-50"
        >
          {isSkipping ? "Skipping..." : "Skip"}
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-5 py-2 rounded-full text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? "Saving..." : "Continue"}
        </button>
      </div>
    </form>
  );
}

function LaborStep({ onNext }: { onNext: () => void }) {
  const [submitLaborStaff, { isLoading }] = useSubmitLaborStaffMutation();
  const [skipLaborStaff, { isLoading: isSkipping }] =
    useSkipLaborStaffMutation();
  const [formData, setFormData] = useState({
    foh_employees: "",
    boh_employees: "",
    pay_cadence: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        foh_employees: Number(formData.foh_employees),
        boh_employees: Number(formData.boh_employees),
        pay_cadence: formData.pay_cadence,
      };
      await submitLaborStaff(payload).unwrap();
      onNext();
    } catch (error) {
      console.error("Failed to submit labor staff:", error);
    }
  };

  const handleSkip = async () => {
    try {
      await skipLaborStaff().unwrap();
      onNext();
    } catch (error) {
      console.error("Failed to skip labor staff:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-3 gap-4">
        <Input
          label="FOH Employees"
          type="number"
          value={formData.foh_employees}
          onChange={(v: string) =>
            setFormData({ ...formData, foh_employees: v })
          }
        />
        <Input
          label="BOH Employees"
          type="number"
          value={formData.boh_employees}
          onChange={(v: string) =>
            setFormData({ ...formData, boh_employees: v })
          }
        />
        <Select
          label="Pay Cadence"
          value={formData.pay_cadence}
          onChange={(v: string) => setFormData({ ...formData, pay_cadence: v })}
          options={[
            { value: "weekly", label: "Weekly" },
            { value: "bi-weekly", label: "Bi‑Weekly" },
            { value: "semi-monthly", label: "Semi‑Monthly" },
            { value: "monthly", label: "Monthly" },
          ]}
        />
      </div>
      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={handleSkip}
          disabled={isSkipping}
          className="px-4 py-2 rounded-full border hover:bg-gray-50 disabled:opacity-50"
        >
          {isSkipping ? "Skipping..." : "Skip"}
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-5 py-2 rounded-full text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? "Saving..." : "Continue"}
        </button>
      </div>
    </form>
  );
}

function DocumentsStep({ onNext }: { onNext: () => void }) {
  const [submitDocuments, { isLoading }] = useSubmitDocumentsMutation();
  const [skipDocuments, { isLoading: isSkipping }] = useSkipDocumentsMutation();
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast.warning("Please select a file");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("file", file);

      await submitDocuments(formData).unwrap();
      onNext();
    } catch (error) {
      console.error("Failed to submit documents:", error);
    }
  };

  const handleSkip = async () => {
    try {
      await skipDocuments().unwrap();
      onNext();
    } catch (error) {
      console.error("Failed to skip documents:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="border-2 border-dashed rounded-xl p-5 text-center">
        <div className="text-sm mb-2">
          Upload leases, vendor & employment contracts, P&L, etc.
        </div>
        <input
          type="file"
          accept=".pdf,.csv,.docx,.png,.jpg,.jpeg,.xlsx"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        {file && (
          <div className="text-xs text-gray-600 mt-2">
            Selected: {file.name}
          </div>
        )}
      </div>
      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={handleSkip}
          disabled={isSkipping}
          className="px-4 py-2 rounded-full border hover:bg-gray-50 disabled:opacity-50"
        >
          {isSkipping ? "Skipping..." : "Skip"}
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-5 py-2 rounded-full text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? "Saving..." : "Continue"}
        </button>
      </div>
    </form>
  );
}

function MarketingPoliciesStep({ onNext }: { onNext: () => void }) {
  const [submitMarketingPolicies, { isLoading }] =
    useSubmitMarketingPoliciesMutation();
  const [skipMarketingPolicies, { isLoading: isSkipping }] =
    useSkipMarketingPoliciesMutation();
  const [formData, setFormData] = useState({
    monthly_marketing_budget: "",
    key_policies: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        monthly_marketing_budget: Number(formData.monthly_marketing_budget),
        key_policies: formData.key_policies,
      };
      await submitMarketingPolicies(payload).unwrap();
      onNext();
    } catch (error) {
      console.error("Failed to submit marketing policies:", error);
    }
  };

  const handleSkip = async () => {
    try {
      await skipMarketingPolicies().unwrap();
      onNext();
    } catch (error) {
      console.error("Failed to skip marketing policies:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <Input
          label="Monthly Marketing Budget ($)"
          type="number"
          value={formData.monthly_marketing_budget}
          onChange={(v: string) =>
            setFormData({ ...formData, monthly_marketing_budget: v })
          }
        />
        <Input
          label="Key Policies (tips, comps, waste)"
          value={formData.key_policies}
          onChange={(v: string) =>
            setFormData({ ...formData, key_policies: v })
          }
          placeholder="Tip pooling, discounts approval, waste logging cadence…"
        />
      </div>
      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={handleSkip}
          disabled={isSkipping}
          className="px-4 py-2 rounded-full border hover:bg-gray-50 disabled:opacity-50"
        >
          {isSkipping ? "Skipping..." : "Skip"}
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-5 py-2 rounded-full text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? "Saving..." : "Continue"}
        </button>
      </div>
    </form>
  );
}

function Completion({ progress }: { progress: number }) {
  const router = useRouter();

  return (
    <div className="text-center py-10">
      {progress >= 100 ? (
        <>
          <div className="text-3xl font-bold text-blue-600 mb-2">
            🎉 Onboarding Complete!
          </div>
          <p className="text-gray-700 mb-6">
            You&apos;re ready to unlock full EateryIQ insights and automations.
          </p>
          <button
            onClick={() => router.push("/dashboard")}
            className="px-6 py-3 rounded-full text-white bg-blue-600 hover:bg-blue-700"
          >
            Go to Dashboard
          </button>
        </>
      ) : (
        <>
          <div className="text-2xl font-semibold mb-2">
            You&apos;re {progress}% complete
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
