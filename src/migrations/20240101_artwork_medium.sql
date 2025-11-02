-- Location: src/migrations/20240101_artwork_medium.sql

-- 新增 artwork_medium collection 表格
CREATE TABLE IF NOT EXISTS "artwork_medium" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "name_zh" TEXT NOT NULL,
  "name_en" TEXT,
  "slug" TEXT NOT NULL UNIQUE,
  "updated_at" TEXT NOT NULL DEFAULT (datetime('now')),
  "created_at" TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 創建 artwork_rels 表格（如果不存在）以支援 medium relationship
CREATE TABLE IF NOT EXISTS "artwork_rels" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "order" INTEGER,
  "parent_id" INTEGER NOT NULL,
  "path" TEXT NOT NULL,
  "artwork_medium_id" INTEGER,
  FOREIGN KEY ("parent_id") REFERENCES "artwork"("id") ON DELETE CASCADE,
  FOREIGN KEY ("artwork_medium_id") REFERENCES "artwork_medium"("id") ON DELETE CASCADE
);

-- 為新表格創建索引
CREATE INDEX IF NOT EXISTS "artwork_medium_slug_idx" ON "artwork_medium"("slug");
CREATE INDEX IF NOT EXISTS "artwork_medium_updated_at_idx" ON "artwork_medium"("updated_at");
CREATE INDEX IF NOT EXISTS "artwork_medium_created_at_idx" ON "artwork_medium"("created_at");
CREATE INDEX IF NOT EXISTS "artwork_rels_order_idx" ON "artwork_rels"("order");
CREATE INDEX IF NOT EXISTS "artwork_rels_parent_idx" ON "artwork_rels"("parent_id");
CREATE INDEX IF NOT EXISTS "artwork_rels_path_idx" ON "artwork_rels"("path");
CREATE INDEX IF NOT EXISTS "artwork_rels_artwork_medium_id_idx" ON "artwork_rels"("artwork_medium_id");

