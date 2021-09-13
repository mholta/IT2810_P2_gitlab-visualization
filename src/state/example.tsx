import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import styled from 'styled-components';
import { getDateMinusDays } from '../utils/date';
import { setTimespanFrom, setTimespanTo } from './reducer.actions';
import { useGlobalState } from './useGlobalState';
import DatePicker from '../components/filter/datePicker';

const ContextExample = () => {
  const { state, dispatch } = useGlobalState();

  const setFromDate = (date: Date | null) => {
    if (date && state.timeSpan.to && date > state.timeSpan.to) {
      dispatch(setTimespanTo(getDateMinusDays(new Date(date), -1)));
    }

    dispatch(setTimespanFrom(date));
  };

  const setToDate = (date: Date | null) => {
    if (date && state.timeSpan.from && date < state.timeSpan.from) {
      dispatch(setTimespanFrom(getDateMinusDays(new Date(date), 1)));
    }

    dispatch(setTimespanTo(date));
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      From: {state.timeSpan.from?.toLocaleDateString()}
      <br />
      To: {state.timeSpan.to?.toLocaleDateString()}
      <ContextExampleWrapper>
        <DatePicker
          id="date-picker-from"
          label="Fra"
          value={state.timeSpan.from}
          onChange={setFromDate}
          enableClearButton
        />
        <DatePicker
          id="date-picker-to"
          label="Til"
          value={state.timeSpan.to}
          onChange={setToDate}
        />
      </ContextExampleWrapper>
    </MuiPickersUtilsProvider>
  );
};

const ContextExampleWrapper = styled.div`
  padding: 4rem;
  display: flex;
  justify-content: center;

  & > * {
    margin: 0 2rem;
  }
`;

export default ContextExample;
