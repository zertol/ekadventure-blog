import { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import { useComments } from "@/store/CommentsContext";
import SubmitStatus from "@/components/UI/Common/Form/SubmitStatus/page";
import { formatDate } from "@/utils/data/helpers";
import { useLocale } from "next-intl";
import { useTranslations } from "use-intl";

interface SingleCommentProps {
  comment: CommentType;
}

const SingleComment: React.FC<SingleCommentProps> = ({ comment }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const { submitStatus } = useComments();
  const locale = useLocale();
  const tComments = useTranslations("Comments");

  useEffect(() => {
    if (
      submitStatus.type === "success" &&
      submitStatus.parentId === comment.id
    ) {
      setShowReplyForm(false);
    }
  }, [submitStatus]);

  return (
    <div>
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-medium">
            {comment.name}{" "}
            {comment.isAuthor && (
              <span className="text-xs text-gray-500">({tComments("authorText")})</span>
            )}
          </h4>
          <p className="text-xs text-gray-500">
            {formatDate(comment.createdAt, locale)}
          </p>
        </div>
      </div>
      <p className="mt-2 text-gray-700 whitespace-pre-line">
        {comment.comment}
      </p>
      <div className="justify-end flex">
        <button
          onClick={() => setShowReplyForm(!showReplyForm)}
          className="inline-flex items-center font-semibold text-background-blue-accent hover:underline hover:text-background-green-accent"
        >
          {!showReplyForm ? tComments("replyButtonText") : tComments("cancelReplyButtonText")}
        </button>
      </div>

      {showReplyForm && (
        <div className="mt-2 ml-8 relative before:absolute before:left-[-1rem] before:top-0 before:bottom-0 before:w-0.5 before:bg-gray-200">
          <CommentForm parentId={comment.id} isReply={true} />
        </div>
      )}

      <div className="mt-2 mb-2">
        {submitStatus.type && submitStatus.parentId === comment.id && (
          <SubmitStatus
            type={submitStatus.type}
            message={submitStatus.message}
          />
        )}
      </div>

      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-8 relative before:absolute before:left-[-1rem] before:top-0 before:bottom-0 before:w-0.5 before:bg-gray-200">
          {comment.replies.map((reply) => (
            <SingleComment key={reply.id} comment={reply} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SingleComment;
