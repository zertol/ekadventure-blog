import { Constants } from "../../../../Constants";
import { AboutType } from "../../../../types/domain/about-type";
import { SanityError } from "../../../../types/sanity/sanity-error";
import { SanityQueryResult } from "../../../../types/sanity/sanity-query-result";
import { formatString } from "../../../../utils/extensions";
import { IAboutRepository } from "../../../shared/interfaces/i-about-repository";
import { ABOUT_PAGE_QUERY } from "../../sanity-queries";

export class SanityAboutRepository implements IAboutRepository {
    async fetchAboutDetails(): Promise<AboutType> {
        const response = await fetch(`${formatString(Constants.SANITY_BASE_URL, process.env.SANITY_PROJECT_ID)}/query/production?query=${encodeURIComponent(ABOUT_PAGE_QUERY)}`);

        if (!response.ok) {
            const errorData = (await response.json()) as SanityError;
            throw new Error(`Sanity fetch error: ${JSON.stringify(errorData.error)}`);
        }

        return response.json().then((data: SanityQueryResult<AboutType>) => data.result);
    }
}