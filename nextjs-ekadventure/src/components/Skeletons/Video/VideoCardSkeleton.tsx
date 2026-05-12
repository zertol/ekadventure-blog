export function VideoCardSkeleton() {
  return (
    <article className="relative rounded-lg flex flex-col flex-1 animate-pulse">
      <div className="relative aspect-video w-full">
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="w-12 h-12 bg-gray-300 rounded-full" />
        </div>
        <div className="w-full h-full bg-gray-200 rounded-lg" />
      </div>
      <div className="mt-3 flex flex-col flex-grow">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-1" />
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
        <div className="h-3 bg-gray-200 rounded w-1/4" />
      </div>
    </article>
  );
}
