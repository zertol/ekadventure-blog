import { CategoryType } from "../../../types/domain/category-type";
import { PostType } from "../../../types/domain/post-type";

export interface ICategoryRepository {
    fetchAllCategories(): Promise<CategoryType[]>;
    fetchCategoryPosts(categoryName: string): Promise<PostType[]>;
}