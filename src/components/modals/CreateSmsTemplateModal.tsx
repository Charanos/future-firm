"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FileText } from "lucide-react";

interface CreateSmsTemplateModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSubmit?: (data: SmsTemplateFormData) => void;
}

export interface SmsTemplateFormData {
  templateName: string;
  templateContent: string;
}

export function CreateSmsTemplateModal({
  open,
  onOpenChange,
  onSubmit,
}: CreateSmsTemplateModalProps) {
  const [formData, setFormData] = React.useState<SmsTemplateFormData>({
    templateName: "",
    templateContent: "",
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
    setFormData({
      templateName: "",
      templateContent: "",
    });
    onOpenChange?.(false);
  };

  const variables = [
    { key: "{{customer_name}}", description: "Customer name" },
    { key: "{{account_number}}", description: "Account number" },
    { key: "{{date}}", description: "Current date" },
    { key: "{{amount}}", description: "Invoice amount" },
    { key: "{{due_date}}", description: "Payment due date" },
    { key: "{{service_type}}", description: "Service package" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-heading font-semibold">
            Create SMS Template
          </DialogTitle>
          <DialogDescription>
            Create reusable SMS templates with dynamic variables
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Template Name */}
          <div className="space-y-2">
            <Label htmlFor="templateName" className="text-sm font-medium">
              Template Name<span className="text-rose-500">*</span>
            </Label>
            <Input
              id="templateName"
              name="templateName"
              placeholder="e.g., Invoice Reminder"
              value={formData.templateName}
              onChange={handleInputChange}
              required
              className="rounded-xl border-border/40 cursor-text"
            />
          </div>

          {/* Template Content */}
          <div className="space-y-2">
            <Label htmlFor="templateContent" className="text-sm font-medium">
              Template Content<span className="text-rose-500">*</span>
            </Label>
            <textarea
              id="templateContent"
              name="templateContent"
              placeholder="Enter your SMS template here. Use variables like {{customer_name}} to make it dynamic..."
              value={formData.templateContent}
              onChange={handleInputChange}
              required
              rows={5}
              className="w-full rounded-xl px-3 py-2 border border-border/40 bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
            />
            <p className="text-xs text-muted-foreground">
              {formData.templateContent.length}/160 characters (when variables are replaced)
            </p>
          </div>

          {/* Available Variables */}
          <div className="space-y-2 bg-muted/50 p-4 rounded-xl border border-border/40">
            <p className="text-sm font-medium">Available Variables</p>
            <div className="grid grid-cols-2 gap-2">
              {variables.map((variable) => (
                <div key={variable.key} className="text-xs">
                  <code className="bg-muted px-2 py-1 rounded text-primary font-mono">
                    {variable.key}
                  </code>
                  <p className="text-muted-foreground mt-1">{variable.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex gap-3 pt-6">
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 rounded-xl font-medium cursor-pointer gap-2"
            >
              <FileText className="h-4 w-4" />
              Create Template
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
