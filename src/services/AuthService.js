import axios from "axios";

const { VITE_API_PATH } = import.meta.env;

const endpoint = `${VITE_API_PATH}/auth`;

export default {
  async login(email, password) {
    const response = await axios.post(endpoint, { email, password });
    return response.data;
  },

  async forgotPassword(email) {
    const response = await axios.post(`${endpoint}/forgotPassword`, { email });
    return response.data;
  },
};
