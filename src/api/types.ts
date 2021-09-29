export interface DataObject {
  user: User;
  date: Date;
  title: string;
}
export interface User {
  alias: string;
  id: string;
  show: boolean;
  color: string;
}

export enum LoadingState {
  LOADING = 'loading',
  ERROR = 'error',
  LOADED = 'loaded'
}
