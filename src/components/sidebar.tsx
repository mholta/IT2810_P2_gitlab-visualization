import {
  Grid,
  IconButton,
  SwipeableDrawer,
  withTheme
} from '@material-ui/core';
import React, { useContext } from 'react';
import CloseSharpIcon from '@material-ui/icons/CloseSharp';
import styled from 'styled-components';
import Filter from './filter/filter';
import { LayoutContext } from '../context/layout.context';

/**
 * Sidebar on left side of screen which contains data filter.
 */
const SideBar = () => {
  const { state, setMenuOpen } = useContext(LayoutContext);

  // Toogle sidebar on eventchange and function-call
  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setMenuOpen(open);
  };

  return (
    <SwipeableDrawer
      anchor="left"
      open={state.menuOpen}
      onOpen={toggleDrawer(true)}
      onClose={toggleDrawer(false)}
    >
      <GridWithMediaQueries container justifyContent="flex-end">
        <IconButtonNoPadding onClick={toggleDrawer(false)}>
          <CloseSharpIcon />
        </IconButtonNoPadding>
      </GridWithMediaQueries>
      <Filter />
    </SwipeableDrawer>
  );
};

const GridWithMediaQueries = withTheme(styled(Grid)`
  padding: 1rem;
`);

const IconButtonNoPadding = withTheme(styled(IconButton)`
  padding: 0;
`);

export default SideBar;
