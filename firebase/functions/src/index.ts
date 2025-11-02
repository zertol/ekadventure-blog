import * as PagesController from "./controllers/pages/";
import * as PostsController from "./controllers/posts/";
import * as CategoriesController from "./controllers/categories/";
import * as AboutController from "./controllers/about/";
import * as CommentsController from "./controllers/comments/";
import * as ContactController from "./controllers/contact/";

export const fetchAllPages = PagesController.fetchAllPages;
export const fetchAllPosts = PostsController.fetchAllPosts;
export const fetchLatestPosts = PostsController.fetchLatestPosts;
export const fetchLatestPostsByCategories = PostsController.fetchLatestPostsByCategories;
export const fetchPostDetails = PostsController.fetchPostDetails;
export const fetchAllCategories = CategoriesController.fetchAllCategories;
export const fetchCategoryPosts = CategoriesController.fetchCategoryPosts;
export const fetchAboutDetails = AboutController.fetchAboutDetails;
export const addComment = CommentsController.addComment;
export const sendContactMail = ContactController.sendContactMail;