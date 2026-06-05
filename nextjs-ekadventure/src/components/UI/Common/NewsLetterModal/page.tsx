import { useEffect, useState } from "react";
import NewsLetterForm from "../Form/NewsLetterForm/page";
import ModalDialog from "../ModalDialog/page";
import { useTranslations } from "next-intl";

const NewsLetterModal: React.FC = () => {
  const tLetter = useTranslations("Newsletter");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeNewsLetterModal = () => {
    setIsModalOpen(false);
    localStorage.setItem("has_seen_newsletter_modal", "true");
  };

  useEffect(() => {
    const hasSeenModal = localStorage.getItem("has_seen_newsletter_modal");
    if (hasSeenModal) {
      return;
    }

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 300) {
        setIsModalOpen(true);
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <ModalDialog
      isSmall={true}
      isOpen={isModalOpen}
      onClose={closeNewsLetterModal}
      className="p-4 bg-background-green-accent"
    >
      <h2 className="font-semibold mb-2 text-white">{tLetter("newsletterTitle")}</h2>
      <p className="text-text-dark font-semibold mb-3 text-sm/5">
        {tLetter("newsletterDescription")}
      </p>
      <NewsLetterForm newsLetterAction="subscribe" />
    </ModalDialog>
  );
};

export default NewsLetterModal;