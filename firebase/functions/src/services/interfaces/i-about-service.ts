import { AboutType } from "../../types/domain/about-type";

export interface IAboutService {
    fetchAboutDetails(locale: string): Promise<AboutType>;
}