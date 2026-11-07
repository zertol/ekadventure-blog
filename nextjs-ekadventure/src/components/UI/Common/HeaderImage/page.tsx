"use client";

import React from "react";

export interface HeaderImageProps {
  text?: {firstPart: string, secondPart: string};
  displayImage?: ImageType;
  roundedImage?: string;
}

const HeaderImage: React.FC<HeaderImageProps> = ({
  displayImage
}) => {

  const headerImage = displayImage?.url || "/images/adventure-header.jpg";

  return (
    <div
      className=""
      // style={{
      //   backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 30%, rgba(0,0,0,0.1) 100%), url(${headerImage})`,
      //   backgroundSize: "cover",
      //   backgroundPosition: "center",
      // }}
    >
      <img
        src={headerImage}
        alt={displayImage?.alt || "Header image"}
        className="absolute w-full h-full object-cover object-center inset-0 z-[-2]"
      />

      {/* <Image
        src={headerImage}
        alt={displayImage?.alt || "Header image"}
        fill
        className="absolute object-cover inset-0"
      /> */}
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
