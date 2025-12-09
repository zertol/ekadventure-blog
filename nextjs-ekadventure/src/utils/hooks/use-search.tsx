import { search } from "@/api/controllers/search";
import { useEffect, useRef, useState } from "react";
import { sanitizeSearchTerm } from "../data/helpers";

export const useSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResultType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const controllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!query) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const id = setTimeout(async () => {
      controllerRef.current?.abort();
      controllerRef.current = new AbortController();
      try {
        const sanitizedQuery = sanitizeSearchTerm(query);
        const data = await search({ query: sanitizedQuery });
        setResults(data.Result || []);
      } catch (e: any) {
        if (e.name !== "AbortError") setError(e.message || "Search error");
      } finally {
        setLoading(false);
      }
    }, 240);

    return () => clearTimeout(id);
  }, [query]);

  return { query, setQuery, results, loading, error };
};
