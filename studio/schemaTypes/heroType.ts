import { defineField, defineType, Rule } from "sanity";

export const heroType = defineType({
    name: "hero",
    title: "Hero section",
    type: "object",

    fields: [
        defineField({
            name: "heading",
            type: "object",
            fields: [
                { name: 'en', type: 'string', validation: (Rule: Rule) => Rule.required() },
                { name: 'fr', type: 'string', validation: (Rule: Rule) => Rule.required() }
            ],
        }),

        defineField({
            name: "description",
            type: 'object',
            fields: [
                { name: 'en', type: 'portableText' },
                { name: 'fr', type: 'portableText' }
            ]
        }),

        defineField({
            name: "backgroundImage",
            title: "Background image",
            type: "externalImage",
        }),

        defineField({
            name: "buttons",
            title: "Buttons",
            type: "array",
            of: [{ type: "buttonType" }]
        })
    ],

    preview: {
        select: {
            imageUrl: "backgroundImage.url",
        },
        prepare({ imageUrl }) {
            return {
                title: "Hero section",
                imageUrl: imageUrl
            };
        },
    },
});