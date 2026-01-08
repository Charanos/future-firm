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
    Plus,
    Trash2,
    ArrowLeft,
    TicketCheck,
    Clock,
    Wrench,
    CheckCircle2,
    Eye,
} from "lucide-react";
import { CreateTicketModal } from "@/components/modals/CreateTicketModal";
import { SearchFilterBar, FilterConfig } from "@/components/ui/search-filter-bar";
import { StatsCard } from "@/components/ui/stats-card";

// Mock data
interface Ticket {
    id: string;
    ticketNumber: string;
    subject: string;
    customer: string;
    technician: string;
    dueDate: string;
    status: "Assigned" | "In Progress" | "Resolved" | "Closed";
}

const mockTickets: Ticket[] = [
    {
        id: "1",
        ticketNumber: "#TKT108862",
        subject: "Installation for Owen faoult",
        customer: "Owen faoult",
        technician: "FUTURE OPTICS",
        dueDate: "2025-09-24",
        status: "Assigned"
    },
];

export default function TicketsPageContent() {
    const router = useRouter();
    const [tickets, setTickets] = React.useState<Ticket[]>(mockTickets);
    const [rowsPerPage, setRowsPerPage] = React.useState("10");
    const [currentPage, setCurrentPage] = React.useState(1);
    const [createModalOpen, setCreateModalOpen] = React.useState(false);

    const resolvedTickets = 0;
    const inProgressTickets = 0;
    const ticketsDue = 1;
    const convertedTickets = 0;

    // Pagination
    const indexOfLastRow = currentPage * parseInt(rowsPerPage);
    const indexOfFirstRow = indexOfLastRow - parseInt(rowsPerPage);
    const currentRows = tickets.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(tickets.length / parseInt(rowsPerPage));

    const handleSearch = (query: string) => {
        console.log("Searching tickets:", query);
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
                { label: "Status: Assigned", value: "Assigned" },
                { label: "Status: In Progress", value: "In Progress" },
                { label: "Status: Resolved", value: "Resolved" },
                { label: "Status: Closed", value: "Closed" },
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
                    <h1 className="text-3xl font-heading font-semibold">Tickets</h1>
                    <p className="text-sm text-muted-foreground">Manage support tickets and tasks</p>
                </div>
            </div>

            {/* Stats Cards - Standardized */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="RESOLVED TICKETS"
                    value={resolvedTickets}
                    icon={TicketCheck}
                    iconClassName="text-blue-500 bg-blue-500/10"
                />
                <StatsCard
                    title="TICKETS IN PROGRESS"
                    value={inProgressTickets}
                    icon={Clock}
                    iconClassName="text-orange-500 bg-orange-500/10"
                />
                <StatsCard
                    title="TICKETS DUE"
                    value={ticketsDue}
                    icon={Wrench}
                    iconClassName="text-cyan-500 bg-cyan-500/10"
                />
                <StatsCard
                    title="CONVERTED TICKETS"
                    value={convertedTickets}
                    icon={CheckCircle2}
                    iconClassName="text-emerald-500 bg-emerald-500/10"
                />
            </div>

            {/* Search and Filters - Standardized */}
            <SearchFilterBar
                onSearch={handleSearch}
                onFilterChange={handleFilterChange}
                filters={filters}
                searchPlaceholder="Search tickets..."
                actions={
                    <Button
                        onClick={() => setCreateModalOpen(true)}
                        className="rounded-xl h-10 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 cursor-pointer"
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        Create New Ticket
                    </Button>
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
                                    <SelectItem value="10">10</SelectItem>
                                    <SelectItem value="25">25</SelectItem>
                                    <SelectItem value="50">50</SelectItem>
                                </SelectContent>
                            </Select>
                            <span className="text-sm text-muted-foreground">entries</span>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader className="bg-muted/20">
                                <TableRow className="hover:bg-transparent border-border/30">
                                    <TableHead className="h-12 text-xs font-semibold uppercase tracking-wide">TICKET #</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wide">SUBJECT</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wide">CUSTOMER</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wide">TECHNICIAN</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wide">DUE DATE</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wide">STATUS</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wide text-center">ACTION</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {currentRows.length > 0 ? (
                                    currentRows.map((ticket) => (
                                        <TableRow key={ticket.id} className="border-border/30 hover:bg-muted/20 transition-colors">
                                            <TableCell className="font-mono font-semibold text-primary">{ticket.ticketNumber}</TableCell>
                                            <TableCell className="font-medium">{ticket.subject}</TableCell>
                                            <TableCell className="text-muted-foreground">{ticket.customer}</TableCell>
                                            <TableCell className="text-muted-foreground">{ticket.technician}</TableCell>
                                            <TableCell className="font-mono text-xs text-muted-foreground">{ticket.dueDate}</TableCell>
                                            <TableCell>
                                                <Badge className={`rounded-full px-2.5 py-0.5 text-xs font-semibold border-0 ${ticket.status === "Assigned" ? "bg-cyan-100 text-cyan-700 dark:bg-cyan-500/15 dark:text-cyan-400" : ticket.status === "Closed" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400" : "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400"}`}>
                                                    {ticket.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-col items-center gap-2">
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        className="h-8 gap-2 text-muted-foreground hover:text-foreground cursor-pointer"
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                        View
                                                    </Button>
                                                    <Button
                                                        size="icon"
                                                        variant="ghost"
                                                        className="h-8 w-8 text-rose-600 hover:bg-rose-500/10 hover:text-rose-600 cursor-pointer"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                                            No tickets found. Click "Create New Ticket" to get started.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 border-t border-border/30">
                        <div className="text-sm text-muted-foreground">
                            Showing <span className="font-medium text-foreground font-numbers">{tickets.length > 0 ? indexOfFirstRow + 1 : 0}</span> to{" "}
                            <span className="font-medium text-foreground font-numbers">{Math.min(indexOfLastRow, tickets.length)}</span> of{" "}
                            <span className="font-medium text-foreground font-numbers">{tickets.length}</span> entries
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Create Ticket Modal */}
            <CreateTicketModal
                open={createModalOpen}
                onOpenChange={setCreateModalOpen}
                onSubmit={(data) => {
                    console.log("Ticket created:", data);
                    setCreateModalOpen(false);
                }}
            />
        </div>
    );
}
