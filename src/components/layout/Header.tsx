"use client";

import { usePathname } from "next/navigation";
import { OrganizationSwitcher } from "@/components/organization/OrganizationSwitcher";
import { Button } from "@/components/ui/button";
import { UserCircle, Bell, Search, ChevronRight, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export function Header() {
  const pathname = usePathname();

  // Generate breadcrumbs from pathname
  const breadcrumbs = pathname
    .split("/")
    .filter((segment) => segment !== "")
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " "));

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-6 justify-between gap-4">
        {/* Left Side: Logo & Breadcrumbs */}
        <div className="flex items-center gap-4">
          <div className="md:hidden">
            {/* Mobile menu trigger could go here if not in MobileNav */}
            <span className="font-bold text-lg tracking-tight">FF</span>
          </div>

          <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-foreground">Dashboard</span>
            </div>
            {breadcrumbs.length > 0 && breadcrumbs[0] !== "Dashboard" && (
              <>
                <ChevronRight className="h-4 w-4 opacity-50" />
                <span className={breadcrumbs.length === 1 ? "font-medium text-foreground" : ""}>
                  {breadcrumbs[0]}
                </span>
              </>
            )}
            {breadcrumbs.length > 1 && (
              <>
                <ChevronRight className="h-4 w-4 opacity-50" />
                <span className="font-medium text-foreground">
                  {breadcrumbs[1]}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Center: Search (Optional) */}
        <div className="hidden lg:flex w-full max-w-sm items-center relative">
          <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Global search..."
            className="pl-9 h-9 rounded-full bg-muted/40 border-border/40 focus:bg-background transition-all"
          />
          <div className="absolute right-2 flex items-center gap-1">
            <Badge variant="outline" className="h-5 px-1.5 text-[10px] text-muted-foreground">⌘K</Badge>
          </div>
        </div>

        {/* Right Side: Org Switcher & Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <OrganizationSwitcher />
          </div>

          <div className="h-8 w-[1px] bg-border/40 hidden md:block" />

          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground relative rounded-full">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-background" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 p-0 overflow-hidden cursor-pointer">
                <UserCircle className="h-full w-full stroke-1 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 rounded-xl" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Admin User</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    admin@futurefirm.net
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer text-rose-600 focus:text-rose-600">
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
