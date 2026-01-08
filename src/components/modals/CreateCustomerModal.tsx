"use client";

import * as React from "react";
import { motion } from "framer-motion";
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
  DialogTrigger,
} from "@/components/ui/dialog";

interface CreateCustomerModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSubmit?: (data: CustomerFormData) => void;
}

export interface CustomerFormData {
  fullName: string;
  account: string;
  oldUsername: string;
  secret: string;
  contact: string;
  email: string;
  houseNumber: string;
  apartment: string;
  location: string;
  service: string;
  package: string;
  installationFee: string;
}

export function CreateCustomerModal({
  open,
  onOpenChange,
  onSubmit,
}: CreateCustomerModalProps) {
  const [formData, setFormData] = React.useState<CustomerFormData>({
    fullName: "",
    account: "",
    oldUsername: "",
    secret: "",
    contact: "",
    email: "",
    houseNumber: "",
    apartment: "",
    location: "",
    service: "",
    package: "",
    installationFee: "",
  });

  const [isOpen, setIsOpen] = React.useState(open ?? false);

  React.useEffect(() => {
    if (open !== undefined) {
      setIsOpen(open);
    }
  }, [open]);

  const handleOpenChange = (newOpen: boolean) => {
    setIsOpen(newOpen);
    onOpenChange?.(newOpen);
  };

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
    // Reset form
    setFormData({
      fullName: "",
      account: "",
      oldUsername: "",
      secret: "",
      contact: "",
      email: "",
      houseNumber: "",
      apartment: "",
      location: "",
      service: "",
      package: "",
      installationFee: "",
    });
    handleOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-montserrat">
            Create Customer
          </DialogTitle>
          <DialogDescription>
            Fill in the customer details below
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Row 1: Full Name & Account */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-sm font-montserrat">
                Full Name<span className="text-destructive">*</span>
              </Label>
              <Input
                id="fullName"
                name="fullName"
                placeholder="Enter Full Name"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="account" className="text-sm font-montserrat">
                Account<span className="text-destructive">*</span>
              </Label>
              <Input
                id="account"
                name="account"
                placeholder="FT00412"
                value={formData.account}
                onChange={handleInputChange}
                required
                className="rounded-xl"
              />
            </div>
          </div>

          {/* Row 2: Old Username & Secret */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="oldUsername" className="text-sm font-montserrat">
                Old Username
              </Label>
              <Input
                id="oldUsername"
                name="oldUsername"
                placeholder="Enter Old Username"
                value={formData.oldUsername}
                onChange={handleInputChange}
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="secret" className="text-sm font-montserrat">
                Secret<span className="text-destructive">*</span>
              </Label>
              <Input
                id="secret"
                name="secret"
                placeholder="FNEVDB0D"
                value={formData.secret}
                onChange={handleInputChange}
                required
                className="rounded-xl"
              />
            </div>
          </div>

          {/* Row 3: Contact & Email */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contact" className="text-sm font-montserrat">
                Contact<span className="text-destructive">*</span>
              </Label>
              <Input
                id="contact"
                name="contact"
                placeholder="Enter Contact"
                value={formData.contact}
                onChange={handleInputChange}
                required
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-montserrat">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="ft00412@isp.net"
                value={formData.email}
                onChange={handleInputChange}
                className="rounded-xl"
              />
            </div>
          </div>

          {/* Row 4: House Number & Apartment */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="houseNumber" className="text-sm font-montserrat">
                House Number
              </Label>
              <Input
                id="houseNumber"
                name="houseNumber"
                placeholder="B5"
                value={formData.houseNumber}
                onChange={handleInputChange}
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="apartment" className="text-sm font-montserrat">
                Apartment
              </Label>
              <Input
                id="apartment"
                name="apartment"
                placeholder="Future Flats"
                value={formData.apartment}
                onChange={handleInputChange}
                className="rounded-xl"
              />
            </div>
          </div>

          {/* Row 5: Location */}
          <div className="space-y-2">
            <Label htmlFor="location" className="text-sm font-montserrat">
              Location
            </Label>
            <Input
              id="location"
              name="location"
              placeholder="Nairobi"
              value={formData.location}
              onChange={handleInputChange}
              className="rounded-xl"
            />
          </div>

          {/* Row 6: Service & Package */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="service" className="text-sm font-montserrat">
                Service<span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.service}
                onValueChange={(value: string) => handleSelectChange("service", value)}
              >
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Select Service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pppoe">PPPoE</SelectItem>
                  <SelectItem value="hotspot">Hotspot</SelectItem>
                  <SelectItem value="vlan">VLAN</SelectItem>
                  <SelectItem value="dedicated">Dedicated</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="package" className="text-sm font-montserrat">
                Select Package<span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.package}
                onValueChange={(value: string) => handleSelectChange("package", value)}
              >
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Select Package" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3mbps">3Mbps</SelectItem>
                  <SelectItem value="7mbps">7Mbps</SelectItem>
                  <SelectItem value="10mbps">10Mbps</SelectItem>
                  <SelectItem value="15mbps">15Mbps</SelectItem>
                  <SelectItem value="20mbps">20Mbps</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Row 7: Installation Fee */}
          <div className="space-y-2">
            <Label htmlFor="installationFee" className="text-sm font-montserrat">
              Installation Fee
            </Label>
            <Input
              id="installationFee"
              name="installationFee"
              placeholder="Installation Fee"
              value={formData.installationFee}
              onChange={handleInputChange}
              className="rounded-xl"
            />
          </div>

          {/* Form Actions */}
          <div className="flex gap-3 pt-6">
            <Button
              type="submit"
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl font-montserrat cursor-pointer"
            >
              Create Customer
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
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
