import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
    name: "customFonts",
    title: "Custom Fonts",
    type: 'object',
    // Styles let you set what your user can mark up blocks with. These
    // correspond with HTML tags, but you can set any title or value
    // you want and decide how you want to deal with it where you want to
    // use your content.
    fields: [
        defineField({
            name: 'content',
            title: 'Content',
            type: 'portableText', // Or any other type relevant to your block
        })
    ]
});