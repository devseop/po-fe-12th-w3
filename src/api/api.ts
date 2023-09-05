import axios from 'axios';
import { API_BASE_URL } from '../constant/urls';
import { ISick } from '../types/type';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchSickList = async (): Promise<ISick[]> => {
  const res = await api.get('/sick');
  // console.log(`✅ data's fetched!`);
  console.info('🆘 calling api');
  return res.data.slice(0, 20);
};
