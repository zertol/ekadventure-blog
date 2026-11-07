"use client";

import React from "react";
import HorizontalAd from "../Ads/Google/HorizontalAd";
import { ClientAdWrapper } from "../Ads/ClientAdWrapper";
import { ProductsResponseType } from "@/types/ecommerce/product-response-type";
import ProductsList from "../UI/ECommerce/ProductsList";
import { PageType } from "@/types/page-type";
import HeroSection from "../UI/Common/HeroSection/page";

interface ShopProps {
  products: ProductsResponseType;
  totalProducts: number;
  page: PageType | null;
}

const Shop: React.FC<ShopProps> = ({ products, totalProducts, page }) => {
  return (
    <div>
      <HeroSection page={page} />
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

      <div className="my-c-60">
        <ProductsList products={products} totalProducts={totalProducts} />
      </div>
    </div>
  );
};

export default Shop;