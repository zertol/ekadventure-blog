import * as PagesController from "./controllers/pages/";
import * as PostsController from "./controllers/posts/";
import * as CategoriesController from "./controllers/categories/";
import * as AboutController from "./controllers/about/";
import * as CommentsController from "./controllers/comments/";
import * as ContactController from "./controllers/contact/";
import * as SearchController from "./controllers/search/";
import * as YouTubeController from "./controllers/youtube/";
import { DIRegistration } from "./utils/di-registration";

// Dependency Registrations
DIRegistration.registerDependencies();

// Page Controllers
export const fetchAllPages = PagesController.fetchAllPages;

// Post Controllers
export const fetchAllPosts = PostsController.fetchAllPosts;
export const fetchLatestPosts = PostsController.fetchLatestPosts;
export const fetchLatestPostsByCategories = PostsController.fetchLatestPostsByCategories;
export const fetchPostDetails = PostsController.fetchPostDetails;

// Category Controllers
export const fetchAllCategories = CategoriesController.fetchAllCategories;
export const fetchCategoryPosts = CategoriesController.fetchCategoryPosts;

// About Controllers
export const fetchAboutDetails = AboutController.fetchAboutDetails;

// Comments Controllers
export const addComment = CommentsController.addComment;

// Contact Controllers
export const sendContactMail = ContactController.sendContactMail;
export const createNewsletterSubscriptionEmail = ContactController.createNewsletterSubscriptionEmail;
export const unsubscribe = ContactController.unsubscribe;

// Search Controllers
export const search = SearchController.search;

//YouTube
export const getLatestVideos = YouTubeController.getLatestVideos;