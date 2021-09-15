import React, { useReducer } from 'react';
import { GlobalContext } from './context';
import { initialGlobalState, reducer } from './reducer';

interface GlobalStateProviderProps {
  children: React.ReactChild | React.ReactChild[];
}

const GlobalStateProvider = ({ children }: GlobalStateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialGlobalState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalStateProvider;
