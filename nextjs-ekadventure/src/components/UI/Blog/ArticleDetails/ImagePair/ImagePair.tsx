interface ImageProps {
  url: string;
  alt: string;
  photoCredit?: string;
}

interface ImagePairProps {
  img: ImageProps;
}

const ImagePair: React.FC<ImagePairProps> = ({
  img: { url, alt, photoCredit },
}) => {
  return (
    <div className="w-full">
      <img
        src={url}
        alt={alt || "Image To Render"}
        className="w-full h-auto box-shadow-post-detail-image"
      />
      {photoCredit && (
        <p className="text-xs leading-none flex-start-row mt-1 text-text-dark/70">
          <img
            className="inline-block w-3 h-3 mr-1"
            alt="📷"
            src="https://s.w.org/images/core/emoji/16.0.1/svg/1f4f7.svg"
          />
          Shot taken by &nbsp;
          <strong>
            <em>{photoCredit}</em>
          </strong>
        </p>
      )}
    </div>
  );
};

export default ImagePair;
