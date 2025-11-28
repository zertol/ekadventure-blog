"use client";

import React, { useRef } from "react";
import Slider from "react-slick";
import "./slick.css";
import LightGallery from "lightgallery/react";
// import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

// import plugins if you need
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import lgFullScreen from 'lightgallery/plugins/fullscreen';

interface ImageCarouselProps {
  images: ImageType[];
  title?: string;
}

// Define the slider settings
const sliderSettings = {
  dots: false,
  infinite: true,
  centerPadding: 50,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplaySpeed: 4000,
  pauseOnHover: true,
  arrows: true,
  swipeToSlide: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  // Slider reference to access methods if needed
  const sliderRef = useRef(null);
  const lightboxRef = useRef<any>(null);

  const handleOpenLightbox = (index: number) => {
    lightboxRef.current?.openGallery(index);
  }

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="slick-carousel-container mt-5">
      <div className="relative">
        {/* @ts-ignore - bypassing type check for Slider */}
        <Slider ref={sliderRef} {...sliderSettings}>
          {images.map((image, index) => (
            <div key={index} className="outline-none">
              <div
                className="relative group overflow-hidden cursor-pointer w-full h-[190px]"
                onClick={() => handleOpenLightbox(index)}
              >
                <img
                  src={image.url}
                  alt={image.alt || `Image ${index + 1}`}
                  className="object-cover"
                />
                <div className="absolute w-full h-full inset-0">
                  <div className="w-full h-full bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white font-bold mb-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    <p className="text-white text-sm text-center px-2">
                      {image.alt || `Image ${index + 1}`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>

        <LightGallery
          onInit={(detail) => {
            lightboxRef.current = detail.instance;
          }}
          dynamic
          dynamicEl={images.map((image, index) => ({
            src: image.url,
            thumb: image.url,
            subHtml: `<h4>${image.alt || `Image ${index + 1}`}</h4>`,
          }))}
          speed={500}
          plugins={[lgThumbnail, lgZoom, lgFullScreen]}
          download={false}
        />
      </div>
    </div>
  );
};

export default ImageCarousel;
