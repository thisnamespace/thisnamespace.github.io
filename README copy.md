# Front End Engineering Manager Portfolio

A modern, responsive portfolio website built with React, TypeScript, Vite, and Material-UI (MUI).

## Features

- Modern, clean design with Material-UI components
- Fully responsive layout
- TypeScript for type safety
- Fast development with Vite
- Smooth scrolling navigation
- Contact form
- Project showcase
- Skills section
- Professional hero section

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Material-UI (MUI)** - Component library
- **React Router** - Routing
- **Bun** - Package manager and runtime

## Getting Started

### Prerequisites

Install Bun if you haven't already:

```bash
curl -fsSL https://bun.sh/install | bash
```

### Installation

1. Navigate to the project directory:

```bash
cd portfolio-website
```

2. Install dependencies:

```bash
bun install
```

### Development

Run the development server:

```bash
bun run dev
```

The application will be available at `http://localhost:5173`

### Build

Create a production build:

```bash
bun run build
```

### Preview Production Build

Preview the production build locally:

```bash
bun run preview
```

## Project Structure

```
portfolio-website/
├── src/
│   ├── components/      # Reusable components
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   ├── pages/          # Page components
│   │   └── Home.tsx
│   ├── theme/          # MUI theme configuration
│   │   └── theme.ts
│   ├── types/          # TypeScript type definitions
│   │   └── index.ts
│   ├── App.tsx         # Main app component
│   └── main.tsx        # Entry point
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Customization

### Update Personal Information

1. **Contact Information**: Update email, LinkedIn, and GitHub links in:
   - `src/components/Hero.tsx`
   - `src/components/Contact.tsx`
   - `src/components/Footer.tsx`

2. **Projects**: Edit the projects array in `src/components/Projects.tsx`

3. **Skills**: Modify the skills array in `src/components/Skills.tsx`

4. **About Section**: Update the content in `src/components/About.tsx`

### Customize Theme

Edit `src/theme/theme.ts` to customize:

- Colors
- Typography
- Component styles
- Breakpoints

## Development Workflow

### Code Quality

The project uses several tools to maintain code quality:

- **ESLint** - Linting
- **Prettier** - Code formatting
- **TypeScript** - Type checking
- **Husky** - Git hooks
- **lint-staged** - Pre-commit linting

### Making Commits

This project uses [Commitizen](https://github.com/commitizen/cz-cli) for consistent commit messages following the [Conventional Commits](https://www.conventionalcommits.org/) specification.

**One-time setup** (optional - enables `git cz` command):

```bash
git config --local alias.cz '!bunx cz'
```

To make a commit:

```bash
# Stage your changes
git add .

# Run Commitizen (choose ONE of these methods)
bun run commit        # Recommended - uses npm script
git cz               # Alternative - requires one-time setup above
bunx cz              # Alternative - no setup needed
```

The commit helper will guide you through:

1. Selecting the type of change (feat, fix, docs, etc.)
2. Writing a short description
3. Adding a longer description (optional)
4. Noting breaking changes (if any)

### Testing

This project includes comprehensive testing at three levels:

**Unit Tests (Vitest + React Testing Library)** - 91% coverage:

```bash
bun run test:unit           # Run unit tests
bun run test:unit:watch     # Run in watch mode
bun run test:unit:ui        # Run with Vitest UI
bun run test:coverage       # Generate coverage report
```

**Component Tests (Vitest + Storybook)**:

```bash
bun run test:components        # Run component tests
bun run test:components:ui     # Run with Vitest UI
bun run test:components:watch  # Run in watch mode
```

**E2E Tests (Playwright)**:

```bash
bun run test          # Run all E2E tests
bun run test:ui       # Run with UI mode
bun run test:headed   # Run in headed browser
bun run test:debug    # Run with debugger
```

**Run All Tests**:

```bash
bun run test:all      # Run unit, component, and E2E tests
```

See [TESTING.md](TESTING.md) for detailed testing documentation.

### Storybook

View component documentation and test components in isolation:

```bash
bun run storybook           # Start Storybook dev server
bun run build-storybook     # Build static Storybook
```

## License

MIT
