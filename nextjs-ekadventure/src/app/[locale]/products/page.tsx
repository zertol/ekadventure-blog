import App from "@/components/App";
import { fetchAllPages, fetchPageBySlug } from "@/api/controllers/pages";
import { Metadata } from "next";
import {
  getLatestProducts,
  getTotalProducts,
} from "@/api/controllers/ecommerce";
import Shop from "@/components/Pages/Shop";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const localParams = await params;

  const page = await fetchPageBySlug({locale: localParams.locale, slug: "products"});
 
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

export default async function ProductsPage({
  params,
}: {
  params: { locale: string };
}) {
  const localParams = await params;

  const page = await fetchPageBySlug({locale: localParams.locale, slug: "products"});

  const [products, totalProducts] = await Promise.all([
    getLatestProducts(),
    getTotalProducts(),
  ]);

  const tShop = await getTranslations("Shop");

  return (
    products.Result && (
      <App currentPage="products">
        <Shop
          products={products.Result}
          totalProducts={totalProducts.Result?.count || 0}
          page={page.Result}
        />
      </App>
    )
  );
}
