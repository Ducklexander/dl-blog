// Location: src/globals/About.ts
import type { GlobalConfig } from 'payload'

export const About: GlobalConfig = {
  slug: 'about',
  label: 'About Page',
  admin: {
    group: 'Pages',
    livePreview: {
      url: () => `${process.env.NEXT_PUBLIC_SERVER_URL}/about`,
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
  ],
}