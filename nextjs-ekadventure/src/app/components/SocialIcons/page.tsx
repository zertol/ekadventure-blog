import React from "react";
import SocialIcon from "../SocialIcon/page";

interface SocialIconsProps {
  className?: string;
}

const SOCIAL_LINKS = [
  { icon: "instagram", href: "https://instagram.com/ekadventure" },
  { icon: "twitter", href: "https://twitter.com/ekadventure" },
  { icon: "youtube", href: "https://youtube.com/ekadventure" },
  { icon: "facebook", href: "https://facebook.com/ekadventure" },
] as const;

const SocialIcons: React.FC<SocialIconsProps> = ({ className = "" }) => {
  return (
    <div className={`flex-center-row space-x-4 ${className}`}>
      {SOCIAL_LINKS.map((social) => (
        <SocialIcon key={social.icon} icon={social.icon} href={social.href} />
      ))}
    </div>
  );
};

export default SocialIcons;
