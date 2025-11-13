import type { Metadata } from "next";
import "./globals.css";
import PagesContextProvider from "@/store/PagesContext";
import { Suspense } from "react";
import { fetchAllPages } from "@/api/controllers/pages";

export const metadata: Metadata = {
  title: "EkAdventure Blog",
  description: "Share your adventures with the world",
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
      <body>
        <PagesContextProvider pagesProps={pagesProps}>
            <Suspense>
              {children}
            </Suspense>
        </PagesContextProvider>
      </body>
    </html>
  );
}
