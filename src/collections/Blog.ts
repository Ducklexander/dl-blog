// Location: src/collections/Blog.ts
import type { CollectionConfig } from 'payload'

export const Blog: CollectionConfig = {
  slug: 'blog',
  admin: {
    useAsTitle: 'title_zh',
    defaultColumns: ['id', 'title_zh', 'status', 'createdAt'],
    group: 'Content',
    livePreview: {
      url: ({ data, collectionConfig }) => {
        // For new documents without ID, show a preview placeholder
        if (!data?.id) {
          return `${process.env.NEXT_PUBLIC_SERVER_URL}/api/preview?collection=${collectionConfig?.slug}&mode=create`
        }
        return `${process.env.NEXT_PUBLIC_SERVER_URL}/blog/${data.id}`
      },
    },
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'id',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
    // Status & Metadata
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
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'locked',
      type: 'checkbox',
      label: 'Members Only',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Lock this post to subscribers only',
      },
    },
    // Categories & Tags
    {
      name: 'blog_category',
      type: 'relationship',
      relationTo: 'blog-categories',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'blog_tag',
      type: 'relationship',
      relationTo: 'blog-tags',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
    // Preview Content
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
  hooks: {
    beforeChange: [
      async ({ data, req, operation }) => {
        // Auto-generate 5-digit ID for new posts
        if (operation === 'create' && !data.id) {
          const payload = req.payload
          
          // Get the last blog post
          const lastPost = await payload.find({
            collection: 'blog',
            sort: '-id',
            limit: 1,
          })
          
          let nextId = 1
          if (lastPost.docs.length > 0) {
            const lastId = parseInt(lastPost.docs[0].id)
            if (!isNaN(lastId)) {
              nextId = lastId + 1
            }
          }
          
          data.id = String(nextId).padStart(5, '0')
        }
        
        return data
      },
    ],
  },
  access: {
    read: ({ req: { user } }) => {
      if (user) {
        return true // Logged-in users can read all posts
      }
      
      // Public users can only read non-locked posts
      return {
        or: [
          {
            locked: { equals: false },
          },
          {
            locked: { exists: false },
          },
        ],
      }
    },
    create: ({ req: { user } }) => user?.role === 'admin',
    update: ({ req: { user } }) => user?.role === 'admin',
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
}