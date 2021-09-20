import { ReactChild, useState } from 'react';
import { FilterContext } from './filter.context';
import {
  DataCategory,
  FilterObject,
  initialFilterObject,
  UsersState
} from './filter.initialValue';

interface ContextProviderProps {
  children: ReactChild | ReactChild[];
}

export const FilterContextProvider = ({ children }: ContextProviderProps) => {
  const [state, setState] = useState<FilterObject>(initialFilterObject);

  const setSinceDate = (date: Date) =>
    setState({ ...state, timeSpan: { ...state.timeSpan, since: date } });

  const setUntilDate = (date: Date) =>
    setState({ ...state, timeSpan: { ...state.timeSpan, until: date } });

  const setUsersState = (usersList: UsersState) =>
    setState({ ...state, users: usersList });

  const setCategory = (category: DataCategory) =>
    setState({ ...state, category: category });

  const actions = {
    setSinceDate,
    setUntilDate,
    setUsersState,
    setCategory
  };

  return (
    <FilterContext.Provider value={{ state, ...actions }}>
      {children}
    </FilterContext.Provider>
  );
};
