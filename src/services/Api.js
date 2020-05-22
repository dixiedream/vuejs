import axios from "axios";

// eslint-disable-next-line no-undef
const baseUrl = API_BASE_PATH;

export default {
  setUser(u) {
    userLogged = u;
  },
  user: {
    async login(email, password) {
      try {
        const response = await axios.post(`${baseUrl}/auth`, {
          email,
          password,
        });
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    async register(user) {
      try {
        const response = await axios.post(`${baseUrl}/users`, user);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    async forgotPassword(telephone) {
      try {
        const response = await axios.post(`${baseUrl}/auth/forgotPassword`, {
          email,
        });
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  },
};
