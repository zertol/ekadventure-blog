import { ICMSClient } from "../../../cms/shared/interfaces/i-cms-client";
import { CategoryType } from "../../../types/domain/category-type";
import { PostType } from "../../../types/domain/post-type";
import { ICategoryService } from "../../interfaces/i-category-service";

export class CategoryService implements ICategoryService {
    constructor(private cmsClient: ICMSClient) { }

    async fetchAllCategories(): Promise<CategoryType[]> {
        return await this.cmsClient.getRepositories().category.fetchAllCategories();
    }

    async fetchCategoryPosts(categoryName: string): Promise<PostType[]> {
        return await this.cmsClient.getRepositories().category.fetchCategoryPosts(categoryName);
    }
}