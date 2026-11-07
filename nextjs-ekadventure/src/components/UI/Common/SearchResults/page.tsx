import React from "react";
import SearchResult from "./SearchResult";
import { SearchResultType } from "@/types/search-result-type";
import { useTranslations } from "next-intl";

export const SearchResults: React.FC<{
  results: SearchResultType[];
  loading: boolean;
  query: string;
  isInContainer?: boolean;
  outsideLocale?: boolean;
}> = ({ results, loading, query, isInContainer, outsideLocale }) => {
  const noResults = outsideLocale
    ? "No results found!"
    : useTranslations("UI")("searchResultNoResultsFound");

  return (
    <div
      className={`${!isInContainer ? "absolute left-0 top-full" : ""} mt-1 animate-search-results-open motion-reduce:animate-none
             bg-background-dark rounded shadow-lg z-50 ${isInContainer ? "w-full" : "w-[96%] ml-[2%] max-h-100"} 
             overflow-auto custom-scrollbar`}
    >
      {loading && (
        <div className="p-2 flex justify-center w-full">
          <div className="w-3 h-3 border-2 border-background-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {!loading && results.length === 0 && (
        <div className="p-3">
          <p className="text-white">{noResults}</p>
        </div>
      )}

      {!loading &&
        results.map((r) => (
          <SearchResult key={r._id} result={r} highlight={query} outsideLocale={outsideLocale} />
        ))}
    </div>
  );
};
