import React, { useState } from "react";
import AccordionItem from "./AccordionItem";

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionItemsProps {
  items: AccordionItem[];
}

const AccordionItems: React.FC<AccordionItemsProps> = ({ items }) => {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  return (
    <div className="rounded-lg">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          question={item.question}
          answer={item.answer}
          isActive={activeAccordion === index}
          onClick={() => toggleAccordion(index)}
        />
      ))}
    </div>
  );
};

export default AccordionItems;
