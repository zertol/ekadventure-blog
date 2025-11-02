import { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import { useComments } from "@/store/CommentsContext";
import SubmitStatus from "@/components/UI/Common/Form/SubmitStatus/page";

interface SingleCommentProps {
  comment: CommentType;
}

const SingleComment: React.FC<SingleCommentProps> = ({ comment }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const { submitStatus } = useComments();

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
          <h4 className="font-medium">{comment.name} {comment.isAuthor && <span className="text-xs text-gray-500">(Author)</span>}</h4>
          <p className="text-sm text-gray-500">
            {new Date(comment.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>
      <p className="mt-2 text-gray-700">{comment.comment}</p>
      <div className="justify-end flex">
        <button
          onClick={() => setShowReplyForm(!showReplyForm)}
          className="inline-flex items-center font-semibold text-background-blue-accent hover:underline hover:text-background-green-accent"
        >
          {!showReplyForm ? "Reply" : "Cancel"}
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
