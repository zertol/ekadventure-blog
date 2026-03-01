"use client";

import React, { ComponentProps } from "react";
import {Link} from "@/i18n/navigation";
import { usePathname } from "@/i18n/navigation";

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
  const isActive = pathname === href;

  const handleClick = () => {
    if (onClick) onClick();
  };

  type LinkProps = ComponentProps<typeof Link>;

  return (
    <div
      className={`py-1 lg:py-0 flex items-center transition-colors justify-center lg:justify-between
        lg:h-auto w-full lg:w-auto hover:bg-background-dark lg:hover:bg-transparent
        ${isActive ? "bg-background-dark lg:bg-transparent" : ""}`}
    >
      <Link
        href={href as LinkProps["href"]}
        onClick={handleClick}
        className={`text-white whitespace-nowrap uppercase tracking-wide transition-colors relative group
          lg:inline-block block w-full lg:w-auto font-semibold
        `}
      >
        {children}
        <span
          className={`absolute -bottom-1.5 left-0 w-full h-1 bg-white transition-all duration-200
            opacity-0 lg:block hidden
            ${isActive ? "opacity-100" : "group-hover:opacity-100"}
          `}
        ></span>
      </Link>
    </div>
  );
};

export default HeaderNavLink;
