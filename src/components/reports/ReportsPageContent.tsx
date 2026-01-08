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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Search, ArrowUpDown, Download, Filter } from "lucide-react";

// Mock Data
interface ReportData {
    id: string;
    customer: string;
    package: string;
    phone: string;
    mpesaTrx: string;
    amount: number;
    status: "Success" | "Pending" | "Failed";
    date: string;
}

const initialData: ReportData[] = [
    { id: "1", customer: "0A:B6:25:91:9E:1C", package: "12HRS", phone: "254795588971", mpesaTrx: "UA8MV388LJ", amount: 50.00, status: "Success", date: "2026-01-08 07:33:51" },
    { id: "2", customer: "12:CB:08:6B:7D:91", package: "6HRS", phone: "254799102590", mpesaTrx: "UA87G35LT7", amount: 30.00, status: "Success", date: "2026-01-08 11:16:54" },
    { id: "3", customer: "16:DF:DA:13:EE:9E", package: "1HR", phone: "254705279489", mpesaTrx: "UA8KJ32LVH", amount: 10.00, status: "Success", date: "2026-01-08 09:16:52" },
    { id: "4", customer: "1A:F1:E4:60:BA:4B", package: "1HR", phone: "254757975940", mpesaTrx: "UA86U31Q3Y", amount: 10.00, status: "Success", date: "2026-01-08 09:49:55" },
    { id: "5", customer: "1E:DD:60:E0:34:5E", package: "12HRS", phone: "254746683716", mpesaTrx: "UA8NC36MXP", amount: 50.00, status: "Success", date: "2026-01-08 11:38:47" },
    { id: "6", customer: "2A:8C:18:97:E2:0F", package: "12HRS", phone: "254757046998", mpesaTrx: "UA8QX38Q51", amount: 50.00, status: "Success", date: "2026-01-08 07:34:10" },
    { id: "7", customer: "32:A9:34:42:5B:F0", package: "1HR", phone: "254715583492", mpesaTrx: "UA8BM3ASBF", amount: 10.00, status: "Success", date: "2026-01-08 11:46:25" },
    { id: "8", customer: "3A:E6:78:17:E9:3C", package: "12HRS", phone: "254792717302", mpesaTrx: "UA8HK3B7QB", amount: 50.00, status: "Success", date: "2026-01-08 10:36:44" },
    { id: "9", customer: "3E:BF:F1:BE:9B:2B", package: "Koboleh", phone: "254742320516", mpesaTrx: "UA8HB3AL45", amount: 5.00, status: "Success", date: "2026-01-08 12:10:05" },
    { id: "10", customer: "46:10:7B:BC:3D:02", package: "1HR", phone: "254727364776", mpesaTrx: "UA8D637SYS", amount: 10.00, status: "Success", date: "2026-01-08 00:37:01" },
    { id: "11", customer: "55:AA:7B:BC:3D:11", package: "24HRS", phone: "254712345678", mpesaTrx: "UA8XX12345", amount: 100.00, status: "Success", date: "2026-01-07 23:37:01" },
    { id: "12", customer: "56:BB:7B:BC:3D:12", package: "7Mbps", phone: "254722345678", mpesaTrx: "UA8XX12346", amount: 2500.00, status: "Pending", date: "2026-01-07 20:30:00" },
    { id: "13", customer: "57:CC:7B:BC:3D:13", package: "12HRS", phone: "254733345678", mpesaTrx: "UA8XX12347", amount: 50.00, status: "Failed", date: "2026-01-07 15:15:00" },
];

export default function ReportsPageContent() {
    const router = useRouter();
    const [data, setData] = React.useState<ReportData[]>(initialData);
    const [searchTerm, setSearchTerm] = React.useState("");
    const [rowsPerPage, setRowsPerPage] = React.useState("10");
    const [currentPage, setCurrentPage] = React.useState(1);
    const [sortConfig, setSortConfig] = React.useState<{ key: keyof ReportData; direction: "asc" | "desc" } | null>(null);

    // Filter
    const filteredData = React.useMemo(() => {
        return data.filter((item) =>
            Object.values(item).some((value) =>
                value.toString().toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [data, searchTerm]);

    // Sort
    const sortedData = React.useMemo(() => {
        if (!sortConfig) return filteredData;
        return [...filteredData].sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
            if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
            return 0;
        });
    }, [filteredData, sortConfig]);

    // Paginate
    const indexOfLastRow = currentPage * parseInt(rowsPerPage);
    const indexOfFirstRow = indexOfLastRow - parseInt(rowsPerPage);
    const currentRows = sortedData.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(sortedData.length / parseInt(rowsPerPage));

    const requestSort = (key: keyof ReportData) => {
        let direction: "asc" | "desc" = "asc";
        if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
    };

    const handleRowsPerPageChange = (value: string) => {
        setRowsPerPage(value);
        setCurrentPage(1);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95 px-2 py-4 md:py-8">
            <div className="max-w-full mx-auto space-y-6 animate-in fade-in duration-700">
                {/* Header with Glassmorphism */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => router.back()}
                            className="h-11 w-11 rounded-2xl bg-muted/40 hover:bg-muted/60 backdrop-blur-xl border border-border/40 transition-all duration-300 hover:scale-105"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <div className="space-y-1">
                            <h1 className="text-3xl font-semibold bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent">
                                Reports
                            </h1>
                            <p className="text-sm text-muted-foreground">Transaction history and analytics</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            className="h-10 rounded-xl border-border/40 bg-background/50 backdrop-blur-sm hover:bg-muted/50 transition-all duration-300"
                        >
                            <Download className="h-4 w-4 mr-2" />
                            Export
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className="h-10 rounded-xl border-border/40 bg-background/50 backdrop-blur-sm hover:bg-muted/50 transition-all duration-300"
                        >
                            <Filter className="h-4 w-4 mr-2" />
                            Filter
                        </Button>
                    </div>
                </div>

                {/* Main Content Card with Modern Design */}
                <Card className="rounded-3xl border-border/40 shadow-2xl bg-card/50 backdrop-blur-2xl overflow-hidden">
                    <CardContent className="p-0">
                        {/* Controls Bar */}
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-6 bg-gradient-to-r from-muted/30 via-muted/20 to-transparent border-b border-border/40">
                            <div className="flex items-center gap-3">
                                <span className="text-sm text-muted-foreground font-medium">Show</span>
                                <Select value={rowsPerPage} onValueChange={handleRowsPerPageChange}>
                                    <SelectTrigger className="w-20 h-10 rounded-xl border-border/40 bg-background/80 backdrop-blur-sm">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl border-border/40">
                                        <SelectItem value="5">5</SelectItem>
                                        <SelectItem value="10">10</SelectItem>
                                        <SelectItem value="25">25</SelectItem>
                                        <SelectItem value="50">50</SelectItem>
                                    </SelectContent>
                                </Select>
                                <span className="text-sm text-muted-foreground font-medium">entries</span>
                            </div>

                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="relative flex items-center">
                                    <Search className="absolute left-4 h-4 w-4 text-muted-foreground/50 group-hover:text-primary transition-colors duration-300" />
                                    <Input
                                        placeholder="Search transactions..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-11 pr-4 h-11 w-full md:w-[320px] rounded-xl border-border/40 bg-background/80 backdrop-blur-sm focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all duration-300"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Table with Premium Styling */}
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-border/40 hover:bg-transparent">
                                        {[
                                            { key: "customer", label: "CUSTOMER" },
                                            { key: "package", label: "PACKAGE" },
                                            { key: "phone", label: "PHONE" },
                                            { key: "mpesaTrx", label: "MPESA TRX" },
                                            { key: "amount", label: "AMOUNT" },
                                            { key: "status", label: "STATUS" },
                                            { key: "date", label: "DATE" },
                                        ].map((head) => (
                                            <TableHead
                                                key={head.key}
                                                className="h-14 text-xs font-semibold text-muted-foreground/80 uppercase tracking-wider cursor-pointer select-none group"
                                                onClick={() => requestSort(head.key as keyof ReportData)}
                                            >
                                                <div className="flex items-center gap-2 hover:text-foreground transition-colors duration-200">
                                                    {head.label}
                                                    <ArrowUpDown className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                                </div>
                                            </TableHead>
                                        ))}
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {currentRows.length > 0 ? (
                                        currentRows.map((row, index) => (
                                            <TableRow
                                                key={row.id}
                                                className="border-border/30 hover:bg-muted/30 transition-all duration-200 group"
                                                style={{ animationDelay: `${index * 30}ms` }}
                                            >
                                                <TableCell className="font-mono text-xs py-4">
                                                    <span className="px-2.5 py-1.5 rounded-lg bg-muted/40 group-hover:bg-muted/60 transition-colors duration-200">
                                                        {row.customer}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="text-sm font-medium">{row.package}</TableCell>
                                                <TableCell className="font-mono text-xs text-muted-foreground">{row.phone}</TableCell>
                                                <TableCell className="font-mono text-xs">
                                                    <span className="text-primary/80">{row.mpesaTrx}</span>
                                                </TableCell>
                                                <TableCell className="text-sm font-semibold">
                                                    <span className="bg-gradient-to-r from-emerald-500 to-green-500 bg-clip-text text-transparent">
                                                        Ksh {row.amount.toFixed(2)}
                                                    </span>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge
                                                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium border-0 ${row.status === "Success" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400" :
                                                                row.status === "Pending" ? "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400" :
                                                                    "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-400"
                                                            }`}
                                                    >
                                                        {row.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-xs text-muted-foreground font-mono">{row.date}</TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={7} className="h-32 text-center">
                                                <div className="flex flex-col items-center justify-center space-y-2">
                                                    <div className="h-12 w-12 rounded-full bg-muted/40 flex items-center justify-center">
                                                        <Search className="h-6 w-6 text-muted-foreground/50" />
                                                    </div>
                                                    <p className="text-sm text-muted-foreground">No results found</p>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>

                        {/* Enhanced Pagination */}
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-gradient-to-r from-transparent via-muted/10 to-transparent border-t border-border/40">
                            <div className="text-sm text-muted-foreground">
                                Showing <span className="font-semibold text-foreground">{indexOfFirstRow + 1}</span> to{" "}
                                <span className="font-semibold text-foreground">{Math.min(indexOfLastRow, sortedData.length)}</span> of{" "}
                                <span className="font-semibold text-foreground">{sortedData.length}</span> entries
                            </div>

                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="h-9 px-4 rounded-xl border-border/40 bg-background/80 backdrop-blur-sm hover:bg-muted/50 disabled:opacity-30 transition-all duration-200"
                                >
                                    Previous
                                </Button>
                                <div className="flex items-center gap-1">
                                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                                        let pageNumber;
                                        if (totalPages <= 5) {
                                            pageNumber = i + 1;
                                        } else if (currentPage <= 3) {
                                            pageNumber = i + 1;
                                        } else if (currentPage >= totalPages - 2) {
                                            pageNumber = totalPages - 4 + i;
                                        } else {
                                            pageNumber = currentPage - 2 + i;
                                        }

                                        return (
                                            <Button
                                                key={i}
                                                variant={currentPage === pageNumber ? "default" : "ghost"}
                                                size="sm"
                                                onClick={() => setCurrentPage(pageNumber)}
                                                className={`h-9 w-9 rounded-xl transition-all duration-200 ${currentPage === pageNumber
                                                    ? "bg-gradient-to-r from-primary to-blue-600 text-primary-foreground shadow-lg shadow-primary/25"
                                                    : "hover:bg-muted/50 text-muted-foreground"
                                                    }`}
                                            >
                                                {pageNumber}
                                            </Button>
                                        );
                                    })}
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="h-9 px-4 rounded-xl border-border/40 bg-background/80 backdrop-blur-sm hover:bg-muted/50 disabled:opacity-30 transition-all duration-200"
                                >
                                    Next
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
