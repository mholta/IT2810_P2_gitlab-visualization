import './App.css';
import theme from './styles/theme';
import MainPage from './pages/mainPage';
import { ThemeProvider, StylesProvider } from '@material-ui/core';
import { FilterContextProvider } from './context/filter.provider';
import { LayoutContextProvider } from './context/layout.provider';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './pages/login';

function App() {
  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <LayoutContextProvider>
          <FilterContextProvider>
            <Router>
              <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/" component={MainPage} />
              </Switch>
            </Router>
          </FilterContextProvider>
        </LayoutContextProvider>
      </ThemeProvider>
    </StylesProvider>
  );
}

export default App;
