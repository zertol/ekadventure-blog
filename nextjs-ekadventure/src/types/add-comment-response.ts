type CommentResult = {
    id: string;
    operation: string;
};

type AddCommentResponse = {
    transactionId: string;
    results: CommentResult[];
};