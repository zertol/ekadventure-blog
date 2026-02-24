"use client";
import { createContext, useContext, useEffect, useState } from "react";

type CookieContextType = {
  cookiePreferences: CookiePreferences;
  localCookiePreferences: CookiePreferences;
  isFirstVisit: boolean;
  saveCookiePreferences: (prefs: CookiePreferences) => void;
  togglePreference: (key: keyof CookiePreferences) => void;
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

  const [localCookiePreferences, setLocalCookiePreferences] =
    useState<CookiePreferences>({
      essential: true,
      analytics: false,
      targeted_ads: false,
      personalization: false,
    });

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
    setLocalCookiePreferences(cookiePreferences); // Sync local state with current preferences when opening modal
  };

  const saveCookiePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem("ek_consent", JSON.stringify(prefs));
    setCookiePreferences(prefs);
    setIsFirstVisit(false);
  };

  const togglePreference = (key: keyof CookiePreferences) => {
    setLocalCookiePreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <CookieConsentContext.Provider
      value={{
        cookiePreferences,
        isFirstVisit,
        saveCookiePreferences,
        isModalOpen,
        setIsModalOpen,
        openModal,
        localCookiePreferences,
        togglePreference,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
};
