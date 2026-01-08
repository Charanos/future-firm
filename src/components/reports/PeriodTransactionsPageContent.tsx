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
import { ArrowLeft, Ban, CheckCircle2, DollarSign, Download, RefreshCw } from "lucide-react";
import { SearchFilterBar, FilterConfig } from "@/components/ui/search-filter-bar";
import { StatsCard } from "@/components/ui/stats-card";

interface Transaction {
    id: string;
    customer: string;
    package: string;
    phone: string;
    mpesaTrx: string;
    amount: number;
    status: "Success" | "Pending" | "Failed";
    date: string;
}

const mockTransactions: Transaction[] = [
    { id: "1", customer: "N/A", package: "N/A", phone: "254713245714", mpesaTrx: "UA1QN2I4ML", amount: 5.00, status: "Success", date: "2026-01-01 00:06" },
    { id: "2", customer: "N/A", package: "N/A", phone: "254729984141", mpesaTrx: "UA1BX2IM45", amount: 20.00, status: "Success", date: "2026-01-01 00:18" },
    { id: "3", customer: "N/A", package: "N/A", phone: "254112511804", mpesaTrx: "UA1J02NNL2", amount: 20.00, status: "Success", date: "2026-01-01 00:20" },
    { id: "4", customer: "N/A", package: "N/A", phone: "254110473930", mpesaTrx: "UA16V2IF90", amount: 10.00, status: "Success", date: "2026-01-01 01:08" },
    { id: "5", customer: "N/A", package: "N/A", phone: "254725460589", mpesaTrx: "UA1A3ZKW88", amount: 10.00, status: "Success", date: "2026-01-01 09:43" },
    { id: "6", customer: "16:DF:DA:13:EE:9E", package: "1HR", phone: "254705279489", mpesaTrx: "UA1KJ2GIIX", amount: 5.00, status: "Success", date: "2026-01-01 09:47" },
    { id: "7", customer: "N/A", package: "N/A", phone: "254792678375", mpesaTrx: "UA1M02FKW9", amount: 10.00, status: "Success", date: "2026-01-01 10:23" },
];

export default function PeriodTransactionsPageContent() {
    const router = useRouter();
    const [transactions] = React.useState<Transaction[]>(mockTransactions);
    const [rowsPerPage, setRowsPerPage] = React.useState("10");
    const [currentPage, setCurrentPage] = React.useState(1);

    const indexOfLastRow = currentPage * parseInt(rowsPerPage);
    const indexOfFirstRow = indexOfLastRow - parseInt(rowsPerPage);
    const currentRows = transactions.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(transactions.length / parseInt(rowsPerPage));

    const handleSearch = (query: string) => {
        console.log("Searching period transactions:", query);
    };

    const handleFilterChange = (key: string, value: string) => {
        console.log("Filter changed:", key, value);
    };

    const filters: FilterConfig[] = [
        {
            key: "startDate",
            label: "Start Date",
            type: "date",
            defaultValue: "2026-01-01"
        },
        {
            key: "endDate",
            label: "End Date",
            type: "date",
            defaultValue: "2026-01-31"
        },
        {
            key: "site",
            label: "Site: All",
            options: [
                { label: "Site: All", value: "All Sites" },
                { label: "Site: Site A", value: "Site A" },
                { label: "Site: Site B", value: "Site B" },
            ],
            defaultValue: "All Sites"
        },
        {
            key: "serviceType",
            label: "Type: All",
            options: [
                { label: "Type: All", value: "All Transactions" },
                { label: "Type: Packages", value: "Packages" },
                { label: "Type: Hotspot", value: "Hotspot" },
            ],
            defaultValue: "All Transactions"
        }
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex items-center justify-between gap-4">
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
                        <h1 className="text-3xl font-heading font-semibold">Period Transactions</h1>
                        <p className="text-sm text-muted-foreground">Detailed transaction reports by period</p>
                    </div>
                </div>
            </div>

            {/* Stats Cards - Standardized (No gradients) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatsCard
                    title="TOTAL TRANSACTIONS"
                    value="418"
                    icon={CheckCircle2}
                    iconClassName="text-indigo-500 bg-indigo-500/10"
                />
                <StatsCard
                    title="PENDING TRANSACTIONS"
                    value="0"
                    icon={Ban}
                    iconClassName="text-orange-500 bg-orange-500/10"
                />
                <StatsCard
                    title="TOTAL SALES"
                    value="Ksh 27,920"
                    icon={DollarSign}
                    iconClassName="text-emerald-500 bg-emerald-500/10"
                />
            </div>

            {/* Search and Filters - Standardized */}
            <SearchFilterBar
                onSearch={handleSearch}
                onFilterChange={handleFilterChange}
                filters={filters}
                searchPlaceholder="Search transactions..."
                actions={
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            className="rounded-xl cursor-pointer hover:bg-muted/60 transition-colors"
                        >
                            <RefreshCw className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" className="rounded-xl border-border/40 cursor-pointer">
                            <Download className="h-4 w-4 mr-2" /> Export
                        </Button>
                    </div>
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
                                            <TableCell className="font-mono text-xs text-muted-foreground">{row.customer}</TableCell>
                                            <TableCell className="text-sm text-muted-foreground">{row.package}</TableCell>
                                            <TableCell className="font-mono text-xs text-muted-foreground">{row.phone}</TableCell>
                                            <TableCell className="font-mono text-xs uppercase">{row.mpesaTrx}</TableCell>
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
                                            No transactions found for this period.
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
