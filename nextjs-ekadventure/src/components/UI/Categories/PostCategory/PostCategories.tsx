"use client";

import PostCategory from "./page";

interface PostCategoriesProps {
  categories: any[];
}

const PostCategories: React.FC<PostCategoriesProps> = ({ categories }) => {
  return (
    <>
      {categories.map((category, index) => (
        <PostCategory
          key={`${category.slug}-${index}`}
          category={category}
          className={`${index < categories.length - 1 ? "mr-2" : ""}`}
        />
      ))}
    </>
  );
};

export default PostCategories;
