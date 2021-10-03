import styled from 'styled-components';
import TimeSpan from './timeSpan';
import CategorySelect from './categorySelect';
import ShowUsers from './showUsers';
import ViewTypeToggle from './viewTypeToggle';
import ActionButton from './actionButton';
import { withTheme } from '@material-ui/core';

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

const FilterWrapper = withTheme(styled.div`
  padding: 1rem;
  ${(props) => props.theme.breakpoints.up('xs')} {
    width: calc(100vw - 2rem);
  }
  ${(props) => props.theme.breakpoints.up('sm')} {
    max-width: 600px;
    width: 80vw;
  }
  ${(props) => props.theme.breakpoints.up('md')} {
    width: 55vw;
  }
  ${(props) => props.theme.breakpoints.up('lg')} {
    width: 40vw;
  }
`);

export default Filter;
