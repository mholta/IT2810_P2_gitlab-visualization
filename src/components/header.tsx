import React, { useContext } from 'react';
import { Toolbar, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { LayoutContext } from '../context/layout.context';

const Header = () => {
  const { setMenuOpen } = useContext(LayoutContext);

  return (
    <Toolbar>
      <IconButton onClick={() => setMenuOpen(true)}>
        <MenuIcon />
      </IconButton>
    </Toolbar>
  );
};

export default Header;
