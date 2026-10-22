import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'
import { commentReplyAction } from './actions/commentReplyAction'
import { postPublishAction } from './actions/postPublishAction'

export default defineConfig({
  name: 'default',
  title: 'Ekadventure',

  projectId: '0evq1ccg',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  document: {
    actions: (prev, context) => {
      if (context.schemaType === 'comment') {
        return [commentReplyAction, ...prev]
      }
      // WIP {call a publish post function to set the publish status to 'published' when the post is published from within the Sanity Studio}
      // if (context.schemaType === 'post') {
      //   return prev.map((action) =>
      //     action.action === 'publish' ? postPublishAction(action) : action,
      //   )
      // }
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
