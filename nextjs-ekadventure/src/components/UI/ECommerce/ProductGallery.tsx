"use client";

import React, { useState, useCallback } from "react";
import { ProductType } from "@/types/ecommerce/product-type";
import ImageCarousel from "../Carousel/ImageCarousel";
import styles from "./ProductGallery.module.css";
import { useTranslations } from "next-intl";
import ProductsList from "./ProductsList";
import { ProductsResponseType } from "@/types/ecommerce/product-response-type";
import { createCheckoutSession } from "@/api/controllers/ecommerce";
import { BASE_URL, SUCCESS_URL } from "@/utils/constants";
import { formatString } from "@/utils/data/helpers";

interface ProductGalleryProps {
  product: ProductType;
  relatedProducts: ProductsResponseType;
  locale: LocaleType;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({
  product,
  relatedProducts,
  locale,
}) => {
  const tShop = useTranslations("Shop");

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleThumbnailClick = useCallback((index: number) => {
    setSelectedImageIndex(index);
  }, []);

  const buyNowClick = async () => {
    setIsLoading(true);
    try {
      const response = await createCheckoutSession({
        priceId: product.default_price?.id ?? "",
        cancelUrl: window.location.toString(),
        isQuantityAdjustable: false,
        metadata: product.metadata,
        quantity: 1,
        successUrl: `${BASE_URL}/${formatString(SUCCESS_URL, locale)}`,
        locale: locale
      });

      if(response.ErrorMessages && response.ErrorMessages.length > 0) {
        throw new Error(response.ErrorMessages.join(","));
      }

      if(response.Result?.url) {
        window.location.href=response.Result.url;
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
    } finally {
      setIsLoading(false);
    }
  };


  const parts = product.description[locale].split("|");
  const intro = parts[0];
  const receivables = parts.slice(1);

  return (
    <>
      <div className="mb-10 bg-background-green-accent/20 w-full mt-[85px] py-6 px-2">
        <h4 className="font-semibold text-center">
          {tShop("productDetailsPageTitle")}
        </h4>
      </div>
      <div className="container px-c-25 xl:px-0 xl:max-w-[1140px] mx-auto mb-c-30">
        <section className="mb-c-90">
          <div className="bg-background-green-accent rounded-md shadow-lg grid grid-cols-1 md:grid-cols-[auto_auto_auto] items-start">
            {/* ── Left thumbnail strip (hidden on mobile) ── */}
            <div className="hidden md:flex flex-col gap-2 h-[480px] p-4 overflow-y-auto no-scrollbar">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => handleThumbnailClick(index)}
                  className={`
                  rounded-md overflow-hidden border-2 transition-all duration-200 shrink-0
                  ${
                    selectedImageIndex === index
                      ? "border-text-white shadow-md opacity-100 scale-105"
                      : "border-transparent opacity-60 hover:opacity-90 hover:border-text-white-off"
                  }
                `}
                >
                  <img
                    src={image}
                    alt={`${product.name[locale]} - ${index + 1}`}
                    className="w-full h-[72px] object-cover"
                  />
                </button>
              ))}
            </div>

            {/* ── Main image — full width on mobile, flex-1 on desktop ── */}
            <div
              className={`w-full h-full md:w-[400px] lg:w-[480px] ${styles["product-gallery"]}`}
            >
              {/* Slick slider — swipeable on mobile, synced with thumbnails */}
              <ImageCarousel
                images={product.images.map((image) => ({ url: image }))}
                productGallerySettings={{
                  afterChange: (index) => setSelectedImageIndex(index),
                  selectedImageIndex,
                }}
              />
            </div>

            {/* ── Right side — product details ── */}
            <div className="flex flex-col gap-6 justify-between flex-1 p-4">
              {/* Title */}
              <h1 className="text-3xl lg:text-4xl font-bold text-text-white">
                {product.name[locale]}
              </h1>

              {/* Description */}

              <h4 className="font-semibold mb-3 leading-5 text-text-white">
                {intro}
              </h4>
              <ul className="font-semibold text-text-white">
                {receivables.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-white whitespace-nowrap capitalize">
                  Price:{" "}
                  {((product.default_price?.unit_amount || 0) / 100).toFixed(2)}{" "}
                  {product.default_price?.currency?.toUpperCase()}
                </span>
              </div>

              {/* Buy Button */}
              <div className="flex justify-center">
                <button className="relative primary-button hover:bg-background-dark" onClick={buyNowClick} disabled={isLoading}>
                  {isLoading && (
                    <div className="absolute flex items-center justify-center inset-0">
                      <div className="w-6 h-6 border-4 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                  {tShop("buyNowButtonText")}
                </button>
              </div>
            </div>
          </div>
        </section>
        {relatedProducts && (
          <section>
            <h2 className="mb-4">{tShop("relatedProductsTitle")}</h2>
            <ProductsList products={relatedProducts} isRelated={true} />
          </section>
        )}
      </div>
    </>
  );
};

export default ProductGallery;