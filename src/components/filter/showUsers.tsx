import { Checkbox, FormControlLabel } from '@material-ui/core';
import React, { useContext } from 'react';
import styled from 'styled-components';
import { FilterContext } from '../../context/filter.context';

const ShowUsers = () => {
  const {
    state: { users },
    setUsersState
  } = useContext(FilterContext);

  const toggleShowUser = (index: number) => {
    const modifiedUsers = users;
    modifiedUsers[index].show = !modifiedUsers[index].show;
    setUsersState(modifiedUsers);
  };

  return (
    <ShowUsersWrapper>
      {users.map((user, i) => (
        <FormControlLabel
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
