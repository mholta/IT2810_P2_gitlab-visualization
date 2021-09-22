import { ReactChild, useEffect, useState } from 'react';
import { FilterContext } from './filter.context';
import {
  DataCategory,
  FilterObject,
  initialFilterObject,
  TimeSpanObject,
  UsersState,
  ListOrGraph
} from './filter.initialValue';

interface ContextProviderProps {
  children: ReactChild | ReactChild[];
}

export const FilterContextProvider = ({ children }: ContextProviderProps) => {
  const [state, setState] = useState<FilterObject>(initialFilterObject);

  const setTimeSpanFromSessionStorage = () => {
    const sessionStorageTimeSpanState = sessionStorage.getItem(
      'time-span-state'
    );
    if (!sessionStorageTimeSpanState) return;

    try {
      const newTimeSpanState: TimeSpanObject = JSON.parse(
        sessionStorageTimeSpanState
      );

      setState({
        ...state,
        timeSpan: {
          ...state.timeSpan,
          since: new Date(newTimeSpanState.since),
          until: new Date(newTimeSpanState.until)
        }
      });
    } catch (e) {
      console.error('Could not fetch filter settings from session storage.');
    }
  };

  const setCategoryFromLocalStorage = () => {
    const sessionStorageTimeSpanState = localStorage.getItem('category-state');
    if (!sessionStorageTimeSpanState) return;
    console.log(sessionStorageTimeSpanState);

    try {
      const newCategory: DataCategory =
        DataCategory[
          JSON.parse(sessionStorageTimeSpanState) as keyof typeof DataCategory
        ];

      setState({
        ...state,
        category: newCategory
      });
    } catch (e) {
      console.error('Could not fetch filter settings from session storage.');
    }
  };

  const updateLocalStorage = (state: FilterObject) => {
    localStorage.setItem('category-state', JSON.stringify(state.category));
  };

  const updateSessionStorage = (state: FilterObject) => {
    sessionStorage.setItem('time-span-state', JSON.stringify(state.timeSpan));
  };

  useEffect(() => {
    setTimeSpanFromSessionStorage();
    setCategoryFromLocalStorage();
  }, []);

  useEffect(() => {
    updateSessionStorage(state);
    updateLocalStorage(state);
  }, [state]);

  const setSinceDate = (date: Date) =>
    setState({ ...state, timeSpan: { ...state.timeSpan, since: date } });

  const setUntilDate = (date: Date) =>
    setState({ ...state, timeSpan: { ...state.timeSpan, until: date } });

  const setUsersState = (usersList: UsersState) =>
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
