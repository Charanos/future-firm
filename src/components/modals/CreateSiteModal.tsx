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

interface CreateSiteModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSubmit?: (data: SiteFormData) => void;
}

export interface SiteFormData {
  siteName: string;
  ipAddress: string;
  secret: string;
  type: string;
  mikrotikApiPort: string;
}

export function CreateSiteModal({
  open,
  onOpenChange,
  onSubmit,
}: CreateSiteModalProps) {
  const [formData, setFormData] = React.useState<SiteFormData>({
    siteName: "",
    ipAddress: "",
    secret: "",
    type: "Radius",
    mikrotikApiPort: "8728",
  });

  const handleChange = (field: keyof SiteFormData, value: string) => {
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
            Create Site
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          {/* Site Name and IP Address */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="siteName" className="text-xs font-medium uppercase tracking-wide text-muted-foreground/80">
                Site Name <span className="text-rose-500">*</span>
              </Label>
              <Input
                id="siteName"
                placeholder="Enter Site Name"
                value={formData.siteName}
                onChange={(e) => handleChange("siteName", e.target.value)}
                required
                className="rounded-xl bg-background/50 border-border/40"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ipAddress" className="text-xs font-medium uppercase tracking-wide text-muted-foreground/80">
                IP Address <span className="text-rose-500">*</span>
              </Label>
              <Input
                id="ipAddress"
                placeholder="192.168.1.1"
                value={formData.ipAddress}
                onChange={(e) => handleChange("ipAddress", e.target.value)}
                required
                className="rounded-xl bg-background/50 border-border/40"
              />
            </div>
          </div>
          <p className="text-[10px] text-muted-foreground italic -mt-4">
            NB: Site Name Cannot Be Edited (You can only Delete and create new site)
          </p>

          {/* Secret and Type */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="secret" className="text-xs font-medium uppercase tracking-wide text-muted-foreground/80">
                Secret <span className="text-rose-500">*</span>
              </Label>
              <Input
                id="secret"
                placeholder="Enter Secret"
                value={formData.secret}
                onChange={(e) => handleChange("secret", e.target.value)}
                required
                className="rounded-xl bg-background/50 border-border/40"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type" className="text-xs font-medium uppercase tracking-wide text-muted-foreground/80">
                Type <span className="text-rose-500">*</span>
              </Label>
              <Select
                value={formData.type}
                onValueChange={(val) => handleChange("type", val)}
              >
                <SelectTrigger className="rounded-xl bg-background/50 border-border/40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="Radius">Radius</SelectItem>
                  <SelectItem value="Local">Local</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Mikrotik API Port */}
          <div className="space-y-2">
            <Label htmlFor="mikrotikApiPort" className="text-xs font-medium uppercase tracking-wide text-muted-foreground/80">
              Mikrotik Api Port (If not Default)
            </Label>
            <Input
              id="mikrotikApiPort"
              placeholder="8728"
              value={formData.mikrotikApiPort}
              onChange={(e) => handleChange("mikrotikApiPort", e.target.value)}
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
              Create Site
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
