import { useTranslations } from "next-intl";

export const HeroText: React.FC = () => {
  const t = useTranslations("Home");

  return (
    <div className="container-max-w-none container-px-25 md:container-px-60">
      <div className="mb-5">
        <h2 className="font-bold text-left font-ps">
          {t("heroTextTitle")}
        </h2>
      </div>
      <div className="mb-0 pl-c-25">
        <p className="text-left text-wrap font-ps text-[20px]" dangerouslySetInnerHTML={{ __html: t("heroTextContent") }}>
          
        </p>
      </div>
    </div>
  );
};