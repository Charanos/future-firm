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
    Clock,
    UserCheck2,
    UserX2,
    Plus,
    RefreshCw,
    MoreVertical,
    ArrowLeft,
    Upload,
    Download,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CreateLeadModal } from "@/components/modals/CreateLeadModal";
import { SearchFilterBar, FilterConfig } from "@/components/ui/search-filter-bar";
import { StatsCard } from "@/components/ui/stats-card";

// Mock data
interface Lead {
    id: string;
    name: string;
    email: string;
    phone: string;
    location: string;
    status: "Converted" | "Pending" | "Lost";
    createdBy: string;
    createdOn: string;
}

const mockLeads: Lead[] = [
    {
        id: "1",
        name: "Owen faoult",
        email: "karuloowen74@gmail.com",
        phone: "0791270060",
        location: "Kasarani",
        status: "Converted",
        createdBy: "Duncan",
        createdOn: "2025-09-23 08:57:45"
    },
];

export default function LeadsPageContent() {
    const router = useRouter();
    const [leads, setLeads] = React.useState<Lead[]>(mockLeads);
    const [rowsPerPage, setRowsPerPage] = React.useState("25");
    const [currentPage, setCurrentPage] = React.useState(1);
    const [createModalOpen, setCreateModalOpen] = React.useState(false);

    const totalLeads = 1;
    const pendingLeads = 0;
    const convertedLeads = 1;
    const lostLeads = 0;

    // Pagination
    const indexOfLastRow = currentPage * parseInt(rowsPerPage);
    const indexOfFirstRow = indexOfLastRow - parseInt(rowsPerPage);
    const currentRows = leads.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(leads.length / parseInt(rowsPerPage));

    const handleSearch = (query: string) => {
        console.log("Searching leads:", query);
    };

    const handleFilterChange = (key: string, value: string) => {
        console.log("Filter changed:", key, value);
    };

    const filters: FilterConfig[] = [
        {
            key: "status",
            label: "Status: All",
            options: [
                { label: "Status: All", value: "All" },
                { label: "Status: Converted", value: "Converted" },
                { label: "Status: Pending", value: "Pending" },
                { label: "Status: Lost", value: "Lost" },
            ],
            defaultValue: "All"
        },
        {
            key: "location",
            label: "Location: All",
            options: [
                { label: "Location: All", value: "All" },
                { label: "Location: Kasarani", value: "Kasarani" },
                { label: "Location: CBD", value: "CBD" },
            ],
            defaultValue: "All"
        }
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header with back button */}
            <div className="flex items-center gap-4">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => router.back()}
                    className="h-10 w-10 rounded-xl hover:bg-muted/60 cursor-pointer"
                >
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <div>
                    <h1 className="text-3xl font-heading font-semibold">Leads</h1>
                    <p className="text-sm text-muted-foreground">Manage and track your sales leads</p>
                </div>
            </div>

            {/* Stats Cards - Standardized */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="TOTAL LEADS"
                    value={totalLeads}
                    icon={Users}
                    iconClassName="text-blue-500 bg-blue-500/10"
                />
                <StatsCard
                    title="PENDING LEADS"
                    value={pendingLeads}
                    icon={Clock}
                    iconClassName="text-amber-500 bg-amber-500/10"
                />
                <StatsCard
                    title="CONVERTED LEADS"
                    value={convertedLeads}
                    icon={UserCheck2}
                    iconClassName="text-emerald-500 bg-emerald-500/10"
                />
                <StatsCard
                    title="LOST LEADS"
                    value={lostLeads}
                    icon={UserX2}
                    iconClassName="text-rose-500 bg-rose-500/10"
                />
            </div>

            {/* Search and Filters - Standardized */}
            <SearchFilterBar
                onSearch={handleSearch}
                onFilterChange={handleFilterChange}
                filters={filters}
                searchPlaceholder="Search leads..."
                actions={
                    <div className="flex items-center gap-2">
                        <Button
                            onClick={() => setCreateModalOpen(true)}
                            className="rounded-xl bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 cursor-pointer"
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Create New Lead
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-xl cursor-pointer hover:bg-muted/60 transition-colors">
                            <RefreshCw className="h-4 w-4" />
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
                            <TableHeader className="bg-muted/20">
                                <TableRow className="hover:bg-transparent border-border/30">
                                    <TableHead className="h-12 text-xs font-semibold uppercase tracking-wide">NAME</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wide">EMAIL</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wide">PHONE</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wide">LOCATION</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wide">STATUS</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wide">CREATED BY</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wide">CREATED ON</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wide">ACTION</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {currentRows.length > 0 ? (
                                    currentRows.map((lead) => (
                                        <TableRow key={lead.id} className="border-border/30 hover:bg-muted/20 transition-colors cursor-pointer">
                                            <TableCell className="font-medium">{lead.name}</TableCell>
                                            <TableCell className="text-muted-foreground">{lead.email}</TableCell>
                                            <TableCell className="font-mono text-sm">{lead.phone}</TableCell>
                                            <TableCell className="text-muted-foreground">{lead.location}</TableCell>
                                            <TableCell>
                                                <Badge className={`rounded-full px-2.5 py-0.5 text-xs font-semibold border-0 ${lead.status === "Converted" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400" :
                                                    lead.status === "Pending" ? "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400" :
                                                        "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400"
                                                    }`}>
                                                    {lead.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-muted-foreground">{lead.createdBy}</TableCell>
                                            <TableCell className="font-mono text-xs text-muted-foreground">{lead.createdOn}</TableCell>
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
                                                        <DropdownMenuItem className="cursor-pointer">Convert to Customer</DropdownMenuItem>
                                                        <DropdownMenuItem className="cursor-pointer text-rose-600">Delete</DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                                            No leads found. Click "Create New Lead" to get started.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 border-t border-border/30">
                        <div className="text-sm text-muted-foreground">
                            Showing <span className="font-medium text-foreground font-numbers">{leads.length > 0 ? indexOfFirstRow + 1 : 0}</span> to{" "}
                            <span className="font-medium text-foreground font-numbers">{Math.min(indexOfLastRow, leads.length)}</span> of{" "}
                            <span className="font-medium text-foreground font-numbers">{leads.length}</span> entries
                        </div>

                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1 || leads.length === 0}
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
                                disabled={currentPage === totalPages || leads.length === 0}
                                className="h-9 rounded-xl border-border/40 cursor-pointer"
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Create Lead Modal */}
            <CreateLeadModal
                open={createModalOpen}
                onOpenChange={setCreateModalOpen}
                onSubmit={(data) => {
                    console.log("Lead created:", data);
                    // Add new lead logic here
                    setCreateModalOpen(false);
                }}
            />
        </div>
    );
}
