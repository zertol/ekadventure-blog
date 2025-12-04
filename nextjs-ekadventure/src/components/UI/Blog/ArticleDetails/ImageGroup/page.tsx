import ImageHighlight from "../ImageHighlight/ImageHighlight";
import ImagePairs from "../ImagePair/ImagePairs";

interface ImageGroupProps {
  isAfterContent: boolean;
  fullWidth: boolean;
  lastGroup?: boolean;
  imagePairsList: ImageType[][];
}

const ImageGroup: React.FC<ImageGroupProps> = (props) => {
  const { isAfterContent, fullWidth, imagePairsList, lastGroup } = { ...props };

  return (
    <div className={`${isAfterContent ? "mt-5" : "mt-8"}`}>
      {imagePairsList.length === 1 && imagePairsList[0].length === 1 ? (
        <ImageHighlight
          isAfterContent={isAfterContent}
          fullWidth={fullWidth}
          img={imagePairsList[0][0]}
          lastGroup={lastGroup}
        />
      ) : (
        <div className={`${lastGroup ? "mb-0" : "mb-5"}`}>
          {imagePairsList.map((pair, pairIndex) => (
            <ImagePairs
              key={`${pairIndex}`}
              images={pair}
              pairIndex={pairIndex}
              totalPairs={imagePairsList.length}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGroup;
