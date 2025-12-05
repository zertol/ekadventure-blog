import { SearchResultType } from "../../types/domain/search-result-type";

export interface ISearchService {
    search(query: string, limit?: number, offset?: number): Promise<SearchResultType[]>;
}