{/* Mobile Menu Hamburger Button */}
const Hamburger: React.FC<{ toggleMobileMenu: () => void }> = ({
  toggleMobileMenu,
}) => {
  return (
    <button
      className="lg:hidden text-white"
      onClick={toggleMobileMenu}
      aria-label="Toggle mobile menu"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-8 h-8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d={"M1.75 6.75h32.5M1.75 12h32.5m-32.5 5.25h32.5"}
        />
      </svg>
    </button>
  );
};

export default Hamburger;
