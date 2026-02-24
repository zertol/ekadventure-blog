"use client";
import { useAdSense } from "@/utils/hooks/use-adsense";
import { useEffect, useRef, useState } from "react";

interface VerticalAdProps {
  adSlot: string;
  style?: React.CSSProperties;
}

const VerticalAd: React.FC<VerticalAdProps> = ({ adSlot, style }) => {
const [slotKey, setSlotKey] = useState<string | null>(null);

  useEffect(() => {
    setSlotKey(`ads-${Date.now()}-${Math.random()}`);
  }, []);

  const adRef = useRef(null!);
  useAdSense(adRef, slotKey);

  if(!slotKey) return null; // Don't render until slotKey is set to avoid SSR issues

  return (
    <ins
      key={slotKey} // Force re-render on page reload
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
