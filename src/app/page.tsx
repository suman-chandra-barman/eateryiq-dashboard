"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { getUserDashboardPath } from "@/lib/auth-utils";
import PageLoader from "@/components/Skeletons/PageLoader";

export default function RootPage() {
  const { user, token } = useAppSelector((state) => state.auth);

  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.replace("/login");
      return;
    }

    // If token exists, redirect based on user role
    if (user) {
      const redirectPath = getUserDashboardPath(user);
      router.replace(redirectPath);
    }
  }, [token, user, router]);

  // Show loading state while redirecting
  return <PageLoader />;
}
