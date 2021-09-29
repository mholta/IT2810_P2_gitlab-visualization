import { DataCategory } from '../context/filter.initialValue';
import { checkNewUsers } from '../utils/list';
import { fetchCommits, fetchIssues } from './api';
import { DataObject, LoadingState, User } from './types';

// Uses API to get data and add newly discovered users.
const apiSwitch = async (
  since: Date,
  until: Date,
  category: DataCategory,
  users: User[]
): Promise<any> => {
  switch (category) {
    case DataCategory.COMMITS: {
      return await fetchCommits(since, until)
        .then((data) => {
          checkNewUsers(
            data.map((d: any) => d.author_name),
            users
          );

          // Map data to DataObjects
          const commits: DataObject[] = data
            .filter((commit: any) => commit.committed_date)
            .map((commit: any): DataObject => {
              return {
                date: new Date(commit.committed_date),
                title: commit.title,
                user: users[users.map((u) => u.id).indexOf(commit.author_name)]
              };
            })
            .filter((commit: DataObject) => commit.user);

          return {
            data: commits,
            loadingState: LoadingState.LOADED,
            updatedUsers: users
          };
        })
        .catch(() => {
          return { loadingState: LoadingState.ERROR };
        });
    }

    case DataCategory.ISSUES: {
      return await fetchIssues(since, until)
        .then((data) => {
          checkNewUsers(
            data
              .filter((i: any) => i.assignee)
              .map((i: any) => i.assignee.name),
            users
          );

          // Map data to DataObjects
          const issues: DataObject[] = data
            .filter((issue: any) => issue.closed_at)
            .map(
              (issue: any): DataObject => ({
                date: new Date(issue.closed_at),
                title: issue.title,
                user: users[
                  users.map((u) => u.id).indexOf(issue.assignee?.name ?? '')
                ]
              })
            )
            .filter((issue: DataObject) => issue.user);

          return {
            data: issues,
            loadingState: LoadingState.LOADED,
            updatedUsers: users
          };
        })
        .catch(() => {
          return { loadingState: LoadingState.ERROR };
        });
    }
    default:
      break;
  }
};

export default apiSwitch;
