import { Container } from '@material-ui/core';
import TopBar from './topBar';
import styled from 'styled-components';
import { useContext } from 'react';
import { FilterContext } from '../context/filter.context';
import UseAPI, { LoadingState } from '../api/useApi';
import Commits from './commits/commits';
import Graph, { ChartData } from './displayData/graph';

const MainContentContainer = () => {
  const {
    state: {
      timeSpan: { since, until },
      category
    }
  } = useContext(FilterContext);

  const { data, users, loadingState } = UseAPI();
  console.log(users);
  const chartData: ChartData = {
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
      <FilterContext.Consumer>
        {(value) => <div>{JSON.stringify(value)}</div>}
      </FilterContext.Consumer>

      {/* START */}
      <div>
        {loadingState === LoadingState.LOADING && <div>loading</div>}
        {loadingState === LoadingState.LOADED && (
          <Commits commits={data} users={users} />
        )}
      </div>
      {/* END */}

      <TopBar />
      <Container>
        Info her
        <Card>
          From: {since?.toLocaleDateString()}
          <br />
          To: {until?.toLocaleDateString()}
        </Card>
        <Graph data={chartData} />
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
