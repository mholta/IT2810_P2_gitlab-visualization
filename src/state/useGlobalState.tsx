import { useReducer } from 'react';
import { initialGlobalState, reducer } from './reducer';

export const useGlobalState = () => {
  const [globalState, globalDispatch] = useReducer(reducer, initialGlobalState);

  return { state: globalState, dispatch: globalDispatch };
};
