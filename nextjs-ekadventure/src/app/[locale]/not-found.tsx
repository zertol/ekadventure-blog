"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import HelpButtons from "@/components/UI/Common/HelpButtons/page";
import SearchBox from "@/components/UI/Common/SearchBox/page";
import { HikerImage } from "@/components/UI/Common/Hiker/HikerImage";

export default function NotFound() {
  const tNotFound = useTranslations("NotFound");

  return (
    <div className="h-screen flex-center-col overflow-auto">
      <div className="container px-c-25 lg:px-0">
        <div className="flex flex-col lg:flex-row justify-center gap-4 min-h-[400px]">
          <HikerImage />
          <div className="w-full lg:w-[50%] flex flex-col items-center lg:items-start lg:justify-center text-center lg:text-left">
            <div className="lg:w-[80%]">
              <h1 className="leading-7 md:leading-9 mb-2 text-xl md:text-[30px]">
              {tNotFound("notFoundTitle")}
              </h1>

              <p className="mb-4 md:mb-6 text-lg md:text-2xl font-ps leading-6 md:leading-7">
                {tNotFound("notFoundHelpText")}
              </p>

              <HelpButtons />

              <div className="bg-background-green-accent p-[10px] md:p-4 rounded-md w-full text-center">
                <h3 className="md:text-2xl font-semibold mb-2">
                  {tNotFound("notFoundStillCantFind")}
                </h3>
                <p className="text-white font-semibold mb-3 text-sm/5">
                  {tNotFound("notFoundTrySearching")}
                </p>
                <SearchBox isInContainer={true} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
