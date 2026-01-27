import { PageType } from "../../types/domain/page-type";

export interface IPageService {
    fetchAllPages(locale: string): Promise<PageType[]>;
    fetchPrivacyPolicyPage(locale: string): Promise<PageType>;
}