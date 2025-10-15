import { DashboardSidebar } from "@/components/DashboardSidebar"
import type React from "react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const userRole = "operator" // This can be dynamic based on the logged-in user;

  return (
    <div className="flex h-screen bg-[#F2F7FF] text-[#535F72] p-4 gap-4">
      <DashboardSidebar role={userRole} />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
