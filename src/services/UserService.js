import axios from "axios";

const { VITE_API_PATH } = import.meta.env;

const endpoint = `${VITE_API_PATH}/users`;

export default {
  async createUser(user) {
    const response = await axios.post(endpoint, user);
    return response.data;
  },
};
