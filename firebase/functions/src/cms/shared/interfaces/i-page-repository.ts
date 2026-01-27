import { PageType } from "../../../types/domain/page-type";

export interface IPageRepository {
    fetchAllPages(locale: string): Promise<PageType[]>;
    fetchPrivacyPolicyPage(locale: string): Promise<PageType>;
}