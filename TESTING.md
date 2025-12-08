# Testing Guide

This project includes comprehensive testing at **three levels**: Unit → Component → E2E

## Testing Architecture

### 1. Unit Testing (Vitest + React Testing Library)

- **Location**: `src/**/*.test.tsx`
- **Environment**: jsdom (fast, lightweight)
- **Coverage**: 91%+
- **Purpose**: Test individual components and utilities in isolation
- **Tests**:
  - React hooks and context (ThemeContext)
  - Error boundaries
  - Utility functions
  - Component logic

### 2. Component Testing (Vitest + Storybook + Playwright)

- **Location**: `src/components/**/*.stories.tsx`
- **Environment**: Real browser (Playwright)
- **Purpose**: Test component rendering and interactions in isolation
- **Coverage**:
  - Component rendering
  - User interactions
  - Form validation
  - Component state changes

### 3. E2E Testing (Playwright)

- **Location**: `tests/` directory
- **Environment**: Real browser (Chromium, Firefox, WebKit)
- **Purpose**: Full application testing in real browser environments
- **Coverage**:
  - Navigation and routing
  - Theme switching (light/dark/system)
  - Accessibility (WCAG compliance via @axe-core/playwright)
  - Visual regression testing

## Running Tests

### Unit Tests

```bash
# Run unit tests
bun run test:unit

# Run in watch mode (auto-rerun on file changes)
bun run test:unit:watch

# Run with Vitest UI (interactive debugging)
bun run test:unit:ui

# Generate coverage report
bun run test:coverage
```

### Component Tests

```bash
# Run component tests
bun run test:components

# Run with Vitest UI
bun run test:components:ui

# Run in watch mode
bun run test:components:watch
```

### E2E Tests

```bash
# Run all E2E tests
bun run test

# Run with UI mode (interactive)
bun run test:ui

# Run in headed browser (see the browser)
bun run test:headed

# Run with debugger
bun run test:debug

# View test report
bun run test:report
```

### Run All Tests

```bash
# Run unit, component, and E2E tests
bun run test:all
```

## Writing Tests

### Unit Tests

Unit tests use Vitest + React Testing Library:

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('MyComponent', () => {
  it('should render correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('should handle user interaction', async () => {
    const user = userEvent.setup();
    render(<MyComponent />);

    await user.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(screen.getByText('Clicked')).toBeInTheDocument();
    });
  });
});
```

### Component Tests

Component tests are written using the `play` function in Storybook stories:

```typescript
import { expect, within, userEvent } from '@storybook/test';

export const InteractiveStory: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find elements
    const button = canvas.getByRole('button', { name: /click me/i });

    // Verify initial state
    await expect(button).toBeInTheDocument();
    await expect(button).toBeEnabled();

    // Simulate user interaction
    await userEvent.click(button);

    // Verify outcome
    const result = await canvas.findByText(/success/i);
    await expect(result).toBeVisible();
  },
};
```

## Test Coverage

**Current Coverage: 91%+**

```
File               | % Stmts | % Branch | % Funcs | % Lines
-------------------|---------|----------|---------|--------
All files          |   91.11 |    92.59 |   82.35 |   90.9
ThemeContext.tsx   |   94.11 |    94.59 |   83.33 |  93.93
ErrorBoundary.tsx  |   81.81 |    71.42 |      80 |  81.81
```

### Unit Test Suites

1. **ThemeContext Tests** (`src/contexts/ThemeContext.test.tsx`)
   - Default system preference
   - Light/dark/system mode switching
   - localStorage persistence
   - Loading saved preferences

2. **ErrorBoundary Tests** (`src/components/ErrorBoundary.test.tsx`)
   - Normal render (no error)
   - Error state rendering
   - Custom fallback rendering
   - Try Again button functionality

### Component Test Coverage

- **Header**: Navigation buttons, theme toggle
- **Contact**: Form fields, user input
- **Hero**: Content rendering
- **Skills**: Skills display
- **Projects**: Project cards
- **About**: About section
- **Footer**: Footer links
- **Logo**: Logo variations

### E2E Test Suites

1. **Accessibility Tests** (`tests/accessibility.spec.ts`)
   - WCAG compliance scanning
   - Heading hierarchy
   - Skip links
   - Alt text
   - ARIA labels
   - Form labels
   - Keyboard navigation
   - Dark mode accessibility

2. **Navigation Tests** (`tests/navigation.spec.ts`)
   - Section navigation
   - Smooth scrolling
   - Theme menu interactions
   - Theme persistence
   - External links
   - Header sticky behavior

3. **Visual Tests** (`tests/visual.spec.ts`)
   - Homepage screenshots (light/dark)
   - Component screenshots
   - Theme toggle states

## CI/CD Integration

All three test suites can be integrated into CI/CD pipelines:

```yaml
# Example GitHub Actions
- name: Install dependencies
  run: bun install

- name: Run Unit Tests
  run: bun run test:unit

- name: Generate Coverage Report
  run: bun run test:coverage

- name: Run Component Tests
  run: bun run test:components

- name: Run E2E Tests
  run: bun run test

# Or run all tests at once
- name: Run All Tests
  run: bun run test:all
```

## Best Practices

1. **Use semantic queries**: Prefer `getByRole`, `getByLabelText` over `getByTestId`
2. **Test user behavior**: Focus on how users interact with components
3. **Avoid implementation details**: Don't test internal state or implementation
4. **Keep tests maintainable**: Use descriptive test names and clear assertions
5. **Combine both approaches**: Use E2E for critical paths, component tests for isolated logic

## Debugging Tests

### Unit Tests (Vitest)

```bash
# Use Vitest UI for interactive debugging
bun run test:unit:ui

# Run in watch mode to see changes live
bun run test:unit:watch

# Add console.log or debugger statements in your tests
```

### Component Tests (Vitest)

```bash
# Use Vitest UI for interactive debugging
bun run test:components:ui

# Run in watch mode
bun run test:components:watch
```

### E2E Tests (Playwright)

```bash
# Run in headed mode to see the browser
bun run test:headed

# Use the Playwright inspector
bun run test:debug

# Generate trace files
npx playwright show-trace trace.zip
```

## Testing Pyramid

```
       /\
      /  \     E2E Tests (Playwright)
     /    \    - Slow, comprehensive
    /------\   - Real browser environment
   /        \  - User workflows
  /          \
 /   Component \ Component Tests (Storybook + Playwright)
/     Tests     \ - Medium speed
\              / - Isolated components
 \            /  - User interactions
  \----------/
   \        /    Unit Tests (Vitest)
    \      /     - Fast, focused
     \    /      - Logic and utilities
      \  /       - 91%+ coverage
       \/

```

## Benefits of This Approach

✅ **Three-Tier Coverage**: Unit → Component → E2E testing pyramid
✅ **Fast Feedback**: Unit tests run in milliseconds with jsdom
✅ **High Coverage**: 91%+ code coverage from unit tests
✅ **Visual Documentation**: Component tests live in Storybook
✅ **Real Browser Testing**: Component and E2E tests use Playwright
✅ **Accessibility**: Built-in a11y testing with @storybook/addon-a11y and @axe-core/playwright
✅ **Type Safety**: Full TypeScript support across all test suites
✅ **Isolated Testing**: Each level tests different concerns
