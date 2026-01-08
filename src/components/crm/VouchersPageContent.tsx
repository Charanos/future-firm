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
import {
    Plus,
    Trash2,
    ArrowLeft,
} from "lucide-react";
import { CreatePackageModal } from "@/components/modals/CreatePackageModal";
import { SearchFilterBar, FilterConfig } from "@/components/ui/search-filter-bar";

// Mock data
interface VoucherPackage {
    id: string;
    name: string;
    price: number;
    validity: string;
    totalVouchers: number;
    used: number;
    unused: number;
}

const mockPackages: VoucherPackage[] = [
    { id: "1", name: "1 week", price: 350, validity: "7 Days", totalVouchers: 1, used: 0, unused: 1 },
    { id: "2", name: "1month", price: 850, validity: "1 Months", totalVouchers: 2, used: 0, unused: 2 },
];

export default function VouchersPageContent() {
    const router = useRouter();
    const [packages, setPackages] = React.useState<VoucherPackage[]>(mockPackages);
    const [rowsPerPage, setRowsPerPage] = React.useState("10");
    const [currentPage, setCurrentPage] = React.useState(1);
    const [createModalOpen, setCreateModalOpen] = React.useState(false);

    // Pagination
    const indexOfLastRow = currentPage * parseInt(rowsPerPage);
    const indexOfFirstRow = indexOfLastRow - parseInt(rowsPerPage);
    const currentRows = packages.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(packages.length / parseInt(rowsPerPage));

    const handleSearch = (query: string) => {
        console.log("Searching vouchers:", query);
    };

    const handleFilterChange = (key: string, value: string) => {
        console.log("Filter changed:", key, value);
    };

    const filters: FilterConfig[] = [
        {
            key: "validity",
            label: "Validity: All",
            options: [
                { label: "Validity: All", value: "All" },
                { label: "Validity: 7 Days", value: "7 Days" },
                { label: "Validity: 1 Month", value: "1 Month" },
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
                    <h1 className="text-3xl font-heading font-semibold">Vouchers</h1>
                    <p className="text-sm text-muted-foreground">Manage voucher packages and codes</p>
                </div>
            </div>

            {/* Search and Filters - Standardized */}
            <SearchFilterBar
                onSearch={handleSearch}
                onFilterChange={handleFilterChange}
                filters={filters}
                searchPlaceholder="Search packages..."
                actions={
                    <div className="flex items-center gap-2">
                        <Button
                            onClick={() => setCreateModalOpen(true)}
                            className="rounded-xl h-10 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 cursor-pointer"
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Generate Voucher
                        </Button>
                        <Button
                            variant="destructive"
                            className="rounded-xl h-10 cursor-pointer"
                        >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete All Used Vouchers
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
                                    <TableHead className="h-12 text-xs font-semibold uppercase tracking-wide">PACKAGE NAME</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wide">PRICE</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wide">VALIDITY</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wide">TOTAL VOUCHERS</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wide">USED</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wide">UNUSED</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wide">ACTION</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {currentRows.length > 0 ? (
                                    currentRows.map((pkg) => (
                                        <TableRow key={pkg.id} className="border-border/30 hover:bg-muted/20 transition-colors">
                                            <TableCell className="font-medium">{pkg.name}</TableCell>
                                            <TableCell className="font-numbers font-semibold">{pkg.price}</TableCell>
                                            <TableCell className="text-muted-foreground">{pkg.validity}</TableCell>
                                            <TableCell className="font-numbers font-semibold">{pkg.totalVouchers}</TableCell>
                                            <TableCell>
                                                <span className="inline-flex items-center justify-center min-w-[24px] h-6 px-2 rounded-full bg-orange-500/15 text-orange-600 dark:text-orange-400 text-sm font-semibold">
                                                    {pkg.used}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <span className="inline-flex items-center justify-center min-w-[24px] h-6 px-2 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-sm font-semibold">
                                                    {pkg.unused}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        size="sm"
                                                        onClick={() => router.push(`/crm/vouchers/${pkg.id}`)}
                                                        className="rounded-lg bg-cyan-500/10 text-cyan-600 hover:bg-cyan-500/20 border border-cyan-500/30 cursor-pointer"
                                                    >
                                                        View Vouchers
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="destructive"
                                                        className="rounded-lg cursor-pointer"
                                                    >
                                                        Delete All
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                                            No packages found. Click "Generate Voucher" to create a package.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 border-t border-border/30">
                        <div className="text-sm text-muted-foreground">
                            Showing <span className="font-medium text-foreground font-numbers">{packages.length > 0 ? indexOfFirstRow + 1 : 0}</span> to{" "}
                            <span className="font-medium text-foreground font-numbers">{Math.min(indexOfLastRow, packages.length)}</span> of{" "}
                            <span className="font-medium text-foreground font-numbers">{packages.length}</span> entries
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Create Package Modal */}
            <CreatePackageModal
                open={createModalOpen}
                onOpenChange={setCreateModalOpen}
                onSubmit={(data) => {
                    console.log("Package created:", data);
                    setCreateModalOpen(false);
                }}
            />
        </div>
    );
}
