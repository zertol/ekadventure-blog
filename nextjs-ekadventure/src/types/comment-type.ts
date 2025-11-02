type CommentType = {
    id: string;
    name: string;
    email: string;
    comment: string;
    createdAt: string;
    replies?: CommentType[];
    parentId?: string;
    postId: string;
    isAuthor?: boolean;
    approved?: boolean;
};