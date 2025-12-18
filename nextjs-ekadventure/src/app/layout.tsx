import type { Metadata } from "next";
import "./globals.css";
import PagesContextProvider from "@/store/PagesContext";
import { Suspense } from "react";
import { fetchAllPages } from "@/api/controllers/pages";
import Script from "next/script";
import AnalyticsTracker from "@/components/Analytics/AnalyticsTracker";

export const metadata: Metadata = {
  title: {
    default: "Ekadventure Blog",
    template: "%s | Ekadventure Blog"
  },
  description: "Explore outdoor adventures through travel guides, hikes, and articles on Ekadventure Blog.",
  openGraph: {
    type: "website",
    locale: "en_CA",
    alternateLocale: ["fr_CA"],
    url: "https://ekadventure.com",
    title: "Ekadventure",
    description: "Explore outdoor adventures through travel guides, hikes, and articles on Ekadventure Blog.",
    images: [
      {
        url: "https://r2.ekadventure.com/cdn-cgi/image/width=1200,format=jpg,quality=80/blog/default-og.jpg",
        width: 1200,
        alt: "Ekadventure",
      },
    ],
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pagesProps: PagesContextType = { pages: [], error: null };
  try {

    const result = await fetchAllPages();

    if (result.ErrorMessages && result.ErrorMessages.length > 0) {
      throw new Error(result.ErrorMessages.join(", "));
    }

    pagesProps.pages = result.Result || [];
    
  } catch (err) {
    console.error("Error fetching Pages Data:", err);
    // pagesProps.error =
    //   err instanceof Error
    //     ? err
    //     : new Error("An error occurred while fetching Pages Data");
  }

  return (
    <html lang="en">
      <head>
        <Script
          async
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9735828709569989"
          crossOrigin="anonymous"
        />
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
        >
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-NYY4JSF39D');
          `}
        </Script>
      </head>
      <body>
        <PagesContextProvider pagesProps={pagesProps}>
            <Suspense>
              {children}
            </Suspense>
        </PagesContextProvider>
        <AnalyticsTracker />
      </body>
    </html>
  );
}
