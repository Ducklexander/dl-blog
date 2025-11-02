// Location: src/collections/BlogTags.ts
import type { CollectionConfig } from 'payload'

export const BlogTags: CollectionConfig = {
  slug: 'blog-tags',
  admin: {
    useAsTitle: 'name_zh',
    group: 'Content',
  },
  fields: [
    {
      name: 'name_zh',
      type: 'text',
      required: true,
      label: '中文名稱',
    },
    {
      name: 'name_en',
      type: 'text',
      label: 'English Name',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [
          ({ data, value }) => {
            if (!value && data?.name_zh) {
              return data.name_zh.toLowerCase()
                .replace(/[^\u4e00-\u9fa5a-z0-9]/g, '-')
                .replace(/-+/g, '-')
                .replace(/^-|-$/g, '')
            }
            return value
          },
        ],
      },
    },
  ],
}