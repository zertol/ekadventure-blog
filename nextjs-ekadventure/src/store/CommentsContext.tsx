"use client";

import { addComment } from "@/api/controllers/comments";
import { CommentFormData } from "@/models/comments/comment-form-data";
import React, { createContext, useContext, useEffect, useState } from "react";

type LoadingType = {
  parentId?: string;
  isLoading?: boolean;
};

type CommentsContextType = {
  comments: CommentType[];
  submitComment: (data: CommentFormData, parentId?: string) => Promise<void>;
  isLoading?: LoadingType;
  submitStatus: {
    parentId?: string;
    type: "success" | "error" | null;
    message: string;
  };
  clearStatus: () => void;
};

const CommentsContext = createContext<CommentsContextType | undefined>(
  undefined
);

export function CommentsProvider({
  children,
  initialComments = [],
  postId,
}: {
  children: React.ReactNode;
  initialComments?: CommentType[];
  postId: string;
}) {
  const [comments] = useState<CommentType[]>(initialComments);

  const [isLoading, setIsLoading] = useState<LoadingType>({ isLoading: false });

  const [submitStatus, setSubmitStatus] = useState<{
    parentId?: string;
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const clearStatus = () => {
    setTimeout(() => {
      setSubmitStatus({ type: null, message: "" });
    }, 3000);
  };

  const submitComment = async (data: CommentFormData, parentId?: string) => {
    setIsLoading({ parentId, isLoading: true });

    const newComment: CommentType = {
      ...data,
      id: "",
      createdAt: "",
      parentId: parentId,
      replies: [],
      postId,
    };

    const response = await addComment(newComment);

    if (response.ErrorMessages && response.ErrorMessages.length > 0) {
      setIsLoading({ parentId, isLoading: false });
      setSubmitStatus({
        parentId,
        type: "error",
        message: response.ErrorMessages.join(", "),
      });
      return;
    }

    setIsLoading({ parentId, isLoading: false });
    setSubmitStatus({
      parentId,
      type: "success",
      message: "Thank you for your comment! It will appear once approved.",
    });
  };

  return (
    <CommentsContext.Provider
      value={{
        comments,
        submitComment,
        isLoading,
        submitStatus,
        clearStatus,
      }}
    >
      {children}
    </CommentsContext.Provider>
  );
}

export const useComments = () => {
  const ctx = useContext(CommentsContext);
  if (!ctx) throw new Error("useComments must be inside CommentsProvider");
  return ctx;
};
