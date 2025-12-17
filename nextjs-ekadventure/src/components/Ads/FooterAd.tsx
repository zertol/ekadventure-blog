"use client"; // important! makes this a client component

import HorizontalAd from "./HorizontalAd";

interface FooterAdProps {
  ref: React.RefObject<HTMLModElement>;
}

const FooterAd: React.FC<FooterAdProps> = ({ ref }) => {
  return (
    <div className="fixed bottom-0 left-auto bg-background-blue-accent/35 w-full z-50 flex justify-center">
      <div className="w-[768px]">
        <HorizontalAd ref={ref} adSlot="7868749713" />
      </div>
    </div>
  );
};

export default FooterAd;
