import React, { useState } from 'react';
import styled from 'styled-components';
import { CommitData } from './commits';

interface CommitCardProps {
  commitData: CommitData;
}

const CommitCard = ({ commitData }: CommitCardProps) => {
  const { title, web_url } = commitData;

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClick = () => {
    setTimeout(() => {
      window.location.href = web_url;
    }, 200);
  };

  return (
    <CommitCardWrapper onClick={handleClick}>
      <div>{title}</div>
    </CommitCardWrapper>
  );
};

const CommitCardWrapper = styled.div`
  padding: 2rem;
  border: 1px solid #eee;
  border-radius: 0.4rem;
  background-color: white;
  cursor: pointer;
  margin-bottom: calc(var(--padding) / 2);

  transition: transform 200ms ease, box-shadow 200ms ease;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);

  &:hover {
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.14);
    transform: scale(1.02);
  }

  &:active {
    box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.08);
    transform: scale(0.99);
  }
`;

export default CommitCard;
