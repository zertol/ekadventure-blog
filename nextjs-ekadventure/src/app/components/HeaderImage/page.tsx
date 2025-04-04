import React, { ReactNode } from "react";
import SocialIcons from "../SocialIcons/page";

interface HeaderImageProps {
  text: ReactNode;
  backgroundImage: string;
  roundedImage?: string;
}

const HeaderImage: React.FC<HeaderImageProps> = ({
  text,
  backgroundImage,
  roundedImage = "/images/default-rounded.jpg",
}) => {
  return (
    <div
      className="relative h-[600px] w-full"
      style={{
        backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 30%, rgba(0,0,0,0.1) 100%), url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 flex-center-col justify-end pb-10">
        {/* Text container */}
        <div className="text-center text-white mb-[10px] max-w-3xl px-4">
          {text}
        </div>

        {/* Rounded image */}
        <div
          className="w-20 h-20 rounded-full mb-c-30 shadow-lg"
          style={{
            backgroundImage: `url(${roundedImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        {/* Social media links */}
        <div>
          <SocialIcons className="text-white" />
        </div>
      </div>
    </div>
  );
};

// Add some Tailwind directive/custom styles
/* Tailwind custom styles 
@layer components {
  .header-social-icon {
    @apply w-8 h-8 text-white opacity-80 hover:opacity-100 transition-opacity;
  }
}
*/

export default HeaderImage;
