import React from 'react';
import styled from '@emotion/styled';

interface IHighlitedKeyword {
  parts: string[];
  query: string;
}

const HighlitedKeyword = ({ parts, query }: IHighlitedKeyword) => {
  return (
    <>
      {parts.map((part, index) => (
        <React.Fragment key={index}>
          {index > 0 && ' '} {/* 이전 파트와의 공백 유지 */}
          {index < parts.length - 1 ? (
            <p>
              {part}
              <HighlightedText>{query}</HighlightedText>
            </p>
          ) : (
            <Remains>{part}</Remains> // 마지막 파트는 HighlightedText를 사용하지 않음
          )}
        </React.Fragment>
      ))}
    </>
  );
};

const HighlightedText = styled.span`
  display: inline-block;
  font-weight: 700;
`;

const Remains = styled.span`
  max-width: 250px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export default HighlitedKeyword;
