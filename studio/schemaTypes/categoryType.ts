import { FilterIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const categoryType = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: FilterIcon,
  fields: [
    defineField({ name: 'name', type: 'string' }),
    defineField({ name: 'slug', type: 'slug' }),
    defineField({ name: 'featuredMedia', type: 'externalImage' }),
    defineField({ name: 'headerMedia', type: 'externalImage' })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'slug.current',
      imageUrl: 'featuredMedia.url',
    },
  },
});