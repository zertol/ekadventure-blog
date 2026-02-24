"use client";

import { useCookieConsent } from "@/store/CookieConsentContext";
import { useEffect, useRef } from "react";

export const useAdSense = (
  insRef?: React.RefObject<HTMLElement | null>,
  slotKey?: string | null
) => {
  const initializedRef = useRef(false);
  const consentData = useCookieConsent();

  useEffect(() => {
    const ins = insRef?.current;
    if (!ins || consentData.isFirstVisit) return;

    if (initializedRef.current) return;

    const adsbygoogle: any = (window.adsbygoogle = window.adsbygoogle || []);

    if(!consentData.cookiePreferences.targeted_ads) {
      adsbygoogle.requestNonPersonalizedAds = 1;
    }
    else{
      adsbygoogle.requestNonPersonalizedAds = 0;
    }

    try {
      adsbygoogle.push({});
      initializedRef.current = true;
    } catch (e) {
      console.error("adsbygoogle push error:", e);
    }
  }, [insRef, slotKey, consentData.cookiePreferences.targeted_ads, consentData.isFirstVisit]);
};