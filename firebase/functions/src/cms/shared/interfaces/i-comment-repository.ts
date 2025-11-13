import { CommentAddResultType } from "../../../types/domain/comment-add-result-type";
import { CommentType } from "../../../types/domain/comment-type";

export interface ICommentRepository {
    addComment(comment: CommentType): Promise<CommentAddResultType>;
}