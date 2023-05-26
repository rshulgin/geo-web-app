interface Env {
    COLLECTION_URL: string;
}
export const onRequestGet: PagesFunction<Env> = async ({env, params}) => {
    try {
        const hash = params.hash;
        if (hash) {
            const response = await fetch(env.COLLECTION_URL+ "/" + hash);
            return new Response(await response.text(), { status: response.status });
        } else {
            return new Response("That's not a valid hash.", { status: 400 });
        }
    } catch(err: any) {
        console.error(err.stack);
        return new Response("An error occurred.", { status: 500 })
    }
}

export const onRequestPost: PagesFunction<Env> = async ({env, params, data}) => {
    try {
        const hash = params.hash;
        if (hash) {
            const response = await fetch(env.COLLECTION_URL + "/" + hash, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            });
            return new Response(await response.text(), { status: response.status });
        } else {
            return new Response("That's not a valid hash.", { status: 400 });
        }
    } catch(err: any) {
        console.error(err.stack);
        return new Response("An error occurred.", { status: 500 })
    }
}
