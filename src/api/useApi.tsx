import { DataCategory } from '../context/filter.initialValue';
import { checkNewUsers } from '../utils/list';
import { fetchCommits, fetchIssues } from './api';
import { DataObject, User } from './types';

export enum LoadingState {
  LOADING = 'loading',
  ERROR = 'error',
  LOADED = 'loaded'
}

const apiSwitch = async (
  since: Date,
  until: Date,
  category: DataCategory,
  users: User[]
): Promise<any> => {
  switch (category) {
    case DataCategory.COMMITS: {
      return await fetchCommits(since, until).then((data) => {
        checkNewUsers(
          data.map((d: any) => d.author_name),
          users
        );

        // Map data to DataObjects
        const commits: DataObject[] = data
          .filter((commit: any) => commit.committed_date)
          .map((commit: any): DataObject => {
            console.log(
              'Commit: ' +
                commit.committed_date +
                ' // ' +
                new Date(commit.committed_date).toLocaleDateString()
            );
            return {
              date: new Date(commit.committed_date),
              title: commit.title,
              user: users[users.map((u) => u.id).indexOf(commit.author_name)]
            };
          })
          .filter((commit: DataObject) => commit.user.show);

        return {
          data: commits,
          loadingState: LoadingState.LOADED,
          updatedUsers: users
        };
      });
    }

    case DataCategory.ISSUES: {
      return await fetchIssues(since, until).then((data) => {
        checkNewUsers(
          data.filter((i: any) => i.assignee).map((i: any) => i.assignee.name),
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
          .filter((issue: DataObject) => issue.user?.show);

        return {
          data: issues,
          loadingState: LoadingState.LOADED,
          updatedUsers: users
        };
      });
    }
    default:
      break;
  }
};

export default apiSwitch;
