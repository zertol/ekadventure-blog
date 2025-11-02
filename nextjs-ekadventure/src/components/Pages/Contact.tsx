"use client";

import React, { useState } from "react";
import { usePages } from "@/store/PagesContext";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { ContactType } from "@/types/contact-type";
import { sendContactMail } from "@/api/controllers/contact";
import FormInput from "../UI/Common/Form/FormInput/FormInput";
import SubmitStatus from "../UI/Common/Form/SubmitStatus/page";

const Contact: React.FC = () => {
  const { pages } = usePages();
  const contactPage = pages.find((page) => page.slug === "contact");

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
  } = useForm<ContactType>();

  const onReset = () => {
    setTimeout(() => {
      setSubmitStatus({ type: null, message: "" });
    }, 3000);
  };

  const onSubmit = async (data: ContactType) => {
    setIsLoading(true);
    try {
      const response = await sendContactMail(data);

      if (response.ErrorMessages && response.ErrorMessages.length > 0) {
        throw new Error(response.ErrorMessages.join(","));
      }

      setSubmitStatus({
        type: "success",
        message: "Thank you for your message! We'll get back to you soon.",
      });

      reset();
    } catch (error) {
      console.error("Form submission error:", error);

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
    <div className="contact-page px-c-25 lg:px-[60px] mb-c-60">
      {/* Main Content */}
      <div className="container container-max-w-1280 mx-auto mt-28">
        {/* Title */}
        <h1 className="text-[48px] font-bold font-ps text-center mb-12">
          Can&apos;t wait to hear from you!
        </h1>

        {/* Content Grid */}
        <div className="flex flex-col lg:flex-row gap-8 min-h-[700px]">
          {/* Left Column */}
          <div className="lg:flex-1 flex flex-col">
            {/* Text Content */}
            <div className="flex-center-col text-center p-4 mb-4">
              <div className="mb-4">
                <p>
                  Whether it&apos;s for working together or just simply sharing
                  your adventure, I will be so thrilled to read all about it!
                </p>
                <p>
                  As I mostly will be adventuring and it might take a while,
                  rest assured that I will take the time to reply to every mail
                  personally!
                </p>
              </div>
              <span className="block w-24 h-1 bg-black"></span>
            </div>

            {/* Contact Form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              onReset={onReset}
              className="flex-1 flex flex-col space-y-4 bg-background-green-accent p-6 rounded-lg box-shadow-quote"
            >
              {/* Name Field */}
              <FormInput
                label="name"
                type="text"
                placeholder="Your Name"
                register={register}
                required={true}
                error={errors.name?.message}
                className="contact-form-input"
              />

              {/* Email Field */}
              <FormInput
                label="email"
                type="email"
                placeholder="Your Email"
                register={register}
                required={true}
                error={errors.email?.message}
                className="contact-form-input"
              />

              {/* Subject Field */}
              <FormInput
                label="subject"
                type="text"
                placeholder="Subject"
                register={register}
                required={true}
                error={errors.subject?.message}
                className="contact-form-input"
              />

              {/* Message Field */}
              <FormInput
                label="message"
                type="textarea"
                placeholder="Message"
                register={register}
                required={true}
                error={errors.message?.message}
                className="contact-form-input"
              />

              {/* Submit Button */}
              <div className="flex flex-col items-center">
                <button
                  type="submit"
                  className="bg-background-blue-accent text-white tracking-wide px-8 py-2 font-bold text-[12px]
                   rounded-sm hover:bg-background-dark transition-colors duration-300"
                >
                  SUBMIT
                </button>
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
            </form>
          </div>

          {/* Right Column - Image */}
          {contactPage?.imageUrl ? (
            <div className="h-[250px] lg:h-auto lg:flex-1 relative">
              <Image
                src={contactPage?.imageUrl}
                alt="Contact"
                fill
                className="absolute inset-0 w-full h-full object-cover rounded-lg"
              />
            </div>
          ) : (
            <div className="h-[250px] lg:h-auto lg:flex-1 relative flex flex-col items-center justify-center">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-background-green-accent border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-white font-ps text-lg">
                  Loading your adventure...
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
