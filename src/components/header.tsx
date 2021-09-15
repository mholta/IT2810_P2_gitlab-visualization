import { Toolbar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';
import { setMenuOpen } from '../state/reducer.actions';
import { useGlobalState } from '../state/useGlobalState';

const Header = () => {
  const { dispatch, state } = useGlobalState();

  return (
    <Toolbar>
      <MenuIcon
        onClick={() => {
          dispatch(setMenuOpen(true));
          console.log(state.menuOpen);
        }}
      />
    </Toolbar>
  );
};

export default Header;
