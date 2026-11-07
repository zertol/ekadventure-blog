import { fetchPageBySlug } from "@/api/controllers/pages";
import App from "@/components/App";
import Contact from "@/components/Pages/Contact";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const localParams = await params;

  const page = await fetchPageBySlug({locale: localParams.locale, slug: "contact"});

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

export default async function ContactPage({
  params,
}: {
  params: { locale: string };
}) {
  const localParams = await params;

  const page = await fetchPageBySlug({locale: localParams.locale, slug: "contact"});

  return (
    <App currentPage="contact">
      <Contact page={page.Result} />
    </App>
  );
}
