import Header from '../components/header';
import MainContentContainer from '../components/mainContentContainer';
import SideBar from '../components/sidebar';
import { withTheme } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchCommits, fetchIssues, fetchUsers, GitLabTypes } from '../api/api';
import { Main } from '../components/layout';

const MainPage = () => {
  const [invert, setInvert] = useState<boolean>(false);
  const [data, setData] = useState<any>({ loading: false, data: null });
  const [filter, setFilter] = useState<any>({
    since: new Date(1609459200000),
    until: new Date(1631533978000),
    type: GitLabTypes.Issues
  });

  useEffect(() => {
    setData({ loading: true, data: null });
    if (filter.type === GitLabTypes.Users) {
      fetchUsers().then((users) => setData({ loading: false, data: users }));
    } else if (filter.type === GitLabTypes.Commits) {
      fetchCommits(filter.since, filter.until).then((commits) =>
        setData({ loading: false, data: commits })
      );
    } else if (filter.type === GitLabTypes.Issues) {
      fetchIssues(filter.since, filter.until).then((issues) =>
        setData({ loading: false, data: issues })
      );
    }
  }, [filter]);

  return (
    <Main>
      <Header />
      <SideBar />
      <MainContentContainer />
      <p>Type: {filter.type}</p>
      <p>Loading: {data.loading ? 'True' : 'False'}</p>
      <p>Data count: {data.data?.length}</p>
      MainPage
    </Main>
  );
};

export default MainPage;
