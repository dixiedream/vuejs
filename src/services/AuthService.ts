import AuthBody from "../@types/AuthBody";
import AuthResponse from "../@types/AuthResponse";
import Api from "./config";

const endpoint = `auth`;

export default {
    login: async ({ email, password }: AuthBody): Promise<AuthResponse> => {
        const response = await Api.post(endpoint, { email, password });
        return response;
    },

    logout: async () => {
        return Api.delete(endpoint);
    },

    refresh: async () => {
        return Api.post(`${endpoint}/refresh`);
    },

    forgotPassword: async (email: string) => {
        return Api.post(`${endpoint}/forgotPassword`, { email });
    },

    resetPassword: async (password: string, token: string) => {
        const response = await Api.patch(`${endpoint}/resetPassword/${token}`, {
            password,
        });
        return response;
    },
};
