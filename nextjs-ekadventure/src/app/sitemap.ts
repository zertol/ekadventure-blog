import type { MetadataRoute } from 'next'
import { fetchAllPosts } from '@/api/controllers/posts'
import { fetchAllCategories } from '@/api/controllers/categories'

const DOMAIN = "https://ekadventure.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Static pages
  const staticPages = [
    { path: { en: "/", fr: "/fr" }, priority: 1.0, changefreq: "weekly" as const },
    { path: { en: "/blog", fr: "/fr/blog" }, priority: 0.9, changefreq: "weekly" as const },
    { path: { en: "/videos", fr: "/fr/videos" }, priority: 0.9, changefreq: "weekly" as const },
    { path: { en: "/products", fr: "/fr/produits" }, priority: 0.9, changefreq: "weekly" as const },
    { path: { en: "/about", fr: "/fr/a-propos" }, priority: 0.9, changefreq: "weekly" as const },
    { path: { en: "/contact", fr: "/fr/contactez-nous" }, priority: 0.9, changefreq: "weekly" as const }
  ];

  // Add static pages with i18n alternates
  for (const page of staticPages) {
    sitemapEntries.push({
      url: `${DOMAIN}${page.path.en}`,
      lastModified: new Date(),
      changeFrequency: page.changefreq,
      priority: page.priority,
      alternates: {
        languages: {
          "en": `${DOMAIN}${page.path.en}`,
          "x-default": `${DOMAIN}${page.path.en}`,
          "fr": `${DOMAIN}${page.path.fr}`
        }
      }
    })
  }

  // Fetch and add all posts
  try {
    const postsResult = await fetchAllPosts({});

    if (postsResult.ErrorMessages && postsResult.ErrorMessages.length > 0) {
      throw new Error(`Error fetching posts: ${postsResult.ErrorMessages.join(", ")}`);
    }

    const posts = postsResult.Result || [];

    for (const post of posts) {
      const postSlug = post.slug.current;

      sitemapEntries.push({
        url: `${DOMAIN}/${postSlug}`,
        lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.8,
        alternates: {
          languages: {
            "en": `${DOMAIN}/${postSlug}`,
            "x-default": `${DOMAIN}/${postSlug}`,
            "fr": `${DOMAIN}/fr/${postSlug}`
          }
        }
      })
    }
  } catch (error) {
    console.error("Error fetching posts for sitemap:", error);
  }

  try {
    const categoriesResult = await fetchAllCategories({});

    if (categoriesResult.ErrorMessages && categoriesResult.ErrorMessages.length > 0) {
      throw new Error(`Error fetching posts: ${categoriesResult.ErrorMessages.join(", ")}`)
    }

    const categories = categoriesResult.Result || [];

    for (const category of categories) {
      const categorySlug = category.slug;

      sitemapEntries.push({
        url: `${DOMAIN}/category/${categorySlug}`,
        lastModified: new Date(),
        changeFrequency: "yearly" as const,
        priority: 0.7,
        alternates: {
          languages: {
            "en": `${DOMAIN}/category/${categorySlug}`,
            "x-default": `${DOMAIN}/category/${categorySlug}`,
            "fr": `${DOMAIN}/fr/categorie/${categorySlug}`
          }
        }
      })
    }
  } catch (error) {
    console.error('Error fetching categories for sitemap:', error)
  }

  return sitemapEntries
}