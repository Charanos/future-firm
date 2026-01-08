"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  FileText,
  Package,
  Router,
  Settings,
  Shield,
  LifeBuoy,
  Sun,
  Moon,
  Monitor,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

const sidebarVariants = {
  expanded: { width: 256 },
  collapsed: { width: 72 },
};

const textVariants = {
  visible: { opacity: 1, x: 0, display: "block" },
  hidden: { opacity: 0, x: -10, transitionEnd: { display: "none" } },
};

export function Sidebar({
  className,
  collapsed = false,
  onToggleCollapse,
}: SidebarProps) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  ];

  const crmItems = [
    { name: "Customers", href: "/crm", icon: Users },
    { name: "Leads", href: "/crm/leads", icon: Users },
    { name: "Vouchers", href: "/crm/vouchers", icon: FileText },
    { name: "Tickets", href: "/crm/tickets", icon: FileText },
  ];

  const reportsItems = [
    { name: "Daily Transactions", href: "/reports/daily-transactions", icon: FileText },
    { name: "Period Transactions", href: "/reports/period-transactions", icon: FileText },
    { name: "Mpesa Transactions", href: "/reports/mpesa-transactions", icon: FileText },
    { name: "Customer Balance", href: "/reports/customer-balance", icon: FileText },
    { name: "Expenses", href: "/reports/expenses", icon: FileText },
  ];

  const managementItems = [
    { name: "Messages", href: "/messages", icon: MessageSquare },
    { name: "Packages", href: "/packages", icon: Package },
    { name: "Sites", href: "/sites", icon: Router },
    { name: "Settings", href: "/settings", icon: Settings },
    { name: "System Users", href: "/users", icon: Shield },
  ];

  const [openSection, setOpenSection] = React.useState<string | null>(() => {
    if (pathname.startsWith("/crm")) return "crm";
    if (pathname.startsWith("/reports")) return "reports";
    return null;
  });

  const toggleSection = (section: string) => {
    if (collapsed) return;
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <motion.div
      className={cn("pb-12 flex flex-col h-full overflow-hidden", className)}
      initial={false}
      animate={collapsed ? "collapsed" : "expanded"}
      variants={sidebarVariants}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="space-y-4 py-4 flex-1">
        {/* Section: Overview */}
        <div className="px-3 py-2">
          <AnimatePresence>
            {!collapsed && (
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                Overview
              </motion.h2>
            )}
          </AnimatePresence>
          <div className="space-y-1">
            <Link href="/dashboard" className="cursor-pointer block">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant={pathname === "/dashboard" ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-2 cursor-pointer text-foreground hover:text-foreground transition-all duration-200",
                    collapsed && "justify-center px-2"
                  )}
                >
                  <LayoutDashboard className="h-4 w-4 shrink-0" />
                  <AnimatePresence>
                    {!collapsed && (
                      <motion.span
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        transition={{ duration: 0.2 }}
                      >
                        Dashboard
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>
            </Link>
          </div>
        </div>

        {/* Section: CRM */}
        <div className="px-3 py-2">
          <AnimatePresence>
            {!collapsed && (
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                CRM
              </motion.h2>
            )}
          </AnimatePresence>
          <div className="space-y-1">
            {/* CRM Parent */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant={pathname.startsWith("/crm") ? "secondary" : "ghost"}
                onClick={() => toggleSection("crm")}
                className={cn(
                  "w-full justify-start gap-2 cursor-pointer text-foreground hover:text-foreground transition-all duration-200",
                  collapsed && "justify-center px-2"
                )}
              >
                <Users className="h-4 w-4 shrink-0" />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      variants={textVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className="flex-1 text-left"
                    >
                      CRM
                    </motion.span>
                  )}
                </AnimatePresence>
                {!collapsed && (
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 shrink-0 transition-transform duration-200",
                      openSection === "crm" && "rotate-180"
                    )}
                  />
                )}
              </Button>
            </motion.div>

            {/* CRM Submenu */}
            <AnimatePresence>
              {openSection === "crm" && !collapsed && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="pl-6 space-y-1 overflow-hidden"
                >
                  {crmItems.map((item, idx) => (
                    <Link key={item.href} href={item.href} className="cursor-pointer block">
                      <motion.div
                        whileHover={{ scale: 1.02, x: 4 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          variant={pathname === item.href ? "secondary" : "ghost"}
                          className="w-full justify-start gap-2 cursor-pointer text-foreground hover:text-foreground transition-all duration-200 text-sm"
                        >
                          <item.icon className="h-3.5 w-3.5 shrink-0" />
                          {item.name}
                        </Button>
                      </motion.div>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>


        {/* Section: Reports */}
        <div className="px-3 py-2">
          <AnimatePresence>
            {!collapsed && (
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                Reports
              </motion.h2>
            )}
          </AnimatePresence>
          <div className="space-y-1">
            {/* Reports Parent */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant={pathname.startsWith("/reports") ? "secondary" : "ghost"}
                onClick={() => toggleSection("reports")}
                className={cn(
                  "w-full justify-start gap-2 cursor-pointer text-foreground hover:text-foreground transition-all duration-200",
                  collapsed && "justify-center px-2"
                )}
              >
                <FileText className="h-4 w-4 shrink-0" />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      variants={textVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className="flex-1 text-left"
                    >
                      Reports
                    </motion.span>
                  )}
                </AnimatePresence>
                {!collapsed && (
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 shrink-0 transition-transform duration-200",
                      openSection === "reports" && "rotate-180"
                    )}
                  />
                )}
              </Button>
            </motion.div>

            {/* Reports Submenu */}
            <AnimatePresence>
              {openSection === "reports" && !collapsed && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="pl-6 space-y-1 overflow-hidden"
                >
                  {reportsItems.map((item, idx) => (
                    <Link key={item.href} href={item.href} className="cursor-pointer block">
                      <motion.div
                        whileHover={{ scale: 1.02, x: 4 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          variant={pathname === item.href ? "secondary" : "ghost"}
                          className="w-full justify-start gap-2 cursor-pointer text-foreground hover:text-foreground transition-all duration-200 text-sm"
                        >
                          <item.icon className="h-3.5 w-3.5 shrink-0" />
                          {item.name}
                        </Button>
                      </motion.div>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Section: Management */}
        <div className="px-3 py-2">
          <AnimatePresence>
            {!collapsed && (
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                Management
              </motion.h2>
            )}
          </AnimatePresence>
          <div className="space-y-1">
            {managementItems.map((item, idx) => (
              <Link
                key={item.href}
                href={item.href}
                className="cursor-pointer block"
              >
                <motion.div
                  whileHover={{ scale: 1.02, x: collapsed ? 0 : 4 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Button
                    variant={
                      pathname === item.href ||
                        pathname.startsWith(item.href + "/")
                        ? "secondary"
                        : "ghost"
                    }
                    className={cn(
                      "w-full justify-start gap-2 cursor-pointer text-foreground hover:text-foreground transition-all duration-200",
                      collapsed && "justify-center px-2"
                    )}
                  >
                    <item.icon className="h-4 w-4 shrink-0" />
                    <AnimatePresence>
                      {!collapsed && (
                        <motion.span
                          variants={textVariants}
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          transition={{ duration: 0.2 }}
                        >
                          {item.name}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Button>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom section with Support, Theme Switcher, and Collapse Toggle */}
      <div className="px-3 py-2 mt-auto space-y-2 border-t border-border/30 pt-4">
        <Link href="/support" className="cursor-pointer block">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start gap-2 cursor-pointer text-foreground hover:text-foreground",
                collapsed && "justify-center px-2"
              )}
            >
              <LifeBuoy className="h-4 w-4 shrink-0" />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    Support
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
          </motion.div>
        </Link>

        {/* Theme Switcher */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-2 cursor-pointer text-foreground hover:text-foreground",
                  collapsed && "justify-center px-2"
                )}
              >
                {theme === "dark" ? (
                  <Moon className="h-4 w-4 shrink-0" />
                ) : theme === "light" ? (
                  <Sun className="h-4 w-4 shrink-0" />
                ) : (
                  <Monitor className="h-4 w-4 shrink-0" />
                )}
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      variants={textVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                    >
                      Theme
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-32">
            <DropdownMenuItem
              onClick={() => setTheme("light")}
              className="cursor-pointer"
            >
              <Sun className="mr-2 h-4 w-4" />
              Light
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setTheme("dark")}
              className="cursor-pointer"
            >
              <Moon className="mr-2 h-4 w-4" />
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setTheme("system")}
              className="cursor-pointer"
            >
              <Monitor className="mr-2 h-4 w-4" />
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Collapse Toggle Button */}
        {onToggleCollapse && (
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="sm"
              onClick={onToggleCollapse}
              className={cn(
                "w-full cursor-pointer transition-all duration-200",
                collapsed ? "justify-center px-2" : "justify-start gap-2"
              )}
            >
              {collapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <>
                  <ChevronLeft className="h-4 w-4" />
                  <span>Collapse</span>
                </>
              )}
            </Button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
