import { Checkbox, FormControlLabel, withTheme } from '@material-ui/core';
import React, { useContext } from 'react';
import styled from 'styled-components';
import { FilterContext } from '../../context/filter.context';

/**
 * Checkboxes for showing or hiding a user's contributions.
 */
const ShowUsers = () => {
  const {
    state: { users },
    setUsersState
  } = useContext(FilterContext);

  // Update filter context with the toggled user
  const toggleShowUser = (index: number) => {
    const modifiedUsers = users;
    modifiedUsers[index].show = !modifiedUsers[index].show;
    setUsersState(modifiedUsers);
  };

  // console.log(users);

  return (
    <ShowUsersWrapper>
      {users.map((user, i) => (
        <FormControlLabel
          key={user.alias}
          label={user.alias}
          control={
            <Checkbox checked={user.show} onClick={() => toggleShowUser(i)} />
          }
        />
      ))}
    </ShowUsersWrapper>
  );
};

const ShowUsersWrapper = withTheme(styled.div`
  display: flex;
  flex-direction: vertical;
  flex-wrap: wrap;

  ${(props) => props.theme.breakpoints.up('xs')} {
    width: 100vw;
  }
  ${(props) => props.theme.breakpoints.up('sm')} {
    width: auto;
    min-width: 50vw;
  }
  ${(props) => props.theme.breakpoints.up('md')} {
    width: 30vw;
  }
  ${(props) => props.theme.breakpoints.up('lg')} {
    width: 20vw;
  }
`);

export default ShowUsers;
