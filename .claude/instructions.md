# Portfolio Website - Claude Development Instructions

## Project Overview

This is a professional portfolio website for Michael Day, a Front End Engineering Manager with 16+ years of experience. The project showcases leadership experience, technical skills, and key projects using modern React and Material-UI.

## Core Technology Stack

- **Framework:** React 18 with TypeScript
- **UI Library:** Material-UI (MUI) v5
- **Styling:** Emotion (MUI's default)
- **Build Tool:** Vite
- **Package Manager:** Bun
- **Testing:** Vitest (unit) + Playwright (E2E)
- **Component Documentation:** Storybook v10
- **Code Quality:** ESLint, Prettier, Husky, lint-staged

## Development Principles

### 1. Always Use Material-UI Components

**CRITICAL:** Never use plain HTML elements when MUI alternatives exist.

#### Component Mapping Reference

| ❌ Don't Use         | ✅ Use Instead                        | Import From     |
| -------------------- | ------------------------------------- | --------------- |
| `<div>`              | `<Box>`                               | `@mui/material` |
| `<section>`          | `<Box component="section">`           | `@mui/material` |
| `<button>`           | `<Button>` or `<IconButton>`          | `@mui/material` |
| `<input>`            | `<TextField>`                         | `@mui/material` |
| `<a>`                | `<Link>` or `<Button href="">`        | `@mui/material` |
| `<h1>`, `<h2>`, etc. | `<Typography variant="h1">`           | `@mui/material` |
| `<p>`                | `<Typography>`                        | `@mui/material` |
| `<ul>`, `<li>`       | `<List>`, `<ListItem>`                | `@mui/material` |
| `<img>`              | `<Box component="img">` or `<Avatar>` | `@mui/material` |
| CSS classes          | `sx` prop or `styled()`               | `@mui/material` |

#### Styling Approach

**Always use the `sx` prop for styling:**

```tsx
// ✅ CORRECT - Use sx prop
<Box
  sx={{
    py: { xs: 8, md: 12 },
    bgcolor: 'background.paper',
    borderRadius: 2,
  }}
>
  Content
</Box>

// ❌ WRONG - Don't use inline styles or className
<div style={{ padding: '64px' }} className="custom-box">
  Content
</div>
```

**Responsive Design Pattern:**

```tsx
<Box
  sx={{
    // Mobile-first approach
    fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' },
    padding: { xs: 2, md: 4 },
    display: { xs: 'block', md: 'flex' },
  }}
/>
```

**Breakpoints:**

- `xs`: 0px (mobile)
- `sm`: 600px (tablet)
- `md`: 900px (desktop)
- `lg`: 1200px (large desktop)

#### Theme Integration

Always use theme values instead of hardcoded colors/spacing:

```tsx
// ✅ CORRECT
<Box
  sx={{
    color: 'primary.main',
    bgcolor: 'background.paper',
    p: 3, // theme.spacing(3)
    borderRadius: 2, // theme.shape.borderRadius * 2
    boxShadow: theme => theme.shadows[2],
  }}
/>

// ❌ WRONG
<div style={{ color: '#06b6d4', backgroundColor: '#fff', padding: '24px' }} />
```

**Access theme in sx prop:**

```tsx
<Box
  sx={{
    bgcolor: (theme) =>
      theme.palette.mode === 'dark' ? 'rgba(148, 163, 184, 0.1)' : 'rgba(148, 163, 184, 0.15)',
  }}
/>
```

### 2. Testing Requirements

**Every new component MUST include:**

1. **Unit Tests** (`ComponentName.test.tsx`)
2. **Storybook Stories** (`ComponentName.stories.tsx`)
3. **E2E Tests** (if user-facing, add to `tests/` directory)

#### Unit Testing Template

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material';
import ComponentName from './ComponentName';

const theme = createTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('ComponentName', () => {
  it('should render component heading', () => {
    renderWithTheme(<ComponentName />);
    expect(screen.getByRole('heading', { name: /component name/i })).toBeInTheDocument();
  });

  it('should have accessible structure', () => {
    const { container } = renderWithTheme(<ComponentName />);
    const section = container.querySelector('#component-id');
    expect(section).toBeInTheDocument();
  });

  it('should render with proper ARIA labels', () => {
    renderWithTheme(<ComponentName />);
    const button = screen.getByRole('button', { name: /action/i });
    expect(button).toHaveAttribute('aria-label');
  });
});
```

**Testing Checklist:**

- ✅ Component renders without errors
- ✅ All text content is accessible
- ✅ Interactive elements have proper ARIA labels
- ✅ Navigation IDs are present for hash routing
- ✅ Responsive behavior works (if applicable)
- ✅ Theme variations work (light/dark)
- ✅ Edge cases handled (empty data, errors, etc.)

#### Storybook Stories Template

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import ComponentName from './ComponentName';

const meta = {
  title: 'Components/ComponentName',
  component: ComponentName,
  parameters: {
    layout: 'fullscreen', // or 'centered' for smaller components
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ComponentName>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithProps: Story = {
  args: {
    title: 'Custom Title',
    description: 'Custom description',
  },
};

export const LightMode: Story = {
  parameters: {
    backgrounds: { default: 'light' },
  },
};

export const DarkMode: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};

export const Error: Story = {
  args: {
    error: 'An error occurred',
  },
};
```

**Story Checklist:**

- ✅ Default story
- ✅ Light and Dark mode variants
- ✅ Loading/empty states (if applicable)
- ✅ Error states (if applicable)
- ✅ All prop variations documented
- ✅ Interactive states (hover, focus, active)

### 3. Accessibility Requirements

**WCAG 2.1 AA Compliance is mandatory.**

#### Semantic HTML

```tsx
// ✅ CORRECT - Proper heading hierarchy
<Box component="section" id="about">
  <Typography variant="h2" component="h2">
    About Me
  </Typography>
  <Typography variant="h3" component="h3">
    Background
  </Typography>
</Box>

// ❌ WRONG - Skipped heading levels
<div>
  <h1>About Me</h1>
  <h4>Background</h4>
</div>
```

#### ARIA Labels

**All interactive elements must have accessible names:**

```tsx
// ✅ CORRECT
<IconButton
  onClick={handleClick}
  aria-label="toggle theme"
>
  <BrightnessAuto />
</IconButton>

<Button
  href="https://github.com"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="View project on GitHub (opens in new tab)"
>
  <GitHubIcon />
</Button>

// ❌ WRONG - No aria-label on icon-only button
<IconButton onClick={handleClick}>
  <BrightnessAuto />
</IconButton>
```

#### Keyboard Navigation

```tsx
// ✅ Ensure skip-to-content link (already in Header)
<Box
  component="a"
  href="#main-content"
  sx={{
    position: 'absolute',
    left: '-9999px',
    '&:focus': {
      left: '1rem',
      top: '1rem',
    },
  }}
>
  Skip to main content
</Box>

// ✅ Ensure main content has ID
<Box id="main-content" component="main">
  {/* content */}
</Box>
```

#### Focus Indicators

```tsx
// ✅ Maintain visible focus indicators
<Button
  sx={{
    '&:focus-visible': {
      outline: '2px solid',
      outlineColor: 'primary.main',
      outlineOffset: '2px',
    },
  }}
>
  Click Me
</Button>
```

#### Reduced Motion Support

```tsx
// ✅ Use useReducedMotion hook (already exists in src/hooks/)
import { useReducedMotion } from '../hooks/useReducedMotion';

const prefersReducedMotion = useReducedMotion();

<Box
  sx={{
    transition: prefersReducedMotion ? 'none' : 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  }}
/>;
```

#### Color Contrast

- Ensure 4.5:1 contrast for normal text
- Ensure 3:1 contrast for large text (18pt+)
- Use theme colors which are already WCAG AA compliant
- Test with browser DevTools accessibility panel

### 4. Component Structure

**File Organization:**

```
src/
├── components/
│   ├── ComponentName.tsx          # Component implementation
│   ├── ComponentName.test.tsx     # Unit tests
│   ├── ComponentName.stories.tsx  # Storybook stories
│   └── layout/                    # Layout-specific components
│       ├── Header.tsx
│       ├── Header.test.tsx
│       ├── Header.stories.tsx
│       └── Footer.tsx
├── pages/
│   └── Home.tsx                   # Page compositions
├── contexts/
│   └── ThemeContext.tsx           # Global state
├── hooks/
│   └── useReducedMotion.ts        # Custom hooks
└── types/
    └── index.ts                   # TypeScript types
```

**Component Template:**

```tsx
import { Box, Container, Typography } from '@mui/material';
import { IconName } from '@mui/icons-material';
import type { TypeName } from '../types';

interface ComponentNameProps {
  title?: string;
  description?: string;
  items?: TypeName[];
}

const ComponentName = ({ title, description, items = [] }: ComponentNameProps) => {
  return (
    <Box
      id="component-id"
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        position: 'relative',
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          component="h2"
          gutterBottom
          sx={{
            mb: 6,
            textAlign: 'center',
            fontWeight: 700,
          }}
        >
          {title}
        </Typography>

        {/* Component content */}
      </Container>
    </Box>
  );
};

export default ComponentName;
```

### 5. TypeScript Guidelines

**Define interfaces in `src/types/index.ts`:**

```tsx
export interface TypeName {
  id: string;
  title: string;
  description: string;
  optional?: string;
}
```

**Use proper typing:**

```tsx
// ✅ CORRECT
interface Props {
  items: TypeName[];
  onSelect: (item: TypeName) => void;
  variant?: 'primary' | 'secondary';
}

const Component = ({ items, onSelect, variant = 'primary' }: Props) => {
  // ...
};

// ❌ WRONG - Using any
const Component = ({ items, onSelect }: any) => {
  // ...
};
```

### 6. Performance Best Practices

**Optimize images:**

- Use WebP format when possible
- Provide multiple sizes for responsive images
- Use lazy loading: `<Box component="img" loading="lazy" />`

**Code splitting:**

- Use dynamic imports for large components
- Split routes if implementing route-based code splitting

**Memoization:**

- Use `React.memo()` for expensive components
- Use `useMemo()` for expensive calculations
- Use `useCallback()` for event handlers passed to children

### 7. Git Workflow

**Commit Message Format (Conventional Commits):**

```
feat(component): add new experience timeline
fix(header): correct navigation scroll behavior
docs(readme): update setup instructions
test(experience): add accessibility tests
refactor(skills): extract skill category component
style(footer): improve responsive spacing
perf(projects): optimize image loading
```

**Pre-commit Hooks (Automated):**

1. ESLint auto-fix
2. Prettier formatting
3. TypeScript type checking
4. Commitlint validation

**Commit Checklist:**

- ✅ All tests pass (`bun run test:all`)
- ✅ TypeScript compiles (`bun run type-check`)
- ✅ Linting passes (`bun run lint`)
- ✅ Storybook builds (`bun run build-storybook`)
- ✅ E2E tests pass (`bun run test`)

### 8. Working with Existing Components

**Before modifying any component:**

1. Read the component file
2. Check for existing tests
3. Run `bun run storybook` to see current behavior
4. Make changes
5. Update tests to reflect changes
6. Update stories if behavior changes
7. Run full test suite

**When adding new features:**

1. Create the component following the template
2. Add TypeScript types to `src/types/index.ts`
3. Write unit tests (aim for >90% coverage)
4. Create Storybook stories
5. Add to appropriate page (`src/pages/Home.tsx`)
6. Update navigation if needed (`src/components/layout/Header.tsx`)
7. Add E2E tests if user-facing

### 9. Common Patterns in This Project

**Navigation Scroll:**

```tsx
const handleNavClick = (path: string) => {
  if (path.startsWith('#')) {
    const element = document.querySelector(path);
    element?.scrollIntoView({ behavior: 'smooth' });
  }
};
```

**Theme Mode Toggle:**

```tsx
import { useThemeContext } from '../contexts/ThemeContext';

const { mode, setThemePreference } = useThemeContext();

// Use mode for conditional styling
<Box
  sx={{
    bgcolor: mode === 'dark' ? 'grey.900' : 'grey.100',
  }}
/>;
```

**Responsive Images:**

```tsx
<Box
  component="img"
  src="/path/to/image.webp"
  alt="Descriptive alt text"
  loading="lazy"
  sx={{
    width: '100%',
    height: 'auto',
    borderRadius: 2,
  }}
/>
```

### 10. Testing Commands

```bash
# Run all tests
bun run test:all

# Unit tests (watch mode)
bun run test:unit:watch

# Unit tests (single run)
bun run test:unit

# E2E tests
bun run test

# E2E with UI
bun run test:ui

# Coverage report
bun run test:coverage

# Component tests (Storybook)
bun run test:components

# Storybook development
bun run storybook

# Build Storybook
bun run build-storybook
```

### 11. Project-Specific Notes

**Theme Colors:**

- Primary: Cyan (`#06b6d4`)
- Secondary: Purple (`#9333ea`)
- Refer to `THEME_COLORS.md` for full palette

**Navigation Structure:**

- Home (Hero)
- About
- Skills
- Experience
- Projects
- Contact
- Storybook (external)

**External Links:**

- GitHub: https://github.com/thisnamespace
- LinkedIn: https://www.linkedin.com/in/michael-day-0b194246
- Email: info@thisnamespace.com

**Key Features:**

- Light/Dark/System theme toggle
- Smooth scroll navigation
- Fully accessible (WCAG 2.1 AA)
- Mobile-first responsive design
- Error boundaries for graceful error handling

### 12. When Making Changes

**Checklist for Every Change:**

- [ ] Used MUI components exclusively
- [ ] Added/updated unit tests
- [ ] Added/updated Storybook stories
- [ ] Verified accessibility (ARIA labels, keyboard nav, focus indicators)
- [ ] Tested responsive design (xs, sm, md, lg breakpoints)
- [ ] Tested light and dark theme modes
- [ ] Checked reduced motion support
- [ ] Ran type checking (`bun run type-check`)
- [ ] Ran linting (`bun run lint`)
- [ ] Verified all tests pass (`bun run test:all`)
- [ ] Committed with conventional commit message

## Resources

- [Material-UI Documentation](https://mui.com/material-ui/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Vitest Documentation](https://vitest.dev/)
- [Storybook Documentation](https://storybook.js.org/docs/react/get-started/introduction)

## Questions?

Refer to existing components as examples:

- Simple component: `src/components/Skills.tsx`
- Complex component: `src/components/Experience.tsx`
- Layout component: `src/components/layout/Header.tsx`
- Tests: `src/components/Experience.test.tsx`
- Stories: `src/components/Experience.stories.tsx`
