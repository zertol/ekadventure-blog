import { ICMSClient } from "../../../cms/shared/interfaces/i-cms-client";
import { MenuItemType } from "../../../types/domain/menu-item-type";
import { PageType } from "../../../types/domain/page-type";
import { IPageService } from "../../interfaces/i-page-service";

export class PageService implements IPageService {
    constructor(private cmsClient: ICMSClient) { }

    async fetchAllPages(locale: string): Promise<PageType[]> {
        return await this.cmsClient.getRepositories().page.fetchAllPages(locale);
    }

    async fetchPrivacyPolicyPage(locale: string): Promise<PageType> {
        return await this.cmsClient.getRepositories().page.fetchPrivacyPolicyPage(locale);
    }

    async fetchPageBySlug(slug: string, locale: string): Promise<PageType> {
        return await this.cmsClient.getRepositories().page.fetchPageBySlug(slug, locale);
    }

    async fetchMenuItems(locale: string): Promise<MenuItemType[]> {
        return await this.cmsClient.getRepositories().page.fetchMenuItems(locale);
    }
}