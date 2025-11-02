import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'iframe',
    type: 'object',
    title: 'IFrame Embed',
    fields: [
        defineField({
            name: 'url',
            type: 'url',
            title: 'URL',
            description: 'The URL to embed (YouTube, Google Maps, etc.)',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'width',
            type: 'string',
            title: 'Width',
            description: 'Width of the iframe (e.g., "100%" or "500px")',
            initialValue: '100%',
        }),
        defineField({
            name: 'height',
            type: 'string',
            title: 'Height',
            description: 'Height of the iframe (e.g., "400px")',
            initialValue: '400px',
        }),
        defineField({
            name: 'title',
            type: 'string',
            title: 'Title',
            description: 'Accessibility title for the iframe',
            validation: (Rule) => Rule.required(),
        }),
    ],
    preview: {
        select: {
            title: 'title',
            url: 'url',
        },
        prepare({ title, url }) {
            return {
                title: title || 'Untitled Embed',
                subtitle: url,
                media: () => '🖼️', // You can use any emoji or custom icon
            }
        },
    },
}) 