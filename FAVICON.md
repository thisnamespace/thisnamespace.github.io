# Favicon Implementation Guide

This document explains the favicon implementation for the portfolio website.

## Overview

The website uses a comprehensive favicon setup that works across all browsers, devices, and platforms. The favicon design is based on the site's logo: a cyan (`#06b6d4`) rounded rectangle with a white `{}` symbol in monospace font.

## Generated Files

### Favicon Files

All favicon files are located in the `/public` directory:

| File                         | Size      | Dimensions | Purpose                            |
| ---------------------------- | --------- | ---------- | ---------------------------------- |
| `favicon.svg`                | 316 bytes | Scalable   | Modern browsers (SVG support)      |
| `favicon.ico`                | 696 bytes | 32x32      | Legacy browsers (IE, old browsers) |
| `favicon-16x16.png`          | 375 bytes | 16x16      | Small favicon size                 |
| `favicon-32x32.png`          | 676 bytes | 32x32      | Standard favicon size              |
| `favicon-48x48.png`          | 950 bytes | 48x48      | High-DPI displays                  |
| `apple-touch-icon.png`       | 2.4 KB    | 180x180    | iOS home screen icon               |
| `android-chrome-192x192.png` | 2.5 KB    | 192x192    | Android home screen (standard)     |
| `android-chrome-512x512.png` | 5.9 KB    | 512x512    | Android home screen (high-res)     |

### Web Manifest

**File**: `public/site.webmanifest` (648 bytes)

The web manifest provides PWA (Progressive Web App) configuration:

```json
{
  "name": "Michael Day - Front End Engineering Manager",
  "short_name": "Michael Day",
  "description": "Engineering Leader with 16+ years building high-performing front end teams",
  "icons": [...],
  "theme_color": "#06b6d4",
  "background_color": "#ffffff",
  "display": "standalone",
  "orientation": "portrait-primary",
  "start_url": "/",
  "scope": "/"
}
```

## HTML Implementation

The favicons are referenced in `index.html` as follows:

```html
<!-- Favicons -->
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
<link rel="manifest" href="/site.webmanifest" />
```

## Browser Support

### Modern Browsers

- **Chrome/Edge**: Uses `favicon.svg` (scalable, crisp at all sizes)
- **Firefox**: Uses `favicon.svg` or PNG fallback
- **Safari**: Uses `favicon.svg` or PNG fallback

### Legacy Browsers

- **Internet Explorer**: Uses `favicon.ico`
- **Old browsers**: Automatically fall back to PNG versions

### Mobile Platforms

- **iOS (Safari)**: Uses `apple-touch-icon.png` (180x180)
- **Android (Chrome)**: Uses `android-chrome-192x192.png` or `android-chrome-512x512.png`
- **PWA**: Uses icons defined in `site.webmanifest`

## Design Specifications

### Visual Design

- **Background**: Cyan (`#06b6d4`)
- **Shape**: Rounded rectangle (border-radius: 20% of size)
- **Symbol**: `{}` (curly braces)
- **Font**: Monospace, bold
- **Text Color**: White (`#ffffff`)

### SVG Source

The base SVG template is:

```svg
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" rx="102.4" fill="#06b6d4"/>
  <text
    x="256"
    y="370"
    text-anchor="middle"
    fill="#ffffff"
    font-family="monospace"
    font-size="280"
    font-weight="bold"
  >{}</text>
</svg>
```

## Generation Script

### Regenerating Favicons

To regenerate all favicon files:

```bash
bun run generate-favicons
```

This runs the script at `scripts/generate-favicons.js`.

### How It Works

The generation script:

1. Creates an SVG template with the favicon design
2. Uses Sharp library to convert SVG to PNG at various sizes
3. Applies high-quality compression (level 9)
4. Maintains transparency for non-square aspects
5. Generates all required sizes for cross-platform support

### Script Features

- **Automatic sizing**: Generates all required sizes from a single SVG
- **Optimization**: Maximum compression without quality loss
- **Transparency**: Maintains alpha channel for proper rendering
- **Error handling**: Graceful failure with descriptive error messages

## PWA Features

The web manifest enables:

1. **Add to Home Screen**: Users can install the site as an app
2. **Standalone Display**: Opens without browser UI
3. **Theme Color**: Cyan color for OS integration
4. **Portrait Lock**: Optimized for mobile viewing
5. **Icon Scaling**: Provides multiple sizes for different devices

## Testing

### Visual Testing

**In Browser**:

1. Open the site in a browser
2. Check the browser tab for the favicon
3. Bookmark the page to see the favicon in bookmarks

**On Mobile**:

1. Open the site on iOS/Android
2. Use "Add to Home Screen"
3. Verify the icon appears correctly

### Validation Tools

1. **Favicon Checker**: https://realfavicongenerator.net/favicon_checker
2. **PWA Testing**: Chrome DevTools → Application → Manifest
3. **Browser DevTools**: Network tab to verify files load correctly

## File Size Summary

Total favicon package size: **15.2 KB**

This is excellent for performance:

- SVG version is only 316 bytes
- Most users will only download 1-2 files
- All files are optimized for maximum compression
- Lazy loading handled automatically by browsers

## Troubleshooting

### Favicon Not Showing

1. **Hard refresh**: Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)
2. **Clear browser cache**: Settings → Clear browsing data
3. **Check Network tab**: Verify files are loading (200 status)
4. **Incognito mode**: Test in a private browsing window

### Wrong Icon Appearing

1. Verify `index.html` has the correct link tags
2. Clear browser cache
3. Check file paths are correct (must start with `/`)
4. Ensure files are in the `public` directory

### PWA Not Installing

1. Verify `site.webmanifest` is accessible at `/site.webmanifest`
2. Check Chrome DevTools → Application → Manifest for errors
3. Ensure HTTPS is enabled (PWA requirement for production)
4. Verify icon files exist and are accessible

## Maintenance

### When to Regenerate

Regenerate favicons when:

- Changing the brand color
- Updating the logo design
- Adding new icon sizes for new platforms
- Optimizing file sizes

### Customization

To customize the favicon design, edit `scripts/generate-favicons.js`:

```javascript
const createFaviconSvg = (size) => `
<svg width="${size}" height="${size}" viewBox="0 0 512 512">
  <!-- Modify design here -->
</svg>
`;
```

Then run:

```bash
bun run generate-favicons
```

## Best Practices Followed

✅ **Multiple formats**: SVG for modern browsers, PNG for compatibility, ICO for legacy
✅ **Multiple sizes**: Covers all common use cases (16px to 512px)
✅ **Optimized files**: Maximum compression without quality loss
✅ **PWA ready**: Web manifest with proper icon configuration
✅ **Cross-platform**: iOS, Android, Windows, macOS support
✅ **Performance**: Minimal file sizes, efficient delivery
✅ **Accessibility**: High contrast (white on cyan)
✅ **Scalability**: SVG ensures crisp display at any size

## Resources

- [Favicon Generator](https://realfavicongenerator.net/)
- [Web Manifest Spec](https://www.w3.org/TR/appmanifest/)
- [PWA Guidelines](https://web.dev/progressive-web-apps/)
- [Sharp Documentation](https://sharp.pixelplumbing.com/)

## Version History

- **v1.0** (2025-01-15): Initial favicon implementation with full cross-platform support
