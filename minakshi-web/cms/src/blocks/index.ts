/**
 * Block registry — single source of truth for which blocks the page builder offers.
 * Adding a new block: create cms/src/blocks/<Name>/config.ts, then export it here.
 *
 * `blocks`     — page builder blocks used by Pages collection.
 * `bookBlocks` — book-detail blocks used by Books collection's `blocks` field.
 */
import { Hero } from './Hero/config';
import { PressMarquee } from './PressMarquee/config';
import { FeaturedBook } from './FeaturedBook/config';
import { LatestArticles } from './LatestArticles/config';
import { Figures } from './Figures/config';
import { BooksGrid } from './BooksGrid/config';

import { BookThemes } from './BookThemes/config';
import { BookExcerpt } from './BookExcerpt/config';
import { BookBehindStats } from './BookBehindStats/config';
import { BookPullQuote } from './BookPullQuote/config';
import { BookAwardsBlock } from './BookAwards/config';
import { BookEventsBlock } from './BookEvents/config';
import { BookReviews } from './BookReviews/config';
import { BookMedia } from './BookMedia/config';
import { BookBuyBlock } from './BookBuy/config';

export const blocks = [Hero, PressMarquee, FeaturedBook, LatestArticles, Figures, BooksGrid];

export const bookBlocks = [
  BookThemes,
  BookExcerpt,
  BookBehindStats,
  BookPullQuote,
  BookAwardsBlock,
  BookEventsBlock,
  BookReviews,
  BookMedia,
  BookBuyBlock,
];

export {
  Hero, PressMarquee, FeaturedBook, LatestArticles, Figures, BooksGrid,
  BookThemes, BookExcerpt, BookBehindStats, BookPullQuote,
  BookAwardsBlock, BookEventsBlock, BookReviews, BookMedia, BookBuyBlock,
};
