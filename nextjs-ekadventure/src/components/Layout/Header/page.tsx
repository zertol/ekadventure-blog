"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "@/i18n/navigation";
import { usePages } from "@/store/PagesContext";
import { useParams } from "next/navigation";
import { PageType } from "@/types/page-type";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import Logo from "./Logo";
import Hamburger from "./Hamburger";

const Header: React.FC<{ notFound?: boolean }> = ({ notFound }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileMenuClosing, setIsMobileMenuClosing] = useState(false);
  const pathname = usePathname();
  const isAboutPage = pathname === "/about";
  const isContactPage = pathname === "/contact";

  const params = useParams();
  const isBlogDetailsPage = !!params?.slug;
  const isVideoDetailsPage = !!params?.videoId;
  const isProductDetailsPage = !!params?.productId;

  const { pages } = usePages();
  // const isScrollable =
  //   !isAboutPage &&
  //   !isBlogDetailsPage &&
  //   !isContactPage &&
  //   !notFound &&
  //   !isVideoDetailsPage &&
  //   !isProductDetailsPage;

  // useEffect(() => {
  //   if (isScrollable) {
  //     const handleScroll = () => {
  //       const scrollPosition = window.scrollY;
  //       setIsScrolled(scrollPosition > 5);
  //     };

  //     window.addEventListener("scroll", handleScroll);
  //     return () => window.removeEventListener("scroll", handleScroll);
  //   }
  // }, [isScrollable]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuClosing(true);
    setTimeout(() => {
      setIsMobileMenuOpen(false);
      setIsMobileMenuClosing(false);
    }, 300);
  }

  // Sort pages by order property
  const menuItems = pages.sort((a: PageType, b: PageType) => a.order - b.order);

  return (
    <>
      <header
        className={`absolute top-0 left-0 right-0 z-[52] container-max-w-1280 mx-auto container-px-25 py-[12px] transition-all duration-200 bg-transparent h-auto`}
      >
        <div
          className={`flex items-center justify-center gap-1`}
        >
          <Logo />
          <DesktopNav menuItems={menuItems} />
          {isMobileMenuOpen && (
            <MobileNav
              menuItems={menuItems}
              isMobileMenuClosing={isMobileMenuClosing}
              closeMobileMenu={closeMobileMenu}
            />
          )}
          <Hamburger toggleMobileMenu={toggleMobileMenu} />
        </div>
      </header>
    </>
  );
};

export default Header;
