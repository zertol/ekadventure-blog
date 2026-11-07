import React from "react";
import SocialIcon from "../SocialIcon/page";

interface SocialIconsProps {
  className?: string;
  isSidebar?: boolean;
  isButtonStyle?: boolean;
}

const SOCIAL_LINKS = [
  { icon: "youtube", href: "https://youtube.com/@e.kadventure", displayName: "YouTube" },
  { icon: "instagram", href: "https://instagram.com/e.kadventure", displayName: "Instagram" },
  { icon: "facebook", href: "https://facebook.com/e.kadvnture", displayName: "Facebook" },
  { icon: "tiktok", href: "https://tiktok.com/@e.kadventure", displayName: "TikTok" }
] as const;

const SocialIcons: React.FC<SocialIconsProps> = ({
  className = "",
  isSidebar,
  isButtonStyle
}) => {
  return (
    <div className={`flex flex-wrap gap-2 md:gap-4 ${className}`}>
      {SOCIAL_LINKS.map((social) => (
        <SocialIcon
          key={social.icon}
          icon={social.icon}
          href={social.href}
          displayName={social.displayName}
          isSidebar={isSidebar}
          isButtonStyle={isButtonStyle}
        />
      ))}
    </div>
  );
};

export default SocialIcons;
