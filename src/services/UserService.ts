import Api from "./config";
import useAccessToken from "../store/accessToken";
import AuthBody from "../@types/AuthBody";
import MeResponse from "../@types/MeResponse";
import AuthResponse from "../@types/AuthResponse";
import User from "../@types/User";

const { token, refreshToken } = useAccessToken();

const endpoint = `users`;

export default {
    async createUser(user: AuthBody): Promise<AuthResponse> {
        return Api.post(endpoint, user);
    },
    async getMe(): Promise<MeResponse> {
        if (token.value === "") {
            await refreshToken();
        }

        return Api.get(`${endpoint}/me`);
    },
    async getAll(): Promise<User[]> {
        if (token.value === "") {
            await refreshToken();
        }

        return Api.get(endpoint);
    },
    async updateMe(user: object) {
        if (token.value === "") {
            await refreshToken();
        }

        return Api.patch(`${endpoint}/me`, user);
    },
    async update(userId: string, data: object): Promise<User> {
        if (token.value === "") {
            await refreshToken();
        }

        return Api.patch(`${endpoint}/${userId}`, data);
    },
};
