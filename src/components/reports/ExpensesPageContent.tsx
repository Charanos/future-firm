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
import { ArrowLeft, Plus, Eye, Pen, Trash2, FileText, DollarSign } from "lucide-react";
import { CreateExpenseModal } from "@/components/modals/CreateExpenseModal";
import { SearchFilterBar } from "@/components/ui/search-filter-bar";
import { StatsCard } from "@/components/ui/stats-card";

interface Expense {
    id: string;
    title: string;
    date: string;
    amount: number;
    description: string;
}

const mockExpenses: Expense[] = [
    { id: "1", title: "Link payment", date: "2025-09-22", amount: 15000.00, description: "" },
    { id: "2", title: "Rent", date: "2025-09-20", amount: 6000.00, description: "Partial rent payment" },
    { id: "3", title: "rent", date: "2025-09-10", amount: 30000.00, description: "" },
];

export default function ExpensesPageContent() {
    const router = useRouter();
    const [expenses, setExpenses] = React.useState<Expense[]>(mockExpenses);
    const [rowsPerPage, setRowsPerPage] = React.useState("25");
    const [createModalOpen, setCreateModalOpen] = React.useState(false);

    const totalExpenses = expenses.length;
    const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const [currentPage, setCurrentPage] = React.useState(1);

    // Pagination (simplified for this mock)
    const indexOfLastRow = currentPage * parseInt(rowsPerPage);
    const indexOfFirstRow = indexOfLastRow - parseInt(rowsPerPage);

    const handleSearch = (query: string) => {
        console.log("Searching expenses:", query);
    };

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
                        <h1 className="text-3xl font-heading font-semibold">Expenses</h1>
                        <p className="text-sm text-muted-foreground">Manage and track expenses</p>
                    </div>
                </div>
            </div>

            {/* Stats Cards - Standardized */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <StatsCard
                    title="TOTAL EXPENSES"
                    value={totalExpenses.toString()}
                    icon={FileText}
                    iconClassName="text-indigo-500 bg-indigo-500/10"
                />
                <StatsCard
                    title="TOTAL AMOUNT"
                    value={`Ksh ${totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
                    icon={DollarSign}
                    iconClassName="text-emerald-500 bg-emerald-500/10"
                />
            </div>

            {/* Search and Filters - Standardized */}
            <SearchFilterBar
                onSearch={handleSearch}
                searchPlaceholder="Search expenses..."
                actions={
                    <Button
                        onClick={() => setCreateModalOpen(true)}
                        className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer"
                    >
                        <Plus className="h-4 w-4 mr-2" /> Create Expense
                    </Button>
                }
            />

            {/* Table */}
            <Card className="rounded-2xl border-border/40 shadow-lg bg-card/80 backdrop-blur-xl">
                <CardContent className="p-0">
                    <div className="flex items-center justify-between p-5 border-b border-border/30">
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">Show</span>
                            <Select value={rowsPerPage} onValueChange={setRowsPerPage}>
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
                                    <TableHead className="h-12 text-xs font-semibold uppercase tracking-wide">TITLE</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wide">DATE</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wide">AMOUNT</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wide">DESCRIPTION</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wide">ACTION</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {expenses.map((expense) => (
                                    <TableRow key={expense.id} className="border-border/30 hover:bg-muted/20 transition-colors">
                                        <TableCell className="font-medium text-muted-foreground">{expense.title}</TableCell>
                                        <TableCell className="text-sm text-muted-foreground">{expense.date}</TableCell>
                                        <TableCell className="font-medium">{expense.amount.toFixed(2)}</TableCell>
                                        <TableCell className="text-sm text-muted-foreground">{expense.description}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Button size="sm" className="h-8 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md px-3 cursor-pointer">View</Button>
                                                <Button size="sm" className="h-8 bg-cyan-500 hover:bg-cyan-600 text-white rounded-md px-3 cursor-pointer">Edit</Button>
                                                <Button size="sm" className="h-8 bg-rose-500 hover:bg-rose-600 text-white rounded-md px-3 cursor-pointer">Delete</Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    <div className="flex items-center justify-between p-5 border-t border-border/30 text-sm text-muted-foreground">
                        <div>Showing 1 to {expenses.length} of {expenses.length} entries</div>
                        <div className="flex gap-2">
                            <Button variant="secondary" size="sm" disabled className="bg-muted/50 text-muted-foreground">Previous</Button>
                            <Button size="sm" className="bg-indigo-600 text-white h-8 w-8 p-0 cursor-pointer">1</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <CreateExpenseModal
                open={createModalOpen}
                onOpenChange={setCreateModalOpen}
                onSubmit={(data) => {
                    console.log("New expense:", data);
                    // Add logic to save expense
                }}
            />
        </div>
    );
}
