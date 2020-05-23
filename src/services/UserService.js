import axios from "axios";

const { VUE_APP_API_PATH } = process.env;

const endpoint = `${VUE_APP_API_PATH}/users`;

export default {
  async createUser(user) {
    const response = await axios.post(endpoint, user);
    return response.data;
  },
};
