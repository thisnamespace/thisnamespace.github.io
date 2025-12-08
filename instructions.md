# Portfolio Website - Development Instructions

This document provides comprehensive instructions for developing and maintaining the portfolio website.

## Current Package Versions (December 2025)

### Core Dependencies

- **React**: v19 - Latest React with improved concurrent features
- **Material-UI (MUI)**: v7 - Complete Material Design component library
- **Vite**: v7 - Lightning-fast build tool with HMR
- **TypeScript**: v5.3.3 - Type-safe development
- **React Router**: v7 - Client-side routing

### Testing & Quality

- **Vitest**: v4.0.15 - Fast unit testing framework
- **Playwright**: v1.57.0 - E2E testing with browser automation
- **ESLint**: v9 - Modern linting with flat config
- **Storybook**: v10.1.4 - Component documentation and testing
- **Testing Library**: v16.3.0 - User-centric testing utilities

## Design Philosophy & Style Guide

### Overall Aesthetic

The portfolio follows a **modern, professional, gradient-enhanced design** that balances visual interest with readability:

- **Color Palette**: Cyan-to-purple gradients (#06b6d4 → #8b5cf6 dark mode, #0e7490 → #7c3aed light mode)
- **Typography**: Clean, hierarchical with gradient text on headings
- **Shadows**: Layered depth with enhanced hover states (elevation 0-12)
- **Border Radius**: Consistent 2-3px for modern feel
- **Transitions**: Smooth 0.2-0.3s cubic-bezier animations
- **Glass-morphism**: Subtle background overlays with backdrop blur effects

### Component-Specific Design Patterns

#### Hero Section

- **Layout**: Full viewport height with gradient background
- **Background**: Linear gradient from dark slate to lighter slate (dark mode) or cyan to blue (light mode)
- **Content**: Centered logo, hierarchical typography, dual CTA buttons
- **Radial overlays**: Subtle cyan/purple glows for depth

#### About Section

- **Cards**: Glass-morphism with hover lift (translateY -8px)
- **Icons**: Circular backgrounds with gradient on hover + rotation
- **Background**: Decorative radial gradients (5% opacity)
- **Typography**: Gradient headings, larger leading for readability

#### Skills Section

- **Cards**: Bordered with subtle gradients, hover elevation
- **Chips**: Outlined with 2px borders, gradient background on hover
- **Layout**: 2-column grid (4 columns on desktop)
- **Typography**: Gradient category headings

#### Projects Section

- **Cards**: Enhanced with image placeholders (16:9 aspect ratio)
- **Images**: Hover overlay with "View Project" text (gradient background)
- **Fallback**: Icon placeholder when images missing
- **CTAs**: Gradient buttons with shadow lift on hover
- **Borders**: 1px divider with primary color on hover

#### Experience Timeline

- **Timeline Line**: Gradient (cyan → purple, 3px width)
- **Dots**: 20px circles, primary color for current role
- **Cards**: Glass-morphism, special styling for current position
- **Layout**: Alternating left/right on desktop, stacked on mobile
- **Toggle**: Expanded/minimized view modes

#### Contact Section

- **Form**: Enhanced inputs with 2px border on hover/focus
- **Contact Cards**: Slide animation (translateX 8px) on hover
- **Icons**: Circular backgrounds with gradient
- **CTA Button**: Full gradient with shadow lift
- **Background**: Decorative radial gradient element

### Animation Guidelines

- **Hover Effects**: translateY(-2 to -8px) for cards and buttons
- **Timing**: 0.2-0.3s for quick interactions, 0.3s for card movements
- **Easing**: cubic-bezier(0.4, 0, 0.2, 1) for smooth, natural motion
- **Icons**: Scale + rotate combinations (scale 1.1, rotate 5deg)

### Accessibility Requirements

- **Color Contrast**: Minimum 4.5:1 ratio (WCAG AA)
- **Primary Color**: #0e7490 (light), #06b6d4 (dark) - tested for contrast
- **Heading Hierarchy**: Strict h1→h2→h3→h4 progression
- **ARIA Labels**: All interactive elements properly labeled
- **Focus States**: Visible focus indicators on all interactive elements
- **Semantic HTML**: Proper use of landmarks (main, nav, section)

## Content Guidelines

### Tone & Voice

- **Professional but approachable**: Engineering leader who understands both code and people
- **Results-focused**: Emphasize impact and outcomes over technologies
- **Leadership-oriented**: Balance technical expertise with management capabilities

### Writing Style

- **Headlines**: Action-oriented, gradient-styled for visual hierarchy
- **Body Text**: Clear, concise, avoiding jargon
- **Project Descriptions**: Focus on challenge, solution, and impact
- **Experience Bullets**: Start with strong action verbs, quantify when possible

### Section Structure

#### Hero

- Title: Your professional identity
- Subtitle: What you do (Building High-Performing Front End Teams)
- Description: One-sentence value proposition
- CTAs: Primary (View Projects) + Secondary (Contact Me)

#### About

- Introduction: Career transition from IC to leadership
- Highlight Cards: 4 key areas of expertise
- Focus: People skills + technical fundamentals + business impact

#### Skills

- 8 categories covering full spectrum:
  1. Frontend Technologies (technical foundation)
  2. Engineering Leadership (people management)
  3. Architecture & Strategy (technical direction)
  4. Agile & Delivery (process/execution)
  5. Quality & Standards (excellence)
  6. Tools & Platforms (tooling)
  7. Business & Communication (stakeholder management)
  8. Modern Practices (innovation)

#### Projects

- 4 featured projects with:
  - Screenshot (16:9, 1200×675px minimum)
  - Title and description
  - Technology tags
  - Links (Live Demo / GitHub)

#### Experience

- Complete timeline (newest first)
- Toggle between expanded (descriptions + skills) and minimized
- Current position highlighted with gradient background
- Location and employment type
- Achievement-focused bullets

#### Contact

- Professional greeting
- Three contact methods (Email, LinkedIn, GitHub)
- Contact form with mailto integration
- Call-to-action focused on collaboration

## Project Screenshots

### Required Files

Place screenshots in `/public/project-screenshots/`:

1. `scrollobserver.png` - ScrollObserver npm package
2. `tachyon.png` - Tachyon/1E project
3. `retail-travel.png` - Enterprise Retail & Travel work
4. `nhs.png` - NHS Digital Solutions

### Image Specifications

- **Format**: PNG (preferred) or JPG
- **Aspect Ratio**: 16:9 (1200×675px minimum)
- **File Size**: Optimize for web (< 500KB recommended)
- **Quality**: High-resolution, clear UI representation
- **Fallback**: Icon placeholder displays when images missing

## Development Workflow

### Making Changes

1. **Create a Feature Branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Your Changes**
   - Follow the design patterns above
   - Maintain accessibility standards
   - Test in both light/dark modes

3. **Test Your Changes**

   ```bash
   bun run test:all          # Run all tests
   bun run test:coverage     # Check code coverage
   ```

4. **Commit with Conventional Commits**

   ```bash
   git add .
   bun run commit            # Interactive commit helper
   ```

5. **Push and Create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

### Code Style Guidelines

#### TypeScript

- Use functional components with hooks
- Define interfaces for all component props
- Use `useMemo` for expensive computations
- Use `useCallback` for event handlers
- Prefer named exports

#### React

- Keep components focused and single-purpose
- Extract reusable logic into custom hooks
- Use MUI `sx` prop for styling (no separate CSS files)
- Responsive design with MUI breakpoints

#### Material-UI (MUI)

- Use theme object for all colors, spacing, shadows
- Responsive props: `{{ xs, sm, md, lg, xl }}`
- Prefer `sx` over `style` prop
- Use semantic color names (primary, secondary, text.primary, etc.)

#### File Organization

```
src/
├── components/
│   ├── [ComponentName].tsx       # Component implementation
│   ├── [ComponentName].test.tsx  # Unit tests
│   └── [ComponentName].stories.tsx  # Storybook stories
├── contexts/
│   └── ThemeContext.tsx          # Theme provider
├── pages/
│   └── Home.tsx                  # Page composition
└── types/
    └── index.ts                  # Shared TypeScript types
```

## Testing Strategy

### Unit Tests (Vitest)

- Test component rendering
- Test user interactions
- Test state management
- Target: 90%+ coverage

### Component Tests (Storybook)

- Visual testing of all component states
- Interaction testing
- Accessibility checks

### E2E Tests (Playwright)

- Navigation flows
- Form submissions
- Responsive behavior
- Accessibility audits (axe-core)

### Running Tests

```bash
# Unit tests
bun run test:unit              # Run once
bun run test:unit:watch        # Watch mode
bun run test:coverage          # With coverage

# Component tests
bun run test:components        # Run once
bun run storybook             # View in browser

# E2E tests
bun run test                   # Headless
bun run test:ui               # With Playwright UI
bun run test:debug            # Debug mode

# All tests
bun run test:all              # Unit + Component + E2E
```

## Customization Guide

### Updating Content

#### Personal Information

- **Contact Details**: [Contact.tsx:42-64](src/components/Contact.tsx#L42-L64)
- **Social Links**: [Hero.tsx:162-208](src/components/Hero.tsx#L162-L208)
- **Footer Links**: [Footer.tsx](src/components/layout/Footer.tsx)

#### Professional Content

- **About Bio**: [About.tsx:110-118](src/components/About.tsx#L110-L118)
- **Skills**: [Skills.tsx:7-85](src/components/Skills.tsx#L7-L85)
- **Projects**: [Projects.tsx:21-57](src/components/Projects.tsx#L21-L57)
- **Experience**: [Experience.tsx:15-170](src/components/Experience.tsx#L15-L170)

### Theme Customization

Colors are defined in [ThemeContext.tsx:81-290](src/contexts/ThemeContext.tsx#L81-L290):

```typescript
primary: {
  main: mode === 'light' ? '#0e7490' : '#06b6d4',
  light: mode === 'light' ? '#0891b2' : '#22d3ee',
  dark: mode === 'light' ? '#155e75' : '#0891b2',
}
```

### Adding New Sections

1. Create component in `src/components/[SectionName].tsx`
2. Add to `src/pages/Home.tsx`
3. Add navigation link in `src/components/layout/Header.tsx`
4. Create tests and stories
5. Follow design patterns documented above

## Performance Optimization

### Build Optimization

- Code splitting via dynamic imports
- Tree shaking enabled
- Minification and compression
- Asset optimization with Sharp

### Runtime Optimization

- Lazy loading images
- Memoized components with `React.memo`
- Debounced scroll handlers
- Optimized re-renders with `useCallback`/`useMemo`

### Bundle Analysis

```bash
bun run build                  # Build for production
bun run preview               # Test production build
```

## Deployment

### Build for Production

```bash
bun run build
```

Output directory: `dist/`

### Environment Variables

Create `.env.production` for production-specific vars:

```bash
VITE_GA_ID=your-google-analytics-id
VITE_API_URL=your-api-url
```

### Static Hosting

The built `dist/` folder can be deployed to:

- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Any static hosting service

## Troubleshooting

### Common Issues

**Issue**: Tests failing after updating dependencies
**Solution**: Clear node_modules and reinstall

```bash
rm -rf node_modules
bun install
```

**Issue**: Storybook not loading
**Solution**: Rebuild Storybook static files

```bash
bun run build-storybook
```

**Issue**: Type errors after MUI update
**Solution**: Update type definitions

```bash
bun add -D @types/react@latest @types/react-dom@latest
```

**Issue**: Accessibility violations
**Solution**: Run axe-core audit

```bash
bun run test tests/accessibility.spec.ts
```

## Additional Resources

- [TESTING.md](TESTING.md) - Detailed testing documentation
- [ACCESSIBILITY_AUDIT.md](ACCESSIBILITY_AUDIT.md) - Accessibility guidelines
- [THEME_COLORS.md](THEME_COLORS.md) - Color system documentation
- [CONTRIBUTING.md](CONTRIBUTING.md) - Contribution guidelines
- [SEO.md](SEO.md) - SEO optimization guide
- [IMPROVEMENTS.md](IMPROVEMENTS.md) - Future enhancement ideas

## Support

For questions or issues:

1. Check existing documentation
2. Review test files for examples
3. Check Storybook for component usage
4. Refer to MUI documentation: https://mui.com

---

**Last Updated**: December 2025
**Current Version**: React 19, MUI v7, Vite v7
