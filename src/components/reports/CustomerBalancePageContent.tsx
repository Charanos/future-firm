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
import { ArrowLeft, Download } from "lucide-react";
import { SearchFilterBar, FilterConfig } from "@/components/ui/search-filter-bar";

interface CustomerBalance {
    id: string;
    customer: string;
    expiry: string;
    balance: number;
    type: string;
    status: "Active" | "Expired";
}

const mockBalances: CustomerBalance[] = [
    { id: "1", customer: "FT000027", expiry: "2026-02-06 09:15:25", balance: 3000.00, type: "PPPoE", status: "Active" },
    { id: "2", customer: "FT000040", expiry: "2026-02-05 12:00:00", balance: 1500.00, type: "PPPoE", status: "Active" },
    { id: "3", customer: "FT000041", expiry: "2025-12-17 12:00:00", balance: 100.00, type: "PPPoE", status: "Expired" },
    { id: "4", customer: "FT000043", expiry: "2026-01-15 10:40:00", balance: 500.00, type: "PPPoE", status: "Active" },
    { id: "5", customer: "FT000079", expiry: "2026-01-22 12:00:00", balance: 1000.00, type: "PPPoE", status: "Active" },
    { id: "6", customer: "FT000146", expiry: "2026-02-06 11:59:57", balance: 5.00, type: "PPPoE", status: "Active" },
    { id: "7", customer: "FT000170", expiry: "2026-01-10 12:00:00", balance: 500.00, type: "PPPoE", status: "Active" },
    { id: "8", customer: "FT000277", expiry: "2026-01-30 08:34:09", balance: 2000.00, type: "PPPoE", status: "Active" },
    { id: "9", customer: "FT000287", expiry: "2025-12-31 12:00:00", balance: 500.00, type: "PPPoE", status: "Expired" },
    { id: "10", customer: "FT00385", expiry: "2026-02-02 13:09:15", balance: 750.00, type: "PPPoE", status: "Active" },
];

export default function CustomerBalancePageContent() {
    const router = useRouter();
    const [balances] = React.useState<CustomerBalance[]>(mockBalances);
    const [rowsPerPage, setRowsPerPage] = React.useState("10");
    const [currentPage, setCurrentPage] = React.useState(1);

    const indexOfLastRow = currentPage * parseInt(rowsPerPage);
    const indexOfFirstRow = indexOfLastRow - parseInt(rowsPerPage);
    const currentRows = balances.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(balances.length / parseInt(rowsPerPage));

    const handleSearch = (query: string) => {
        console.log("Searching customer balances:", query);
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
                { label: "Status: Active", value: "Active" },
                { label: "Status: Expired", value: "Expired" },
            ],
            defaultValue: "All"
        }
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex items-center justify-between">
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
                        <h1 className="text-3xl font-heading font-semibold">Customer Balance</h1>
                        <p className="text-sm text-muted-foreground">View customer account balances</p>
                    </div>
                </div>
            </div>

            {/* Search and Filters - Standardized */}
            <SearchFilterBar
                onSearch={handleSearch}
                onFilterChange={handleFilterChange}
                filters={filters}
                searchPlaceholder="Search customers..."
                actions={
                    <Button variant="outline" className="rounded-xl border-border/40 cursor-pointer bg-indigo-600 text-white hover:bg-indigo-700 hover:text-white border-0">
                        <Download className="h-4 w-4 mr-2" /> Export
                    </Button>
                }
            />

            {/* Table */}
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
                                    <TableHead className="h-12 text-xs font-semibold uppercase tracking-wide">CUSTOMER</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wide">EXPIRY</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wide">BALANCE</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wide">TYPE</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wide">STATUS</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {currentRows.length > 0 ? (
                                    currentRows.map((row) => (
                                        <TableRow key={row.id} className="border-border/30 hover:bg-muted/20 transition-colors">
                                            <TableCell className="font-medium text-indigo-400">{row.customer}</TableCell>
                                            <TableCell className="text-sm text-muted-foreground">{row.expiry}</TableCell>
                                            <TableCell className="font-medium">Ksh {row.balance.toFixed(2)}</TableCell>
                                            <TableCell className="text-sm text-muted-foreground">{row.type}</TableCell>
                                            <TableCell>
                                                <Badge className={`rounded-sm px-2 py-0.5 text-[10px] uppercase font-semibold border-0 ${row.status === "Active" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400" : "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-400"}`}>
                                                    {row.status}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                                            No customers found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 border-t border-border/30">
                        <div className="text-sm text-muted-foreground">
                            Showing <span className="font-medium text-foreground font-numbers">{balances.length > 0 ? indexOfFirstRow + 1 : 0}</span> to{" "}
                            <span className="font-medium text-foreground font-numbers">{Math.min(indexOfLastRow, balances.length)}</span> of{" "}
                            <span className="font-medium text-foreground font-numbers">{balances.length}</span> entries
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="h-8 rounded-lg"
                            >
                                Previous
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
                                className="h-8 rounded-lg"
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
