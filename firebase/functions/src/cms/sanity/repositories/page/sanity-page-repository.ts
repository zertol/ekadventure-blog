import { PageType } from "../../../../types/domain/page-type";
import { SharedRepository } from "../../../shared/shared-repository";
import { formatString } from "../../../../utils/extensions";
import { Constants } from "../../../../Constants";
import { MENU_ITEMS_QUERY, PAGE_BY_SLUG_QUERY, PAGES_QUERY, PRIVACY_PAGE_QUERY } from "../../sanity-queries";
import { SanityError } from "../../../../types/sanity/sanity-error";
import { SanityQueryResult } from "../../../../types/sanity/sanity-query-result";
import { IPageRepository } from "../../../shared/interfaces/i-page-repository";
import { MenuItemType } from "../../../../types/domain/menu-item-type";

export class SanityPageRepository extends SharedRepository implements IPageRepository {
    async fetchPrivacyPolicyPage(locale: string): Promise<PageType> {
        const finalQuery = PRIVACY_PAGE_QUERY.replace(/\$locale/g, `'${locale}'`);
        const response = await fetch(`${formatString(Constants.SANITY_BASE_URL, process.env.SANITY_PROJECT_ID)}/query/production?query=${encodeURIComponent(finalQuery)}`);

        if (!response.ok) {
            const errorData = (await response.json()) as SanityError;
            throw new Error(`Sanity fetch error: ${JSON.stringify(errorData.error)}`);
        }

        return response.json().then((data: SanityQueryResult<PageType>) => data.result);
    }

    async fetchAllPages(locale: string): Promise<PageType[]> {
        const finalQuery = PAGES_QUERY.replace(/\$locale/g, `'${locale}'`);
        const response = await fetch(`${formatString(Constants.SANITY_BASE_URL, process.env.SANITY_PROJECT_ID)}/query/production?query=${encodeURIComponent(finalQuery)}`);

        if (!response.ok) {
            const errorData = (await response.json()) as SanityError;
            throw new Error(`Sanity fetch error: ${JSON.stringify(errorData.error)}`);
        }

        return response.json().then((data: SanityQueryResult<PageType[]>) => data.result);
    }

    async fetchPageBySlug(slug: string, locale: string): Promise<PageType> {
        const finalQuery = PAGE_BY_SLUG_QUERY.replace(/\$slug/g, `'${slug}'`).replace(/\$locale/g, `'${locale}'`);
        const response = await fetch(`${formatString(Constants.SANITY_BASE_URL, process.env.SANITY_PROJECT_ID)}/query/production?query=${encodeURIComponent(finalQuery)}`);

        if (!response.ok) {
            const errorData = (await response.json()) as SanityError;
            throw new Error(`Sanity fetch error: ${JSON.stringify(errorData.error)}`);
        }

        return response.json().then((data: SanityQueryResult<PageType>) => data.result);
    }

    async fetchMenuItems(locale: string): Promise<MenuItemType[]> {
        const finalQuery = MENU_ITEMS_QUERY.replace(/\$locale/g, `'${locale}'`);
        const response = await fetch(`${formatString(Constants.SANITY_BASE_URL, process.env.SANITY_PROJECT_ID)}/query/production?query=${encodeURIComponent(finalQuery)}`);

        if (!response.ok) {
            const errorData = (await response.json()) as SanityError;
            throw new Error(`Sanity fetch error: ${JSON.stringify(errorData.error)}`);
        }
        return response.json().then((data: SanityQueryResult<MenuItemType[]>) => data.result);
    }
}