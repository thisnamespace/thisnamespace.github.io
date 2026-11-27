# Contributing Guide

This document outlines the development workflow and code standards for this project.

## Code Standards

### Git Commit Messages

We use [Conventional Commits](https://www.conventionalcommits.org/) specification for commit messages. This leads to more readable messages that are easy to follow when looking through the project history.

#### Commit Message Format

Each commit message consists of a **type**, an optional **scope**, and a **subject**:

```
<type>(<scope>): <subject>
```

Example:

```
feat(header): Add mobile navigation drawer
fix(logo): Resolve background color issue in dark mode
docs(readme): Update installation instructions
```

#### Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, etc)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **build**: Changes that affect the build system or external dependencies
- **ci**: Changes to CI configuration files and scripts
- **chore**: Other changes that don't modify src or test files
- **revert**: Reverts a previous commit

#### Using Commitizen

To make creating conventional commits easier, use the interactive CLI:

```bash
bun run commit
```

This will guide you through creating a properly formatted commit message.

## Pre-Commit Hooks

We use Husky and lint-staged to ensure code quality before commits.

### What Runs on Pre-Commit

When you commit, the following checks run automatically:

1. **ESLint**: Lints and auto-fixes TypeScript/React code
2. **Prettier**: Formats code according to our style guide
3. **TypeScript**: Type checks the entire codebase

If any of these checks fail, the commit will be blocked. Fix the issues and try again.

### Manual Checks

You can run these checks manually:

```bash
# Lint and fix
bun run lint:fix

# Format code
bun run format

# Type check
bun run type-check

# Run all checks
bun run lint:fix && bun run format && bun run type-check
```

## Development Workflow

### 1. Start Development Server

```bash
bun run dev
```

### 2. Make Changes

- Follow the existing code style
- Write meaningful component and variable names
- Add comments for complex logic
- Ensure components are accessible (ARIA labels, semantic HTML)
- Make it responsive (mobile-first approach)

### 3. Test Your Changes

```bash
# Run Playwright tests
bun run test

# Run tests in UI mode
bun run test:ui

# View Storybook
bun run storybook
```

### 4. Format and Lint

Before committing, ensure your code is properly formatted:

```bash
bun run lint:fix
bun run format
```

### 5. Commit Changes

Use Commitizen for guided commits:

```bash
bun run commit
```

Or use regular git commit (message will be validated):

```bash
git commit -m "feat(component): Add new feature"
```

### 6. Push Changes

```bash
git push
```

## Code Style Guide

### TypeScript/React

- Use functional components with TypeScript
- Use arrow functions for components
- Prefer `const` over `let`
- Use meaningful variable names
- Export components as default at the end of the file

### Component Structure

```tsx
interface MyComponentProps {
  title: string;
  onClick?: () => void;
}

const MyComponent = ({ title, onClick }: MyComponentProps) => {
  // Component logic here

  return <div>{/* JSX here */}</div>;
};

export default MyComponent;
```

### Styling

- All styles live in one stylesheet, `src/styles/site.css`. There is no CSS-in-JS.
- Use the CSS variables at the top of that file for colours, fonts and spacing (`--brand`, `--accent`, `--paper`, `--ink`).
- Gold (`--accent`) marks what is live or clickable. Don't use it for decoration.
- Write mobile first and widen at the `56.25rem` breakpoint.

### Accessibility

- Add `aria-label` to interactive elements
- Use semantic HTML elements
- Ensure keyboard navigation works
- Test with screen readers when possible

## Testing

### Unit/Component Tests

(Coming soon)

### E2E Tests with Playwright

Tests are located in the `tests/` directory:

- `accessibility.spec.ts` - Accessibility compliance tests
- `navigation.spec.ts` - Navigation and interaction tests
- `visual.spec.ts` - Visual regression tests

```bash
# Run all tests
bun run test

# Run with UI
bun run test:ui

# Debug mode
bun run test:debug
```

## Storybook

We use Storybook for component development and documentation.

```bash
# Start Storybook
bun run storybook

# Build Storybook
bun run build-storybook
```

Stories are located alongside components with `.stories.tsx` extension.

## Build

```bash
# Type check and build
bun run build

# Preview production build
bun run preview
```

## Questions?

If you have questions about the development workflow or code standards, please open an issue or reach out to the maintainers.
