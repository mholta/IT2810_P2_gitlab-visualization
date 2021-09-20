import { getDateBeforeToday } from '../utils/date';

export enum DataCategory {
  COMMITS = 'Commits',
  ISSUES = 'Issues'
}

export interface TimeSpanObject {
  since: Date;
  until: Date;
}

interface User {
  name: string;
  show: boolean;
}

export type UsersState = User[];

export interface FilterObject {
  timeSpan: TimeSpanObject;
  category: DataCategory;
  users: UsersState;
}

const initialTimeSpan: TimeSpanObject = {
  since: getDateBeforeToday(14),
  until: getDateBeforeToday()
};

export const initialFilterObject: FilterObject = {
  timeSpan: initialTimeSpan,
  category: DataCategory.COMMITS,
  users: []
};
