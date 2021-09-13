import { getDateBeforeToday } from './../utils/date';
import { SET_TIME_SPAN_FROM, SET_TIME_SPAN_TO } from './reducer.actionTypes';

export interface TimeSpanObject {
  from: Date | null;
  to: Date | null;
}

const initialTimeSpan: TimeSpanObject = {
  from: getDateBeforeToday(14),
  to: getDateBeforeToday()
};

export interface GlobalStateObject {
  timeSpan: TimeSpanObject;
}

export const initialGlobalState: GlobalStateObject = {
  timeSpan: initialTimeSpan
};

export const reducer = (
  state: GlobalStateObject = initialGlobalState,
  action: any
): GlobalStateObject => {
  switch (action.type) {
    case SET_TIME_SPAN_FROM:
      return {
        ...state,
        timeSpan: { ...state.timeSpan, from: action.payload.date }
      };
    case SET_TIME_SPAN_TO:
      return {
        ...state,
        timeSpan: { ...state.timeSpan, to: action.payload.date }
      };
    default:
      return state;
  }
};
