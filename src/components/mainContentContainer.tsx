import React from 'react';
import { useContext, useEffect, useState } from 'react';
import { FilterContext } from '../context/filter.context';
import apiSwitch from '../api/useApi';
import { DataCategory, ListOrGraph } from '../context/filter.initialValue';
import {
  produceBarChartDataFromDataObjects,
  produceCumulativeGraphChartDataFromDataObjects
} from '../utils/dataToGraph';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { DataObject, LoadingState } from '../api/types';
import { withTheme } from '@material-ui/core';
import Graph, { ChartData } from './dataView/graph';
import List from './dataView/list';

/**
 * Main container includes a scalable image and .
 */
const MainContentContainer = () => {
  const history = useHistory();

  // Go to login screen if there is ProjectID and access token is not stored in browser
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
  // console.log(users);
  const [chartData, setChartData] = useState<ChartData>({
    chartType: 'bar',
    labels: [],
    datasets: []
  });

  // Gets data from API when filter is updated
  useEffect(() => {
    apiSwitch(since, until, category, users).then((apiResult: any) => {
      if (apiResult.loadingState === LoadingState.ERROR) {
        history.replace({
          pathname: '/login',
          state: 'There was an error with the projectID or the Access-token'
        });
      } else {
        setData(apiResult.data);
        setLoadingState(apiResult.loadingState);
        setUsersState(apiResult.updatedUsers);
        // console.log('users', users);
      }
    });
    // eslint-disable-next-line
  }, [since, until, category, users]);

  // Generate chart data when data or filters change
  useEffect(() => {
    // console.log(data, since, until, users);
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
              <GraphWrapper id="graph">
                <Graph data={chartData} />
              </GraphWrapper>
            )}
          </div>
        )}
      </div>
      {/* END */}
    </Container>
  );
};

const ScalableImage = withTheme(styled.img`
  ${(props) => props.theme.breakpoints.down('md')} {
    width: 100%;
  }
  ${(props) => props.theme.breakpoints.up('md')} {
    width: ${(props) => props.theme.breakpoints.values['md']}px;
  }
`);

const Container = styled.div`
  padding: 1rem;
  text-align: center;
  width: calc(100% - 2rem);
`;
const GraphWrapper = styled.div`
  margin: auto;
  height: 80vh;
  width: 90vw;
`;
export default MainContentContainer;
