import React from 'react';
import GlobalContext from './context';

export const useGlobalState = () => React.useContext(GlobalContext);
