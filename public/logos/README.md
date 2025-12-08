# Logo Variants

This directory contains multiple versions of the thisnamespace logo for different use cases.

## Variants

### Full Version (Default)

- **Files**: `logo-light.svg`, `logo-dark.svg`
- **Viewbox**: `60 60 280 310`
- **Includes**: Full imagery + brand name + subtitle "MICHAEL"
- **Best for**: Large displays, hero sections, full branding

### Minimal Version

- **Files**: `logo-light-minimal.svg`, `logo-dark-minimal.svg`
- **Viewbox**: `60 60 280 310`
- **Includes**: Full imagery + brand name only (no subtitle)
- **Best for**: Medium displays, headers with text space

### Icon Only Version

- **Files**: `logo-light-icon.svg`, `logo-dark-icon.svg`
- **Viewbox**: `60 60 280 280`
- **Includes**: Imagery only (no text) with enhanced sizing
- **Best for**: Small displays, app icons, favicons, mobile headers

## Logo Elements

Each logo contains symbolic elements representing the brand:

1. **Brackets `{ }`** (Cyan/Blue) - Code/namespace containers, representing technical expertise
2. **Three Dots `...`** (Orange) - The "this" keyword in programming
3. **Double Colon `::`** (Green) - Namespace separator, representing structure
4. **Airplane + Path** (Purple) - Travel/journey, representing global perspective
5. **Globe Wireframe** (Gray, subtle) - International reach across 3 continents
6. **Accent Dots** (Cyan, corners) - Visual balance and continental representation

## Color Scheme

### Light Mode

- Background: `#f8fafc`
- Brackets: `#0891b2` (Cyan)
- Dots: `#d97706` (Orange)
- Colon: `#059669` (Green)
- Airplane: `#7c3aed` (Purple)
- Text: `#0f172a` (Dark slate)

### Dark Mode

- Background: `#0f172a`
- Brackets: `#06b6d4` (Bright cyan)
- Dots: `#f59e0b` (Bright orange)
- Colon: `#10b981` (Bright green)
- Airplane: `#8b5cf6` (Bright purple)
- Text: `#e2e8f0` (Light slate)

## Usage

The default Logo component uses the full version. To use different variants:

```tsx
// Icon only (no text)
<Logo variant="icon" width={40} height={40} />

// Minimal (brand name only)
<Logo variant="minimal" width={50} height={50} />

// Full (brand name + subtitle) - default
<Logo variant="full" width={60} height={60} />
```

## Animations

All logo variants include subtle animations:

- Bracket opacity pulses (3s cycle, alternating)
- Airplane path dashes animate (1s continuous)

## Transparent Variants

For use in headers or overlays where the logo needs to blend with the background:

- **Files**: `logo-light-icon-transparent.svg`, `logo-dark-icon-transparent.svg`
- **Usage**: Icon variant without background fill
- **Best for**: Headers, navigation bars, overlays

### Usage with Transparent Background

```tsx
// Icon with transparent background for headers
<Logo variant="icon" transparent width={50} height={50} />
```

The transparent variants have:

- No background rectangle
- Reduced opacity on globe wireframe (15% vs 25%)
- Adjusted accent dot positions for better composition
- Same color scheme as standard variants
