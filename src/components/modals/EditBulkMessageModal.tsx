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
import { X } from "lucide-react";

interface BulkMessage {
  id: string;
  name: string;
  template: string;
  status: "active" | "scheduled" | "sent" | "failed";
  sentDate: string;
  recipientCount: number;
}

interface EditBulkMessageModalProps {
  message: BulkMessage | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: EditBulkMessageData) => void;
}

export interface EditBulkMessageData {
  id: string;
  name: string;
  template: string;
  status: "active" | "scheduled" | "sent" | "failed";
}

export function EditBulkMessageModal({
  message,
  open,
  onOpenChange,
  onSubmit,
}: EditBulkMessageModalProps) {
  const [formData, setFormData] = React.useState<EditBulkMessageData>({
    id: "",
    name: "",
    template: "",
    status: "active",
  });

  React.useEffect(() => {
    if (message) {
      setFormData({
        id: message.id,
        name: message.name,
        template: message.template,
        status: message.status,
      });
    }
  }, [message]);

  if (!message) return null;

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
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-2xl font-montserrat">
                Edit Campaign
              </DialogTitle>
              <DialogDescription className="mt-1">
                Update bulk message campaign details
              </DialogDescription>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="h-6 w-6 cursor-pointer hover:bg-muted"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          {/* Campaign Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-montserrat">
              Campaign Name<span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter campaign name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="rounded-xl"
            />
          </div>

          {/* Template */}
          <div className="space-y-2">
            <Label htmlFor="template" className="text-sm font-montserrat">
              Template<span className="text-destructive">*</span>
            </Label>
            <Select
              value={formData.template}
              onValueChange={(value) => handleSelectChange("template", value)}
            >
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Select template" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Invoice Reminder">Invoice Reminder</SelectItem>
                <SelectItem value="Service Update">Service Update</SelectItem>
                <SelectItem value="Maintenance Notice">Maintenance Notice</SelectItem>
                <SelectItem value="Payment Confirmation">Payment Confirmation</SelectItem>
                <SelectItem value="Expiry Notice">Expiry Notice</SelectItem>
                <SelectItem value="Announcement">Announcement</SelectItem>
                <SelectItem value="Survey Link">Survey Link</SelectItem>
                <SelectItem value="Promotion">Promotion</SelectItem>
                <SelectItem value="Security Notice">Security Notice</SelectItem>
                <SelectItem value="Newsletter">Newsletter</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label htmlFor="status" className="text-sm font-montserrat">
              Status<span className="text-destructive">*</span>
            </Label>
            <Select
              value={formData.status}
              onValueChange={(value) =>
                handleSelectChange("status", value)
              }
            >
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="sent">Sent</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Form Actions */}
          <div className="flex gap-3 pt-6">
            <Button
              type="submit"
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl font-montserrat cursor-pointer"
            >
              Save Changes
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 rounded-xl font-montserrat cursor-pointer"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
