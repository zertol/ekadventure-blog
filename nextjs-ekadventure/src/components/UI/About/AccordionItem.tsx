import React from "react";

interface AccordionItemProps {
  question: string;
  answer: string;
  isActive: boolean;
  onClick: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  question,
  answer,
  isActive,
  onClick,
}) => {
  return (
    <div className="border-b last:border-b-0">
      <button
        className="w-full px-4 py-3 text-left font-ps font-bold group bg-background-blue-accent "
        onClick={onClick}
      >
        <span
          className={`transform transition-transform text-[22px] text-white mr-2 group-hover:text-text-white-off ${
            isActive ? "rotate-180" : ""
          }`}
        >
          {isActive ? "-" : "+"}
        </span>
        <span className=" text-white text-[22px] group-hover:text-text-white-off">
          {question}
        </span>
      </button>
      <div
        className={`px-4 overflow-hidden transition-all duration-200 ${
          isActive ? "max-h-40 py-3" : "max-h-0"
        }`}
      >
        <p> {answer}</p>
      </div>
    </div>
  );
};

export default AccordionItem;
