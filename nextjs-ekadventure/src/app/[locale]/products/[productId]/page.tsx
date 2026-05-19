import App from "@/components/App";
import { Metadata } from "next";
import { getAllProducts, getLatestProducts, getProductById, getSimilarProducts } from "@/api/controllers/ecommerce";
import { ProductType } from "@/types/ecommerce/product-type";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import ProductGallery from "@/components/UI/ECommerce/ProductGallery";
import { ProductsResponseType } from "@/types/ecommerce/product-response-type";

export async function generateMetadata({
  params,
}: {
  params: { locale: LocaleType; productId: string };
 }): Promise<Metadata> {
  const { locale, productId } = await params;
  const productResult = await getProductById({
    id: productId,
  });
  const product = productResult.Result;

  if (!product || !product ) {
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
  const products = await getAllProducts();

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
}: {
  params: { locale: LocaleType; productId: string };
}) {
  const localParams = await params;
  let productsResult;

  try {
    productsResult = await getAllProducts();
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

  const similarProducts: ProductsResponseType = {
    data: getSimilarProducts(product, allProducts),
    has_more: false
  };

  return (
    <App currentPage="product">
      {product && <ProductGallery product={product} locale={localParams.locale} similarProducts={similarProducts} />}
    </App>
  );
}
