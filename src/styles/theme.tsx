import { createTheme } from '@material-ui/core/styles';

// Theme component for Material UI
// This is just overrides, the full theme object contains
// more styles

export const theme = createTheme({
  palette: {
    primary: {
      main: '#1a3a69'
    },
    secondary: {
      main: '#E69C34'
    },
    text: {
      primary: '#000',
      // primary: '#fef2f2',
      secondary: 'lightgrey'
    }
  },
  typography: {
    fontFamily: ['Source Sans Pro'].join(',')
  }
});

export default theme;
