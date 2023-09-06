import axios from 'axios';
import { API_URL } from '../constants/constant';
import { ISick } from '../types/type';
import { generateCacheKey, getCache, setCacheWithExpiration } from '../utils/cacheService';

const api = axios.create({
  baseURL: API_URL.host,
});

/** before local cache */
// export const fetchSickList = async (query: string): Promise<ISick[]> => {
//   const encodedQuery = encodeURIComponent(query);
//   const res = await api.get(`/${API_URL.route}?q=${encodedQuery}`);
//   console.info('🆘 calling api');
//   return res.data;
// };

/** after local cache */
export const fetchSickList = async (query: string): Promise<ISick[]> => {
  const encodedQuery = encodeURIComponent(query);
  /** 캐시 키 생성 */
  const cacheKey = generateCacheKey(`/${API_URL.route}`, { q: encodedQuery });

  /** 캐싱된 데이터를 가져오기 */
  const cachedData = getCache(cacheKey);

  if (cachedData) {
    console.info('📦 Using cached data');
    return cachedData;
  }

  try {
    const res = await api.get(`/${API_URL.route}?q=${encodedQuery}`);
    console.info('✅ Calling API');

    const data = res.data;
    setCacheWithExpiration(cacheKey, data, 10); // 유효시간 30분 제한

    return data;
  } catch (error) {
    console.error('❌ API request failed', error);
    throw error;
  }
};
