"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Users, Menu, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar } from "./Sidebar"; // Reuse sidebar content for the menu sheet

export function MobileNav({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "flex h-16 items-center justify-around border-t border-border/30 p-2 z-50",
        className
      )}
    >
      <Link href="/dashboard" className="flex flex-col items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className={cn(pathname === "/dashboard" && "text-primary")}
        >
          <LayoutDashboard className="h-5 w-5" />
        </Button>
        <span className="text-[10px] font-medium">Home</span>
      </Link>

      <Link href="/crm" className="flex flex-col items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className={cn(pathname.startsWith("/crm") && "text-primary")}
        >
          <Users className="h-5 w-5" />
        </Button>
        <span className="text-[10px] font-medium">CRM</span>
      </Link>

      <Link href="/messages" className="flex flex-col items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className={cn(pathname.startsWith("/messages") && "text-primary")}
        >
          <MessageSquare className="h-5 w-5" />
        </Button>
        <span className="text-[10px] font-medium">Chat</span>
      </Link>

      <div className="flex flex-col items-center gap-1">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[80vw]">
            {/* Reuse the desktop sidebar content inside the mobile sheet too for full menu access */}
            <div className="flex h-16 items-center border-b border-border/30 px-1 mb-4">
              <span className="font-semibold text-lg tracking-tight">
                THE FUTURE FIRM
              </span>
            </div>
            <Sidebar />
          </SheetContent>
        </Sheet>
        <span className="text-[10px] font-medium">Menu</span>
      </div>
    </div>
  );
}
