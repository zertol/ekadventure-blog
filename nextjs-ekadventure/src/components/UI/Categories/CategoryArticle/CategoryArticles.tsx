import CategoryArticle from "./page";

export const CategoryArticles: React.FC<{ categories: CategoryType[] }> = ({
  categories,
}) => {
  return (
    <div className="flex-wrap-row gap-6">
      {categories.map((category) => (
        <div
          key={category._id}
          className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
        >
          <CategoryArticle
            title={category.name}
            slug={category.slug}
            featuredMedia={category.featuredMedia}
          />
        </div>
      ))}
    </div>
  );
};
