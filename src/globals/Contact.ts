// Location: src/globals/Contact.ts
import type { GlobalConfig } from 'payload'

export const Contact: GlobalConfig = {
  slug: 'contact',
  label: 'Contact Page',
  admin: {
    group: 'Pages',
    livePreview: {
      url: () => `${process.env.NEXT_PUBLIC_SERVER_URL}/contact`,
    },
  },
  versions: {
    drafts: true,
  },
  fields: [
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
    {
      name: 'email',
      type: 'email',
      label: 'Contact Email',
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Social Media Links',
      fields: [
        {
          name: 'platform',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}