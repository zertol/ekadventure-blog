"use client";

import React, { useMemo } from "react";
import CommentForm from "./CommentForm";
import SingleComment from "./SingleComment";
import { useComments } from "@/store/CommentsContext";
import { useTranslations } from "next-intl";

const Comments: React.FC = () => {
  const { comments: allComments } = useComments();
  const tComments = useTranslations("Comments");

  const totalComments: number = useMemo(() => {
    const calculateTotalComments = (comments: CommentType[]): number => {
      return comments.reduce((total, comment) => {
        const repliesCount = comment.replies
          ? calculateTotalComments(comment.replies)
          : 0;
        return total + 1 + repliesCount;
      }, 0);
    };
    return calculateTotalComments(allComments);
  }, [allComments]);

  return (
    <div className="mt-c-60">
      <h2 className="text-2xl font-bold mb-6">
        {totalComments === 1 ? tComments("oneComment") : tComments("nbComments", {0: totalComments})}
      </h2>

      <div className="mb-8">
        <CommentForm />
      </div>

      <div className="space-y-4">
        {allComments.map((comment: CommentType) => (
          <React.Fragment key={comment.id}>
            <SingleComment comment={comment} />
            <div className="flex-center-row">
              <div className="border-b-2 border-gray-300 w-60 "></div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Comments;
