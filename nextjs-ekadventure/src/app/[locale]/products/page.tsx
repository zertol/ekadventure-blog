import App from "@/components/App";
import { fetchAllPages } from "@/api/controllers/pages";
import { Metadata } from "next";
import {
  getLatestProducts,
  getTotalProducts,
} from "@/api/controllers/ecommerce";
import ProductsList from "@/components/UI/ECommerce/ProductsList";
import Shop from "@/components/Pages/Shop";

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

  return (
    products.Result && (
      <App currentPage="products">
        <Shop
          products={products.Result}
          totalProducts={totalProducts.Result?.count || 0}
        />
      </App>
    )
  );
}
