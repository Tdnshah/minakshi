import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_navigation_group" AS ENUM('primary', 'myWorks', 'media');
  CREATE TABLE "pages_blocks_books_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Books' NOT NULL,
  	"description" varchar,
  	"max_items" numeric DEFAULT 0,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages" ADD COLUMN "show_in_navigation" boolean DEFAULT true;
  ALTER TABLE "pages" ADD COLUMN "navigation_label" varchar;
  ALTER TABLE "pages" ADD COLUMN "navigation_group" "enum_pages_navigation_group" DEFAULT 'primary';
  ALTER TABLE "pages" ADD COLUMN "navigation_order" numeric DEFAULT 100;
  ALTER TABLE "pages_blocks_books_grid" ADD CONSTRAINT "pages_blocks_books_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_books_grid_order_idx" ON "pages_blocks_books_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_books_grid_parent_id_idx" ON "pages_blocks_books_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_books_grid_path_idx" ON "pages_blocks_books_grid" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_books_grid" CASCADE;
  ALTER TABLE "pages" DROP COLUMN "show_in_navigation";
  ALTER TABLE "pages" DROP COLUMN "navigation_label";
  ALTER TABLE "pages" DROP COLUMN "navigation_group";
  ALTER TABLE "pages" DROP COLUMN "navigation_order";
  DROP TYPE "public"."enum_pages_navigation_group";`)
}
