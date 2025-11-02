import ImagePair from "../ImagePair/ImagePair";

interface ImageHighlightProps {
  img: { url: string; alt: string };
  isAfterContent: boolean;
}

const ImageHighlight: React.FC<ImageHighlightProps> = ({
  img,
  isAfterContent,
}) => {
  return (
    <div
      className={`flex mb-5 ${isAfterContent ? "lg:w-[50%]" : "lg:w-[85%]"}`}
    >
      <ImagePair img={img} alt={img.alt || `Image 1`} />
    </div>
  );
};

export default ImageHighlight;
