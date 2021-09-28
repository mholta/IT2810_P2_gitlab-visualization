import { Checkbox, FormControlLabel } from '@material-ui/core';
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

const ShowUsersWrapper = styled.div`
  display: flex;
  flex-direction: vertical;
`;

export default ShowUsers;
