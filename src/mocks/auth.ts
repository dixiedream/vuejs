import { rest } from "msw";

const { VITE_API_URL } = import.meta.env;
const baseURL = `${VITE_API_URL}/auth`;

const requests = [
    rest.post(baseURL, (_req, res, ctx) => {
        return res(
            ctx.json({
                token: "asociajsoijoij",
            }),
        );
    }),
    rest.post(`${baseURL}/refresh`, (_req, res, ctx) => {
        return res(
            ctx.json({
                token: "asociajsoijoij",
            }),
        );
    }),
    rest.post(`${baseURL}/forgotPassword`, (_req, res, ctx) => {
        return res(ctx.status(204));
    }),
    rest.patch(`${baseURL}/resetPassword/:token`, (_req, res, ctx) => {
        return res(
            ctx.json({
                token: "asociajsoijoij",
            }),
        );
    }),
    rest.delete(baseURL, (_req, res, ctx) => {
        return res(ctx.status(204));
    }),
];

export default requests;
