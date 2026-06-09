/**
 * Block registry — single source of truth for which blocks the page builder offers.
 * Adding a new block: create cms/src/blocks/<Name>/config.ts, then export it here.
 */
import { Hero } from './Hero/config';
import { PressMarquee } from './PressMarquee/config';
import { FeaturedBook } from './FeaturedBook/config';
import { LatestArticles } from './LatestArticles/config';
import { Figures } from './Figures/config';
import { BooksGrid } from './BooksGrid/config';

export const blocks = [Hero, PressMarquee, FeaturedBook, LatestArticles, Figures, BooksGrid];

export { Hero, PressMarquee, FeaturedBook, LatestArticles, Figures, BooksGrid };
