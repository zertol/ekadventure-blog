"use client";
import { GoogleAdSlotConfig } from "@/domain/ads/google/google-ad-slot-config";
import { useCookieConsent } from "@/store/CookieConsentContext";
import { useEffect, useRef, useState } from "react";

interface GoogleAdSlotProps {
  config: GoogleAdSlotConfig;
}

const GoogleAdSlot: React.FC<GoogleAdSlotProps> = ({
  config,
}) => {
  console.log("_" + config);
  const adRef = useRef(null!);
  const consentData = useCookieConsent();

  const [slotKey, setSlotKey] = useState<string | null>(null);
  
    useEffect(() => {
      setSlotKey(`ads-${Date.now()}-${Math.random()}`);
    }, []);

  useEffect(() => {
    const ins = adRef?.current;
    if (!ins || consentData.isFirstVisit) return;

    const adsbygoogle: any = (window.adsbygoogle = window.adsbygoogle || []);

    if (!consentData.cookiePreferences.targeted_ads) {
      adsbygoogle.requestNonPersonalizedAds = 1;
    } else {
      adsbygoogle.requestNonPersonalizedAds = 0;
    }

    try {
      adsbygoogle.push({});
    } catch (e) {
      console.error("adsbygoogle push error:", e);
    }
  }, [
    adRef,
    slotKey,
    consentData.cookiePreferences.targeted_ads,
    consentData.isFirstVisit,
  ]);

  return (
    <ins
      key={slotKey}
      ref={adRef}
      className={`adsbygoogle ${config.className}`}
      style={{ display: "block", textAlign: "center" }}
      data-ad-client="ca-pub-9735828709569989"
      data-ad-slot={config.slotId}
      data-ad-layout={config.adLayout}
      data-ad-format={config.adFormat ?? "auto"}
    />
  );
};

export default GoogleAdSlot;
