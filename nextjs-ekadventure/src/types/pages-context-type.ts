import { PageType } from "./page-type";

export type PagesContextType = {
    pages: PageType[];
    error: Error | null;
};