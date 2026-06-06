import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DO $$ BEGIN
  CREATE TYPE "public"."enum_books_awards_status" AS ENUM('winner', 'shortlisted', 'longlisted', 'nominated');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  CREATE TYPE "public"."enum_press_type" AS ENUM('Interview', 'Review', 'Excerpt', 'Podcast');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
  CREATE TABLE IF NOT EXISTS "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"enable_a_p_i_key" boolean,
  	"api_key" varchar,
  	"api_key_index" varchar,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE IF NOT EXISTS "articles_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "articles" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"platform" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"date" timestamp(3) with time zone NOT NULL,
  	"excerpt" varchar NOT NULL,
  	"image" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "podcasts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"platform" varchar NOT NULL,
  	"published_at" timestamp(3) with time zone NOT NULL,
  	"description" varchar,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "books_buy_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"store" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "books_awards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"organization" varchar NOT NULL,
  	"year" numeric,
  	"status" "enum_books_awards_status" DEFAULT 'shortlisted',
  	"url" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "books_reviews" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar NOT NULL,
  	"author" varchar NOT NULL,
  	"source" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "books_media_coverage" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"reviewer" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"type" varchar,
  	"date" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "books_book_events" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"date" timestamp(3) with time zone NOT NULL,
  	"venue" varchar,
  	"city" varchar,
  	"description" varchar,
  	"url" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "books_event_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "books_book_kits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "books" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"subtitle" varchar,
  	"excerpt" varchar,
  	"description" jsonb NOT NULL,
  	"cover_image_id" integer NOT NULL,
  	"isbn" varchar,
  	"publisher" varchar NOT NULL,
  	"release_date" timestamp(3) with time zone NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "press" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"type" "enum_press_type" NOT NULL,
  	"outlet" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"date" timestamp(3) with time zone NOT NULL,
  	"thumbnail_id" integer,
  	"embed_code" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "research" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"category" varchar NOT NULL,
  	"abstract" jsonb NOT NULL,
  	"publication" varchar NOT NULL,
  	"year" numeric NOT NULL,
  	"url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "conferences_media_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "conferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"institution" varchar NOT NULL,
  	"abstract" varchar NOT NULL,
  	"year" numeric NOT NULL,
  	"location" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "films" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"collaborator" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"expected_release" varchar,
  	"notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "consulting_domain" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"domain_name" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "consulting" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"organisation" varchar NOT NULL,
  	"year" varchar,
  	"description" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"articles_id" integer,
  	"podcasts_id" integer,
  	"books_id" integer,
  	"press_id" integer,
  	"research_id" integer,
  	"conferences_id" integer,
  	"films_id" integer,
  	"consulting_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_tags" ADD CONSTRAINT "articles_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "books_buy_links" ADD CONSTRAINT "books_buy_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."books"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "books_awards" ADD CONSTRAINT "books_awards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."books"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "books_reviews" ADD CONSTRAINT "books_reviews_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."books"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "books_media_coverage" ADD CONSTRAINT "books_media_coverage_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."books"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "books_book_events" ADD CONSTRAINT "books_book_events_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."books"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "books_event_gallery" ADD CONSTRAINT "books_event_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "books_event_gallery" ADD CONSTRAINT "books_event_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."books"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "books_book_kits" ADD CONSTRAINT "books_book_kits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."books"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "books" ADD CONSTRAINT "books_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "press" ADD CONSTRAINT "press_thumbnail_id_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "conferences_media_links" ADD CONSTRAINT "conferences_media_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."conferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "consulting_domain" ADD CONSTRAINT "consulting_domain_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."consulting"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_podcasts_fk" FOREIGN KEY ("podcasts_id") REFERENCES "public"."podcasts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_books_fk" FOREIGN KEY ("books_id") REFERENCES "public"."books"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_press_fk" FOREIGN KEY ("press_id") REFERENCES "public"."press"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_research_fk" FOREIGN KEY ("research_id") REFERENCES "public"."research"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_conferences_fk" FOREIGN KEY ("conferences_id") REFERENCES "public"."conferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_films_fk" FOREIGN KEY ("films_id") REFERENCES "public"."films"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_consulting_fk" FOREIGN KEY ("consulting_id") REFERENCES "public"."consulting"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX IF NOT EXISTS "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX IF NOT EXISTS "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX IF NOT EXISTS "articles_tags_order_idx" ON "articles_tags" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "articles_tags_parent_id_idx" ON "articles_tags" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "articles_updated_at_idx" ON "articles" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "articles_created_at_idx" ON "articles" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "podcasts_updated_at_idx" ON "podcasts" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "podcasts_created_at_idx" ON "podcasts" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "books_buy_links_order_idx" ON "books_buy_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "books_buy_links_parent_id_idx" ON "books_buy_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "books_awards_order_idx" ON "books_awards" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "books_awards_parent_id_idx" ON "books_awards" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "books_reviews_order_idx" ON "books_reviews" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "books_reviews_parent_id_idx" ON "books_reviews" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "books_media_coverage_order_idx" ON "books_media_coverage" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "books_media_coverage_parent_id_idx" ON "books_media_coverage" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "books_book_events_order_idx" ON "books_book_events" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "books_book_events_parent_id_idx" ON "books_book_events" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "books_event_gallery_order_idx" ON "books_event_gallery" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "books_event_gallery_parent_id_idx" ON "books_event_gallery" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "books_event_gallery_image_idx" ON "books_event_gallery" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "books_book_kits_order_idx" ON "books_book_kits" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "books_book_kits_parent_id_idx" ON "books_book_kits" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "books_cover_image_idx" ON "books" USING btree ("cover_image_id");
  CREATE INDEX IF NOT EXISTS "books_updated_at_idx" ON "books" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "books_created_at_idx" ON "books" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "press_thumbnail_idx" ON "press" USING btree ("thumbnail_id");
  CREATE INDEX IF NOT EXISTS "press_updated_at_idx" ON "press" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "press_created_at_idx" ON "press" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "research_updated_at_idx" ON "research" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "research_created_at_idx" ON "research" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "conferences_media_links_order_idx" ON "conferences_media_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "conferences_media_links_parent_id_idx" ON "conferences_media_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "conferences_updated_at_idx" ON "conferences" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "conferences_created_at_idx" ON "conferences" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "films_updated_at_idx" ON "films" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "films_created_at_idx" ON "films" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "consulting_domain_order_idx" ON "consulting_domain" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "consulting_domain_parent_id_idx" ON "consulting_domain" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "consulting_updated_at_idx" ON "consulting" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "consulting_created_at_idx" ON "consulting" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_articles_id_idx" ON "payload_locked_documents_rels" USING btree ("articles_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_podcasts_id_idx" ON "payload_locked_documents_rels" USING btree ("podcasts_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_books_id_idx" ON "payload_locked_documents_rels" USING btree ("books_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_press_id_idx" ON "payload_locked_documents_rels" USING btree ("press_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_research_id_idx" ON "payload_locked_documents_rels" USING btree ("research_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_conferences_id_idx" ON "payload_locked_documents_rels" USING btree ("conferences_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_films_id_idx" ON "payload_locked_documents_rels" USING btree ("films_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_consulting_id_idx" ON "payload_locked_documents_rels" USING btree ("consulting_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX IF NOT EXISTS "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "articles_tags" CASCADE;
  DROP TABLE "articles" CASCADE;
  DROP TABLE "podcasts" CASCADE;
  DROP TABLE "books_buy_links" CASCADE;
  DROP TABLE "books_awards" CASCADE;
  DROP TABLE "books_reviews" CASCADE;
  DROP TABLE "books_media_coverage" CASCADE;
  DROP TABLE "books_book_events" CASCADE;
  DROP TABLE "books_event_gallery" CASCADE;
  DROP TABLE "books_book_kits" CASCADE;
  DROP TABLE "books" CASCADE;
  DROP TABLE "press" CASCADE;
  DROP TABLE "research" CASCADE;
  DROP TABLE "conferences_media_links" CASCADE;
  DROP TABLE "conferences" CASCADE;
  DROP TABLE "films" CASCADE;
  DROP TABLE "consulting_domain" CASCADE;
  DROP TABLE "consulting" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TYPE "public"."enum_books_awards_status";
  DROP TYPE "public"."enum_press_type";`)
}
