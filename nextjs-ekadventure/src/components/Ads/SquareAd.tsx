import { useAdSense } from "@/utils/hooks/use-adsense";

interface SquareAdProps {
  adSlot: string;
  style?: React.CSSProperties;
  ref?: React.RefObject<HTMLModElement>;
}

const SquareAd: React.FC<SquareAdProps> = ({ adSlot, style, ref }) => {
  useAdSense(ref);

  return (
    <ins
      ref={ref}
      className="adsbygoogle"
      style={{ display: "block", ...style }}
      data-ad-client="ca-pub-9735828709569989"
      data-ad-slot={adSlot}
      data-ad-format="auto"
    />
  );
};

export default SquareAd;
