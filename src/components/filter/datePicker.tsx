import { IconButton } from '@material-ui/core';
import { Cancel } from '@material-ui/icons';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import styled from 'styled-components';

interface DatePickerProps {
  onChange: (date: MaterialUiPickersDate | null, value?: string | null) => void;
  value: Date | null;
  id: string;
  label: string;
  enableClearButton?: boolean;
}

const DatePicker = ({
  onChange,
  value,
  id,
  label,
  enableClearButton
}: DatePickerProps) => {
  // Remove date by setting value to null
  const handleClear = () => onChange(null);

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
      {enableClearButton && (
        <ClearButtonWrapper>
          <IconButton onClick={handleClear}>
            <Cancel />
          </IconButton>
        </ClearButtonWrapper>
      )}
    </DatePickerWrapper>
  );
};

const DatePickerWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ClearButtonWrapper = styled.div`
  margin-top: 1.3rem;
`;

export default DatePicker;
