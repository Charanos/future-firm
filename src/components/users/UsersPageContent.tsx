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
import { Plus, Settings, MoreVertical, Shield, ShieldAlert, ShieldCheck } from "lucide-react";
import { SearchFilterBar, FilterConfig } from "@/components/ui/search-filter-bar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CreateUserModal } from "@/components/modals/CreateUserModal";

interface SystemUser {
    id: string;
    fullname: string;
    username: string;
    role: "Admin" | "Support" | "Finance";
    status: "Active" | "Inactive";
    lastLogin: string;
}

const mockUsers: SystemUser[] = [
    { id: "1", fullname: "Administrator", username: "admin", role: "Admin", status: "Active", lastLogin: "2024-01-08 10:30 AM" },
    { id: "2", fullname: "Sarah Support", username: "sarah.s", role: "Support", status: "Active", lastLogin: "2024-01-08 09:15 AM" },
    { id: "3", fullname: "John Finance", username: "john.f", role: "Finance", status: "Inactive", lastLogin: "2023-12-28 04:00 PM" },
];

export default function UsersPageContent() {
    const [createModalOpen, setCreateModalOpen] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState("");

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    const filteredUsers = mockUsers.filter(user =>
        user.fullname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getRoleIcon = (role: string) => {
        switch (role) {
            case "Admin": return <ShieldAlert className="h-4 w-4 text-rose-500" />;
            case "Support": return <ShieldCheck className="h-4 w-4 text-emerald-500" />;
            case "Finance": return <Shield className="h-4 w-4 text-blue-500" />;
            default: return <Shield className="h-4 w-4 text-muted-foreground" />;
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-heading font-semibold">System Users</h1>
                    <p className="text-sm text-muted-foreground">Manage system administrators and staff access</p>
                </div>
            </div>

            {/* Search and Filters */}
            <SearchFilterBar
                onSearch={handleSearch}
                searchPlaceholder="Search users..."
                actions={
                    <div className="flex items-center gap-2">
                        <Button
                            onClick={() => setCreateModalOpen(true)}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg shadow-indigo-500/20 cursor-pointer"
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Create User
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
                                    <TableHead className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">FULLNAME</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">USERNAME</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">ROLE</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">STATUS</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">LAST LOGIN</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">ACTION</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredUsers.map((user) => (
                                    <TableRow key={user.id} className="border-border/30 hover:bg-muted/20 transition-colors">
                                        <TableCell className="font-medium text-foreground/80">{user.fullname}</TableCell>
                                        <TableCell className="text-muted-foreground">{user.username}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                {getRoleIcon(user.role)}
                                                <span className="text-sm text-muted-foreground">{user.role}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge className={`border-0 rounded-md px-2 py-0.5 font-normal ${user.status === "Active"
                                                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/60"
                                                    : "bg-slate-100 text-slate-700 dark:bg-muted/40 dark:text-muted-foreground"
                                                }`}>
                                                {user.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-muted-foreground text-xs font-mono">{user.lastLogin}</TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg cursor-pointer">
                                                        <MoreVertical className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="rounded-xl">
                                                    <DropdownMenuItem className="cursor-pointer">Edit Details</DropdownMenuItem>
                                                    <DropdownMenuItem className="cursor-pointer">Change Password</DropdownMenuItem>
                                                    <DropdownMenuItem className="cursor-pointer text-rose-600">Delete User</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    <div className="flex items-center justify-between p-5 border-t border-border/30 text-sm text-muted-foreground">
                        <div>Showing 1 to {filteredUsers.length} of {filteredUsers.length} entries</div>
                    </div>
                </CardContent>
            </Card>

            <CreateUserModal
                open={createModalOpen}
                onOpenChange={setCreateModalOpen}
                onSubmit={(data) => {
                    console.log("Creating user:", data);
                }}
            />
        </div>
    );
}
