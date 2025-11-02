export const fetchAllPages = async (): Promise<ApiResult<PageType[]>> => {
    const result: ApiResult<PageType[]> = {
        Result: null,
        ErrorMessages: []
    };

    try {
        const response: ApiResult<PageType[]> = await fetch("https://fetchallpages-zsszt3mtmq-uc.a.run.app")
            .then(res => res.json());

        if (response.ErrorMessages && response.ErrorMessages.length > 0) {
            result.ErrorMessages = response.ErrorMessages;
            return result;
        }

        result.Result = response.Result ?? [];
    } catch (err) {
        result.ErrorMessages?.push((err as Error).message);
    }

    return result;
}