import React, { useEffect } from 'react';
import { styled } from 'styled-components';
import { RiSearchLine } from 'react-icons/ri';

import { useSearchContext } from '../context/searchContext';
import { fetchSickList } from '../api/api';

const SearchBar = () => {
  const { state, dispatch } = useSearchContext();
  const { query } = state;

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('query: ', e.target.value);
    dispatch({ type: 'SET_QUERY', payload: e.target.value });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        const sickList = await fetchSickList();
        dispatch({ type: 'SET_SICK_LIST', payload: sickList });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: error as string });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    if (query) {
      fetchData();
    } else {
      dispatch({ type: 'SET_SICK_LIST', payload: [] });
      dispatch({ type: 'SET_ERROR', payload: null });
    }
  }, [query, dispatch]);

  return (
    <>
      <SearchBarContainer>
        <RiSearchLine size={20} color='rgba(0,0,0,0.4)' />
        <Input
          type='text'
          placeholder='질환명을 입력해 주세요.'
          value={query}
          onChange={inputChangeHandler}
          autoFocus
        />
      </SearchBarContainer>
    </>
  );
};

const SearchBarContainer = styled.section`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  max-width: 480px;
  padding: 2px 16px;
  margin: 0 auto;

  background-color: #fff;
  border: 2px solid #3182f6;
  border-radius: 12px;
`;

const Input = styled.input`
  width: 100%;
  height: 44px;

  font-size: 16px;

  border: none;
  border-radius: 0;

  &:focus {
    outline: none;
  }
`;

export default SearchBar;
