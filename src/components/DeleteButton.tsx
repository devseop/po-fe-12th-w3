import React from 'react';
import { RiCloseCircleFill } from 'react-icons/ri';
import { styled } from 'styled-components';
import { useInput } from '../hooks/useInput';

const DeleteButton = () => {
  const { deleteKeyword } = useInput();

  return (
    <Button onClick={deleteKeyword}>
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
