import { getDateBeforeToday } from './../utils/date';
import {
  SET_DATA_CATEGORY,
  SET_MENU_OPEN,
  SET_TIME_SPAN_FROM,
  SET_TIME_SPAN_TO
} from './reducer.actionTypes';
import {
  DataViewType,
  FilterStateObject,
  GlobalStateObject,
  TimeSpanObject
} from './types';

const initialTimeSpan: TimeSpanObject = {
  from: getDateBeforeToday(14),
  to: getDateBeforeToday()
};

const initialFilterObject: FilterStateObject = {
  timeSpan: initialTimeSpan,
  category: DataViewType.COMMITS
};

export const initialGlobalState: GlobalStateObject = {
  filter: initialFilterObject,
  menuOpen: false
};

export const reducer = (
  state: GlobalStateObject = initialGlobalState,
  action: any
): GlobalStateObject => {
  switch (action.type) {
    case SET_TIME_SPAN_FROM:
      return {
        ...state,
        filter: {
          ...state.filter,
          timeSpan: { ...state.filter.timeSpan, from: action.payload.date }
        }
      };
    case SET_TIME_SPAN_TO:
      return {
        ...state,
        filter: {
          ...state.filter,
          timeSpan: { ...state.filter.timeSpan, to: action.payload.date }
        }
      };
    case SET_MENU_OPEN:
      return {
        ...state,
        menuOpen: action.payload.open
      };
    case SET_DATA_CATEGORY:
      return {
        ...state,
        filter: {
          ...state.filter,
          category: action.payload.category
        }
      };
    default:
      return state;
  }
};
