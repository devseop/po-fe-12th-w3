import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import styled from '@emotion/styled';
import SearchKeywordList from '../components/SearchKeywordList';

const SearchSection = () => {
  const headerText = '국내 모든 임상시험 검색하고\n온라인으로 참여하기';
  const [isSearchBarFocused, setIsSearchBarFocused] = useState<boolean>(false);

  const searchBarFocusHandler = () => {
    setIsSearchBarFocused((prev) => !prev);
  };

  return (
    <Container>
      <Header>{headerText}</Header>
      <SearchBar
        isFocused={isSearchBarFocused}
        onFocus={searchBarFocusHandler}
        onBlur={searchBarFocusHandler}
      />
      <SearchKeywordList isSearchBarFocused={isSearchBarFocused} />
    </Container>
  );
};

const Container = styled.main`
  display: flex;
  flex-direction: column;
  margin-top: 80px;
  text-align: center;
`;

const Header = styled.h1`
  font-size: 32px;
  line-height: 1.4;
  white-space: pre-wrap;
  margin-bottom: 40px;
`;

export default SearchSection;
