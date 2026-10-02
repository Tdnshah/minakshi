import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,   // media files must be publicly readable by the browser
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    // Every uploaded image is converted to WebP on save (the filename becomes
    // *.webp), so editors can upload JPG/PNG straight from a camera or phone.
    formatOptions: {
      format: 'webp',
      options: { quality: 80 },
    },
    // Cap oversized originals; never upscale smaller ones.
    resizeOptions: {
      width: 2400,
      height: 2400,
      fit: 'inside',
      withoutEnlargement: true,
    },
  },
}
