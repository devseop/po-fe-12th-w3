import { ISick } from '../types/type';

interface IParams {
  [key: string]: string;
}

/**로컬 캐시에 저장할 때 사용할 키를 생성하는 함수 */
export const generateCacheKey = (url: string, params: IParams = {}) => {
  const sortedParams = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join('&');
  return `${url}?${sortedParams}`;
};

/** 로컬 캐시에 데이터와 만료 시간을 저장하는 함수 */
export const setCacheWithExpiration = async (
  cacheName: string,
  key: string,
  data: ISick[],
  expirationMinutes: number,
) => {
  const currentTime = new Date().getTime();
  /** 현재 시간에 만료 시간을 더하여 유효 시간을 설정 */
  const expirationTime = currentTime + expirationMinutes * 60 * 1000;

  try {
    const cache = await caches.open(cacheName);
    const cacheData = {
      data,
      expirationTime,
    };
    await cache.put(key, new Response(JSON.stringify(cacheData)));
  } catch (err) {
    console.error(err);
  }
};

/** 로컬 캐시에서 데이터를 가져오는 함수 */
export const getCache = async (cacheName: string, key: string) => {
  try {
    const cache = await caches.open(cacheName);
    const res = await caches.match(key);

    if (res) {
      const cacheData = await res.json();

      if (cacheData.expirationTime && new Date().getTime() > cacheData.expirationTime) {
        await cache.delete(key); // 캐시가 만료되었으면 삭제
        return null;
      }
      return cacheData.data;
    }
    return null;
  } catch (err) {
    console.error(err);
    return null;
  }
};

/** 로컬 캐시에서 데이터를 삭제하는 함수 */
export const removeCache = async (key: string) => {
  try {
    const cache = await caches.open('my-cache');
    await cache.delete(key);
  } catch (error) {
    console.error('Error deleting cached data:', error);
  }
};
