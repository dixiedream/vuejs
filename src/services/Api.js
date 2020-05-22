import axios from "axios";

// eslint-disable-next-line no-undef
const baseUrl = API_BASE_PATH;

export default {
  user: {
    async login(email, password) {
      const response = await axios.post(`${baseUrl}/auth`, {
        email,
        password,
      });
      return response.data;
    },
    async register(user) {
      const response = await axios.post(`${baseUrl}/users`, user);
      return response.data;
    },
    async forgotPassword(email) {
      const response = await axios.post(`${baseUrl}/auth/forgotPassword`, {
        email,
      });
      return response.data;
    },
  },
};
