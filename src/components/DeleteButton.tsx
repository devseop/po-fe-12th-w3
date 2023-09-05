import React from 'react';
import { RiCloseCircleFill } from 'react-icons/ri';
import { useSearchContext } from '../context/searchContext';
import { styled } from 'styled-components';

const DeleteButton = () => {
  const { dispatch } = useSearchContext();

  const deleteKeywordHandler = () => {
    dispatch({ type: 'SET_QUERY', payload: '' });
  };

  return (
    <Button onClick={deleteKeywordHandler}>
      <RiCloseCircleFill size={20} color='rgba(0,0,0,0.2)' />
    </Button>
  );
};

const Button = styled.button`
  display: flex;
  border: none;
  background-color: transparent;
`;

export default DeleteButton;
