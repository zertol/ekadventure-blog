"use client";
import { useAdSense } from "@/utils/hooks/use-adsense";
import { useEffect, useRef, useState } from "react";

interface ArticleAdProps {
  adSlot: string;
  style?: React.CSSProperties;
}

const ArticleAd: React.FC<ArticleAdProps> = ({ adSlot, style }) => {
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
      className="adsbygoogle"
      style={{ display: "block", textAlign: "center", ...style }}
      data-ad-client="ca-pub-9735828709569989"
      data-ad-slot={adSlot}
      data-ad-layout="in-article"
      data-ad-format="fluid"
    />
  );
};

export default ArticleAd;
