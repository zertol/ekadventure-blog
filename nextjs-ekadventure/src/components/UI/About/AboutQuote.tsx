import React from "react";

const AboutQuote: React.FC<{ quote: string }> = ({quote}) => {
  return (
    <div className="bg-background-blue-accent backdrop-blur-sm p-4 lg:p-6 rounded-lg box-shadow-quote">
      <blockquote className="text-[18px] lg:text-[20px] leading-5 font-bold text-center text-text-white-off font-ps">
        &quot;{quote}&quot;
      </blockquote>
    </div>
  );
};

export default AboutQuote;
