import styled from 'styled-components';
import TimeSpan from './timeSpan';
import CategorySelect from './categorySelect';
import ShowUsers from './showUsers';
import ViewTypeToggle from './viewTypeToggle';
import ActionButton from './actionButton';

/**
 * Filter for deciding what data should be fetched from GitLab.
 */
const Filter = () => {
  return (
    <FilterWrapper>
      <CategorySelect />
      <TimeSpan />
      <ShowUsers />
      <ViewTypeToggle />
      <ActionButton />
    </FilterWrapper>
  );
};

const FilterWrapper = styled.div`
  padding: 1rem;
`;

export default Filter;
