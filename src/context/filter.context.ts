import { createContext } from 'react';
import {
  FilterObject,
  initialFilterObject,
  UsersState,
  DataCategory
} from './filter.initialValue';

export const FilterContext = createContext<FilterContextState>({
  state: initialFilterObject,
  setSinceDate: () => {},
  setUntilDate: () => {},
  setUsersState: () => {},
  setCategory: () => {}
});

export interface FilterContextState {
  state: FilterObject;
  setSinceDate: (date: Date) => void;
  setUntilDate: (date: Date) => void;
  setUsersState: (userList: UsersState) => void;
  setCategory: (category: DataCategory) => void;
}
