"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  LayoutDashboard,
  Calendar,
  FileText,
  BarChart3,
  Settings,
  ChevronRight,
  LogOut,
  Crown,
  ChevronsRight,
  ChevronsLeft,
  Bot,
} from "lucide-react";
import logo from "@/assets/logo.png";
import logoWithoutText from "@/assets/logo_without_text.png";
import user from "@/assets/user.jpg";
import Image from "next/image";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/chat", label: "EateryGPT Chat", icon: Bot },
  { href: "/dashboard/calendar", label: "Calendar", icon: Calendar },
  { href: "/dashboard/documents", label: "Documents", icon: FileText },
  { href: "/dashboard/reports", label: "Reports", icon: BarChart3 },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function DashboardSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const pathname = usePathname();

  const handleLogout = () => {
    console.log("Logging out...");
    setShowLogoutDialog(false);
  };

  return (
    <>
      <div
        className={cn(
          "bg-white transition-all duration-300 ease-in-out flex flex-col rounded-2xl",
          isCollapsed ? "w-20" : "w-65"
        )}
      >
        {/* Header with logo and collapse button */}
        <div
          className={cn(
            "p-4 flex items-center",
            isCollapsed ? "justify-center" : "justify-between"
          )}
        >
          {!isCollapsed ? (
            <>
              <div className="flex items-center gap-4 h-12">
                <Link href="/dashboard">
                  <Image src={logo} alt="EateryIQ" className="w-31" />
                </Link>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCollapsed(true)}
                className="text-gray-700 hover:text-blue-600 hover:bg-[#F2F7FF] flex-shrink-0"
              >
                <ChevronsLeft className="w-6 h-6" />
              </Button>
            </>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <div className="w-10 h-12 bg-white rounded-lg flex items-center justify-center">
                <Link href="/dashboard">
                  <Image
                    src={logoWithoutText}
                    alt="EateryIQ"
                    className="w-8 h-8"
                  />
                </Link>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCollapsed(false)}
                className="text-gray-700 hover:text-blue-600 hover:bg-[#F2F7FF]"
              >
                <ChevronsRight className="w-6 h-6" />
              </Button>
            </div>
          )}
        </div>

        {/* Navigation items */}
        <nav
          className={cn(
            "py-4 flex flex-col space-y-4 flex-1",
            isCollapsed ? "px-2" : "px-4"
          )}
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} className="text-center">
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full h-11 text-[#535F72] hover:bg-[#F2F7FF] hover:text-blue-600 rounded-[12px]",
                    isCollapsed
                      ? "justify-center px-0 w-10 h-10"
                      : "justify-start gap-3",
                    isActive &&
                      "bg-blue-600 text-white hover:bg-blue-700 hover:text-white"
                  )}
                  size={isCollapsed ? "icon" : "default"}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!isCollapsed && <span>{item.label}</span>}
                </Button>
              </Link>
            );
          })}
        </nav>

        {/* User profile section */}
        <div className="bg-white p-4 text-[#3B3B3B] rounded-2xl space-y-4">
          <button
            onClick={() => setShowLogoutDialog(true)}
            className={cn(
              "w-full flex items-center bg-[#F2F7FF] transition-colors focus:outline-none rounded-2xl",
              isCollapsed ? "justify-center" : "gap-3 p-4"
            )}
          >
            <Avatar
              className={cn(
                "flex-shrink-0",
                isCollapsed ? "w-10 h-10" : "w-10 h-10"
              )}
            >
              <AvatarImage src={user.src} alt="User Avatar" />
            </Avatar>
            {!isCollapsed && (
              <>
                <div className="flex-1 text-left">
                  <div className="font-medium text-xl">Jhon Marcel</div>
                  <div className="text-xs text-gray-400">Premium</div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
              </>
            )}
          </button>

          {!isCollapsed ? (
            <Button
              variant="outline"
              className="w-full justify-start gap-2 bg-transparent border-gray-300 hover:bg-[#E2E8F0] hover:text-blue-600"
            >
              <Crown className="w-4 h-4" />
              Upgrade Plan
            </Button>
          ) : (
            <Button
              variant="outline"
              className="w-full h-11 bg-transparent border-gray-300 hover:bg-[#E2E8F0] hover:text-blue-600"
            >
              <Crown className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Logout confirmation dialog */}
      <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Logout</DialogTitle>
            <DialogDescription>
              Are you sure you want to logout from your account?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setShowLogoutDialog(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
