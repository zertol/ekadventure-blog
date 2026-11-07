import { defineField, defineType } from "sanity";

export const buttonType = defineType({
    name: "buttonType",
    title: "Button",
    type: "object",

    fields: [
        defineField({
            name: "text",
            title: "Button text",
            type: 'object',
            fields: [
                { name: 'en', type: 'string' },
                { name: 'fr', type: 'string' }
            ]
        }),
        defineField({
            name: "url",
            title: "Button URL",
            type: "string",
        }),
        defineField({
            name: "style",
            title: "Button style",
            type: "string",
            options: {
                list: [
                    { title: "Primary", value: "primary" },
                    { title: "Secondary", value: "secondary" },
                    { title: "Tertiary", value: "tertiary" },
                ],
            },
            initialValue: "primary"
        }),
        defineField({
            name: "type",
            title: "Button type",
            type: "string",
            options: {
                list: [
                    { title: "Link", value: "link" },
                    { title: "Normal Button", value: "normal" },
                ],
            },
            initialValue: "link"
        }),
    ],
});