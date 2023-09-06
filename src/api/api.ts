import axios from 'axios';
import { API_BASE_URL } from '../constant/urls';
import { ISick } from '../types/type';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchSickList = async (query: string): Promise<ISick[]> => {
  const encodedQuery = encodeURIComponent(query);
  const res = await api.get(`/sick?q=${encodedQuery}`);
  console.info('🆘 calling api');
  return res.data;
};
