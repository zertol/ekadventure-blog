import ImagePair from "./ImagePair";

interface ImageProps {
  url: string;
  alt: string;
  photoCredit?: string;
}

interface ImagePairsProps {
  images: ImageProps[];
  pairIndex: number;
  totalPairs: number;
}

const ImagePairs: React.FC<ImagePairsProps> = ({
  images,
  pairIndex,
  totalPairs
}) => {
  return (
    <div
      className={`flex-wrap-row md:flex-nowrap md:flex-row w-full gap-5 ${
        pairIndex + 1 === totalPairs ? "mb-0" : "mb-5"
      }`}
    >
      {images.map((img, imgIndex) => (
        <ImagePair
          key={`${pairIndex}-${imgIndex}`}
          img={img}
        />
      ))}
    </div>
  );
};

export default ImagePairs;
