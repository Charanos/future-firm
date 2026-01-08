"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const tabs = [
    { name: "General", href: "/settings" },
    { name: "Branding", href: "/settings/branding" },
    { name: "Members", href: "/settings/members" },
    { name: "Billing", href: "/settings/billing" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your organization settings and preferences.
        </p>
      </div>

      <Tabs value={pathname} className="w-full">
        <TabsList className="w-full justify-start h-auto p-0 bg-transparent">
          {tabs.map((tab) => (
            <Link key={tab.href} href={tab.href}>
              <TabsTrigger
                value={tab.href}
                className={cn(
                  "rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none"
                )}
              >
                {tab.name}
              </TabsTrigger>
            </Link>
          ))}
        </TabsList>
      </Tabs>

      <div className="mt-4">{children}</div>
    </div>
  );
}
