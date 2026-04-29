import { useTranslations } from "next-intl";

const CloseButton: React.FC<{
  handleClose: () => void;
  className?: string;
  isModalCloseButton?: boolean;
}> = ({ handleClose, className, isModalCloseButton }) => {
  if (isModalCloseButton) {
    const tUI = useTranslations("UI");
    return (
      <button
        onClick={handleClose}
        className={`primary-button px-6 py-2 ${className}`}
        aria-label="Close"
      >
        {tUI("closeButtonText")}
      </button>
    );
  }

  return (
    <button
      onClick={handleClose}
      className={`text-gray-500 hover:text-gray-700 hover:rotate-90 transition-all duration-300 ${className}`}
      aria-label="Close"
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
};

export default CloseButton;
