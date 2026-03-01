"use client";

import { useForm } from "react-hook-form";
import FormInput from "../FormInput/FormInput";
import { useState } from "react";
import { handleMailService } from "@/api/controllers/contact";
import { useTranslations } from "next-intl";
import SubmitStatus from "../SubmitStatus/page";

interface NewsLetterFormProps {
  newsLetterAction: "subscribe" | "unsubscribe";
}

const NewsLetterForm: React.FC<NewsLetterFormProps> = ({
  newsLetterAction,
}) => {
  const tLetter = useTranslations("Newsletter");

  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SubscriberType>();

  const onReset = () => {
    setTimeout(() => {
      setSubmitStatus({ type: null, message: "" });
    }, 3000);
  };

  const onSubmit = async (subscriberData: SubscriberType) => {
    setIsLoading(true);
    try {
      const response = await handleMailService(
        subscriberData,
        newsLetterAction,
      );

      if (response.ErrorMessages && response.ErrorMessages.length > 0) {
        throw new Error(response.ErrorMessages.join(","));
      }

      setSubmitStatus({
        type: "success",
        message: newsLetterAction === "subscribe"
          ? tLetter("subscribeSuccessMessage")
          : tLetter("unsubscribeSuccessMessage"),
      });

      reset();
    } catch (error) {
      console.error("Form submission error:", error);

      setSubmitStatus({
        type: "error",
        message: tLetter("errorMessage")
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        onReset={onReset}
        className="w-full"
        noValidate
      >
        <div className="flex flex-row w-full overflow-hidden">
          <FormInput
            label={tLetter("emailLabel")}
            type="email"
            placeholder={tLetter("emailPlaceholder")}
            register={register}
            required={true}
            className={`${errors.email?.message ? "border-red-900" : "border-gray-300"} flex-1 w-full px-4 py-2 bg-white text-gray-800 font-primary focus:outline-none`}
            registrationName="email"
          />
          <button
            type="submit"
            className="bg-background-blue-accent text-white px-6 py-2 whitespace-nowrap hover:bg-background-dark transition-colors"
          >
            {newsLetterAction === "subscribe"
              ? tLetter("subscribeButtonText")
              : tLetter("unsubscribeButtonText")}
          </button>
        </div>
      </form>
      <div className="mt-2 w-full">
        {errors.email?.message && (
          <span className="text-red-900 text-sm">{errors.email?.message}</span>
        )}
        {isLoading && (
          <div className="mt-4 flex justify-center">
            <div className="w-8 h-8 border-4 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        {submitStatus.type && (
          <div className="mt-4">
            <SubmitStatus
              type={submitStatus.type}
              message={submitStatus.message}
              textColor="text-white"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default NewsLetterForm;