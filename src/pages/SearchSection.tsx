import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import styled from '@emotion/styled';
import SearchKeywordList from '../components/SearchKeywordList';
import { useSearchContext } from '../context/searchContext';

const SearchSection = () => {
  const headerText = '국내 모든 임상시험 검색하고\n온라인으로 참여하기';
  const { state } = useSearchContext();
  const { sickList } = state;
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const selectListItemByKeyArrow = (
    e: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLLIElement>,
  ) => {
    if (e.nativeEvent.isComposing) return;
    switch (e.key) {
      case 'ArrowDown': {
        e.preventDefault();
        const lastIndex = sickList.length - 1;
        setSelectedIndex((prev) => (prev < lastIndex ? prev + 1 : 0));
        break;
      }
      case 'ArrowUp': {
        e.preventDefault();
        const lastIndex = sickList.length - 1;
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : lastIndex));
        break;
      }
      default:
        break;
    }
  };

  return (
    <Container>
      <Header>{headerText}</Header>
      <SearchBar
        setSelectedIndex={setSelectedIndex}
        selectListItemByKeyArrow={selectListItemByKeyArrow}
      />
      <SearchKeywordList
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        selectListItemByKeyArrow={selectListItemByKeyArrow}
      />
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
