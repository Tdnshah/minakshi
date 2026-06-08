import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { Articles } from './collections/Articles';
import { Podcasts } from './collections/Podcasts';
import { Books } from './collections/Books';
import { Press } from './collections/Press';
import { Research } from './collections/Research';
import { Conferences } from './collections/Conferences';
import { Films } from './collections/Films';
import { Consulting } from './collections/Consulting';
import { Pages } from './collections/Pages';

import { Users } from './collections/Users'
import { Media } from './collections/Media'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',
  cors: [
    'https://minakshidewan.com',
    'https://www.minakshidewan.com',
    process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',
  ].filter(Boolean),
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users, 
    Media,
    Pages,
    Articles,
    Podcasts,
    Books,
    Press,
    Research,
    Conferences,
    Films,
    Consulting,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  plugins: [],
})
