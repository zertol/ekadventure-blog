import { Link } from "@/i18n/navigation";
import { ProductType } from "@/types/ecommerce/product-type";
import PrimaryLink from "../Common/PrimaryLink/page";
import { useLocale } from "next-intl";
import { useTranslations } from "use-intl";

interface ProductProps {
  product: ProductType;
  isRelated?: boolean;
}

export const Product: React.FC<ProductProps> = ({ product, isRelated = false }) => {
  const locale = useLocale() as LocaleType;
  const tShop =  useTranslations("Shop");

  return (
    <article className="relative group rounded-lg hover:cursor-pointer transition-shadow duration-300 flex flex-col flex-1">
      <div className="absolute -inset-3 rounded-lg bg-background-green-accent/20 opacity-40 transition-opacity duration-300 group-hover:opacity-100 -z-10" />

      <div className="aspect-video w-full">
        <Link href={`/products/${product.id}` as any}>
          <img
            src={product.images[0]}
            alt={`${product.name[locale]} Thumbnail Image`}
            className="object-cover transition-transform duration-300 group-hover:scale-[101%] h-full w-full rounded-lg"
          />
        </Link>
      </div>

      <div className="mt-3 flex flex-col flex-grow">
        {isRelated ? (
          <h6 className="font-bold mb-1 leading-5">{product.name[locale]}</h6>
        ) : (
          <h4 className="font-bold mb-1 leading-5">{product.name[locale]}</h4>
        )}

        <span className="mr-1 text-gray-500 whitespace-nowrap capitalize">
          Price: {((product.default_price?.unit_amount || 0) / 100).toFixed(2)}{" "}
          {product.default_price?.currency?.toUpperCase()}
        </span>
      </div>

      <div className="mt-auto pt-4 justify-end flex">
        {!isRelated && (
          <PrimaryLink
            text={tShop("buyNowButtonText")}
            href={`/products/${product.id}`}
            className={`text-[12px] leading-[1.42]`}
          />
        )}
      </div>
    </article>
  );
};
