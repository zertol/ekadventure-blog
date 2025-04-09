import type { Metadata } from "next";
import "./globals.css";
import CategoryContextProvider from "./store/CategoryContext";
import PagesContextProvider from "./store/PagesContext";
import LoadingProvider from "./store/LoadingContext";
import { client } from "./sanity/client";
import { draftMode } from "next/headers";
import { groq } from "next-sanity";

type PageType = {
  imageUrl: string;
  slug: string;
  title: string;
  order: number;
};

export const metadata: Metadata = {
  title: "EkAdventure Blog",
  description: "Share your adventures with the world",
};

// This query will be cached and reused
const pagesQuery = groq`*[_type == "page" && visible == true] | order(order asc) {
  "imageUrl": featuredMedia.asset->url,
  "slug": slug.current,
  title,
  order
}`;

// This function tells Next.js to build these paths at build time
export async function generateStaticParams() {
  const pages = await client.fetch<PageType[]>(pagesQuery);
  return pages.map((page) => ({
    slug: page.slug,
  }));
}

async function getPages() {
  // In production, use cached data with ISR
  return client.fetch<PageType[]>(
    pagesQuery,
    {},
    {
      next: {
        revalidate: 3600, // Revalidate every hour
        tags: ["pages"],
      },
    }
  );
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pages = await getPages();

  return (
    <html lang="en">
      <body>
        <PagesContextProvider initialPages={pages}>
          <CategoryContextProvider>
            <LoadingProvider>{children}</LoadingProvider>
          </CategoryContextProvider>
        </PagesContextProvider>
      </body>
    </html>
  );
}
