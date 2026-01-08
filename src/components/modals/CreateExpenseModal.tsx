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
    DialogDescription,
} from "@/components/ui/dialog";
import { DollarSign } from "lucide-react";

interface CreateExpenseModalProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    onSubmit?: (data: ExpenseData) => void;
}

export interface ExpenseData {
    title: string;
    amount: string;
    date: string;
    description: string;
}

export function CreateExpenseModal({
    open,
    onOpenChange,
    onSubmit,
}: CreateExpenseModalProps) {
    const [formData, setFormData] = React.useState<ExpenseData>({
        title: "",
        amount: "",
        date: "",
        description: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit?.(formData);
        setFormData({ title: "", amount: "", date: "", description: "" });
        onOpenChange?.(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md rounded-3xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-heading font-semibold">
                        Add Expense
                    </DialogTitle>
                    <DialogDescription>
                        Record a new business expense
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 pt-4">
                    <div className="space-y-2">
                        <Label htmlFor="title" className="text-sm font-medium">
                            Expense Title <span className="text-rose-500">*</span>
                        </Label>
                        <Input
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder="e.g. Office Rent"
                            required
                            className="rounded-xl border-border/40"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="amount" className="text-sm font-medium">
                            Amount (Ksh) <span className="text-rose-500">*</span>
                        </Label>
                        <Input
                            id="amount"
                            name="amount"
                            type="number"
                            value={formData.amount}
                            onChange={handleInputChange}
                            placeholder="0.00"
                            required
                            className="rounded-xl border-border/40"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="date" className="text-sm font-medium">
                            Date <span className="text-rose-500">*</span>
                        </Label>
                        <Input
                            id="date"
                            name="date"
                            type="date"
                            value={formData.date}
                            onChange={handleInputChange}
                            required
                            className="rounded-xl border-border/40"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description" className="text-sm font-medium">
                            Description
                        </Label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Additional details..."
                            rows={3}
                            className="w-full rounded-xl px-3 py-2 border border-border/40 bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange?.(false)}
                            className="rounded-xl px-6"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="rounded-xl px-6 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90"
                        >
                            <DollarSign className="h-4 w-4 mr-2" />
                            Add Expense
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
