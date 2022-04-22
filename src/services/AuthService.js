import Api from "./config";

const endpoint = `auth`;

export default {
  async login(email, password) {
    const response = await Api.post(endpoint, { email, password });
    return response;
  },

  async forgotPassword(email) {
    const response = await Api.post(`${endpoint}/forgotPassword`, { email });
    return response;
  },
};
