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

