import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SwipeableDrawer
} from '@material-ui/core';
import React, { useState } from 'react';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import CloseSharpIcon from '@material-ui/icons/CloseSharp';

enum dataViewType {
  commits = 'Commits',
  issues = 'Issues'
}
type dataView = dataViewType.commits | keyof dataViewType.issues;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    filterBar: {
      margin: '1rem',
      [theme.breakpoints.up('xs')]: {
        width: '100vw'
      },
      [theme.breakpoints.up('md')]: {
        width: '30vw'
      },
      [theme.breakpoints.up('lg')]: {
        width: '20vw'
      }
    }
  })
);
type props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const SideBar = ({ open, setOpen }: props) => {
  const classes = useStyles();

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
          <Grid container justifyContent="flex-end" style={{ padding: '1rem' }}>
            <Grid item xs={1}>
              <CloseSharpIcon onClick={toggleDrawer(false)} />
            </Grid>
          </Grid>
          <FormControl color="primary" className={classes.filterBar}>
            <InputLabel>Type</InputLabel>
            <Select
              style={{ width: '90%' }}
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

export default SideBar;
