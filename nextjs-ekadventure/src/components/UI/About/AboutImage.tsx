"use client";

import React from "react";
import AboutQuote from "./AboutQuote";

interface AboutImageProps {
  featuredMedia?: ImageType;
}

const AboutImage: React.FC<AboutImageProps> = ({featuredMedia}) => {
  return (
    <div className="w-full lg:w-3/5 relative h-[400px]">
      <img
        src={featuredMedia?.url}
        alt={featuredMedia?.alt || "Adventure portrait"}
        className="object-cover rounded-lg w-full h-full"
      />
      <div className=" w-[80%] lg:w-[350px] absolute bottom-0 left-auto right-[50%] lg:right-0 lg:left-0 translate-x-[50%] translate-y-[50%] lg:translate-x-[-25%] lg:translate-y-[50%]">
        <AboutQuote />
      </div>
    </div>
  );
};

export default AboutImage;
