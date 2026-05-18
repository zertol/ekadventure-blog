import React from "react";

export const HikerDescrtiptionText: React.FC<{ text: React.ReactNode, className?: string }> = ({ text, className }) => {
  return (
    <p className={`mb-4 md:mb-6 text-lg md:text-2xl font-ps leading-6 md:leading-7 ${className || ""}`}>
        {text}
    </p>
    );  
};