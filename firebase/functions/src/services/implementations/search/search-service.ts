import { ICMSClient } from "../../../cms/shared/interfaces/i-cms-client";
import { SearchResultType } from "../../../types/domain/search-result-type";
import { ISearchService } from "../../interfaces/i-search-service";

export class SearchService implements ISearchService {
    constructor(private cmsClient: ICMSClient) { }

    async search(query: string, limit?: number, offset?: number): Promise<SearchResultType[]> {
        const result = await this.cmsClient.getRepositories().search.search(query, limit, offset);
        return result;
    }
}