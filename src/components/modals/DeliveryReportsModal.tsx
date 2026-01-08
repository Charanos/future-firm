"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BarChart3, Download } from "lucide-react";

interface DeliveryReportsModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSubmit?: (data: DeliveryReportFormData) => void;
}

export interface DeliveryReportFormData {
  bulkMessageId: string;
  statusFilter: string;
  startDate: string;
  endDate: string;
}

export function DeliveryReportsModal({
  open,
  onOpenChange,
  onSubmit,
}: DeliveryReportsModalProps) {
  const [formData, setFormData] = React.useState<DeliveryReportFormData>({
    bulkMessageId: "",
    statusFilter: "all",
    startDate: "",
    endDate: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
    onOpenChange?.(false);
  };

  const mockBulkMessages = [
    { id: "msg_001", name: "Invoice Reminder - Jan 2025" },
    { id: "msg_002", name: "Service Upgrade Notification" },
    { id: "msg_003", name: "Maintenance Notification" },
    { id: "msg_004", name: "Payment Confirmation" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-heading font-semibold">
            Delivery Reports
          </DialogTitle>
          <DialogDescription>
            View delivery status for bulk SMS campaigns
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Bulk Message Selection */}
          <div className="space-y-2">
            <Label htmlFor="bulkMessageId" className="text-sm font-medium">
              Select Campaign<span className="text-rose-500">*</span>
            </Label>
            <Select
              value={formData.bulkMessageId}
              onValueChange={(value) => handleSelectChange("bulkMessageId", value)}
            >
              <SelectTrigger className="rounded-xl border-border/40">
                <SelectValue placeholder="Choose a campaign" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                {mockBulkMessages.map((msg) => (
                  <SelectItem key={msg.id} value={msg.id}>
                    {msg.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Status Filter */}
          <div className="space-y-2">
            <Label htmlFor="statusFilter" className="text-sm font-medium">
              Filter by Status
            </Label>
            <Select
              value={formData.statusFilter}
              onValueChange={(value) => handleSelectChange("statusFilter", value)}
            >
              <SelectTrigger className="rounded-xl border-border/40">
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="sent">Sent</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate" className="text-sm font-medium">
                Start Date
              </Label>
              <Input
                id="startDate"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleInputChange}
                className="rounded-xl border-border/40 cursor-text"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate" className="text-sm font-medium">
                End Date
              </Label>
              <Input
                id="endDate"
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleInputChange}
                className="rounded-xl border-border/40 cursor-text"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex gap-3 pt-6">
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 rounded-xl font-medium cursor-pointer gap-2"
            >
              <Download className="h-4 w-4" />
              Generate Report
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange?.(false)}
              className="flex-1 rounded-xl font-medium cursor-pointer hover:bg-muted/60"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
