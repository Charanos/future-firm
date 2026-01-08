/**
 * Organization Branding Color Utilities
 * Implements the color shade generation algorithm specified in ORGANIZATION_COLOR_CUSTOMIZATION.md
 */

// Helper to convert Hex to RGB
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

// Helper to mix colors (simple lerp)
function mix(color1: { r: number; g: number; b: number }, color2: { r: number; g: number; b: number }, weight: number) {
  const w = 2 * weight - 1;
  const a = 0; // alpha difference

  const w1 = (w * a === -1 ? w : (w + a) / (1 + w * a)) + 1;
  const w2 = 1 - w1;

  return {
    r: Math.round((w1 * color1.r + w2 * color2.r) / 2),
    g: Math.round((w1 * color1.g + w2 * color2.g) / 2),
    b: Math.round((w1 * color1.b + w2 * color2.b) / 2),
  };
}

// Convert RGB object back to Hex
function rgbToHex(rgb: { r: number; g: number; b: number }): string {
  return "#" + ((1 << 24) + (rgb.r << 16) + (rgb.g << 8) + rgb.b).toString(16).slice(1);
}

// Generate 9 shades from a base color
// 50-400: Lighter (mixed with white)
// 500: Base
// 600-900: Darker (mixed with black)
export function generateColorShades(baseColorHex: string): Record<number, string> {
  const baseRgb = hexToRgb(baseColorHex);
  if (!baseRgb) return {};

  const white = { r: 255, g: 255, b: 255 };
  const black = { r: 0, g: 0, b: 0 };

  return {
    50: rgbToHex(mix(baseRgb, white, 0.05)),
    100: rgbToHex(mix(baseRgb, white, 0.15)),
    200: rgbToHex(mix(baseRgb, white, 0.30)),
    300: rgbToHex(mix(baseRgb, white, 0.45)),
    400: rgbToHex(mix(baseRgb, white, 0.60)),
    500: baseColorHex,
    600: rgbToHex(mix(baseRgb, black, 0.90)), // slight darken
    700: rgbToHex(mix(baseRgb, black, 0.75)),
    800: rgbToHex(mix(baseRgb, black, 0.60)),
    900: rgbToHex(mix(baseRgb, black, 0.45)),
  };
}

export interface ColorVariables {
    [key: string]: string;
}

export function generateCssVariables(orgId: string, primaryHex: string, secondaryHex?: string): ColorVariables {
    const primaryShades = generateColorShades(primaryHex);
    
    // HSL conversion for Tailwind v4 variables if needed via tinycolor or similar
    // For now, we are replacing CSS variables that might be in HSL.
    // However, our globals.css uses HSL.
    // To support dynamic colors with Shadcn (which uses HSL variables), we need HSL values.
    
    // NOTE: This simple utility returns Hex. 
    // Shadcn components in globals.css expect HSL: --primary: 222.2 47.4% 11.2%;
    // We must extend this to output HSL.
    
    return {};
}

// Helper to convert Hex to HSL string "h s% l%"
export function hexToHsl(hex: string): string {
    let r = 0, g = 0, b = 0;
    if (hex.length == 4) {
      r = parseInt("0x" + hex[1] + hex[1]);
      g = parseInt("0x" + hex[2] + hex[2]);
      b = parseInt("0x" + hex[3] + hex[3]);
    } else if (hex.length == 7) {
      r = parseInt("0x" + hex[1] + hex[2]);
      g = parseInt("0x" + hex[3] + hex[4]);
      b = parseInt("0x" + hex[5] + hex[6]);
    }
    
    r /= 255;
    g /= 255;
    b /= 255;
    
    const cmin = Math.min(r,g,b),
          cmax = Math.max(r,g,b),
          delta = cmax - cmin;
    
    let h = 0, s = 0, l = 0;
  
    if (delta == 0)
      h = 0;
    else if (cmax == r)
      h = ((g - b) / delta) % 6;
    else if (cmax == g)
      h = (b - r) / delta + 2;
    else
      h = (r - g) / delta + 4;
  
    h = Math.round(h * 60);
  
    if (h < 0)
      h += 360;
  
    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);
  
    return `${h} ${s}% ${l}%`;
  }
