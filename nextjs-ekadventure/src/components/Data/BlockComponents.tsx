import { PortableTextComponentProps } from "next-sanity";
import { groupImagePairsOrSingle } from "@/utils/data/helpers";
import { PortableTextMarkComponentProps } from "next-sanity";
import Link from "next/link";
import ImageHighlight from "../UI/Blog/ArticleDetails/ImageHighlight/ImageHighlight";
import ImagePairs from "../UI/Blog/ArticleDetails/ImagePair/ImagePairs";

export const generateBlockComponents = (isAfterContent = false) => {
  return {
    types: {
      imageGroup: ({ value }: { value: { images: any[] } }) => {
        const imagePairsList = groupImagePairsOrSingle(value.images);

        return (
          <div className={`${isAfterContent ? "mt-5" : "mt-8"}`}>
            {imagePairsList.length === 1 ? (
              <ImageHighlight
                isAfterContent={isAfterContent}
                img={imagePairsList[0][0]}
              />
            ) : (
              imagePairsList.map((pair, pairIndex) => (
                <ImagePairs
                  key={`${pairIndex}`}
                  images={pair}
                  pairIndex={pairIndex}
                  totalPairs={imagePairsList.length}
                />
              ))
            )}
          </div>
        );
      },
      iframe: ({ value }: PortableTextComponentProps<any>) => {
        const { url, width = "100%", height = "400px", title } = value;

        return (
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
        <span className="font-ps">
          {children}
        </span>
      )
    },
    block: {
      h1: ({ children }: PortableTextComponentProps<any>) => (
        <h1 className="text-3xl font-bold">{children}</h1>
      ),
      normal: ({ children, value }: PortableTextComponentProps<any>) => {
        return <p className="mb-3 leading-6">{children}</p>;
      },
    },
  };
};
