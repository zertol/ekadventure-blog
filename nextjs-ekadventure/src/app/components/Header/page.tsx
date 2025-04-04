"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import HeaderNavLink from "./NavLink";
import SocialIcons from "../SocialIcons/page";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isAboutPage = pathname === "/about";

  useEffect(() => {
    if (!isAboutPage) {
      const handleScroll = () => {
        const scrollPosition = window.scrollY;
        setIsScrolled(scrollPosition > 50);
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [isAboutPage]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 px-4 py-[12px] transition-all duration-500 ${
          isScrolled || isAboutPage
            ? "bg-background-green-accent"
            : "bg-transparent"
        }`}
      >
        <div className="container container-max-w-none pl-c-25 pr-c-25">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center w-[30%]">
              <Image
                src="/images/Logo_Site-Horizontal_UPG.png"
                alt="EkAdventure Logo"
                width={500}
                height={500}
                layout="intrinsic"
                className={`transition-all duration-500 h-auto ${
                  isScrolled ? "w-[120px]" : "w-[180px]"
                }`}
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8 w-[70%] md:items-center md:justify-center">
              <HeaderNavLink href="/">HOME</HeaderNavLink>
              <HeaderNavLink href="/blog">BLOG</HeaderNavLink>
              <HeaderNavLink href="/shop">SHOP</HeaderNavLink>
              <HeaderNavLink href="/about">ABOUT</HeaderNavLink>
              <HeaderNavLink href="/contact">CONTACT</HeaderNavLink>
            </nav>

            {/* Search Bar */}
            <div className="hidden md:flex md:justify-end relative w-[30%]">
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
                className="w-6 h-6"
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

      {/* Mobile Menu */}
      <div
        className={`fixed inset-x-0 top-[91px] bg-background-green-accent z-[100] max-h-0 h-56 overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? "max-h-56 h-56" : "max-h-0"
        } md:hidden`}
      >
        <div
          className={`flex-start-col w-full h-full transform transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          } `}
        >
          <nav className="flex flex-col justify-between gap-0 w-full h-full text-center">
            <HeaderNavLink href="/" onClick={toggleMobileMenu}>
              HOME
            </HeaderNavLink>
            <HeaderNavLink href="/blog" onClick={toggleMobileMenu}>
              BLOG
            </HeaderNavLink>
            <HeaderNavLink href="/shop" onClick={toggleMobileMenu}>
              SHOP
            </HeaderNavLink>
            <HeaderNavLink href="/about" onClick={toggleMobileMenu}>
              ABOUT
            </HeaderNavLink>
            <HeaderNavLink href="/contact" onClick={toggleMobileMenu}>
              CONTACT
            </HeaderNavLink>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
