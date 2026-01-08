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
import {
    Trash2,
    ArrowLeft,
    Search,
    Ticket,
    TicketCheck,
    TicketX,
} from "lucide-react";

interface VoucherDetailsPageContentProps {
    packageId: string;
}

interface Voucher {
    id: string;
    code: string;
    compensation: boolean;
    status: "Unused" | "Used";
    devices: number;
    usedDevices: string;
    usedBy: string;
    createdAt: string;
}

const mockVouchers: Voucher[] = [
    {
        id: "1",
        code: "QUP41X",
        compensation: false,
        status: "Unused",
        devices: 1,
        usedDevices: "N/A",
        usedBy: "N/A",
        createdAt: "2025-11-14 10:35"
    },
];

export default function VoucherDetailsPageContent({ packageId }: VoucherDetailsPageContentProps) {
    const router = useRouter();
    const [vouchers, setVouchers] = React.useState<Voucher[]>(mockVouchers);
    const [searchQuery, setSearchQuery] = React.useState("");
    const [rowsPerPage, setRowsPerPage] = React.useState("10");
    const [currentPage, setCurrentPage] = React.useState(1);

    // Package details (mock - would come from API/props)
    const packageDetails = {
        name: "1 week",
        price: 350,
        validity: "7 Days",
    };

    const totalVouchers = 1;
    const unusedVouchers = 1;
    const usedVouchers = 0;

    // Pagination
    const indexOfLastRow = currentPage * parseInt(rowsPerPage);
    const indexOfFirstRow = indexOfLastRow - parseInt(rowsPerPage);
    const currentRows = vouchers.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(vouchers.length / parseInt(rowsPerPage));

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => router.push("/crm/vouchers")}
                        className="h-10 w-10 rounded-xl hover:bg-muted/60 cursor-pointer"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <div>
                        <h1 className="text-3xl font-heading font-semibold">
                            Vouchers for Package: {packageDetails.name}
                        </h1>
                        <p className="text-sm text-muted-foreground">View and manage voucher codes</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        onClick={() => router.push("/crm/vouchers")}
                        className="rounded-xl cursor-pointer hover:bg-muted/60"
                    >
                        Back to Vouchers
                    </Button>
                    <Button
                        variant="destructive"
                        className="rounded-xl cursor-pointer"
                    >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete All Vouchers
                    </Button>
                </div>
            </div>

            {/* Package Details and Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Package Details Card */}
                <Card className="rounded-2xl border-border/40 shadow-lg bg-card/80 backdrop-blur-xl">
                    <CardContent className="p-6">
                        <h3 className="text-sm font-heading font-semibold text-muted-foreground uppercase tracking-wide mb-4">
                            Package Details
                        </h3>
                        <div className="space-y-3">
                            <div>
                                <p className="text-xs text-muted-foreground mb-1">Name:</p>
                                <p className="text-sm font-medium">{packageDetails.name}</p>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground mb-1">Price:</p>
                                <p className="text-sm font-numbers font-semibold">{packageDetails.price}</p>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground mb-1">Validity:</p>
                                <p className="text-sm font-medium">{packageDetails.validity}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Statistics Cards */}
                {[
                    {
                        label: "TOTAL VOUCHERS",
                        value: totalVouchers,
                        icon: Ticket,
                        iconBg: "bg-blue-500/20",
                        iconColor: "text-blue-500",
                        borderColor: "border-blue-500/30"
                    },
                    {
                        label: "UNUSED VOUCHERS",
                        value: unusedVouchers,
                        icon: TicketCheck,
                        iconBg: "bg-emerald-500/20",
                        iconColor: "text-emerald-500",
                        borderColor: "border-emerald-500/30"
                    },
                    {
                        label: "USED VOUCHERS",
                        value: usedVouchers,
                        icon: TicketX,
                        iconBg: "bg-rose-500/20",
                        iconColor: "text-rose-500",
                        borderColor: "border-rose-500/30"
                    },
                ].map((stat, idx) => (
                    <Card
                        key={idx}
                        className={`relative rounded-2xl border ${stat.borderColor} bg-card/60 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group`}
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-500" />
                        <CardContent className="px-4 py-2 relative">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <p className="text-xs font-heading font-medium text-muted-foreground uppercase tracking-wider mb-3">
                                        {stat.label}
                                    </p>
                                    <p className="text-3xl font-numbers font-semibold tracking-tight">
                                        {stat.value}
                                    </p>
                                </div>
                                <div className={`h-16 w-16 rounded-2xl ${stat.iconBg} border ${stat.borderColor} flex items-center justify-center backdrop-blur-sm shrink-0`}>
                                    <stat.icon className={`h-8 w-8 ${stat.iconColor}`} strokeWidth={2.5} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Search */}
            <div className="relative max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 rounded-xl border-border/40 cursor-text"
                />
            </div>

            {/* Vouchers Table */}
            <Card className="rounded-2xl border-border/40 shadow-lg bg-card/80 backdrop-blur-xl">
                <CardContent className="p-0">
                    <div className="flex items-center justify-between p-5 border-b border-border/30">
                        <div className="flex items-center gap-2">
                            <Select value={rowsPerPage} onValueChange={(val) => { setRowsPerPage(val); setCurrentPage(1); }}>
                                <SelectTrigger className="w-20 h-9 rounded-xl border-border/40 cursor-pointer">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl">
                                    <SelectItem value="10">10</SelectItem>
                                    <SelectItem value="25">25</SelectItem>
                                    <SelectItem value="50">50</SelectItem>
                                </SelectContent>
                            </Select>
                            <span className="text-sm text-muted-foreground">entries per page</span>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader className="bg-muted/20">
                                <TableRow className="hover:bg-transparent border-border/30">
                                    <TableHead className="h-12 text-xs font-semibold uppercase tracking-wide">CODE</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wide">COMPENSATION</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wide">STATUS</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wide">DEVICES</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wide">USED DEVICES</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wide">USED BY</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wide">CREATED AT</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wide">ACTION</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {currentRows.length > 0 ? (
                                    currentRows.map((voucher) => (
                                        <TableRow key={voucher.id} className="border-border/30 hover:bg-muted/20 transition-colors">
                                            <TableCell className="font-mono font-semibold text-primary">{voucher.code}</TableCell>
                                            <TableCell className="text-muted-foreground">{voucher.compensation ? "Yes" : "No"}</TableCell>
                                            <TableCell>
                                                <Badge className={`rounded-full px-2.5 py-0.5 text-xs font-semibold border-0 ${voucher.status === "Unused"
                                                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400"
                                                    : "bg-muted text-muted-foreground"
                                                    }`}>
                                                    {voucher.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="font-numbers font-semibold">{voucher.devices}</TableCell>
                                            <TableCell className="text-muted-foreground">{voucher.usedDevices}</TableCell>
                                            <TableCell className="text-muted-foreground">{voucher.usedBy}</TableCell>
                                            <TableCell className="font-mono text-xs text-muted-foreground">{voucher.createdAt}</TableCell>
                                            <TableCell>
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    className="h-8 w-8 rounded-lg text-rose-600 hover:bg-rose-500/10 hover:text-rose-600 cursor-pointer"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                                            No vouchers found for this package.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 border-t border-border/30">
                        <div className="text-sm text-muted-foreground">
                            Showing <span className="font-medium text-foreground font-numbers">{vouchers.length > 0 ? indexOfFirstRow + 1 : 0}</span> to{" "}
                            <span className="font-medium text-foreground font-numbers">{Math.min(indexOfLastRow, vouchers.length)}</span> of{" "}
                            <span className="font-medium text-foreground font-numbers">{vouchers.length}</span> entries
                        </div>

                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1 || vouchers.length === 0}
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
                                disabled={currentPage === totalPages || vouchers.length === 0}
                                className="h-9 rounded-xl border-border/40 cursor-pointer"
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
