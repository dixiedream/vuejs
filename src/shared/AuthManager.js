const TOKEN_NAME = "tk";

export default {
  getToken: () => {
    return window.localStorage.getItem(TOKEN_NAME);
  },
  isLogged: () => {
    return window.localStorage.getItem(TOKEN_NAME) !== undefined;
  },
  login: (token) => {
    window.localStorage.setItem(TOKEN_NAME, token);
  },
  logout: () => {
    window.localStorage.removeItem(TOKEN_NAME);
  },
};
