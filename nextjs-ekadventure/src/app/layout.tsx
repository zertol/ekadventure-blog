import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LoaderContextProvider from "./store/LoaderContext";
import CategoryContextProvider from "./store/CategoryContext";
import Loader from "./components/Loader/page";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EkAdventure Blog",
  description: "Share your adventures with the world",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LoaderContextProvider>
          <CategoryContextProvider>
            <Loader />
            {children}
          </CategoryContextProvider>
        </LoaderContextProvider>
      </body>
    </html>
  );
}
