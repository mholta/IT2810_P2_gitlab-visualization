import { createContext, Dispatch } from 'react';
import { initialGlobalState } from './reducer';
import { GlobalStateObject } from './types';

interface GlobalStateContextProps {
  state: GlobalStateObject;
  dispatch: Dispatch<any>;
}

export const GlobalContext = createContext<GlobalStateContextProps>({
  state: initialGlobalState,
  dispatch: () => null
});

export default GlobalContext;
