import SearchBox from "@/components/UI/Common/SearchBox/page";
import HeaderNavLink from "./NavLink";
import { MenuItemType } from "@/types/menu-item-type";

const DesktopNav: React.FC<{
  menuItems: MenuItemType[];
}> = ({ menuItems }) => {
  return (
    <div className="hidden lg:contents justify-self-center">
      <nav
        className="flex flex-1 gap-6 items-center justify-center"
        aria-label="Main">
        {menuItems.map((menuItem: MenuItemType) => (
          <HeaderNavLink
            key={menuItem.slug}
            href={`${
              menuItem.slug?.toLowerCase().includes("http")
                ? menuItem.slug
                : menuItem.slug?.toLocaleLowerCase() === "home"
                  ? "/"
                  : "/" + menuItem.slug
            }`}>
            {menuItem.title.toUpperCase()}
          </HeaderNavLink>
        ))}
      </nav>

      <div className="flex flex-1 justify-end">
        <div className="w-[70%] xl:w-[50%] 2xl:w-[40%]">
          <SearchBox />
        </div>
      </div>
    </div>
  );
};

export default DesktopNav;