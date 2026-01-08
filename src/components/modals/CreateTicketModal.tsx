"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Upload } from "lucide-react";

interface CreateTicketModalProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    onSubmit?: (data: TicketFormData) => void;
}

export interface TicketFormData {
    customer: string;
    technician: string;
    dueDate: string;
    dueTime: string;
    subject: string;
    description: string;
    notes: string;
    attachments: FileList | null;
}

export function CreateTicketModal({
    open,
    onOpenChange,
    onSubmit,
}: CreateTicketModalProps) {
    const [formData, setFormData] = React.useState<TicketFormData>({
        customer: "",
        technician: "",
        dueDate: "",
        dueTime: "",
        subject: "",
        description: "",
        notes: "",
        attachments: null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit?.(formData);
        // Reset form
        setFormData({
            customer: "",
            technician: "",
            dueDate: "",
            dueTime: "",
            subject: "",
            description: "",
            notes: "",
            attachments: null,
        });
    };

    const handleChange = (field: keyof TicketFormData, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="rounded-3xl max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-heading font-semibold">
                        Create New Ticket
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 py-4">
                    {/* Customer and Technician */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="customer" className="text-sm font-medium">
                                Customer <span className="text-rose-500">*</span>
                            </Label>
                            <Select
                                value={formData.customer}
                                onValueChange={(value: string) => handleChange("customer", value)}
                                required
                            >
                                <SelectTrigger className="rounded-xl border-border/40 cursor-pointer">
                                    <SelectValue placeholder="Select a customer" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl">
                                    <SelectItem value="owen">Owen faoult</SelectItem>
                                    <SelectItem value="adalla">Adalla Wanjoqi</SelectItem>
                                    <SelectItem value="ahmad">Ahmad Kintu</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="technician" className="text-sm font-medium">
                                Assign Technician <span className="text-rose-500">*</span>
                            </Label>
                            <Select
                                value={formData.technician}
                                onValueChange={(value: string) => handleChange("technician", value)}
                                required
                            >
                                <SelectTrigger className="rounded-xl border-border/40 cursor-pointer">
                                    <SelectValue placeholder="Select technician" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl">
                                    <SelectItem value="future_optics">FUTURE OPTICS</SelectItem>
                                    <SelectItem value="technician_1">Technician 1</SelectItem>
                                    <SelectItem value="technician_2">Technician 2</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Due Date and Time */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="dueDate" className="text-sm font-medium">
                                Due Date
                            </Label>
                            <Input
                                id="dueDate"
                                type="date"
                                value={formData.dueDate}
                                onChange={(e) => handleChange("dueDate", e.target.value)}
                                className="rounded-xl border-border/40 focus:border-primary/40 cursor-pointer"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="dueTime" className="text-sm font-medium">
                                Due Time <span className="text-rose-500">*</span>
                            </Label>
                            <Input
                                id="dueTime"
                                type="time"
                                value={formData.dueTime}
                                onChange={(e) => handleChange("dueTime", e.target.value)}
                                required
                                className="rounded-xl border-border/40 focus:border-primary/40 cursor-pointer"
                            />
                        </div>
                    </div>

                    {/* Subject */}
                    <div className="space-y-2">
                        <Label htmlFor="subject" className="text-sm font-medium">
                            Ticket Subject <span className="text-rose-500">*</span>
                        </Label>
                        <Input
                            id="subject"
                            value={formData.subject}
                            onChange={(e) => handleChange("subject", e.target.value)}
                            placeholder="Enter ticket subject"
                            required
                            className="rounded-xl border-border/40 focus:border-primary/40 cursor-text"
                        />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label htmlFor="description" className="text-sm font-medium">
                            Ticket Description
                        </Label>
                        <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => handleChange("description", e.target.value)}
                            placeholder="Describe the issue..."
                            rows={4}
                            className="rounded-xl border-border/40 focus:border-primary/40 resize-none cursor-text"
                        />
                    </div>

                    {/* Notes */}
                    <div className="space-y-2">
                        <Label htmlFor="notes" className="text-sm font-medium">
                            Ticket Notes
                        </Label>
                        <Textarea
                            id="notes"
                            value={formData.notes}
                            onChange={(e) => handleChange("notes", e.target.value)}
                            placeholder="Add any internal notes..."
                            rows={3}
                            className="rounded-xl border-border/40 focus:border-primary/40 resize-none cursor-text"
                        />
                    </div>

                    {/* Attachments */}
                    <div className="space-y-2">
                        <Label className="text-sm font-medium">
                            Attachments
                        </Label>
                        <div className="border border-dashed border-border/40 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-muted/10 transition-colors">
                            <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                            <p className="text-sm font-medium">Click to upload</p>
                            <p className="text-xs text-muted-foreground mt-1">your file here</p>
                            <Input
                                type="file"
                                className="hidden"
                                onChange={(e) => handleChange("attachments", e.target.files)}
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
                            Close
                        </Button>
                        <Button
                            type="submit"
                            className="rounded-xl px-6 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 cursor-pointer"
                        >
                            Create Ticket
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
