"use client";
import { useAdSense } from "@/utils/hooks/use-adsense";
import { useRef } from "react";

interface VerticalAdProps {
  adSlot: string;
  style?: React.CSSProperties;
}

const VerticalAd: React.FC<VerticalAdProps> = ({ adSlot, style }) => {
  const adRef = useRef(null!);
  useAdSense(adRef);

  return (
    <ins
      ref={adRef}
      className="adsbygoogle sidebar-ad"
      style={{ display: "block", ...style }}
      data-ad-client="ca-pub-9735828709569989"
      data-ad-slot={adSlot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
};

export default VerticalAd;
