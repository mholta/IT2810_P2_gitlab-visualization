import React, { useContext } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import styled from 'styled-components';
import { getDateMinusDays } from '../../utils/date';
import DatePicker from '../../components/filter/datePicker';
import { FilterContext } from '../../context/filter.context';

/**
 * Chooses since and until dates with date pickers.
 */
const TimeSpan = () => {
  const {
    state: {
      timeSpan: { since, until }
    },
    setSinceDate,
    setUntilDate
  } = useContext(FilterContext);

  // Updates filter context with new since date
  const setFromDate = (date: Date | null) => {
    if (!date) return;

    setSinceDate(date);

    // Update until date if it is before the new since date
    if (date > until) setUntilDate(getDateMinusDays(new Date(date), -1));
  };

  // Updates filter context with new until date
  const setToDate = (date: Date | null) => {
    if (!date) return;

    setUntilDate(date);

    // Update since date if it is after the new until date
    if (date < since) setSinceDate(getDateMinusDays(new Date(date), 1));
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      {since.toLocaleDateString()}
      <TimeSpanWrapper>
        <DatePicker
          id="date-picker-from"
          label="Fra"
          value={since}
          onChange={setFromDate}
          enableClearButton
        />
        <DatePicker
          id="date-picker-to"
          label="Til"
          value={until}
          onChange={setToDate}
        />
      </TimeSpanWrapper>
    </MuiPickersUtilsProvider>
  );
};

const TimeSpanWrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto; // to not get empty space after from picker
  gap: 2rem;
`;

export default TimeSpan;
