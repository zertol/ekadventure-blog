const CloseButton: React.FC<{ handleClose: () => void, className?: string }> = ({
  handleClose,
  className
}) => {
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
