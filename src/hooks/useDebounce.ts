import { useEffect, useState } from 'react';
import { DEBOUNCE_DELAY_TIEM } from '../constants/constant';

export const useDebounce = <T>(value: T, delay = DEBOUNCE_DELAY_TIEM) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timeOut);
    };
  }, [value, delay]);

  return debouncedValue;
};
