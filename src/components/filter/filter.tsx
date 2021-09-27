import styled from 'styled-components';
import TimeSpan from './timeSpan';
import CategorySelect from './categorySelect';
import ShowUsers from './showUsers';
import ViewTypeToggle from './viewTypeToggle';

const Filter = () => {
  return (
    <FilterWrapper>
      <CategorySelect />
      <TimeSpan />
      <ShowUsers />
      <ViewTypeToggle />
    </FilterWrapper>
  );
};

const FilterWrapper = styled.div`
  padding: 1rem;
`;

export default Filter;
