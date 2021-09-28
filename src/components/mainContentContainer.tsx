import React from 'react';
import { Container } from '@material-ui/core';
import TopBar from './topBar';
import { useContext, useEffect, useState } from 'react';
import { FilterContext } from '../context/filter.context';
import apiSwitch, { LoadingState } from '../api/useApi';
import List from './commits/list';
import Graph, { ChartData } from './displayData/graph';
import { DataCategory, ListOrGraph } from '../context/filter.initialValue';
import {
  produceBarChartDataFromDataObjects,
  produceCumulativeGraphChartDataFromDataObjects
} from '../utils/dataToGraph';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { DataObject } from '../api/types';

const MainContentContainer = () => {
  const history = useHistory();
  if (
    !(
      (localStorage.getItem('projectID') !== null ||
        sessionStorage.getItem('projectID') !== null) &&
      (localStorage.getItem('token') !== null ||
        sessionStorage.getItem('token') !== null)
    )
  ) {
    history.replace('/login');
  }
  const [data, setData] = useState<DataObject[]>([]);
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
  console.log(users);
  const [chartData, setChartData] = useState<ChartData>({
    chartType: 'bar',
    labels: [],
    datasets: []
  });

  useEffect(() => {
    apiSwitch(since, until, category, users).then((apiResult: any) => {
      if (apiResult.loadingState === LoadingState.ERROR) {
        localStorage.removeItem('token');
        localStorage.removeItem('projectID');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('projectID');
        history.replace({
          pathname: '/login',
          state: 'There was an error with the projectID or the Access-token'
        });
      } else {
        setData(apiResult.data);
        setLoadingState(apiResult.loadingState);
        setUsersState(apiResult.updatedUsers);
      }
    });
    // eslint-disable-next-line
  }, [since, until, category, users]);

  useEffect(() => {
    // data, category
  }, [since, until, listOrGraph]);

  useEffect(() => {
    if (listOrGraph === ListOrGraph.GRAPH) {
      if (category === DataCategory.COMMITS) {
        setChartData(
          produceCumulativeGraphChartDataFromDataObjects(
            data,
            since,
            until,
            users
          )
        );
      } else if (category === DataCategory.ISSUES) {
        setChartData(
          produceBarChartDataFromDataObjects(data, since, until, users)
        );
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
                <List commits={data} users={users} />
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
