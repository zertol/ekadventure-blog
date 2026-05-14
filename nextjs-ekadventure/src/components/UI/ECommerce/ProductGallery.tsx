"use client";

import React, { useState, useCallback } from "react";
import { ProductType, PriceType } from "@/types/ecommerce/product-type";
import PrimaryLink from "../Common/PrimaryLink/page";
import ImageCarousel from "../Carousel/ImageCarousel";

interface ProductGalleryProps {
  product: ProductType;
  locale: LocaleType;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ product, locale }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const formatPrice = (price: PriceType | null) => {
    if (!price || !price.unit_amount) return "N/A";
    const amount = (price.unit_amount / 100).toFixed(2);
    const currency = price.currency?.toUpperCase() || "CAD";
    return `$${amount} ${currency}`;
  };

  const handleThumbnailClick = useCallback((index: number) => {
    setSelectedImageIndex(index);
  }, []);

  const defaultPrice = product.default_price as PriceType | null;

  return (
    <div className="container px-c-25 xl:px-0 xl:max-w-[1140px] mx-auto mt-28 mb-c-90">
      <div className="bg-background-green-accent rounded-md p-8 shadow-lg grid grid-cols-1 md:grid-cols-[auto_auto_auto] gap-8 items-start">

          {/* ── Left thumbnail strip (hidden on mobile) ── */}
          <div className="hidden md:flex flex-col gap-2 h-[480px] overflow-y-auto p-1 no-scrollbar">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => handleThumbnailClick(index)}
                className={`
                  rounded-md overflow-hidden border-2 transition-all duration-200 shrink-0
                  ${selectedImageIndex === index
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
          <div className="w-full md:w-[400px] lg:w-[480px] h-full">
            {/* Slick slider — swipeable on mobile, synced with thumbnails */}
             <ImageCarousel images={product.images.map((image) => ({ url: image }))} productGallerySettings={{ afterChange: (index) => setSelectedImageIndex(index), selectedImageIndex }} />

            {/* Mobile dot indicators */}
            {/* <div className="flex justify-center gap-1.5 mt-3 md:hidden">
              {product.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleThumbnailClick(index)}
                  className={`
                    rounded-full transition-all duration-200
                    ${selectedImageIndex === index
                      ? "w-4 h-2 bg-text-white"
                      : "w-2 h-2 bg-text-white-off opacity-50"
                    }
                  `}
                />
              ))}
            </div> */}
          </div>

          {/* ── Right side — product details ── */}
          <div className="flex flex-col gap-6 justify-between flex-1">

            {/* Title */}
            <h1 className="text-3xl lg:text-4xl font-bold text-text-white">
              {product.name[locale]}
            </h1>

            {/* Description */}
            <p className="text-text-white-off leading-relaxed text-sm lg:text-base">
              {product.description[locale]}
            </p>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-4xl lg:text-5xl font-bold text-text-white">
                {formatPrice(defaultPrice)}
              </span>
              {defaultPrice?.unit_amount && (
                <span className="text-text-white-off line-through opacity-60 text-lg">
                  ${((defaultPrice.unit_amount / 100) * 1.2).toFixed(2)}
                </span>
              )}
            </div>

            {/* Buy button */}
            <PrimaryLink
              text="Buy it now"
              href={`/${locale}/products/${product.id}/checkout`}
            />
          </div>

      </div>
    </div>
  );
};

export default ProductGallery;
