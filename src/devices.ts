/** Single device preset: dimensions, display name, and optional rotatable flag. */
export interface DevicePreset {
  width: number;
  height: number;
  label: string;
  /** If false, rotation is fixed at 0. Default true. */
  rotatable?: boolean;
}

/** Device preset id. Use "responsive" for full width, "custom" for user dimensions. */
export type DeviceId =
  | "responsive"
  | "custom"
  | "iphoneSE"
  | "iphone14"
  | "iphonePro"
  | "iphoneProMax"
  | "androidSmall"
  | "androidMedium"
  | "androidLarge"
  | "foldClosed"
  | "foldOpen"
  | "ipadMini"
  | "ipad"
  | "ipadAir"
  | "ipadPro11"
  | "ipadPro13"
  | "macbookAir"
  | "macbookPro14"
  | "macbookPro16"
  | "windowsLaptop"
  | "desktopHD"
  | "desktopQHD"
  | "desktop4K"
  | "desktop5K"
  | "desktop8K"
  | "ultrawide34"
  | "ultrawide49";

/** Device presets keyed by DeviceId. */
export const DEVICES: Record<DeviceId, DevicePreset> = {
  responsive: { width: 0, height: 0, label: "Responsive", rotatable: false },

  iphoneSE: { width: 375, height: 667, label: "iPhone SE", rotatable: true },
  iphone14: { width: 390, height: 844, label: "iPhone 14 / 15", rotatable: true },
  iphonePro: { width: 393, height: 852, label: "iPhone Pro", rotatable: true },
  iphoneProMax: { width: 430, height: 932, label: "iPhone Pro Max", rotatable: true },

  androidSmall: { width: 360, height: 740, label: "Android Small", rotatable: true },
  androidMedium: { width: 412, height: 915, label: "Android Medium", rotatable: true },
  androidLarge: { width: 480, height: 1040, label: "Android Large", rotatable: true },

  foldClosed: { width: 390, height: 850, label: "Foldable (Closed)", rotatable: true },
  foldOpen: { width: 768, height: 1024, label: "Foldable (Open)", rotatable: true },

  ipadMini: { width: 768, height: 1024, label: "iPad Mini", rotatable: true },
  ipad: { width: 810, height: 1080, label: "iPad", rotatable: true },
  ipadAir: { width: 820, height: 1180, label: "iPad Air", rotatable: true },
  ipadPro11: { width: 834, height: 1194, label: "iPad Pro 11″", rotatable: true },
  ipadPro13: { width: 1024, height: 1366, label: "iPad Pro 13″", rotatable: true },

  macbookAir: { width: 1440, height: 900, label: "MacBook Air", rotatable: false },
  macbookPro14: { width: 1512, height: 982, label: "MacBook Pro 14″", rotatable: false },
  macbookPro16: { width: 1728, height: 1117, label: "MacBook Pro 16″", rotatable: false },
  windowsLaptop: { width: 1366, height: 768, label: "Windows Laptop", rotatable: false },

  desktopHD: { width: 1920, height: 1080, label: "Full HD Desktop", rotatable: false },
  desktopQHD: { width: 2560, height: 1440, label: "2K / QHD Display", rotatable: false },
  desktop4K: { width: 3840, height: 2160, label: "4K Display", rotatable: false },
  desktop5K: { width: 5120, height: 2880, label: "5K Display", rotatable: false },
  desktop8K: { width: 7680, height: 4320, label: "8K Display", rotatable: false },

  ultrawide34: { width: 3440, height: 1440, label: "34″ Ultrawide", rotatable: false },
  ultrawide49: { width: 5120, height: 1440, label: "49″ Super Ultrawide", rotatable: false },

  custom: { width: 390, height: 844, label: "Custom", rotatable: true },
};

/** Categories for the device selector: label and regex to match device ids. */
export const DEVICE_CATEGORIES: Array<{ label: string; pattern: RegExp }> = [
  { label: "View", pattern: /^(responsive|custom)$/ },
  { label: "Phones (iOS)", pattern: /^iphone/ },
  { label: "Phones (Android)", pattern: /^android/ },
  { label: "Foldables", pattern: /^fold/ },
  { label: "Tablets", pattern: /^ipad/ },
  { label: "Laptops", pattern: /^(macbook|windows)/ },
  { label: "Desktops", pattern: /^desktop/ },
  { label: "Ultrawide", pattern: /^ultrawide/ },
];
