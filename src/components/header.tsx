import React from 'react';
import HamburgerButton from './hamburgerButton';
import styled from 'styled-components';

const Header = () => {
  return (
    <HeaderWrapper>
      <HamburgerButton />
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.header`
  min-height: 3rem;
`;

export default Header;
