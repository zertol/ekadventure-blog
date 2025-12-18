"use client";
import Link from "next/link";
interface PrimaryButtonProps {
  text: string;
  href: string;
  className?: string;
  handleClick?: () => void;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  text,
  href,
  className,
  handleClick
}) => {
  return (
    <Link href={href} className={`primary-button ${className}`} onClick={handleClick}>
      {text}
    </Link>
  );
};

export default PrimaryButton;
