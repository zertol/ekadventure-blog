"use client";

import React from "react";
import SocialIcons from "../SocialIcons/page";
import Image from "next/image";

export interface HeaderImageProps {
  text?: {firstPart: string, secondPart: string};
  displayImage?: ImageType;
  roundedImage?: string;
}

const HeaderImage: React.FC<HeaderImageProps> = ({
  text,
  displayImage,
  roundedImage = "/images/profile-avatar.webp",
}) => {

  const headerImage = displayImage?.url || "/images/adventure-header.jpg";

  return (
    <div
      className="relative h-150 overflow-hidden after:absolute after:inset-0 after:bg-linear-to-b after:from-background-dark/40 after:from-0% after:via-background-dark/10 after:via-30% after:via-transparent after:via-70% after:to-background-primary after:to-100%"
      // style={{
      //   backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 30%, rgba(0,0,0,0.1) 100%), url(${headerImage})`,
      //   backgroundSize: "cover",
      //   backgroundPosition: "center",
      // }}
    >
      <img
        src={headerImage}
        alt={displayImage?.alt || "Header image"}
        className="absolute w-full h-full object-cover inset-0"
      />
    </div>













// <div className="absolute inset-0 flex-center-col justify-end pb-10">
//         {/* Text container */}
//         <div className="text-center text-white mb-[10px] max-w-3xl px-4">
//           {text && (
//             <h2 className="font-bold italic">
//               {text.firstPart}
//               {text.secondPart && (
//                 <>
//                   <br />{" "}
//                   <span className="font-ps text-[28px]">{text.secondPart}</span>
//                 </>
//               )}
//             </h2>
//           )}
//         </div>

//         {/* Rounded image */}
//         <div
//           className="w-20 h-20 rounded-full mb-c-30 shadow-lg"
//           style={{
//             backgroundImage: `url(${roundedImage})`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//           }}
//         ></div>

//         {/* Social media links */}
//         <div>
//           <SocialIcons className="text-white" />
//         </div>
//       </div>









  );
};

export default HeaderImage;
