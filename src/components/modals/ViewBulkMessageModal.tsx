"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

interface ViewBulkMessageModalProps {
  message: BulkMessage | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ViewBulkMessageModal({
  message,
  open,
  onOpenChange,
}: ViewBulkMessageModalProps) {
  if (!message) return null;

  const getStatusColor = (status: BulkMessage["status"]) => {
    switch (status) {
      case "sent":
        return "bg-emerald-100 text-emerald-800";
      case "active":
        return "bg-blue-100 text-blue-800";
      case "scheduled":
        return "bg-amber-100 text-amber-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: BulkMessage["status"]) => {
    switch (status) {
      case "sent":
        return "Sent";
      case "active":
        return "Active";
      case "scheduled":
        return "Scheduled";
      case "failed":
        return "Failed";
      default:
        return status;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-2xl font-montserrat">
                Message Details
              </DialogTitle>
              <DialogDescription className="mt-1">
                View bulk message information
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

        <div className="space-y-6 py-4">
          {/* Message Name */}
          <div>
            <p className="text-xs font-montserrat font-semibold text-muted-foreground uppercase">
              Campaign Name
            </p>
            <p className="text-lg font-montserrat mt-2">{message.name}</p>
          </div>

          {/* Template */}
          <div>
            <p className="text-xs font-montserrat font-semibold text-muted-foreground uppercase">
              Template Used
            </p>
            <p className="text-base mt-2">{message.template}</p>
          </div>

          {/* Status */}
          <div>
            <p className="text-xs font-montserrat font-semibold text-muted-foreground uppercase">
              Status
            </p>
            <div className="mt-2">
              <Badge className={getStatusColor(message.status)}>
                {getStatusLabel(message.status)}
              </Badge>
            </div>
          </div>

          {/* Recipients */}
          <div>
            <p className="text-xs font-montserrat font-semibold text-muted-foreground uppercase">
              Recipients
            </p>
            <p className="text-lg font-montserrat mt-2">{message.recipientCount}</p>
          </div>

          {/* Date */}
          <div>
            <p className="text-xs font-montserrat font-semibold text-muted-foreground uppercase">
              {message.status === "scheduled" ? "Scheduled Date" : "Sent Date"}
            </p>
            <p className="text-base mt-2">{message.sentDate}</p>
          </div>

          {/* Close Button */}
          <div className="flex gap-3 pt-6">
            <Button
              onClick={() => onOpenChange(false)}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl font-montserrat cursor-pointer"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
