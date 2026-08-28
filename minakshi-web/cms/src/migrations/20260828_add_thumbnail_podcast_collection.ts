import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "podcasts" ADD COLUMN "thumbnail_id" integer;
    ALTER TABLE "podcasts" ADD CONSTRAINT "podcasts_thumbnail_id_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "media"("id") ON DELETE set null;
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "podcasts" DROP CONSTRAINT "podcasts_thumbnail_id_media_id_fk";
    ALTER TABLE "podcasts" DROP COLUMN "thumbnail_id";
  `)
}
