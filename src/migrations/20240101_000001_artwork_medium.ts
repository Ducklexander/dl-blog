import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // 新增 artwork_medium collection 表格
  await db.run(sql`
    CREATE TABLE IF NOT EXISTS "artwork_medium" (
      "id" INTEGER PRIMARY KEY AUTOINCREMENT,
      "name_zh" TEXT NOT NULL,
      "name_en" TEXT,
      "slug" TEXT NOT NULL UNIQUE,
      "updated_at" TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
      "created_at" TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
    )
  `)

  await db.run(sql`CREATE INDEX IF NOT EXISTS "artwork_medium_slug_idx" ON "artwork_medium"("slug")`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS "artwork_medium_updated_at_idx" ON "artwork_medium"("updated_at")`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS "artwork_medium_created_at_idx" ON "artwork_medium"("created_at")`)

  // 創建 artwork_rels 表格（如果不存在）以支援 medium relationship
  await db.run(sql`
    CREATE TABLE IF NOT EXISTS "artwork_rels" (
      "id" INTEGER PRIMARY KEY AUTOINCREMENT,
      "order" INTEGER,
      "parent_id" INTEGER NOT NULL,
      "path" TEXT NOT NULL,
      "artwork_medium_id" INTEGER,
      FOREIGN KEY ("parent_id") REFERENCES "artwork"("id") ON DELETE CASCADE,
      FOREIGN KEY ("artwork_medium_id") REFERENCES "artwork_medium"("id") ON DELETE CASCADE
    )
  `)

  await db.run(sql`CREATE INDEX IF NOT EXISTS "artwork_rels_order_idx" ON "artwork_rels"("order")`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS "artwork_rels_parent_idx" ON "artwork_rels"("parent_id")`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS "artwork_rels_path_idx" ON "artwork_rels"("path")`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS "artwork_rels_artwork_medium_id_idx" ON "artwork_rels"("artwork_medium_id")`)

  // 如果 artwork_rels 已存在但沒有 artwork_medium_id 欄位，嘗試添加
  try {
    await db.run(sql`ALTER TABLE "artwork_rels" ADD COLUMN "artwork_medium_id" INTEGER`)
    await db.run(sql`CREATE INDEX IF NOT EXISTS "artwork_rels_artwork_medium_id_idx" ON "artwork_rels"("artwork_medium_id")`)
  } catch (e) {
    // 欄位可能已存在，忽略錯誤
  }
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  // 注意：不刪除 artwork_rels 表格，因為它可能還被其他 relationship 使用
  // 只移除 artwork_medium_id 相關的索引
  try {
    await db.run(sql`DROP INDEX "artwork_rels_artwork_medium_id_idx"`)
  } catch (e) {
    // 索引可能不存在，忽略錯誤
  }
  
  await db.run(sql`DROP TABLE IF EXISTS "artwork_medium"`)
}

