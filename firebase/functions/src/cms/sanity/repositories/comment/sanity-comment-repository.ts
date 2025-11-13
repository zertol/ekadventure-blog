import { Constants } from "../../../../Constants";
import { CommentAddResultType } from "../../../../types/domain/comment-add-result-type";
import { CommentType } from "../../../../types/domain/comment-type";
import { SanityError } from "../../../../types/sanity/sanity-error";
import { SanityMutateResult } from "../../../../types/sanity/sanity-mutate-result";
import { formatString } from "../../../../utils/extensions";
import { ICommentRepository } from "../../../shared/interfaces/i-comment-repository";

export class SanityCommentRepository implements ICommentRepository {
    async addComment(comment: CommentType): Promise<CommentAddResultType> {
        const response = await fetch(
            `${formatString(Constants.SANITY_BASE_URL, process.env.SANITY_PROJECT_ID)}/mutate/production`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${process.env.SANITY_TOKEN}`
                },
                body: JSON.stringify({
                    mutations: [
                        {
                            create: {
                                _type: "comment",
                                comment: comment.comment,
                                post: {
                                    _type: "reference",
                                    _ref: comment.postId
                                },
                                parent: comment.parentId ? {
                                    _type: "reference",
                                    _ref: comment.parentId
                                } : undefined,
                                name: comment.name,
                                email: comment.email,
                                isAuthor: comment.isAuthor,
                                approved: comment.approved
                            }
                        }
                    ],
                    returnIds: true
                })
            }
        );

        if (!response.ok) {
            const errorData = (await response.json()) as SanityError;
            throw new Error(`Sanity fetch error: ${JSON.stringify(errorData.error)}`);
        }

        return response.json().then((data: SanityMutateResult) => {
            return { commentId: data.results[0].id };
        });
    }
}