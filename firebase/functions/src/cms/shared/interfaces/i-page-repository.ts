import { PageType } from "../../../types/domain/page-type";

export interface IPageRepository {
    fetchAllPages(): Promise<PageType[]>;
    fetchPrivacyPolicyPage(): Promise<PageType>;
}