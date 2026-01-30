# Ṛta (ऋत) - Storybook Preview

[![npm version](https://img.shields.io/npm/v/rta-preview-addon.svg)](https://www.npmjs.com/package/rta-preview-addon) [![Test & Lint](https://github.com/mike-at-redspace/rta-storybook-preview/actions/workflows/test.yml/badge.svg)](https://github.com/mike-at-redspace/rta-storybook-preview/actions/workflows/test.yml)

Storybook addon for testing components across device types and sizes.

Preview components on mobile phones, tablets, laptops, and desktops. Control device rotation, zoom, and custom dimensions. See exact pixel dimensions and optional device frames. All settings save automatically when switching stories.

## Features

- **Device mode:** Turn RTA Preview on or off. When off (default), the canvas is normal; when on, the full toolbar and device viewport appear.
- **Device presets:** Select from 30+ preconfigured devices (iPhone, Android, iPad, MacBook, Windows, 4K, and more).
- **Rotation:** Rotate between portrait and landscape on rotatable devices (phones and tablets).
- **Zoom:** Step zoom in or out (10% increments), fit to window, or jump to specific zoom levels (50%, 75%, 100%).
- **Custom size:** Set any width and height for testing responsive breakpoints.
- **Dimensions overlay:** When device mode is on, pixel size is shown in the bottom-right corner; device frame and stage background are always on.
- **Keyboard shortcuts:** Ctrl/Cmd + Plus to zoom in, Ctrl/Cmd + Minus to zoom out, Ctrl/Cmd + 0 to fit.

## Installation

From the Storybook app:

```bash
pnpm add rta-preview-addon
# or
npm install rta-preview-addon
```

For local development, use the `file:` protocol so React and React DOM resolve from your app (avoids peer dependency warnings from `pnpm link`):

In your Storybook app’s `package.json`:

```json
{
  "dependencies": {
    "rta-preview-addon": "file:../path/to/rta-preview-addon"
  }
}
```

Then run `pnpm install`. After changing the addon, run `pnpm build` in the addon directory; the app will use the built `dist/` output.

Alternatively, you can use `pnpm link --global` and `pnpm link rta-preview-addon` in the app. You may see a peer dependency warning (React/React DOM not resolved from the app). The “no binaries” warning is expected; this addon is a library, not a CLI.

## Setup

### Step 1: Register the addon in Storybook configuration

In `.storybook/main.ts` (or `main.js`), add the addon to the `addons` array:

```ts
import type { StorybookConfig } from '@storybook/react-vite'; // or your framework

const config: StorybookConfig = {
  addons: [
    'rta-preview-addon',
    // ...other addons
  ],
  // ...config
};
export default config;
```

### Step 2: Add the decorator to preview configuration

In `.storybook/preview.ts` (or `preview.js`), import the decorator and **getRtaPreviewPreviewConfig**, then spread the config so the addon's globals are declared (this fixes "global is not defined" errors):

```ts
import type { Preview } from '@storybook/react';
import { withRtaPreview, getRtaPreviewPreviewConfig } from 'rta-preview-addon/preview';

const preview: Preview = {
  decorators: [withRtaPreview],
  ...getRtaPreviewPreviewConfig(),
};

export default preview;
```

`getRtaPreviewPreviewConfig()` returns both `initialGlobals` (Storybook 8.2+) and `globals` (older Storybook); Storybook uses whichever it supports. To override defaults, spread and then override: `initialGlobals: { ...getRtaPreviewPreviewConfig().initialGlobals, rtaPreviewDevice: 'ipadPro' }`.

### Where the addon appears

The addon shows in the **Storybook toolbar** (the bar above the canvas), only when **view mode is "story"** (Canvas). It does not show in Docs view. By default you see a single **RTA Preview** control; click it to enable device mode. The full toolbar (device, rotation, zoom, Fit, etc.) and the device viewport (frame, stage, dimensions overlay) then appear. Click **Off** to turn device mode off and restore the normal canvas. The toolbar entry title is **"Ṛta (ऋत) - Storybook Preview"**. If the toolbar is narrow, check the overflow menu (⋯ or "More") for that title.

The addon uses a **preset** for manager loading. Storybook loads the preset (Node entry) when resolving the addon; the preset supplies the manager entry so the toolbar loads. You only need `addons: ['rta-preview-addon']` in `.storybook/main.ts` and the decorator in preview. No consumer-side local preset is required, including when using the addon via `file:` or `pnpm link`.

**Troubleshooting:**

- If the toolbar entry does not appear after reinstalling and restarting Storybook: (1) With `file:` or link, ensure the addon directory includes `src/` and run `pnpm build` in the addon directory. (2) Restart Storybook fully, then hard-refresh the browser (e.g. Ctrl+Shift+R / Cmd+Shift+R). (3) Check DevTools (F12) → Console for errors.
- If you see **"Attempted to set a global (...) that is not defined"**: spread the addon's preview config so globals are declared: `import { withRtaPreview, getRtaPreviewPreviewConfig } from 'rta-preview-addon/preview'` and add `...getRtaPreviewPreviewConfig()` to your preview object (see Step 2 above).

## How to use

### Turn on RTA Preview

Click **RTA Preview** in the Storybook toolbar to enable device mode. The full toolbar and device viewport (frame, stage, dimensions) appear. Click **Off** to turn device mode off and restore the normal canvas.

### Select a device

With device mode on, click the device dropdown. Choose from categories: **Phones**, **Foldables**, **Tablets**, **Laptops**, **Desktops**, or **Custom**. The preview updates instantly with the new viewport size.

### Rotate the device (phones and tablets only)

Click the rotate button to switch between portrait and landscape. Rotation is only available for devices that support it (phones and tablets). Laptops and desktops have a fixed orientation.

### Zoom in or out

Use the zoom controls to fit the preview to your window or zoom to a specific level. Click **Fit** to scale the preview to the available space. Click the zoom value to jump to 50%, 75%, or 100%. Use keyboard shortcuts: Ctrl/Cmd + Plus to zoom in, Ctrl/Cmd + Minus to zoom out, Ctrl/Cmd + 0 to fit. Zoom range is 10% to 300%.

### Set custom dimensions

Select **Custom** from the device dropdown. Text inputs appear for width and height. Enter any value from 100 pixels and above. This is useful for testing at specific breakpoints that are not in the preset list.

When device mode is on, the **frame** (device chrome), **stage** (gradient background), and **dimensions overlay** (pixel size in the bottom-right corner) are always shown. There are no toggles for these.

### All settings persist

Your device, zoom, rotation, and overlay choices are saved in Storybook globals. Settings remain the same when you switch between stories.

## Configuration globals

Customize default behavior by setting these global values in `.storybook/preview.ts`:

| Global key               | Type             | Default          | Description                                                                 |
| ------------------------ | ---------------- | ---------------- | --------------------------------------------------------------------------- |
| `rtaPreviewEnabled`       | boolean          | `false`          | When true, device mode is on: toolbar and viewport (frame, stage, overlay).  |
| `rtaPreviewToolbarVisible` | boolean        | `false`          | When true (and device mode on), the full toolbar is shown; when false, only "Show toolbar" and "Off". |
| `rtaPreviewDevice`       | string           | `'iphoneProMax'` | Active device preset.                                                       |
| `rtaPreviewRotate`       | number           | `0`              | Device rotation in degrees (0, 90, 180, 270).                               |
| `rtaPreviewZoom`         | string or number | `'fit'`          | Zoom level: `'fit'` or a number between 10 and 300.                         |
| `rtaPreviewCustomWidth`  | number           | undefined        | Custom viewport width (pixels). Used when device is "Custom".               |
| `rtaPreviewCustomHeight` | number           | undefined        | Custom viewport height (pixels). Used when device is "Custom".              |

When `rtaPreviewEnabled` is true, the frame, stage background, and dimensions overlay are always on (no separate globals to toggle them).

## Build

```bash
pnpm install
pnpm build
```

Output: `dist/manager.js`, `dist/preview.js`, `dist/preset.js` (ESM).

## Project structure

- **src/ui/** – Manager (addon registration), Preview (decorator), Tool (toolbar), ToolStyles.
- **src/hooks/** – usePreviewViewport, useRtaPreview, useContainerSize, useDebouncedResize, usePanWhenZoomed.
- **src/lib/** – Viewport utilities (scale, transform, dimensions).
- **src/constants.ts** – Addon IDs, Storybook global keys, defaults, zoom config, preview styles.
- **src/devices.ts** – Device presets and categories.
