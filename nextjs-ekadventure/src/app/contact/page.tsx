import { fetchAllPages } from "@/api/controllers/pages";
import App from "@/components/App";
import Contact from "@/components/Pages/Contact";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const pages = await fetchAllPages();

  const page = pages.Result?.find((page) => page.slug === "contact");

  if (!page) {
    return {};
  }

  const metaData: Metadata = {
    title: page.title,
    description: page.metadata?.description,
    openGraph: {
      title: page.title,
      description: page.metadata?.description,
      images: page.metadata ? [page.metadata?.ogImage?.url] : [],
    },
  };

  return metaData;
}

export default function ContactPage() {
  return (
    <App currentPage="contact">
      <Contact />
    </App>
  );
}
