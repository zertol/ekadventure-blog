import React from "react";
import Image from "next/image";

export const HikerImage: React.FC = () => {
  return (
    <div className="relative w-full lg:w-[50%] h-[200px] md:h-[300px] lg:h-auto">
      <Image
        src="/images/hiker_not_found.png"
        alt="Contact"
        fill
        className="inset-0 w-full h-full object-contain rounded-lg"
      />
    </div>
  );
};