import { ICMSClient } from "../../../cms/shared/interfaces/i-cms-client";
import { AboutType } from "../../../types/domain/about-type";
import { IAboutService } from "../../interfaces/i-about-service";

export class AboutService implements IAboutService {
    constructor(private cmsClient: ICMSClient) { }

    async fetchAboutDetails(): Promise<AboutType> {
        return await this.cmsClient.getRepositories().about.fetchAboutDetails();
    }
}