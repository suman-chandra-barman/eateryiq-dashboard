"use client";

import DashboardHeader from "@/components/Shared/DashboardHeader";
import { DashboardSidebar } from "@/components/Shared/DashboardSidebar";
import PageLoader from "@/components/Shared/PageLoader";
import { useGetMeQuery } from "@/redux/features/auth/authApi";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import type React from "react";
import { useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = useAppSelector((state) => state.auth.token);
  const router = useRouter();

  const { isLoading } = useGetMeQuery(undefined, {
    skip: !token,
    refetchOnMountOrArgChange: false,
    refetchOnReconnect: false,
    refetchOnFocus: false,
  });

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token]);

  if (token && isLoading) {
    <PageLoader />;
  }

  return (
    <div className="flex h-screen bg-[#F2F7FF] text-[#535F72] p-4 gap-4">
      <DashboardSidebar />
      <main className="flex-1 overflow-auto">
        <DashboardHeader title="Operations Dashboard" />
        {children}
      </main>
    </div>
  );
}
