import { useSearch } from "@/utils/hooks/use-search";
import { SearchResuls } from "../SearchResults/page";
import { useTranslations } from "next-intl";

const SearchBox: React.FC = () => {
  const { query, setQuery, results, loading } = useSearch();
  const tUI = useTranslations("UI");

  return (
    <>
      <div className="hidden md:flex md:justify-end flex-1 relative">
        <input
          maxLength={30}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={tUI("searchPlaceholder")}
          className="bg-transparent border-b border-white text-white placeholder-white/70 px-2 py-1 focus:outline-none w-[200px]"
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
          <SearchResuls query={query} results={results} loading={loading} />
        )}
      </div>
    </>
  );
};

export default SearchBox;
