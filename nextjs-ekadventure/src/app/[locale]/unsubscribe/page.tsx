"use client";
import Image from "next/image";
import NewsLetterForm from "@/components/UI/Common/Form/NewsLetterForm/page";
import { useTranslations } from "next-intl";
import HelpButtons from "@/components/UI/Common/HelpButtons/page";

const Unsubscribe: React.FC = () => {
  const tLetter = useTranslations("Newsletter");

  return (
    <div className="h-screen flex-center-col overflow-auto">
      <div className="container px-c-25 lg:px-0">
        <div className="flex flex-col lg:flex-row justify-center gap-4 min-h-[400px]">
          <div className="relative w-full lg:w-[50%] h-[200px] md:h-[300px] lg:h-auto">
            <Image
              src="/images/hiker_not_found.png"
              alt="Contact"
              fill
              className="inset-0 w-full h-full object-contain rounded-lg"
            />
          </div>
          <div className="w-full lg:w-[50%] flex flex-col items-center lg:items-start lg:justify-center text-center lg:text-left">
            <div className="lg:w-[80%]">
              <h1 className="leading-7 md:leading-9 mb-4 text-2xl md:text-[30px]">
                {tLetter("unsubscribeTitle")}
              </h1>

              <p className="mb-4 md:mb-6 text-lg md:text-2xl font-ps leading-6 md:leading-7">
                {tLetter("unsubscribeNotReadyMessage")}
              </p>

              <HelpButtons />

              <p className="mb-2 text-lg font-ps leading-6 md:leading-7">
                {tLetter("unsubscribeStillSureMessage")}
              </p>

              <div className="bg-background-green-accent p-[10px] md:p-4 rounded-md w-full text-center">
                <NewsLetterForm newsLetterAction="unsubscribe" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unsubscribe;