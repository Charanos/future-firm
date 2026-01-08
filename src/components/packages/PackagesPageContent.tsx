"use client";

import * as React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, RefreshCw, Settings, Pen } from "lucide-react";
import { CreatePackageModal } from "@/components/modals/CreatePackageModal";
import { SearchFilterBar } from "@/components/ui/search-filter-bar";

interface Package {
    id: string;
    name: string;
    bandwidth: string;
    price: string;
    validity: string;
    type: "Radius" | "Static";
    category: "PPPoE" | "Hotspot";
    status: "Active" | "Inactive";
}

const mockPackages: Package[] = [
    { id: "1", name: "7Mbps", bandwidth: "7M / 7M", price: "Ksh 1500", validity: "1 Months", type: "Radius", category: "PPPoE", status: "Active" },
    { id: "2", name: "10MBPS", bandwidth: "10M / 10M", price: "Ksh 2000", validity: "1 Months", type: "Radius", category: "PPPoE", status: "Active" },
    { id: "3", name: "15MBPS", bandwidth: "15M / 15M", price: "Ksh 2500", validity: "1 Months", type: "Radius", category: "PPPoE", status: "Active" },
    { id: "4", name: "50mbps", bandwidth: "50M / 50M", price: "Ksh 8500", validity: "1 Months", type: "Radius", category: "PPPoE", status: "Active" },
    { id: "5", name: "20MBPS", bandwidth: "20M / 20M", price: "Ksh 3000", validity: "1 Months", type: "Radius", category: "PPPoE", status: "Active" },
    { id: "6", name: "100MBPS", bandwidth: "100M / 100M", price: "Ksh 18000", validity: "1 Months", type: "Radius", category: "PPPoE", status: "Active" },
    { id: "7", name: "60Mbps", bandwidth: "60M / 60M", price: "Ksh 10500", validity: "1 Months", type: "Radius", category: "PPPoE", status: "Active" },
    { id: "8", name: "25Mbps", bandwidth: "25M / 25M", price: "Ksh 5500", validity: "1 Months", type: "Radius", category: "PPPoE", status: "Active" },
    { id: "9", name: "150Mbps", bandwidth: "150M / 150M", price: "Ksh 25000", validity: "1 Months", type: "Radius", category: "PPPoE", status: "Active" },
    { id: "10", name: "200Mbps", bandwidth: "200M / 150M", price: "Ksh 30000", validity: "1 Months", type: "Radius", category: "PPPoE", status: "Active" },
    { id: "11", name: "weekly", bandwidth: "5M / 5M", price: "Ksh 500", validity: "7 Days", type: "Radius", category: "Hotspot", status: "Active" },
];

export default function PackagesPageContent() {
    const [createModalOpen, setCreateModalOpen] = React.useState(false);
    const [activeTab, setActiveTab] = React.useState<"PPPoE" | "Hotspot">("PPPoE");
    const [searchQuery, setSearchQuery] = React.useState("");

    // Filter packages based on active tab and search query
    const filteredPackages = mockPackages.filter(pkg => {
        const matchesTab = pkg.category === activeTab;
        const matchesSearch = pkg.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTab && matchesSearch;
    });

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header / Tabs Area */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-heading font-semibold">Packages</h1>
                        <p className="text-sm text-muted-foreground">Manage internet packages and plans</p>
                    </div>
                </div>
                <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val as "PPPoE" | "Hotspot")} className="w-full md:w-auto">
                    <TabsList className="bg-transparent p-0 gap-4">
                        <TabsTrigger
                            value="PPPoE"
                            className="bg-indigo-600 data-[state=active]:bg-indigo-600 text-white data-[state=active]:text-white rounded-lg px-4 py-2 shadow-sm shadow-indigo-500/20"
                        >
                            PPPoE ({mockPackages.filter(p => p.category === "PPPoE").length})
                        </TabsTrigger>
                        <TabsTrigger
                            value="Hotspot"
                            className="bg-transparent data-[state=active]:bg-transparent text-muted-foreground data-[state=active]:text-foreground rounded-lg px-4 py-2 hover:bg-muted/50"
                        >
                            Hotspot ({mockPackages.filter(p => p.category === "Hotspot").length})
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            {/* Actions & Search */}
            <SearchFilterBar
                onSearch={handleSearch}
                searchPlaceholder="Search packages..."
                actions={
                    <div className="flex items-center gap-2">
                        <Button
                            onClick={() => setCreateModalOpen(true)}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg shadow-indigo-500/20 cursor-pointer"
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Create Package
                        </Button>
                        <Button
                            className="bg-amber-500 hover:bg-amber-600 text-white rounded-xl shadow-lg shadow-amber-500/20 cursor-pointer"
                        >
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Refresh Radius Packages
                        </Button>
                        <Button
                            size="icon"
                            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg shadow-indigo-500/20 cursor-pointer"
                        >
                            <Settings className="h-4 w-4" />
                        </Button>
                    </div>
                }
            />

            {/* Table */}
            <Card className="rounded-2xl border-border/40 shadow-lg bg-card/80 backdrop-blur-xl">
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader className="bg-transparent">
                                <TableRow className="hover:bg-transparent border-border/30">
                                    <TableHead className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">NAME</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">BANDWIDTH</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">PRICE</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">VALIDITY</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">TYPE</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">STATUS</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">ACTION</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredPackages.length > 0 ? (
                                    filteredPackages.map((pkg) => (
                                        <TableRow key={pkg.id} className="border-border/30 hover:bg-muted/20 transition-colors">
                                            <TableCell className="font-medium text-foreground/80">{pkg.name}</TableCell>
                                            <TableCell className="text-muted-foreground">{pkg.bandwidth}</TableCell>
                                            <TableCell className="text-foreground/80">{pkg.price}</TableCell>
                                            <TableCell className="text-muted-foreground">{pkg.validity}</TableCell>
                                            <TableCell>
                                                <Badge className="bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-400 hover:bg-cyan-200 dark:hover:bg-cyan-900/60 border-0 rounded-md px-2 py-0.5 font-normal">
                                                    {pkg.type}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400 hover:bg-emerald-200 dark:hover:bg-emerald-900/60 border-0 rounded-md px-2 py-0.5 font-normal">
                                                    {pkg.status}
                                                </Badge>
                                            </TableCell>

                                            <TableCell>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-muted-foreground hover:text-foreground cursor-pointer"
                                                >
                                                    <Pen className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                                            No packages found in {activeTab} category.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            <CreatePackageModal
                open={createModalOpen}
                onOpenChange={setCreateModalOpen}
                onSubmit={(data) => {
                    console.log("Creating package:", data);
                }}
            />
        </div>
    );
}
