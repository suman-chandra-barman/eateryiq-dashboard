"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
  ChevronsRight,
  ChevronsLeft,
  ChevronRight,
  Crown,
  LogOut,
} from "lucide-react";
import logo from "@/assets/logo.png";
import logoWithoutText from "@/assets/logo_without_text.png";
import user from "@/assets/user.jpg";
import { sidebarItems } from "@/config/sidebarItems";

// 🧩 Option 1: Get role from props or context
export function DashboardSidebar({ role = "operator" }: { role?: string }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const pathname = usePathname();

  const navItems = sidebarItems[role] || sidebarItems["operator"];

  const handleLogout = () => {
    console.log("Logging out...");
    setShowLogoutDialog(false);
  };

  return (
    <>
      <div
        className={cn(
          "bg-white transition-all duration-300 ease-in-out flex flex-col rounded-2xl shadow-sm",
          isCollapsed ? "w-20" : "w-64"
        )}
      >
        {/* ===== Logo & Collapse Button ===== */}
        <div
          className={cn(
            "p-4 flex items-center",
            isCollapsed ? "justify-center" : "justify-between"
          )}
        >
          {!isCollapsed ? (
            <>
              <Link href="/dashboard" className="flex items-center gap-4 h-12">
                <Image src={logo} alt="Logo" className="w-28" />
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCollapsed(true)}
                className="text-gray-700 hover:text-blue-600 hover:bg-[#F2F7FF]"
              >
                <ChevronsLeft className="w-5 h-5" />
              </Button>
            </>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <Link href="/dashboard" className="flex items-center justify-center">
                <Image src={logoWithoutText} alt="Logo" className="w-8 h-8" />
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCollapsed(false)}
                className="text-gray-700 hover:text-blue-600 hover:bg-[#F2F7FF]"
              >
                <ChevronsRight className="w-5 h-5" />
              </Button>
            </div>
          )}
        </div>

        {/* ===== Nav Items ===== */}
        <nav className={cn("py-4 flex flex-col flex-1 space-y-2", isCollapsed ? "px-2" : "px-4")}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full h-11 text-[#535F72] hover:bg-[#F2F7FF] hover:text-blue-600 rounded-[12px]",
                    isCollapsed ? "justify-center px-0" : "justify-start gap-3",
                    isActive && "bg-blue-600 text-white hover:bg-blue-700"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  {!isCollapsed && <span>{item.label}</span>}
                </Button>
              </Link>
            );
          })}
        </nav>

        {/* ===== User Profile ===== */}
        <div className="bg-white p-4 text-[#3B3B3B] space-y-4 border-t">
          <button
            onClick={() => setShowLogoutDialog(true)}
            className={cn(
              "w-full flex items-center bg-[#F2F7FF] transition-colors rounded-2xl",
              isCollapsed ? "justify-center p-2" : "gap-3 p-4"
            )}
          >
            <Avatar className="w-10 h-10">
              <AvatarImage src={user.src} alt="User Avatar" />
            </Avatar>
            {!isCollapsed && (
              <>
                <div className="flex-1 text-left">
                  <div className="font-medium text-sm">Jhon Marcel</div>
                  <div className="text-xs text-gray-400 capitalize">{role}</div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </>
            )}
          </button>

          <Button
            variant="outline"
            className={cn(
              "border-gray-300 hover:bg-[#E2E8F0] hover:text-blue-600 w-full",
              isCollapsed ? "h-11 justify-center" : "justify-start gap-2"
            )}
          >
            <Crown className="w-4 h-4" />
            {!isCollapsed && <span>Upgrade Plan</span>}
          </Button>
        </div>
      </div>

      {/* ===== Logout Dialog ===== */}
      <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Logout</DialogTitle>
            <DialogDescription>
              Are you sure you want to log out from your account?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setShowLogoutDialog(false)}>
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
