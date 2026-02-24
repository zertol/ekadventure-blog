"use client";
import { useCookieConsent } from "@/store/CookieConsentContext";
import { trackPageView } from "@/utils/analytics/handle-gtag-events";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const consentData = useCookieConsent();

  useEffect(() => {
    // 1. Manually initialize the gtag function if it doesn't exist
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      if (typeof window.gtag !== "function") {
        window.gtag = function () {
          window.dataLayer.push(arguments);
        };
      }
    }

    // 2. Initialize Timestamp
    window.gtag("js", new Date());

    // 3. Handle GA Consent
    const analyticsConsent = consentData.cookiePreferences.analytics
      ? "granted"
      : "denied";
    const adsConsent = consentData.cookiePreferences.targeted_ads
      ? "granted"
      : "denied";

    window.gtag("consent", "update", {
      analytics_storage: analyticsConsent,
      ad_storage: adsConsent,
    });

    // 4. Track the initial page view based on Consent
    if (consentData.cookiePreferences.analytics) {
      trackPageView(pathname);
    }
  }, [pathname, consentData]);

  return null;
}
