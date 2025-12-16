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
}

const GoogleAd: React.FC<GoogleAdProps> = ({ adSlot, style }) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("Adsbygoogle push error:", e);
    }
  }, []);

  return (
    <div className="w-full flex justify-center" style={{height:"60px !important"}}>
      <div className="overflow-auto">
        <ins
          className="adsbygoogle"
          style={{ display: "block", ...style }}
          data-ad-client="ca-pub-9735828709569989"
          data-ad-slot={adSlot}
          data-ad-format="auto"
        />
      </div>
    </div>
  );
};

export default GoogleAd;
