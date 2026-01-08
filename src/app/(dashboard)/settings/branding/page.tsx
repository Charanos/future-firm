"use client";

import { useState } from "react";
import { useOrganizationStore } from "@/store/organizationStore";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function BrandingSettingsPage() {
  const { currentOrganization, setCurrentOrganization } =
    useOrganizationStore();

  const [primaryColor, setPrimaryColor] = useState(
    currentOrganization?.branding?.primaryColor || "#03a9f4"
  );
  const [secondaryColor, setSecondaryColor] = useState(
    currentOrganization?.branding?.secondaryColor || "#1976d2"
  );

  const handleSave = () => {
    if (currentOrganization) {
      setCurrentOrganization({
        ...currentOrganization,
        branding: {
          ...currentOrganization.branding,
          primaryColor,
          secondaryColor,
        },
      });
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium">Branding</h2>
      <p className="text-muted-foreground">
        Customize your organization's colors and appearance.
      </p>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Color Pickers */}
        <Card>
          <CardHeader>
            <CardTitle>Brand Colors</CardTitle>
            <CardDescription>
              Choose colors that represent your organization.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="primaryColor">Primary Color</Label>
              <div className="flex items-center gap-4">
                <Input
                  id="primaryColor"
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-16 h-10 p-1 cursor-pointer"
                />
                <Input
                  type="text"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  placeholder="#03a9f4"
                  className="flex-1"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="secondaryColor">Secondary Color</Label>
              <div className="flex items-center gap-4">
                <Input
                  id="secondaryColor"
                  type="color"
                  value={secondaryColor}
                  onChange={(e) => setSecondaryColor(e.target.value)}
                  className="w-16 h-10 p-1 cursor-pointer"
                />
                <Input
                  type="text"
                  value={secondaryColor}
                  onChange={(e) => setSecondaryColor(e.target.value)}
                  placeholder="#1976d2"
                  className="flex-1"
                />
              </div>
            </div>

            <Button onClick={handleSave} className="w-full">
              Save Branding
            </Button>
          </CardContent>
        </Card>

        {/* Live Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Live Preview</CardTitle>
            <CardDescription>
              See how your colors look across the UI.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div
              className="p-4 rounded-lg"
              style={{ backgroundColor: primaryColor + "20" }}
            >
              <p className="font-medium" style={{ color: primaryColor }}>
                This text uses your primary color.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button style={{ backgroundColor: primaryColor }}>
                Primary Button
              </Button>
              <Button
                variant="outline"
                style={{ borderColor: primaryColor, color: primaryColor }}
              >
                Outline Button
              </Button>
            </div>

            <div className="flex gap-2">
              <div
                className="w-10 h-10 rounded-full"
                style={{ backgroundColor: primaryColor }}
              />
              <div
                className="w-10 h-10 rounded-full"
                style={{ backgroundColor: secondaryColor }}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
