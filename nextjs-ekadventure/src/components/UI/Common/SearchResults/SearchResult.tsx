import { Link } from "@/i18n/navigation";
import { SearchResultType } from "@/types/search-result-type";
import { escapeHtml, highlightTerm } from "@/utils/data/helpers";
import { useTranslations } from "next-intl";
import NextLink from "next/link";

const SearchResult: React.FC<{
  result: SearchResultType;
  highlight: string;
  outsideLocale?: boolean;
}> = ({ result, highlight, outsideLocale }) => {
  const label = outsideLocale
    ? result._type === "category"
      ? "Category"
      : "Post"
    : result._type === "category"
      ? useTranslations("UI")("searchResultCategoryHeader")
      : useTranslations("UI")("searchResultPostHeader");

  const titleHtml = highlight
    ? highlightTerm(result.title || result.name, highlight)
    : escapeHtml(result.title);

  const snippetHtml =
    result.snippet && highlight
      ? highlightTerm(result.snippet, highlight)
      : result.snippet;

  return (
    <div className="p-3 rounded">
      <div className="flex-left-col mb-2">
        <span className="text-xs p-0 px-3 bg-background-green-accent rounded-sm text-white">
          {label}
        </span>
      </div>
      <div className="flex items-baseline justify-between">
        {outsideLocale ? (
          <NextLink
            href={result.href || "#"}
            className="font-semibold text-xs text-white underline hover:text-background-green-accent"
            dangerouslySetInnerHTML={{ __html: titleHtml }}
          />
        ) : (
          <Link
            href={result.href || "#"}
            className="font-semibold text-xs text-white underline hover:text-background-green-accent"
            dangerouslySetInnerHTML={{ __html: titleHtml }}
          />
        )}
      </div>

      {snippetHtml && (
        <p
          className="mt-1 text-white text-xs"
          dangerouslySetInnerHTML={{ __html: snippetHtml }}
        />
      )}
    </div>
  );
};

export default SearchResult;
