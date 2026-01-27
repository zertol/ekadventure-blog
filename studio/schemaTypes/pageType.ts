import { DocumentIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const pageType = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({ name: 'visible', type: 'boolean', initialValue: true }),
    defineField({ name: 'order', type: 'number', initialValue: 0 }),
    defineField({
      name: 'title', type: "object",
      fields: [
        { name: 'en', type: 'string' },
        { name: 'fr', type: 'string' }
      ]
    }),
    defineField({ name: 'slug', type: 'slug' }),
    defineField({ name: 'date', type: 'datetime' }),
    defineField({ name: 'modified', type: 'datetime' }),
    defineField({
      name: 'status',
      type: 'string',
      options: {
        list: [
          { title: 'Published', value: 'publish' },
          { title: 'Future', value: 'future' },
          { title: 'Draft', value: 'draft' },
          { title: 'Pending', value: 'pending' },
          { title: 'Private', value: 'private' },
          { title: 'Trash', value: 'trash' },
          { title: 'Auto-Draft', value: 'auto-draft' },
          { title: 'Inherit', value: 'inherit' },
        ],
      },
    }),
    defineField({
      name: 'content',
      type: 'object',
      fields: [
        { name: 'en', type: 'portableText' },
        { name: 'fr', type: 'portableText' }
      ]
    }),
    defineField({
      name: 'excerpt',
      type: 'portableText',
    }),
    defineField({ name: 'featuredMedia', type: 'externalImage' }),
    defineField({
      name: 'author',
      type: 'reference',
      to: [{ type: 'author' }],
    }),
    defineField({
      name: "metadata",
      type: 'object',
      fields: [
        { name: "ogImage", type: "externalImage" },
        {
          name: "description", type: "object",
          fields: [
            { name: 'en', type: 'string' },
            { name: 'fr', type: 'string' }
          ]
        }
      ]
    })
  ],
  preview: {
    select: {
      title: 'title.en',
      subtitle: 'author.name',
      imageUrl: 'featuredMedia.url',
    },
  },
});