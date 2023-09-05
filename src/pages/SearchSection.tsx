import React from 'react';
import SearchBar from '../components/SearchBar';
import { styled } from 'styled-components';

const SearchSection = () => {
  const headerText = '국내 모든 임상시험 검색하고\n온라인으로 참여하기';

  return (
    <Container>
      <Header>{headerText}</Header>
      <SearchBar />
    </Container>
  );
};

const Container = styled.main`
  display: flex;
  gap: 40px;
  flex-direction: column;
  margin-top: 80px;
  text-align: center;
`;

const Header = styled.h1`
  font-size: 32px;
  line-height: 1.4;
  white-space: pre-wrap;
`;

export default SearchSection;
