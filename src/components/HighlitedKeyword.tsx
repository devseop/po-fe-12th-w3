import React from 'react';
import { styled } from 'styled-components';

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
            part // 마지막 파트는 HighlightedText를 사용하지 않음
          )}
        </React.Fragment>
      ))}
    </>
  );
};

const HighlightedText = styled.p`
  display: inline-block;
  font-weight: 700;
`;

export default HighlitedKeyword;
