// Location: src/collections/Artwork.ts
import type { CollectionConfig } from 'payload'

export const Artwork: CollectionConfig = {
  slug: 'artwork',
  admin: {
    useAsTitle: 'slug',
    defaultColumns: ['slug', 'year', 'status'],
    group: 'Content',
    livePreview: {
      url: ({ data }) => `${process.env.NEXT_PUBLIC_SERVER_URL}/artwork/${data.slug}`,
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
    {
      name: 'year',
      type: 'number',
      required: true,
      min: 1900,
      max: 2100,
      admin: {
        position: 'sidebar',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'author_zh',
          type: 'text',
          label: '作者（中文）',
          admin: {
            width: '50%',
          },
        },
        {
          name: 'author_en',
          type: 'text',
          label: 'Author (English)',
          admin: {
            width: '50%',
          },
        },
      ],
    },
    // Medium & Description
    {
      name: 'medium',
      type: 'relationship',
      relationTo: 'artwork-medium',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'description_zh',
          type: 'textarea',
          required: true,
          label: '描述（中文）',
          admin: {
            width: '50%',
          },
        },
        {
          name: 'description_en',
          type: 'textarea',
          label: 'Description (English)',
          admin: {
            width: '50%',
          },
        },
      ],
    },
    // Visual Content
    {
      type: 'tabs',
      tabs: [
        {
          label: '視覺 Visual',
          fields: [
            {
              name: 'thumbnail',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'bannerImage',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'galleryImages',
              type: 'array',
              label: 'Gallery',
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
              ],
            },
            {
              name: 'videoUrl',
              type: 'text',
              label: 'Video URL',
              admin: {
                placeholder: 'YouTube or Vimeo embed URL',
              },
            },
          ],
        },
        {
          label: '創作資訊 Creation Info',
          fields: [
            {
              name: 'collaborationType',
              type: 'radio',
              required: true,
              defaultValue: 'individual',
              options: [
                { label: 'Individual', value: 'individual' },
                { label: 'Collaborate', value: 'collaborate' },
              ],
            },
            {
              name: 'usedTech',
              type: 'array',
              label: 'Technologies Used',
              fields: [
                {
                  name: 'tech',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              name: 'credits',
              type: 'array',
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              name: 'extraLinks',
              type: 'array',
              fields: [
                {
                  name: 'label_zh',
                  type: 'text',
                  label: '連結文字（中文）',
                },
                {
                  name: 'label_en',
                  type: 'text',
                  label: 'Link Label (English)',
                },
                {
                  name: 'url',
                  type: 'text',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: '展覽紀錄 Exhibitions',
          fields: [
            {
              name: 'exhibitions',
              type: 'array',
              fields: [
                {
                  name: 'name_zh',
                  type: 'text',
                  label: '展覽名稱（中文）',
                },
                {
                  name: 'name_en',
                  type: 'text',
                  label: 'Exhibition Name (English)',
                },
                {
                  name: 'location',
                  type: 'text',
                },
                {
                  name: 'date',
                  type: 'date',
                  admin: {
                    date: {
                      pickerAppearance: 'dayOnly',
                    },
                  },
                },
              ],
            },
            {
              name: 'awards',
              type: 'array',
              fields: [
                {
                  name: 'name_zh',
                  type: 'text',
                  label: '獎項名稱（中文）',
                },
                {
                  name: 'name_en',
                  type: 'text',
                  label: 'Award Name (English)',
                },
                {
                  name: 'year',
                  type: 'number',
                  min: 1900,
                  max: 2100,
                },
              ],
            },
          ],
        },
        {
          label: '詳細內容 Content',
          fields: [
            {
              name: 'content_zh',
              type: 'richText',
              label: '中文內容',
            },
            {
              name: 'content_en',
              type: 'richText',
              label: 'English Content',
            },
          ],
        },
      ],
    },
  ],
}