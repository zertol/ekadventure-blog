"use client";

import { ProductType } from "@/types/ecommerce/product-type";
import { Product } from "./Product";
import { useState } from "react";
import { ProductsResponseType } from "@/types/ecommerce/product-response-type";
import { getProductsByRoute } from "@/api/controllers/ecommerce";
import { useTranslations } from "next-intl";

const ProductsList: React.FC<{
  products: ProductsResponseType;
  totalProducts?: number;
  isRelated?: boolean;
}> = ({ products, totalProducts, isRelated }) => {
  const [visibleProducts, setVisibleProducts] = useState(products.data);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(products.has_more);

  const tUI = useTranslations("UI");

  const handleLoadMoreProducts = async () => {
    setIsLoading(true);
    try {
      const params: Record<string, string> = {
        lastProductId: visibleProducts[visibleProducts.length - 1].id
      };
      const response = await getProductsByRoute(params);
      setHasMore(response.Result?.has_more ?? false);
      setVisibleProducts((prev) => {
        return [...prev, ...(response.Result?.data || [])];
      });
    } catch (error) {
      console.error("Error loading more products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className={`grid grid-cols-1 items-start md:items-stretch ${isRelated ? "md:grid-cols-4 lg:grid-cols-5" : "md:grid-cols-2 lg:grid-cols-3"} gap-12 mb-12`}>
        {visibleProducts
          .slice(0, visibleProducts.length)
          .map((product: ProductType) => {
            return <Product key={product.id} product={product} isRelated={isRelated} />;
          })}
      </div>

      {totalProducts && visibleProducts.length < totalProducts && hasMore && (
        <div className="text-center">
          <button
            onClick={handleLoadMoreProducts}
            disabled={isLoading}
            className="relative primary-button px-6 py-2"
          >
            {tUI("loadMore")}
            {isLoading && (
              <div className="absolute flex items-center justify-center inset-0">
                <div className="w-6 h-6 border-4 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </button>
        </div>
      )}
    </>
  );
};

export default ProductsList;