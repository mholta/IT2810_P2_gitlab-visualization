import React from 'react';
import './App.css';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import MainPage from './pages/mainPage';
import { MuiThemeProvider } from '@material-ui/core';

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        {/* Put context here */}
        <MainPage />
      </ThemeProvider>
    </MuiThemeProvider>
  );
}

export default App;
