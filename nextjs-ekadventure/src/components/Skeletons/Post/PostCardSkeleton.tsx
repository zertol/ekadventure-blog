export function PostCardSkeleton() {
  return (
    <article className="bg-white rounded-md overflow-hidden shadow-md flex flex-col animate-pulse">
      <div className="relative aspect-video w-full bg-gray-200" />
      <div className="p-3 flex flex-col flex-grow">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-1" />
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
        <div className="flex items-center justify-between mb-4">
          <div className="h-3 bg-gray-200 rounded w-1/3" />
          <div className="h-3 bg-gray-200 rounded w-1/4" />
        </div>
        <div className="space-y-2 mb-3">
          <div className="h-3 bg-gray-200 rounded w-full" />
          <div className="h-3 bg-gray-200 rounded w-full" />
          <div className="h-3 bg-gray-200 rounded w-2/3" />
        </div>
        <div className="mt-auto pt-4 flex justify-end">
          <div className="h-3 bg-gray-200 rounded w-16" />
        </div>
      </div>
    </article>
  );
}
