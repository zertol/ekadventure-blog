import App from "@/components/App";
import About from "@/components/Pages/About";
import { fetchLatestPosts } from "@/api/controllers/posts";
import { fetchAboutDetails } from "@/api/controllers/about";
import { Metadata } from "next";
import { fetchPageBySlug } from "@/api/controllers/pages";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const localParams = await params;

  const page = await fetchPageBySlug({locale: localParams.locale, slug: "about"});
  
  const metaData: Metadata = {
    title: page.Result?.title,
    description: page.Result?.metadata?.description,
    openGraph: {
      title: page.Result?.title,
      description: page.Result?.metadata?.description,
      images: page.Result?.metadata ? [page.Result?.metadata?.ogImage?.url] : [],
    },
    alternates: {
      canonical: `/${page.Result?.slug}`,
      languages: {
        en: `/${page.Result?.slug}`,
        fr: `/fr/a-propos`,
      },
    },
  };

  return metaData;
}

export default async function AboutPage({
  params,
}: {
  params: { locale: string };
}) {
  const localParams = await params;

  const [posts, page] = await Promise.all([
    fetchLatestPosts(localParams),
    fetchPageBySlug({locale: localParams.locale, slug: "about"})
  ]);

  return (
    <App currentPage="about">
      <About latestPosts={posts.Result ?? []} page={page.Result} />
    </App>
  );
}
