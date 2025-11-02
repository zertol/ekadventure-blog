import Link from "next/link";
interface PrimaryButtonProps {
  text: string;
  href: string;
  className?: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  text,
  href,
  className,
}) => {
  return (
    <Link href={href} className={`primary-button ${className}`}>
      {text}
    </Link>
  );
};

export default PrimaryButton;
