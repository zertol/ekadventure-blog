"use client";

import { useEffect, useRef } from "react";
import NewsLetterForm from "../UI/Common/Form/NewsLetterForm/page";
import HelpButtons from "../UI/Common/HelpButtons/page";
import PrimaryLink from "../UI/Common/PrimaryLink/page";
import { HikerImage } from "../UI/Common/Hiker/HikerImage";
import { useTranslations } from "next-intl";
import { HikerHeaderText } from "../UI/Common/Hiker/HikerHeaderText";
import { HikerDescrtiptionText } from "../UI/Common/Hiker/HikerDescriptionText";

interface DownloadProps {
  downloadUrl: URLType | null;
}

const Download: React.FC<DownloadProps> = ({ downloadUrl }) => {
  const hasDownloaded = useRef(false);

  useEffect(() => {
    if (hasDownloaded.current) return;

    const triggerDownload = () => {
      if (hasDownloaded.current) return;
      hasDownloaded.current = true;

      const anchor = document.createElement("a");
      anchor.href = decodeURIComponent(downloadUrl?.url ?? "");
      anchor.download = "";
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    };

    const handlePageShow = (e: PageTransitionEvent) => {
      if (e.persisted) return; // skip bfcache restores
      triggerDownload();
    };

    window.addEventListener("pageshow", handlePageShow);
    triggerDownload();

    return () => window.removeEventListener("pageshow", handlePageShow);
  }, [downloadUrl]);

  const tDownload = useTranslations("Download");
  const headerText= tDownload.rich("downloadHeaderText", {
    br: () => <br />
  });

  return (
    <div className="h-screen flex-center-col overflow-auto">
      <div className="container px-c-25 lg:px-0">
        <div className="flex flex-col lg:flex-row justify-center gap-4 min-h-[400px]">
          <HikerImage />
          <div className="w-full lg:w-[50%] flex flex-col items-center lg:items-start lg:justify-center text-center lg:text-left">
            <div className="lg:w-[80%]">
              <HikerHeaderText>
                {headerText}
              </HikerHeaderText>

              <div className="text-center mb-14">
                <PrimaryLink
                  href={downloadUrl?.url ?? "/"}
                  text={`${tDownload("startDownloadButtonText")} 📥`}
                  className="font-ps font-bold text-[14px] md:text-[18px] py-2"
                />
              </div>

              <HikerDescrtiptionText text={tDownload("downloadDescriptionText")} />

              <HelpButtons />

              <HikerDescrtiptionText text={tDownload("downloadSubscribeNewsletterText")} />

              <div className="bg-background-green-accent p-[10px] md:p-4 rounded-md w-full text-center">
                <NewsLetterForm newsLetterAction="subscribe" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Download;