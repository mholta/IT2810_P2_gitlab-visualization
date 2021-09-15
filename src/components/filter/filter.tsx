import React from 'react';
import styled from 'styled-components';
import TimeSpan from './timeSpan';
import TypeSelect from './typeSelect';

const Filter = () => {
  return (
    <FilterWrapper>
      <TypeSelect />
      <TimeSpan />
    </FilterWrapper>
  );
};

const FilterWrapper = styled.div`
  padding: 1rem;
`;

export default Filter;
