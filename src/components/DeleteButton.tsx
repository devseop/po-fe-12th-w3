import React from 'react';
import { RiCloseCircleFill } from 'react-icons/ri';
import styled from '@emotion/styled';
import { useInput } from '../hooks/useInput';

const DeleteButton = () => {
  const { useInputHandler } = useInput();

  const deleteKeywordHandler = () => {
    useInputHandler('');
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
