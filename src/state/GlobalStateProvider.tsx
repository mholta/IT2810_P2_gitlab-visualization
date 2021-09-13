import React from 'react';
import Context from './context';
import { useGlobalState } from './useGlobalState';

interface GlobalStateProviderProps {
  children: React.ReactChild | React.ReactChild[];
}

const GlobalStateProvider = ({ children }: GlobalStateProviderProps) => {
  return (
    <Context.Provider value={useGlobalState()}>{children}</Context.Provider>
  );
};

export default GlobalStateProvider;
