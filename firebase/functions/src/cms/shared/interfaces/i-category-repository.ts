import { CategoryType } from "../../../types/domain/category-type";
import { PostType } from "../../../types/domain/post-type";

export interface ICategoryRepository {
    fetchAllCategories(locale: string): Promise<CategoryType[]>;
    fetchCategoryPosts(categoryName: string, locale: string): Promise<PostType[]>;
}