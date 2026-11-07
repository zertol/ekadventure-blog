"use client";

import React, { useState } from "react";
import { usePathname } from "@/i18n/navigation";
import { usePages } from "@/store/PagesContext";
import { useParams } from "next/navigation";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import Logo from "./Logo";
import Hamburger from "./Hamburger";
import { MenuItemType } from "@/types/menu-item-type";

const Header: React.FC<{ notFound?: boolean }> = ({ notFound }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileMenuClosing, setIsMobileMenuClosing] = useState(false);
  const pathname = usePathname();
  const isAboutPage = pathname === "/about";
  const isContactPage = pathname === "/contact";

  const params = useParams();
  const isBlogDetailsPage = !!params?.slug;
  const isVideoDetailsPage = !!params?.videoId;
  const isProductDetailsPage = !!params?.productId;

  const { menus } = usePages();
  const isWithImage =
    !isAboutPage &&
    !isBlogDetailsPage &&
    !isContactPage &&
    !notFound &&
    !isVideoDetailsPage &&
    !isProductDetailsPage;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuClosing(true);
    setTimeout(() => {
      setIsMobileMenuOpen(false);
      setIsMobileMenuClosing(false);
    }, 300);
  };

  // Sort pages by order property
  const menuItems = [...menus].sort((a: MenuItemType, b: MenuItemType) => a.order - b.order);

  return (
    <>
      <header
        className={`absolute top-0 left-0 right-0 z-52 container-px-25 py-3 transition-all duration-200 h-auto ${
          !isWithImage
            ? "bg-background-green-accent h-auto "
            : "bg-transparent h-auto  container-max-w-1280 mx-auto"
        }`}>
        <div className={`flex items-center justify-center gap-1`}>

          <Logo isWithImage={isWithImage} />
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