import { Container } from '@material-ui/core';
import TopBar from './topBar';

import { useGlobalState } from '../state/useGlobalState';
import styled from 'styled-components';
import Graph, { ChartData } from './displayData/graph';

const MainContentContainer = () => {
  const { state } = useGlobalState();
  const data: ChartData = {
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        values: [18, 40, 30, 35, 8, 52, 17, 4, 4],
        name: 'Some Data',
        chartType: 'bar'
      },
      {
        values: [30, 20, 10, 15, 14, 54, 3, 5, 6],
        name: 'Another Set',
        chartType: 'bar'
      }
    ]
  };
  return (
    <Container>
      <TopBar />
      <Container>
        Info her
        <Card>
          From: {state.filter.timeSpan.from?.toLocaleDateString()}
          <br />
          To: {state.filter.timeSpan.to?.toLocaleDateString()}
        </Card>
        <Card>Menu open: {state.menuOpen ? 'ja' : 'nei'}</Card>
        <Card>Category: {state.filter.category}</Card>
        <Graph data={data} />
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
