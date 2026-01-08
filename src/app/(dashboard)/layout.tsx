"use client";

import { useState } from "react";
import { OrganizationSwitcher } from "@/components/organization/OrganizationSwitcher";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { MobileNav } from "@/components/layout/MobileNav";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen w-full flex-col md:flex-row overflow-hidden bg-background">
      {/* Desktop Sidebar - Hidden on mobile */}
      <AnimatePresence initial={false}>
        <motion.aside
          className="hidden md:flex md:flex-col md:border-r md:border-border/20 z-20 bg-background"
          initial={false}
          animate={{ width: sidebarCollapsed ? 72 : 256 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <motion.div
            className="flex h-16 items-center border-b border-border/20 px-6 overflow-hidden"
            animate={{
              justifyContent: sidebarCollapsed ? "center" : "flex-start",
            }}
          >
            <AnimatePresence mode="wait">
              {sidebarCollapsed ? (
                <motion.span
                  key="collapsed-logo"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="font-semibold text-lg tracking-tight"
                >
                  FO
                </motion.span>
              ) : (
                <motion.span
                  key="expanded-logo"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="font-semibold text-lg tracking-tight whitespace-nowrap"
                >
                  THE FUTURE FIRM
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
          <Sidebar
            className="flex-1"
            collapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          />
        </motion.aside>
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <Header />

        {/* Scrollable Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>

        {/* Mobile Bottom Navigation - Hidden on desktop */}
        <MobileNav className="md:hidden border-t border-border/20 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60" />
      </div>
    </div>
  );
}
