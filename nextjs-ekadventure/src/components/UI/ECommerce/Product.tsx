import { Link } from "@/i18n/navigation";
import { ProductType } from "@/types/ecommerce/product-type";
import PrimaryLink from "../Common/PrimaryLink/page";

interface ProductProps {
  product: ProductType;
}

export const Product: React.FC<ProductProps> = ({ product }) => {
  const parts = product.description.en.split("|");
  const intro = parts[0];
  const receivables = parts.slice(1);

  return (
    <article className="relative group rounded-lg hover:cursor-pointer transition-shadow duration-300 flex flex-col flex-1">
      <div className="absolute -inset-3 rounded-lg bg-background-green-accent/20 opacity-40 transition-opacity duration-300 group-hover:opacity-100 -z-10" />

      <div className="aspect-video w-full">
        <Link href={`/products/${product.id}` as any}>
          <img
            src={product.images[0]}
            alt={`${product.name} Thumbnail Image`}
            className="object-cover transition-transform duration-300 group-hover:scale-[101%] h-full w-full rounded-lg"
          />
        </Link>
      </div>

      <div className="mt-3 flex flex-col flex-grow">
        <h4 className="font-bold mb-1 leading-5">{product.name.en}</h4>

        <span className="mr-1 text-gray-500 whitespace-nowrap capitalize">
          Price: {((product.default_price?.unit_amount || 0) / 100).toFixed(2)}{" "}
          {product.default_price?.currency?.toUpperCase()}
        </span>
      </div>
      {/* <div className="mt-3 flex flex-col flex-grow">
        <h4 className="font-semibold mb-3 leading-5">{intro}</h4>
        <ul className="font-semibold">
          {receivables.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div> */}
      <div className="mt-auto pt-4 justify-end flex">
        <PrimaryLink
          text={"Buy Now"}
          href={`/products/${product.id}`}
          className={`text-[12px] leading-[1.42]`}
        />
      </div>
    </article>
  );
};
