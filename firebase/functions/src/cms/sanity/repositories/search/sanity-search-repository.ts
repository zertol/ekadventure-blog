import { Constants } from "../../../../Constants";
import { SearchResultType } from "../../../../types/domain/search-result-type";
import { SanityError } from "../../../../types/sanity/sanity-error";
import { SanityQueryResult } from "../../../../types/sanity/sanity-query-result";
import { formatString } from "../../../../utils/extensions";
import { ISearchRepository } from "../../../shared/interfaces/i-search-repository";
import { SharedRepository } from "../../../shared/shared-repository";
import { blocksToTexts, extractSnippetFromBlocks } from "../../sanity-helpers";
import { SEARCH_QUERY } from "../../sanity-queries";

export class SanitySearchRepository extends SharedRepository implements ISearchRepository {
    async search(query: string, locale: string, limit?: number, offset?: number): Promise<SearchResultType[]> {
        const groqTerm = `*${query.replace(/[*?\\]/g, "")}*`;

        const finalQuery = SEARCH_QUERY.replace(/\$query/g, "'" + groqTerm + "'").replace(/\$limit/g, limit ? limit.toString() : "10")
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