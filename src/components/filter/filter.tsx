import React from 'react';
import styled from 'styled-components';
import TimeSpan from './timeSpan';
import CategorySelect from './categorySelect';

const Filter = () => {
  return (
    <FilterWrapper>
      <CategorySelect />
      <TimeSpan />
    </FilterWrapper>
  );
};

const FilterWrapper = styled.div`
  padding: 1rem;
`;

export default Filter;
