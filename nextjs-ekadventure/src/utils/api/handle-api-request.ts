export const handleApiRequest = async <T>(
    url: string,
    options?: RequestInit
): Promise<ApiResult<T>> => {
    const result: ApiResult<T> = {
        Result: null,
        ErrorMessages: []
    };

    try {
        const response: ApiResult<T> = await fetch(url, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                "X-API-KEY": process.env.X_API_KEY || '',
                ...options?.headers
            },
            next: { revalidate: 60 },
        }).then(res => res.json());

        if (response.ErrorMessages && response.ErrorMessages.length > 0) {
            result.ErrorMessages = response.ErrorMessages;
            return result;
        }

        result.Result = response.Result;

    } catch (err) {
        console.error("API request error:", err);
        result.ErrorMessages?.push((err as Error).message);
    }

    return result;
};