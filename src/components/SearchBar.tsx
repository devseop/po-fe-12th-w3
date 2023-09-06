import React from 'react';
import styled from '@emotion/styled';
import { RiSearchLine } from 'react-icons/ri';
import DeleteButton from './DeleteButton';

import { useSearchContext } from '../context/searchContext';
import { useInput } from '../hooks/useInput';

const SearchBar = () => {
  const { state } = useSearchContext();
  const { query } = state;
  const { useInputHandler } = useInput();

  const inputKeywordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    useInputHandler(e.target.value);
  };

  return (
    <>
      <SearchBarContainer>
        <RiSearchLine size={20} color='rgba(0,0,0,0.4)' />
        <Input
          type='text'
          placeholder='질환명을 입력해 주세요.'
          value={query}
          onChange={inputKeywordHandler}
        />
        {query && <DeleteButton />}
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
