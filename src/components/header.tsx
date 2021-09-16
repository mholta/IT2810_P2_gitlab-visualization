import { Toolbar, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';
import { setMenuOpen } from '../state/reducer.actions';
import { useGlobalState } from '../state/useGlobalState';

const Header = () => {
  const { dispatch, state } = useGlobalState();

  return (
    <Toolbar>
      <IconButton
        onClick={() => {
          dispatch(setMenuOpen(true));
        }}
      >
        <MenuIcon />
      </IconButton>
    </Toolbar>
  );
};

export default Header;
