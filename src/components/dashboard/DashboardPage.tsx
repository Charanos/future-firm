"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CreateCustomerModal } from "@/components/modals/CreateCustomerModal";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  ArrowDownRight,
  ArrowUpRight,
  ChevronDown,
  LayoutGrid,
  MoreHorizontal,
  Settings2,
  Signal,
  Users,
  Wifi,
  Globe,
  CreditCard,
  Sun,
  Moon,
  Monitor,
  X,
  Check,
  Clock,
  FileText,
  PanelRightOpen,
  TrendingUp,
  Download,
  CheckCircle2,
  Router,
  MessageSquare,
  Network,
  ChevronRight,
} from "lucide-react";

/* Mock data */
type RangeKey = "7d" | "30d" | "90d";

const incomeSeriesByRange: Record<RangeKey, { name: string; value: number }[]> = {
  "7d": [
    { name: "Mon", value: 950 },
    { name: "Tue", value: 1200 },
    { name: "Wed", value: 860 },
    { name: "Thu", value: 1500 },
    { name: "Fri", value: 1750 },
    { name: "Sat", value: 2100 },
    { name: "Sun", value: 2400 },
  ],
  "30d": Array.from({ length: 30 }).map((_, i) => ({
    name: `${i + 1}`,
    value: Math.round(900 + Math.sin(i / 3) * 350 + (i % 7) * 55),
  })),
  "90d": Array.from({ length: 12 }).map((_, i) => ({
    name: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i],
    value: Math.round(12000 + Math.sin(i / 2) * 2400 + i * 380),
  })),
};

const entriesData = [
  { name: "00", value: 8 },
  { name: "04", value: 18 },
  { name: "08", value: 12 },
  { name: "12", value: 28 },
  { name: "16", value: 22 },
  { name: "20", value: 35 },
  { name: "23", value: 16 },
];

const sidebarDailyData = [
  { name: "04", value: 8 },
  { name: "05", value: 18 },
  { name: "06", value: 12 },
  { name: "07", value: 28 },
  { name: "08", value: 22 },
  { name: "09", value: 14 },
];

const packageRows = [
  { pkg: "1HR", type: "Hotspot", subs: 5, revenue: 50 },
  { pkg: "3hrs", type: "Hotspot", subs: 4, revenue: 80 },
  { pkg: "6HRS", type: "Hotspot", subs: 1, revenue: 30 },
  { pkg: "12HRS", type: "Hotspot", subs: 1, revenue: 50 },
  { pkg: "Koboleh", type: "Hotspot", subs: 1, revenue: 5 },
];

const topAccounts = [
  { name: "Kkitchen", usage: 0.0 },
  { name: "Betty.wameni", usage: 0.0 },
  { name: "Msoo", usage: 0.0 },
  { name: "Morrischuiarcade", usage: 0.0 },
  { name: "DollarSmartH/ware", usage: 0.0 },
];

const siteStats = { total: 2, inactive: 0, online: 1, offline: 1 };

const invoicesData = [
  { id: "INV-001", customer: "Grace Ngere", amount: 1500, date: "Jan 05, 2026", status: "paid", package: "7Mbps" },
  { id: "INV-002", customer: "Ruth Legacy", amount: 2500, date: "Jan 04, 2026", status: "pending", package: "10Mbps" },
  { id: "INV-003", customer: "George Thagana", amount: 1800, date: "Jan 03, 2026", status: "paid", package: "15Mbps" },
  { id: "INV-004", customer: "Maloba", amount: 3200, date: "Jan 02, 2026", status: "overdue", package: "20Mbps" },
];

const paymentsData = [
  { id: "PAY-001", provider: "M-Pesa", amount: 4300, date: "Jan 05, 2026", status: "completed", ref: "MPESA123456" },
  { id: "PAY-002", provider: "Stripe", amount: 2950, date: "Jan 04, 2026", status: "completed", ref: "STRIPE789" },
  { id: "PAY-003", provider: "PayPal", amount: 1500, date: "Jan 03, 2026", status: "pending", ref: "PP456789" },
  { id: "PAY-004", provider: "M-Pesa", amount: 1800, date: "Jan 02, 2026", status: "completed", ref: "MPESA654321" },
];

const paymentMethodBars = [
  { name: "Stripe", value: 48 },
  { name: "M-Pesa", value: 32 },
  { name: "PayPal", value: 20 },
];

function formatKsh(n: number) {
  return `Ksh ${Math.round(n).toLocaleString("en-KE")}`;
}

function pct(a: number, b: number) {
  return b === 0 ? 0 : Math.round((a / b) * 100);
}

// Memoized StatusChip
const StatusChip = React.memo(({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    paid: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800",
    completed: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800",
    pending: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800",
    overdue: "bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-900/30 dark:text-rose-400 dark:border-rose-800",
  };

  const icons: Record<string, React.ReactNode> = {
    paid: <Check className="h-3 w-3" />,
    completed: <Check className="h-3 w-3" />,
    pending: <Clock className="h-3 w-3" />,
    overdue: <X className="h-3 w-3" />,
  };

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${styles[status] || styles.pending}`}>
      {icons[status]}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
});

StatusChip.displayName = "StatusChip";

// Memoized MiniChart component
const MiniChart = React.memo(({ data }: { data: any[] }) => (
  <div className="h-9 w-28">
    <ResponsiveContainer width="100%" height="100%" minWidth={0}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="incomeMini" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.28} />
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area type="monotone" dataKey="value" stroke="#3b82f6" fill="url(#incomeMini)" strokeWidth={2} dot={false} />
      </AreaChart>
    </ResponsiveContainer>
  </div>
));

MiniChart.displayName = "MiniChart";

export default function DashboardPage() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [range, setRange] = React.useState<RangeKey>("7d");
  const [customizerOpen, setCustomizerOpen] = React.useState(false);
  const [activeDrawer, setActiveDrawer] = React.useState<string | null>(null);
  const [layout, setLayout] = React.useState<"expanded" | "collapsed">("expanded");
  const [direction, setDirection] = React.useState<"ltr" | "rtl">("ltr");
  const [borderedTheme, setBorderedTheme] = React.useState(false);
  const [realtimePreview, setRealtimePreview] = React.useState(true);
  const [showAddClientModal, setShowAddClientModal] = React.useState(false);

  const incomeSeries = React.useMemo(() => incomeSeriesByRange[range], [range]);
  const miniChartData = React.useMemo(() => incomeSeries.slice(-7), [incomeSeries]);

  const totalUsers = 753;
  const activeUsers = 79;
  const expiredUsers = 123;
  const totalOnline = 81;
  const onlinePPPoE = 75;
  const onlineHotspot = 6;
  const dailyClients = 12;
  const dailyActiveClients = 101;
  const incomeToday = 215;
  const periodIncome = range === "7d" ? 19590 : range === "30d" ? 84520 : 195900;
  const monthlyReport = 19590;
  const yearlyReport = 19590;
  const activeClientsPct = pct(activeUsers, totalUsers);
  const deltaIncome = range === "7d" ? -64 : range === "30d" ? 12 : 28;

  React.useEffect(() => {
    document.documentElement.dir = direction;
  }, [direction]);

  return (
    <div className="space-y-6 pb-10" dir={direction} data-bordered={borderedTheme ? "true" : undefined}>
      <CreateCustomerModal
        open={showAddClientModal}
        onOpenChange={setShowAddClientModal}
      />
      <div className="grid gap-6 xl:grid-cols-12">
        <div className="xl:col-span-12">
          <div className="space-y-6">
            {/* Hero Section - Simplified animations */}
            <Card className="rounded-[24px] border-none shadow-lg bg-card overflow-hidden">
              <CardContent className="p-0">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full -mr-48 -mt-48 blur-3xl" />
                  <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/5 rounded-full -ml-36 -mb-36 blur-3xl" />
                </div>

                <div className="relative p-8 md:p-10 grid md:grid-cols-2 gap-8 items-center min-h-[280px]">
                  <div className="space-y-6">
                    <div>
                      <div className="inline-flex items-center gap-2 mb-3">
                        <div className="h-2.5 w-2.5 rounded-full bg-primary/40" />
                        <span className="text-xs font-medium text-muted-foreground tracking-widest uppercase">
                          ISP Management Dashboard
                        </span>
                      </div>

                      <h1 className="text-3xl md:text-4.5xl font-medium text-foreground tracking-tight">
                        Welcome Back, <span className="text-primary font-semibold">FUTURE OPTICS!</span>
                      </h1>

                      <p className="text-muted-foreground text-sm md:text-base mt-2">
                        Jan 7, 2026 • Real-time business metrics
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-4 pt-2">
                      <div className="flex items-center gap-3 bg-muted/30 backdrop-blur-sm rounded-full px-4 py-2 border border-border/40">
                        <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                          <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">Active Sites</div>
                          <div className="text-lg font-semibold text-foreground">{siteStats.online}/{siteStats.total}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 bg-muted/30 backdrop-blur-sm rounded-full px-4 py-2 border border-border/40">
                        <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                          <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">Total Users</div>
                          <div className="text-lg font-semibold text-foreground">{totalUsers}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 bg-muted/40 backdrop-blur-md rounded-2xl p-4 border border-border/40 hover:bg-muted/60 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="text-muted-foreground text-sm font-medium">Today's Income</p>
                          <div className="text-3xl md:text-4xl font-semibold text-foreground mt-1">{formatKsh(incomeToday)}</div>
                        </div>
                        <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                          <TrendingUp className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                      <div className="flex items-center gap-2 pt-2 border-t border-border/30">
                        <span className="text-xs text-muted-foreground">vs yesterday</span>
                        <Badge className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 border-0">+12%</Badge>
                      </div>
                    </div>

                    <div className="bg-muted/40 backdrop-blur-md rounded-2xl p-4 border border-border/40 hover:bg-muted/60 transition-colors">
                      <p className="text-muted-foreground text-xs font-medium mb-1">Active Clients</p>
                      <div className="flex items-end justify-between">
                        <div className="text-3xl font-semibold text-foreground">{activeUsers}</div>
                        <Badge className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border-0">{activeClientsPct}%</Badge>
                      </div>
                    </div>

                    <div className="bg-muted/40 backdrop-blur-md rounded-2xl p-4 border border-border/40 hover:bg-muted/60 transition-colors">
                      <p className="text-muted-foreground text-xs font-medium mb-1">Online Now</p>
                      <div className="flex items-end justify-between">
                        <div className="text-3xl font-semibold text-foreground">{totalOnline}</div>
                        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative border-t border-border/30 px-8 md:px-10 py-4 flex flex-wrap items-center justify-between gap-4 bg-muted/20">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 font-medium shadow-lg">
                    View Sales Report <ArrowUpRight className="h-4 w-4 ml-1" />
                  </Button>

                  <div className="flex items-center gap-2">
                    <Tabs value={range} onValueChange={(v) => setRange(v as RangeKey)}>
                      <TabsList className="rounded-full bg-muted/30 border border-border/40 backdrop-blur-sm">
                        <TabsTrigger value="7d" className="rounded-full">7d</TabsTrigger>
                        <TabsTrigger value="30d" className="rounded-full">30d</TabsTrigger>
                        <TabsTrigger value="90d" className="rounded-full">90d</TabsTrigger>
                      </TabsList>
                    </Tabs>

                    <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
                      <MoreHorizontal className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>



            {/* Main Content Grid */}
            <div className="grid gap-6 lg:grid-cols-12">
              {/* Left Column: Client Statistics & Income (8 cols) */}
              <div className="lg:col-span-8 space-y-6">
                {/* Client Statistics Grid */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {[
                    { label: "Total Users", value: 839, icon: Users, color: "text-indigo-500", bg: "bg-indigo-500/10", border: "ring-indigo-500/20", bar: "bg-indigo-500", trend: "+12%", trendUp: true },
                    { label: "Active Users", value: 121, icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-500/10", border: "ring-emerald-500/20", bar: "bg-emerald-500", trend: "+8%", trendUp: true },
                    { label: "Expired Users", value: 121, icon: Clock, color: "text-rose-500", bg: "bg-rose-500/10", border: "ring-rose-500/20", bar: "bg-rose-500", trend: "-2%", trendUp: false },
                    { label: "Total Online", value: 122, icon: Wifi, color: "text-green-500", bg: "bg-green-500/10", border: "ring-green-500/20", bar: "bg-green-500", trend: "+5%", trendUp: true },
                    { label: "Online PPPoE", value: 86, icon: Network, color: "text-cyan-500", bg: "bg-cyan-500/10", border: "ring-cyan-500/20", bar: "bg-cyan-500", trend: "0%", trendUp: true },
                    { label: "Online Hotspot", value: 36, icon: Signal, color: "text-orange-500", bg: "bg-orange-500/10", border: "ring-orange-500/20", bar: "bg-orange-500", trend: "+15%", trendUp: true },
                  ].map((stat, i) => (
                    <Card key={i} className="group relative overflow-hidden rounded-[24px] border border-border/40 bg-card/60 backdrop-blur-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
                      {/* Decorative Gradient Blob */}
                      <div className={`absolute -right-10 -top-10 h-12 w-12 rounded-full ${stat.bg} blur-3xl opacity-20 group-hover:opacity-60 transition-opacity duration-500`} />

                      <CardContent className="py-1 px-4 flex flex-col justify-between h-full relative z-10">
                        <div className="flex justify-between items-start mb-4">
                          <div className={`h-11 w-11 rounded-2xl flex items-center justify-center ${stat.bg} ${stat.color} ring-1 ring-inset ${stat.border}`}>
                            <stat.icon className="h-5 w-5" />
                          </div>
                          <div className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full ${stat.trendUp ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'}`}>
                            {stat.trendUp ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                            {stat.trend}
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="text-3xl font-bold font-numbers tracking-tight text-foreground">
                            {stat.value}
                          </div>
                          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</div>
                        </div>

                        <div className="mt-4 h-1 w-full bg-secondary/50 rounded-full overflow-hidden">
                          <div className={`h-full ${stat.bar} rounded-full opacity-80`} style={{ width: `${Math.random() * 40 + 40}%` }} />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Income Reports Section */}
                {/* Income Reports Section - Overhauled to match Right Column height */}
                <Card className="rounded-3xl border-border/40 shadow-xl bg-gradient-to-br from-card/80 via-card/50 to-card/80 backdrop-blur-xl overflow-hidden flex flex-col min-h-[650px]">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div>
                      <CardTitle className="text-lg font-heading">Financial Overview</CardTitle>
                      <p className="text-sm text-muted-foreground">Revenue trends & performance analysis</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Tabs value={range} onValueChange={(v) => setRange(v as RangeKey)} className="w-[180px]">
                        <TabsList className="grid w-full grid-cols-3 h-8 bg-muted/60">
                          <TabsTrigger value="7d" className="text-xs h-6">7d</TabsTrigger>
                          <TabsTrigger value="30d" className="text-xs h-6">30d</TabsTrigger>
                          <TabsTrigger value="90d" className="text-xs h-6">90d</TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 p-6 flex flex-col gap-6">
                    <div className="flex items-end justify-between">
                      <div>
                        <div className="text-sm font-medium text-muted-foreground mb-1">Total Revenue ({range})</div>
                        <div className="text-4xl font-bold font-numbers text-foreground tracking-tight">{formatKsh(periodIncome)}</div>
                        <div className={`flex items-center gap-2 mt-2 text-sm font-medium ${deltaIncome >= 0 ? "text-emerald-500" : "text-rose-500"}`}>
                          <span className={`${deltaIncome >= 0 ? "bg-emerald-500/10" : "bg-rose-500/10"} px-2 py-0.5 rounded-full`}>
                            {deltaIncome > 0 ? "+" : ""}{deltaIncome}%
                          </span>
                          <span className="text-muted-foreground">vs previous period</span>
                        </div>
                      </div>
                      <div className="hidden sm:block text-right">
                        <div className="text-sm font-medium text-muted-foreground mb-1">Average Daily</div>
                        <div className="text-2xl font-semibold font-numbers">{formatKsh(periodIncome / (range === '7d' ? 7 : range === '30d' ? 30 : 90))}</div>
                      </div>
                    </div>

                    <div className="w-full h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={incomeSeries}>
                          <defs>
                            <linearGradient id="incomeMain" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" strokeOpacity={0.4} />
                          <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                            dy={10}
                          />
                          <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                            tickFormatter={(value) => `Ksh${value / 1000}k`}
                            width={60}
                          />
                          <Tooltip
                            cursor={{ stroke: 'hsl(var(--muted-foreground))', strokeWidth: 1, strokeDasharray: '4 4' }}
                            contentStyle={{
                              borderRadius: "12px",
                              border: "1px solid hsl(var(--border))",
                              backgroundColor: "hsl(var(--card))",
                              fontSize: "12px",
                              boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                            }}
                          />
                          <Area
                            type="monotone"
                            dataKey="value"
                            stroke="hsl(var(--primary))"
                            strokeWidth={3}
                            fill="url(#incomeMain)"
                            activeDot={{ r: 6, strokeWidth: 0, fill: "hsl(var(--primary))" }}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column: Quick Actions (4 cols) */}
              <div className="lg:col-span-4 space-y-6">
                <div className="flex flex-col gap-3">
                  {[
                    { label: "Add Client", action: () => setShowAddClientModal(true), icon: Users },
                    { label: "Reports", href: "/reports", icon: FileText },
                    { label: "Sites", href: "/sites", icon: Router }, // Using Lucide Router explicitly, ensure import
                    { label: "Bulk Message", href: "/messages?action=bulk", icon: MessageSquare }, // Ensure MessageSquare imported
                    { label: "Export Clients", href: "/users?action=export", icon: Download },
                    { label: "CRM", href: "/crm", icon: LayoutGrid },
                  ].map((btn, i) => (
                    <button
                      key={i}
                      onClick={() => btn.action ? btn.action() : btn.href && router.push(btn.href)}
                      className="w-full py-4 px-5 rounded-2xl bg-card border border-border/40 hover:bg-muted/50 backdrop-blur-sm text-foreground font-medium transition-all duration-200 hover:scale-[1.02] hover:shadow-lg text-left cursor-pointer flex items-center justify-between group"
                    >
                      <span className="flex items-center gap-4">
                        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          <btn.icon className="h-4 w-4" />
                        </div>
                        <span className="text-sm font-semibold">{btn.label}</span>
                      </span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </button>
                  ))}
                </div>

                {/* Daily Entries Graph - Right Column */}
                <Card className="rounded-[24px] border-none shadow-sm bg-card text-foreground overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-medium">Daily Entries</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <div className="h-[400px] w-full mt-2">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={sidebarDailyData}>
                          <CartesianGrid strokeDasharray="5 5" vertical={true} horizontal={false} stroke="hsl(var(--border))" strokeOpacity={0.6} />
                          <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                            dy={10}
                          />
                          <Line
                            type="linear"
                            dataKey="value"
                            stroke="hsl(var(--primary))"
                            strokeWidth={2}
                            dot={{ fill: 'hsl(var(--primary))', r: 4, strokeWidth: 0 }}
                            activeDot={{ r: 6 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="text-2xl font-bold">22 Clients</div>
                      <div className="text-rose-500 font-medium">--71.43%</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Invoice/Payment Tables */}
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="rounded-[24px] border-none shadow-sm bg-card">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <CardTitle className="text-base font-semibold">Recent Invoices</CardTitle>
                  </div>
                  <Button variant="outline" size="sm" className="h-8 rounded-full">View All</Button>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="bg-muted/30 px-6 py-2 grid grid-cols-5 text-xs font-medium text-muted-foreground">
                    <span>Invoice</span>
                    <span>Customer</span>
                    <span>Amount</span>
                    <span>Status</span>
                    <span className="text-right">Action</span>
                  </div>
                  <div className="px-4 py-2 space-y-1">
                    {invoicesData.slice(0, 4).map((inv) => (
                      <div key={inv.id} className="grid grid-cols-5 items-center text-sm py-2 px-2 rounded-xl hover:bg-muted/50 transition-colors">
                        <span className="font-medium text-xs">{inv.id}</span>
                        <span className="text-muted-foreground truncate text-xs">{inv.customer}</span>
                        <span className="font-medium text-xs">{formatKsh(inv.amount)}</span>
                        <StatusChip status={inv.status} />
                        <div className="flex justify-end">
                          <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full">
                            <Download className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-[24px] border-none shadow-sm bg-card">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                    <CardTitle className="text-base font-semibold">Recent Payments</CardTitle>
                  </div>
                  <Button variant="outline" size="sm" className="h-8 rounded-full">View All</Button>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="bg-muted/30 px-6 py-2 grid grid-cols-5 text-xs font-medium text-muted-foreground">
                    <span>Provider</span>
                    <span>Reference</span>
                    <span>Amount</span>
                    <span>Status</span>
                    <span className="text-right">Action</span>
                  </div>
                  <div className="px-4 py-2 space-y-1">
                    {paymentsData.map((pay) => (
                      <div key={pay.id} className="grid grid-cols-5 items-center text-sm py-2 px-2 rounded-xl hover:bg-muted/50 transition-colors">
                        <span className="font-medium text-xs">{pay.provider}</span>
                        <span className="text-muted-foreground text-xs font-mono">{pay.ref}</span>
                        <span className="font-medium text-xs">{formatKsh(pay.amount)}</span>
                        <StatusChip status={pay.status} />
                        <div className="flex justify-end">
                          <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full">
                            <Download className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts section */}
            <div className="grid gap-6 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <Card className="rounded-3xl border-border/40 shadow-xl bg-card/80 backdrop-blur-xl h-full flex flex-col">
                  <CardHeader className="flex flex-row items-center justify-between pb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-11 w-11 rounded-2xl bg-primary/10 flex items-center justify-center">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg font-heading">Daily Entries</CardTitle>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                          <Badge variant="secondary" className="rounded-full text-xs">{dailyClients} Clients</Badge>
                          <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
                          <span className="flex items-center gap-1">
                            <span className="h-2 w-2 rounded-full bg-rose-500/60" />
                            -66.67%
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="rounded-full cursor-pointer hover:bg-muted/60">
                      <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
                    </Button>
                  </CardHeader>

                  <CardContent className="flex-1 pb-0">
                    <div className="mb-4">
                      <div className="text-4xl font-numbers font-semibold">
                        {dailyActiveClients}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">Active Clients Today</div>
                    </div>

                    <div className="h-[200px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={entriesData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                          <defs>
                            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.1} />
                          <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                          />
                          <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                            width={35}
                          />
                          <Tooltip
                            cursor={{ fill: 'hsl(var(--muted) / 0.3)' }}
                            contentStyle={{
                              borderRadius: "12px",
                              border: "1px solid hsl(var(--border) / 0.4)",
                              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                              backgroundColor: "hsl(var(--card))",
                            }}
                            labelStyle={{ fontWeight: 600, color: 'hsl(var(--foreground))' }}
                          />
                          <Bar
                            dataKey="value"
                            fill="url(#barGradient)"
                            radius={[8, 8, 0, 0]}
                            maxBarSize={40}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>

                  <div className="px-6 py-4 border-t border-border/30 flex items-center justify-between text-xs text-muted-foreground">
                    <span>{activeClientsPct}% active Clients out of <strong className="text-foreground font-numbers">{totalUsers}</strong></span>
                    <ChevronDown className="h-4 w-4 -rotate-90 cursor-pointer hover:text-foreground transition-colors" />
                  </div>
                </Card>
              </div>

              <div className="lg:col-span-5">
                <Card className="rounded-3xl border-border/40 shadow-xl bg-card/80 backdrop-blur-xl h-full flex flex-col">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="h-11 w-11 rounded-2xl bg-primary/10 flex items-center justify-center">
                          <Wifi className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-heading text-lg font-semibold">Packages</div>
                          <div className="text-xs text-muted-foreground mt-0.5">Service Type • Subscription • Revenue</div>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="rounded-full cursor-pointer hover:bg-muted/60">
                        <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-4 text-xs font-medium text-muted-foreground border-b border-border/30 pb-2">
                      <span>Package</span>
                      <span>Service Type</span>
                      <span className="text-center">Subscription</span>
                      <span className="text-right">Revenue</span>
                    </div>
                  </CardHeader>

                  <CardContent className="flex-1 pt-2 overflow-y-auto">
                    <div className="space-y-2">
                      {packageRows.map((r, idx) => (
                        <div key={idx} className="grid grid-cols-4 items-center text-sm rounded-2xl px-3 py-2.5 hover:bg-muted/40 transition-colors cursor-pointer">
                          <span className="font-medium font-heading">{r.pkg}</span>
                          <span className="inline-flex items-center gap-2 text-muted-foreground">
                            <span className="h-7 px-2 rounded-xl bg-muted/60 inline-flex items-center gap-1 text-xs">
                              <LayoutGrid className="h-3.5 w-3.5" />
                              {r.type}
                            </span>
                          </span>
                          <span className="text-center">
                            <span className="inline-flex items-center justify-center min-w-8 h-7 rounded-xl bg-primary/10 font-semibold font-numbers text-xs">{r.subs}</span>
                          </span>
                          <span className="text-right text-muted-foreground font-numbers">{formatKsh(r.revenue)}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Site Statistics + Account Usage */}
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="rounded-[24px] border-none shadow-sm bg-card">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-9 w-9 rounded-2xl bg-muted flex items-center justify-center">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div>
                        <div className="font-semibold">Site Statistics</div>
                        <div className="text-xs text-muted-foreground">Site Status Overview</div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="pt-2">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 hover:scale-[1.02] transition-transform">
                      <div className="text-sm text-blue-600 dark:text-blue-400">Total</div>
                      <div className="text-3xl font-semibold mt-1">{siteStats.total}</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-500/10 border border-slate-500/20 hover:scale-[1.02] transition-transform">
                      <div className="text-sm text-slate-600 dark:text-slate-400">Inactive</div>
                      <div className="text-3xl font-semibold mt-1">{siteStats.inactive}</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 hover:scale-[1.02] transition-transform">
                      <div className="text-sm text-emerald-600 dark:text-emerald-400">Online</div>
                      <div className="text-3xl font-semibold mt-1">{siteStats.online}</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 hover:scale-[1.02] transition-transform">
                      <div className="text-sm text-rose-600 dark:text-rose-400">Offline</div>
                      <div className="text-3xl font-semibold mt-1">{siteStats.offline}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-[24px] border-none shadow-sm bg-card">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-9 w-9 rounded-2xl bg-muted flex items-center justify-center">
                        <Users className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div>
                        <div className="font-semibold">Account Usage</div>
                        <div className="text-xs text-muted-foreground">Top Accounts by Usage</div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
                    </Button>
                  </div>

                  <div className="mt-4 grid grid-cols-2 text-xs font-medium text-muted-foreground border-b border-border/60 pb-2">
                    <span>Account</span>
                    <span className="text-right">Usage (GB)</span>
                  </div>
                </CardHeader>

                <CardContent className="pt-2">
                  <div className="space-y-2">
                    {topAccounts.map((account, idx) => (
                      <div key={idx} className="grid grid-cols-2 items-center text-sm rounded-2xl px-3 py-2 hover:bg-muted/40 transition-colors">
                        <span className="font-medium truncate text-muted-foreground">{account.name}</span>
                        <span className="text-right text-muted-foreground">{account.usage.toFixed(2)} GB</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Customizer Floating Panel */}
        <AnimatePresence>
          {customizerOpen && (
            <>
              <motion.div
                key="backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
                onClick={() => setCustomizerOpen(false)}
              />

              <motion.div
                key="customizer"
                className="fixed right-6 top-4 z-50 w-96 max-h-[calc(100vh-50px)]"
                initial={{ opacity: 0, x: 100, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 100, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="rounded-[24px] border-none shadow-lg bg-card overflow-hidden h-full flex flex-col">
                  <CardHeader className="pb-2 flex-shrink-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-base font-semibold">Template Customizer</CardTitle>
                        <div className="text-xs text-muted-foreground mt-1">Customize and preview in real time</div>
                      </div>
                      <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setCustomizerOpen(false)}>
                        <X className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </div>
                  </CardHeader>

                  <CardContent className="flex-1 overflow-y-auto p-6 space-y-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">Theming</div>
                        <Badge variant="secondary" className="rounded-full">{realtimePreview ? "Live" : "Paused"}</Badge>
                      </div>

                      <div className="rounded-2xl border border-border/60 p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium text-muted-foreground">Style (Mode)</div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">Preview</span>
                            <Switch checked={realtimePreview} onCheckedChange={setRealtimePreview} />
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                          <Button
                            variant={theme === "light" ? "default" : "outline"}
                            className="w-full rounded-xl h-10 gap-2"
                            onClick={() => setTheme("light")}
                          >
                            <Sun className="h-4 w-4" /> Light
                          </Button>
                          <Button
                            variant={theme === "dark" ? "default" : "outline"}
                            className="w-full rounded-xl h-10 gap-2"
                            onClick={() => setTheme("dark")}
                          >
                            <Moon className="h-4 w-4" /> Dark
                          </Button>
                          <Button
                            variant={theme === "system" ? "default" : "outline"}
                            className="w-full rounded-xl h-10 gap-2"
                            onClick={() => setTheme("system")}
                          >
                            <Monitor className="h-4 w-4" /> System
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="text-sm font-medium">Themes</div>
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          variant={!borderedTheme ? "default" : "outline"}
                          className="w-full rounded-xl h-10"
                          onClick={() => setBorderedTheme(false)}
                        >
                          Default
                        </Button>
                        <Button
                          variant={borderedTheme ? "default" : "outline"}
                          className="w-full rounded-xl h-10"
                          onClick={() => setBorderedTheme(true)}
                        >
                          Bordered
                        </Button>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <div className="text-sm font-medium">Layout</div>

                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          variant={layout === "expanded" ? "default" : "outline"}
                          className="w-full rounded-xl h-10"
                          onClick={() => setLayout("expanded")}
                        >
                          Expanded
                        </Button>
                        <Button
                          variant={layout === "collapsed" ? "default" : "outline"}
                          className="w-full rounded-xl h-10"
                          onClick={() => setLayout("collapsed")}
                        >
                          Collapsed
                        </Button>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          variant={direction === "ltr" ? "default" : "outline"}
                          className="w-full rounded-xl h-10"
                          onClick={() => setDirection("ltr")}
                        >
                          LTR (En)
                        </Button>
                        <Button
                          variant={direction === "rtl" ? "default" : "outline"}
                          className="w-full rounded-xl h-10"
                          onClick={() => setDirection("rtl")}
                        >
                          RTL (Ar)
                        </Button>
                      </div>

                      <div className="rounded-2xl border border-border/60 p-4">
                        <div className="text-sm font-medium">Preview Snapshot</div>
                        <div className="mt-2 text-xs text-muted-foreground space-y-1">
                          <div suppressHydrationWarning>Mode: {theme}</div>
                          <div>Theme: {borderedTheme ? "bordered" : "default"}</div>
                          <div>Layout: {layout}</div>
                          <div>Direction: {direction}</div>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">Bill Payments</div>
                        <Button variant="outline" size="sm" className="h-8 rounded-full">Filter</Button>
                      </div>

                      <div className="rounded-2xl border border-border/60 p-4">
                        <div className="flex items-center justify-between">
                          <div className="text-2xl font-semibold">{formatKsh(paymentsData[0].amount)}</div>
                          <div className="h-9 w-28">
                            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                              <BarChart data={paymentMethodBars}>
                                <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 8, 8]} />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                        <div className="mt-2 text-xs text-muted-foreground">Payment methods share</div>

                        <div className="mt-4 space-y-3">
                          {paymentsData.slice(0, 3).map((p, idx) => (
                            <div key={idx} className="flex items-center justify-between hover:translate-x-1 transition-transform">
                              <div className="flex items-center gap-3">
                                <div className="h-9 w-9 rounded-2xl bg-muted flex items-center justify-center">
                                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <div>
                                  <div className="text-sm font-medium">{p.provider}</div>
                                  <div className="text-[11px] text-muted-foreground">{p.date}</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-sm font-medium">{formatKsh(p.amount)}</div>
                                <StatusChip status={p.status} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <Button className="w-full rounded-xl h-11">Save preferences</Button>
                  </CardContent>
                </Card>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {!customizerOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed right-6 bottom-24 z-50"
          >
            <Button size="lg" className="rounded-full h-14 w-14 shadow-lg" onClick={() => setCustomizerOpen(true)}>
              <PanelRightOpen className="h-5 w-5" />
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}