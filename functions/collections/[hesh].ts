interface Env {
    COLLECTION_URL: string;
    COLLECTION_PATH: string;
}
export const onRequestGet = ({env, params}) => {
    try {
        const hesh = params.hesh;
        return hesh
            ? fetch(env.COLLECTION_URL+ "/" + hesh)
            : new Response("That's not a valid hesh.");
    } catch(err) {
        return new Response(err.stack, { status: 500 })
    }
    return new Response('Not found.', { status: 404 });
}

export const onRequestPost = ({env, params, data}) => {
    try {
        const hesh = params.hesh;

        return hesh
            ? fetch(env.COLLECTION_URL + "/" + hesh, {method: 'POST', body: JSON.stringify(data)})
            : new Response("That's not a valid hesh.");

    } catch(err) {
        return new Response(err.stack, { status: 500 })
    }
    return new Response('Not found.', { status: 404 });
}
