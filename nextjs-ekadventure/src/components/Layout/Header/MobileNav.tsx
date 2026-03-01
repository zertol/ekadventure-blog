import { PageType } from "@/types/page-type";
import HeaderNavLink from "./NavLink";
import CloseButton from "@/components/UI/Common/CloseButton/page";
import Logo from "./Logo";
import { useEffect, useRef, useState } from "react";
import SearchBox from "@/components/UI/Common/SearchBox/page";
import LocaleSelect from "@/components/UI/Footer/LocaleSelect/page";

const MobileNav: React.FC<{
  menuItems: PageType[];
  isMobileMenuClosing: boolean;
  closeMobileMenu: () => void;
}> = ({ menuItems, isMobileMenuClosing, closeMobileMenu }) => {
  const [backdropOpen, setBackdropOpen] = useState(false);

  useEffect(() => {
    setBackdropOpen(!isMobileMenuClosing);
    if (!isMobileMenuClosing) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [isMobileMenuClosing]);

  return (
    <div
      className={`fixed inset-0 flex justify-end transition-opacity duration-300 ${
        isMobileMenuClosing ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Backdrop with blur */}
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity duration-[400ms] ease-in-out ${
          !backdropOpen ? "opacity-0" : "opacity-100"
        }`}
        onClick={closeMobileMenu}
      />

      <div
        className={`relative bg-background-green-accent pb-[12px] w-full max-w-[300px] h-dvh overflow-y-auto custom-scrollbar  ${
          isMobileMenuClosing
            ? "animate-modal-right-exit"
            : "animate-modal-right-enter"
        }`}
      >
        {/* Header */}
        <div className="sticky top-0 bg-background-green-accent px-4 pb-4 pt-[12px] flex justify-between items-center z-10">
          <Logo isScrolled={false} isScrollable={true} />
          <CloseButton
            handleClose={closeMobileMenu}
            className="text-white hover:text-text-dark"
          />
        </div>
        <div className="flex flex-col justify-between gap-10">
          <nav className="flex flex-col justify-center items-center gap-6 w-full text-center">
            {menuItems.map((page: PageType) => (
              <HeaderNavLink
                key={page.slug}
                href={`${
                  page.slug?.toLowerCase().includes("http")
                    ? page.slug
                    : page.slug?.toLocaleLowerCase() === "home"
                      ? "/"
                      : "/" + page.slug
                }`}
                onClick={closeMobileMenu}
              >
                {page.title.toUpperCase()}
              </HeaderNavLink>
            ))}
          </nav>
          <div className="px-2">
            <SearchBox isInContainer={true} />
          </div>
        </div>
        <div className="flex-1 px-2 mt-4 flex justify-center">
          <LocaleSelect />
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
