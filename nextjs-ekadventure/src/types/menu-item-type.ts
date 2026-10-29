import { PageType } from "./page-type";

export type MenuItemType = Pick<PageType, "slug" | "title" | "order" | "metadata">;