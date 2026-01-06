import { PageType } from "../../types/domain/page-type";

export interface IPageService {
    fetchAllPages(): Promise<PageType[]>;
    fetchPrivacyPolicyPage(): Promise<PageType>;
}