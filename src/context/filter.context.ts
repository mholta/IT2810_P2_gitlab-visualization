import { createContext } from 'react';
import { User } from '../api/types';
import {
  FilterObject,
  DataCategory,
  ListOrGraph,
  getInitialFilterObject
} from './filter.initialValue';

export const FilterContext = createContext<FilterContextState>({
  state: getInitialFilterObject(),
  setSinceDate: () => {},
  setUntilDate: () => {},
  setUsersState: () => {},
  setCategory: () => {},
  setListOrGraph: () => {},
  reset: () => {},
});

export interface FilterContextState {
  state: FilterObject;
  setSinceDate: (date: Date) => void;
  setUntilDate: (date: Date) => void;
  setUsersState: (userList: User[]) => void;
  setCategory: (category: DataCategory) => void;
  setListOrGraph: (listOrGraph: ListOrGraph) => void;
  reset: () => void;
}
