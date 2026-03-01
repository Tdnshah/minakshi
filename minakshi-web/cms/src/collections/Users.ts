import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: {
    useAPIKey: true, // This enables API key generation in the Admin UI
  },
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
}
