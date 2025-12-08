# Theme Color Scheme

This document outlines the color scheme used in the portfolio website, derived from the thisnamespace logo and aligned with 2025 modern design trends.

## Design Philosophy

The theme follows 2025 portfolio design trends:

- **Modern typography**: Inter font with tight letter spacing and bold weights
- **Warm, sophisticated colors**: Warm off-white backgrounds with vibrant accent colors
- **Subtle shadows**: Soft, layered shadows for depth without harshness
- **Enhanced readability**: Higher contrast ratios and improved line heights
- **Glassmorphism**: Backdrop blur effects on navigation

## Light Mode

### Primary Colors (Cyan - from logo brackets)

- Main: `#0891b2` - Modern, tech-forward cyan
- Light: `#06b6d4`
- Dark: `#0e7490`
- Contrast Text: `#ffffff`

### Secondary Colors (Purple - from airplane)

- Main: `#7c3aed` - Creative, innovative purple
- Light: `#8b5cf6`
- Dark: `#6d28d9`
- Contrast Text: `#ffffff`

### Success Colors (Green - from namespace colons)

- Main: `#059669`
- Light: `#34d399`
- Dark: `#047857`

### Warning Colors (Orange - from dots)

- Main: `#d97706`
- Light: `#fbbf24`
- Dark: `#b45309`

### Background

- Default: `#fafaf9` - Warm off-white (2025 trend)
- Paper: `#ffffff`

### Text

- Primary: `#0f172a` - Deep slate for better readability
- Secondary: `#475569`

### Divider

- `#e2e8f0`

## Dark Mode

### Primary Colors (Cyan - from logo brackets)

- Main: `#06b6d4`
- Light: `#22d3ee`
- Dark: `#0891b2`
- Contrast Text: `#ffffff`

### Secondary Colors (Purple - from airplane)

- Main: `#8b5cf6`
- Light: `#a78bfa`
- Dark: `#7c3aed`
- Contrast Text: `#ffffff`

### Success Colors (Green - from namespace colons)

- Main: `#10b981`
- Light: `#6ee7b7`
- Dark: `#059669`

### Warning Colors (Orange - from dots)

- Main: `#f59e0b`
- Light: `#fcd34d`
- Dark: `#d97706`

### Background

- Default: `#0f172a` - Deep slate matching logo
- Paper: `#1e293b`

### Text

- Primary: `#f1f5f9` - Brighter for better contrast
- Secondary: `#94a3b8`

### Divider

- `#334155`

## Typography

### Font Stack

```css
font-family:
  'Inter',
  -apple-system,
  BlinkMacSystemFont,
  'Segoe UI',
  'Roboto',
  'Oxygen',
  'Ubuntu',
  'Cantarell',
  sans-serif;
```

### Headings

- **H1**: 3.75rem, 800 weight, -0.02em letter-spacing, 1.1 line-height
- **H2**: 3rem, 700 weight, -0.01em letter-spacing, 1.2 line-height
- **H3**: 2.25rem, 700 weight, 1.3 line-height
- **H4**: 1.875rem, 600 weight, 1.4 line-height
- **H5**: 1.5rem, 600 weight, 1.4 line-height
- **H6**: 1.25rem, 600 weight, 1.5 line-height

### Body Text

- **Body1**: 1rem, 1.7 line-height, 0.00938em letter-spacing
- **Body2**: 0.875rem, 1.6 line-height

### Buttons

- Font weight: 600
- Letter spacing: 0.01em
- Text transform: none (lowercase/normal case)

## Shadows

Soft, layered shadows for depth:

- **Elevation 1**: `0 1px 2px 0 rgba(0, 0, 0, 0.05)`
- **Elevation 2**: `0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)`
- **Elevation 3**: `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)`
- **Elevation 4**: `0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)`
- **Elevation 5**: `0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)`

Dark mode shadows are stronger (0.3-0.7 opacity) for better definition.

## Component Styling

### Buttons

- Border radius: 10px
- Padding: 10px 24px (large: 12px 32px)
- No elevation by default
- Subtle shadow on hover

### Cards

- Border radius: 16px
- Soft shadow (elevation 2)

### Papers

- Border radius: 12px
- No background gradient in dark mode

### Chips

- Border radius: 8px
- Font weight: 500

### AppBar

- Glassmorphism: `backdrop-filter: blur(12px)`
- Background: 85% opacity with warm colors
- Subtle border bottom

## Hero Section Gradients

### Light Mode

```css
background: linear-gradient(135deg, #0891b2 0%, #7c3aed 50%, #8b5cf6 100%);
```

### Dark Mode

```css
background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
```

## Logo Elements Reference

The color scheme is inspired by the logo elements:

- **Brackets**: Cyan (#0891b2 / #06b6d4)
- **Airplane**: Purple (#7c3aed / #8b5cf6)
- **Namespace Colons**: Green (#059669 / #10b981)
- **Dots**: Orange (#d97706 / #f59e0b)
- **Background**: Warm off-white (#fafaf9) / Deep slate (#0f172a)

## 2025 Design Trends Applied

✓ **Bold, expressive typography** - Inter font with tight spacing and heavy weights
✓ **Warm, natural tones** - Off-white backgrounds instead of stark white
✓ **Enhanced readability** - Improved contrast ratios and line heights
✓ **Subtle, modern shadows** - Soft layered shadows for depth
✓ **Glassmorphism** - Backdrop blur on navigation
✓ **Rounded corners** - 10-16px border radius for modern feel
✓ **Flat design** - No default button elevation
✓ **Vibrant accents** - Cyan and purple for tech-forward feel
