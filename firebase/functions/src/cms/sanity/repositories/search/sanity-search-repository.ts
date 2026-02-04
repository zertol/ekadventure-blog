import { Constants } from "../../../../Constants";
import { SearchLocaleKeysResultType, SearchResultType } from "../../../../types/domain/search-result-type";
import { SanityError } from "../../../../types/sanity/sanity-error";
import { SanityQueryResult } from "../../../../types/sanity/sanity-query-result";
import { formatString } from "../../../../utils/extensions";
import { ISearchRepository } from "../../../shared/interfaces/i-search-repository";
import { SharedRepository } from "../../../shared/shared-repository";
import { blocksToTexts, extractSnippetFromBlocks } from "../../sanity-helpers";
import { SEARCH_KEYS_QUERY, SEARCH_QUERY } from "../../sanity-queries";

export class SanitySearchRepository extends SharedRepository implements ISearchRepository {
    async search(query: string, locale: string, limit?: number, offset?: number): Promise<SearchResultType[]> {
        const groqTerm = `*${query.replace(/[*?\\]/g, "")}*`;

        /** This part insures that we go through all of the languages without hard coding each key in our query e.g "en", "fr" are language keys
         * and if we wanna add a third language, we would have to hard code it in the query. Instead, we construct a match query with all of the languages that we have
         * to be able to find the search term in all of our content
         */
        const responseKeys = await fetch(`${formatString(Constants.SANITY_BASE_URL, process.env.SANITY_PROJECT_ID)}/query/production?query=${encodeURIComponent(SEARCH_KEYS_QUERY)}`);

        if (!responseKeys.ok) {
            const errorData = (await responseKeys.json()) as SanityError;
            throw new Error(`Sanity fetch error: ${JSON.stringify(errorData.error)}`);
        }

        const keysResult = await responseKeys.json().then((data: SanityQueryResult<SearchLocaleKeysResultType>) => data.result);

        const keysArray = Object.keys(keysResult.title);

        let matchQuery = "(";

        keysArray.forEach((localeKey, index) => {
            matchQuery += `title["${localeKey}"] match "${groqTerm}" || name["${localeKey}"] match "${groqTerm}" ||
             pt::text(content["${localeKey}"]) match "${groqTerm}"`;

            if (index < keysArray.length - 1) {
                matchQuery += " || ";
            }
        });

        matchQuery += ")";
        /** End of match query construction */

        const finalQuery = SEARCH_QUERY.replace(/\$matchquery/g, matchQuery).replace(/\$query/g, "'" + groqTerm + "'").replace(/\$limit/g, limit ? limit.toString() : "10")
            .replace(/\$offset/g, offset ? offset.toString() : "0").replace(/\$locale/g, `'${locale}'`);

        const response = await fetch(`${formatString(Constants.SANITY_BASE_URL, process.env.SANITY_PROJECT_ID)}/query/production?query=${encodeURIComponent(finalQuery)}`);

        if (!response.ok) {
            const errorData = (await response.json()) as SanityError;
            throw new Error(`Sanity fetch error: ${JSON.stringify(errorData.error)}`);
        }

        return response.json().then((data: SanityQueryResult<SearchResultType[]>) => {
            const mapped: SearchResultType[] = data.result.map((res: SearchResultType) => {
                if (res._type === "category") {
                    return {
                        ...res,
                        href: res.slug ? `/category/${res.slug.current}` : null,
                        snippet: null
                    };
                }

                // post
                const texts = blocksToTexts(res.content);
                const match = extractSnippetFromBlocks(texts, query);
                return {
                    ...res,
                    href: res.slug ? `/${res.slug.current}` + (match ? `#match-${match.blockIndex}` : "") : null,
                    snippet: match ? match.snippet : null,
                    matchBlockIndex: match ? match.blockIndex : null
                };
            });

            return mapped;
        });
    }
}