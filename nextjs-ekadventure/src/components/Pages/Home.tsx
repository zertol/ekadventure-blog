import React, { Suspense } from "react";
import Image from "next/image";
import PrimaryLink from "@/components/UI/Common/PrimaryLink/page";
import { HeroText } from "../UI/Home/HeroText/page";
import { CategoryArticles } from "../UI/Categories/CategoryArticle/CategoryArticles";
import PostArticles from "../UI/Blog/PostArticle/PostArticles";
import YouTubeVideos from "../UI/YouTube/YouTubeVideo/YouTubeVideos";
import { ClientAdWrapper } from "../Ads/ClientAdWrapper";
import HorizontalAd from "../Ads/Google/HorizontalAd";
import { FeaturedSection } from "../UI/Home/FeaturedSection/page";
import { getTranslations } from "next-intl/server";
import { CategoriesSkeleton } from "../Skeletons/Category/CategoriesSkeleton";
import { PostsSkeleton } from "../Skeletons/Post/PostsSkeleton";
import { VideosSkeleton } from "../Skeletons/Video/VideosSkeleton";
import { ProductsResponseType } from "@/types/ecommerce/product-response-type";
import ProductsList from "../UI/ECommerce/ProductsList";

interface HomeProps {
  categories: Promise<ApiResult<CategoryType[]>>;
  latestPosts: Promise<ApiResult<PostType[]>>;
  videos: Promise<ApiResult<YouTubePlaylistType>>;
  products: Promise<ApiResult<ProductsResponseType>>;
}

const Home: React.FC<HomeProps> = async ({
  categories,
  latestPosts,
  videos,
  products,
}) => {
  const tHome = await getTranslations("Home");
  const tUI = await getTranslations("UI");
  const tCommon = await getTranslations("Common");

  return (
    <div className="home-page">
      <section className={`mt-c-30 mb-c-30`}>
        <HeroText />
      </section>

      <div className="flex justify-center">
        <div className="w-full md:w-[768px]">
          <ClientAdWrapper
            headerText="Google"
            isCollapsible={false}
            className="mb-c-30"
          >
            <HorizontalAd adSlot="9510559826" />
          </ClientAdWrapper>
        </div>
      </div>

      <FeaturedSection
        title={tCommon("featuredProductsTitle")}
        canViewAll={{ page: { url: "/products" }, text: tUI("viewAll") }}
      >
        <Suspense fallback={<VideosSkeleton />}>
          <LatestProductsSection promise={products} />
        </Suspense>
      </FeaturedSection>

      <FeaturedSection
        title={tCommon("featuredAdventuresTitle")}
        canViewAll={{ page: { url: "/blog" }, text: tUI("viewAll") }}
      >
        <Suspense fallback={<PostsSkeleton />}>
          <LatestPostsSection promise={latestPosts} />
        </Suspense>
      </FeaturedSection>

      <FeaturedSection
        title={tCommon("featuredVideosTitle")}
        canViewAll={{ page: { url: "/videos" }, text: tUI("viewAll") }}
        className="mb-c-30"
      >
        <Suspense fallback={<VideosSkeleton />}>
          <VideosSection promise={videos} />
        </Suspense>
      </FeaturedSection>

      <div className="flex justify-center">
        <div className="w-full md:w-[768px]">
          <ClientAdWrapper
            headerText="Google"
            isCollapsible={false}
            className="mb-c-30"
          >
            <HorizontalAd adSlot="2079251461" />
          </ClientAdWrapper>
        </div>
      </div>

      <FeaturedSection title={tCommon("featuredTopicsTitle")}>
        <Suspense fallback={<CategoriesSkeleton />}>
          <CategoriesSection promise={categories} />
        </Suspense>
      </FeaturedSection>

      <section className="relative h-[400px] flex-center-row mb-c-60">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/adventure-header.jpg"
            alt="Mountain landscape"
            fill
            className="object-cover brightness-75"
          />
        </div>

        <div className="relative z-10 text-center text-white">
          <h1 className="text-[30px] md:text-[40px] font-bold mb-6 italic">
            {tHome("buildABlogLikeThisTitle")}
          </h1>
          <PrimaryLink
            text={tHome("shareYourExperienceButtonText")}
            href="/contact"
            className="px-[24px] py-[12px] text-[16px]"
          />
        </div>
      </section>
    </div>
  );
};

async function CategoriesSection({
  promise,
}: {
  promise: Promise<ApiResult<CategoryType[]>>;
}) {
  const categories = await promise;
  return <CategoryArticles categories={categories.Result ?? []} />;
}

async function LatestPostsSection({
  promise,
}: {
  promise: Promise<ApiResult<PostType[]>>;
}) {
  const latestPosts = await promise;
  return <PostArticles posts={latestPosts.Result ?? []} />;
}

async function VideosSection({
  promise,
}: {
  promise: Promise<ApiResult<YouTubePlaylistType>>;
}) {
  const videos = await promise;
  return (
    videos.Result &&
    videos?.Result?.items.length > 0 && (
      <YouTubeVideos ytPlaylist={videos.Result} />
    )
  );
}

async function LatestProductsSection({
  promise,
}: {
  promise: Promise<ApiResult<ProductsResponseType>>;
}) {
  const products = await promise;
  return (
    products.Result &&
    products?.Result?.data.length > 0 && (
      <ProductsList products={products.Result} />
    )
  );
};

export default Home;
