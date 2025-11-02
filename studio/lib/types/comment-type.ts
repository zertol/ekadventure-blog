export type CommentType = {
    id: string;
    name: string;
    email: string;
    comment: string;
    parentId?: string;
    postId: string;
    isAuthor?: boolean;
    approved?: boolean;
};