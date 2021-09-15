import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SwipeableDrawer,
  withTheme
} from '@material-ui/core';
import React, { useState } from 'react';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import CloseSharpIcon from '@material-ui/icons/CloseSharp';
import styled from 'styled-components';

enum dataViewType {
  commits = 'Commits',
  issues = 'Issues'
}
type dataView = dataViewType.commits | keyof dataViewType.issues;

type props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const SideBar = ({ open, setOpen }: props) => {
  // Which data type is going to be viewd. All types defined in dataViewType
  const [view, setView] = useState<dataView | ''>('');
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setView(event.target.value as dataView);
  };

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
    setOpen(open);
  };
  return (
    <>
      <React.Fragment key="left">
        <SwipeableDrawer
          anchor="left"
          open={open}
          onOpen={toggleDrawer(true)}
          onClose={toggleDrawer(false)}
        >
          <GridWithMediaQueries container justifyContent="flex-end">
            <CloseSharpIcon onClick={toggleDrawer(false)} />
          </GridWithMediaQueries>
          <FormControl color="primary" style={{ margin: '1rem' }}>
            <InputLabel>Type</InputLabel>
            <Select
              color="primary"
              value={view}
              role="presentation"
              onChange={handleChange}
            >
              {/* Different types of data to be collected */}
              {Object.values(dataViewType).map((text) => (
                <MenuItem
                  color="primary"
                  style={{ margin: 0 }}
                  key={text}
                  value={text}
                >
                  {text}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </SwipeableDrawer>
      </React.Fragment>
    </>
  );
};

const GridWithMediaQueries = withTheme(styled(Grid)`
  padding: 1rem;
  ${(props) => props.theme.breakpoints.up('xs')} {
    width: 100vw;
  }
  ${(props) => props.theme.breakpoints.up('md')} {
    width: 30vw;
  }
  ${(props) => props.theme.breakpoints.up('lg')} {
    width: 20vw;
  }
`);

export default SideBar;
