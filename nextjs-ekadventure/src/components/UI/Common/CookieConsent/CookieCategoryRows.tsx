import { useTranslations } from "next-intl";
import CookieCategoryRow from "./CookieCategoryRow";

const CookieCategoryRows: React.FC<{
  preferences: CookiePreferences;
  handleToggle: (key: keyof CookiePreferences) => void;
}> = ({ preferences, handleToggle }) => {
  const tConsent = useTranslations("CookieConsent");

  return (
    <div className="px-4 py-2 space-y-2">
      <CookieCategoryRow
        title={tConsent("essentialLabel")}
        description={tConsent("essentialDescription")}
        enabled={true}
        onChange={() => {}}
        disabled={true}
        disclosuresText={tConsent("disclosuresText")}
      />

      <CookieCategoryRow
        title={tConsent("targetedAdvertisingLabel")}
        description={tConsent("targetedAdvertisingDescription")}
        enabled={preferences.targeted_ads}
        onChange={() => handleToggle("targeted_ads")}
        disclosuresText={tConsent("disclosuresText")}
      />

      <CookieCategoryRow
        title={tConsent("personalizationLabel")}
        description={tConsent("personalizationDescription")}
        enabled={preferences.personalization}
        onChange={() => handleToggle("personalization")}
        disclosuresText={tConsent("disclosuresText")}
      />

      <CookieCategoryRow
        title={tConsent("analyticsLabel")}
        description={tConsent("analyticsDescription")}
        enabled={preferences.analytics}
        onChange={() => handleToggle("analytics")}
        disclosuresText={tConsent("disclosuresText")}
      />
    </div>
  );
};

export default CookieCategoryRows;
