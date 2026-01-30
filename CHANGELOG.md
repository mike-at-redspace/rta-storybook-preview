# Changelog

All notable changes to this project will be documented in this file. The format is based on
[Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-01-30

### Added

- **Initial release** of RTA (Ṛta - ऋत) Preview Storybook addon
- Device preview system with 30+ preconfigured device viewports (phones, tablets, laptops, desktops, ultrawide)
- Device orientation control (portrait/landscape rotation)
- Zoom controls with step increments and fit-to-window mode
- Custom viewport dimension input for responsive testing
- Device frame rendering with dimensions overlay
- Pan and drag support for zoomed viewports
- Keyboard shortcuts for zoom control (Ctrl/Cmd + =, −, 0)
- Automatic settings persistence across story navigation
- Storybook global state management with `useRtaPreview` hook
- Preview viewport hook with scale, pan, and container size tracking
- ResizeObserver-based responsive container measurement
- Debounced resize callbacks for performance optimization
- Drag-to-pan functionality when viewport is zoomed
- Comprehensive device preset library with categorization
- Light/dark theme detection and integration
- Utility functions for scale computation and dimension calculation
- Full TypeScript support with strict type checking
- ESM-only distribution with source maps
- Unit tests for critical utilities (scale calculation, dimension computation)
- Biome linting and formatting configuration
- GitHub Actions CI/CD workflows (test and release automation)
- Semantic Release configuration for automated npm publishing
- Complete documentation and troubleshooting guide

### Features

- **30+ Device Presets**: Pre-configured viewports for common devices
  - Phones: iPhone SE, iPhone 13-15 Pro, iPhone 16 series, Google Pixel 6-8 Pro, Samsung Galaxy
  - Tablets: iPad Air, iPad Pro, Samsung Galaxy Tab
  - Laptops: MacBook Air/Pro, Dell XPS, ThinkPad
  - Desktops: 1080p, 1440p, 2160p (4K), 3840p (5K)
  - Ultrawide: 2560x1080, 3440x1440

- **Responsive Control**: Switch between device viewports and custom dimensions on the fly
- **Orientation Support**: Portrait/landscape rotation for mobile devices
- **Zoom & Pan**: Zoom in/out with keyboard shortcuts and step controls, drag to pan
- **Visual Feedback**: Device frames, dimensions overlay, scale indicator
- **Developer-Friendly**: Easy Storybook integration, zero-configuration setup (if using preset)
- **Performance Optimized**: Debounced resize, memoized hooks, efficient state management
- **Accessibility**: ARIA labels, semantic HTML, keyboard navigation

### Technical Details

- **Build**: tsup (multi-entry ESM bundling)
- **Testing**: Vitest with 11 unit tests (all passing)
- **Code Quality**: Biome linter/formatter (100 char line width, space indent)
- **TypeScript**: Strict mode enabled, ES2020+ target
- **React**: Compatible with React 18 and 19 (optional peer dependency)
- **Storybook**: Compatible with Storybook 8.x and 9.x

### Known Limitations

- UI components (Tool, Manager, Preview) lack unit test coverage (recommended for 1.0.0 release)
- No integration tests with actual Storybook instances
- Device preset list is hardcoded (extensibility feature for future releases)
- Scrollbar styling uses dangerouslySetInnerHTML (works reliably but not ideal for bundled use)

### Development & Contribution

- Install: `pnpm install`
- Build: `pnpm build`
- Development watch: `pnpm dev`
- Lint: `pnpm lint` / `pnpm lint:fix`
- Test: `pnpm test` / `pnpm test:watch`
- Format: `pnpm format` / `pnpm format:check`

### Repository

- **GitHub**: https://github.com/ParamountVDS/rta-preview-addon
- **NPM**: https://npmjs.org/package/rta-preview-addon
- **Issues**: https://github.com/ParamountVDS/rta-preview-addon/issues

---

_This project is maintained by the Paramount Streaming team._
