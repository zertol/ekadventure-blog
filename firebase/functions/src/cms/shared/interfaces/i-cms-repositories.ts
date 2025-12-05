import { IAboutRepository } from "./i-about-repository";
import { ICategoryRepository } from "./i-category-repository";
import { ICommentRepository } from "./i-comment-repository";
import { IPageRepository } from "./i-page-repository";
import { IPostRepository } from "./i-post-repository";
import { ISearchRepository } from "./i-search-repository";

export interface ICMSRepositories {
    page: IPageRepository;
    post: IPostRepository;
    comment: ICommentRepository;
    category: ICategoryRepository;
    about: IAboutRepository;
    search: ISearchRepository;
}