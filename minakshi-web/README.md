# Minakshi Dewan - Academic Author Website

A modern, SEO-optimized website built with **Astro** and **Content Collections** for academic author Dr. Minakshi Dewan.

## 🚀 Features

- **10 Content Collections**: Articles, Books, Press, Podcasts, Research, Conferences, Films, Consulting, Blogs, and External links
- **Dynamic Routing**: SEO-friendly URLs for all content types
- **Modern Design**: Minimal, academic aesthetic with warm beige, charcoal, and muted teal palette
- **Responsive**: Mobile-first design with sticky CTAs
- **SEO Optimized**: Structured data (Schema.org) for all content types
- **Performance**: Fast, static-generated pages with Astro

## 📁 Project Structure

```
/
├── public/              # Static assets (images, fonts, etc.)
├── src/
│   ├── components/      # Reusable Astro components
│   │   ├── Hero.astro
│   │   ├── BookHero.astro
│   │   ├── BuyButton.astro
│   │   ├── MediaLogoWall.astro
│   │   ├── ReviewSlider.astro
│   │   ├── EventGallery.astro
│   │   ├── PodcastEmbed.astro
│   │   ├── TagFilter.astro
│   │   ├── ArticleList.astro
│   │   ├── PressGrid.astro
│   │   ├── ContactForm.astro
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   └── SEOSchema.astro
│   ├── content/         # Content Collections
│   │   ├── articles/
│   │   ├── books/
│   │   ├── press/
│   │   ├── podcasts/
│   │   ├── research/
│   │   ├── conferences/
│   │   ├── films/
│   │   ├── consulting/
│   │   ├── blogs/
│   │   ├── external/
│   │   └── config.ts    # Collection schemas
│   ├── layouts/         # Page layouts
│   │   ├── BaseLayout.astro
│   │   └── BookLayout.astro
│   ├── pages/           # Routes
│   │   ├── index.astro
│   │   ├── about.astro
│   │   ├── contact.astro
│   │   ├── consulting.astro
│   │   ├── articles/
│   │   ├── books/
│   │   ├── blog/
│   │   ├── conferences/
│   │   ├── media/
│   │   └── research/
│   ├── styles/
│   │   └── global.css   # Global styles and CSS variables
│   └── utils/
│       └── seo-schema.ts # SEO schema generators
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## 🧞 Commands

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `npm install`          | Install dependencies                             |
| `npm run dev`          | Start dev server at `localhost:4321`             |
| `npm run build`        | Build production site to `./dist/`               |
| `npm run preview`      | Preview production build locally                 |

## 📝 Adding Content

### Books

Create a new `.md` file in `src/content/books/`:

```markdown
---
title: "Book Title"
subtitle: "Book Subtitle"
description: "Book description"
coverImage: "/images/book-cover.jpg"
isbn: "978-XX-XXXX-XXX-X"
publisher: "Publisher Name"
releaseDate: 2024-01-01
buyLinks:
  - store: "Amazon"
    url: "https://amazon.com/..."
reviews:
  - quote: "Amazing book!"
    author: "Reviewer Name"
    source: "Publication"
---

# Book Content

Full book description and content here...
```

### Articles

Create a new `.md` file in `src/content/articles/`:

```markdown
---
title: "Article Title"
description: "Article description"
date: 2024-01-01
tags: ["Tag1", "Tag2"]
coverImage: "/images/article-cover.jpg"
---

# Article Content

Your article content here...
```

### Other Collections

See `src/content/config.ts` for schema definitions of all collections.

## 🎨 Design System

### Colors

- **Background Light**: `#F9F7F2` (Warm Beige)
- **Background Dark**: `#1A1A1A` (Charcoal)
- **Accent**: `#4A7C8C` (Muted Teal)

### Typography

- **Serif**: Merriweather (for reading content)
- **Sans-serif**: Inter (for UI elements)

## 🔍 SEO

The site includes structured data (Schema.org) for:

- Person (Author profile)
- Books
- Articles
- Events (Conferences)
- Podcasts

Use the `SEOSchema` component and utilities in `src/utils/seo-schema.ts`.

## 📄 License

All rights reserved © Minakshi Dewan

## 🤝 Contributing

This is a personal website. For inquiries, please use the contact form on the website.
