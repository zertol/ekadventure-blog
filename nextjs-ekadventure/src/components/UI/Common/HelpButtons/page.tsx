import { useTranslations } from "next-intl";
import PrimaryButton from "../PrimaryButton/page";

const HelpButtons: React.FC<{ outsideLocale?: boolean }> = ({
  outsideLocale,
}) => {
  const tUI = outsideLocale ? null : useTranslations("UI");

  return (
    <div className="flex gap-4 mb-6 justify-center">
      <PrimaryButton
        href="/"
        text={`📍 ${tUI ? tUI("helpButtonHome") : "Trailhead"}`}
        className="font-ps py-0 font-bold text-[14px] md:text-[18px]"
        outsideLocale={outsideLocale}
      />
      <PrimaryButton
        href="/blog"
        text={`🥾 ${tUI ? tUI("helpButtonBlog") : "Adventures"}`}
        className="font-ps py-0 font-bold text-[14px] md:text-[18px]"
        outsideLocale={outsideLocale}
      />
      <PrimaryButton
        href="/contact"
        text={`📞 ${tUI ? tUI("helpButtonContact") : "Get Help"}`}
        className="font-ps py-0 font-bold text-[14px] md:text-[18px]"
        outsideLocale={outsideLocale}
      />
    </div>
  );
};

export default HelpButtons;
