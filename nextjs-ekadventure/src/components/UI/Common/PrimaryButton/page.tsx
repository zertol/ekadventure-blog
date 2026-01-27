"use client";
import { Link } from "@/i18n/navigation";
import NextLink from "next/link";
import { ComponentProps } from "react";
interface PrimaryButtonProps {
  text: string;
  href: string;
  className?: string;
  handleClick?: () => void;
  outsideLocale?: boolean;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  text,
  href,
  className,
  handleClick,
  outsideLocale,
}) => {
  if (outsideLocale) {
    return (
      <NextLink
        href={href}
        className={`primary-button ${className}`}
        onClick={handleClick}
      >
        {text}
      </NextLink>
    );
  }

  type LinkProps = ComponentProps<typeof Link>;

  return (
    <Link
      href={href as LinkProps["href"]}
      className={`primary-button ${className}`}
      onClick={handleClick}
    >
      {text}
    </Link>
  );
};

export default PrimaryButton;
