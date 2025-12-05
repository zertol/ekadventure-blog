export async function POST(req: Request) {
    return await fetch("https://sendcontactmail-zsszt3mtmq-uc.a.run.app", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": process.env.X_API_KEY || '',
        },
        body: await req.text()
    });
}