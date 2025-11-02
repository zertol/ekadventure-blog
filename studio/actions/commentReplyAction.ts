import { DocumentActionComponent, DocumentActionProps } from "sanity";
import { CommentType } from "../lib/types/comment-type";
import { ApiResult } from "../lib/types/api-result";
import { SanityCommentResult } from "../lib/types/sanity-comment-result";
import { useRouter } from "sanity/router";

interface PublishedComment {
  _id: string;
  post: {
    _ref: string;
    _type: string;
  };
}

export const commentReplyAction: DocumentActionComponent = (props: DocumentActionProps) => {
  const router = useRouter();
  const { published, onComplete } = props as { published: PublishedComment | null, onComplete: () => void };

  if (!published) return null;

  return {
    label: "Reply as Author",
    onHandle: async () => {
      onComplete();

      const newComment: CommentType = {
        id: "", // will be set by Sanity
        name: "EKadventure", // auto-fill
        email: "e.kadvnture@gmail.com",  // auto-fill
        isAuthor: true,
        comment: "", // leave empty for author to fill
        postId: published.post._ref, // same post reference
        parentId: published._id, // reference to the comment being replied to
        approved: true,
      };

      const response: ApiResult<SanityCommentResult> = await fetch("https://addcomment-zsszt3mtmq-uc.a.run.app", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newComment),
      }).then(res => res.json());

      if (response.Result && response.Result.results.length > 0) {
        const newDocId = response.Result.results[0].id;
        router.navigateIntent("edit", { id: newDocId, type: "comment" });
      }
    },
  };
};