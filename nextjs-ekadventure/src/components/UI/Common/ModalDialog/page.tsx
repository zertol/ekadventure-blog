import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import CloseButton from "../CloseButton/page";

const ModalDialog: React.FC<{
  isOpen: Boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  outsideLocale?: boolean;
}> = ({ isOpen, onClose, children, className, outsideLocale }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // Handle clicks on the backdrop to close the modal
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Check if the click occurred directly on the backdrop div
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-[55] flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/50"
        onClick={handleBackdropClick}
      />

      <div
        className={`relative z-[55] rounded-md shadow-md w-[90%] md:w-[75%] max-h-[80%] grid grid-rows-[auto_1fr_auto] ${className}`}
      >
        {children}
        <div className="flex justify-end mt-4">
          {outsideLocale ? (
            <button
              onClick={onClose}
              className={`primary-button px-6 py-2 text-white hover:bg-background-dark`}
              aria-label="Close"
            >
              Close
            </button>
          ) : (
            <CloseButton
              handleClose={onClose}
              isModalCloseButton={true}
              className="text-white hover:bg-background-dark"
            />
          )}
        </div>
      </div>
    </div>,
    document.getElementById("dialog-modal")!,
  );
};

export default ModalDialog;
