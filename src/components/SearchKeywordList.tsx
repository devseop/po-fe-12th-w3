import React, { useLayoutEffect, useRef } from 'react';
import { useSearchContext } from '../context/searchContext';
import styled from '@emotion/styled';
import { RiSearchLine } from 'react-icons/ri';
import HighlitedKeyword from './HighlitedKeyword';

interface ISearchKeywordListProps {
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
  selectListItemByKeyArrow: (e: React.KeyboardEvent<HTMLLIElement>) => void;
}

const SearchKeywordList = (props: ISearchKeywordListProps) => {
  const { selectedIndex, setSelectedIndex, selectListItemByKeyArrow } = props;
  const { state } = useSearchContext();
  const { query, sickList, isLoading } = state;
  const liRef = useRef<HTMLLIElement | null>(null);

  useLayoutEffect(() => {
    if (liRef.current) {
      liRef.current.focus();
    }
  });

  const resetSelectedIndex = (idx: number) => {
    setSelectedIndex(idx);
  };

  return (
    <>
      {query && (
        <KeywordContainer>
          {query && (
            <SuggestKeywordContainer>
              {sickList && sickList.length > 0 && <SuggestHeader>추천 검색어</SuggestHeader>}
              {isLoading ? (
                <LoadingText>검색 중...</LoadingText>
              ) : sickList[0] === undefined ? (
                <NoResult>검색 결과가 없습니다. 다른 질환으로 다시 입력해 보세요.</NoResult>
              ) : (
                sickList &&
                sickList.map((sick, index) => (
                  <li
                    key={sick.sickCd}
                    ref={index === selectedIndex ? liRef : null}
                    tabIndex={selectedIndex === index ? 0 : -1}
                    onKeyDown={selectListItemByKeyArrow}
                    onClick={() => resetSelectedIndex(index)}
                  >
                    <RiSearchLine
                      size={20}
                      color='rgba(0,0,0,0.4)'
                      style={{ marginRight: '8px' }}
                    />
                    {sick.sickNm.includes(query) ? (
                      <HighlitedKeyword parts={sick.sickNm.split(query)} query={query} />
                    ) : (
                      <p>{sick.sickNm}</p>
                    )}
                  </li>
                ))
              )}
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
  max-height: 460px;
  overflow-y: scroll;
  padding: 10px 0 14px;
  margin: 16px auto 0;

  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);
`;

const SuggestKeywordContainer = styled.ul`
  display: flex;
  flex-direction: column;

  li {
    display: flex;
    align-items: center;
    padding: 10px 16px;
    font-weight: 400;
    cursor: pointer;

    &:focus,
    &:focus-visible {
      outline: none;
      background-color: rgba(49, 130, 246, 0.1);
    }

    &:hover {
      background-color: rgba(49, 130, 246, 0.1);
    }
  }
`;

const SuggestHeader = styled.p`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.4);
  margin: 8px 16px 3px;
`;

const LoadingText = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: rgba(0, 0, 0, 1);
  margin: 8px 16px 2px;
`;

const NoResult = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.4);
  margin: 8px 16px 2px;
`;

export default SearchKeywordList;
