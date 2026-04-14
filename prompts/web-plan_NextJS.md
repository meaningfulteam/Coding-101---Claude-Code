Use plan mode to design a new page/route for my existing Next.js portfolio website.

## Constraints

- Use **Next.js (App Router)**, React, and CSS Modules.
- Strictly follow Next.js conventions:
    - Use `next/link` for internal navigation.
    - Use `next/image` for optimized images.
    - Proper segregation of **Server Components** (default) and **Client Components** (`'use client'`).
- Must follow the same design system (colors, fonts, spacing) defined in the existing `globals.css` or `tailwind.config.ts`.
- The new page must integrate smoothly into the existing `app/layout.tsx` and reuse existing UI components where possible.

## Context

- **Existing architecture:** Next.js App Router (`app/` directory).
- **Additional Libraries:** Framer Motion, Lucide React, Radix UI.

## Task

Plan the creation of a new route `/[PAGE_NAME]` that will serve as [DESCRIBE EL PROPÓSITO — ej. "una galería de proyectos", "un blog", "un formulario de contacto"].

Include in your plan:

1. **Route Structure:** The exact path and folders that will be created (e.g., `app/[PAGE_NAME]/page.tsx`).
2. **Component Hierarchy:** Breakdown of the page into reusable components.
3. **Rendering Strategy:** Clearly distinguish which parts will be Server Components and which need to be Client Components for interactivity.
4. **Data & State:** Describe any data fetching (using `fetch` in Server Components) or React hooks (`useState`, `useEffect`) required.
5. **Files:** A list of exactly what files will be created or modified.

Do not write code yet — only plan.