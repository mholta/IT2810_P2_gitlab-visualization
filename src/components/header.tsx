import { Toolbar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';

type props = {
  openMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({ openMenu }: props) => {
  return (
    <Toolbar>
      <MenuIcon onClick={() => openMenu(true)} />
    </Toolbar>
  );
};

export default Header;
