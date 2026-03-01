import { useSearch } from "@/utils/hooks/use-search";
import { SearchResults } from "../SearchResults/page";
import { useTranslations } from "next-intl";
import { useRef } from "react";

const SearchBox: React.FC<{ isInContainer?: boolean }> = ({
  isInContainer,
}) => {
  const { query, setQuery, results, loading } = useSearch();
  const tUI = useTranslations("UI");

  const searchRef = useRef<HTMLInputElement>(null);

  const searchSite = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQuery(searchRef.current!.value || "");
  };

  if (isInContainer) {
    return (
      <>
        <form onSubmit={searchSite} method="POST" className="w-full">
          <div className="flex flex-row w-full overflow-hidden">
            <input
              type="text"
              name="query"
              placeholder={tUI("searchPlaceholderAdventure")}
              className="flex-1 w-full px-4 py-2 bg-white text-gray-800 font-primary focus:outline-none"
              ref={searchRef}
            />
            <button
              type="submit"
              className="bg-background-blue-accent
                         text-white px-4 py-2 whitespace-nowrap hover:bg-background-dark transition-colors"
            >
              {tUI("searchButton")}
            </button>
          </div>
        </form>
        {(query || loading) && (
          <SearchResults
            isInContainer={true}
            query={query}
            results={results}
            loading={loading}
          />
        )}
      </>
    );
  }

  return (
    <>
      <input
        maxLength={30}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={tUI("searchPlaceholder")}
        className="bg-transparent border-b border-white text-white placeholder-white/70 px-2 py-1 focus:outline-none w-full"
      />
      <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </button>

      {(query || loading) && (
        <SearchResults query={query} results={results} loading={loading} />
      )}
    </>
  );
};

export default SearchBox;
