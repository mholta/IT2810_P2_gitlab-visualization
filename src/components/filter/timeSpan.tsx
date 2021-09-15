import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import styled from 'styled-components';
import { getDateMinusDays } from '../../utils/date';
import { setTimespanFrom, setTimespanTo } from '../../state/reducer.actions';
import { useGlobalState } from '../../state/useGlobalState';
import DatePicker from '../../components/filter/datePicker';

const TimeSpan = () => {
  const { state, dispatch } = useGlobalState();

  const setFromDate = (date: Date | null) => {
    if (date && state.filter.timeSpan.to && date > state.filter.timeSpan.to) {
      dispatch(setTimespanTo(getDateMinusDays(new Date(date), -1)));
    }

    dispatch(setTimespanFrom(date));
  };

  const setToDate = (date: Date | null) => {
    if (
      date &&
      state.filter.timeSpan.from &&
      date < state.filter.timeSpan.from
    ) {
      dispatch(setTimespanFrom(getDateMinusDays(new Date(date), 1)));
    }

    dispatch(setTimespanTo(date));
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      {state.filter.timeSpan.from?.toLocaleDateString()}
      <TimeSpanWrapper>
        <DatePicker
          id="date-picker-from"
          label="Fra"
          value={state.filter.timeSpan.from}
          onChange={setFromDate}
          enableClearButton
        />
        <DatePicker
          id="date-picker-to"
          label="Til"
          value={state.filter.timeSpan.to}
          onChange={setToDate}
        />
      </TimeSpanWrapper>
    </MuiPickersUtilsProvider>
  );
};

const TimeSpanWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
`;

export default TimeSpan;
