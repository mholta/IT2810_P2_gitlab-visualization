import { createContext } from 'react';
import { initialLayoutObject, LayoutObject } from './layout.initialValue';

export const LayoutContext = createContext<LayoutContextState>({
  state: initialLayoutObject,
  setMenuOpen: () => {}
});

export interface LayoutContextState {
  state: LayoutObject;
  setMenuOpen: (open: boolean) => void;
}
