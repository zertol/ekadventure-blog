import React, { useState } from "react";
import Image from "next/image";
import HeaderNavLink from "../Header/NavLink";
import SocialIcons from "@/components/UI/Common/SocialIcons/page";
import { useForm } from "react-hook-form";
import { handleMailService } from "@/api/controllers/contact";
import SubmitStatus from "@/components/UI/Common/Form/SubmitStatus/page";
import FormInput from "@/components/UI/Common/Form/FormInput/FormInput";
import GoogleAd from "@/components/Ads/GoogleAd";

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
      const response = await handleMailService(subscriberData, "subscribe");

      if (response.ErrorMessages && response.ErrorMessages.length > 0) {
        throw new Error(response.ErrorMessages.join(","));
      }

      setSubmitStatus({
        type: "success",
        message: "Thank you for subscribing! it's great to have you on board.",
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
    <footer className="bg-[#2D2D2D] text-white">
      <div className="container-max-w-1280 mx-auto px-[15px] md:px-[25px] py-[20px]">
        <div className="flex flex-col md:flex-row justify-between items-center md:gap-4 gap-8 max-w-6xl mx-auto">
          <div className="flex-center-col space-y-6">
            <Image
              src="/images/Logo_Site_CUT_FOOTER.png"
              alt="EkAdventure Logo"
              width={200}
              height={200}
              className="w-[260px] h-auto"
            />
            <SocialIcons />
          </div>

          <nav className="space-y-3 hidden lg:block">
            <HeaderNavLink href="/">HOME</HeaderNavLink>
            <HeaderNavLink href="/blog">BLOG</HeaderNavLink>
            <HeaderNavLink href="/shop">SHOP</HeaderNavLink>
            <HeaderNavLink href="/about">ABOUT</HeaderNavLink>
            <HeaderNavLink href="/contact">CONTACT</HeaderNavLink>
          </nav>

          {/* Newsletter Subscription */}
          <div className="w-full md:w-auto md:max-w-sm">
            <div className="bg-background-green-accent p-[10px] md:p-4 rounded-md w-full text-center">
              <h3 className="md:text-2xl font-semibold mb-2">
                Never miss an adventure!
              </h3>
              <p className="text-text-dark font-semibold mb-3 text-sm/5">
                Stay up to date with my latest experiences and exclusive
                adventures I wanna share.
              </p>
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
                    SUBSCRIBE
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

      {/* Divider - full width */}
      <div className="w-full h-[1px] bg-background-primary mt-4" />

      {/* Copyright container */}
      <div className="py-1">
        <p className="text-center">
          © {new Date().getFullYear()} Elie Kadoury
        </p>
      </div>
      <GoogleAd adSlot="7868749713" />
    </footer>
  );
};

export default Footer;
