import React from "react";
import SocialIcon from "../SocialIcon/page";

interface SocialIconsProps {
  className?: string;
  isSidebar?: boolean;
}

const SOCIAL_LINKS = [
  { icon: "instagram", href: "https://instagram.com/e.kadventure" },
  { icon: "youtube", href: "https://youtube.com/@e.kadventure" },
  { icon: "facebook", href: "https://facebook.com/e.kadventure" },
  { icon: "tiktok", href: "https://tiktok.com/@e.kadventure" },
] as const;

const SocialIcons: React.FC<SocialIconsProps> = ({
  className = "",
  isSidebar = false,
}) => {
  return (
    <div className={`flex-center-row space-x-4 ${className}`}>
      {SOCIAL_LINKS.map((social) => (
        <SocialIcon
          key={social.icon}
          icon={social.icon}
          href={social.href}
          isSidebar={isSidebar}
        />
      ))}
    </div>
  );
};

export default SocialIcons;
