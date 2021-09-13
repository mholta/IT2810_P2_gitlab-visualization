import { SET_TIME_SPAN_FROM, SET_TIME_SPAN_TO } from './reducer.actionTypes';

export const setTimespanFrom = (date: Date | null) => ({
  type: SET_TIME_SPAN_FROM,
  payload: { date }
});

export const setTimespanTo = (date: Date | null) => ({
  type: SET_TIME_SPAN_TO,
  payload: { date }
});
