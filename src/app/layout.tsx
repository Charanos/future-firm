import type { Metadata } from "next";
import { Nunito, Montserrat } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { OrganizationThemeProvider } from "@/components/providers/OrganizationThemeProvider";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Future Firm Billing System",
  description: "Multi-tenant SaaS billing and management dashboard for ISPs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${nunito.variable} ${montserrat.variable} antialiased`}
        style={{ fontFamily: 'var(--font-nunito), ui-sans-serif, system-ui, sans-serif' }}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <OrganizationThemeProvider>{children}</OrganizationThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
