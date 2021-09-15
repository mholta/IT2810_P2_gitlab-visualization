import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import React from 'react';
import { setDataCategory } from '../../state/reducer.actions';
import { DataViewType } from '../../state/types';
import { useGlobalState } from '../../state/useGlobalState';

const TypeSelect = () => {
  // Which data type is going to be viewd. All types defined in dataViewType
  const { state, dispatch } = useGlobalState();

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    dispatch(setDataCategory(event.target.value as DataViewType));
  };

  return (
    <FormControl color="primary" fullWidth>
      <InputLabel>Type</InputLabel>
      <Select
        color="primary"
        value={state.filter.category}
        role="presentation"
        onChange={handleChange}
      >
        {/* Different types of data to be collected */}
        {Object.values(DataViewType).map((text) => (
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
  );
};

export default TypeSelect;
