import { ReactChild, useState } from 'react';
import { LayoutContext } from './layout.context';
import { initialLayoutObject, LayoutObject } from './layout.initialValue';

interface ContextProviderProps {
  children: ReactChild | ReactChild[];
}

export const LayoutContextProvider = ({ children }: ContextProviderProps) => {
  const [state, setState] = useState<LayoutObject>(initialLayoutObject);

  const setMenuOpen = (open: boolean) => setState({ ...state, menuOpen: open });

  const actions = {
    setMenuOpen
  };

  return (
    <LayoutContext.Provider value={{ state, ...actions }}>
      {children}
    </LayoutContext.Provider>
  );
};
