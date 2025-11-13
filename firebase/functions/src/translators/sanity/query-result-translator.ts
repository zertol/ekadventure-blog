import { ISanityTranslator } from "./i-sanity-translator";
import { SanityQueryResult } from "../../types/sanity/sanity-query-result";

export class QueryResultTranslator<T> implements ISanityTranslator<SanityQueryResult<T>> {
    translateToSanityResult(jsonData: any): SanityQueryResult<T> {
        return {
            query: jsonData.query,
            result: jsonData.result,
            syncTags: jsonData.syncTags,
            ms: jsonData.ms
        };
    }
}