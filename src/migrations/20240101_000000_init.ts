import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Categories and Tags
  await db.run(sql`
    CREATE TABLE IF NOT EXISTS "blog_categories" (
      "id" INTEGER PRIMARY KEY AUTOINCREMENT,
      "name_zh" TEXT NOT NULL,
      "name_en" TEXT,
      "slug" TEXT NOT NULL UNIQUE,
      "updated_at" TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
      "created_at" TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
    )
  `)

  await db.run(sql`CREATE INDEX IF NOT EXISTS "blog_categories_slug_idx" ON "blog_categories"("slug")`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS "blog_categories_updated_at_idx" ON "blog_categories"("updated_at")`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS "blog_categories_created_at_idx" ON "blog_categories"("created_at")`)

  await db.run(sql`
    CREATE TABLE IF NOT EXISTS "blog_tags" (
      "id" INTEGER PRIMARY KEY AUTOINCREMENT,
      "name_zh" TEXT NOT NULL,
      "name_en" TEXT,
      "slug" TEXT NOT NULL UNIQUE,
      "updated_at" TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
      "created_at" TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
    )
  `)

  await db.run(sql`CREATE INDEX IF NOT EXISTS "blog_tags_slug_idx" ON "blog_tags"("slug")`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS "blog_tags_updated_at_idx" ON "blog_tags"("updated_at")`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS "blog_tags_created_at_idx" ON "blog_tags"("created_at")`)

  await db.run(sql`
    CREATE TABLE IF NOT EXISTS "dev_categories" (
      "id" INTEGER PRIMARY KEY AUTOINCREMENT,
      "name_zh" TEXT NOT NULL,
      "name_en" TEXT,
      "slug" TEXT NOT NULL UNIQUE,
      "updated_at" TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
      "created_at" TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
    )
  `)

  await db.run(sql`CREATE INDEX IF NOT EXISTS "dev_categories_slug_idx" ON "dev_categories"("slug")`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS "dev_categories_updated_at_idx" ON "dev_categories"("updated_at")`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS "dev_categories_created_at_idx" ON "dev_categories"("created_at")`)

  await db.run(sql`
    CREATE TABLE IF NOT EXISTS "dev_tags" (
      "id" INTEGER PRIMARY KEY AUTOINCREMENT,
      "name_zh" TEXT NOT NULL,
      "name_en" TEXT,
      "slug" TEXT NOT NULL UNIQUE,
      "updated_at" TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
      "created_at" TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
    )
  `)

  await db.run(sql`CREATE INDEX IF NOT EXISTS "dev_tags_slug_idx" ON "dev_tags"("slug")`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS "dev_tags_updated_at_idx" ON "dev_tags"("updated_at")`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS "dev_tags_created_at_idx" ON "dev_tags"("created_at")`)

  // Blog Collection
  await db.run(sql`
    CREATE TABLE IF NOT EXISTS "blog" (
      "id" TEXT PRIMARY KEY,
      "status" TEXT DEFAULT 'draft',
      "author_id" INTEGER,
      "locked" INTEGER DEFAULT 0,
      "thumbnail_id" INTEGER,
      "title_zh" TEXT,
      "title_en" TEXT,
      "excerpt_zh" TEXT,
      "excerpt_en" TEXT,
      "cover_image_id" INTEGER,
      "content_zh" TEXT,
      "content_en" TEXT,
      "metatitle_zh" TEXT,
      "metatitle_en" TEXT,
      "metadescription_zh" TEXT,
      "metadescription_en" TEXT,
      "updated_at" TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
      "created_at" TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
      "_status" TEXT DEFAULT 'draft',
      FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE SET NULL,
      FOREIGN KEY ("thumbnail_id") REFERENCES "media"("id") ON DELETE SET NULL,
      FOREIGN KEY ("cover_image_id") REFERENCES "media"("id") ON DELETE SET NULL
    )
  `)

  await db.run(sql`CREATE INDEX IF NOT EXISTS "blog_author_idx" ON "blog"("author_id")`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS "blog_thumbnail_idx" ON "blog"("thumbnail_id")`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS "blog_cover_image_idx" ON "blog"("cover_image_id")`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS "blog_status_idx" ON "blog"("status")`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS "blog_locked_idx" ON "blog"("locked")`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS "blog__status_idx" ON "blog"("_status")`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS "blog_updated_at_idx" ON "blog"("updated_at")`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS "blog_created_at_idx" ON "blog"("created_at")`)

  // Blog Relations
  await db.run(sql`
    CREATE TABLE IF NOT EXISTS "blog_rels" (
      "id" INTEGER PRIMARY KEY AUTOINCREMENT,
      "order" INTEGER,
      "parent_id" TEXT NOT NULL,
      "path" TEXT NOT NULL,
      "blog_categories_id" INTEGER,
      "blog_tags_id" INTEGER,
      FOREIGN KEY ("parent_id") REFERENCES "blog"("id") ON DELETE CASCADE,
      FOREIGN KEY ("blog_categories_id") REFERENCES "blog_categories"("id") ON DELETE CASCADE,
      FOREIGN KEY ("blog_tags_id") REFERENCES "blog_tags"("id") ON DELETE CASCADE
    )
  `)

  await db.run(sql`CREATE INDEX IF NOT EXISTS "blog_rels_order_idx" ON "blog_rels"("order")`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS "blog_rels_parent_idx" ON "blog_rels"("parent_id")`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS "blog_rels_path_idx" ON "blog_rels"("path")`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS "blog_rels_blog_categories_id_idx" ON "blog_rels"("blog_categories_id")`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS "blog_rels_blog_tags_id_idx" ON "blog_rels"("blog_tags_id")`)

  // Artwork Collection
  await db.run(sql`
    CREATE TABLE IF NOT EXISTS "artwork" (
      "id" INTEGER PRIMARY KEY AUTOINCREMENT,
      "slug" TEXT NOT NULL UNIQUE,
      "status" TEXT DEFAULT 'draft',
      "year" INTEGER,
      "author_zh" TEXT,
      "author_en" TEXT,
      "description_zh" TEXT,
      "description_en" TEXT,
      "thumbnail_id" INTEGER,
      "banner_image_id" INTEGER,
      "video_url" TEXT,
      "collaboration_type" TEXT DEFAULT 'individual',
      "content_zh" TEXT,
      "content_en" TEXT,
      "updated_at" TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
      "created_at" TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
      "_status" TEXT DEFAULT 'draft',
      FOREIGN KEY ("thumbnail_id") REFERENCES "media"("id") ON DELETE SET NULL,
      FOREIGN KEY ("banner_image_id") REFERENCES "media"("id") ON DELETE SET NULL
    )
  `)

  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS "artwork_slug_idx" ON "artwork"("slug")`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS "artwork_thumbnail_idx" ON "artwork"("thumbnail_id")`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS "artwork_banner_image_idx" ON "artwork"("banner_image_id")`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS "artwork__status_idx" ON "artwork"("_status")`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS "artwork_updated_at_idx" ON "artwork"("updated_at")`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS "artwork_created_at_idx" ON "artwork"("created_at")`)

  // Artwork Medium (array field)
  await db.run(sql`
    CREATE TABLE IF NOT EXISTS "artwork_medium" (
      "id" INTEGER PRIMARY KEY AUTOINCREMENT,
      "order" INTEGER NOT NULL,
      "parent_id" INTEGER NOT NULL,
      "value" TEXT,
      FOREIGN KEY ("parent_id") REFERENCES "artwork"("id") ON DELETE CASCADE
    )
  `)

  await db.run(sql`CREATE INDEX IF NOT EXISTS "artwork_medium_order_idx" ON "artwork_medium"("order")`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS "artwork_medium_parent_idx" ON "artwork_medium"("parent_id")`)

  // Artwork Gallery Images
  await db.run(sql`
    CREATE TABLE IF NOT EXISTS "artwork_gallery_images" (
      "id" TEXT PRIMARY KEY,
      "_order" INTEGER NOT NULL,
      "_parent_id" INTEGER NOT NULL,
      "image_id" INTEGER,
      FOREIGN KEY ("_parent_id") REFERENCES "artwork"("id") ON DELETE CASCADE,
      FOREIGN KEY ("image_id") REFERENCES "media"("id") ON DELETE SET NULL
    )
  `)

  await db.run(sql`CREATE INDEX IF NOT EXISTS "artwork_gallery_images_order_idx" ON "artwork_gallery_images"("_order")`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS "artwork_gallery_images_parent_id_idx" ON "artwork_gallery_images"("_parent_id")`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS "artwork_gallery_images_image_idx" ON "artwork_gallery_images"("image_id")`)

  // Artwork Technologies
  await db.run(sql`
    CREATE TABLE IF NOT EXISTS "artwork_used_tech" (
      "id" TEXT PRIMARY KEY,
      "_order" INTEGER NOT NULL,
      "_parent_id" INTEGER NOT NULL,
      "tech" TEXT,
      FOREIGN KEY ("_parent_id") REFERENCES "artwork"("id") ON DELETE CASCADE
    )
  `)

  await db.run(sql`CREATE INDEX IF NOT EXISTS "artwork_used_tech_order_idx" ON "artwork_used_tech"("_order")`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS "artwork_used_tech_parent_id_idx" ON "artwork_used_tech"("_parent_id")`)

  // Artwork Credits
  await db.run(sql`
    CREATE TABLE IF NOT EXISTS "artwork_credits" (
      "id" TEXT PRIMARY KEY,
      "_order" INTEGER NOT NULL,
      "_parent_id" INTEGER NOT NULL,
      "name" TEXT,
      FOREIGN KEY ("_parent_id") REFERENCES "artwork"("id") ON DELETE CASCADE
    )
  `)

  await db.run(sql`CREATE INDEX IF NOT EXISTS "artwork_credits_order_idx" ON "artwork_credits"("_order")`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS "artwork_credits_parent_id_idx" ON "artwork_credits"("_parent_id")`)

  // Artwork Extra Links
  await db.run(sql`
    CREATE TABLE IF NOT EXISTS "artwork_extra_links" (
      "id" TEXT PRIMARY KEY,
      "_order" INTEGER NOT NULL,
      "_parent_id" INTEGER NOT NULL,
      "label_zh" TEXT,
      "label_en" TEXT,
      "url" TEXT,
      FOREIGN KEY ("_parent_id") REFERENCES "artwork"("id") ON DELETE CASCADE
    )
  `)

  await db.run(sql`CREATE INDEX IF NOT EXISTS "artwork_extra_links_order_idx" ON "artwork_extra_links"("_order")`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS "artwork_extra_links_parent_id_idx" ON "artwork_extra_links"("_parent_id")`)

  // Artwork Exhibitions
  await db.run(sql`
    CREATE TABLE IF NOT EXISTS "artwork_exhibitions" (
      "id" TEXT PRIMARY KEY,
      "_order" INTEGER NOT NULL,
      "_parent_id" INTEGER NOT NULL,
      "name_zh" TEXT,
      "name_en" TEXT,
      "location" TEXT,
      "date" TEXT,
      FOREIGN KEY ("_parent_id") REFERENCES "artwork"("id") ON DELETE CASCADE
    )
  `)

  await db.run(sql`CREATE INDEX IF NOT EXISTS "artwork_exhibitions_order_idx" ON "artwork_exhibitions"("_order")`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS "artwork_exhibitions_parent_id_idx" ON "artwork_exhibitions"("_parent_id")`)

  // Artwork Awards
  await db.run(sql`
    CREATE TABLE IF NOT EXISTS "artwork_awards" (
      "id" TEXT PRIMARY KEY,
      "_order" INTEGER NOT NULL,
      "_parent_id" INTEGER NOT NULL,
      "name_zh" TEXT,
      "name_en" TEXT,
      "year" INTEGER,
      FOREIGN KEY ("_parent_id") REFERENCES "artwork"("id") ON DELETE CASCADE
    )
  `)

  await db.run(sql`CREATE INDEX IF NOT EXISTS "artwork_awards_order_idx" ON "artwork_awards"("_order")`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS "artwork_awards_parent_id_idx" ON "artwork_awards"("_parent_id")`)

  // Dev Collection
  await db.run(sql`
    CREATE TABLE IF NOT EXISTS "dev" (
      "id" INTEGER PRIMARY KEY AUTOINCREMENT,
      "slug" TEXT NOT NULL UNIQUE,
      "status" TEXT DEFAULT 'draft',
      "thumbnail_id" INTEGER,
      "title_zh" TEXT,
      "title_en" TEXT,
      "excerpt_zh" TEXT,
      "excerpt_en" TEXT,
      "cover_image_id" INTEGER,
      "content_zh" TEXT,
      "content_en" TEXT,
      "metatitle_zh" TEXT,
      "metatitle_en" TEXT,
      "metadescription_zh" TEXT,
      "metadescription_en" TEXT,
      "updated_at" TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
      "created_at" TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
      "_status" TEXT DEFAULT 'draft',
      FOREIGN KEY ("thumbnail_id") REFERENCES "media"("id") ON DELETE SET NULL,
      FOREIGN KEY ("cover_image_id") REFERENCES "media"("id") ON DELETE SET NULL
    )
  `)

  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS "dev_slug_idx" ON "dev"("slug")`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS "dev_thumbnail_idx" ON "dev"("thumbnail_id")`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS "dev_cover_image_idx" ON "dev"("cover_image_id")`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS "dev__status_idx" ON "dev"("_status")`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS "dev_updated_at_idx" ON "dev"("updated_at")`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS "dev_created_at_idx" ON "dev"("created_at")`)

  // Dev Relations
  await db.run(sql`
    CREATE TABLE IF NOT EXISTS "dev_rels" (
      "id" INTEGER PRIMARY KEY AUTOINCREMENT,
      "order" INTEGER,
      "parent_id" INTEGER NOT NULL,
      "path" TEXT NOT NULL,
      "dev_categories_id" INTEGER,
      "dev_tags_id" INTEGER,
      FOREIGN KEY ("parent_id") REFERENCES "dev"("id") ON DELETE CASCADE,
      FOREIGN KEY ("dev_categories_id") REFERENCES "dev_categories"("id") ON DELETE CASCADE,
      FOREIGN KEY ("dev_tags_id") REFERENCES "dev_tags"("id") ON DELETE CASCADE
    )
  `)

  await db.run(sql`CREATE INDEX IF NOT EXISTS "dev_rels_order_idx" ON "dev_rels"("order")`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS "dev_rels_parent_idx" ON "dev_rels"("parent_id")`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS "dev_rels_path_idx" ON "dev_rels"("path")`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS "dev_rels_dev_categories_id_idx" ON "dev_rels"("dev_categories_id")`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS "dev_rels_dev_tags_id_idx" ON "dev_rels"("dev_tags_id")`)

  // About Global
  await db.run(sql`
    CREATE TABLE IF NOT EXISTS "about" (
      "id" INTEGER PRIMARY KEY,
      "content_zh" TEXT,
      "content_en" TEXT,
      "_status" TEXT DEFAULT 'draft',
      "updated_at" TEXT,
      "created_at" TEXT
    )
  `)

  await db.run(sql`CREATE INDEX IF NOT EXISTS "about__status_idx" ON "about"("_status")`)

  // Contact Global
  await db.run(sql`
    CREATE TABLE IF NOT EXISTS "contact" (
      "id" INTEGER PRIMARY KEY,
      "content_zh" TEXT,
      "content_en" TEXT,
      "email" TEXT,
      "_status" TEXT DEFAULT 'draft',
      "updated_at" TEXT,
      "created_at" TEXT
    )
  `)

  await db.run(sql`CREATE INDEX IF NOT EXISTS "contact__status_idx" ON "contact"("_status")`)

  // Contact Social Links
  await db.run(sql`
    CREATE TABLE IF NOT EXISTS "contact_social_links" (
      "id" TEXT PRIMARY KEY,
      "_order" INTEGER NOT NULL,
      "_parent_id" INTEGER NOT NULL,
      "platform" TEXT,
      "url" TEXT,
      FOREIGN KEY ("_parent_id") REFERENCES "contact"("id") ON DELETE CASCADE
    )
  `)

  await db.run(sql`CREATE INDEX IF NOT EXISTS "contact_social_links_order_idx" ON "contact_social_links"("_order")`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS "contact_social_links_parent_id_idx" ON "contact_social_links"("_parent_id")`)

  // Add fields to users table if they don't exist
  try {
    await db.run(sql`ALTER TABLE "users" ADD COLUMN "name" TEXT`)
  } catch (e) {
    // Column might already exist, ignore error
  }
  
  try {
    await db.run(sql`ALTER TABLE "users" ADD COLUMN "role" TEXT DEFAULT 'subscriber'`)
  } catch (e) {
    // Column might already exist, ignore error
  }
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE IF EXISTS "blog_categories"`)
  await db.run(sql`DROP TABLE IF EXISTS "blog_tags"`)
  await db.run(sql`DROP TABLE IF EXISTS "dev_categories"`)
  await db.run(sql`DROP TABLE IF EXISTS "dev_tags"`)
  await db.run(sql`DROP TABLE IF EXISTS "blog_rels"`)
  await db.run(sql`DROP TABLE IF EXISTS "blog"`)
  await db.run(sql`DROP TABLE IF EXISTS "artwork_medium"`)
  await db.run(sql`DROP TABLE IF EXISTS "artwork_gallery_images"`)
  await db.run(sql`DROP TABLE IF EXISTS "artwork_used_tech"`)
  await db.run(sql`DROP TABLE IF EXISTS "artwork_credits"`)
  await db.run(sql`DROP TABLE IF EXISTS "artwork_extra_links"`)
  await db.run(sql`DROP TABLE IF EXISTS "artwork_exhibitions"`)
  await db.run(sql`DROP TABLE IF EXISTS "artwork_awards"`)
  await db.run(sql`DROP TABLE IF EXISTS "artwork"`)
  await db.run(sql`DROP TABLE IF EXISTS "dev_rels"`)
  await db.run(sql`DROP TABLE IF EXISTS "dev"`)
  await db.run(sql`DROP TABLE IF EXISTS "contact_social_links"`)
  await db.run(sql`DROP TABLE IF EXISTS "contact"`)
  await db.run(sql`DROP TABLE IF EXISTS "about"`)
}

