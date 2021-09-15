import {
  SET_TIME_SPAN_FROM,
  SET_TIME_SPAN_TO,
  SET_MENU_OPEN,
  SET_DATA_CATEGORY
} from './reducer.actionTypes';
import { DataViewType } from './types';

export const setTimespanFrom = (date: Date | null) => ({
  type: SET_TIME_SPAN_FROM,
  payload: { date }
});

export const setTimespanTo = (date: Date | null) => ({
  type: SET_TIME_SPAN_TO,
  payload: { date }
});

export const setMenuOpen = (open: boolean) => ({
  type: SET_MENU_OPEN,
  payload: { open }
});

export const setDataCategory = (category: DataViewType) => ({
  type: SET_DATA_CATEGORY,
  payload: { category }
});
