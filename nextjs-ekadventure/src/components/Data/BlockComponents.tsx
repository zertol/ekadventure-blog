import { PortableTextComponentProps } from "next-sanity";
import { groupImagePairsOrSingle } from "@/utils/data/helpers";
import { PortableTextMarkComponentProps } from "next-sanity";
import Link from "next/link";
import ImageGroup from "../UI/Blog/ArticleDetails/ImageGroup/page";
import { ClientAdWrapper } from "../Ads/ClientAdWrapper";
import ArticleAd from "../Ads/ArticleAd";

export const generateBlockComponents = (
  isAfterContent = false,
  fullContainerWidth = false,
  adsVisible = false
) => {
  return {
    types: {
      imageGroup: ({ value }: { value: { images: any[] } }) => {
        const imagePairsList = groupImagePairsOrSingle(value.images);
        return (
          <ImageGroup
            isAfterContent={isAfterContent}
            fullWidth={fullContainerWidth}
            imagePairsList={imagePairsList}
          />
        );
      },
      imageGroupLast: ({ value }: { value: { images: any[] } }) => {
        const imagePairsList = groupImagePairsOrSingle(value.images);
        return (
          <ImageGroup
            isAfterContent={isAfterContent}
            fullWidth={fullContainerWidth}
            imagePairsList={imagePairsList}
            lastGroup={true}
          />
        );
      },
      iframe: ({ value }: PortableTextComponentProps<any>) => {
        const { url, width = "100%", height = "400px", title } = value;

        return (
          <>
            <div className={`${isAfterContent ? "mt-5" : "mt-8"} mb-6`}>
              <iframe
                src={url}
                width={width}
                height={height}
                title={title || "Embedded content"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full box-shadow-post-detail-image"
                style={{
                  maxWidth: "100%",
                  aspectRatio: width && height ? "auto" : "16/9",
                }}
              />
            </div>
            {adsVisible && (
              <ClientAdWrapper className="mb-3">
                <ArticleAd adSlot="1073133772" />
              </ClientAdWrapper>
            )}
          </>
        );
      },
    },
    marks: {
      link: ({ children, value }: PortableTextMarkComponentProps<any>) => (
        <Link
          href={value.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-background-blue-accent hover:text-background-green-accent underline"
        >
          {children}
        </Link>
      ),
      poorStory: ({ children }: PortableTextMarkComponentProps<any>) => (
        <span className="font-ps">{children}</span>
      ),
      borderedThick: () => (
        <span className="flex-center-row">
          <span className="w-[25%] border-text-dark border-y-2"></span>
        </span>
      ),
    },
    block: {
      h1: ({ children }: PortableTextComponentProps<any>) => (
        <h1 className="text-3xl font-bold">{children}</h1>
      ),
      normal: ({ children, index }: PortableTextComponentProps<any>) => {
        return (
          <>
            <p className="mb-3 leading-6">{children}</p>
            {adsVisible && index === 2 && (
                <ClientAdWrapper headerText="Sponsored Content" className="mb-3">
                  <ArticleAd adSlot="9573541605" />
                </ClientAdWrapper>
            )}
          </>
        );
      },
    },
    list: {
      bullet: ({ children }: PortableTextComponentProps<any>) => (
        <ul className="list-disc ml-6 mb-4">{children}</ul>
      ),
      number: ({ children }: PortableTextComponentProps<any>) => (
        <ol className="list-decimal ml-6 mb-4">{children}</ol>
      ),
    },

    listItem: {
      bullet: ({ children }: PortableTextComponentProps<any>) => (
        <li className="mb-1">{children}</li>
      ),
      number: ({ children }: PortableTextComponentProps<any>) => (
        <li className="mb-1">{children}</li>
      ),
    },
  };
};
