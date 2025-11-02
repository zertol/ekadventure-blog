export const addComment = async (comment: CommentType): Promise<ApiResult<AddCommentResponse>> => {
    const result: ApiResult<AddCommentResponse> = {
        Result: null,
        ErrorMessages: [],
    };

    try {
        const response: ApiResult<AddCommentResponse> = await fetch("https://addcomment-zsszt3mtmq-uc.a.run.app",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(comment)
            }
        ).then(res => res.json());

        if (response.ErrorMessages && response.ErrorMessages.length > 0) {
            result.ErrorMessages = response.ErrorMessages;
            return result;
        }

        result.Result = response.Result;
    } catch (err) {
        result.ErrorMessages?.push((err as Error).message);
    }

    return result;
}