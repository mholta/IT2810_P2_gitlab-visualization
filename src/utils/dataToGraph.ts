import { useContext } from 'react';
import { CommitData } from '../components/commits/commits';
import { ChartData } from '../components/displayData/graph';
import { FilterContext } from '../context/filter.context';
import { getDaysBetween } from './date';

const setLabels = (since: Date, until: Date) => {
  let day: Date = new Date(since);
  const labels = [];
  const dayOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  while (
    !(
      day.getDate() === until.getDate() &&
      day.getMonth() === until.getMonth() &&
      day.getFullYear() === until.getFullYear()
    )
  ) {
    labels.push(dayOfWeek[day.getDay()]);
    day.setDate(day.getDate() + 1);
  }
  labels.push(dayOfWeek[day.getDay()]);
  return labels;
};
interface produceData {}

const produceChartDataFromCommits = (
  data: CommitData[],
  since: Date,
  until: Date
): [{ [name: string]: number[] }, string[], string[], number] => {
  const labels: string[] = setLabels(since, until);
  const commitsByUserAtDate: {
    [name: string]: number[];
  } = {};
  let earliestDay = getDaysBetween(since, until);
  let numberOfDays = earliestDay + 1;
  const userNames: string[] = [];
  if (data.length > 0) {
    data.forEach((commit) => {
      const day = getDaysBetween(since, new Date(commit.created_at));
      if (day < earliestDay) {
        earliestDay = day;
      }
      if (commit.author_name in commitsByUserAtDate) {
        commitsByUserAtDate[commit.author_name][day] += 1;
      } else {
        userNames.push(commit.author_name);
        commitsByUserAtDate[commit.author_name] = Array(numberOfDays).fill(0);
        commitsByUserAtDate[commit.author_name][day] = 1;
      }
    });
  }

  return [commitsByUserAtDate, userNames, labels, earliestDay];
};
export const produceCumulativeChartDataFromCommits = (
  data: CommitData[],
  since: Date,
  until: Date
) => {
  const [commitsByUserAtDate, userNames, labels, earliestDay] =
    produceChartDataFromCommits(data, since, until);
  let chart: ChartData = {
    labels: labels,
    datasets: []
  };
  userNames.forEach((userName) => {
    commitsByUserAtDate[userName] = commitsByUserAtDate[userName].map(
      (
        (sum) => (noCommits: number) =>
          (sum += noCommits)
      )(0)
    ); // from https://stackoverflow.com/a/55261098/15324998
    chart = {
      ...chart,
      datasets: [
        ...chart.datasets,
        {
          values: commitsByUserAtDate[userName].slice(earliestDay),
          name: userName,
          chartType: 'line'
        }
      ]
    };
  });
  return chart;
};
export const produceBarChartDataFromCommits = (
  data: CommitData[],
  since: Date,
  until: Date
) => {
  const [commitsByUserAtDate, userNames, labels, earliestDay] =
    produceChartDataFromCommits(data, since, until);
  let chart: ChartData = {
    labels: labels,
    datasets: []
  };
  userNames.forEach((userName) => {
    chart = {
      ...chart,
      datasets: [
        ...chart.datasets,
        {
          values: commitsByUserAtDate[userName].slice(earliestDay),
          name: userName,
          chartType: 'bar'
        }
      ]
    };
  });
  return chart;
};
const produceChartDataFromIssues = (
  data: IssueData[],
  since: Date,
  until: Date
): [{ [name: string]: number[] }, string[], string[], number] => {
  const labels: string[] = setLabels(since, until);
  const issuesByUserAtDate: {
    [name: string]: number[];
  } = {};
  let earliestDay = getDaysBetween(since, until);
  let numberOfDays = earliestDay + 1;
  const userNames: string[] = [];
  if (data.length > 0) {
    data.forEach((issue) => {
      if (issue.closed_at) {
        const day = getDaysBetween(since, new Date(issue.closed_at));
        if (day < earliestDay) {
          earliestDay = day;
        }
        if (issue.assignee?.name) {
          if (issue.assignee.name in issuesByUserAtDate) {
            issuesByUserAtDate[issue.assignee.name][day] += 1;
          } else {
            userNames.push(issue.assignee.name);
            issuesByUserAtDate[issue.assignee.name] =
              Array(numberOfDays).fill(0);
            issuesByUserAtDate[issue.assignee.name][day] = 1;
          }
        }
      }
    });
  }
  return [issuesByUserAtDate, userNames, labels, earliestDay];
};
export const produceBarChartDataFromIssues = (
  data: IssueData[],
  since: Date,
  until: Date
) => {
  const [issuesByUserAtDate, userNames, labels, earliestDay] =
    produceChartDataFromIssues(data, since, until);
  let chart: ChartData = {
    labels: labels,
    datasets: []
  };
  userNames.forEach((userName) => {
    chart = {
      ...chart,
      datasets: [
        ...chart.datasets,
        {
          values: issuesByUserAtDate[userName].slice(earliestDay),
          name: userName,
          chartType: 'bar'
        }
      ]
    };
  });
  return chart;
};
export const produceCumulativeChartDataFromIssues = (
  data: IssueData[],
  since: Date,
  until: Date
) => {
  const [commitsByUserAtDate, userNames, labels, earliestDay] =
    produceChartDataFromIssues(data, since, until);
  let chart: ChartData = {
    labels: labels,
    datasets: []
  };
  userNames.forEach((userName) => {
    commitsByUserAtDate[userName] = commitsByUserAtDate[userName].map(
      (
        (sum) => (noCommits: number) =>
          (sum += noCommits)
      )(0)
    ); // from https://stackoverflow.com/a/55261098/15324998
    chart = {
      ...chart,
      datasets: [
        ...chart.datasets,
        {
          values: commitsByUserAtDate[userName].slice(earliestDay),
          name: userName,
          chartType: 'line'
        }
      ]
    };
  });
  return chart;
};
interface GitlabUser {
  id: number;
  name: string;
  username: string;
  [x: string]: any;
  //     state: string;
  //     avatar_url?: string;
  //     web_url?: string;
}
export interface IssueData {
  assignee?: GitlabUser;
  closed_at?: string;
  closed_by?: GitlabUser;
  confidential: boolean;
  created_at: string;
  description: string;
  [x: string]: any;
  // discussion_locked?: boolean;
  // downvotes: number;
  // assignees?: GitlabUser[];
  // author: GitlabUser;
  // due_date?: string;
  // has_tasks: boolean;
  // id: number;
  // iid: number;
  // issue_type: string;
  // labels: string[];
  // merge_requests_count: number;
  // milestone?: any;
  // moved_to_id?: number;
  // project_id: number;
  // references: any;
  // service_desk_reply_to?: any; //null
  // state: string; //"closed"
  // task_completion_status: any; //{count: 0, completed_count: 0}
  // time_stats: any; //{short: '#1', relative: '#1', full: 'it2810-h21/team-21/gitlab-visualization#1'}
  // title: string; //"Initialize repo with simple react setup"
  // type: string; //"ISSUE"
  // updated_at: string; //"2021-09-13T08:24:07.239+02:00"
  // upvotes: number; //0
  // user_notes_count: number; //0
  // web_url: string; //"https://gitlab.stud.idi.ntnu.no/it2810-h21/team-21/gitlab-visualization/-/issues/1"
  // _links: any; //{self: 'https://gitlab.stud.idi.ntnu.no/api/v4/projects/11839/issues/1', notes:
}
