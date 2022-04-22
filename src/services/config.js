import Auth from "../shared/AuthManager";
const { VITE_API_PATH } = import.meta.env;

const headers = { "content-type": "application/json" };

function client(endpoint, { body, ...customConfig } = {}) {
  const token = Auth.getToken();

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const config = {
    method: body ? "POST" : "GET",
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };
  if (body) {
    config.body = JSON.stringify(body);
  }

  return window
    .fetch(`${VITE_API_PATH}/${endpoint}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        Auth.logout();
        window.location.assign(window.location);
        return;
      }
      if (response.ok) {
        return await response.json();
      } else {
        const errorMessage = await response.text();
        return Promise.reject(new Error(errorMessage));
      }
    });
}

export default {
  get: (endpoint) => {
    return client(endpoint);
  },
  post: (endpoint, body) => {
    return client(endpoint, { body });
  },
  patch: (endpoint, body) => {
    return client(endpoint, { method: "PATCH", body });
  },
  put: (endpoint, body) => {
    return client(endpoint, { method: "PUT", body });
  },
  delete: (endpoint) => {
    return client(endpoint, { method: "DELETE" });
  },
};
