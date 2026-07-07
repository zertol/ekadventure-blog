import App from "@/components/App";
import { Metadata } from "next";
import { getAllProducts, getSimilarProducts } from "@/api/controllers/ecommerce";
import { ProductType } from "@/types/ecommerce/product-type";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import ProductGallery from "@/components/UI/ECommerce/ProductGallery";
import { ProductsResponseType } from "@/types/ecommerce/product-response-type";
import { ProductItemSource } from "@/types/ecommerce/product-metadata-type";

const getCachedProducts = async (): Promise<ApiResult<ProductType[]>> => {
  return await getAllProducts();
};

export async function generateMetadata({
  params,
}: {
  params: { locale: LocaleType; productId: string };
 }): Promise<Metadata> {
  const { locale, productId } = await params;
  const productsResult = await getCachedProducts();

  if (!productsResult.Result) {
    return {};
  }

  const product = productsResult.Result.find(p => p.id === productId);

  if (!product) {
    return {};
  }

  const metaData: Metadata = {
    title: product.name[locale],
    description: product.description[locale],
    openGraph: {
      title: product.name[locale],
      description: product.description[locale],
      images: product.images,
    },
  };

  return metaData;
}

export async function generateStaticParams() {
  const products = await getCachedProducts();

  const params = products.Result?.flatMap((product: ProductType) => {
    return routing.locales.map((locale) => ({
      locale: locale,
      productId: product.id,
    }));
  });

  return params || [];
}

export default async function ProductPage({
  params,
  searchParams
}: {
  params: { locale: LocaleType; productId: string};
  searchParams: {itemSource?: string; itemSourceId?: string};
}) {
  const localParams = await params;
  const localSearchParams = await searchParams;

  let productsResult;

  try {
    productsResult = await getCachedProducts();
  } catch (error) {
    console.error(`Unable to find product with id: ${localParams.productId}`, error);
    return notFound();
  }

  if (!productsResult.Result) {
    return notFound();
  }

  const allProducts = productsResult.Result;

  const product = allProducts.find(p => p.id === localParams.productId);

  if (!product) {
    return notFound();
  }

  product.metadata.item_source = localSearchParams.itemSource as ProductItemSource || product.metadata.item_source;
  product.metadata.item_source_id = localSearchParams.itemSourceId || product.metadata.item_source_id;

  const similarProducts: ProductsResponseType = {
    data: getSimilarProducts(product, allProducts),
    has_more: false,
    next_page: null
  };

  return (
    <App currentPage="product">
      {product && <ProductGallery product={product} locale={localParams.locale} similarProducts={similarProducts} />}
    </App>
  );
}
