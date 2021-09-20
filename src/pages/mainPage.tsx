import Header from '../components/header';
import MainContentContainer from '../components/mainContentContainer';
import SideBar from '../components/sidebar';
import { withTheme } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchCommits, fetchIssues, GitLabTypes } from '../api/api';
import { Main } from '../components/layout';

const MainPage = () => {
  const [invert, setInvert] = useState<boolean>(false);
  const [users, setUsers] = useState<any>({});
  const [userNum, setUserNum] = useState<number>(1);
  const [data, setData] = useState<any>({ loading: false, data: null });
  const [filter, setFilter] = useState<any>({
    since: new Date(1609459200000),
    until: new Date(1631533978000),
    type: GitLabTypes.Issues
  });

  useEffect(() => {
    setData({ loading: true, data: null });

    if (filter.type === GitLabTypes.Commits) {
      fetchCommits(filter.since, filter.until).then((commits) => {
        const newUsers: any = {};
        let currentUserNum: number = userNum;
        commits
          .map((d: any) => d.author_name)
          .filter((v: any, i: number, a: any) => a && a.indexOf(v) === i) // Kopiert fra https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
          .forEach((name: any) => {
            if (name && !(name in users)) {
              newUsers[name] = {
                name: 'User ' + currentUserNum,
                show: true
              };
              currentUserNum++;
            }
          });

        const allUsers = { ...users, ...newUsers };
        commits = commits.filter((c: any) => allUsers[c.author_name]?.show);

        setUsers(allUsers);
        setUserNum(currentUserNum);
        setData({ loading: false, data: commits });
      });
    } else if (filter.type === GitLabTypes.Issues) {
      fetchIssues(filter.since, filter.until).then((issues) => {
        const newUsers: any = {};
        let currentUserNum: number = userNum;
        issues
          .map((i: any) => i.assignee?.name)
          .filter((v: any, i: number, a: any) => a.indexOf(v) === i) // Kopiert fra https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
          .forEach((name: string) => {
            if (name && !(name in users)) {
              newUsers[name] = {
                name: 'User ' + currentUserNum,
                show: true
              };
              currentUserNum++;
            }
          });

        const allUsers = { ...users, ...newUsers };
        issues = issues.filter((i: any) => allUsers[i.assignee?.name]?.show);

        setUsers(allUsers);
        setUserNum(currentUserNum);
        setData({ loading: false, data: issues });
      });
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
