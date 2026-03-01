"use client";
import React, { useState } from "react";
import Image from "next/image";
import HeaderNavLink from "../Header/NavLink";
import SocialIcons from "@/components/UI/Common/SocialIcons/page";
import { usePages } from "@/store/PagesContext";
import { PageType } from "@/types/page-type";
import { useTranslations } from "next-intl";
import NewsLetterForm from "@/components/UI/Common/Form/NewsLetterForm/page";
import { ClientAdWrapper } from "@/components/Ads/ClientAdWrapper";
import HorizontalAd from "@/components/Ads/HorizontalAd";
import { useCookieConsent } from "@/store/CookieConsentContext";
import { usePathname } from "@/i18n/navigation";
import LocaleSelect from "@/components/UI/Footer/LocaleSelect/page";

const Footer: React.FC = () => {
  const { pages } = usePages();
  const menuItems = pages.sort((a: PageType, b: PageType) => a.order - b.order);

  const tLetter = useTranslations("Newsletter");
  const tFooter = useTranslations("Footer");

  const { isFirstVisit, openModal } = useCookieConsent();

  const pathName = usePathname();

  const [adHeight, setAdHeight] = useState(0);

  // We only care about the height if it's not the first visit
  const effectiveMargin = !isFirstVisit && adHeight > 0 ? adHeight + 50 : 0;

  return (
    <footer className="bg-[#2D2D2D] text-white">
      <div className="container-max-w-1280 mx-auto px-[15px] md:px-[25px] py-[20px]">
        <div className="flex flex-col md:flex-row justify-between items-center md:gap-4 gap-8 max-w-6xl mx-auto">
          <div className="flex-center-col space-y-6">
            <Image
              src="/images/Logo_Site_CUT_FOOTER.png"
              alt="Ekadventure Logo"
              width={200}
              height={200}
              className="w-[260px] h-auto"
            />
            <SocialIcons />
          </div>

          <nav className="space-y-3 hidden lg:block">
            {menuItems.map((page: PageType) => (
              <HeaderNavLink
                key={page.slug}
                href={`${
                  page.slug?.toLowerCase().includes("http")
                    ? page.slug
                    : page.slug?.toLocaleLowerCase() === "home"
                      ? "/"
                      : "/" + page.slug
                }`}
              >
                {page.title.toUpperCase()}
              </HeaderNavLink>
            ))}
          </nav>

          {/* Newsletter Subscription */}
          <div className="w-full md:w-auto md:max-w-sm">
            <div className="flex items-center justify-center mb-6">
              <LocaleSelect />
            </div>
            <div className="bg-background-green-accent p-[10px] md:p-4 rounded-md w-full text-center">
              <h3 className="md:text-2xl font-semibold mb-2">
                {tLetter("newsletterTitle")}
              </h3>
              <p className="text-text-dark font-semibold mb-3 text-sm/5">
                {tLetter("newsletterDescription")}
              </p>
              <NewsLetterForm newsLetterAction="subscribe" />
            </div>
          </div>
        </div>
      </div>

      {/* Divider - full width */}
      <div className="w-full h-[1px] bg-background-primary mt-4" />

      {/* Copyright container */}
      <div
        className="py-1 flex flex-col justify-center items-center gap-1"
        style={{
          marginBottom: effectiveMargin, // Add margin at the bottom based on ad height
        }}
      >
        <p className="text-center">© {new Date().getFullYear()} Elie Kadoury</p>
        {pathName !== "/privacy-policy" && (
          <div className={`flex flex-row`}>
            <a
              href="/privacy-policy"
              target="_blank"
              className="text-[10px] text-center underline hover:text-gray-300 transition-colors"
            >
              {tFooter("privacyPolicyLinkText")}
            </a>
            <button
              onClick={() => openModal()}
              className="bg-transparent p-0 ml-1 text-[10px] underline hover:text-gray-300 transition-colors hover:bg-transparent"
            >
              {tFooter("manageCookiesLinkText")}
            </button>
          </div>
        )}
      </div>
      <ClientAdWrapper
        headerText="Google"
        className="fixed bottom-0 left-auto z-50 flex flex-col justify-center w-full"
        onHeightChange={setAdHeight}
      >
        <div className="w-full flex justify-center">
          <div className="w-full md:w-[768px]">
            <HorizontalAd adSlot="7868749713" />
          </div>
        </div>
      </ClientAdWrapper>
    </footer>
  );
};

export default Footer;
