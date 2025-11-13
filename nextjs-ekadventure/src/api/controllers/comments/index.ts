import { handleApiRequest } from "@/utils/api/handle-api-request";

export const addComment = async (comment: CommentType): Promise<ApiResult<void>> => {
    return await handleApiRequest<void>("/api/comments", {
        method: "POST",
        body: JSON.stringify(comment),
    });
}