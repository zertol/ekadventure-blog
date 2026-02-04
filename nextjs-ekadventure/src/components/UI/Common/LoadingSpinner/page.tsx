import { useTranslations } from "next-intl";

const LoadingSpinner: React.FC = () => {
  const tUI = useTranslations("UI");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-background-green-accent border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-white font-ps text-lg">
          {tUI("loadingAdventure")}
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
