import { defineField, defineType } from 'sanity'
export const portableTextType = defineField({
  name: 'portableText',
  type: 'array',
  of: [{
    type: 'block', marks: {
      decorators: [
        { title: "Strong", value: "strong" },
        { title: "Emphasis", value: "em" },
        { title: "Poor Story", value: "poorStory" },
        { title: "Bordered Thick", value: "borderedThick" },
      ],
    },
  }, { type: 'image' }, { type: 'externalImage' }, { type: 'iframe' }],
});
