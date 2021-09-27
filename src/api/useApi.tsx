import { CommitData } from '../components/commits/commits';
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

const UseAPI = async (
  since: Date,
  until: Date,
  category: DataCategory,
  users: User[]
): Promise<any> => {
  switch (category) {
    case DataCategory.COMMITS: {
      return await fetchCommits(since, until)
        .then((commits) => {
          getUniqueUsers(
            commits.map((d: CommitData) => d.author_name),
            users
          );

          const userCommits = [];
          for (const commit of commits) {
            for (const user of users) {
              if (user.show && commit.author_name === user.id) {
                userCommits.push(commit);
                break;
              }
            }
          }

          return {
            data: userCommits,
            loadingState: LoadingState.LOADED,
            updatedUsers: users
          };
        })
        .catch((err) => {
          console.log(err);

          return {
            loadingState: LoadingState.ERROR
          };
        });
    }
    case DataCategory.ISSUES: {
      return await fetchIssues(since, until)
        .then((issues) => {
          getUniqueUsers(
            issues
              .filter((i: any) => i.assignee)
              .map((i: any) => i.assignee?.name),
            users
          );

          const userIssues = [];
          for (const issue of issues) {
            for (const user of users) {
              if (user.show && issue.assignee?.name === user.id) {
                userIssues.push(issue);
                break;
              }
            }
          }

          return {
            data: userIssues,
            loadingState: LoadingState.LOADED,
            updatedUsers: users
          };
        })
        .catch((err) => {
          console.log(err);
          return {
            loadingState: LoadingState.ERROR
          };
        });
    }
    default:
      break;
  }
};

export default UseAPI;
