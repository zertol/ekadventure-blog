import React from "react";
import SearchResult from "./SearchResult";
import { SearchResultType } from "@/types/search-result-type";

export const SearchResuls: React.FC<{
  results: SearchResultType[];
  loading: boolean;
  query: string;
  isInContainer?: boolean;
}> = ({ results, loading, query, isInContainer }) => {
  return (
    <div
      className={`${!isInContainer ? "absolute" : ""} mt-1 left-auto top-full
             bg-background-dark rounded min-w-[200px] shadow-lg z-50 ${isInContainer ? "max-h-20 md:max-h-40" : "max-h-80"} 
             overflow-auto`}
    >
      {loading && (
        <div className="p-2 flex justify-center w-full">
          <div className="w-3 h-3 border-2 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {!loading && results.length === 0 && (
        <div className="p-3">
          <p className="text-white">No results found!</p>
        </div>
      )}

      {!loading &&
        results.map((r) => (
          <SearchResult key={r._id} result={r} highlight={query} />
        ))}
    </div>
  );
};
