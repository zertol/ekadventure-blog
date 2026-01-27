import { FilterIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const categoryType = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: FilterIcon,
  fields: [
    defineField({
      name: 'name', type: "object",
      fields: [
        { name: 'en', type: 'string' },
        { name: 'fr', type: 'string' }
      ]
    }),
    defineField({ name: 'slug', type: 'slug' }),
    defineField({ name: 'featuredMedia', type: 'externalImage' }),
    defineField({ name: 'headerMedia', type: 'externalImage' }),
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
      title: 'name.en',
      subtitle: 'slug.current',
      imageUrl: 'featuredMedia.url',
    },
  },
});