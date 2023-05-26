interface Env {
    COLLECTION_URL: string;
}
export const onRequestGet: PagesFunction<Env> = ({env, params}) => {
    try {
        const hash = params.hash;
        return hash
            ? fetch(env.COLLECTION_URL+ "/" + hash)
            : new Response("That's not a valid hash.");
    } catch(err: any) {
        return new Response(err.stack, { status: 500 })
    }
}

export const onRequestPost: PagesFunction<Env> = ({env, params, data}) => {
    try {
        const hash = params.hash;

        return hash
            ? fetch(env.COLLECTION_URL + "/" + hash, {method: 'POST', body: JSON.stringify(data)})
            : new Response("That's not a valid hash.");

    } catch(err: any) {
        return new Response(err.stack, { status: 500 })
    }
}
