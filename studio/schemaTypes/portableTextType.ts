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
        // {
        //   title: "Sup",
        //   value: "sup",
        //   icon: () => <div>x<sup>2</sup></div>,
        //   component: ({ children }) => <sup>{children}</sup>
        // },
      ],
    },
  }, { type: 'image' }, { type: 'externalImage' }, { type: 'iframe' }],
});
