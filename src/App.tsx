import React from 'react';
import './App.css';
import theme from './styles/theme';
import MainPage from './pages/mainPage';
import { ThemeProvider, StylesProvider } from '@material-ui/core';

function App() {
  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        {/* Put context here */}
        <MainPage />
      </ThemeProvider>
    </StylesProvider>
  );
}

export default App;
