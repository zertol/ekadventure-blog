import { handleApiRequest } from "@/utils/api/handle-api-request";

export const addComment = async (comment: CommentType): Promise<ApiResult<void>> => {
    return await handleApiRequest<void>("https://addcomment-zsszt3mtmq-uc.a.run.app", {
        method: "POST",
        body: JSON.stringify(comment),
    });
}