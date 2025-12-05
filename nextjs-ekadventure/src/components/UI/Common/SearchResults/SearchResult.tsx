import { escapeHtml, highlightTerm } from "@/utils/data/helpers";

const SearchResult: React.FC<{
  result: SearchResultType;
  highlight: string;
}> = ({ result, highlight }) => {
  const label = result._type === "category" ? "Category" : "Post";

  const titleHtml = highlight
    ? highlightTerm(result.title || result.name, highlight)
    : escapeHtml(result.title);

  const snippetHtml =
    result.snippet && highlight
      ? highlightTerm(result.snippet, highlight)
      : result.snippet;

  return (
    <div className="p-3 rounded">
    <div className="flex-center-col mb-2">
        <span className="text-xs p-1 px-3 bg-background-green-accent rounded text-white">{label}</span>
    </div>
      <div className="flex items-baseline justify-between">
        
        <a
          href={result.href || "#"}
          className="font-semibold text-xs text-white underline hover:text-background-green-accent"
          dangerouslySetInnerHTML={{ __html: titleHtml }}
        />
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
