import { PageType } from "../../../../types/domain/page-type";
import { SharedRepository } from "../../../shared/shared-repository";
import { formatString } from "../../../../utils/extensions";
import { Constants } from "../../../../Constants";
import { PAGES_QUERY } from "../../sanity-queries";
import { SanityError } from "../../../../types/sanity/sanity-error";
import { SanityQueryResult } from "../../../../types/sanity/sanity-query-result";
import { IPageRepository } from "../../../shared/interfaces/i-page-repository";

export class SanityPageRepository extends SharedRepository implements IPageRepository {
    async fetchAllPages(): Promise<PageType[]> {
        const response = await fetch(`${formatString(Constants.SANITY_BASE_URL, process.env.SANITY_PROJECT_ID)}/query/production?query=${encodeURIComponent(PAGES_QUERY)}`);

        if (!response.ok) {
            const errorData = (await response.json()) as SanityError;
            throw new Error(`Sanity fetch error: ${JSON.stringify(errorData.error)}`);
        }

        return response.json().then((data: SanityQueryResult<PageType[]>) => data.result);
    }
}