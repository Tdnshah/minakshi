import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "books_book_kits" CASCADE;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "books_book_kits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  ALTER TABLE "books_book_kits" ADD CONSTRAINT "books_book_kits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."books"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "books_book_kits_order_idx" ON "books_book_kits" USING btree ("_order");
  CREATE INDEX "books_book_kits_parent_id_idx" ON "books_book_kits" USING btree ("_parent_id");`)
}
