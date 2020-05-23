import axios from "axios";

const { VUE_APP_API_PATH } = process.env;

const endpoint = `${VUE_APP_API_PATH}/auth`;

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
