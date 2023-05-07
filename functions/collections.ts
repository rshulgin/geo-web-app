interface Env {
    COLLECTION_URL: string;
    COLLECTION_PATH: string;
}
export const onRequestGet = ({env, params}) => {
        try {
            const hash = params.hesh;
            return hash
                ? fetch(env.COLLECTION_URL+ "/" + hash)
                : new Response("That's not a valid hash.");
        } catch(err) {
            return new Response(err.stack, { status: 500 })
        }
        return new Response('Not found.', { status: 404 });
}

export const onRequestPost = ({env, params, data}) => {
        try {
            const hash = params.hesh;

            return hash
                ? fetch(env.COLLECTION_URL + "/" + hash, {method: 'POST', body: JSON.stringify(data)})
                : new Response("That's not a valid hash.");

        } catch(err) {
            return new Response(err.stack, { status: 500 })
        }
        return new Response('Not found.', { status: 404 });
}
