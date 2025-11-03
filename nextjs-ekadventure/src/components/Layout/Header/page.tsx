"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import HeaderNavLink from "./NavLink";
import { usePages } from "@/store/PagesContext";
import { useParams } from "next/navigation";

const Header: React.FC<{ notFound?: boolean }> = ({ notFound }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isAboutPage = pathname === "/about";
  const isContactPage = pathname === "/contact";

  const params = useParams();
  const isBlogDetailsPage = !!params?.slug;

  const { pages } = usePages();
  const isScrollable =
    !isAboutPage && !isBlogDetailsPage && !isContactPage && !notFound;

  useEffect(() => {
    if (isScrollable) {
      const handleScroll = () => {
        const scrollPosition = window.scrollY;
        setIsScrolled(scrollPosition > 5);
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [isScrollable]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Sort pages by order property
  const menuItems = pages.sort((a, b) => a.order - b.order);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 px-3 md:pl-c-25 md:pr-c-25 py-[12px] transition-all duration-200 ${
          isScrolled || !isScrollable
            ? "bg-background-green-accent"
            : "bg-transparent"
        }`}
      >
        {/* Mobile Menu */}
        <div
          className={`absolute inset-x-0 top-[100%] bg-background-green-accent z-[100] max-h-0 h-56 overflow-hidden transition-all duration-200 ease-in-out ${
            isMobileMenuOpen ? "max-h-56 h-56" : "max-h-0"
          } md:hidden`}
        >
          <div
            className={`flex-start-col w-full h-full transform transition-all duration-200 ease-in-out ${
              isMobileMenuOpen ? "opacity-100" : "opacity-0"
            } `}
          >
            <nav className="flex flex-col justify-between gap-0 w-full h-full text-center">
              {menuItems.map((page) => (
                <HeaderNavLink
                  key={page.slug}
                  href={`/${
                    page.slug.toLowerCase().includes("home") ? "" : page.slug
                  }`}
                  onClick={toggleMobileMenu}
                >
                  {page.title.toUpperCase()}
                </HeaderNavLink>
              ))}
            </nav>
          </div>
        </div>

        <div className="container container-max-w-none ">
          <div className="flex items-center justify-between">
            <div className="flex items-center flex-1">
              <Link href="/">
                <Image
                  src="/images/Logo_Site-Horizontal_UPG.png"
                  alt="EkAdventure Logo"
                  width={500}
                  height={500}
                  className={`transition-all duration-200 h-auto ${
                    isScrolled || !isScrollable ? "w-[110px]" : "w-[150px]"
                  }`}
                />
              </Link>
            </div>

            <nav className="hidden md:flex space-x-5 lg:space-x-8 flex-1 md:items-center md:justify-center px-[45px] lg:px-0">
              {menuItems.map((page) => (
                <HeaderNavLink key={page.slug} href={`/${page.slug}`}>
                  {page.title.toUpperCase()}
                </HeaderNavLink>
              ))}
            </nav>

            <div className="hidden md:flex md:justify-end relative flex-1">
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent border-b border-white text-white placeholder-white/70 px-2 py-1 focus:outline-none w-[200px]"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={
                    isMobileMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
