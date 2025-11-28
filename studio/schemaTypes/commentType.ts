import { Rule } from "sanity";

export default {
    name: "comment",
    title: "Comment",
    type: "document",
    fields: [
        {
            name: "post",
            title: "Post",
            type: "reference",
            to: [{ type: "post" }],
        },
        {
            name: "name",
            title: "Name",
            type: "string",
            validation: (Rule: Rule) => Rule.required(),
        },
        {
            name: "email",
            title: "Email",
            type: "string",
            validation: (Rule: Rule) => Rule.required().email(),
        },
        {
            name: "comment",
            title: "Comment",
            type: "text",
            validation: (Rule: Rule) => Rule.required(),
        },
        {
            name: "approved",
            title: "Approved",
            type: "boolean",
            initialValue: false,
            description: "Comments must be approved before appearing on the site",
        },
        {
            name: "parent",
            title: "Parent Comment",
            type: "reference",
            to: [{ type: "comment" }],
            description: "For threaded replies",
        },
        {
            name: "isAuthor",
            title: "Is Author",
            type: "boolean",
            initialValue: false,
            description: "Indicates if the comment is made by the post author",
        }
    ],
    preview: {
        select: {
            name: "name",
            post: "post.title",
            media: "post.featuredMedia.url",
            approved: "approved"
        },
        prepare({ name, post, media, approved }: any) {
            return {
                title: `${name} — ${post}`,
                subtitle: approved ? "Approved ✅" : "Not Approved ❌",
                imageUrl: media
            };
        }
    }
};