import React, { useContext } from 'react';
import { Toolbar, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { LayoutContext } from '../context/layout.context';
import HamburgerButton from './hamburgerButton';
import styled from 'styled-components';

const Header = () => {
  const { setMenuOpen } = useContext(LayoutContext);

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
