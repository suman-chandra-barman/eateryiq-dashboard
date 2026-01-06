"use client";

import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { useOnboardingCheck } from "@/hooks/useOnboardingCheck";

function DashboardPage() {
  const { user } = useAppSelector((state) => state.auth);
  const router = useRouter();

  // Check onboarding status and redirect if needed
  const { isLoading, isOnboardingComplete } = useOnboardingCheck();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return router.push("/login");
  }

  // Only redirect to role-specific dashboard if onboarding is complete
  if (isOnboardingComplete) {
    return router.push(`/dashboard/${user?.role}`);
  }

  return null;
}

export default DashboardPage;
