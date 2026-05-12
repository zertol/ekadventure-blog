export function CategoryCardSkeleton() {
  return (
    <article className="relative h-[450px] overflow-hidden rounded-md shadow-md animate-pulse">
      <div className="absolute inset-0 w-full h-full bg-gray-200" />
      <div className="absolute inset-0 bg-black bg-opacity-10" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-5 bg-gray-300 rounded w-1/3" />
      </div>
    </article>
  );
}
