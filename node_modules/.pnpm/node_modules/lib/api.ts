import axios from 'axios';

export const strapi = axios.create({
  baseURL: import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337/api',
});
