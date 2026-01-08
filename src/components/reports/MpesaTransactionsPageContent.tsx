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
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Download } from "lucide-react";
import { SearchFilterBar, FilterConfig } from "@/components/ui/search-filter-bar";

interface MpesaTransaction {
    id: string;
    mpesaCode: string;
    account: string;
    paybill: string;
    name: string;
    amount: string;
    status: string;
    date: string;
}

// Mock data empty as in screenshot
const mockMpesaTransactions: MpesaTransaction[] = [];

export default function MpesaTransactionsPageContent() {
    const router = useRouter();
    const [transactions] = React.useState<MpesaTransaction[]>(mockMpesaTransactions);
    const [rowsPerPage, setRowsPerPage] = React.useState("10");
    const [currentPage, setCurrentPage] = React.useState(1);

    const indexOfLastRow = currentPage * parseInt(rowsPerPage);
    const indexOfFirstRow = indexOfLastRow - parseInt(rowsPerPage);
    const currentRows = transactions.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(transactions.length / parseInt(rowsPerPage));

    const handleSearch = (query: string) => {
        console.log("Searching mpesa transactions:", query);
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
                        <h1 className="text-3xl font-heading font-semibold">Mpesa Transactions</h1>
                        <p className="text-sm text-muted-foreground">View Mpesa transaction logs</p>
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
                                    <TableHead className="h-12 text-xs font-semibold uppercase tracking-wide">MPESA CODE</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wide">ACCOUNT</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wide">PAYBILL/TILL</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wide">NAME</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wide">AMOUNT</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wide">STATUS</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wide">DATE</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {currentRows.length > 0 ? (
                                    currentRows.map(t => (
                                        <TableRow key={t.id}>
                                            <TableCell>{t.mpesaCode}</TableCell>
                                            <TableCell>{t.account}</TableCell>
                                            <TableCell>{t.paybill}</TableCell>
                                            <TableCell>{t.name}</TableCell>
                                            <TableCell>{t.amount}</TableCell>
                                            <TableCell>{t.status}</TableCell>
                                            <TableCell>{t.date}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={7} className="h-32 text-center text-muted-foreground border-b border-border/30">
                                            No data available in table
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    <div className="flex items-center justify-between p-5 border-t border-border/30 text-sm text-muted-foreground">
                        <div>
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
