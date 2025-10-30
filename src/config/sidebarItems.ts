import {
  LayoutDashboard,
  Bot,
  Calendar,
  FileText,
  BarChart3,
  Settings,
  Users,
  HelpCircle,
} from "lucide-react";

export const sidebarItems = {
  operations: [
    { href: "/dashboard/operations", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/operations/chat", label: "EateryGPT Chat", icon: Bot },
    { href: "/dashboard/operations/calendar", label: "Calendar", icon: Calendar },
    { href: "/dashboard/operations/documents", label: "Documents", icon: FileText },
    { href: "/dashboard/operations/reports", label: "Reports", icon: BarChart3 },
    { href: "/dashboard/operations/settings", label: "Settings", icon: Settings },
  ],
  executive: [
    { href: "/dashboard/executive", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/executive/reports", label: "Reports", icon: BarChart3 },
    { href: "/dashboard/executive/documents", label: "Documents", icon: FileText },
    { href: "/dashboard/executive/support", label: "Support", icon: HelpCircle },
    { href: "/dashboard/executive/settings", label: "Settings", icon: Settings },
  ],
  marketingManager: [
    { href: "/dashboard/Marketing-manager", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/Marketing-manager/reports", label: "Reports", icon: BarChart3 },
    { href: "/dashboard/Marketing-manager/calendar", label: "Calendar", icon: Calendar },
    { href: "/dashboard/Marketing-manager/staff", label: "Staff", icon: Users },
    { href: "/dashboard/Marketing-manager/settings", label: "Settings", icon: Settings },
  ],
};
