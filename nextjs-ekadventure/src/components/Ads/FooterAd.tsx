"use client"; // important! makes this a client component

import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

interface GoogleAdProps {
  adSlot: string;
  style?: React.CSSProperties;
  ref?: React.Ref<HTMLModElement>;
}

const FooterAd: React.FC<GoogleAdProps> = ({ adSlot, style, ref }) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("Adsbygoogle push error:", e);
    }
  }, []);

  return (
    <div className="fixed bottom-0 left-auto bg-background-blue-accent/35 w-full z-50 flex justify-center">
      <div className="w-[768px]">
        <ins
          ref={ref}
          className="adsbygoogle"
          style={{ display: "block", ...style }}
          data-ad-client="ca-pub-9735828709569989"
          data-ad-slot={adSlot}
          data-ad-format="horizontal"
        />
      </div>
    </div>
  );
};

export default FooterAd;
