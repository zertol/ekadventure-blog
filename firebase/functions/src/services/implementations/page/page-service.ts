import { ICMSClient } from "../../../cms/shared/interfaces/i-cms-client";
import { PageType } from "../../../types/domain/page-type";
import { IPageService } from "../../interfaces/i-page-service";

export class PageService implements IPageService {
    constructor(private cmsClient: ICMSClient) { }

    async fetchAllPages(): Promise<PageType[]> {
        return await this.cmsClient.getRepositories().page.fetchAllPages();
    }
}