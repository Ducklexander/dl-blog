// Location: src/collections/Dev.ts
import type { CollectionConfig } from 'payload'

export const Dev: CollectionConfig = {
  slug: 'dev',
  admin: {
    useAsTitle: 'title_zh',
    defaultColumns: ['slug', 'title_zh', 'status', 'createdAt'],
    group: 'Content',
    livePreview: {
      url: ({ data }) => `${process.env.NEXT_PUBLIC_SERVER_URL}/dev/${data.slug}`,
    },
  },
  versions: {
    drafts: true,
  },
  fields: [
    // Basic Info
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Published', value: 'published' },
        { label: 'Draft', value: 'draft' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    // Categories & Tags
    {
      name: 'dev_category',
      type: 'relationship',
      relationTo: 'dev-categories',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'dev_tag',
      type: 'relationship',
      relationTo: 'dev-tags',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
    // Content
    {
      type: 'tabs',
      tabs: [
        {
          label: '預覽內容 Preview',
          fields: [
            {
              name: 'thumbnail',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'title_zh',
                  type: 'text',
                  required: true,
                  label: '中文標題',
                  admin: {
                    width: '50%',
                  },
                },
                {
                  name: 'title_en',
                  type: 'text',
                  label: 'English Title',
                  admin: {
                    width: '50%',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'excerpt_zh',
                  type: 'textarea',
                  required: true,
                  label: '中文摘要',
                  admin: {
                    width: '50%',
                  },
                },
                {
                  name: 'excerpt_en',
                  type: 'textarea',
                  label: 'English Excerpt',
                  admin: {
                    width: '50%',
                  },
                },
              ],
            },
          ],
        },
        {
          label: '詳細內容 Content',
          fields: [
            {
              name: 'coverImage',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'content_zh',
              type: 'richText',
              required: true,
              label: '中文內容',
            },
            {
              name: 'content_en',
              type: 'richText',
              label: 'English Content',
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'metaTitle_zh',
                  type: 'text',
                  label: '中文 Meta Title',
                  admin: {
                    width: '50%',
                  },
                },
                {
                  name: 'metaTitle_en',
                  type: 'text',
                  label: 'English Meta Title',
                  admin: {
                    width: '50%',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'metaDescription_zh',
                  type: 'textarea',
                  label: '中文 Meta Description',
                  admin: {
                    width: '50%',
                  },
                },
                {
                  name: 'metaDescription_en',
                  type: 'textarea',
                  label: 'English Meta Description',
                  admin: {
                    width: '50%',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}