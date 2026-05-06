import { defineType } from 'sanity';

export const googleAdSlotType = defineType({
  name: 'googleAdSlot',
  title: 'Google Ad Slot',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slotId',
      title: 'Slot ID',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: "adFormat",
      type: "string",
      options: { list: ["auto", "fluid", "rectangle", "vertical", "horizontal"] },
      validation: Rule => Rule.required()
    },
    {
      name: 'adLayout',
      title: 'Layout',
      type: 'string',
      options: { list: ["in-article", "in-feed"] },
      validation: Rule => Rule.custom((adLayout, context) => {
        const parent = context.parent as any;
        if (adLayout && parent?.adFormat !== "fluid") {
          return "adLayout must be cleared when adFormat is not fluid";
        }
        return true;
      })
    },
  ],
  preview: {
    select: {
      title: 'title',
      slotId: 'slotId',
    },
    prepare({ title, slotId }) {
      return {
        title: title + " Ad: " + slotId
      }
    }
  }
});
