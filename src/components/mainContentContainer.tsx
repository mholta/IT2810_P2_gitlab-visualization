import { Container } from '@material-ui/core';
import TopBar from './topBar';
import styled from 'styled-components';
import { useContext } from 'react';
import { FilterContext } from '../context/filter.context';

const MainContentContainer = () => {
  const {
    state: {
      timeSpan: { since, until },
      category
    }
  } = useContext(FilterContext);

  return (
    <Container>
      {since?.toLocaleDateString()}
      {until?.toLocaleDateString()}
      <FilterContext.Consumer>
        {(value) => <div>{JSON.stringify(value)}</div>}
      </FilterContext.Consumer>
      <TopBar />
      <Container>
        Info her
        <Card>
          From: {since?.toLocaleDateString()}
          <br />
          To: {until?.toLocaleDateString()}
        </Card>
        <Card>Category: {category}</Card>
      </Container>
    </Container>
  );
};

const Card = styled.div`
  padding: 2rem;
  border: 1px solid #eee;
  border-radius: 0.4rem;
  background-color: white;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
  margin: 2rem 0;
`;

export default MainContentContainer;
