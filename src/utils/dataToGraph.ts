import { DataObject } from './../api/types';
import { ChartData } from '../components/dataView/graph';
import { getDateMinusDays, getDaysBetween } from './date';
import { User } from '../api/types';

// TODO: Could probably change to a >== b
const datesAreEqual = (a: Date, b: Date): boolean =>
  a.getDate() === b.getDate() &&
  a.getMonth() === b.getMonth() &&
  a.getFullYear() === b.getFullYear();

/**
 * Method for getting a list of labels to display in chart
 *
 * @param since start date
 * @param until end date
 * @returns list of week day strings
 */
const getChartLabels = (since: Date, until: Date): string[] => {
  let day: Date = new Date(since);

  const labels = [];
  const DAY_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const getDayOfWeek = (d: Date) => DAY_OF_WEEK[d.getDay()];

  while (!datesAreEqual(day, until)) {
    labels.push(getDayOfWeek(day));
    // Why
    day.setDate(day.getDate() + 1);
  }

  labels.push(getDayOfWeek(day));
  return labels;
};

const produceChartDataFromDataObject = (
  data: DataObject[],
  since: Date,
  until: Date
): [{ [name: string]: number[] }, string[], string[], number] => {
  const objectsByUserAtDate: {
    [name: string]: number[];
  } = {};

  let earliestDay = getDaysBetween(since, until);
  let numberOfDays = earliestDay + 1;

  const userNames: string[] = [];

  data.forEach((dataObject: DataObject) => {
    const day = getDaysBetween(since, dataObject.date);

    if (day < earliestDay) {
      earliestDay = day;
    }
    if (dataObject.user.id in objectsByUserAtDate) {
      objectsByUserAtDate[dataObject.user.id][day] += 1;
    } else {
      userNames.push(dataObject.user.id);
      objectsByUserAtDate[dataObject.user.id] = Array(numberOfDays).fill(0);
      objectsByUserAtDate[dataObject.user.id][day] = 1;
    }
  });

  const firstDate = new Date(since);
  const labels: string[] = getChartLabels(
    getDateMinusDays(firstDate, -earliestDay),
    until
  );

  return [objectsByUserAtDate, userNames, labels, earliestDay];
};

export const produceCumulativeGraphChartDataFromDataObjects = (
  data: DataObject[],
  since: Date,
  until: Date,
  users: User[]
) => {
  const [objectsByUserAtDate, userNames, labels, earliestDay] =
    produceChartDataFromDataObject(data, since, until);

  let chart: ChartData = {
    chartType: 'line',
    labels: labels,
    datasets: []
  };
  userNames.forEach((userName) => {
    objectsByUserAtDate[userName] = objectsByUserAtDate[userName].map(
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
          data: objectsByUserAtDate[userName].slice(earliestDay),
          label: userWithColor?.alias ?? 'X',
          backgroundColor: userWithColor?.color ?? '#000',
          borderColor: userWithColor?.color ?? '#000'
        }
      ]
    };
  });
  return chart;
};

export const produceBarChartDataFromDataObjects = (
  data: DataObject[],
  since: Date,
  until: Date,
  users: User[]
) => {
  const [objectsByUserAtDate, userNames, labels, earliestDay] =
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
          data: objectsByUserAtDate[userName].slice(earliestDay),
          label: userWithColor?.alias ?? 'X',
          backgroundColor: userWithColor?.color ?? '#000'
        }
      ]
    };
  });
  return chart;
};
