"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
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

interface CreatePackageModalProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    onSubmit?: (data: any) => void;
}

export function CreatePackageModal({
    open,
    onOpenChange,
    onSubmit,
}: CreatePackageModalProps) {
    const [formData, setFormData] = React.useState({
        device: "Radius",
        planName: "",
        planPrice: "",
        planType: "PPPoE",
        sharedUsers: "",
        planValidity: "",
        validityUnit: "Months",
        downloadSpeed: "",
        downloadSpeedUnit: "Kbps",
        uploadSpeed: "",
        uploadSpeedUnit: "Kbps",
        dataLimit: false,
        taxPercentage: "",
        taxType: "Inclusive",
        burstEnabled: false,
        fupEnabled: false,
    });

    const handleChange = (field: string, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit?.(formData);
        onOpenChange?.(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl bg-card/90 backdrop-blur-xl border-border/40 rounded-3xl max-h-[90vh] overflow-y-auto custom-scrollbar">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">Create Package</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Device */}
                        <div className="space-y-2">
                            <Label className="text-muted-foreground/80 text-xs uppercase tracking-wide">
                                Device <span className="text-rose-500">*</span>
                            </Label>
                            <Input
                                value={formData.device}
                                onChange={(e) => handleChange("device", e.target.value)}
                                className="bg-background/50 border-border/40 rounded-xl"
                                placeholder="Radius"
                            />
                        </div>

                        {/* Plan Name */}
                        <div className="space-y-2">
                            <Label className="text-muted-foreground/80 text-xs uppercase tracking-wide">
                                Plan Name <span className="text-rose-500">*</span>
                            </Label>
                            <Input
                                value={formData.planName}
                                onChange={(e) => handleChange("planName", e.target.value)}
                                className="bg-background/50 border-border/40 rounded-xl"
                                placeholder="Enter Plan Name"
                            />
                        </div>

                        {/* Plan Price */}
                        <div className="space-y-2">
                            <Label className="text-muted-foreground/80 text-xs uppercase tracking-wide">
                                Plan Price <span className="text-rose-500">*</span>
                            </Label>
                            <Input
                                value={formData.planPrice}
                                onChange={(e) => handleChange("planPrice", e.target.value)}
                                className="bg-background/50 border-border/40 rounded-xl"
                                placeholder="Enter Plan Price"
                            />
                        </div>

                        {/* Plan Type */}
                        <div className="space-y-2">
                            <Label className="text-muted-foreground/80 text-xs uppercase tracking-wide">
                                Plan Type <span className="text-rose-500">*</span>
                            </Label>
                            <Input
                                value={formData.planType}
                                onChange={(e) => handleChange("planType", e.target.value)}
                                className="bg-background/50 border-border/40 rounded-xl"
                                placeholder="PPPoE"
                            />
                        </div>

                        {/* Shared Users */}
                        <div className="space-y-2">
                            <Label className="text-muted-foreground/80 text-xs uppercase tracking-wide">
                                Shared Users <span className="text-rose-500">*</span>
                            </Label>
                            <Input
                                value={formData.sharedUsers}
                                onChange={(e) => handleChange("sharedUsers", e.target.value)}
                                className="bg-background/50 border-border/40 rounded-xl"
                                placeholder="Enter Shared Users"
                            />
                        </div>

                        {/* Plan Validity */}
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <Label className="text-muted-foreground/80 text-xs uppercase tracking-wide">
                                    Plan Validity <span className="text-rose-500">*</span>
                                </Label>
                                <Label className="text-muted-foreground/80 text-xs uppercase tracking-wide">
                                    Validity Unit <span className="text-rose-500">*</span>
                                </Label>
                            </div>
                            <div className="flex gap-2">
                                <Input
                                    value={formData.planValidity}
                                    onChange={(e) => handleChange("planValidity", e.target.value)}
                                    className="bg-background/50 border-border/40 rounded-xl flex-1"
                                    placeholder="Validity"
                                />
                                <Select
                                    value={formData.validityUnit}
                                    onValueChange={(val) => handleChange("validityUnit", val)}
                                >
                                    <SelectTrigger className="w-32 bg-background/50 border-border/40 rounded-xl">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Minutes">Minutes</SelectItem>
                                        <SelectItem value="Hours">Hours</SelectItem>
                                        <SelectItem value="Days">Days</SelectItem>
                                        <SelectItem value="Months">Months</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Download Speed */}
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <Label className="text-muted-foreground/80 text-xs uppercase tracking-wide">
                                    Download Speed <span className="text-rose-500">*</span>
                                </Label>
                                <Label className="text-muted-foreground/80 text-xs uppercase tracking-wide">
                                    Speed Unit <span className="text-rose-500">*</span>
                                </Label>
                            </div>
                            <div className="flex gap-2">
                                <Input
                                    value={formData.downloadSpeed}
                                    onChange={(e) => handleChange("downloadSpeed", e.target.value)}
                                    className="bg-background/50 border-border/40 rounded-xl flex-1"
                                    placeholder="Download Speed"
                                />
                                <Select
                                    value={formData.downloadSpeedUnit}
                                    onValueChange={(val) => handleChange("downloadSpeedUnit", val)}
                                >
                                    <SelectTrigger className="w-32 bg-background/50 border-border/40 rounded-xl">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Kbps">Kbps</SelectItem>
                                        <SelectItem value="Mbps">Mbps</SelectItem>
                                        <SelectItem value="Gbps">Gbps</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Upload Speed */}
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <Label className="text-muted-foreground/80 text-xs uppercase tracking-wide">
                                    Upload Speed <span className="text-rose-500">*</span>
                                </Label>
                                <Label className="text-muted-foreground/80 text-xs uppercase tracking-wide">
                                    Speed Unit <span className="text-rose-500">*</span>
                                </Label>
                            </div>
                            <div className="flex gap-2">
                                <Input
                                    value={formData.uploadSpeed}
                                    onChange={(e) => handleChange("uploadSpeed", e.target.value)}
                                    className="bg-background/50 border-border/40 rounded-xl flex-1"
                                    placeholder="Upload Speed"
                                />
                                <Select
                                    value={formData.uploadSpeedUnit}
                                    onValueChange={(val) => handleChange("uploadSpeedUnit", val)}
                                >
                                    <SelectTrigger className="w-32 bg-background/50 border-border/40 rounded-xl">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Kbps">Kbps</SelectItem>
                                        <SelectItem value="Mbps">Mbps</SelectItem>
                                        <SelectItem value="Gbps">Gbps</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    {/* Data Limit Toggle */}
                    <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium">Data Limit</Label>
                        <Switch
                            checked={formData.dataLimit}
                            onCheckedChange={(val) => handleChange("dataLimit", val)}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Tax Percentage */}
                        <div className="space-y-2">
                            <Label className="text-muted-foreground/80 text-xs uppercase tracking-wide">
                                Tax Percentage (Optional)
                            </Label>
                            <Input
                                value={formData.taxPercentage}
                                onChange={(e) => handleChange("taxPercentage", e.target.value)}
                                className="bg-background/50 border-border/40 rounded-xl"
                                placeholder="16% VAT"
                            />
                        </div>

                        {/* Tax Type */}
                        <div className="space-y-2">
                            <Label className="text-muted-foreground/80 text-xs uppercase tracking-wide">
                                Tax Type (Optional)
                            </Label>
                            <Select
                                value={formData.taxType}
                                onValueChange={(val) => handleChange("taxType", val)}
                            >
                                <SelectTrigger className="bg-background/50 border-border/40 rounded-xl">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Inclusive">Inclusive</SelectItem>
                                    <SelectItem value="Exclusive">Exclusive</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Burst Toggle */}
                        <div className="flex items-center justify-between">
                            <Label className="text-sm font-medium">Burst is enable(on/off)</Label>
                            <Switch
                                checked={formData.burstEnabled}
                                onCheckedChange={(val) => handleChange("burstEnabled", val)}
                            />
                        </div>

                        {/* FUP Toggle */}
                        <div className="flex items-center justify-between">
                            <Label className="text-sm font-medium">Enable FUP(on/off)</Label>
                            <Switch
                                checked={formData.fupEnabled}
                                onCheckedChange={(val) => handleChange("fupEnabled", val)}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-6">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => onOpenChange?.(false)}
                            className="rounded-xl px-8 hover:bg-muted/80"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="rounded-xl px-8 bg-indigo-600 hover:bg-indigo-700 text-white"
                        >
                            Create
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
