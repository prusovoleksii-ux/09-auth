import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://notehub-api.goit.study',
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});
