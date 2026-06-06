# Design Architecture Decisions (Phase 1)

## Context
This Astro app is being aligned to the reference design in:
`/Minakshi-deewan-Claude-sonnet`.

The objective is an enterprise-grade, reusable, data-driven design system with:
1. **Single component directory strategy** (pattern-library style).
2. **Consistent headings and typography system** across pages and sections.
3. **DRY and reusable primitives** for repeated UI patterns.
4. **Dynamic content-first rendering** (CMS/content collections, prop-driven components).

## Decision 1: Component architecture
**Decision:** Establish shared primitives under `src/components/system/`.

**Why:**
- Reduces repeated heading/hero implementations.
- Creates a stable design API for all pages.
- Supports pattern-library style composition.

**Components introduced in Phase 1:**
- `system/PageHeader.astro` — unified top-of-page heading pattern.
- `system/SectionHeader.astro` — reusable section heading with optional action link.
- `system/HomeHero.astro` — reusable editorial home hero pattern.
- `system/PressMarquee.astro` — reusable featured-publication marquee strip.

## Decision 2: Heading consistency contract
**Decision:** Page and section headings must be rendered through shared primitives, not ad-hoc classes.

**Rules:**
- Top page heading uses `PageHeader`.
- Section heading blocks use `SectionHeader`.
- Eyebrows always use mono uppercase pattern with accent rule.
- Display italics use Fraunces variation settings and accent token.

## Decision 3: Dynamic content contract
**Decision:** UI patterns are prop-driven and fed by data sources (Payload CMS or Astro collections).

**Rules:**
- No hard-coded UI copy inside reusable components where props are viable.
- Home page sections consume fetched collections/CMS records and map to pattern components.
- Presentational components remain stateless and avoid fetching directly when possible.

## Decision 4: DRY + reuse constraints
**Decision:** Prefer composition over duplicated style blocks.

**Implementation guidance:**
- If a style pattern appears in 2+ places, extract a component primitive.
- Keep typography/color tokens centralized (global design tokens).
- Use one canonical button and heading behavior across patterns.

## Decision 5: Phase delivery approach
**Decision:** Execute in phases to control risk and preserve quality.

**Phase 1 (current):**
- Shared primitives + homepage hero/pattern alignment.
- Standardized heading system wired across primary pages.

**Phase 2 (next):**
- Card/grid patterns across all listing pages.
- Book detail subsystems and media/podcast cards alignment.

## Decision 6: Quality gates
**Decision:** Every phase must pass build and preserve dynamic rendering behavior.

**Checks:**
- Astro build succeeds.
- No regressions in top-level routes.
- Heading primitives used consistently in updated pages.


---

# Phase 2 — Payload Page Builder

## Decision 7: CMS-driven pages via a `Pages` collection
**Decision:** All marketing/content pages are composed in Payload as ordered block lists in a single `pages` collection.

**Why:**
- Editors compose layouts visually without dev help.
- One source of truth for page structure and SEO meta.
- Detail pages for collections (`/books/:slug`, `/articles/:slug`) remain in Astro because they are templated per-entity, not free-form.

## Decision 8: Routing via catch-all `[...slug].astro`
**Decision:** A single catch-all route resolves any Page from the CMS by slug.

**Rules:**
- `/` → page with slug `home` (required; site won't render `/` without it).
- `/about` → page with slug `about`. Existing static `about.astro` etc. take precedence until migrated.
- Nested slugs (`/team/contact`) supported.
- 404 returned when no Page matches.

## Decision 9: Block adapter pattern (CMS ↔ Astro)
**Decision:** Payload blocks are mapped to Astro adapters that translate CMS props into pure presentational primitives.

```
cms/src/blocks/<Name>/config.ts        // Payload block schema
app/src/components/blocks/<Name>Block.astro   // adapter (CMS-aware)
app/src/components/system/<Name>.astro        // primitive (CMS-agnostic, reusable)
```

**Why (SOLID):**
- **SRP:** Adapters only do CMS→props translation; primitives only render.
- **OCP:** New blocks added by creating two files + one registry entry; no edits to existing code.
- **DIP:** Primitives depend on plain TypeScript interfaces, not Payload types.
- **DRY:** Primitives reused on non-CMS routes (e.g., book detail pages reuse `FeaturedBook`).

## Decision 10: Block registry (`BlockRenderer`)
**Decision:** `components/blocks/BlockRenderer.astro` holds a `Record<blockType, Adapter>` and iterates the page's blocks list.

- Unknown `blockType` is logged in dev and skipped — never crashes the page.
- Adding a block = three steps (CMS config, Astro adapter, registry entry).

## Phase 2 block library (initial set)
| Block         | CMS slug          | Astro adapter              | Primitive                  |
|---------------|-------------------|----------------------------|----------------------------|
| Hero          | `hero`            | `HeroBlock.astro`          | `system/HomeHero.astro`    |
| Press Marquee | `pressMarquee`    | `PressMarqueeBlock.astro`  | `system/PressMarquee.astro`|
| Featured Book | `featuredBook`    | `FeaturedBookBlock.astro`  | `system/FeaturedBook.astro`|
| Latest Articles | `latestArticles`| `LatestArticlesBlock.astro`| (uses `ImageContentCard`)  |
| Figures       | `figures`         | `FiguresBlock.astro`       | `system/Figures.astro`     |

## How to add a new block (4-step recipe)
1. **CMS schema:** create `cms/src/blocks/<Name>/config.ts` exporting a `Block` with `slug` + `fields`.
2. **Register in CMS:** import + push to `cms/src/blocks/index.ts`. Run a Payload migration.
3. **Astro types:** add an interface to `app/src/components/blocks/types.ts` (`blockType` matches the slug).
4. **Astro adapter:** create `app/src/components/blocks/<Name>Block.astro` that translates props → a system primitive. Register it in `BlockRenderer.astro`'s `REGISTRY` map.

That's it. Existing pages and blocks remain untouched.
