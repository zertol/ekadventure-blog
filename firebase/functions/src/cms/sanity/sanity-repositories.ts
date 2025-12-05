import { IPageRepository } from "../shared/interfaces/i-page-repository";
import { IPostRepository } from "../shared/interfaces/i-post-repository";
import { SanityPageRepository } from "./repositories/page/sanity-page-repository";
import { SanityPostRepository } from "./repositories/post/sanity-post-repository";
import { ICMSRepositories } from "../shared/interfaces/i-cms-repositories";
import { ICommentRepository } from "../shared/interfaces/i-comment-repository";
import { SanityCommentRepository } from "./repositories/comment/sanity-comment-repository";
import { ICategoryRepository } from "../shared/interfaces/i-category-repository";
import { SanityCategoryRepository } from "./repositories/category/sanity-category-repository";
import { IAboutRepository } from "../shared/interfaces/i-about-repository";
import { SanityAboutRepository } from "./repositories/about/sanity-about-repository";
import { SanitySearchRepository } from "./repositories/search/sanity-search-repository";
import { ISearchRepository } from "../shared/interfaces/i-search-repository";

export class SanityRepositories implements ICMSRepositories {
    page: IPageRepository;
    post: IPostRepository;
    comment: ICommentRepository;
    category: ICategoryRepository;
    about: IAboutRepository;
    search: ISearchRepository;

    constructor() {
        this.page = new SanityPageRepository();
        this.post = new SanityPostRepository();
        this.comment = new SanityCommentRepository();
        this.category = new SanityCategoryRepository();
        this.about = new SanityAboutRepository();
        this.search = new SanitySearchRepository();
    }
}