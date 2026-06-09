import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_latest_articles_variant" AS ENUM('featured', 'listing');
  ALTER TABLE "pages_blocks_latest_articles" ADD COLUMN "variant" "enum_pages_blocks_latest_articles_variant" DEFAULT 'featured' NOT NULL;
  ALTER TABLE "pages_blocks_latest_articles" ADD COLUMN "page_size" numeric DEFAULT 9;`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_latest_articles" DROP COLUMN "variant";
  ALTER TABLE "pages_blocks_latest_articles" DROP COLUMN "page_size";
  DROP TYPE "public"."enum_pages_blocks_latest_articles_variant";`)
}
