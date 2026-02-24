"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { set } from "react-hook-form";

type CookieContextType = {
  cookiePreferences: CookiePreferences;
  isFirstVisit: boolean;
  saveCookiePreferences: (prefs: CookiePreferences) => void;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  openModal: (callBackFn?: () => void) => void;
};

const CookieConsentContext = createContext<CookieContextType | null>(null);

export const useCookieConsent = () => {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error("useCookieConsent must be used within a CookieProvider");
  }
  return context;
};

export const CookieConsentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [cookiePreferences, setCookiePreferences] = useState<CookiePreferences>(
    {
      essential: true,
      analytics: false,
      targeted_ads: false,
      personalization: false,
    },
  );

  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const storedPrefs = localStorage.getItem("ek_consent");
    if (storedPrefs) {
      setCookiePreferences(JSON.parse(storedPrefs));
      setIsFirstVisit(false);
    } else {
      setIsFirstVisit(true);
    }
  }, []);

  const openModal = (callBackFn?: () => void) => {
    callBackFn && callBackFn();
    setIsModalOpen(true);
  };

  const saveCookiePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem("ek_consent", JSON.stringify(prefs));
    setCookiePreferences(prefs);
    setIsFirstVisit(false);
  };

  return (
    <CookieConsentContext.Provider
      value={{
        cookiePreferences,
        isFirstVisit,
        saveCookiePreferences,
        isModalOpen,
        setIsModalOpen,
        openModal
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
};
