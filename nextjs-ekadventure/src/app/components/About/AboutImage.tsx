"use client";

import React from "react";
import Image from "next/image";
import AboutQuote from "./AboutQuote";

const AboutImage: React.FC<{ imageUrl: string }> = ({ imageUrl }) => {
  return (
    <div className="w-full lg:w-3/5 relative h-[400px]">
      <Image
        src={imageUrl}
        alt="Adventure portrait"
        fill
        className="object-cover rounded-lg"
        priority
      />
      <div className=" w-[80%] lg:w-[350px] absolute bottom-0 left-auto right-[50%] lg:right-0 lg:left-0 translate-x-[50%] translate-y-[50%] lg:translate-x-[-25%] lg:translate-y-[50%]">
        <AboutQuote />
      </div>
    </div>
  );
};

export default AboutImage;
