import React from 'react';
import './App.css';
import theme from './styles/theme';
import MainPage from './pages/mainPage';
import { ThemeProvider, StylesProvider } from '@material-ui/core';
import { FilterContextProvider } from './context/filter.provider';
import { LayoutContextProvider } from './context/layout.provider';

function App() {
  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <LayoutContextProvider>
          <FilterContextProvider>
            <MainPage />
          </FilterContextProvider>
        </LayoutContextProvider>
      </ThemeProvider>
    </StylesProvider>
  );
}

export default App;
