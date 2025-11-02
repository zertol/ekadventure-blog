import FormInput from "@/components/UI/Common/Form/FormInput/FormInput";
import { useComments } from "@/store/CommentsContext";
import { CommentFormData } from "@/models/comments/comment-form-data";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import SubmitStatus from "@/components/UI/Common/Form/SubmitStatus/page";

interface CommentFormProps {
  parentId?: string;
  isReply?: boolean;
}

const CommentForm: React.FC<CommentFormProps> = ({
  parentId,
  isReply = false,
}) => {
  const {
    submitComment: addComment,
    isLoading,
    submitStatus,
    clearStatus,
  } = useComments();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentFormData>();

  const onSubmitForm = useCallback(
    async (data: CommentFormData) => {
      await addComment(data, parentId);
      reset();
    },
    [addComment, parentId, reset]
  );

  return (
    <>
      {!isReply && (
        <h3 className="text-xl font-semibold mb-4">Leave a Comment</h3>
      )}
      <form
        onSubmit={handleSubmit(onSubmitForm)}
        onReset={clearStatus}
        className="flex-1 flex flex-col space-y-4"
      >
        <>
          <FormInput
            label="comment"
            type="textarea"
            placeholder="Comment*"
            register={register}
            required={true}
            error={errors.comment?.message}
            className="comment-form-input webkit-autofill-override"
          />
          <FormInput
            label="name"
            type="text"
            placeholder="Name*"
            register={register}
            required={true}
            error={errors.name?.message}
            className="comment-form-input webkit-autofill-override"
          />
          <FormInput
            label="email"
            type="email"
            placeholder="Email*"
            register={register}
            required={true}
            error={errors.email?.message}
            className="comment-form-input webkit-autofill-override"
          />

          {/* Submit Button */}
          <div className="flex flex-col items-center lg:items-end">
            <button
              disabled={
                isLoading?.isLoading && isLoading?.parentId === parentId
              }
              type="submit"
              className={`bg-background-blue-accent text-white tracking-wide px-8 py-2 font-bold text-[12px]
                   rounded-sm hover:bg-background-dark 
                   transition-colors duration-200 relative ${
                     isLoading?.isLoading && isLoading?.parentId === parentId
                       ? "bg-background-dark opacity-70 text-white/70"
                       : ""
                   }`}
            >
              SUBMIT
              {isLoading?.isLoading && isLoading?.parentId === parentId && (
                <div className="absolute flex items-center justify-center inset-0">
                  <div className="w-6 h-6 border-4 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </button>
          </div>

          <div>
            {submitStatus.type && submitStatus.parentId === parentId && (
              <SubmitStatus
                type={submitStatus.type}
                message={submitStatus.message}
              />
            )}
          </div>
        </>
      </form>
    </>
  );
};

export default CommentForm;
