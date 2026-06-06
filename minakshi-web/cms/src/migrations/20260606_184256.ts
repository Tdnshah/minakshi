import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_hero_actions_variant" AS ENUM('primary', 'ghost');
  CREATE TABLE "pages_blocks_hero_roles" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_hero_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL,
  	"variant" "enum_pages_blocks_hero_actions_variant" DEFAULT 'primary'
  );
  
  CREATE TABLE "pages_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar NOT NULL,
  	"first_name" varchar NOT NULL,
  	"last_name" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"portrait_image_id" integer NOT NULL,
  	"portrait_caption" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_press_marquee_publications" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_press_marquee" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_featured_book" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"book_id" integer NOT NULL,
  	"eyebrow" varchar DEFAULT 'The Latest · Non-fiction',
  	"primary_action_label" varchar DEFAULT 'Read more →',
  	"secondary_action_label" varchar DEFAULT 'All books',
  	"secondary_action_href" varchar DEFAULT '/books',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_latest_articles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Latest' NOT NULL,
  	"view_all_label" varchar DEFAULT 'View all →',
  	"view_all_href" varchar DEFAULT '/articles',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_figures_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_figures" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"articles_id" integer
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "pages_id" integer;
  ALTER TABLE "pages_blocks_hero_roles" ADD CONSTRAINT "pages_blocks_hero_roles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_actions" ADD CONSTRAINT "pages_blocks_hero_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_portrait_image_id_media_id_fk" FOREIGN KEY ("portrait_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_press_marquee_publications" ADD CONSTRAINT "pages_blocks_press_marquee_publications_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_press_marquee"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_press_marquee" ADD CONSTRAINT "pages_blocks_press_marquee_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_featured_book" ADD CONSTRAINT "pages_blocks_featured_book_book_id_books_id_fk" FOREIGN KEY ("book_id") REFERENCES "public"."books"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_featured_book" ADD CONSTRAINT "pages_blocks_featured_book_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_latest_articles" ADD CONSTRAINT "pages_blocks_latest_articles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_figures_items" ADD CONSTRAINT "pages_blocks_figures_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_figures"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_figures" ADD CONSTRAINT "pages_blocks_figures_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_meta_og_image_id_media_id_fk" FOREIGN KEY ("meta_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_hero_roles_order_idx" ON "pages_blocks_hero_roles" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_roles_parent_id_idx" ON "pages_blocks_hero_roles" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_actions_order_idx" ON "pages_blocks_hero_actions" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_actions_parent_id_idx" ON "pages_blocks_hero_actions" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_order_idx" ON "pages_blocks_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_parent_id_idx" ON "pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_path_idx" ON "pages_blocks_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_portrait_image_idx" ON "pages_blocks_hero" USING btree ("portrait_image_id");
  CREATE INDEX "pages_blocks_press_marquee_publications_order_idx" ON "pages_blocks_press_marquee_publications" USING btree ("_order");
  CREATE INDEX "pages_blocks_press_marquee_publications_parent_id_idx" ON "pages_blocks_press_marquee_publications" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_press_marquee_order_idx" ON "pages_blocks_press_marquee" USING btree ("_order");
  CREATE INDEX "pages_blocks_press_marquee_parent_id_idx" ON "pages_blocks_press_marquee" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_press_marquee_path_idx" ON "pages_blocks_press_marquee" USING btree ("_path");
  CREATE INDEX "pages_blocks_featured_book_order_idx" ON "pages_blocks_featured_book" USING btree ("_order");
  CREATE INDEX "pages_blocks_featured_book_parent_id_idx" ON "pages_blocks_featured_book" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_featured_book_path_idx" ON "pages_blocks_featured_book" USING btree ("_path");
  CREATE INDEX "pages_blocks_featured_book_book_idx" ON "pages_blocks_featured_book" USING btree ("book_id");
  CREATE INDEX "pages_blocks_latest_articles_order_idx" ON "pages_blocks_latest_articles" USING btree ("_order");
  CREATE INDEX "pages_blocks_latest_articles_parent_id_idx" ON "pages_blocks_latest_articles" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_latest_articles_path_idx" ON "pages_blocks_latest_articles" USING btree ("_path");
  CREATE INDEX "pages_blocks_figures_items_order_idx" ON "pages_blocks_figures_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_figures_items_parent_id_idx" ON "pages_blocks_figures_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_figures_order_idx" ON "pages_blocks_figures" USING btree ("_order");
  CREATE INDEX "pages_blocks_figures_parent_id_idx" ON "pages_blocks_figures" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_figures_path_idx" ON "pages_blocks_figures" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_meta_meta_og_image_idx" ON "pages" USING btree ("meta_og_image_id");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_articles_id_idx" ON "pages_rels" USING btree ("articles_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_hero_roles" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_hero_actions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_press_marquee_publications" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_press_marquee" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_featured_book" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_latest_articles" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_figures_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_figures" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_hero_roles" CASCADE;
  DROP TABLE "pages_blocks_hero_actions" CASCADE;
  DROP TABLE "pages_blocks_hero" CASCADE;
  DROP TABLE "pages_blocks_press_marquee_publications" CASCADE;
  DROP TABLE "pages_blocks_press_marquee" CASCADE;
  DROP TABLE "pages_blocks_featured_book" CASCADE;
  DROP TABLE "pages_blocks_latest_articles" CASCADE;
  DROP TABLE "pages_blocks_figures_items" CASCADE;
  DROP TABLE "pages_blocks_figures" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_pages_fk";
  
  DROP INDEX "payload_locked_documents_rels_pages_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "pages_id";
  DROP TYPE "public"."enum_pages_blocks_hero_actions_variant";`)
}
