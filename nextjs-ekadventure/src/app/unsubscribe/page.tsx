"use client";
import Image from "next/image";
import PrimaryButton from "@/components/UI/Common/PrimaryButton/page";
import { useSearch } from "@/utils/hooks/use-search";
import { useRef, useState } from "react";
import { SearchResuls } from "@/components/UI/Common/SearchResults/page";
import { useForm } from "react-hook-form";
import { handleMailService } from "@/api/controllers/contact";
import SubmitStatus from "@/components/UI/Common/Form/SubmitStatus/page";
import FormInput from "@/components/UI/Common/Form/FormInput/FormInput";

const Footer: React.FC = () => {
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
      const response = await handleMailService(subscriberData, "unsubscribe");

      if (response.ErrorMessages && response.ErrorMessages.length > 0) {
        throw new Error(response.ErrorMessages.join(","));
      }

      setSubmitStatus({
        type: "success",
        message: "You have been successfully unsubscribed from our mailing list.",
      });

      reset();
    } catch (error) {
      console.error("Form submission error:", JSON.stringify(error));

      setSubmitStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Failed to send message. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex-center-col overflow-auto">
      <div className="container px-c-25 lg:px-0">
        <div className="flex flex-col lg:flex-row justify-center gap-4 min-h-[400px]">
          <div className="relative w-full lg:w-[50%] h-[200px] md:h-[300px] lg:h-auto">
            <Image
              src="/images/hiker_not_found.png"
              alt="Contact"
              fill
              className="inset-0 w-full h-full object-contain rounded-lg"
            />
          </div>
          <div className="w-full lg:w-[50%] flex flex-col items-center lg:items-start lg:justify-center text-center lg:text-left">
            <div className="lg:w-[80%]">
              <h1 className="leading-7 md:leading-9 mb-4 text-2xl md:text-[30px]">
                We&apos;re sorry to see you go!
              </h1>

              <p className="mb-4 md:mb-6 text-lg md:text-2xl font-ps leading-6 md:leading-7">
                Not ready to unsubscribe? We&apos;d love for you to stay! Check out some of our latest adventures and tips to keep your outdoor spirit alive.
              </p>

              <div className="flex gap-4 mb-6 justify-center">
                <PrimaryButton
                  href="/"
                  text="📍 Trailhead"
                  className="font-ps py-0 font-bold text-[14px] md:text-[18px]"
                />
                <PrimaryButton
                  href="/blog"
                  text="🥾 Adventures"
                  className="font-ps py-0 font-bold text-[14px] md:text-[18px]"
                />
                <PrimaryButton
                  href="/contact"
                  text="📞 Get Help"
                  className="font-ps py-0 font-bold text-[14px] md:text-[18px]"
                />
              </div>

              <p className="mb-2 text-lg font-ps leading-6 md:leading-7">
                If you still wish to unsubscribe from our mailing list, enter your email below:
              </p>

              <div className="bg-background-green-accent p-[10px] md:p-4 rounded-md w-full text-center">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  onReset={onReset}
                  className="w-full"
                >
                  <div className="flex flex-row w-full overflow-hidden">
                    <FormInput
                      label="email"
                      type="email"
                      placeholder="example@mail.com"
                      register={register}
                      required={true}
                      className={`${errors.email?.message ? "border-red-900" : "border-gray-300"} flex-1 w-full px-4 py-2 bg-white text-gray-800 font-primary focus:outline-none`}
                    />
                    <button
                      type="submit"
                      className="bg-background-blue-accent text-white px-6 py-2 whitespace-nowrap hover:bg-background-dark  transition-colors"
                    >
                      UNSUBSCRIBE
                    </button>
                  </div>
                </form>
                <div className="mt-2 w-full">
                  {errors.email?.message && (
                    <span className="text-red-900 text-sm">
                      {errors.email?.message}
                    </span>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;