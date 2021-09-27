import { ReactChild, useEffect, useState } from 'react';
import { User } from '../api/types';
import { FilterContext } from './filter.context';
import {
  DataCategory,
  FilterObject,
  initialFilterObject,
  ListOrGraph
} from './filter.initialValue';

interface ContextProviderProps {
  children: ReactChild | ReactChild[];
}

export const FilterContextProvider = ({ children }: ContextProviderProps) => {
  const [state, setState] = useState<FilterObject>(initialFilterObject);

  const updateLocalStorage = (state: FilterObject) => {
    localStorage.setItem('category-state', JSON.stringify(state.category));
  };

  const updateSessionStorage = (state: FilterObject) => {
    sessionStorage.setItem('time-span-state', JSON.stringify(state.timeSpan));
  };

  useEffect(() => {
    updateSessionStorage(state);
    updateLocalStorage(state);
  }, [state]);

  const setSinceDate = (date: Date) =>
    setState({ ...state, timeSpan: { ...state.timeSpan, since: date } });

  const setUntilDate = (date: Date) =>
    setState({ ...state, timeSpan: { ...state.timeSpan, until: date } });

  const setUsersState = (usersList: User[]) =>
    setState({ ...state, users: usersList });

  const setCategory = (category: DataCategory) =>
    setState({ ...state, category: category });

  const setListOrGraph = (listOrGraph: ListOrGraph) => {
    setState({ ...state, listOrGraph: listOrGraph });
  };
  const actions = {
    setSinceDate,
    setUntilDate,
    setUsersState,
    setCategory,
    setListOrGraph
  };

  return (
    <FilterContext.Provider value={{ state, ...actions }}>
      {children}
    </FilterContext.Provider>
  );
};
