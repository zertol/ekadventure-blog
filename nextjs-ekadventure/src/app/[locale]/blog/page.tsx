import App from "@/components/App";
import Blog from "@/components/Pages/Blog";
import { fetchAllPosts } from "@/api/controllers/posts";
import { fetchAllCategories } from "@/api/controllers/categories";
import { fetchPageBySlug } from "@/api/controllers/pages";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const localParams = await params;

  const page = await fetchPageBySlug({locale: localParams.locale, slug: "blog"});

  const metaData: Metadata = {
    title: page.Result?.title,
    description: page.Result?.metadata?.description,
    openGraph: {
      title: page.Result?.title,
      description: page.Result?.metadata?.description,
      images: page.Result?.metadata ? [page.Result?.metadata?.ogImage?.url] : [],
    },
  };

  return metaData;
}

export default async function BlogPage({
  params,
}: {
  params: { locale: string };
}) {
  const localParams = await params;

  const [posts, categories, page] = await Promise.all([
    fetchAllPosts(localParams),
    fetchAllCategories(localParams),
    fetchPageBySlug({locale: localParams.locale, slug: "blog"})
  ]);

  const tBlog = await getTranslations("Blog");

  return (
    posts.Result && (
      <App currentPage="blog">
        <Blog posts={posts.Result} categories={categories.Result ?? []} page={page.Result} />
      </App>
    )
  );
}
