"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePages } from "@/app/store/PagesContext";

interface HeaderNavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const HeaderNavLink: React.FC<HeaderNavLinkProps> = ({
  href,
  children,
  onClick,
}) => {
  const pathname = usePathname();
  const isActive = pathname === href || (href === "/home" && pathname === "/");
  const { setReadyComponents, setExpectedCount, setIsLoading } = usePages();
  const handleClick = () => {
    setIsLoading(true);
    setReadyComponents(0);
    setExpectedCount(0);
  };

  return (
    <div
      className={`h-[20%] flex items-center transition-colors justify-center md:justify-start
        md:h-auto w-full md:w-auto hover:bg-background-dark md:hover:bg-transparent
        ${isActive ? "bg-background-dark md:bg-transparent" : ""}`}
    >
      <Link
        href={href}
        onClick={handleClick}
        className={`text-white text-[14px] uppercase tracking-wide transition-colors relative group
          md:inline-block block w-full md:w-auto font-semibold
        `}
      >
        {children}
        <span
          className={`absolute -bottom-1.5 left-0 w-full h-1 bg-white transition-all duration-500
            opacity-0 md:block hidden
            ${isActive ? "opacity-100" : "group-hover:opacity-100"}
          `}
        ></span>
      </Link>
    </div>
  );
};

export default HeaderNavLink;
