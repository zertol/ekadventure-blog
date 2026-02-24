"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useCookieConsent } from "@/store/CookieConsentContext";
import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { ChangeEvent, useTransition } from "react";

const LocaleSelect: React.FC = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const consent = useCookieConsent();
  const [isPending, startTransition] = useTransition();

  async function onSelectChange(e: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = e.target.value;

    if (consent.cookiePreferences.personalization) {
      const userSettings: UserSettings = {
        selected_language: nextLocale,
      };
      const value = encodeURIComponent(JSON.stringify(userSettings));
      document.cookie = `EK_USER_SETTINGS=${value}; path=/; max-age=${365 * 24 * 60 * 60}; SameSite=Lax`;
    }

    startTransition(() => {
      router.replace({ pathname, params } as any, { locale: nextLocale });
    });
  }

  const tUI = useTranslations("UI");

  return (
    <div className="flex justify-between w-[50%] text-text-dark relative">
      <select
        id="language"
        value={locale}
        onChange={onSelectChange}
        disabled={isPending}
        className="text-[12px] tracking-tighter appearance-none w-full px-2 py-1 outline-none rounded-md bg-white"
      >
        <option value="-1" disabled>
          {tUI("selectLanguage")}
        </option>
        <option value="en">English (US)</option>
        <option value="fr">Français</option>
      </select>
      <svg
        viewBox="0 0 16 16"
        fill="currentColor"
        data-slot="icon"
        aria-hidden="true"
        className="w-3 h-3 text-text-dark self-center right-1 flex-shrink-0 absolute"
      >
        <path
          d="M5.22 10.22a.75.75 0 0 1 1.06 0L8 11.94l1.72-1.72a.75.75 0 1 1 1.06 1.06l-2.25 2.25a.75.75 0 0 1-1.06 0l-2.25-2.25a.75.75 0 0 1 0-1.06ZM10.78 5.78a.75.75 0 0 1-1.06 0L8 4.06 6.28 5.78a.75.75 0 0 1-1.06-1.06l2.25-2.25a.75.75 0 0 1 1.06 0l2.25 2.25a.75.75 0 0 1 0 1.06Z"
          clipRule="evenodd"
          fillRule="evenodd"
        ></path>
      </svg>
    </div>
  );
};

export default LocaleSelect;
