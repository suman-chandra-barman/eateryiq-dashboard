import AdminDashboardHeader from "@/components/Admin/AdminDashboardHeader";
import { AdminDashboardSidebar } from "@/components/Admin/AdminDashboardSidebar";
import type React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-[#F2F7FF] text-[#535F72] gap-4">
      <AdminDashboardSidebar />
      <main className="flex-1 overflow-auto py-4">
        <AdminDashboardHeader />
        {children}
      </main>
    </div>
  );
}
