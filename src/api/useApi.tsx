import React, { useContext, useEffect, useState } from 'react';
import { FilterContext } from '../context/filter.context';
import { DataCategory } from '../context/filter.initialValue';
import { fetchCommits, fetchIssues } from './api';

const UseAPI = () => {
  const [users, setUsers] = useState<any>({});
  const [userNum, setUserNum] = useState<number>(1);
  const [data, setData] = useState<any>(null);
  const [loadingState, setLoadingState] = useState<LoadingState>(
    LoadingState.LOADING
  );

  const { state: filterState } = useContext(FilterContext);

  useEffect(() => {
    setLoadingState(LoadingState.LOADING);

    switch (filterState.category) {
      case DataCategory.COMMITS: {
        fetchCommits(
          filterState.timeSpan.since,
          filterState.timeSpan.until
        ).then((commits) => {
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

          setData(commits);
          setLoadingState(LoadingState.LOADED);
        });
        break;
      }
      case DataCategory.ISSUES: {
        fetchIssues(
          filterState.timeSpan.since,
          filterState.timeSpan.until
        ).then((issues) => {
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

          setData(issues);
          setLoadingState(LoadingState.LOADED);
        });
        break;
      }
      default:
        break;
    }
  }, [filterState]);

  return { data, loadingState };
};

export enum LoadingState {
  LOADING = 'loading',
  ERROR = 'error',
  LOADED = 'loaded'
}

export default UseAPI;
