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
    defineField({ name: 'featuredMedia', type: 'image' })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'slug.current',
      media: 'featuredMedia',
    },
  },
});