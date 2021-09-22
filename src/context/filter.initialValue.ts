import { User } from '../api/useApi';
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



export type UsersState = User[];

export interface FilterObject {
  timeSpan: TimeSpanObject;
  category: DataCategory;
  users: UsersState;
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
  listOrGraph: ListOrGraph.LIST,

};
