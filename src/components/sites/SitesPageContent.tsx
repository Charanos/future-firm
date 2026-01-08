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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Power, Plus, Settings, ArrowLeft, Copy, Router, Wifi, Network, Clock, CheckCircle2 } from "lucide-react";
import { CreateSiteModal } from "@/components/modals/CreateSiteModal";
import { SearchFilterBar } from "@/components/ui/search-filter-bar";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

interface Site {
    id: string;
    siteName: string;
    ipAddress: string;
    secret: string;
    type: string;
    status: "Online" | "Offline";
}

const mockSites: Site[] = [
    { id: "1", siteName: "CBD", ipAddress: "10.108.0.4", secret: "thefuture2025", type: "Radius", status: "Online" },
    { id: "2", siteName: "futur941", ipAddress: "10.108.0.100", secret: "V7ke2ykf", type: "Radius", status: "Offline" },
];

export default function SitesPageContent() {
    const [createModalOpen, setCreateModalOpen] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState("");
    const [selectedSite, setSelectedSite] = React.useState<Site | null>(null);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    const filteredSites = mockSites.filter(site =>
        site.siteName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        site.ipAddress.includes(searchQuery)
    );

    const pppoeExpiryScript = `#Mikrotik Non-payment page (Dont change anything here)
/ip firewall address-list
add address=redirect.thefuturefirm.net list="THEFUTURE_REDIRECT_IP" comment="-- DON'T REMOVE ::: THEFUTURE EXPIRED USERS --"
/ip firewall filter
add action=reject chain=forward dst-port=!80,3346 protocol=tcp reject-with=\\
    icmp-network-unreachable src-address-list=DISABLED_USERS comment="-- DON'T REMOVE ::: THEFUTURE EXPIRED USERS --"
add action=accept chain=forward dst-port=53 \\
    protocol=tcp src-address-list=DISABLED_USERS comment="-- DON'T REMOVE ::: THEFUTURE EXPIRED USERS --"
add action=accept chain=forward dst-port=53 protocol=udp src-address-list=DISABLED_USERS \\
    comment="-- DON'T REMOVE ::: THEFUTURE EXPIRED USERS --"
add action=drop chain=forward src-address-list=DISABLED_USERS comment="-- DON'T REMOVE ::: THEFUTURE EXPIRED USERS --"
/ip firewall nat
add action=masquerade chain=srcnat dst-address=8.8.8.8 \\
    src-address-list=DISABLED_USERS comment="-- DON'T REMOVE ::: THEFUTURE EXPIRED USERS --"
add action=masquerade chain=srcnat dst-address=8.8.4.4 \\
    src-address-list=DISABLED_USERS comment="-- DON'T REMOVE ::: THEFUTURE EXPIRED USERS --"
add action=redirect chain=dstnat dst-port=80 protocol=tcp \\
    src-address-list=DISABLED_USERS to-ports=3346 comment="-- DON'T REMOVE ::: THEFUTURE EXPIRED USERS --"
/ip proxy
set enabled=yes max-cache-size=none parent-proxy=0.0.0.0 port=3346 src-address=0.0.0.0
/ip proxy access
add action=deny dst-host=!*.thefuturefirm.net redirect-to=\\
    redirect.thefuturefirm.net/api/expired/${selectedSite?.ipAddress || "10.108.0.4"}
####v7.X
add action=redirect dst-host=!*.thefuturefirm.net action-data=\\
    redirect.thefuturefirm.net/api/expired/${selectedSite?.ipAddress || "10.108.0.4"} 
    ####`;

    // Detail View
    if (selectedSite) {
        return (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-10 duration-500">
                {/* Back Button */}
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" onClick={() => setSelectedSite(null)} className="gap-2 text-muted-foreground hover:text-foreground cursor-pointer">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Sites
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Side: Site Info Card */}
                    <div className="space-y-6 lg:col-span-1">
                        <Card className="rounded-3xl border-border/40 shadow-xl bg-slate-900/50 backdrop-blur-xl overflow-hidden">
                            <CardContent className="p-6 space-y-6">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="bg-muted/20 p-2 rounded-xl">
                                        <Router className="h-6 w-6 text-foreground" />
                                    </div>
                                    <h2 className="text-xl font-semibold">{selectedSite.siteName}</h2>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-sm">
                                        <Network className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-muted-foreground">IP:</span>
                                        <span className="font-mono text-foreground">{selectedSite.ipAddress}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <Router className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-muted-foreground">Name:</span>
                                        <span className="text-foreground">{selectedSite.siteName}</span>
                                    </div>
                                    <div className="pt-2">
                                        <Badge className={`border-0 rounded-md px-3 py-1 font-normal ${selectedSite.status === "Online"
                                            ? "bg-emerald-500 text-white"
                                            : "bg-rose-500 text-white"
                                            }`}>
                                            <div className="flex items-center gap-2">
                                                <div className="h-2 w-2 rounded-full bg-white animate-pulse" />
                                                Status: {selectedSite.status}
                                            </div>
                                        </Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="space-y-3">
                            <Button className="w-full h-12 justify-center text-md bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg shadow-indigo-500/25 cursor-pointer">
                                Assign New Packages
                            </Button>
                            <Button className="w-full h-12 justify-center text-md bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg shadow-indigo-500/25 cursor-pointer">
                                Download Hotspot Page
                            </Button>
                        </div>
                    </div>

                    {/* Right Side: Configuration */}
                    <div className="lg:col-span-2">
                        <Card className="rounded-3xl border-border/40 shadow-xl bg-slate-900/30 backdrop-blur-xl overflow-hidden h-full">
                            <CardHeader className="border-b border-border/20 p-6">
                                <CardTitle className="text-lg font-medium">Configure Mikrotik</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <Accordion type="single" collapsible className="w-full">
                                    <AccordionItem value="routeros" className="border-b border-border/20 px-6">
                                        <AccordionTrigger className="hover:no-underline py-5 text-sm font-medium">
                                            RouterOS OVPN & Radius Config
                                        </AccordionTrigger>
                                        <AccordionContent className="pb-5 text-muted-foreground">
                                            Configuration details for OVPN & Radius...
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="hotspot" className="border-b border-border/20 px-6">
                                        <AccordionTrigger className="hover:no-underline py-5 text-sm font-medium">
                                            Hotspot - Config
                                        </AccordionTrigger>
                                        <AccordionContent className="pb-5 text-muted-foreground">
                                            Configuration details for Hotspot...
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="pppoe" className="border-b border-border/20 px-6">
                                        <AccordionTrigger className="hover:no-underline py-5 text-sm font-medium">
                                            PPPoE - Config
                                        </AccordionTrigger>
                                        <AccordionContent className="pb-5 text-muted-foreground">
                                            Configuration details for PPPoE...
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="pppoe-expiry" className="border-border/20 px-6">
                                        <AccordionTrigger className="hover:no-underline py-5 text-sm font-medium">
                                            PPPoE Expiry - Config
                                        </AccordionTrigger>
                                        <AccordionContent className="pb-6">
                                            <div className="relative rounded-xl overflow-hidden bg-[#1e1e1e] border border-border/20">
                                                <div className="absolute top-2 right-2">
                                                    <Button size="sm" variant="secondary" className="h-7 text-xs gap-1 opacity-80 hover:opacity-100 cursor-pointer">
                                                        <Copy className="h-3 w-3" /> Copy
                                                    </Button>
                                                </div>
                                                <pre className="p-4 text-xs font-mono text-gray-300 overflow-x-auto custom-scrollbar leading-relaxed">
                                                    {pppoeExpiryScript}
                                                </pre>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }

    // List View
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-heading font-semibold">Sites</h1>
                    <p className="text-sm text-muted-foreground">Manage your network sites</p>
                </div>
            </div>

            {/* Search and Filters */}
            <SearchFilterBar
                onSearch={handleSearch}
                searchPlaceholder="Search..."
                actions={
                    <div className="flex items-center gap-2">
                        <Button
                            onClick={() => setCreateModalOpen(true)}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg shadow-indigo-500/20 cursor-pointer"
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Create Site
                        </Button>
                        <Button
                            size="icon"
                            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg shadow-indigo-500/20 cursor-pointer"
                        >
                            <Settings className="h-4 w-4" />
                        </Button>
                    </div>
                }
                className="w-full"
            />

            {/* Table */}
            <Card className="rounded-2xl border-border/40 shadow-lg bg-card/80 backdrop-blur-xl">
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader className="bg-transparent">
                                <TableRow className="hover:bg-transparent border-border/30">
                                    <TableHead className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">SITE NAME</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">IP ADDRESS</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">SECRET</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">TYPE</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">STATUS</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">ACTION</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredSites.map((site) => (
                                    <TableRow key={site.id} className="border-border/30 hover:bg-muted/20 transition-colors">
                                        <TableCell className="font-medium text-foreground/80">{site.siteName}</TableCell>
                                        <TableCell className="text-muted-foreground">{site.ipAddress}</TableCell>
                                        <TableCell className="text-muted-foreground font-mono text-xs">{site.secret}</TableCell>
                                        <TableCell className="text-muted-foreground">{site.type}</TableCell>
                                        <TableCell>
                                            <Badge className={`border-0 rounded-md px-2 py-0.5 font-normal ${site.status === "Online"
                                                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/60"
                                                : "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/60"
                                                }`}>
                                                {site.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex gap-2">
                                                <Button
                                                    size="sm"
                                                    onClick={() => setSelectedSite(site)}
                                                    className="h-8 w-10 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md cursor-pointer"
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    className="h-8 w-10 bg-rose-600 hover:bg-rose-700 text-white rounded-md cursor-pointer"
                                                >
                                                    <Power className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            <CreateSiteModal
                open={createModalOpen}
                onOpenChange={setCreateModalOpen}
                onSubmit={(data) => {
                    console.log("Creating site:", data);
                }}
            />
        </div>
    );
}
