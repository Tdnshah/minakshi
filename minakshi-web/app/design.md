# Minakshi Dewan — Design System

> **Visual identity:** Editorial-scholarly. Ivory paper, deep ink, single oxblood accent. Oversized Fraunces serif with italic emphasis. Hairline rules do the structural work.
>
> **Mood:** Weighty · bold · scholarly. Granta / FT-Weekend / NYT Magazine territory.
>
> **Tech:** Drop-in for Tailwind CSS v3.4+ or v4. Self-contained — no plugin dependencies.

---

## 1. Fonts

Three families. Load all from Google Fonts.

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght,SOFT,WONK@9..144,300..900,0..100,0..1&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

| Role     | Family           | Weights used  | Where                                              |
| -------- | ---------------- | ------------- | -------------------------------------------------- |
| Display  | **Fraunces**     | 400, 500, 600 | All h1–h4, hero name, blockquotes, book covers, pull quotes, drop-caps, italic emphasis |
| Body     | **Inter**        | 400, 500, 600 | Paragraphs, nav links, buttons, form inputs        |
| Mono     | **JetBrains Mono** | 400, 500    | Eyebrows, dates, meta labels, tags, role badges    |

**Fraunces is the personality.** Always use it with variable-axis settings — `opsz` controls optical sizing, `SOFT` controls roundness, `WONK` toggles the playful alternate glyphs.

| Use            | `opsz` | `SOFT` | `WONK` | Weight |
| -------------- | ------ | ------ | ------ | ------ |
| Display heads  | 144    | 30     | 0      | 500–600 |
| Italic emphasis (`em`, `i`) | 144 | 50–80 | 1   | 500    |
| Sub-display / lead | 36 | 40–80 | 0–1   | 400    |
| Pull-quote     | 144    | 80     | 1      | 400    |
| Drop-cap       | 144    | 30     | 0      | 500    |

---

## 2. Color tokens

| Token              | Hex        | Purpose                                  |
| ------------------ | ---------- | ---------------------------------------- |
| `--paper`          | `#f4efe6`  | Page background (warm ivory)             |
| `--paper-deep`     | `#ebe4d6`  | Card hover, image placeholders           |
| `--paper-soft`     | `#faf6ee`  | Subtle section wash                      |
| `--ink`            | `#1a1814`  | Primary text, hairlines, buttons         |
| `--ink-mid`        | `#4a4339`  | Secondary text                           |
| `--ink-soft`       | `#807868`  | Muted meta, captions                     |
| `--rule-soft`      | `#c9c0ad`  | Soft borders, dividers                   |
| `--accent`         | `#7a1f1f`  | **Single accent — oxblood**              |
| `--accent-deep`    | `#5a1414`  | Accent hover state                       |
| `--accent-on`      | `#f4efe6`  | Foreground when on accent background     |

**Rule of one accent.** Oxblood appears at most twice per screen — usually once on a key italic word in a headline, once on an eyebrow or hover state.

---

## 3. Tailwind config

Drop this into `tailwind.config.js` (v3) or as `@theme` in v4.

### Tailwind v3 — `tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper:        '#f4efe6',
        'paper-deep': '#ebe4d6',
        'paper-soft': '#faf6ee',
        ink:          '#1a1814',
        'ink-mid':    '#4a4339',
        'ink-soft':   '#807868',
        'rule-soft':  '#c9c0ad',
        accent:       '#7a1f1f',
        'accent-deep':'#5a1414',
      },
      fontFamily: {
        display: ['Fraunces', 'Iowan Old Style', 'Charter', 'Georgia', 'serif'],
        body:    ['Inter', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'ui-monospace', 'Menlo', 'monospace'],
      },
      fontSize: {
        // matches the project's clamp() scale (px equivalents at desktop)
        'eyebrow': ['0.75rem',  { lineHeight: '1',    letterSpacing: '0.18em' }],
        'meta':    ['0.8125rem',{ lineHeight: '1.2',  letterSpacing: '0.1em'  }],
        'lead':    ['1.625rem', { lineHeight: '1.4',  letterSpacing: '-0.015em' }],
        'h4':      ['1.5rem',   { lineHeight: '1.04', letterSpacing: '-0.01em'  }],
        'h3':      ['2.25rem',  { lineHeight: '1.04', letterSpacing: '-0.02em'  }],
        'h2':      ['4.5rem',   { lineHeight: '1.04', letterSpacing: '-0.02em'  }],
        'h1':      ['7rem',     { lineHeight: '0.92', letterSpacing: '-0.035em' }],
      },
      letterSpacing: {
        'display': '-0.02em',
        'hero':    '-0.035em',
        'mono':    '0.14em',
        'eyebrow': '0.18em',
      },
      maxWidth: {
        'prose-narrow': '56ch',
        'prose':        '68ch',
        'shell':        '1320px',
      },
      transitionTimingFunction: {
        'editorial': 'cubic-bezier(0.23, 1, 0.32, 1)',
      },
      borderColor: { DEFAULT: '#1a1814' },
    },
  },
  plugins: [],
};
```

### Tailwind v4 — `app.css`

```css
@import "tailwindcss";

@theme {
  --color-paper:        #f4efe6;
  --color-paper-deep:   #ebe4d6;
  --color-paper-soft:   #faf6ee;
  --color-ink:          #1a1814;
  --color-ink-mid:      #4a4339;
  --color-ink-soft:     #807868;
  --color-rule-soft:    #c9c0ad;
  --color-accent:       #7a1f1f;
  --color-accent-deep:  #5a1414;

  --font-display: "Fraunces", "Iowan Old Style", "Charter", Georgia, serif;
  --font-body:    "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-mono:    "JetBrains Mono", ui-monospace, Menlo, monospace;

  --ease-editorial: cubic-bezier(0.23, 1, 0.32, 1);
}
```

---

## 4. Base layer (paste once)

These global rules carry the editorial feel — paste into `@layer base`.

```css
@layer base {
  html { scroll-behavior: smooth; }
  body {
    @apply bg-paper text-ink font-body antialiased;
    font-weight: 400;
    line-height: 1.6;
  }
  ::selection { @apply bg-accent text-paper; }

  h1, h2, h3, h4, blockquote {
    @apply font-display text-ink;
    font-weight: 500;
    line-height: 1.04;
    letter-spacing: -0.02em;
    font-variation-settings: "opsz" 144, "SOFT" 30, "WONK" 0;
    text-wrap: balance;
  }
  h1 { @apply text-5xl md:text-7xl lg:text-[7rem]; font-weight: 600; letter-spacing: -0.035em; }
  h2 { @apply text-4xl md:text-6xl lg:text-[4.5rem]; }
  h3 { @apply text-2xl md:text-3xl lg:text-[2.25rem]; }
  h4 { @apply text-lg md:text-xl lg:text-2xl; font-weight: 600; letter-spacing: -0.01em; }
  p  { text-wrap: pretty; }

  em, i {
    font-style: italic;
    font-variation-settings: "opsz" 144, "SOFT" 50, "WONK" 1;
  }
  strong { @apply font-semibold text-ink; }
}
```

---

## 5. Component class recipes

Each block below = the exact Tailwind classes to recreate that component. Drop into your HTML directly, or wrap with `@apply` inside `@layer components`.

### Eyebrow (mono kicker above headings)

```html
<span class="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.18em] text-accent
             before:content-[''] before:w-6 before:h-px before:bg-accent">
  Featured work
</span>
```

### Lead paragraph (under hero / page header)

```html
<p class="font-display font-normal text-xl md:text-2xl leading-snug tracking-[-0.015em]
          text-ink-mid max-w-[68ch]"
   style='font-variation-settings: "opsz" 24, "SOFT" 50;'>
  Author, researcher, and consultant working at the intersection of …
</p>
```

### Hero (name + role + portrait)

```html
<section class="border-b border-ink py-20">
  <div class="max-w-shell mx-auto px-[clamp(1.25rem,4vw,3rem)]
              grid lg:grid-cols-[1.15fr_0.85fr] gap-12 items-end">

    <div class="pb-5">
      <span class="eyebrow-class-above">Anthropologist · Author</span>

      <h1 class="font-display font-semibold text-[clamp(3rem,9vw,8.5rem)]
                 leading-[0.92] tracking-[-0.035em] my-5"
          style='font-variation-settings: "opsz" 144, "SOFT" 0;'>
        Minakshi
        <em class="block not-italic text-accent font-medium"
            style='font-style: italic; font-variation-settings: "opsz" 144, "SOFT" 80, "WONK" 1;'>
          Dewan
        </em>
      </h1>

      <div class="flex flex-wrap gap-x-5 gap-y-2 pt-5 border-t border-rule-soft
                  font-mono text-[0.8125rem] uppercase tracking-[0.1em] text-ink-soft">
        <span>Author</span>
        <span>Researcher</span>
        <span>Consultant</span>
      </div>
    </div>

    <div class="relative aspect-[4/5] overflow-hidden bg-paper-deep border border-ink">
      <img src="..." class="w-full h-full object-cover object-top"
           style="filter: grayscale(15%) contrast(1.02);" alt="">
      <div class="absolute bottom-0 inset-x-0 px-4 py-2.5 bg-ink text-paper
                  font-mono text-[0.6875rem] uppercase tracking-[0.14em]">
        Minakshi Dewan, Delhi
      </div>
    </div>
  </div>
</section>
```

### Section header (two-column with hairline)

```html
<header class="grid md:grid-cols-[1fr_2fr] gap-8 pb-8 mb-12 border-b border-ink items-end">
  <div class="pb-1">
    <span class="eyebrow">Recent writing</span>
  </div>
  <h2>Essays, columns &amp; <em>investigations</em>.</h2>
</header>
```

### Buttons

```html
<!-- Primary (ink) -->
<button class="inline-flex items-center gap-2 font-body text-[0.9375rem] font-medium
               px-6 py-3.5 border border-ink bg-ink text-paper
               transition-all duration-200 ease-editorial
               hover:bg-accent hover:border-accent">
  Read the book
</button>

<!-- Ghost (outlined) -->
<button class="inline-flex items-center gap-2 font-body text-[0.9375rem] font-medium
               px-6 py-3.5 border border-ink bg-transparent text-ink
               transition-all duration-200 ease-editorial
               hover:bg-ink hover:text-paper">
  Download CV
</button>

<!-- Inline text link -->
<a class="text-accent border-b border-current hover:text-accent-deep transition-colors">
  read more
</a>
```

### Featured book (inverted ink panel)

```html
<section class="bg-ink text-paper py-20">
  <div class="max-w-shell mx-auto px-[clamp(1.25rem,4vw,3rem)]
              grid lg:grid-cols-[1fr_1.2fr] gap-12 items-center">

    <div class="aspect-[2/3] bg-paper-deep overflow-hidden
                shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6),0_0_0_1px_rgba(244,239,230,0.06)]
                transition-transform duration-500 ease-editorial hover:-translate-y-1.5">
      <img src="..." class="w-full h-full object-cover" alt="">
    </div>

    <div>
      <span class="font-mono text-xs uppercase tracking-[0.18em]
                   text-[color-mix(in_oklab,theme(colors.accent)_70%,theme(colors.paper)_30%)]">
        Featured book
      </span>
      <h2 class="text-paper my-5">
        The Final
        <em class="block not-italic"
            style='font-style: italic; color: color-mix(in oklab, #7a1f1f 70%, #f4efe6 30%);
                   font-variation-settings: "opsz" 144, "SOFT" 80, "WONK" 1;'>
          Farewell
        </em>
      </h2>
      <p class="font-display italic text-lg text-paper/80 mb-5">
        Death rituals across India's six faiths.
      </p>
      <p class="text-paper/80 text-[1.0625rem] leading-[1.72] max-w-[56ch]">…</p>
    </div>
  </div>
</section>
```

### Asymmetric work-list (ranked essays)

```html
<ul class="border-t border-ink">
  <li class="grid grid-cols-[5rem_1fr_14rem_8rem] gap-5 py-5 border-b border-rule-soft
             items-baseline cursor-pointer relative
             transition-[background,padding] duration-200 ease-editorial
             hover:bg-paper-deep hover:px-3.5">
    <span class="font-mono text-xs text-ink-soft tracking-[0.1em]">01</span>
    <span class="font-display text-2xl font-medium tracking-[-0.015em]">
      On <em class="text-accent italic">grief</em> and the bureaucracy of dying
    </span>
    <span class="font-mono text-[0.8125rem] text-ink-mid uppercase tracking-[0.08em]">
      The Caravan
    </span>
    <span class="font-mono text-[0.8125rem] text-ink-soft text-right">Mar 2024</span>
    <span class="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-4 opacity-0
                 text-accent text-xl transition-all duration-200 ease-editorial
                 group-hover:opacity-100 group-hover:translate-x-0">→</span>
  </li>
</ul>
```

### Book card (grid item)

```html
<article class="flex flex-col gap-5 p-5 bg-paper-soft border border-rule-soft
                transition-all duration-300 ease-editorial
                hover:bg-paper hover:border-ink hover:-translate-y-0.5">
  <div class="aspect-[2/3] bg-paper-deep overflow-hidden relative
              after:absolute after:inset-0
              after:shadow-[inset_6px_0_10px_-6px_rgba(0,0,0,0.3)] after:pointer-events-none">
    <img src="..." class="w-full h-full object-cover" alt="">
  </div>
  <span class="eyebrow">2023 · HarperCollins</span>
  <h3>The Final Farewell</h3>
  <p class="font-display italic text-ink-mid text-base mt-1">Death rituals across …</p>
  <div class="flex justify-between mt-auto pt-3.5 border-t border-rule-soft
              font-mono text-xs text-ink-soft uppercase tracking-[0.08em]">
    <span>368 pp</span><span>Hardcover</span>
  </div>
</article>
```

### Themed cards (1px-grid hairline grid)

```html
<div class="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-px bg-ink border border-ink">
  <div class="bg-paper p-8 px-5 flex flex-col gap-3.5 min-h-[320px]
              transition-colors hover:bg-paper-soft">
    <span class="font-mono text-xs tracking-[0.18em] text-accent">№ 01</span>
    <h3 class="text-3xl my-3.5">Death &amp; <em class="text-accent italic">ritual</em></h3>
    <p class="text-ink-mid text-[0.9375rem] leading-[1.6]">…</p>
    <span class="mt-auto font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-ink-soft">
      6 essays · 2 books
    </span>
  </div>
  <!-- repeat -->
</div>
```

### Pull quote (oversized italic with quote glyph)

```html
<section class="py-20 border-y border-ink bg-paper-soft">
  <div class="max-w-shell mx-auto px-[clamp(1.25rem,4vw,3rem)]">
    <blockquote class="relative font-display italic font-normal
                       text-[clamp(1.75rem,4.5vw,3.5rem)] leading-[1.18]
                       tracking-[-0.02em] max-w-[24ch] pl-8
                       before:content-['“'] before:absolute before:-left-2 before:-top-2
                       before:text-accent before:leading-none
                       before:text-[clamp(4rem,10vw,9rem)]"
                style='font-variation-settings: "opsz" 144, "SOFT" 80, "WONK" 1;'>
      Every ritual is a conversation between the living and the dead.
    </blockquote>
    <cite class="block not-italic mt-8 font-mono text-[0.8125rem]
                 tracking-[0.14em] uppercase text-ink-soft">
      — The Final Farewell, p. 14
    </cite>
  </div>
</section>
```

### Figures / stat strip

```html
<dl class="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] border-y border-ink">
  <div class="p-8 px-5 border-r border-rule-soft">
    <dt class="font-display font-medium text-[clamp(2.5rem,5vw,4rem)] leading-none
               tracking-[-0.03em]"
        style='font-variation-settings: "opsz" 144, "SOFT" 30;'>
      <em class="text-accent italic">12</em> yrs
    </dt>
    <dd class="font-mono text-xs tracking-[0.14em] uppercase text-ink-soft mt-3.5">
      Field research
    </dd>
  </div>
  <!-- repeat -->
</dl>
```

### Press marquee (inverted ink bar)

```html
<div class="border-y border-ink bg-ink text-paper overflow-hidden py-5">
  <div class="flex items-center gap-12 w-max animate-[marquee_38s_linear_infinite] whitespace-nowrap">
    <span class="font-display italic text-2xl after:content-['✦'] after:ml-12 after:text-accent after:not-italic">The Caravan</span>
    <span class="font-display italic text-2xl after:content-['✦'] after:ml-12 after:text-accent after:not-italic">Scroll.in</span>
    <!-- duplicate the list once for seamless loop -->
  </div>
</div>

<style>
  @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
</style>
```

### Date-block event card

```html
<article class="grid grid-cols-[6rem_1fr_12rem] gap-5 py-8 border-b border-rule-soft items-start">
  <div class="font-display text-center p-3.5 border border-ink">
    <div class="text-4xl font-semibold leading-none tracking-[-0.04em]">14</div>
    <span class="block font-mono text-xs tracking-[0.14em] uppercase text-accent mt-1.5">Mar</span>
    <span class="block font-mono text-[0.6875rem] tracking-[0.14em] text-ink-soft mt-1">2025</span>
  </div>
  <div>
    <h3 class="text-2xl mb-1">India International Centre</h3>
    <p class="font-mono text-[0.8125rem] text-ink-mid uppercase tracking-[0.06em]">New Delhi · 6:30 pm</p>
    <p class="text-ink-mid mt-3.5 text-[0.9375rem]">Panel on grief, ritual, and the state.</p>
  </div>
  <span class="justify-self-end font-mono text-[0.6875rem] tracking-[0.16em] uppercase
               text-accent border border-accent px-3 py-2 self-start">
    Keynote
  </span>
</article>
```

### Drop-cap prose

```html
<div class="prose-drop max-w-[64ch] mx-auto font-body text-[1.1875rem] leading-[1.7] text-ink-mid">
  <p class="first-letter:font-display first-letter:font-medium first-letter:text-accent
            first-letter:float-left first-letter:text-[5.5rem] first-letter:leading-[0.85]
            first-letter:mr-3 first-letter:mt-1"
     style="--variation: 'opsz' 144, 'SOFT' 30;">
    Death, in India, is never private. It belongs to the family, the street, the priest …
  </p>
</div>
```

### Book hero (offset oxblood shadow)

```html
<section class="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 py-20 border-b border-ink items-center">
  <div class="aspect-[2/3] bg-paper-deep overflow-hidden relative
              shadow-[30px_30px_0_-1px_#7a1f1f,30px_30px_0_0_#1a1814]">
    <img src="..." class="w-full h-full object-cover" alt="">
  </div>
  <div>
    <span class="eyebrow">2023 · HarperCollins India</span>
    <h1 class="my-5">The Final <em class="block text-accent italic">Farewell</em></h1>
    <p class="font-display italic text-2xl text-ink-mid mb-8 max-w-[32ch]">
      Death rituals across India's six faiths.
    </p>
    <dl class="grid grid-cols-3 gap-3 py-5 border-y border-ink mb-8">
      <div>
        <dt class="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-soft">Pages</dt>
        <dd class="font-display text-lg font-medium">368</dd>
      </div>
      <!-- format · isbn -->
    </dl>
  </div>
</section>
```

### Form field (underline-only, focus on accent)

```html
<label class="grid gap-2">
  <span class="font-mono text-xs uppercase tracking-[0.14em] text-ink-soft">Your name</span>
  <input type="text"
         class="font-body text-base py-3.5 bg-transparent border-0 border-b border-ink
                text-ink transition-colors focus:outline-none focus:border-b-accent">
</label>
```

### Footer (inverted ink with column grid)

```html
<footer class="bg-ink text-paper pt-20 pb-8 mt-20">
  <div class="max-w-shell mx-auto px-[clamp(1.25rem,4vw,3rem)]">
    <div class="grid md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-8 pb-12 border-b border-paper/20">
      <div>
        <h3 class="text-5xl mb-3.5">Minakshi <em class="block italic text-accent/80">Dewan</em></h3>
        <p class="text-paper/70 max-w-[32ch]">Anthropologist, author, …</p>
      </div>
      <div>
        <h4 class="font-mono text-xs tracking-[0.18em] uppercase text-accent/80 mb-5 font-medium">Read</h4>
        <ul class="flex flex-col gap-2.5">
          <li><a class="font-body text-[0.9375rem] text-paper/80 hover:text-paper transition-colors">Books</a></li>
        </ul>
      </div>
    </div>
    <div class="pt-5 flex justify-between flex-wrap gap-2 font-mono text-xs tracking-[0.1em] text-paper/50">
      <span>© 2025 Minakshi Dewan</span>
      <span>Delhi, India</span>
    </div>
  </div>
</footer>
```

---

## 6. Layout primitives

```html
<!-- Container -->
<div class="max-w-shell mx-auto px-[clamp(1.25rem,4vw,3rem)]">…</div>

<!-- Hairline rules -->
<hr class="border-0 border-t border-ink">          <!-- full strength -->
<hr class="border-0 border-t border-rule-soft">    <!-- secondary -->

<!-- Section vertical rhythm -->
<section class="py-20 md:py-24">…</section>        <!-- standard -->
<section class="py-12 md:py-16">…</section>        <!-- tight -->
```

### Spacing scale (matches CSS `--s-*`)

| Token | px      | Tailwind        |
| ----- | ------- | --------------- |
| s-1   | 8       | `gap-2`         |
| s-2   | 14      | `gap-3.5`       |
| s-3   | 20      | `gap-5`         |
| s-4   | 32      | `gap-8`         |
| s-5   | 52      | `gap-12`        |
| s-6   | 80      | `gap-20`        |
| s-7   | 128     | `gap-32`        |

---

## 7. Motion

One easing curve only: **`cubic-bezier(0.23, 1, 0.32, 1)`** → `ease-editorial`.

| Duration | Where                            |
| -------- | -------------------------------- |
| 150ms    | Color transitions, link hover    |
| 180ms    | Buttons                          |
| 200ms    | Nav underline, work-list reveal  |
| 240ms    | Cards (background + transform)   |
| 400ms    | Cover lift, image zoom           |
| 600ms    | Scroll-in `[data-animate]`       |

### Scroll-in animation pattern

```html
<div data-animate class="opacity-0 translate-y-5 transition-all duration-[600ms] ease-editorial
                         [&.in]:opacity-100 [&.in]:translate-y-0">…</div>

<script>
  const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && e.target.classList.add('in')), { threshold: 0.15 });
  document.querySelectorAll('[data-animate]').forEach(el => io.observe(el));
</script>
```

Respect `prefers-reduced-motion` — disable all `transition` and `animation` in that media query.

---

## 8. Anti-patterns (don't)

- ❌ Use Inter as a display face. Display is **always Fraunces**.
- ❌ Add a second accent color. Oxblood is the only accent.
- ❌ Use shadows on light surfaces. Hairline borders carry the structure.
- ❌ Use rounded corners. Everything is square or hairline-bordered.
- ❌ Use emoji as icons.
- ❌ Use gradients on backgrounds (the only exception is the subtle paper-noise radial gradient).
- ❌ Center body copy. Set ranged-left, max ~68ch.
- ❌ Use Fraunces without `opsz` / `SOFT` / `WONK` variation settings — it loses its personality.

---

## 9. Quick-start checklist

1. Add the Google Fonts `<link>` to `<head>`.
2. Drop the Tailwind config block from §3 into your project.
3. Paste §4 base layer into your global CSS.
4. Copy any component recipe from §5 — they're standalone Tailwind.
5. One oxblood accent per screen. One decisive flourish per page.
