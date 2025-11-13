import { CommentType } from "../../../types/domain/comment-type";

export interface ICommentRepository {
    addComment(comment: CommentType): Promise<void>;
}