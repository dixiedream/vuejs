import { rest } from "msw";
import AuthBody from "../@types/AuthBody";
import AuthResponse from "../@types/AuthResponse";
import MeResponse from "../@types/MeResponse";
import User from "../@types/User";
import ROLES from "../shared/UserRoles";

const { VITE_API_URL } = import.meta.env;
const baseURL = `${VITE_API_URL}/users`;

const meData: MeResponse = {
    email: "abc@abc.com",
    role: ROLES.ADMIN,
};

const userData: User = {
    _id: "asociajsocijoij4",
    email: "abc@abc.com",
    role: ROLES.ADMIN,
};

const requests = [
    rest.get(`${baseURL}/me`, (_req, res, ctx) => {
        return res(ctx.json(meData));
    }),
    rest.get(baseURL, (_req, res, ctx) => {
        return res(ctx.json([userData]));
    }),
    rest.post<AuthBody, AuthResponse>(baseURL, (_req, res, ctx) => {
        return res(
            ctx.status(201),
            ctx.json({
                token: "asociajsoijoij",
            }),
        );
    }),
    rest.patch(`${baseURL}/:userId`, (_req, res, ctx) => {
        return res(ctx.json(userData));
    }),
];

export default requests;
