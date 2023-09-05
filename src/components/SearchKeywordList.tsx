import React from 'react';
import { useSearchContext } from '../context/searchContext';
import { styled } from 'styled-components';
import { RiSearchLine } from 'react-icons/ri';

const SearchKeywordList = () => {
  const { state } = useSearchContext();
  const { query, sickList } = state;

  return (
    <KeywordContainer>
      <PresentKeywordContainer>
        <RiSearchLine size={20} color='rgba(0,0,0,0.4)' />
        <span>{query}</span>
      </PresentKeywordContainer>

      <SuggestKeywordContainer>
        {query && <span>추천 검색어</span>}
        {sickList.map((sick) => (
          <li key={sick.sickCd}>
            <RiSearchLine size={20} color='rgba(0,0,0,0.4)' />
            {sick.sickNm}
          </li>
        ))}
      </SuggestKeywordContainer>
    </KeywordContainer>
  );
};

const KeywordContainer = styled.section`
  text-align: left;
  width: 100%;
  max-width: 480px;
  padding: 10px 0 14px;
  margin: 16px auto 0;

  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);
`;

const PresentKeywordContainer = styled.article`
  display: flex;
  gap: 8px;
  align-items: end;
  font-weight: 700;
  padding: 10px 16px;
  cursor: pointer;

  &:hover {
    background-color: aliceblue;
  }
`;

const SuggestKeywordContainer = styled.ul`
  display: flex;
  flex-direction: column;

  span {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.4);
    margin: 8px 16px 2px;
  }

  li {
    display: flex;
    gap: 8px;
    align-items: end;
    padding: 10px 16px;
    font-weight: 500;
    cursor: pointer;

    &:hover {
      background-color: rgba(49, 130, 246, 0.1);
    }
  }
`;
export default SearchKeywordList;
