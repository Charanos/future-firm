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
import { Send } from "lucide-react";

interface SendBulkSmsModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSubmit?: (data: BulkSmsFormData) => void;
}

export interface BulkSmsFormData {
  recipientGroup: string;
  message: string;
  scheduleTime: string;
}

export function SendBulkSmsModal({
  open,
  onOpenChange,
  onSubmit,
}: SendBulkSmsModalProps) {
  const [formData, setFormData] = React.useState<BulkSmsFormData>({
    recipientGroup: "",
    message: "",
    scheduleTime: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    setFormData({
      recipientGroup: "",
      message: "",
      scheduleTime: "",
    });
    onOpenChange?.(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-heading font-semibold">
            Send Bulk SMS
          </DialogTitle>
          <DialogDescription>
            Send SMS messages to customer groups
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Recipient Group */}
          <div className="space-y-2">
            <Label htmlFor="recipientGroup" className="text-sm font-medium">
              Recipient Group<span className="text-rose-500">*</span>
            </Label>
            <Select
              value={formData.recipientGroup}
              onValueChange={(value) => handleSelectChange("recipientGroup", value)}
            >
              <SelectTrigger className="rounded-xl border-border/40">
                <SelectValue placeholder="Select recipient group" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="all">All Customers</SelectItem>
                <SelectItem value="active">Active Customers</SelectItem>
                <SelectItem value="expiring">Expiring Soon</SelectItem>
                <SelectItem value="offline">Offline Customers</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message" className="text-sm font-medium">
              Message<span className="text-rose-500">*</span>
            </Label>
            <textarea
              id="message"
              name="message"
              placeholder="Enter your SMS message here..."
              value={formData.message}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full rounded-xl px-3 py-2 border border-border/40 bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
            />
            <p className="text-xs text-muted-foreground">
              {formData.message.length}/160 characters
            </p>
          </div>

          {/* Schedule Time */}
          <div className="space-y-2">
            <Label htmlFor="scheduleTime" className="text-sm font-medium">
              Schedule Time (Optional)
            </Label>
            <Input
              id="scheduleTime"
              name="scheduleTime"
              type="datetime-local"
              value={formData.scheduleTime}
              onChange={handleInputChange}
              className="rounded-xl border-border/40 cursor-text"
            />
          </div>

          {/* Form Actions */}
          <div className="flex gap-3 pt-6">
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 rounded-xl font-medium cursor-pointer gap-2"
            >
              <Send className="h-4 w-4" />
              Send SMS
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
