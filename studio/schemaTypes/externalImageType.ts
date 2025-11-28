import { defineType } from 'sanity'

export const externalImageType = defineType({
  name: 'externalImage',
  title: 'External Image',
  type: 'object',
  fields: [
    {
      name: 'url',
      title: 'URL',
      type: 'url',
    },
    {
      name: 'alt',
      title: 'Alt',
      type: 'string',
    },
    {
      name: 'photoCredit',
      title: 'Photo Credit',
      type: 'string',
    },
  ],
  preview: {
    select: {
      url: 'url',
      alt: 'alt',
    },
    prepare({ url, alt }) {
      return {
        imageUrl: url,
        title: alt || 'External Image',
      }
    }
  }
});
