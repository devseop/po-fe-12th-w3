import React from 'react';
import { useSearchContext } from '../context/searchContext';
import styled from '@emotion/styled';
import { RiSearchLine } from 'react-icons/ri';
import HighlitedKeyword from './HighlitedKeyword';

interface ISearchKeywordList {
  isSearchBarFocused: boolean;
}

const SearchKeywordList = ({ isSearchBarFocused }: ISearchKeywordList) => {
  const { state } = useSearchContext();
  const { query, sickList } = state;

  return (
    <>
      {isSearchBarFocused && (
        <KeywordContainer>
          <PresentKeywordContainer isQuery={query}>
            <RiSearchLine size={20} color='rgba(0,0,0,0.4)' />
            <PresentKeyword isQuery={query}>{query ? query : '검색어 없음'}</PresentKeyword>
          </PresentKeywordContainer>

          {query && (
            <SuggestKeywordContainer>
              {sickList.length > 0 && <SuggestHeader>추천 검색어</SuggestHeader>}
              {sickList.map((sick) => (
                <li key={sick.sickCd}>
                  <RiSearchLine size={20} color='rgba(0,0,0,0.4)' style={{ marginRight: '8px' }} />
                  {sick.sickNm.includes(query) ? (
                    <HighlitedKeyword parts={sick.sickNm.split(query)} query={query} />
                  ) : (
                    <p>{sick.sickNm}</p>
                  )}
                </li>
              ))}
            </SuggestKeywordContainer>
          )}
        </KeywordContainer>
      )}
    </>
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

const PresentKeywordContainer = styled.article<{ isQuery: string }>`
  display: flex;
  gap: 8px;
  align-items: end;
  padding: 10px 16px;
  cursor: ${(props) => (props.isQuery ? 'pointer' : 'not-allowed')};

  &:hover {
    background-color: ${(props) => (props.isQuery ? 'aliceblue' : 'transparent')};
  }
`;

const PresentKeyword = styled.span<{ isQuery: string }>`
  color: ${(props) => (props.isQuery ? '#000' : 'rgba(0,0,0,0.5)')};
  font-weight: ${(props) => (props.isQuery ? '700' : '400')};
`;

const SuggestKeywordContainer = styled.ul`
  display: flex;
  flex-direction: column;

  li {
    display: flex;
    align-items: end;
    padding: 10px 16px;
    font-weight: 400;
    cursor: pointer;

    &:hover {
      background-color: rgba(49, 130, 246, 0.1);
    }
  }
`;

const SuggestHeader = styled.p`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.4);
  margin: 8px 16px 2px;
`;

export default SearchKeywordList;
