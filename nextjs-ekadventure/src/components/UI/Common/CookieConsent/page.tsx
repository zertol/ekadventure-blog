"use client";

import { useEffect, useState } from "react";
import CookieConsentActions from "./CookieConsentActions";
import CloseButton from "../CloseButton/page";
import { useCookieConsent } from "@/store/CookieConsentContext";
import { useTranslations } from "next-intl";
import ToggleButtonContainer from "../ToggleButton/ToggleButtonContainer";
import { Link } from "@/i18n/navigation";
import CookieConsentModal from "./CookieConsentModal";

const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isModalClosing, setIsModalClosing] = useState(false);

  const {
    cookiePreferences,
    isFirstVisit,
    saveCookiePreferences,
    isModalOpen,
    setIsModalOpen,
    openModal,
    localCookiePreferences,
    togglePreference
  } = useCookieConsent();

  const tConsent = useTranslations("CookieConsent");
  const tPrivacy = useTranslations("PrivacyPolicy");

  useEffect(() => {
    if (isFirstVisit) {
      // Mount banner after 300ms
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 300);

      // Animate the banner after a small delay to ensure it's rendered
      const animationTimer = setTimeout(() => {
        setIsAnimating(true);
      }, 300);

      return () => {
        clearTimeout(timer);
        clearTimeout(animationTimer);
      };
    } else {
      setIsVisible(false);
    }
  }, [isFirstVisit, cookiePreferences]);

  const handleToggle = (key: keyof CookiePreferences) => {
    if (key === "essential") return; // Essential cookies cannot be disabled
    togglePreference(key);
  };

  const handleSave = () => {
    saveCookiePreferences(localCookiePreferences);
    setIsAnimating(false);
    setTimeout(() => {
      setIsVisible(false);
    }, 300);
    if (isModalOpen) {
      closeModal();
    }
  };

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      essential: true,
      analytics: true,
      targeted_ads: true,
      personalization: true,
    };
    saveCookiePreferences(allAccepted);
    setIsVisible(false);
    setIsAnimating(false);
    if (isModalOpen) {
      closeModal();
    }
  };

  const handleRejectNonEssential = () => {
    const minimalPreferences: CookiePreferences = {
      essential: true,
      analytics: false,
      targeted_ads: true,
      personalization: false,
    };
    saveCookiePreferences(minimalPreferences);
    setIsVisible(false);
    setIsAnimating(false);
    closeModal();
  };

  const closeModal = () => {
    setIsModalClosing(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsModalClosing(false);
      // Fade banner back in
      setIsAnimating(true);
    }, 300);
  };

  const openModalFromBanner = () => {
    setIsAnimating(false);
  };

  const removeConsentBanner = () => {
    saveCookiePreferences(localCookiePreferences);
    setIsAnimating(false);
    setTimeout(() => {
      setIsVisible(false);
    }, 300);
  };

  if (!isVisible && !isModalOpen) return null;

  return (
    <>
      {/* Banner */}
      {isVisible && (
        <div
          className={`fixed left-0 right-0 z-[51] bottom-8 mx-4 lg:mx-6 p-6 bg-white border-t border-gray-200 shadow-xl rounded-xl ${
            isAnimating
              ? "animate-cookie-consent-fade-in pointer-events-auto"
              : "animate-cookie-consent-fade-out pointer-events-none"
          }`}
        >
          <div className="flex flex-col lg:flex-row gap-1 items-start lg:items-center">
            <div className="absolute right-0 top-0 m-1">
              <CloseButton handleClose={removeConsentBanner} />
            </div>
            {/* Left side - Text content */}
            <div className="flex-[5] mb-4 lg:mb-0">
              <p className="text-[13px] leading-5 text-text-dark mb-1">
                {tConsent("cookieConsentDescription")}
                <Link
                  href="/privacy-policy"
                  target="_blank"
                  className="underline hover:text-gray-900 transition-colors ml-1"
                >
                  {tPrivacy("privacyPolicyTitle")}
                </Link>
              </p>

              {/* Storage Preferences Section */}
              <div className="space-y-3">
                <button
                  onClick={() => openModal(openModalFromBanner)}
                  className="text-[13px] leading-5 underline text-gray-700 hover:text-gray-900 block transition-colors"
                >
                  {tConsent("storagePreferencesButtonText")}
                </button>

                {/* Toggle Switches */}
                <div className="flex gap-2 flex-wrap">
                  {/* Targeted Advertising */}
                  <ToggleButtonContainer
                    label={tConsent("targetedAdvertisingLabel")}
                    enabled={localCookiePreferences.targeted_ads}
                    onChange={() => handleToggle("targeted_ads")}
                  />

                  {/* Personalization */}
                  <ToggleButtonContainer
                    label={tConsent("personalizationLabel")}
                    enabled={localCookiePreferences.personalization}
                    onChange={() => handleToggle("personalization")}
                  />

                  {/* Analytics */}
                  <ToggleButtonContainer
                    label={tConsent("analyticsLabel")}
                    enabled={localCookiePreferences.analytics}
                    onChange={() => handleToggle("analytics")}
                  />
                </div>
              </div>
            </div>

            {/* Right side - Buttons */}
            <div className="flex flex-1 flex-col gap-2 w-full lg:w-auto lg:min-w-64">
              <CookieConsentActions
                actionsDict={[
                  {
                    label: tConsent("saveButtonText"),
                    onClick: handleSave,
                  },
                  {
                    label: tConsent("acceptAllButtonText"),
                    onClick: handleAcceptAll,
                  },
                  {
                    label: tConsent("rejectNonEssentialButtonText"),
                    onClick: handleRejectNonEssential,
                  },
                ]}
              />
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
       <CookieConsentModal handleSave={handleSave} closeModal={closeModal} isModalClosing={isModalClosing} />
      )}
    </>
  );
};

export default CookieConsent;
