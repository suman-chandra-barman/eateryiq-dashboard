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
  operator: [
    { href: "/dashboard/operator", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/operator/chat", label: "EateryGPT Chat", icon: Bot },
    { href: "/dashboard/operator/calendar", label: "Calendar", icon: Calendar },
    { href: "/dashboard/operator/documents", label: "Documents", icon: FileText },
    { href: "/dashboard/operator/reports", label: "Reports", icon: BarChart3 },
    { href: "/dashboard/operator/settings", label: "Settings", icon: Settings },
  ],
  franchisee: [
    { href: "/dashboard/franchisee", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/franchisee/reports", label: "Reports", icon: BarChart3 },
    { href: "/dashboard/franchisee/documents", label: "Documents", icon: FileText },
    { href: "/dashboard/franchisee/support", label: "Support", icon: HelpCircle },
    { href: "/dashboard/franchisee/settings", label: "Settings", icon: Settings },
  ],
  manager: [
    { href: "/dashboard/manager", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/manager/reports", label: "Reports", icon: BarChart3 },
    { href: "/dashboard/manager/calendar", label: "Calendar", icon: Calendar },
    { href: "/dashboard/manager/staff", label: "Staff", icon: Users },
    { href: "/dashboard/manager/settings", label: "Settings", icon: Settings },
  ],
};
