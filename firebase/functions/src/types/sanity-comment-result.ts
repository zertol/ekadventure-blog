type CommentResult = {
    id: string;
    operation: string;
};

export type SanityCommentResult = {
    transactionId: string;
    results: CommentResult[];
};