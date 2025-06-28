import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8081/api',
});

instance.interceptors.request.use((config) => {
  const auth = localStorage.getItem('auth');
  if (auth) {
    config.headers.Authorization = `Basic ${auth}`;
  }
  return config;
});

export default instance;