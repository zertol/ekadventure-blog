import { MenuItemType } from "./menu-item-type";
import { PageType } from "./page-type";

export type PagesContextType = {
    pages: PageType[];
    menus: MenuItemType[];
    error: Error | null;
};