interface ImageProps {
  url: string;
}

interface ImagePairProps {
  img: ImageProps;
  alt: string;
}

const ImagePair: React.FC<ImagePairProps> = ({ img: { url }, alt }) => {
  return (
    <div className="w-full">
      <img
        src={url}
        alt={alt}
        className="w-full h-auto box-shadow-post-detail-image"
      />
    </div>
  );
};

export default ImagePair;
