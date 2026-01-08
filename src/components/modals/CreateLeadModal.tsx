"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

interface CreateLeadModalProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    onSubmit?: (data: LeadFormData) => void;
}

export interface LeadFormData {
    name: string;
    email: string;
    phone: string;
    location: string;
    notes: string;
}

export function CreateLeadModal({
    open,
    onOpenChange,
    onSubmit,
}: CreateLeadModalProps) {
    const [formData, setFormData] = React.useState<LeadFormData>({
        name: "",
        email: "",
        phone: "",
        location: "",
        notes: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit?.(formData);
        // Reset form
        setFormData({
            name: "",
            email: "",
            phone: "",
            location: "",
            notes: "",
        });
    };

    const handleChange = (field: keyof LeadFormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="rounded-3xl max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-heading font-semibold">
                        Create New Lead
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 py-4">
                    {/* Lead Information */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-heading font-semibold text-muted-foreground uppercase tracking-wide">
                            Lead Information
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Lead Name */}
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-sm font-medium">
                                    Lead Name <span className="text-rose-500">*</span>
                                </Label>
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => handleChange("name", e.target.value)}
                                    placeholder="Enter lead name"
                                    required
                                    className="rounded-xl border-border/40 focus:border-primary/40 cursor-text"
                                />
                            </div>

                            {/* Lead Email */}
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm font-medium">
                                    Lead Email
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => handleChange("email", e.target.value)}
                                    placeholder="email@example.com"
                                    className="rounded-xl border-border/40 focus:border-primary/40 cursor-text"
                                />
                            </div>

                            {/* Lead Phone */}
                            <div className="space-y-2">
                                <Label htmlFor="phone" className="text-sm font-medium">
                                    Lead Phone <span className="text-rose-500">*</span>
                                </Label>
                                <Input
                                    id="phone"
                                    value={formData.phone}
                                    onChange={(e) => handleChange("phone", e.target.value)}
                                    placeholder="0712345678"
                                    required
                                    className="rounded-xl border-border/40 focus:border-primary/40 cursor-text"
                                />
                            </div>

                            {/* Lead Location */}
                            <div className="space-y-2">
                                <Label htmlFor="location" className="text-sm font-medium">
                                    Lead Location <span className="text-rose-500">*</span>
                                </Label>
                                <Input
                                    id="location"
                                    value={formData.location}
                                    onChange={(e) => handleChange("location", e.target.value)}
                                    placeholder="Enter location"
                                    required
                                    className="rounded-xl border-border/40 focus:border-primary/40 cursor-text"
                                />
                            </div>
                        </div>

                        {/* Notes */}
                        <div className="space-y-2">
                            <Label htmlFor="notes" className="text-sm font-medium">
                                Notes
                            </Label>
                            <Textarea
                                id="notes"
                                value={formData.notes}
                                onChange={(e) => handleChange("notes", e.target.value)}
                                placeholder="Add any additional notes about this lead..."
                                rows={4}
                                className="rounded-xl border-border/40 focus:border-primary/40 resize-none cursor-text"
                            />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-border/30">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange?.(false)}
                            className="rounded-xl px-6 cursor-pointer hover:bg-muted/60"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="rounded-xl px-6 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 cursor-pointer"
                        >
                            Create Lead
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
