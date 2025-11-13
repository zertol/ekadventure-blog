import { ICMSClient } from "../cms/shared/interfaces/i-cms-client";
import { IMailService } from "../services/interfaces/i-mail-service";
import { MailService } from "../services/implementations/mail/mail-service";
import { PageService } from "../services/implementations/page/page-service";
import { PostService } from "../services/implementations/post/post-service";
import { IPageService } from "../services/interfaces/i-page-service";
import { IPostService } from "../services/interfaces/i-post-service";
import { DependencyContainer } from "./dependency-container";
import { ICommentService } from "../services/interfaces/i-comment-service";
import { CommentService } from "../services/implementations/comment/comment-service";
import { ICategoryService } from "../services/interfaces/i-category-service";
import { CategoryService } from "../services/implementations/category/category-service";
import { AboutService } from "../services/implementations/about/about-service";
import { IAboutService } from "../services/interfaces/i-about-service";

export class DIResolutions {
    //Service Instances
    static getPageService = (): IPageService => DependencyContainer.resolve<PageService>("IPageService");
    static getPostService = (): IPostService => DependencyContainer.resolve<PostService>("IPostService");
    static getCommentService = (): ICommentService => DependencyContainer.resolve<CommentService>("ICommentService");
    static getMailService = (): IMailService => DependencyContainer.resolve<MailService>("IMailService");
    static getCategoryService = (): ICategoryService => DependencyContainer.resolve<CategoryService>("ICategoryService");
    static getAboutService = (): IAboutService => DependencyContainer.resolve<AboutService>("IAboutService");

    //CMS Client Instance
    static getCMSClient = (): ICMSClient => DependencyContainer.resolve<ICMSClient>("ICMSClient");
};

