export function blocksToTexts(content: any[] | undefined): string[] {
    if (!content || !Array.isArray(content)) return [];
    return content
        .filter((b) => b && b._type === "block" && Array.isArray(b.children))
        .map((b) => b.children.map((c: any) => c.text || "").join(""));
}


export function extractSnippetFromBlocks(blocks: any[] | undefined, term: string) {
    if (!blocks) return null;
    const lowerTerm = term.toLowerCase();
    for (let i = 0; i < blocks.length; i++) {
        const text = blocks[i];
        if (!text) continue;
        const idx = text.toLowerCase().indexOf(lowerTerm);
        if (idx >= 0) {
            const start = Math.max(0, idx - 60);
            const end = Math.min(text.length, idx + term.length + 60);
            const snippet = (start > 0 ? "…" : "") + text.slice(start, end) + (end < text.length ? "…" : "");
            return { snippet, blockIndex: i };
        }
    }
    return null;
}