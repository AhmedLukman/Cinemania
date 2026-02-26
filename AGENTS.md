# AGENTS.md - Cinemania Development Guide

This document provides guidelines and commands for agents working on the Cinemania codebase.

## Project Overview

Cinemania is a Next.js 16 movie database application using React 19, TypeScript, and the TMDB API. It uses Bun as the package manager, Biome for linting/formatting, Zod for runtime validation, and Tailwind CSS for styling.

## Commands

### Development
```bash
bun run dev    # Start development server at http://localhost:3000
```

### Building
```bash
bun run build    # Create production build
bun run start    # Start production server
```

### Linting & Formatting
```bash
bun run lint      # Run Biome linter (check only)
bun run format    # Format code with Biome (modifies files)
```

### Type Checking
```bash
npx tsc --noEmit    # Run TypeScript compiler check
```

## Code Style Guidelines

### General Principles
- Use TypeScript with strict mode enabled
- Prefer explicit type annotations over function parameters
- Use named exports over default exports
- Keep functions small and focused; use early returns

### Naming Conventions
- **Components**: PascalCase (e.g., `MovieCard`, `SliderProvider`)
- **Hooks**: camelCase with `use` prefix (e.g., `useSliderSync`)
- **Variables/Functions**: camelCase (e.g., `getImageUrl`, `cachedMovieList`)
- **Types/Interfaces**: PascalCase (e.g., `MovieDetailsType`)
- **Constants**: PascalCase for enum-like objects (e.g., `TmdbApiMovieEndpoints`)
- **Files**: PascalCase for components

### Import Organization
Order: 1) External libs (axios, react, zod), 2) Internal `@/` imports, 3) Type imports with `type` keyword. Biome auto-organizes with `biome check --write`.

### TypeScript Guidelines
- Use `type` for all shapes unless situations where type cannot suffice then opt for `interface`
- Use `z.infer<typeof Schema>` to derive types from Zod schemas
- Always use the `type` keyword for type-only imports
- Prefer explicit return types for variables/functions which TS can't infer

```typescript
export const MovieResponseSchema = z.object({...});
export type MovieResponseType = z.infer<typeof MovieResponseSchema>;
```

### Zod Validation Patterns
- Define schemas in `src/lib/validators.ts`
- Use `.extend()` for schema inheritance
```typescript
const BaseMediaSchema = z.object({ backdrop_path: z.string().nullable(), id: z.number() });
export const MovieSchema = BaseMediaSchema.extend({ genre_ids: z.array(z.number()), title: z.string() });
```

### Component Structure
- Place components in the appropriate directories
- Separate server-side and client-side logic

### Tailwind CSS
- Use Tailwind v4 with `@tailwindcss/postcss`
- Define custom styles in `src/app/globals.css`

## File Organization

```
src/
├── app/              # Next.js App Router pages
│   ├── movie/        # Movie pages
│   ├── tv/          # TV pages
│   ├── celebrity/   # Celebrity pages
│   ├── layout.tsx   # Root layout
│   └── page.tsx    # Home page (redirects to /movie)
├── components/      # Reusable UI components
├── context/         # React Context providers
├── hooks/          # Custom React hooks
└── lib/            # Utilities, validators, constants
    ├── constants.ts, serverService.ts, utils.ts, validators.ts
```

## Build to verify Before Committing

```bash
bun run build
```
