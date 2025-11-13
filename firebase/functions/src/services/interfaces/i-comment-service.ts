import { CommentType } from "../../types/domain/comment-type";

export interface ICommentService {
    addComment(comment: CommentType): Promise<void>;
}