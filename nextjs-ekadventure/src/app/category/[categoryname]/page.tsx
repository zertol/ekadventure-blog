import React from "react";
import PostArticles from "@/components/UI/Blog/PostArticle/PostArticles";
import HeaderImage from "@/components/UI/Common/HeaderImage/page";
import Link from "next/link";
import App from "@/components/App";
import { fetchAllCategories, fetchCategoryPosts } from "@/api/controllers/categories";

export async function generateStaticParams() {
  const categories = await fetchAllCategories();
  return categories.Result?.map((cat: any) => ({
     categoryname : cat.slug.current
  }));
}

const CategoryPage: React.FC<any> = async ({ params }: { params: { categoryname: string } }) => {

const posts = await fetchCategoryPosts({
    categoryname: params.categoryname,
  });

  return (
    <App currentPage="category">
      <HeaderImage
        backgroundImage="/images/adventure-header.jpg"
        roundedImage="/images/profile-avatar.webp"
        text={
          <div>
            <h2 className="font-bold italic">
              Where Every Day Is An{" "}
              <span className="font-ps text-[28px]">Adventure</span>
            </h2>
          </div>
        }
      />

      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Link
            href="/blog"
            className="text-white text-[12px] bg-background-blue-accent rounded-full hover:bg-background-green-accent px-3 py-2"
          >
            ← Back to Blog
          </Link>
        </div>

        <div className="mb-8 flex-center-col">
          <h2 className="font-bold text-center mb-4 uppercase">
            {posts.Result!.length > 0
              ? posts.Result![0].categories[0].name
              : "categoryname"}
          </h2>
          <span className="block w-24 h-1 bg-black"></span>
        </div>

       <PostArticles posts={posts.Result!} />
      </div>
    </App>
  );
};

export default CategoryPage;
