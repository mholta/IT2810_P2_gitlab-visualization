import { DataObject } from './../api/types';
import { ChartData } from '../components/displayData/graph';
import { getDateMinusDays, getDaysBetween } from './date';
import { User } from '../api/types';

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

const produceChartDataFromDataObject = (
  data: DataObject[],
  since: Date,
  until: Date
): [{ [name: string]: number[] }, string[], string[], number] => {
  const commitsByUserAtDate: {
    [name: string]: number[];
  } = {};
  let earliestDay = getDaysBetween(since, until);
  let numberOfDays = earliestDay + 1;
  const userNames: string[] = [];
  if (data.length > 0) {
    data.forEach((dataObject: DataObject) => {
      const day = getDaysBetween(since, new Date(dataObject.date));
      if (day < earliestDay) {
        earliestDay = day;
      }
      if (dataObject.user.id in commitsByUserAtDate) {
        commitsByUserAtDate[dataObject.user.id][day] += 1;
      } else {
        userNames.push(dataObject.user.id);
        commitsByUserAtDate[dataObject.user.id] = Array(numberOfDays).fill(0);
        commitsByUserAtDate[dataObject.user.id][day] = 1;
      }
    });
  }
  const firstDate = new Date(since);
  const labels: string[] = setLabels(
    getDateMinusDays(firstDate, -earliestDay),
    until
  );
  return [commitsByUserAtDate, userNames, labels, earliestDay];
};

export const produceCumulativeChartDataFromCommits = (
  data: DataObject[],
  since: Date,
  until: Date,
  users: User[]
) => {
  const [commitsByUserAtDate, userNames, labels, earliestDay] =
    produceChartDataFromDataObject(data, since, until);
  let chart: ChartData = {
    chartType: 'line',
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
    const userWithColor = users.find((u) => u.id === userName);
    chart = {
      ...chart,
      datasets: [
        ...chart.datasets,
        {
          data: commitsByUserAtDate[userName].slice(earliestDay),
          label: userWithColor?.alias ?? 'X',
          backgroundColor: userWithColor?.color ?? '#000',
          borderColor: userWithColor?.color ?? '#000'
        }
      ]
    };
  });
  return chart;
};
export const produceBarChartDataFromCommits = (
  data: DataObject[],
  since: Date,
  until: Date,
  users: User[]
) => {
  const [commitsByUserAtDate, userNames, labels, earliestDay] =
    produceChartDataFromDataObject(data, since, until);
  let chart: ChartData = {
    chartType: 'bar',
    labels: labels,
    datasets: []
  };
  userNames.forEach((userName) => {
    const userWithColor = users.find((u) => u.id === userName);
    chart = {
      ...chart,
      datasets: [
        ...chart.datasets,
        {
          data: commitsByUserAtDate[userName].slice(earliestDay),
          label: userWithColor?.alias ?? 'X',
          backgroundColor: userWithColor?.color ?? '#000'
        }
      ]
    };
  });
  return chart;
};

export const produceBarChartDataFromIssues = (
  data: DataObject[],
  since: Date,
  until: Date,
  users: User[]
) => {
  const [issuesByUserAtDate, userNames, labels, earliestDay] =
    produceChartDataFromDataObject(data, since, until);
  let chart: ChartData = {
    chartType: 'bar',
    labels: labels,
    datasets: []
  };
  userNames.forEach((userName) => {
    const userWithColor = users.find((u) => u.id === userName);
    chart = {
      ...chart,
      datasets: [
        ...chart.datasets,
        {
          data: issuesByUserAtDate[userName].slice(earliestDay),
          label: userWithColor?.alias ?? 'X',
          backgroundColor: userWithColor?.color ?? '#000'
        }
      ]
    };
  });
  return chart;
};

export const produceCumulativeChartDataFromIssues = (
  data: DataObject[],
  since: Date,
  until: Date,
  users: User[]
) => {
  const [commitsByUserAtDate, userNames, labels, earliestDay] =
    produceChartDataFromDataObject(data, since, until);
  let chart: ChartData = {
    chartType: 'line',
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
    const userWithColor = users.find((u) => u.id === userName);
    chart = {
      ...chart,
      datasets: [
        ...chart.datasets,
        {
          data: commitsByUserAtDate[userName].slice(earliestDay),
          label: userWithColor?.alias ?? 'X',
          backgroundColor: userWithColor?.color ?? '#000',
          borderColor: userWithColor?.color ?? '#000'
        }
      ]
    };
  });
  return chart;
};
