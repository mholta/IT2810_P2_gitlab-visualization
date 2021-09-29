import { KeyboardDatePicker } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import styled from 'styled-components';

interface DatePickerProps {
  onChange: (date: MaterialUiPickersDate | null, value?: string | null) => void;
  value: Date | null;
  id: string;
  label: string;
}

/**
 * Calendar element for selecting dates.
 */
const DatePicker = ({ onChange, value, id, label }: DatePickerProps) => {
  return (
    <DatePickerWrapper>
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        format="dd/MM/yyyy"
        margin="normal"
        id={id}
        label={label}
        value={value}
        onChange={onChange}
        KeyboardButtonProps={{
          'aria-label': 'change date'
        }}
        disableFuture
      />
    </DatePickerWrapper>
  );
};

const DatePickerWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export default DatePicker;
