import { baseApi } from "@/redux/api/baseApi";

interface OnboardingStepStatus {
  status: "pending" | "completed" | "skipped";
  required: boolean;
}

interface OnboardingProgress {
  progress: number;
  steps: {
    account_setup: OnboardingStepStatus;
    business_location: OnboardingStepStatus;
    franchise_brand: OnboardingStepStatus;
    menu_upload: OnboardingStepStatus;
    sales_baseline: OnboardingStepStatus;
    labor_staff: OnboardingStepStatus;
    documents: OnboardingStepStatus;
    marketing_policies: OnboardingStepStatus;
    completion: OnboardingStepStatus;
  };
}

interface AccountSetupData {
  owner_name: string;
  brand_name: string;
  email: string;
}

interface BusinessLocationData {
  business_name: string;
  address: string;
  timezone: string;
  service_model: string;
}

interface FranchiseBrandData {
  is_franchise: boolean;
  franchise_name?: string | null;
  locations_owned?: number | null;
  region_market?: string | null;
}

interface MenuUploadData {
  menu_url?: string;
  menu_file?: File;
}

interface SalesBaselineData {
  in_store_last_month: number;
  online_last_month: number;
  in_store_last_12_month: number;
  online_last_12_month: number;
}

interface LaborStaffData {
  foh_employees: number;
  boh_employees: number;
  pay_cadence: string;
}

interface MarketingPoliciesData {
  monthly_marketing_budget: number;
  key_policies: string;
}

const onboardingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get onboarding progress
    getOnboardingProgress: builder.query<
      { data: OnboardingProgress; message: string },
      void
    >({
      query: () => "/api/onboarding/progress/",
      providesTags: ["OnboardingProgress"],
    }),

    // Account Setup
    submitAccountSetup: builder.mutation<
      { data: AccountSetupData; progress: number; message: string },
      AccountSetupData
    >({
      query: (data) => ({
        url: "/api/onboarding/account-setup/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["OnboardingProgress"],
    }),

    skipAccountSetup: builder.mutation<
      { progress: number; message: string },
      void
    >({
      query: () => ({
        url: "/api/onboarding/account-setup/skip/",
        method: "POST",
      }),
      invalidatesTags: ["OnboardingProgress"],
    }),

    // Business Location
    submitBusinessLocation: builder.mutation<
      { data: BusinessLocationData; progress: number; message: string },
      BusinessLocationData
    >({
      query: (data) => ({
        url: "/api/onboarding/business-location/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["OnboardingProgress"],
    }),

    // Franchise & Brand
    submitFranchiseBrand: builder.mutation<
      { data: FranchiseBrandData; progress: number; message: string },
      FranchiseBrandData
    >({
      query: (data) => ({
        url: "/api/onboarding/franchise-brand/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["OnboardingProgress"],
    }),

    // Menu Upload
    submitMenuUpload: builder.mutation<
      { data: MenuUploadData; progress: number; message: string },
      FormData
    >({
      query: (formData) => ({
        url: "/api/onboarding/menu-upload/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["OnboardingProgress"],
    }),

    skipMenuUpload: builder.mutation<
      { progress: number; message: string },
      void
    >({
      query: () => ({
        url: "/api/onboarding/menu-upload/skip/",
        method: "POST",
      }),
      invalidatesTags: ["OnboardingProgress"],
    }),

    // Sales Baseline
    submitSalesBaseline: builder.mutation<
      { data: SalesBaselineData; progress: number; message: string },
      SalesBaselineData
    >({
      query: (data) => ({
        url: "/api/onboarding/sales-baseline/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["OnboardingProgress"],
    }),

    skipSalesBaseline: builder.mutation<
      { progress: number; message: string },
      void
    >({
      query: () => ({
        url: "/api/onboarding/sales-baseline/skip/",
        method: "POST",
      }),
      invalidatesTags: ["OnboardingProgress"],
    }),

    // Labor & Staff
    submitLaborStaff: builder.mutation<
      { data: LaborStaffData; progress: number; message: string },
      LaborStaffData
    >({
      query: (data) => ({
        url: "/api/onboarding/labor-staff/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["OnboardingProgress"],
    }),

    skipLaborStaff: builder.mutation<
      { progress: number; message: string },
      void
    >({
      query: () => ({
        url: "/api/onboarding/labor-staff/skip/",
        method: "POST",
      }),
      invalidatesTags: ["OnboardingProgress"],
    }),

    // Documents
    submitDocuments: builder.mutation<
      { data: { file: string }; progress: number; message: string },
      FormData
    >({
      query: (formData) => ({
        url: "/api/onboarding/documents/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["OnboardingProgress"],
    }),

    skipDocuments: builder.mutation<
      { progress: number; message: string },
      void
    >({
      query: () => ({
        url: "/api/onboarding/documents/skip/",
        method: "POST",
      }),
      invalidatesTags: ["OnboardingProgress"],
    }),

    // Marketing & Policies
    submitMarketingPolicies: builder.mutation<
      { data: MarketingPoliciesData; progress: number; message: string },
      MarketingPoliciesData
    >({
      query: (data) => ({
        url: "/api/onboarding/marketing-policies/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["OnboardingProgress"],
    }),

    skipMarketingPolicies: builder.mutation<
      { progress: number; message: string },
      void
    >({
      query: () => ({
        url: "/api/onboarding/marketing-policies/skip/",
        method: "POST",
      }),
      invalidatesTags: ["OnboardingProgress"],
    }),
  }),
});

export const {
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
} = onboardingApi;
