import React from 'react';
import './App.css';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import MainPage from './pages/mainPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* Put context here */}
      <MainPage />
    </ThemeProvider>
  );
}

export default App;
