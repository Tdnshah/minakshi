import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Idempotent: safe to run whether dev-mode already pushed the schema or not.
  // Enum type — guarded with an exception block (PG has no CREATE TYPE IF NOT EXISTS).
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_books_blocks_book_awards_items_status" AS ENUM('winner', 'shortlisted', 'longlisted', 'nominated');
    EXCEPTION WHEN duplicate_object THEN null;
    END $$;
  `);

  // Tables — all use IF NOT EXISTS.
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "books_blocks_book_themes_items" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "number" varchar NOT NULL,
      "title" varchar NOT NULL,
      "accent_word" varchar NOT NULL,
      "description" varchar NOT NULL,
      "tag" varchar NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "books_blocks_book_themes" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "eyebrow" varchar DEFAULT 'What the book covers',
      "heading" varchar DEFAULT 'Six threads, one',
      "heading_italic" varchar DEFAULT 'shroud.',
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "books_blocks_book_excerpt_paragraphs" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "text" varchar NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "books_blocks_book_excerpt" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "eyebrow" varchar DEFAULT 'An excerpt',
      "title" varchar NOT NULL,
      "cite" varchar,
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "books_blocks_book_behind_stats_stats" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "value" varchar NOT NULL,
      "label" varchar NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "books_blocks_book_behind_stats" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "eyebrow" varchar DEFAULT 'How it was made',
      "heading" varchar DEFAULT 'Behind the',
      "heading_italic" varchar DEFAULT 'book.',
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "books_blocks_book_pull_quote" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "quote" varchar NOT NULL,
      "cite" varchar,
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "books_blocks_book_awards_items" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "title" varchar NOT NULL,
      "organization" varchar NOT NULL,
      "year" numeric,
      "status" "enum_books_blocks_book_awards_items_status" DEFAULT 'shortlisted',
      "url" varchar
    );

    CREATE TABLE IF NOT EXISTS "books_blocks_book_awards" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "eyebrow" varchar DEFAULT 'Recognition',
      "heading" varchar DEFAULT 'Awards &',
      "heading_italic" varchar DEFAULT 'longlists.',
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "books_blocks_book_events_events" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "name" varchar NOT NULL,
      "date" timestamp(3) with time zone NOT NULL,
      "venue" varchar,
      "city" varchar,
      "description" varchar,
      "url" varchar,
      "role" varchar
    );

    CREATE TABLE IF NOT EXISTS "books_blocks_book_events" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "eyebrow" varchar DEFAULT 'Coming up',
      "heading" varchar DEFAULT 'The book on',
      "heading_italic" varchar DEFAULT 'tour.',
      "all_events_href" varchar DEFAULT '/events',
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "books_blocks_book_reviews_reviews" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "quote" varchar NOT NULL,
      "author" varchar NOT NULL,
      "reviewer" varchar,
      "source" varchar
    );

    CREATE TABLE IF NOT EXISTS "books_blocks_book_reviews" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "eyebrow" varchar DEFAULT 'Press & reviews',
      "heading" varchar DEFAULT 'What others have',
      "heading_italic" varchar DEFAULT 'said.',
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "books_blocks_book_media_items" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "title" varchar NOT NULL,
      "reviewer" varchar NOT NULL,
      "url" varchar NOT NULL,
      "type" varchar,
      "date" timestamp(3) with time zone NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "books_blocks_book_media" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "eyebrow" varchar DEFAULT 'As seen in',
      "heading" varchar DEFAULT 'Coverage &',
      "heading_italic" varchar DEFAULT 'interviews.',
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "books_blocks_book_buy_links" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "store" varchar NOT NULL,
      "url" varchar NOT NULL,
      "price" varchar
    );

    CREATE TABLE IF NOT EXISTS "books_blocks_book_buy" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "eyebrow" varchar DEFAULT 'Get the book',
      "heading" varchar DEFAULT 'Where to',
      "heading_italic" varchar DEFAULT 'buy.',
      "block_name" varchar
    );
  `);

  // Foreign key constraints — guarded so re-runs don't fail.
  await db.execute(sql`
    DO $$ BEGIN ALTER TABLE "books_blocks_book_themes_items" ADD CONSTRAINT "books_blocks_book_themes_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."books_blocks_book_themes"("id") ON DELETE cascade ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN ALTER TABLE "books_blocks_book_themes" ADD CONSTRAINT "books_blocks_book_themes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."books"("id") ON DELETE cascade ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN ALTER TABLE "books_blocks_book_excerpt_paragraphs" ADD CONSTRAINT "books_blocks_book_excerpt_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."books_blocks_book_excerpt"("id") ON DELETE cascade ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN ALTER TABLE "books_blocks_book_excerpt" ADD CONSTRAINT "books_blocks_book_excerpt_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."books"("id") ON DELETE cascade ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN ALTER TABLE "books_blocks_book_behind_stats_stats" ADD CONSTRAINT "books_blocks_book_behind_stats_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."books_blocks_book_behind_stats"("id") ON DELETE cascade ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN ALTER TABLE "books_blocks_book_behind_stats" ADD CONSTRAINT "books_blocks_book_behind_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."books"("id") ON DELETE cascade ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN ALTER TABLE "books_blocks_book_pull_quote" ADD CONSTRAINT "books_blocks_book_pull_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."books"("id") ON DELETE cascade ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN ALTER TABLE "books_blocks_book_awards_items" ADD CONSTRAINT "books_blocks_book_awards_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."books_blocks_book_awards"("id") ON DELETE cascade ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN ALTER TABLE "books_blocks_book_awards" ADD CONSTRAINT "books_blocks_book_awards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."books"("id") ON DELETE cascade ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN ALTER TABLE "books_blocks_book_events_events" ADD CONSTRAINT "books_blocks_book_events_events_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."books_blocks_book_events"("id") ON DELETE cascade ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN ALTER TABLE "books_blocks_book_events" ADD CONSTRAINT "books_blocks_book_events_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."books"("id") ON DELETE cascade ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN ALTER TABLE "books_blocks_book_reviews_reviews" ADD CONSTRAINT "books_blocks_book_reviews_reviews_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."books_blocks_book_reviews"("id") ON DELETE cascade ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN ALTER TABLE "books_blocks_book_reviews" ADD CONSTRAINT "books_blocks_book_reviews_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."books"("id") ON DELETE cascade ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN ALTER TABLE "books_blocks_book_media_items" ADD CONSTRAINT "books_blocks_book_media_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."books_blocks_book_media"("id") ON DELETE cascade ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN ALTER TABLE "books_blocks_book_media" ADD CONSTRAINT "books_blocks_book_media_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."books"("id") ON DELETE cascade ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN ALTER TABLE "books_blocks_book_buy_links" ADD CONSTRAINT "books_blocks_book_buy_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."books_blocks_book_buy"("id") ON DELETE cascade ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN ALTER TABLE "books_blocks_book_buy" ADD CONSTRAINT "books_blocks_book_buy_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."books"("id") ON DELETE cascade ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN null; END $$;
  `);

  // Indexes — IF NOT EXISTS prevents duplicates.
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "books_blocks_book_themes_items_order_idx" ON "books_blocks_book_themes_items" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "books_blocks_book_themes_items_parent_id_idx" ON "books_blocks_book_themes_items" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "books_blocks_book_themes_order_idx" ON "books_blocks_book_themes" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "books_blocks_book_themes_parent_id_idx" ON "books_blocks_book_themes" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "books_blocks_book_themes_path_idx" ON "books_blocks_book_themes" USING btree ("_path");
    CREATE INDEX IF NOT EXISTS "books_blocks_book_excerpt_paragraphs_order_idx" ON "books_blocks_book_excerpt_paragraphs" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "books_blocks_book_excerpt_paragraphs_parent_id_idx" ON "books_blocks_book_excerpt_paragraphs" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "books_blocks_book_excerpt_order_idx" ON "books_blocks_book_excerpt" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "books_blocks_book_excerpt_parent_id_idx" ON "books_blocks_book_excerpt" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "books_blocks_book_excerpt_path_idx" ON "books_blocks_book_excerpt" USING btree ("_path");
    CREATE INDEX IF NOT EXISTS "books_blocks_book_behind_stats_stats_order_idx" ON "books_blocks_book_behind_stats_stats" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "books_blocks_book_behind_stats_stats_parent_id_idx" ON "books_blocks_book_behind_stats_stats" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "books_blocks_book_behind_stats_order_idx" ON "books_blocks_book_behind_stats" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "books_blocks_book_behind_stats_parent_id_idx" ON "books_blocks_book_behind_stats" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "books_blocks_book_behind_stats_path_idx" ON "books_blocks_book_behind_stats" USING btree ("_path");
    CREATE INDEX IF NOT EXISTS "books_blocks_book_pull_quote_order_idx" ON "books_blocks_book_pull_quote" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "books_blocks_book_pull_quote_parent_id_idx" ON "books_blocks_book_pull_quote" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "books_blocks_book_pull_quote_path_idx" ON "books_blocks_book_pull_quote" USING btree ("_path");
    CREATE INDEX IF NOT EXISTS "books_blocks_book_awards_items_order_idx" ON "books_blocks_book_awards_items" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "books_blocks_book_awards_items_parent_id_idx" ON "books_blocks_book_awards_items" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "books_blocks_book_awards_order_idx" ON "books_blocks_book_awards" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "books_blocks_book_awards_parent_id_idx" ON "books_blocks_book_awards" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "books_blocks_book_awards_path_idx" ON "books_blocks_book_awards" USING btree ("_path");
    CREATE INDEX IF NOT EXISTS "books_blocks_book_events_events_order_idx" ON "books_blocks_book_events_events" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "books_blocks_book_events_events_parent_id_idx" ON "books_blocks_book_events_events" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "books_blocks_book_events_order_idx" ON "books_blocks_book_events" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "books_blocks_book_events_parent_id_idx" ON "books_blocks_book_events" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "books_blocks_book_events_path_idx" ON "books_blocks_book_events" USING btree ("_path");
    CREATE INDEX IF NOT EXISTS "books_blocks_book_reviews_reviews_order_idx" ON "books_blocks_book_reviews_reviews" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "books_blocks_book_reviews_reviews_parent_id_idx" ON "books_blocks_book_reviews_reviews" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "books_blocks_book_reviews_order_idx" ON "books_blocks_book_reviews" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "books_blocks_book_reviews_parent_id_idx" ON "books_blocks_book_reviews" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "books_blocks_book_reviews_path_idx" ON "books_blocks_book_reviews" USING btree ("_path");
    CREATE INDEX IF NOT EXISTS "books_blocks_book_media_items_order_idx" ON "books_blocks_book_media_items" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "books_blocks_book_media_items_parent_id_idx" ON "books_blocks_book_media_items" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "books_blocks_book_media_order_idx" ON "books_blocks_book_media" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "books_blocks_book_media_parent_id_idx" ON "books_blocks_book_media" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "books_blocks_book_media_path_idx" ON "books_blocks_book_media" USING btree ("_path");
    CREATE INDEX IF NOT EXISTS "books_blocks_book_buy_links_order_idx" ON "books_blocks_book_buy_links" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "books_blocks_book_buy_links_parent_id_idx" ON "books_blocks_book_buy_links" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "books_blocks_book_buy_order_idx" ON "books_blocks_book_buy" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "books_blocks_book_buy_parent_id_idx" ON "books_blocks_book_buy" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "books_blocks_book_buy_path_idx" ON "books_blocks_book_buy" USING btree ("_path");
  `);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "books_blocks_book_themes_items" CASCADE;
  DROP TABLE "books_blocks_book_themes" CASCADE;
  DROP TABLE "books_blocks_book_excerpt_paragraphs" CASCADE;
  DROP TABLE "books_blocks_book_excerpt" CASCADE;
  DROP TABLE "books_blocks_book_behind_stats_stats" CASCADE;
  DROP TABLE "books_blocks_book_behind_stats" CASCADE;
  DROP TABLE "books_blocks_book_pull_quote" CASCADE;
  DROP TABLE "books_blocks_book_awards_items" CASCADE;
  DROP TABLE "books_blocks_book_awards" CASCADE;
  DROP TABLE "books_blocks_book_events_events" CASCADE;
  DROP TABLE "books_blocks_book_events" CASCADE;
  DROP TABLE "books_blocks_book_reviews_reviews" CASCADE;
  DROP TABLE "books_blocks_book_reviews" CASCADE;
  DROP TABLE "books_blocks_book_media_items" CASCADE;
  DROP TABLE "books_blocks_book_media" CASCADE;
  DROP TABLE "books_blocks_book_buy_links" CASCADE;
  DROP TABLE "books_blocks_book_buy" CASCADE;
  DROP TYPE "public"."enum_books_blocks_book_awards_items_status";`)
}
