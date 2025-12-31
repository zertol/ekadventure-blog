type PostType = {
    _id: string;
    title: string;
    slug: { current: string };
    publishedAt: string;
    excerpt: any;
    featuredMedia: ImageType;
    categories: CategoryType[];
    totalComments: number;
}