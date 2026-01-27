import { SearchResultType } from "../../../types/domain/search-result-type";

export interface ISearchRepository {
    search(query: string, locale: string, limit?: number, offset?: number): Promise<SearchResultType[]>;
}