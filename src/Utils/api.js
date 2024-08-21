import axios from 'axios';

// Configuración de Axios
const apiClient = axios.create({
  baseURL: 'http://10.0.2.2:4000/api/',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Interceptor de solicitud
apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de respuesta
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      console.log('Error de respuesta:', error.response.data);
    } else if (error.request) {
      console.log('Error de solicitud:', error.request);
    } else {
      console.log('Error de configuración:', error.message);
    }
    return error.response.data;
  }
);

// Función para reemplazar los parámetros dinámicos en la URL
const buildUrl = (urlTemplate, params) => {
  let url = urlTemplate;
  for (const key in params) {
    if (Object.hasOwn(params, key)) {
      url = url.replace(`:${key}`, params[key]);
    }
  }
  return url;
};

// Métodos para interactuar con la API
const api = {
  get: (url, urlParams, queryParams) => {
    const finalUrl = buildUrl(url, urlParams);
    return apiClient.get(finalUrl, { params: queryParams });
  },
  post: (url, urlParams, data, queryParams) => {
    const finalUrl = buildUrl(url, urlParams);
    return apiClient.post(finalUrl, data, { params: queryParams });
  },
  put: (url, urlParams, data) => {
    const finalUrl = buildUrl(url, urlParams);
    return apiClient.put(finalUrl, data);
  },
  delete: (url, urlParams, queryParams) => {
    const finalUrl = buildUrl(url, urlParams);
    return apiClient.delete(finalUrl, { params: queryParams });
  },
};

export default api;
