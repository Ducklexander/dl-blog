-- Location: src/migrations/20240101_init.sql

-- Categories and Tags
CREATE TABLE IF NOT EXISTS "blog_categories" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "name_zh" TEXT NOT NULL,
  "name_en" TEXT,
  "slug" TEXT NOT NULL UNIQUE,
  "updated_at" TEXT NOT NULL DEFAULT (datetime('now')),
  "created_at" TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS "blog_tags" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "name_zh" TEXT NOT NULL,
  "name_en" TEXT,
  "slug" TEXT NOT NULL UNIQUE,
  "updated_at" TEXT NOT NULL DEFAULT (datetime('now')),
  "created_at" TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS "dev_categories" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "name_zh" TEXT NOT NULL,
  "name_en" TEXT,
  "slug" TEXT NOT NULL UNIQUE,
  "updated_at" TEXT NOT NULL DEFAULT (datetime('now')),
  "created_at" TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS "dev_tags" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "name_zh" TEXT NOT NULL,
  "name_en" TEXT,
  "slug" TEXT NOT NULL UNIQUE,
  "updated_at" TEXT NOT NULL DEFAULT (datetime('now')),
  "created_at" TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Blog Collection
CREATE TABLE IF NOT EXISTS "blog" (
  "id" TEXT PRIMARY KEY,
  "status" TEXT DEFAULT 'draft',
  "author_id" INTEGER REFERENCES "users"("id"),
  "locked" INTEGER DEFAULT 0,
  "thumbnail_id" INTEGER REFERENCES "media"("id"),
  "title_zh" TEXT NOT NULL,
  "title_en" TEXT,
  "excerpt_zh" TEXT NOT NULL,
  "excerpt_en" TEXT,
  "cover_image_id" INTEGER REFERENCES "media"("id"),
  "content_zh" TEXT NOT NULL,
  "content_en" TEXT,
  "meta_title_zh" TEXT,
  "meta_title_en" TEXT,
  "meta_description_zh" TEXT,
  "meta_description_en" TEXT,
  "updated_at" TEXT NOT NULL DEFAULT (datetime('now')),
  "created_at" TEXT NOT NULL DEFAULT (datetime('now')),
  "_status" TEXT DEFAULT 'draft'
);

-- Blog Categories Relations
CREATE TABLE IF NOT EXISTS "blog_rels" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "parent_id" TEXT NOT NULL,
  "parent" TEXT NOT NULL,
  "path" TEXT NOT NULL,
  "blog_categories_id" INTEGER REFERENCES "blog_categories"("id"),
  "blog_tags_id" INTEGER REFERENCES "blog_tags"("id"),
  "order" INTEGER
);

-- Artwork Collection
CREATE TABLE IF NOT EXISTS "artwork" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "slug" TEXT NOT NULL UNIQUE,
  "status" TEXT DEFAULT 'draft',
  "year" INTEGER NOT NULL,
  "author_zh" TEXT,
  "author_en" TEXT,
  "medium" TEXT,
  "description_zh" TEXT NOT NULL,
  "description_en" TEXT,
  "thumbnail_id" INTEGER REFERENCES "media"("id"),
  "banner_image_id" INTEGER REFERENCES "media"("id"),
  "video_url" TEXT,
  "collaboration_type" TEXT DEFAULT 'individual',
  "content_zh" TEXT,
  "content_en" TEXT,
  "updated_at" TEXT NOT NULL DEFAULT (datetime('now')),
  "created_at" TEXT NOT NULL DEFAULT (datetime('now')),
  "_status" TEXT DEFAULT 'draft'
);

-- Artwork Gallery Images
CREATE TABLE IF NOT EXISTS "artwork_gallery_images" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "_order" INTEGER NOT NULL,
  "_parent_id" INTEGER NOT NULL REFERENCES "artwork"("id") ON DELETE CASCADE,
  "image_id" INTEGER REFERENCES "media"("id")
);

-- Artwork Technologies
CREATE TABLE IF NOT EXISTS "artwork_used_tech" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "_order" INTEGER NOT NULL,
  "_parent_id" INTEGER NOT NULL REFERENCES "artwork"("id") ON DELETE CASCADE,
  "tech" TEXT NOT NULL
);

-- Artwork Credits
CREATE TABLE IF NOT EXISTS "artwork_credits" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "_order" INTEGER NOT NULL,
  "_parent_id" INTEGER NOT NULL REFERENCES "artwork"("id") ON DELETE CASCADE,
  "name" TEXT NOT NULL
);

-- Artwork Extra Links
CREATE TABLE IF NOT EXISTS "artwork_extra_links" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "_order" INTEGER NOT NULL,
  "_parent_id" INTEGER NOT NULL REFERENCES "artwork"("id") ON DELETE CASCADE,
  "label_zh" TEXT,
  "label_en" TEXT,
  "url" TEXT NOT NULL
);

-- Artwork Exhibitions
CREATE TABLE IF NOT EXISTS "artwork_exhibitions" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "_order" INTEGER NOT NULL,
  "_parent_id" INTEGER NOT NULL REFERENCES "artwork"("id") ON DELETE CASCADE,
  "name_zh" TEXT,
  "name_en" TEXT,
  "location" TEXT,
  "date" TEXT
);

-- Artwork Awards
CREATE TABLE IF NOT EXISTS "artwork_awards" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "_order" INTEGER NOT NULL,
  "_parent_id" INTEGER NOT NULL REFERENCES "artwork"("id") ON DELETE CASCADE,
  "name_zh" TEXT,
  "name_en" TEXT,
  "year" INTEGER
);

-- Dev Collection
CREATE TABLE IF NOT EXISTS "dev" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "slug" TEXT NOT NULL UNIQUE,
  "status" TEXT DEFAULT 'draft',
  "thumbnail_id" INTEGER REFERENCES "media"("id"),
  "title_zh" TEXT NOT NULL,
  "title_en" TEXT,
  "excerpt_zh" TEXT NOT NULL,
  "excerpt_en" TEXT,
  "cover_image_id" INTEGER REFERENCES "media"("id"),
  "content_zh" TEXT NOT NULL,
  "content_en" TEXT,
  "meta_title_zh" TEXT,
  "meta_title_en" TEXT,
  "meta_description_zh" TEXT,
  "meta_description_en" TEXT,
  "updated_at" TEXT NOT NULL DEFAULT (datetime('now')),
  "created_at" TEXT NOT NULL DEFAULT (datetime('now')),
  "_status" TEXT DEFAULT 'draft'
);

-- Dev Relations
CREATE TABLE IF NOT EXISTS "dev_rels" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "parent_id" INTEGER NOT NULL,
  "parent" TEXT NOT NULL,
  "path" TEXT NOT NULL,
  "dev_categories_id" INTEGER REFERENCES "dev_categories"("id"),
  "dev_tags_id" INTEGER REFERENCES "dev_tags"("id"),
  "order" INTEGER
);

-- About Global
CREATE TABLE IF NOT EXISTS "about" (
  "id" INTEGER PRIMARY KEY,
  "content_zh" TEXT NOT NULL,
  "content_en" TEXT,
  "updated_at" TEXT NOT NULL DEFAULT (datetime('now')),
  "created_at" TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Contact Global
CREATE TABLE IF NOT EXISTS "contact" (
  "id" INTEGER PRIMARY KEY,
  "content_zh" TEXT NOT NULL,
  "content_en" TEXT,
  "email" TEXT,
  "updated_at" TEXT NOT NULL DEFAULT (datetime('now')),
  "created_at" TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Contact Social Links
CREATE TABLE IF NOT EXISTS "contact_social_links" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "_order" INTEGER NOT NULL,
  "_parent_id" INTEGER NOT NULL,
  "platform" TEXT NOT NULL,
  "url" TEXT NOT NULL
);

-- Add role field to existing users table
ALTER TABLE "users" ADD COLUMN "name" TEXT;
ALTER TABLE "users" ADD COLUMN "role" TEXT DEFAULT 'subscriber';

-- Create indexes
CREATE INDEX IF NOT EXISTS "blog_author_idx" ON "blog"("author_id");
CREATE INDEX IF NOT EXISTS "blog_status_idx" ON "blog"("status");
CREATE INDEX IF NOT EXISTS "blog_locked_idx" ON "blog"("locked");
CREATE INDEX IF NOT EXISTS "artwork_slug_idx" ON "artwork"("slug");
CREATE INDEX IF NOT EXISTS "dev_slug_idx" ON "dev"("slug");