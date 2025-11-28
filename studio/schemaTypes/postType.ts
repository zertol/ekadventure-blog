import { ComposeIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: ComposeIcon,
  fields: [
    defineField({ name: 'title', type: 'string' }),
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
      type: 'portableText',
    }),
    defineField({
      name: "stats",
      type: "array",
      initialValue: [
        { label_en: "Distance", label_fr: "Distance", value_en: "", value_fr: "" },
        { label_en: "Elevation Gain", label_fr: "Dénivelé Positif", value_en: "", value_fr: "" },
        { label_en: "Difficulty", label_fr: "Difficulté", value_en: "", value_fr: "" },
        { label_en: "Dog Friendly", label_fr: "Chiens Permis", value_en: "", value_fr: "" },
        { label_en: "Toilets", label_fr: "Toilettes", value_en: "", value_fr: "" },
        { label_en: "Duration", label_fr: "Durée", value_en: "", value_fr: "" }
      ],
      of: [
        {
          type: "object",
          fields: [
            { name: "label_en", type: "string" },
            { name: "label_fr", type: "string" },
            { name: "value_en", type: "string" },
            { name: "value_fr", type: "string" }
          ],
          preview: {
            select: { title: "label_en", subtitle: "value_en", imageUrl: 'featuredMedia.url' }
          }
        }
      ]
    }),
    defineField({
      name: 'statsTitle',
      type: 'object',
      fields: [
        { name: "title_en", type: "string" },
        { name: "title_fr", type: "string" },
        { name: "name_en", type: "string" },
        { name: "name_fr", type: "string" }
      ]
    }),
    defineField({
      name: 'googleMapsHowToTitle',
      type: 'string',
    }),
    defineField({
      name: 'googleMapsHowTo',
      type: 'portableText',
    }),
    defineField({
      name: 'youtubeEmbedUrl',
      type: 'url',
    }),
    defineField({
      name: 'whereToEat',
      type: 'portableText'
    }),
    defineField({
      name: 'whereToStay',
      type: 'portableText'
    }),
    defineField({
      name: 'hikingPass',
      type: 'portableText'
    }),
    defineField({
      name: 'excerpt',
      type: 'portableText',
    }),
    defineField({
      name: 'otherHikes',
      type: 'portableText'
    }),
    defineField({
      name: 'otherAttractions',
      type: 'portableText'
    }),
    defineField({ name: 'featuredMedia', type: 'externalImage' }),
    defineField({ name: 'sticky', type: 'boolean' }),
    defineField({
      name: 'author',
      type: 'reference',
      to: [{ type: 'author' }],
    }),
    defineField({
      name: 'tags',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'tag' }] }],
    }),
    defineField({
      name: 'categories',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
    }),
    defineField({
      name: 'capturedMoments',
      type: 'array',
      of: [{ type: 'externalImage' }],
    }),
    defineField({
      name: "comments",
      title: "Comments",
      type: "array",
      of: [{ type: "reference", to: [{ type: "comment" }] }]
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'author.name',
      imageUrl: 'featuredMedia.url',
    },
  },
});