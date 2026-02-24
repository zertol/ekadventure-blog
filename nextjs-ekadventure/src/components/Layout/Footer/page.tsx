"use client";

import React, { useEffect, useRef, useState } from "react";
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
import PrimaryButton from "@/components/UI/Common/PrimaryButton/page";
import { usePathname } from "@/i18n/navigation";
import LocaleSelect from "@/components/UI/Footer/LocaleSelect/page";

const Footer: React.FC = () => {
  const [adVisible, setAdVisible] = useState({ isVisible: false, height: 0 });
  const adRef = useRef<HTMLModElement>(null!);

  const { pages } = usePages();
  const menuItems = pages.sort((a: PageType, b: PageType) => a.order - b.order);

  const tLetter = useTranslations("Newsletter");
  const tFooter = useTranslations("Footer");

  const { isFirstVisit, openModal } = useCookieConsent();

  const pathName = usePathname();

  useEffect(() => {
    const ad = adRef.current;
    if (!ad) return;

    setAdVisible({ isVisible: true, height: ad.offsetHeight });
  }, [adRef.current?.offsetHeight, isFirstVisit]);

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
          marginBottom: adVisible.height > 0 ? `${adVisible.height + 50}px` : 0,
        }}
      >
        <p className="text-center">
          © {new Date().getFullYear()} Elie Kadoury
        </p>
        {pathName !== "/privacy-policy" && (
          <div className={`flex flex-row`}>
            <a
              href="/privacy-policy"
              target="_blank"
              className="text-[10px] text-center underline hover:text-gray-300 transition-colors"
            >
              {tFooter("privacyPolicyLinkText")}
            </a>
            <PrimaryButton
              href="#"
              handleClick={() => openModal()}
              text="Manage Cookies"
              className="bg-transparent p-0 ml-1 text-[10px] underline hover:text-gray-300 transition-colors hover:bg-transparent"
            />
          </div>
        )}
      </div>
      <ClientAdWrapper
        headerText="Google"
        className="fixed bottom-0 left-auto z-50 flex flex-col justify-center w-full"
      >
        <div className="w-full flex justify-center">
          <div className="w-[768px]">
            <HorizontalAd ref={adRef} adSlot="7868749713" />
          </div>
        </div>
      </ClientAdWrapper>
    </footer>
  );
};

export default Footer;
