"use client";

import DashboardSkeleton from "@/components/Shared/DashbaordSkeleton";
import DashboardHeader from "@/components/Shared/DashboardHeader";
import { DashboardSidebar } from "@/components/Shared/DashboardSidebar";
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

  const {data:currentUserData, isLoading } = useGetMeQuery(undefined, {
    skip: !token,
    refetchOnMountOrArgChange: false,
    refetchOnReconnect: false,
    refetchOnFocus: false,
  });

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token, router]);

  if (token && isLoading || !currentUserData) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="flex h-screen bg-[#F2F7FF] text-[#535F72] p-4 gap-4">
      <DashboardSidebar currentUser={currentUserData?.data} />
      <main className="flex-1 overflow-auto">
        <DashboardHeader title="Operations Dashboard" />
        {children}
      </main>
    </div>
  );
}
