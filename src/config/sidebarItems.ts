import {
  LayoutDashboard,
  Bot,
  Calendar,
  FileText,
  BarChart3,
  Settings,
  Users,
  DollarSign,
  HelpCircle,
} from "lucide-react";

export const sidebarItems = {
  admin: [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/users", label: "Users Man.", icon: Users },
    { href: "/dashboard/reports", label: "Reports", icon: BarChart3 },
    {
      href: "/dashboard/subscription",
      label: "Subscription",
      icon: DollarSign,
    },
    { href: "/dashboard/support", label: "Support", icon: HelpCircle },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
  ],
  operator: [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/chat", label: "EateryGPT Chat", icon: Bot },
    { href: "/dashboard/calendar", label: "Calendar", icon: Calendar },
    { href: "/dashboard/documents", label: "Documents", icon: FileText },
    { href: "/dashboard/reports", label: "Reports", icon: BarChart3 },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
  ],
  franchisee: [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/reports", label: "Reports", icon: BarChart3 },
    { href: "/dashboard/documents", label: "Documents", icon: FileText },
    { href: "/dashboard/support", label: "Support", icon: HelpCircle },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
  ],
  manager: [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/reports", label: "Reports", icon: BarChart3 },
    { href: "/dashboard/calendar", label: "Calendar", icon: Calendar },
    { href: "/dashboard/staff", label: "Staff", icon: Users },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
  ],
};
