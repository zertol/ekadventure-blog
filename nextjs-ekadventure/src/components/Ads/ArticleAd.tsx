"use client";
import { useAdSense } from "@/utils/hooks/use-adsense";
import { useRef } from "react";

interface ArticleAdProps {
  adSlot: string;
  style?: React.CSSProperties;
  ref?: React.RefObject<HTMLModElement>;
}

const ArticleAd: React.FC<ArticleAdProps> = ({ adSlot, style, ref }) => {
  const adRef = useRef(null!);
  useAdSense(adRef);

  return (
    <ins
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
