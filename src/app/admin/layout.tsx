"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminDashboardHeader from "@/components/Admin/AdminDashboardHeader";
import { AdminDashboardSidebar } from "@/components/Admin/AdminDashboardSidebar";
import { useGetMeQuery } from "@/redux/features/auth/authApi";
import { useAppSelector } from "@/redux/hooks";
import PageLoader from "@/components/Shared/PageLoader";

export default function DashboardLayout({ children }: { children: React.ReactNode; }) {
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
    <div className="flex h-screen bg-[#F2F7FF] text-[#535F72] gap-4">
      <AdminDashboardSidebar />
      <main className="flex-1 overflow-auto p-4">
        <AdminDashboardHeader />
        {children}
      </main>
    </div>
  );
}
