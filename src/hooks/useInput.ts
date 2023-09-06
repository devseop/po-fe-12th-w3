import { useSearchContext } from '../context/searchContext';

export const useInput = () => {
  const { dispatch } = useSearchContext();

  const useInputHandler = (value: string) => {
    dispatch({ type: 'SET_QUERY', payload: value });
  };

  return { useInputHandler };
};
