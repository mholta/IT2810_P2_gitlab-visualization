import React from 'react';
import './App.css';
import theme from './styles/theme';
import MainPage from './pages/mainPage';
import { ThemeProvider, StylesProvider } from '@material-ui/core';
import GlobalStateProvider from './state/GlobalStateProvider';

function App() {
  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <GlobalStateProvider>
          <MainPage />
        </GlobalStateProvider>
      </ThemeProvider>
    </StylesProvider>
  );
}

export default App;
