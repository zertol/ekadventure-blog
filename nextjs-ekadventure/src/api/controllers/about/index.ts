export const fetchAboutDetails = async (): Promise<ApiResult<AboutType>> => {
    const result: ApiResult<AboutType> = {
        Result: null,
        ErrorMessages: []
    };

    try {
        const response: ApiResult<AboutType> = await fetch("https://fetchaboutdetails-zsszt3mtmq-uc.a.run.app")
            .then(res => res.json());

        if (response.ErrorMessages && response.ErrorMessages.length > 0) {
            result.ErrorMessages = response.ErrorMessages;
            return result;
        }

        result.Result = response.Result;
    } catch (err) {
        result.ErrorMessages?.push((err as Error).message);
    }

    return result;
}