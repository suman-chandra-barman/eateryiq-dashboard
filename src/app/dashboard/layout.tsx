import DashboardHeader from "@/components/Shared/DashboardHeader";
import { DashboardSidebar } from "@/components/Shared/DashboardSidebar";
import type React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="flex h-screen bg-[#F2F7FF] text-[#535F72] p-4 gap-4">
      <DashboardSidebar/>
      <main className="flex-1 overflow-auto">
        <DashboardHeader title="Operations Dashboard" />
        {children}
      </main>
    </div>
  );
}
