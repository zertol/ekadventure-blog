import React from "react";
import PostArticles from "@/components/UI/Blog/PostArticle/PostArticles";
import HeaderImage from "@/components/UI/Common/HeaderImage/page";
import { Link } from "@/i18n/navigation";
import App from "@/components/App";
import {
  fetchAllCategories,
  fetchCategoryPosts,
} from "@/api/controllers/categories";
import { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: { locale: string; categoryname: string };
}): Promise<Metadata> {
  const { locale, categoryname } = await params;
  const result = await fetchCategoryPosts({
    categoryname: categoryname,
    locale: locale,
  });
  const posts = result.Result;

  const category =
    posts &&
    posts[0]?.categories.find((cat: CategoryType) => cat.slug === categoryname);

  if (!category) {
    return {};
  }

  const metaData: Metadata = {
    title: category.name,
    description: category.metadata?.description,
    openGraph: {
      title: category.name,
      description: category.metadata?.description,
      images: category.metadata ? [category.metadata?.ogImage?.url] : [],
    },
  };

  return metaData;
}

export async function generateStaticParams() {
  const categories = await fetchAllCategories({});
  const params = categories.Result?.flatMap((cat: CategoryType) => {
    return routing.locales.map((locale) => ({
      locale: locale,
      categoryname: cat.slug,
    }));
  });

  return params || [];
}

const CategoryPage: React.FC<any> = async ({
  params,
}: {
  params: { locale: string; categoryname: string };
}) => {
  const { locale, categoryname } = await params;

  const posts = await fetchCategoryPosts({
    categoryname,
    locale,
  });

  const category =
    posts.Result &&
    posts.Result[0]?.categories.find(
      (cat: CategoryType) => cat.slug === categoryname,
    );

  const headerMedia: ImageType | undefined = category?.headerMedia;

  const tCategories = await getTranslations("Categories");
  const tUI = await getTranslations("UI");

  return (
    <App currentPage="category">
      <HeaderImage
        backgroundImage={headerMedia}
        roundedImage="/images/profile-avatar.webp"
        text={
          <div>
            <h2 className="font-bold italic">
              {tCategories("categoriesHeaderCaptionFirstPart")}{" "}
              <span className="font-ps text-[28px]">{tCategories("categoriesHeaderCaptionSecondPart")}</span>
            </h2>
          </div>
        }
      />
      {posts.Result && (
        <div className="container mx-auto px-4 py-12">
          <div className="mb-8">
            <Link
              href="/blog"
              className="text-white text-[12px] bg-background-blue-accent rounded-full hover:bg-background-green-accent px-3 py-2"
            >
              ← {tUI("backToBlog")}
            </Link>
          </div>

          <div className="mb-8 flex-center-col">
            <h2 className="font-bold text-center mb-4 uppercase">
              {posts.Result.length > 0 && category?.name}
            </h2>
            <span className="block w-24 h-1 bg-black"></span>
          </div>

          <PostArticles posts={posts.Result} />
        </div>
      )}
    </App>
  );
};

export default CategoryPage;