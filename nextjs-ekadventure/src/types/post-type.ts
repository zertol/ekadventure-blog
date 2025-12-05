type PostType = {
    _id: string;
    title: string;
    slug: { current: string };
    publishedAt: string;
    excerpt: string;
    featuredMedia: ImageType;
    categories: CategoryType[];
}