import { AboutType } from "../../../types/domain/about-type";

export interface IAboutRepository {
    fetchAboutDetails(locale: string): Promise<AboutType>;
}