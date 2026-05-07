import React from "react";
import PrimaryLink from "../../Common/PrimaryLink/page";

interface FeaturedSectionProps {
  children: React.ReactNode;
  title: string;
  canViewAll?: {
    page: URLType;
    text: string;
  };
  className?: string;
}

export const FeaturedSection: React.FC<FeaturedSectionProps> = ({
  children,
  title,
  canViewAll,
  className,
}) => {
  return (
    <section className={`${className || "mb-c-90"}`}>
      <div className="mx-auto container-px-25 md:container-px-60 container-max-w-1280">
        <div className={`mb-6 flex-center-col ${canViewAll ? "relative" : ""}`}>
          <h2 className="font-bold text-center mb-4 uppercase">{title}</h2>
          <span className="block w-24 h-1 bg-black"></span>
          <div className="flex-center-col mt-2 md:mt-0 md:absolute md:right-0 md:top-0">
            {canViewAll && (
              <PrimaryLink
                href={`${canViewAll.page.url}`}
                text={`${canViewAll.text}`}
                className="py-1 px-4 font-semibold text-[14px]"
              />
            )}
          </div>
        </div>
        {children}
      </div>
    </section>
  );
};
