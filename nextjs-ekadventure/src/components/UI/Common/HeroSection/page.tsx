import { ButtonType, PageType } from "@/types/page-type";
import PrimaryLink from "../PrimaryLink/page";
import SocialIcons from "../SocialIcons/page";
import { generateBlockComponents } from "@/components/Data/BlockComponents";
import { PortableText } from "@portabletext/react";

interface HeroSectionProps {
  page: PageType | null;
}

const HeroSection: React.FC<HeroSectionProps> = ({ page }) => {
  const heroData = page?.heroSection;

  return (
    <section
      className="overflow-hidden relative h-150 m-[0_calc(50%-50dvw)] mb-10
               isolate flex items-end
               after:content-[''] after:absolute after:inset-0 after:z-[-1] hero-gradient-overlay container-px-25 md:container-px-60 py-10 bg-background-dark/25">
      {heroData?.backgroundImage && (
        <img
          src={heroData?.backgroundImage?.url || "/images/adventure-header.jpg"}
          alt={heroData?.backgroundImage?.alt || "Header image"}
          className="absolute w-full h-full object-cover object-center inset-0 z-[-2]"
        />
      )}
      <div className="flex flex-col max-w-150 gap-2">
        <h1 className="text-white hero text-shadow-xs text-shadow-background-dark">
          {heroData?.heading}
        </h1>
        <PortableText
          value={heroData?.description || []}
          components={generateBlockComponents({
            normalBlocClassName:
              "text-white text-16 md:text-18 text-shadow-xs text-shadow-background-dark"
          })}></PortableText>
        {heroData?.buttons && (
          <div className="flex mt-4 gap-6">
            {heroData?.buttons?.map(
              (button, index) =>
                button.type === ButtonType.Link && (
                  <PrimaryLink
                    key={index}
                    text={button.text}
                    href={button.url}
                    className={`${button.style}-button text-16`}
                  />
                )
            )}
          </div>
        )}
        <div className="mt-2">
          <SocialIcons isButtonStyle={true} className="text-white" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;