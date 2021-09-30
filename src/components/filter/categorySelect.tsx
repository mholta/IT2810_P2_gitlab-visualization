import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { FilterContext } from '../../context/filter.context';
import { DataCategory } from '../../context/filter.initialValue';

/**
 * Dropdown menu for selecting which DataCategory should be fetched.
 */
const CategorySelect = () => {
  const {
    state: { category },
    setCategory
  } = useContext(FilterContext);

  const [localCategory, setLocalCategory] = useState<DataCategory>(category);

  useEffect(() => {
    setLocalCategory(category);
  }, [category]);

  // Update filter context with selected category
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const newCategory: DataCategory = event.target.value as DataCategory;

    setLocalCategory(newCategory);
    setCategory(newCategory);
  };

  return (
    <FormControl color="primary" fullWidth>
      <InputLabel>Type</InputLabel>
      <Select
        color="primary"
        value={localCategory}
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
