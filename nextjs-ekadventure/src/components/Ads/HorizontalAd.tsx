import { useAdSense } from "@/utils/hooks/use-adsense";
import { useEffect, useState } from "react";

interface HorizontalAdProps {
  adSlot: string;
  style?: React.CSSProperties;
  ref?: React.RefObject<HTMLModElement>;
}

const HorizontalAd: React.FC<HorizontalAdProps> = ({ adSlot, style, ref }) => {
  useAdSense(ref);

  const [slotKey, setSlotKey] = useState<string | null>(null);

  useEffect(() => {
    setSlotKey(`ads-${Date.now()}-${Math.random()}`);
  }, []);

  if(!slotKey) return null; // Don't render until slotKey is set to avoid SSR issues

  return (
    <ins
      key={slotKey} // Force re-render on page reload
      ref={ref}
      className="adsbygoogle"
      style={{
        display: "inline-block",
        width: "100%",
        height: "60px",
        ...style,
      }}
      data-ad-client="ca-pub-9735828709569989"
      data-ad-slot={adSlot}
      data-ad-format=""
    />
  );
};

export default HorizontalAd;
