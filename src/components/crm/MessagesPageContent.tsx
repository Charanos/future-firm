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
    Trash2,
    ArrowLeft,
    Eye,
    Settings,
} from "lucide-react";

import { SendBulkSmsModal } from "@/components/modals/SendBulkSmsModal";
import { DeliveryReportsModal } from "@/components/modals/DeliveryReportsModal";
import { CreateSmsTemplateModal } from "@/components/modals/CreateSmsTemplateModal";
import { ViewBulkMessageModal } from "@/components/modals/ViewBulkMessageModal";
import { SearchFilterBar, FilterConfig } from "@/components/ui/search-filter-bar";

// Mock Data
interface Message {
    id: string;
    name: string;
    template: string;
    status: "active" | "scheduled" | "sent" | "failed";
    sentDate: string;
    recipientCount: number;
}

const mockMessages: Message[] = [
    {
        id: "1",
        name: "Welcome Campaign",
        template: "Welcome New Customers",
        status: "sent",
        sentDate: "2025-11-15 10:00 AM",
        recipientCount: 150,
    },
    {
        id: "2",
        name: "Service Outage Alert",
        template: "Service Notification",
        status: "failed",
        sentDate: "2025-11-14 02:30 PM",
        recipientCount: 45,
    },
    {
        id: "3",
        name: "Monthly Newsletter",
        template: "Newsletter - Nov",
        status: "scheduled",
        sentDate: "2025-11-20 09:00 AM",
        recipientCount: 300,
    },
    {
        id: "4",
        name: "Payment Reminder",
        template: "Bill Due",
        status: "active",
        sentDate: "2025-11-16 11:00 AM",
        recipientCount: 12,
    },
];

export default function MessagesPageContent() {
    const router = useRouter();
    const [messages, setMessages] = React.useState<Message[]>(mockMessages);
    const [searchQuery, setSearchQuery] = React.useState("");
    const [rowsPerPage, setRowsPerPage] = React.useState("10");
    const [currentPage, setCurrentPage] = React.useState(1);

    // Modal States
    const [sendSmsOpen, setSendSmsOpen] = React.useState(false);
    const [deliveryReportOpen, setDeliveryReportOpen] = React.useState(false);
    const [createTemplateOpen, setCreateTemplateOpen] = React.useState(false);
    const [viewMessageOpen, setViewMessageOpen] = React.useState(false);
    const [selectedMessage, setSelectedMessage] = React.useState<Message | null>(null);

    // Pagination Logic
    const indexOfLastRow = currentPage * parseInt(rowsPerPage);
    const indexOfFirstRow = indexOfLastRow - parseInt(rowsPerPage);
    const filteredMessages = messages.filter(msg =>
        msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        msg.template.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const currentRows = filteredMessages.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(filteredMessages.length / parseInt(rowsPerPage));

    const handleViewMessage = (message: Message) => {
        setSelectedMessage(message);
        setViewMessageOpen(true);
    };

    const handleDeleteMessage = (id: string) => {
        setMessages(prev => prev.filter(msg => msg.id !== id));
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
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
                { label: "Status: Active", value: "active" },
                { label: "Status: Scheduled", value: "scheduled" },
                { label: "Status: Sent", value: "sent" },
                { label: "Status: Failed", value: "failed" },
            ],
            defaultValue: "All"
        }
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
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
                        <h1 className="text-3xl font-heading font-semibold">Messages</h1>
                        <p className="text-sm text-muted-foreground">Manage SMS campaigns and templates</p>
                    </div>
                </div>
            </div>

            {/* Search and Filters - Standardized */}
            <SearchFilterBar
                onSearch={handleSearch}
                onFilterChange={handleFilterChange}
                filters={filters}
                searchPlaceholder="Search messages or templates..."
                actions={
                    <div className="flex flex-wrap items-center gap-2">
                        <Button
                            onClick={() => setSendSmsOpen(true)}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg shadow-indigo-500/20 cursor-pointer"
                        >
                            Send Bulk SMS
                        </Button>
                        <Button
                            onClick={() => setDeliveryReportOpen(true)}
                            className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-500/20 cursor-pointer hidden xl:flex"
                        >
                            Delivery Reports
                        </Button>
                        <Button
                            onClick={() => setCreateTemplateOpen(true)}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg shadow-indigo-500/20 cursor-pointer hidden sm:flex"
                        >
                            + Create SMS Template
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-10 w-10 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20 cursor-pointer"
                        >
                            <Settings className="h-5 w-5" />
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
                                    <TableHead className="h-12 text-xs font-semibold uppercase tracking-wide">NAME</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wide">TEMPLATE</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wide">STATUS</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wide text-center">ACTION</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {currentRows.length > 0 ? (
                                    currentRows.map((msg) => (
                                        <TableRow key={msg.id} className="border-border/30 hover:bg-muted/20 transition-colors">
                                            <TableCell className="font-medium text-foreground">{msg.name}</TableCell>
                                            <TableCell className="text-muted-foreground">{msg.template}</TableCell>
                                            <TableCell>
                                                <Badge className={`rounded-full px-2.5 py-0.5 text-xs font-semibold border-0 ${msg.status === "sent" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400" :
                                                    msg.status === "failed" ? "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-400" :
                                                        msg.status === "scheduled" ? "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400" :
                                                            "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400"
                                                    }`}>
                                                    {msg.status.charAt(0).toUpperCase() + msg.status.slice(1)}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center justify-center gap-2">
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        onClick={() => handleViewMessage(msg)}
                                                        className="h-8 gap-2 text-muted-foreground hover:text-foreground cursor-pointer"
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                        View
                                                    </Button>
                                                    <Button
                                                        size="icon"
                                                        variant="ghost"
                                                        onClick={() => handleDeleteMessage(msg.id)}
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
                                        <TableCell colSpan={4} className="h-32 text-center text-muted-foreground">
                                            <div className="flex flex-col items-center justify-center">
                                                <p className="text-sm">No entries found</p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 border-t border-border/30">
                        <div className="text-sm text-muted-foreground">
                            Showing <span className="font-medium text-foreground font-numbers">{filteredMessages.length > 0 ? indexOfFirstRow + 1 : 0}</span> to{" "}
                            <span className="font-medium text-foreground font-numbers">{Math.min(indexOfLastRow, filteredMessages.length)}</span> of{" "}
                            <span className="font-medium text-foreground font-numbers">{filteredMessages.length}</span> entries
                        </div>

                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="h-8 w-8 p-0 rounded-lg"
                            >
                                &lt;
                            </Button>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                <Button
                                    key={page}
                                    variant={currentPage === page ? "default" : "ghost"}
                                    size="sm"
                                    onClick={() => setCurrentPage(page)}
                                    className={`h-8 w-8 p-0 rounded-lg ${currentPage === page ? 'bg-primary text-primary-foreground' : ''}`}
                                >
                                    {page}
                                </Button>
                            ))}
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="h-8 w-8 p-0 rounded-lg"
                            >
                                &gt;
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Modals */}
            <SendBulkSmsModal
                open={sendSmsOpen}
                onOpenChange={setSendSmsOpen}
                onSubmit={(data) => {
                    console.log("Sending Bulk SMS:", data);
                }}
            />

            <DeliveryReportsModal
                open={deliveryReportOpen}
                onOpenChange={setDeliveryReportOpen}
                onSubmit={(data) => {
                    console.log("Generating Delivery Report:", data);
                }}
            />

            <CreateSmsTemplateModal
                open={createTemplateOpen}
                onOpenChange={setCreateTemplateOpen}
                onSubmit={(data) => {
                    console.log("Creating Template:", data);
                }}
            />

            <ViewBulkMessageModal
                open={viewMessageOpen}
                onOpenChange={setViewMessageOpen}
                message={selectedMessage}
            />
        </div>
    );
}
