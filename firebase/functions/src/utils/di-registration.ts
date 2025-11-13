import { ICMSClient } from "../cms/shared/interfaces/i-cms-client";
import { SantiyCMSClient } from "../cms/sanity/sanity-cms-client";
import { IMailService } from "../services/interfaces/i-mail-service";
import { MailService } from "../services/implementations/mail/mail-service";
import { PageService } from "../services/implementations/page/page-service";
import { PostService } from "../services/implementations/post/post-service";
import { IPageService } from "../services/interfaces/i-page-service";
import { IPostService } from "../services/interfaces/i-post-service";
import { DependencyContainer } from "./dependency-container";
import { DIResolutions } from "./di-resolution";
import { CommentService } from "../services/implementations/comment/comment-service";
import { ICommentService } from "../services/interfaces/i-comment-service";
import { ICategoryService } from "../services/interfaces/i-category-service";
import { CategoryService } from "../services/implementations/category/category-service";
import { AboutService } from "../services/implementations/about/about-service";
import { IAboutService } from "../services/interfaces/i-about-service";

export class DIRegistration {
    public static registerDependencies(): void {
        // Repository Instances
        DependencyContainer.register<ICMSClient>("ICMSClient", new SantiyCMSClient());

        // Service Instances
        DependencyContainer.register<IPageService>("IPageService", new PageService(
            DIResolutions.getCMSClient()
        ));

        DependencyContainer.register<IPostService>("IPostService", new PostService(
            DIResolutions.getCMSClient()
        ));

        DependencyContainer.register<ICommentService>("ICommentService", new CommentService(
            DIResolutions.getCMSClient()
        ));

        DependencyContainer.register<ICategoryService>("ICategoryService", new CategoryService(
            DIResolutions.getCMSClient()
        ));

        DependencyContainer.register<IAboutService>("IAboutService", new AboutService(
            DIResolutions.getCMSClient()
        ));

        DependencyContainer.register<IMailService>("IMailService", new MailService());
    }
}