export const handleApiRequest = async <T>(
    url: string,
    options?: RequestInit
): Promise<ApiResult<T>> => {
    const result: ApiResult<T> = {
        Result: null,
        ErrorMessages: []
    };

    try {
        console.log("Making API request to:", url);
        const response: ApiResult<T> = await fetch(url, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                "X-API-KEY": process.env.X_API_KEY || '',
                ...options?.headers
            },
            next: { revalidate: 60 },
        }).then(res => {
            if (!res.ok) {
                throw new Error(`API request failed with status ${res.status}: ${res.statusText}`);
            }
            try {
                return res.json();
            } catch (err) {
                throw new Error(`Failed to parse JSON response: ${(err as Error).message}`);
            }
        });

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