export enum DataViewType {
  COMMITS = 'Commits',
  ISSUES = 'Issues'
}

export interface TimeSpanObject {
  from: Date | null;
  to: Date | null;
}

export interface FilterStateObject {
  timeSpan: TimeSpanObject;
  category: DataViewType;
}

export interface GlobalStateObject {
  filter: FilterStateObject;
  menuOpen: boolean;
}
