import SearchBox from "@/components/UI/Common/SearchBox/page";
import HeaderNavLink from "./NavLink";
import { PageType } from "@/types/page-type";

const DesktopNav: React.FC<{
  menuItems: PageType[];
}> = ({ menuItems }) => {
  return (
    <div className="hidden lg:contents justify-self-center">
      <nav className="flex flex-1 gap-6 items-center justify-center ">
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
          >
            {page.title.toUpperCase()}
          </HeaderNavLink>
        ))}
      </nav>

      <div className="flex flex-1 justify-end relative">
        <div className="w-[70%] xl:w-[50%] 2xl:w-[40%]">
          <SearchBox />
        </div>
      </div>
    </div>
  );
};

export default DesktopNav;
