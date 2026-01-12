import {
  LayoutDashboard,
  Bot,
  Calendar,
  FileText,
  BarChart3,
  Settings,
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
    { href: "/dashboard/executive/chat", label: "EateryGPT Chat", icon: Bot },
    { href: "/dashboard/executive/calendar", label: "Calendar", icon: Calendar },
    { href: "/dashboard/executive/reports", label: "Reports", icon: BarChart3 },
    { href: "/dashboard/executive/documents", label: "Documents", icon: FileText },
    { href: "/dashboard/executive/settings", label: "Settings", icon: Settings },
  ],
  marketing_manager: [
    { href: "/dashboard/marketing_manager", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/marketing_manager/chat", label: "EateryGPT Chat", icon: Bot },
    { href: "/dashboard/marketing_manager/calendar", label: "Calendar", icon: Calendar },
    { href: "/dashboard/marketing_manager/documents", label: "Documents", icon: FileText },
    { href: "/dashboard/marketing_manager/reports", label: "Reports", icon: BarChart3 },
    { href: "/dashboard/marketing_manager/settings", label: "Settings", icon: Settings },
  ],
};
