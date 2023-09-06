import { useSearchContext } from '../context/searchContext';

export const useInput = () => {
  const { dispatch } = useSearchContext();

  const setInputKeyword = (value: string) => {
    dispatch({ type: 'SET_QUERY', payload: value });
  };

  const deleteKeyword = () => {
    dispatch({ type: 'SET_QUERY', payload: '' });
  };

  return { setInputKeyword, deleteKeyword };
};
