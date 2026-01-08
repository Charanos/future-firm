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

interface DailyTransaction {
    id: string;
    customer: string;
    package: string;
    phone: string;
    mpesaTrx: string;
    amount: number;
    status: "Success" | "Pending" | "Failed";
    date: string;
}

const mockTransactions: DailyTransaction[] = [
    { id: "1", customer: "00:08:22:B0:B2:7A", package: "Koboleh", phone: "254110700152", mpesaTrx: "UA8IF38CR0", amount: 5.00, status: "Success", date: "2026-01-08 13:00:22" },
    { id: "2", customer: "06:66:2E:2B:32:AB", package: "6HRS", phone: "254113566973", mpesaTrx: "UA8D638T4Q", amount: 30.00, status: "Success", date: "2026-01-08 12:45:22" },
    { id: "3", customer: "0A:D6:25:91:9E:1C", package: "12HRS", phone: "254795588791", mpesaTrx: "UA8MV388LJ", amount: 50.00, status: "Success", date: "2026-01-08 07:33:51" },
    { id: "4", customer: "12:CB:08:6B:7D:91", package: "6HRS", phone: "254799102590", mpesaTrx: "UA87G35LT7", amount: 30.00, status: "Success", date: "2026-01-08 11:16:54" },
    { id: "5", customer: "16:DF:DA:13:EE:9E", package: "1HR", phone: "254705279489", mpesaTrx: "UA8KJ333Y4", amount: 10.00, status: "Success", date: "2026-01-08 13:30:27" },
];

export default function DailyTransactionsPageContent() {
    const router = useRouter();
    const [transactions] = React.useState<DailyTransaction[]>(mockTransactions);
    const [rowsPerPage, setRowsPerPage] = React.useState("10");
    const [currentPage, setCurrentPage] = React.useState(1);

    const indexOfLastRow = currentPage * parseInt(rowsPerPage);
    const indexOfFirstRow = indexOfLastRow - parseInt(rowsPerPage);
    const currentRows = transactions.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(transactions.length / parseInt(rowsPerPage));

    const handleSearch = (query: string) => {
        console.log("Searching transactions:", query);
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
                { label: "Status: Success", value: "Success" },
                { label: "Status: Pending", value: "Pending" },
                { label: "Status: Failed", value: "Failed" },
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
                        <h1 className="text-3xl font-heading font-semibold">Daily Transactions</h1>
                        <p className="text-sm text-muted-foreground">View today's transaction history</p>
                    </div>
                </div>
            </div>

            {/* Search and Filters - Standardized */}
            <SearchFilterBar
                onSearch={handleSearch}
                onFilterChange={handleFilterChange}
                filters={filters}
                searchPlaceholder="Search transactions..."
                actions={
                    <Button variant="outline" className="rounded-xl border-border/40 cursor-pointer">
                        <Download className="h-4 w-4 mr-2" /> Export
                    </Button>
                }
            />

            {/* Table */}
            <Card className="rounded-2xl border-border/40 shadow-lg bg-card/80 backdrop-blur-xl overflow-hidden">
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
                                    <TableHead className="text-xs font-semibold uppercase tracking-wide">PACKAGE</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wide">PHONE</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wide">MPESA TRX</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wide">AMOUNT</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wide">STATUS</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wide">DATE</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {currentRows.length > 0 ? (
                                    currentRows.map((row) => (
                                        <TableRow key={row.id} className="border-border/30 hover:bg-muted/20 transition-colors">
                                            <TableCell className="font-mono text-xs">{row.customer}</TableCell>
                                            <TableCell className="text-sm">{row.package}</TableCell>
                                            <TableCell className="font-mono text-xs text-muted-foreground">{row.phone}</TableCell>
                                            <TableCell className="font-mono text-xs text-primary">{row.mpesaTrx}</TableCell>
                                            <TableCell className="font-medium">Ksh {row.amount.toFixed(2)}</TableCell>
                                            <TableCell>
                                                <Badge className={`rounded-sm px-2 py-0.5 text-[10px] uppercase font-semibold border-0 ${row.status === "Success" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400" :
                                                    row.status === "Pending" ? "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400" :
                                                        "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-400"
                                                    }`}>
                                                    {row.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-xs text-muted-foreground">{row.date}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                                            No transactions found today.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 border-t border-border/30">
                        <div className="text-sm text-muted-foreground">
                            Showing <span className="font-medium text-foreground font-numbers">{transactions.length > 0 ? indexOfFirstRow + 1 : 0}</span> to{" "}
                            <span className="font-medium text-foreground font-numbers">{Math.min(indexOfLastRow, transactions.length)}</span> of{" "}
                            <span className="font-medium text-foreground font-numbers">{transactions.length}</span> entries
                        </div>
                        <div className="flex gap-2">
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
