"use client";
import { ClientAdWrapper } from "./ClientAdWrapper";
import HorizontalAd from "./HorizontalAd";

interface FooterAdProps {
  ref: React.RefObject<HTMLModElement>;
}

const FooterAd: React.FC<FooterAdProps> = ({ ref }) => {
  return (
    <ClientAdWrapper headerText="Google" className="fixed bottom-0 left-auto z-50 flex flex-col justify-center w-full">
      <div className="w-full flex justify-center">
        <div className="w-full md:w-[768px]">
          <HorizontalAd ref={ref} adSlot="7868749713" />
        </div>
      </div>
    </ClientAdWrapper>
  );
};

export default FooterAd;
