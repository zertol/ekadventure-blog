"use client";

import PrimaryLink from "../../Common/PrimaryLink/page";

interface PostCategoryProps {
  category: any;
  className?: string;
}

const PostCategory: React.FC<PostCategoryProps> = ({ category, className }) => {
  return (
    <>
      <PrimaryLink
        text={category.name}
        href={`/category/${category.slug}`}
        className={`text-[12px] leading-[1.42] ${className}`}
      />
    </>
  );
};

export default PostCategory;
