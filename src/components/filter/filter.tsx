import styled from 'styled-components';
import TimeSpan from './timeSpan';
import CategorySelect from './categorySelect';
import ShowUsers from './showUsers';

const Filter = () => {
  return (
    <FilterWrapper>
      <CategorySelect />
      <TimeSpan />
      <ShowUsers />
    </FilterWrapper>
  );
};

const FilterWrapper = styled.div`
  padding: 1rem;
`;

export default Filter;
