import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Ekadventure',

  projectId: '0evq1ccg',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },

  cors: {
    origin: [
      'http://localhost:3000',
      // Add your production domain when you deploy
      // 'https://yourdomain.com'
    ],
    credentials: true,
  },
})
