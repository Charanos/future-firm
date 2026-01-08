"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
    Users,
    UserCheck,
    UserX,
    UserMinus,
    Download,
    Upload,
    Plus,
    RefreshCw,
    MoreVertical,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CreateCustomerModal } from "@/components/modals/CreateCustomerModal";
import { SearchFilterBar, FilterConfig } from "@/components/ui/search-filter-bar";
import { StatsCard } from "@/components/ui/stats-card";

// Mock data
interface Customer {
    id: string;
    fullname: string;
    account: string;
    phone: string;
    plan: string;
    status: "Active" | "Expired" | "Disabled" | "Paused";
    online: "Online" | "Offline";
    location: string;
    expiry: string;
}

const mockCustomers: Customer[] = [
    { id: "1", fullname: "Aa Hart Wambui", account: "HarpHelmer", phone: "254701007518", plan: "7Mbps", status: "Active", online: "Offline", location: "Kamukunji", expiry: "2026-01-20 12:00:00" },
    { id: "2", fullname: "Adalla Wanjoqi", account: "Wanjoqs", phone: "254704692072", plan: "7Mbps", status: "Active", online: "Offline", location: "Dubois road", expiry: "2026-01-20 12:00:00" },
    { id: "3", fullname: "Adwan Mama", account: "AdwanmamaMcsan", phone: "254717183345", plan: "7Mbps", status: "Expired", online: "Offline", location: "Kamukunji", expiry: "2025-12-19 12:00:00" },
    { id: "4", fullname: "Ahmad Kintu", account: "AI-AMTARA", phone: "254720572846", plan: "25Mbps", status: "Expired", online: "Offline", location: "Accraroad", expiry: "2026-01-03 12:00:00" },
    { id: "5", fullname: "Allan Majere", account: "FastDealGikomba", phone: "254791038471", plan: "7Mbps", status: "Expired", online: "Offline", location: "Mufangano", expiry: "2025-08-04 12:00:00" },
    { id: "6", fullname: "Aman Mkaina", account: "Mkaina", phone: "254791508183", plan: "7Mbps", status: "Active", online: "Offline", location: "Kamukunji", expiry: "2026-01-05 12:00:00" },
    { id: "7", fullname: "Angela Mukira", account: "AngelaMukeekt", phone: "254740509426", plan: "7Mbps", status: "Active", online: "Offline", location: "Gikomba", expiry: "2026-01-09 12:00:00" },
    { id: "8", fullname: "Ann Shelisa", account: "Ann.Ng@consumer", phone: "254706398468", plan: "7Mbps", status: "Expired", online: "Offline", location: "Ngara", expiry: "2025-11-20 17:26:58" },
];

export default function CRMPageContent() {
    const router = useRouter();
    const [customers, setCustomers] = React.useState<Customer[]>(mockCustomers);
    const [activeTab, setActiveTab] = React.useState<"pppoe" | "hotspot">("pppoe");
    const [rowsPerPage, setRowsPerPage] = React.useState("25");
    const [currentPage, setCurrentPage] = React.useState(1);
    const [createModalOpen, setCreateModalOpen] = React.useState(false);

    const totalUsers = 377;
    const activeUsers = 121;
    const suspendedUsers = 2;
    const expiredUsers = 256;

    const pppoeCount = 186;
    const hotspotCount = 181;

    // Pagination
    const indexOfLastRow = currentPage * parseInt(rowsPerPage);
    const indexOfFirstRow = indexOfLastRow - parseInt(rowsPerPage);
    const currentRows = customers.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(customers.length / parseInt(rowsPerPage));

    const handleSearch = (query: string) => {
        console.log("Searching:", query);
        // Implement search logic
    };

    const handleFilterChange = (key: string, value: string) => {
        console.log("Filter changed:", key, value);
        // Implement filter logic
    };

    const filters: FilterConfig[] = [
        {
            key: "site",
            label: "Site: All",
            options: [
                { label: "Site: All", value: "All" },
                { label: "Site: CBD", value: "CBD" },
                { label: "Site: futur941", value: "futur941" },
            ],
            defaultValue: "All"
        },
        {
            key: "status",
            label: "Status: All",
            options: [
                { label: "Status: All", value: "All" },
                { label: "Status: Active", value: "Active" },
                { label: "Status: Expired", value: "Expired" },
                { label: "Status: Disabled", value: "Disabled" },
                { label: "Status: Paused", value: "Paused" },
            ],
            defaultValue: "All"
        },
        {
            key: "connection",
            label: "Conn: All",
            options: [
                { label: "Conn: All", value: "All" },
                { label: "Conn: Online", value: "Online" },
                { label: "Conn: Offline", value: "Offline" },
            ],
            defaultValue: "All"
        },
        {
            key: "package",
            label: "Plan: All",
            options: [
                { label: "Plan: All", value: "All" },
                { label: "Plan: 7Mbps", value: "7Mbps" },
                { label: "Plan: 10MBPS", value: "10MBPS" },
                { label: "Plan: 15MBPS", value: "15MBPS" },
                { label: "Plan: Koboleh", value: "Koboleh" },
                { label: "Plan: 1HR", value: "1HR" },
                { label: "Plan: 3hrs", value: "3hrs" },
                { label: "Plan: 6HRS", value: "6HRS" },
                { label: "Plan: 12HRS", value: "12HRS" },
                { label: "Plan: 24HRS", value: "24HRS" },
                { label: "Plan: 25Mbps", value: "25Mbps" },
            ],
            defaultValue: "All"
        }
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Stats Cards - Standardized */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="TOTAL USERS"
                    value={totalUsers}
                    icon={Users}
                    iconClassName="text-blue-500 bg-blue-500/10"
                />
                <StatsCard
                    title="ACTIVE USERS"
                    value={activeUsers}
                    icon={UserCheck}
                    iconClassName="text-emerald-500 bg-emerald-500/10"
                />
                <StatsCard
                    title="SUSPENDED USERS"
                    value={suspendedUsers}
                    icon={UserMinus}
                    iconClassName="text-orange-500 bg-orange-500/10"
                />
                <StatsCard
                    title="EXPIRED USERS"
                    value={expiredUsers}
                    icon={UserX}
                    iconClassName="text-rose-500 bg-rose-500/10"
                />
            </div>

            {/* Search and Filters - Standardized */}
            <SearchFilterBar
                onSearch={handleSearch}
                onFilterChange={handleFilterChange}
                filters={filters}
                searchPlaceholder="Search customers..."
                actions={
                    <div className="flex flex-wrap items-center gap-2">
                        <div className="flex bg-muted/50 rounded-xl p-1 border border-border/40">
                            <Button
                                variant={activeTab === "pppoe" ? "secondary" : "ghost"}
                                size="sm"
                                onClick={() => setActiveTab("pppoe")}
                                className="rounded-lg h-8"
                            >
                                PPPoE ({pppoeCount})
                            </Button>
                            <Button
                                variant={activeTab === "hotspot" ? "secondary" : "ghost"}
                                size="sm"
                                onClick={() => setActiveTab("hotspot")}
                                className="rounded-lg h-8"
                            >
                                Hotspot ({hotspotCount})
                            </Button>
                        </div>
                        <Button variant="outline" className="rounded-xl h-10 hover:bg-cyan-500/10 hover:text-cyan-500 hover:border-cyan-500/40 transition-colors hidden xl:flex">
                            <Upload className="h-4 w-4 mr-2" />
                            Import
                        </Button>
                        <Button variant="outline" className="rounded-xl h-10 hover:bg-muted/60 transition-colors hidden xl:flex">
                            <Download className="h-4 w-4 mr-2" />
                            Export
                        </Button>
                        <Button
                            onClick={() => setCreateModalOpen(true)}
                            className="rounded-xl h-10 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 cursor-pointer"
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Create
                        </Button>
                    </div>
                }
            />

            {/* Data Table */}
            <Card className="rounded-2xl border-border/40 shadow-lg bg-card/80 backdrop-blur-xl">
                <CardContent className="p-0">
                    <div className="flex items-center justify-between p-5 border-b border-border/30">
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">Show</span>
                            <Select value={rowsPerPage} onValueChange={(val: string) => { setRowsPerPage(val); setCurrentPage(1); }}>
                                <SelectTrigger className="w-20 h-9 rounded-xl border-border/40 cursor-pointer">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl">
                                    <SelectItem value="25">25</SelectItem>
                                    <SelectItem value="50">50</SelectItem>
                                    <SelectItem value="100">100</SelectItem>
                                </SelectContent>
                            </Select>
                            <span className="text-sm text-muted-foreground">entries</span>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader className="bg-muted/20  px-4">
                                <TableRow className="hover:bg-transparent border-border/30">
                                    <TableHead className="h-12 text-xs font-semibold uppercase tracking-wide">FULLNAME</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wide">ACCOUNT</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wide">PHONE</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wide">PLAN</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wide">STATUS</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wide">ONLINE</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wide">LOCATION</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wide">EXPIRY</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wide">ACTION</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {currentRows.map((customer) => (
                                    <TableRow key={customer.id} className="border-border/30 hover:bg-muted/20 transition-colors cursor-pointer">
                                        <TableCell className="font-medium px-4">{customer.fullname}</TableCell>
                                        <TableCell className="text-primary font-medium">{customer.account}</TableCell>
                                        <TableCell className="font-mono text-sm">{customer.phone}</TableCell>
                                        <TableCell className="font-numbers font-semibold">{customer.plan}</TableCell>
                                        <TableCell>
                                            <Badge className={`rounded-full px-2.5 py-0.5 text-xs font-semibold border-0 ${customer.status === "Active" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400" : customer.status === "Expired" ? "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-400" : "bg-muted/40 text-muted-foreground"}`}>
                                                {customer.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge className={`rounded-full px-2.5 py-0.5 text-xs font-semibold border-0 ${customer.online === "Online" ? "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400" : "bg-slate-100 text-slate-700 dark:bg-muted dark:text-muted-foreground"}`}>
                                                {customer.online}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">{customer.location}</TableCell>
                                        <TableCell className="font-mono text-xs text-muted-foreground">{customer.expiry}</TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg cursor-pointer">
                                                        <MoreVertical className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="rounded-xl">
                                                    <DropdownMenuItem className="cursor-pointer">View Details</DropdownMenuItem>
                                                    <DropdownMenuItem className="cursor-pointer">Edit</DropdownMenuItem>
                                                    <DropdownMenuItem className="cursor-pointer text-rose-600">Delete</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 border-t border-border/30">
                        <div className="text-sm text-muted-foreground">
                            Showing <span className="font-medium text-foreground font-numbers">{indexOfFirstRow + 1}</span> to{" "}
                            <span className="font-medium text-foreground font-numbers">{Math.min(indexOfLastRow, customers.length)}</span> of{" "}
                            <span className="font-medium text-foreground font-numbers">{customers.length}</span> entries
                        </div>

                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="h-9 rounded-xl border-border/40 cursor-pointer"
                            >
                                Previous
                            </Button>
                            <div className="flex items-center gap-1">
                                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((number) => (
                                    <Button
                                        key={number}
                                        variant={currentPage === number ? "default" : "ghost"}
                                        size="sm"
                                        onClick={() => setCurrentPage(number)}
                                        className={`h-9 w-9 rounded-xl cursor-pointer ${currentPage === number ? "bg-primary" : ""}`}
                                    >
                                        {number}
                                    </Button>
                                ))}
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="h-9 rounded-xl border-border/40 cursor-pointer"
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>


            {/* Create Customer Modal */}
            <CreateCustomerModal
                open={createModalOpen}
                onOpenChange={setCreateModalOpen}
                onSubmit={(data) => {
                    console.log("Customer created:", data);
                    setCreateModalOpen(false);
                }}
            />
        </div>
    );
}
