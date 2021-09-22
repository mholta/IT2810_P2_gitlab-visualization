import { Container } from '@material-ui/core';
import TopBar from './topBar';
import styled from 'styled-components';
import { useContext, useEffect, useState } from 'react';
import { FilterContext } from '../context/filter.context';
import UseAPI, { LoadingState } from '../api/useApi';
import Commits from './commits/commits';
import Graph, { ChartData } from './displayData/graph';
import { DataCategory, ListOrGraph } from '../context/filter.initialValue';
import {
  produceBarChartDataFromCommits,
  produceBarChartDataFromIssues,
  produceCumulativeChartDataFromCommits
} from '../utils/dataToGraph';

const MainContentContainer = () => {
  const {
    state: {
      timeSpan: { since, until },
      category,
      listOrGraph
    }
  } = useContext(FilterContext);
  const [chartData, setChartData] = useState<ChartData>({
    chartType: 'bar',
    labels: [],
    datasets: []
  });

  const { data, users, loadingState } = UseAPI();
  useEffect(() => {
    if (listOrGraph === ListOrGraph.GRAPH) {
      if (category === DataCategory.COMMITS) {
        setChartData(
          produceCumulativeChartDataFromCommits(data, since, until, users)
        );
      } else if (category === DataCategory.ISSUES) {
        setChartData(produceBarChartDataFromIssues(data, since, until, users));
      }
    }
  }, [data, users, loadingState, listOrGraph]);

  return (
    <Container>
      {/* START */}
      <div>
        {loadingState === LoadingState.LOADING && <div>loading</div>}
        {loadingState === LoadingState.LOADED && (
          <div>
            {listOrGraph === ListOrGraph.LIST ? (
              <div id="listOfCommits">
                <Commits commits={data} users={users} />
              </div>
            ) : (
              <div id="graph">
                <Graph data={chartData} />
              </div>
            )}
          </div>
        )}
      </div>
      {/* END */}

      <TopBar />
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
