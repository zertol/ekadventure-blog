import { Link } from "@/i18n/navigation";
import React from "react";
import ToggleButton from "../ToggleButton/page";

const CookieCategoryRow: React.FC<{
  title: string;
  description: string;
  enabled: boolean;
  onChange: () => void;
  disabled?: boolean;
  disclosuresText: string;
}> = ({ title, description, enabled, onChange, disabled = false, disclosuresText }) => {
  return (
    <div className="border-b border-gray-200 py-2">
      <div className="flex items-start justify-between mb-1">
        <h3 className="text-sm font-semibold text-text-dark">{title}</h3>
        <ToggleButton enabled={enabled} onChange={onChange} disabled={disabled} />
      </div>
      <p className="text-xs font-medium text-text-dark mb-3">{description}</p>
      <Link
        href="/privacy-policy"
        className="text-xs underline font-medium text-text-dark hover:text-gray-900"
      >
        {disclosuresText}
      </Link>
    </div>
  );
};

export default CookieCategoryRow;
