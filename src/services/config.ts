import useAccessToken from "../store/accessToken";
import Storage from "../shared/StorageManager";

const { token } = useAccessToken();

const { VITE_API_URL } = import.meta.env;
const baseURL = VITE_API_URL;

const buildRequest = (method: string = "GET", body: object | null = null) => {
    const request: RequestInit = {
        method,
        headers: {
            "Content-Type": "application/json",
            "Accept-Language": Storage.getLang() || "en",
            Authorization: token.value ? `Bearer ${token.value}` : "",
        },
    };

    if (body) {
        request.body = JSON.stringify(body);
    }

    return request;
};

export default {
    get: (path: string) =>
        fetch(`${baseURL}/${path}`, buildRequest()).then(async (r) => {
            if (r.ok) {
                return r.json();
            }
            const errorResponse = await r.json();

            console.error(errorResponse);
            throw Error(errorResponse.message);
        }),
    post: (path: string, body: object | null = null) =>
        fetch(`${baseURL}/${path}`, buildRequest("POST", body)).then(
            async (r) => {
                if (r.ok) {
                    return r.status !== 204 ? r.json() : null;
                }
                const errorResponse = await r.json();

                console.error(errorResponse);
                throw Error(errorResponse.message);
            },
        ),
    put: (path: string, body: object = {}) =>
        fetch(`${baseURL}/${path}`, buildRequest("PUT", body)).then(
            async (r) => {
                if (r.ok) {
                    return r.status !== 204 ? r.json() : null;
                }
                const errorResponse = await r.json();

                console.error(errorResponse);
                throw Error(errorResponse.message);
            },
        ),
    patch: (path: string, body: object = {}) =>
        fetch(`${baseURL}/${path}`, buildRequest("PATCH", body)).then(
            async (r) => {
                if (r.ok) {
                    return r.status !== 204 ? r.json() : null;
                }
                const errorResponse = await r.json();

                console.error(errorResponse);
                throw Error(errorResponse.message);
            },
        ),
    delete: (path: string) =>
        fetch(`${baseURL}/${path}`, buildRequest("DELETE")).then(async (r) => {
            if (r.ok) {
                return;
            }
            const errorResponse = await r.json();

            console.error(errorResponse);
            throw Error(errorResponse.message);
        }),
};
