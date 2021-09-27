import { User } from '../api/types';
import { getDateBeforeToday } from '../utils/date';

export enum DataCategory {
  COMMITS = 'COMMITS',
  ISSUES = 'ISSUES'
}
export enum ListOrGraph {
  LIST = 'List',
  GRAPH = 'Graph'
}
export interface TimeSpanObject {
  since: Date;
  until: Date;
}

export interface FilterObject {
  timeSpan: TimeSpanObject;
  category: DataCategory;
  users: User[];
  listOrGraph: ListOrGraph;
}

const initialTimeSpan: TimeSpanObject = {
  since: getDateBeforeToday(14),
  until: getDateBeforeToday()
};

export const initialFilterObject: FilterObject = {
  timeSpan: initialTimeSpan,
  category: DataCategory.COMMITS,
  users: [],
  listOrGraph: ListOrGraph.LIST
};

export const getInitialFilterObject = (): FilterObject => {
  const filterObject: FilterObject = initialFilterObject;

  const timeSpan: TimeSpanObject | undefined = getTimeSpanFromSessionStorage();
  if (timeSpan) filterObject.timeSpan = timeSpan;

  const category: DataCategory | undefined = getCategoryFromLocalStorage();
  if (category) filterObject.category = category;

  return filterObject;
};

const getTimeSpanFromSessionStorage = (): TimeSpanObject | undefined => {
  const sessionStorageTimeSpanState = sessionStorage.getItem('time-span-state');

  if (!sessionStorageTimeSpanState) return;

  try {
    const newTimeSpanState: TimeSpanObject = JSON.parse(
      sessionStorageTimeSpanState
    );

    const timeSpan: TimeSpanObject = {
      since: new Date(/* newTimeSpanState.since */),
      until: new Date(newTimeSpanState.until)
    };

    return timeSpan;
  } catch (e) {
    console.error('Could not fetch filter settings from session storage.');
    return;
  }
};

const getCategoryFromLocalStorage = (): DataCategory | undefined => {
  const localStorageCategoryState = localStorage.getItem('category-state');
  if (!localStorageCategoryState) return;

  try {
    const newCategory: DataCategory =
      DataCategory[
        JSON.parse(localStorageCategoryState) as keyof typeof DataCategory
      ];

    return newCategory;
  } catch (e) {
    console.error('Could not fetch filter settings from session storage.');
    return;
  }
};
