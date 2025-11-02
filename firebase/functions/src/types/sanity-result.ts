export type SanityResult<T> = {
    query: string;
    result: T;
    syncTags: string[];
    ms: number;
};