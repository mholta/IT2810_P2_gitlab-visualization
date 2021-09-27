import { Container } from '@material-ui/core';
import TopBar from './topBar';
import { useContext, useEffect, useState } from 'react';
import { FilterContext } from '../context/filter.context';
import UseAPI, { LoadingState } from '../api/useApi';
import Commits from './commits/commits';
import Graph, { ChartData } from './displayData/graph';
import { DataCategory, ListOrGraph } from '../context/filter.initialValue';
import {
  produceBarChartDataFromIssues,
  produceCumulativeChartDataFromCommits
} from '../utils/dataToGraph';
import styled from 'styled-components';

const MainContentContainer = () => {
  const [data, setData] = useState<any>([]);
  const [loadingState, setLoadingState] = useState<LoadingState>(
    LoadingState.LOADING
  );

  const {
    state: {
      timeSpan: { since, until },
      category,
      listOrGraph,
      users
    },
    setUsersState
  } = useContext(FilterContext);

  const [chartData, setChartData] = useState<ChartData>({
    chartType: 'bar',
    labels: [],
    datasets: []
  });

  useEffect(() => {
    console.log('useEffect calling UseAPI');

    UseAPI(since, until, category, users).then((apiResult: any) => {
      console.log('UseAPI');

      setData(apiResult.data);
      console.log('UseAPI after setData');
      setLoadingState(apiResult.loadingState);
      console.log('UseAPI after setLoadingState');
      setUsersState(apiResult.updatedUsers);
      console.log('UseAPI after setUsersState');
      console.log(data);
    });
    // eslint-disable-next-line
  }, [since, until, category, users]);

  console.log('MainContentContainer rendered');

  useEffect(() => {
    // data, category
  }, [since, until, listOrGraph]);

  useEffect(() => {
    console.log('useEffect produceCumulativeChart');

    if (listOrGraph === ListOrGraph.GRAPH) {
      if (category === DataCategory.COMMITS) {
        setChartData(
          produceCumulativeChartDataFromCommits(data, since, until, users)
        );
      } else if (category === DataCategory.ISSUES) {
        setChartData(produceBarChartDataFromIssues(data, since, until, users));
      }
    }
  }, [data, listOrGraph, category, since, until, users]);

  return (
    <Container>
      {/* START */}
      <ScalableImage
        src="gitlab-logo/gitlab-logo-gray-rgb-high.png"
        srcSet="gitlab-logo/gitlab-logo-gray-rgb-low.png 313w,
                gitlab-logo/gitlab-logo-gray-rgb-mid.png 625w,
                gitlab-logo/gitlab-logo-gray-rgb-high.png 1250w,
                gitlab-logo/gitlab-logo-gray-rgb-original.png 2500w"
        sizes="(max-width: 313px) 313px, (max-width: 625px) 625px, (max-width: 1250px) 1250px, 2500px"
        alt="GitLab Logo"
      />

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

const ScalableImage = styled.img`
  width: 100%;
`;

export default MainContentContainer;
