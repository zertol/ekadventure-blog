import ImagePair from "../ImagePair/ImagePair";

interface ImageHighlightProps {
  img: ImageType;
  isAfterContent: boolean;
  fullWidth: boolean;
  lastGroup?: boolean;
}

const ImageHighlight: React.FC<ImageHighlightProps> = ({
  img,
  isAfterContent,
  fullWidth,
  lastGroup,
}) => {
  return (
    <div
      className={`flex ${lastGroup ? "mb-0" : "mb-5"}  ${isAfterContent ? "lg:w-[50%]" : !fullWidth && "lg:w-[85%]"}`}
    >
      <ImagePair img={img} />
    </div>
  );
};

export default ImageHighlight;
