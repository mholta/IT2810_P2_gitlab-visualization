import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import React, { useContext } from 'react';
import { FilterContext } from '../../context/filter.context';
import { DataCategory } from '../../context/filter.initialValue';

const CategorySelect = () => {
  // Which data type is going to be viewd. All types defined in dataViewType
  const {
    state: { category },
    setCategory
  } = useContext(FilterContext);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCategory(event.target.value as DataCategory);
  };

  return (
    <FormControl color="primary" fullWidth>
      <InputLabel>Type</InputLabel>
      <Select
        color="primary"
        value={category}
        role="presentation"
        onChange={handleChange}
      >
        {/* Different types of data to be collected */}
        {Object.values(DataCategory).map((text) => (
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

export default CategorySelect;
