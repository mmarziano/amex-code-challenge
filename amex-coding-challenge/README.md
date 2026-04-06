# Accordion Code Challenge

This project is a React + TypeScript implementation of an accessible accordion component.

The solution focuses on:

- a reusable, typed component API
- accessibility-first behavior and semantics
- design token usage through CSS custom properties
- required test coverage

## Tech Stack

- React 19
- TypeScript
- Vite
- Vitest + React Testing Library
- ESLint + Prettier
- MUI

## Getting Started

```bash
npm install
npm run dev
```

Open the app in your browser from the local URL printed by Vite.

## Scripts

- `npm run dev` - start development server
- `npm run build` - build production bundle
- `npm run test` - run unit/integration tests
- `npm run lint` - run ESLint
- `npm run typecheck` - run TypeScript checks without emit
- `npm run check` - run typecheck, lint, and formatting check

## Component API

`Accordion` accepts:

- `panels: AccordionPanel[]` (required)
- `shouldAllowMultipleExpanded?: boolean` (defaults to `true`)

`AccordionPanel` shape:

- `id: string` - stable identifier for keys/aria linkage
- `title: string` - trigger label
- `content: ReactNode` - region content

Behavior:

- In multi-expand mode, multiple panels can remain open.
- In single-expand mode, opening one panel closes the previously open panel.
- Clicking an expanded panel toggles it closed.

## Accessibility Decisions

The component uses native button semantics and explicit ARIA relationships:

- trigger button exposes `aria-expanded` and `aria-controls`
- content region uses `role="region"` and `aria-labelledby`

## Design System Layer

Tokens live in `src/design-system/tokens.ts` and are mapped to CSS variables in `src/design-system/theme.ts`.

- centralized values for color, spacing, typography, radius, and motion
- component styling through semantic variables

## Testing Approach

Tests in `src/components/Accordion/Accordion.test.tsx` cover:

- initial collapsed render
- expand/collapse interactions
- multi-expand and single-expand behavior
- mode-switch reset behavior
- ARIA linkage integrity for controls and regions

Run:

```bash
npm run test
```

## Project Structure

```text
src/
  components/
    Accordion/
  design-system/
  test/
```

## Notes

- The accordion is implemented with MUI primitives (`Accordion`, `AccordionSummary`, `AccordionDetails`)
- Design tokens remain the source of truth for visual decisions through CSS custom properties.

- I opted for a small, easy-to-demo project to meet the challenge requirements. In a production environment, I would typically house the design system in its own repository/package and manage it as a shared dependency (standalone package or Git submodule) so it can be consumed consistently across multiple applications
