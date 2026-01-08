"use client";

import { useEffect } from "react";
import { useOrganizationStore } from "@/store/organizationStore";
import { hexToHsl } from "@/lib/branding/colors";

export function OrganizationThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentOrganization } = useOrganizationStore();

  useEffect(() => {
    // Basic branding application
    const root = document.documentElement;

    if (currentOrganization?.branding?.primaryColor) {
      const primaryHsl = hexToHsl(currentOrganization.branding.primaryColor);

      // Update CSS variables for Shadcn/Tailwind
      root.style.setProperty("--primary", primaryHsl);
      // Also update ring for focus states
      root.style.setProperty("--ring", primaryHsl);

      // Calculate a foreground color (simple logic: mostly white unless very light background)
      // For MVP, assuming branding colors are generally dark enough for white text
      // Ideally, we'd check contrast
      root.style.setProperty("--primary-foreground", "210 40% 98%");
    } else {
      // Reset to default (Future Optics Blue)
      root.style.removeProperty("--primary");
      root.style.removeProperty("--primary-foreground");
      root.style.removeProperty("--ring");
    }
  }, [currentOrganization]);

  return <>{children}</>;
}
