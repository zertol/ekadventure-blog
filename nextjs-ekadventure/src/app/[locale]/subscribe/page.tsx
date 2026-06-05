"use client";
import NewsLetterForm from "@/components/UI/Common/Form/NewsLetterForm/page";
import { useTranslations } from "next-intl";
import { HikerImage } from "@/components/UI/Common/Hiker/HikerImage";
import HelpButtons from "@/components/UI/Common/HelpButtons/page";

const SubscribePage: React.FC = () => {
  const tLetter = useTranslations("Newsletter");

  return (
    <div className="h-screen flex flex-col justify-start md:justify-center items-center overflow-auto">
      <div className="container px-c-25 lg:px-0">
        <div className="flex flex-col lg:flex-row justify-center gap-4 min-h-[400px]">
          <HikerImage />
          <div className="w-full lg:w-[50%] flex flex-col items-center lg:items-start lg:justify-center text-center lg:text-left">
            <div className="lg:w-[80%]">
              <HelpButtons />
              <div className="bg-background-green-accent p-[10px] md:p-4 rounded-md w-full text-center mb-4">
                <h2 className="font-semibold mb-2">
                  {tLetter("newsletterTitle")}
                </h2>
                <p className="text-text-dark font-semibold mb-3 text-sm/5">
                  {tLetter("newsletterDescription")}
                </p>
                <NewsLetterForm newsLetterAction="subscribe" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscribePage;