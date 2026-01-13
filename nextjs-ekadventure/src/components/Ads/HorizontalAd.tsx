import { useAdSense } from "@/utils/hooks/use-adsense";

interface HorizontalAdProps {
  adSlot: string;
  style?: React.CSSProperties;
  ref?: React.RefObject<HTMLModElement>;
}

const HorizontalAd: React.FC<HorizontalAdProps> = ({ adSlot, style, ref }) => {
  useAdSense(ref);

  return (
    <ins
      ref={ref}
      className="adsbygoogle"
      style={{ display: "inline-block", width: "100%", height: "60px", ...style }}
      data-ad-client="ca-pub-9735828709569989"
      data-ad-slot={adSlot}
      data-ad-format=""
    />
  );
};

export default HorizontalAd;
