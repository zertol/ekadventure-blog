import React from "react";

export const HikerHeaderText: React.FC<{ className?: string, children: React.ReactNode }> = ({ children, className }) => {
  return (
    <h1 className={`leading-7 md:leading-9 mb-4 text-2xl md:text-[30px] ${className || ""}`}>
      {children}
    </h1>
  );
};
