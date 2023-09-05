import React from 'react';
import SearchBar from '../components/SearchBar';
import { styled } from 'styled-components';
import SearchKeywordList from '../components/SearchKeywordList';
import { useSearchContext } from '../context/searchContext';

const SearchSection = () => {
  const { state } = useSearchContext();
  const { query, sickList } = state;
  const headerText = '국내 모든 임상시험 검색하고\n온라인으로 참여하기';

  return (
    <Container>
      <Header>{headerText}</Header>
      <SearchBar />
      {query && sickList && <SearchKeywordList />}
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
