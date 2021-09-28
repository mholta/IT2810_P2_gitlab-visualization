import React from 'react';
import HamburgerButton from './hamburgerButton';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

/**
 * Page header containing hamburger button and log out button
 */
const Header = () => {
  const history = useHistory();

  // Removes browser storage to log out
  const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('projectID');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('projectID');
    history.replace('/login');
  };

  return (
    <HeaderWrapper>
      <HamburgerButton />
      <ButtonWithRem
        variant="contained"
        color="primary"
        onClick={() => logOut()}
      >
        Log out
      </ButtonWithRem>
    </HeaderWrapper>
  );
};

const ButtonWithRem = styled(Button)`
  margin-top: 1rem;
  margin-right: 1rem;
`;

const HeaderWrapper = styled.header`
  min-height: 3rem;
  display: flex;
  flex-flow: row-reverse;
`;

export default Header;
