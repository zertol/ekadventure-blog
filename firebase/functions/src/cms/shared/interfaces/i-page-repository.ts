import { MenuItemType } from "../../../types/domain/menu-item-type";
import { PageType } from "../../../types/domain/page-type";

export interface IPageRepository {
    fetchAllPages(locale: string): Promise<PageType[]>;
    fetchPrivacyPolicyPage(locale: string): Promise<PageType>;
    fetchPageBySlug(slug: string, locale: string): Promise<PageType>;
    fetchMenuItems(locale: string): Promise<MenuItemType[]>;
}