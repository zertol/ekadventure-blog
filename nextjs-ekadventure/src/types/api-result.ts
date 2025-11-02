type ApiResult<T> = {
    Result: T | null;
    ErrorMessages: string[] | null;
};