const sendRequest = async (url: string, body: string): Promise<Response> => {
    return await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": process.env.X_API_KEY || '',
        },
        body: body
    });
}

export async function POST(req: Request) {
    const body: any = await req.text();
    const parsedBody: any = JSON.parse(body);

    if (parsedBody.action?.toLowerCase() === "subscribe") {
        return await sendRequest("https://createnewslettersubscriptionemail-zsszt3mtmq-uc.a.run.app", body);
    }

    return await sendRequest("https://sendcontactmail-zsszt3mtmq-uc.a.run.app", body);
}