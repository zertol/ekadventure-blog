
import { defineField, defineType } from "sanity";

export const imageGalleryType = defineType({
    name: "imageGallery",
    title: "Image Gallery",
    type: "object",
    fields: [
        defineField({
            name: "title",
            title: "Gallery title",
            type: 'object',
            fields: [
                { name: 'en', type: 'string' },
                { name: 'fr', type: 'string' }
            ]
        }),

        defineField({
            name: "description",
            title: "Description",
            type: 'object',
            fields: [
                { name: 'en', type: 'portableText' },
                { name: 'fr', type: 'portableText' }
            ]
        }),

        defineField({
            name: "layout",
            title: "Gallery layout",
            type: "string",
            initialValue: "grid",
            options: {
                list: [
                    { title: "Grid", value: "grid" },
                    { title: "Masonry", value: "masonry" },
                    { title: "Carousel", value: "carousel" },
                    { title: "Featured image", value: "featured" },
                ],
                layout: "radio",
            },
        }),

        defineField({
            name: "columns",
            title: "Number of columns",
            type: "number",
            initialValue: 3,
            options: {
                list: [
                    { title: "2 columns", value: 2 },
                    { title: "3 columns", value: 3 },
                    { title: "4 columns", value: 4 },
                ],
            },
            hidden: ({ parent }) => parent?.layout !== "grid",
        }),

        defineField({
            name: "images",
            title: "Images",
            type: "array",
            of: [
                {
                    type: "externalImage"
                }
            ],
            validation: (rule) => rule.min(1),
        }),
    ],

    preview: {
        select: {
            title: "title",
            media: "images.0",
            layout: "layout",
        },
        prepare({ title, media, layout }) {
            return {
                title: title || "Image Gallery",
                subtitle: `Gallery · ${layout || "grid"}`,
                media,
            };
        },
    },
});
