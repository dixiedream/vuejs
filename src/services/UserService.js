import Api from "./config";

const endpoint = `users`;

export default {
  async createUser(user) {
    const response = await Api.post(endpoint, user);
    return response.data;
  },
};
