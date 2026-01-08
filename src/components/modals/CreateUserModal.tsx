"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface CreateUserModalProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    onSubmit?: (data: UserFormData) => void;
}

export interface UserFormData {
    fullname: string;
    username: string;
    email: string;
    role: string;
    password?: string;
}

export function CreateUserModal({
    open,
    onOpenChange,
    onSubmit,
}: CreateUserModalProps) {
    const [formData, setFormData] = React.useState<UserFormData>({
        fullname: "",
        username: "",
        email: "",
        role: "Support",
        password: "",
    });

    const handleChange = (field: keyof UserFormData, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit?.(formData);
        onOpenChange?.(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="rounded-3xl max-w-lg bg-card/90 backdrop-blur-xl border-border/40 text-card-foreground">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">
                        Create System User
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 py-2">
                    <div className="space-y-2">
                        <Label htmlFor="fullname" className="text-xs font-medium uppercase tracking-wide text-muted-foreground/80">
                            Full Name <span className="text-rose-500">*</span>
                        </Label>
                        <Input
                            id="fullname"
                            placeholder="John Doe"
                            value={formData.fullname}
                            onChange={(e) => handleChange("fullname", e.target.value)}
                            required
                            className="rounded-xl bg-background/50 border-border/40"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="username" className="text-xs font-medium uppercase tracking-wide text-muted-foreground/80">
                                Username <span className="text-rose-500">*</span>
                            </Label>
                            <Input
                                id="username"
                                placeholder="jdoe"
                                value={formData.username}
                                onChange={(e) => handleChange("username", e.target.value)}
                                required
                                className="rounded-xl bg-background/50 border-border/40"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="role" className="text-xs font-medium uppercase tracking-wide text-muted-foreground/80">
                                Role <span className="text-rose-500">*</span>
                            </Label>
                            <Select
                                value={formData.role}
                                onValueChange={(val) => handleChange("role", val)}
                            >
                                <SelectTrigger className="rounded-xl bg-background/50 border-border/40">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl">
                                    <SelectItem value="Admin">Admin</SelectItem>
                                    <SelectItem value="Support">Support</SelectItem>
                                    <SelectItem value="Finance">Finance</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-xs font-medium uppercase tracking-wide text-muted-foreground/80">
                            Email Address
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                            className="rounded-xl bg-background/50 border-border/40"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-xs font-medium uppercase tracking-wide text-muted-foreground/80">
                            Initial Password <span className="text-rose-500">*</span>
                        </Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => handleChange("password", e.target.value)}
                            required
                            className="rounded-xl bg-background/50 border-border/40"
                        />
                    </div>

                    {/* Form Actions */}
                    <div className="flex gap-3 pt-4 justify-end">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => onOpenChange?.(false)}
                            className="rounded-xl px-6 hover:bg-muted/60"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="bg-indigo-600 text-white hover:bg-indigo-700 rounded-xl px-6 shadow-lg shadow-indigo-500/20"
                        >
                            Create User
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
