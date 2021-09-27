import { useContext, useEffect, useState } from 'react';
import Commits, { CommitData } from '../components/commits/commits';
import { FilterContext } from '../context/filter.context';
import { DataCategory } from '../context/filter.initialValue';
import { getUniqueUsers } from '../utils/list';
import { fetchCommits, fetchIssues } from './api';

export enum LoadingState {
  LOADING = 'loading',
  ERROR = 'error',
  LOADED = 'loaded'
}

export interface User {
  alias: string;
  id: string;
  show: boolean;
  color: string;
}

const UseAPI = () => {
  const [data, setData] = useState<any>([]);
  const [loadingState, setLoadingState] = useState<LoadingState>(
    LoadingState.LOADING
  );

  const { state: filterState, setUsersState } = useContext(FilterContext);

  useEffect(() => {
    setLoadingState(LoadingState.LOADING);
    switch (filterState.category) {
      case DataCategory.COMMITS: {
        fetchCommits(
          filterState.timeSpan.since,
          filterState.timeSpan.until
        ).then((commits) => {
          const users = filterState.users;

          getUniqueUsers(
            commits.map((d: CommitData) => d.author_name),
            users
          );

          const userCommits = [];
          for (const commit of commits) {
            for (const user of users) {
              if (user.show && commit.author_name == user.id) {
                userCommits.push(commit);
                break;
              }
            }
          }

          setUsersState(users);
          setData(userCommits);
          setLoadingState(LoadingState.LOADED);
        });
        break;
      }
      case DataCategory.ISSUES: {
        fetchIssues(
          filterState.timeSpan.since,
          filterState.timeSpan.until
        ).then((issues) => {
          const users = filterState.users;

          getUniqueUsers(
            issues.map((i: any) => i.assignee?.name),
            users
          );

          const userIssues = [];
          for (const issue of issues) {
            for (const user of users) {
              if (user.show && issue.assignee?.name == user.id) {
                userIssues.push(issue);
                break;
              }
            }
          }

          setUsersState(users);
          setData(userIssues);
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

export default UseAPI;
