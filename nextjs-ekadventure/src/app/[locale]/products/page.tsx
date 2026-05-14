import App from "@/components/App";
import { fetchAllPages } from "@/api/controllers/pages";
import { Metadata } from "next";
import {
  getLatestProducts,
  getTotalProducts,
} from "@/api/controllers/ecommerce";
import Shop from "@/components/Pages/Shop";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const pages = await fetchAllPages({});

  const page = pages.Result?.find((page) => page.slug === "products");

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

export default async function ProductsPage() {
  const [products, totalProducts] = await Promise.all([
    getLatestProducts(),
    getTotalProducts(),
  ]);

  const tShop = await getTranslations("Shop");

  return (
    products.Result && (
      <App currentPage="products" headerImage={{
        text: {
          firstPart: tShop("shopHeaderCaptionFirstPart"),
          secondPart: tShop("shopHeaderCaptionSecondPart"),
        }
      }}>
        <Shop
          products={products.Result}
          totalProducts={totalProducts.Result?.count || 0}
        />
      </App>
    )
  );
}
