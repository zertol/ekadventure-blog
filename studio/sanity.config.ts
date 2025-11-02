import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'
import { commentReplyAction } from './actions/commentReplyAction'

export default defineConfig({
  name: 'default',
  title: 'Ekadventure',

  projectId: '0evq1ccg',
  dataset: 'production',

  plugins: [ structureTool(), visionTool() ],

  document: {
    actions: (prev, context) => {
      if (context.schemaType === 'comment') {
        return [ commentReplyAction, ...prev ]
      }
      return prev
    }
  },

  schema: {
    types: schemaTypes,
  },

  cors: {
    origin: [
      'http://localhost:3000',
    ],
    credentials: true,
  },
})
