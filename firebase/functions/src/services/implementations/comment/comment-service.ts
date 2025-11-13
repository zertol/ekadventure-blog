import { ICMSClient } from "../../../cms/shared/interfaces/i-cms-client";
import { CommentType } from "../../../types/domain/comment-type";
import { ICommentService } from "../../interfaces/i-comment-service";

export class CommentService implements ICommentService {
    constructor(private cmsClient: ICMSClient) { }

    async addComment(comment: CommentType): Promise<void> {
        return await this.cmsClient.getRepositories().comment.addComment(comment);
    }
}