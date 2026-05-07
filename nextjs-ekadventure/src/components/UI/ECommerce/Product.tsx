import { ProductType } from "@/types/ecommerce/product-type";

export const Product: React.FC<ProductType> = (product) => {
  return (
    <article className="relative group rounded-lg hover:cursor-pointer transition-shadow duration-300 flex flex-col flex-1">
      <div className="absolute -inset-3 rounded-lg bg-background-green-accent/20 opacity-40 transition-opacity duration-300 group-hover:opacity-100 -z-10" />

      <div className="relative aspect-video w-full">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-xl transform z-20">
            <svg
              className="w-8 h-8 text-black"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
        <img
          src={product.images[0]}
          alt={`${product.name} Thumbnail Image`}
          className="object-cover transition-transform duration-300 group-hover:scale-[101%] h-full w-full rounded-lg"
        />
      </div>

      <div className="mt-3 flex flex-col flex-grow">
        <h4 className="font-bold mb-1 leading-5">{product.name}</h4>

        {/* <div className="flex flex-wrap items-center justify-between gap-2 mb-0">
                <div className="flex-1 flex flex-row flex-wrap">
                  <span className="text-[12px] mr-1 text-gray-500 whitespace-nowrap capitalize">
                    {formatDate(ytPlaylistItem.publishedAt, locale)}
                  </span>
                </div>
              </div> */}
      </div>
    </article>
  );
};
