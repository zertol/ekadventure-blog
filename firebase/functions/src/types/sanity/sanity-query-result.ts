export type SanityQueryResult<T> = | {
    query: string;
    result: T;
    syncTags: string[];
    ms: number;
};