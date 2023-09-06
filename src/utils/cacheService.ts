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
export const setCacheWithExpiration = (key: string, data: ISick[], expirationMinutes: number) => {
  const currentTime = new Date().getTime();
  /** 현재 시간에 만료 시간을 더하여 유효 시간을 설정 */
  const expirationTime = currentTime + expirationMinutes * 60 * 1000;
  const cacheData = {
    data,
    expirationTime,
  };
  localStorage.setItem(key, JSON.stringify(cacheData));
};

/** 로컬 캐시에서 데이터를 가져오는 함수 */
export const getCache = (key: string) => {
  const cachedData = localStorage.getItem(key);

  if (cachedData) {
    const cacheData = JSON.parse(cachedData);

    // 만료 시간을 확인하여 캐시가 만료되었는지 검사
    if (cacheData.expirationTime && new Date().getTime() > cacheData.expirationTime) {
      localStorage.removeItem(key); // 캐시가 만료되었으면 삭제
      return null;
    }
    return cacheData.data;
  }
  return null;
};

/** 로컬 캐시에서 데이터를 삭제하는 함수 */
export const removeCache = (key: string) => {
  localStorage.removeItem(key);
};
