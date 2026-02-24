"use client";
import { useTranslations } from "next-intl";
import { useState } from "react";
import CloseButton from "../CloseButton/page";
import CookieCategoryRows from "./CookieCategoryRows";
import { useCookieConsent } from "@/store/CookieConsentContext";

const CookieConsentModal: React.FC<{ handleSave: () => void, closeModal: () => void, isModalClosing: boolean }> = ({
  handleSave,
  closeModal,
  isModalClosing
}) => {
  const tConsent = useTranslations("CookieConsent");

  const { localCookiePreferences, togglePreference } = useCookieConsent();

  const handleToggle = (key: keyof CookiePreferences) => {
    if (key === "essential") return; // Essential cookies cannot be disabled
    togglePreference(key);
  };

  return (
    <div
      className={`fixed inset-0 z-[52] flex justify-end transition-opacity duration-300 ${
        isModalClosing ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Backdrop with blur */}
      <div className="absolute inset-0 bg-black/40" onClick={closeModal} />

      {/* Modal content */}
      <div
        className={`relative bg-white w-full max-w-md h-screen overflow-y-auto  ${
          isModalClosing
            ? "animate-modal-right-exit"
            : "animate-modal-right-enter"
        }`}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 flex justify-between items-center z-10">
          <h2 className="text-base font-semibold text-text-dark">
            {tConsent("storagePreferencesTitle")}
          </h2>
          <CloseButton handleClose={closeModal} />
        </div>

        {/* Content */}
        <CookieCategoryRows
          preferences={localCookiePreferences}
          handleToggle={handleToggle}
        />

        {/* Footer - Save Button */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 z-10">
          <button
            onClick={handleSave}
            className="w-full bg-black text-white px-6 py-2 rounded-full hover:bg-background-green-accent active:bg-black transition-colors duration-300 font-medium"
          >
            {tConsent("saveButtonText")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsentModal;
