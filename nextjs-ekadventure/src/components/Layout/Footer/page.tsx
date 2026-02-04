"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import HeaderNavLink from "../Header/NavLink";
import SocialIcons from "@/components/UI/Common/SocialIcons/page";
import FooterAd from "@/components/Ads/FooterAd";
import { usePages } from "@/store/PagesContext";
import { PageType } from "@/types/page-type";
import { useTranslations } from "next-intl";
import NewsLetterForm from "@/components/UI/Common/Form/NewsLetterForm/page";
import LocaleSelect from "@/components/UI/Footer/LocaleSelect/page";

const Footer: React.FC = () => {
  const [adVisible, setAdVisible] = useState({ isVisible: false, height: 0 });
  const adRef = useRef<HTMLModElement>(null!);

  const { pages } = usePages();
  const menuItems = pages.sort((a: PageType, b: PageType) => a.order - b.order);

  const tLetter = useTranslations("Newsletter");
  const tFooter = useTranslations("Footer");

  useEffect(() => {
    const ad = adRef.current;
    if (!ad) return;

    setAdVisible({ isVisible: true, height: ad.offsetHeight });
  }, [adRef.current?.offsetHeight]);

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
             {/* <div className="flex items-center justify-center mb-6">
             <LocaleSelect />
            </div> */}
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
          marginBottom: adVisible.height > 0 ? `${adVisible.height + 40}px` : 0,
        }}
      >
        <p className="text-center">
          © {new Date().getFullYear()} Elie Kadoury
        </p>
        <a
          href="/privacy-policy"
          target="_blank"
          className="text-[10px] text-center underline"
        >
          {tFooter("privacyPolicyLinkText")}
        </a>
      </div>
      <FooterAd ref={adRef} />
    </footer>
  );
};

export default Footer;
