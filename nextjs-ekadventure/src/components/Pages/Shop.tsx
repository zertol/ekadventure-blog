"use client";

import React from "react";
import HorizontalAd from "../Ads/Google/HorizontalAd";
import { ClientAdWrapper } from "../Ads/ClientAdWrapper";
import { ProductsResponseType } from "@/types/ecommerce/product-response-type";
import ProductsList from "../UI/ECommerce/ProductsList";

interface ShopProps {
  products: ProductsResponseType;
  totalProducts: number;
}

const Shop: React.FC<ShopProps> = ({ products, totalProducts }) => {
  return (
    <div>
      <div className="w-full flex justify-center">
        <div className="w-full md:w-[768px]">
          <ClientAdWrapper
            headerText="Google"
            className="mt-3"
            isCollapsible={false}
          >
            <HorizontalAd adSlot="5553437940" />
          </ClientAdWrapper>
        </div>
      </div>

      <div className="container mx-auto px-8 lg:px-20 my-c-60">
        <ProductsList products={products} totalProducts={totalProducts} />
      </div>
    </div>
  );
};

export default Shop;