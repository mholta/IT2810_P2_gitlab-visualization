import React, { useContext, useEffect, useState } from 'react';
import { CommitData } from '../components/commits/commits';
import { FilterContext } from '../context/filter.context';
import { DataCategory } from '../context/filter.initialValue';
import { fetchCommits, fetchIssues } from './api';

const UseAPI = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [userNum, setUserNum] = useState<number>(1);
  const [data, setData] = useState<any>([]);
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
          let currentUserNum: number = userNum;

          commits
            .map((d: CommitData) => d.author_name)
            .filter((v: any, i: number, a: any) => a && a.indexOf(v) === i) // Kopiert fra https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
            .forEach((name: any) => {
              if (users.map((u) => u.id).indexOf(name) === -1) {
                const newUser: User = {
                  alias: 'User ' + currentUserNum,
                  id: name,
                  show: true
                };
                users.push(newUser);

                currentUserNum++;
              }
            });

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
          let currentUserNum: number = userNum;

          issues
            .map((i: any) => i.assignee?.name)
            .filter((v: any, i: number, a: any) => a.indexOf(v) === i) // Kopiert fra https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
            .forEach((name: string) => {
              if (users.map((u) => u.id).indexOf(name) === -1) {
                const newUser: User = {
                  alias: 'User ' + currentUserNum,
                  id: name,
                  show: true
                };
                users.push(newUser);

                currentUserNum++;
              }
            });

          setUserNum(currentUserNum);

          setData(issues);
          setLoadingState(LoadingState.LOADED);
        });
        break;
      }
      default:
        break;
    }
  }, [filterState]); // must be changed later on

  return { data, users, loadingState };
};

export enum LoadingState {
  LOADING = 'loading',
  ERROR = 'error',
  LOADED = 'loaded'
}

export interface User {
  alias: string;
  id: string;
  show: boolean;
}

export default UseAPI;
