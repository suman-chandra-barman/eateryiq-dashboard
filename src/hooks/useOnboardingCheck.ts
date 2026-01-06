import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGetOnboardingProgressQuery } from "@/redux/features/onboarding/onboardingApi";

/**
 * Hook to check onboarding status and redirect user accordingly
 * - If business_location and franchise_brand are pending, redirect to onboarding
 * - If both are completed, allow access to dashboard
 */
export function useOnboardingCheck(options?: { skipCheck?: boolean }) {
  const router = useRouter();
  const { data: progressData, isLoading } = useGetOnboardingProgressQuery(
    undefined,
    { skip: options?.skipCheck }
  );

  useEffect(() => {
    if (!isLoading && progressData?.data) {
      const { business_location, franchise_brand } = progressData.data.steps;

      // If required steps are not completed, redirect to onboarding
      if (
        business_location.status === "pending" ||
        franchise_brand.status === "pending"
      ) {
        router.push("/onboarding");
      }
    }
  }, [progressData, isLoading, router]);

  return {
    isLoading,
    progressData,
    isOnboardingComplete:
      progressData?.data?.steps.business_location.status === "completed" &&
      progressData?.data?.steps.franchise_brand.status === "completed",
  };
}
