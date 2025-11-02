// Location: src/collections/Users.ts
import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'name',
    group: 'Admin',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'subscriber',
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'Subscriber',
          value: 'subscriber',
        },
      ],
      hooks: {
        beforeChange: [
          async ({ data, req, operation }) => {
            // Auto-assign admin to first user
            if (operation === 'create') {
              const payload = req.payload
              const existingUsers = await payload.find({
                collection: 'users',
                limit: 1,
              })
              
              if (existingUsers.totalDocs === 0) {
                return 'admin'
              }
            }
            return data?.role
          },
        ],
      },
    },
  ],
  access: {
    admin: ({ req: { user } }) => user?.role === 'admin',
  },
}