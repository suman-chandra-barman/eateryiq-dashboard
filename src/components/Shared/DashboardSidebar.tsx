"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronsRight, ChevronsLeft, ChevronRight } from "lucide-react";
import { LogoutDialog } from "@/components/Dailog/LogoutDialog";
import logo from "@/assets/logo.png";
import logoWithoutText from "@/assets/logo_without_text.png";
import { sidebarItems } from "@/config/sidebarItems";
import { LucideIcon } from "lucide-react";
import { useAppSelector } from "@/redux/hooks";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

export function DashboardSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const { user: currentUser } = useAppSelector((state) => state.auth);
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!currentUser) {
    return null; // or a loading state
  }

  const navItems: NavItem[] = sidebarItems[currentUser.role];

  // Prevent hydration mismatch by not rendering dynamic content until mounted
  if (!isMounted) {
    return (
      <div className="bg-white w-64 transition-all duration-300 ease-in-out flex flex-col rounded-2xl shadow-sm">
        {/* Static server-side render */}
        <div className="p-4 flex items-center justify-between">
          <Link
            href={`/dashboard/${currentUser.role}`}
            className="flex items-center gap-4 h-12"
          >
            <Image src={logo} alt="Logo" className="w-28" />
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-700 hover:text-blue-600 hover:bg-[#F2F7FF]"
          >
            <ChevronsLeft className="w-5 h-5" />
          </Button>
        </div>
        <nav className="py-4 flex flex-col flex-1 space-y-2 px-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full h-11 text-[#535F72] hover:bg-[#F2F7FF] hover:text-blue-600 rounded-[12px] justify-start gap-3",
                    isActive &&
                      "bg-blue-600 hover:bg-blue-700 text-white hover:text-white"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Button>
              </Link>
            );
          })}
        </nav>
        <div className="bg-white p-4 text-[#3B3B3B] space-y-4 border-t">
          <div className="w-full flex items-center bg-[#F2F7FF] transition-colors rounded-2xl cursor-pointer gap-3 p-4">
            <Avatar className="w-10 h-10">
              <AvatarImage
                src={currentUser?.profile_image_url}
                alt="User Profile Image"
              />
              <AvatarFallback className="font-bold uppercase">
                {currentUser?.full_name ? currentUser.full_name.charAt(0) : ""}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-left">
              <div className="font-medium text-sm">
                {currentUser?.full_name}
              </div>
              <div className="text-xs text-gray-400 capitalize">
                {currentUser?.role?.replace("_", " ") || currentUser?.role}
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>
    );
  }

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
              <Link
                href={`/dashboard/${currentUser.role}`}
                className="flex items-center gap-4 h-12"
              >
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
              <Link
                href={`/dashboard/${currentUser.role}`}
                className="flex items-center justify-center"
              >
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
        <nav
          className={cn(
            "py-4 flex flex-col flex-1 space-y-2",
            isCollapsed ? "px-2" : "px-4"
          )}
        >
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
                    isActive &&
                      "bg-blue-600 hover:bg-blue-700 text-white hover:text-white"
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
              "w-full flex items-center bg-[#F2F7FF] transition-colors rounded-2xl cursor-pointer",
              isCollapsed ? "justify-center p-2" : "gap-3 p-4"
            )}
          >
            <Avatar className="w-10 h-10">
              <AvatarImage
                src={currentUser?.profile_image_url}
                alt={currentUser?.full_name}
              />
              <AvatarFallback className="font-bold uppercase">
                {currentUser?.full_name?.slice(0, 1)}
              </AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <>
                <div className="flex-1 text-left">
                  <div className="font-medium text-sm">
                    {currentUser?.full_name}
                  </div>
                  <div className="text-xs text-gray-400 capitalize">
                    {currentUser?.role?.replace("_", " ") || currentUser?.role}
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* ===== Logout Dialog ===== */}
      <LogoutDialog
        open={showLogoutDialog}
        onOpenChange={setShowLogoutDialog}
        setShowLogoutDialog={setShowLogoutDialog}
      />
    </>
  );
}
