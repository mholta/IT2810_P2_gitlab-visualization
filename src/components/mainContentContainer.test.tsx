import ReactDOM from 'react-dom';
import apiSwitch, { LoadingState } from '../api/useApi';
import '@testing-library/jest-dom/extend-expect';
import MainContentContainer from './mainContentContainer';
import { FilterContext } from '../context/filter.context';
import {
  initialFilterObject,
  ListOrGraph
} from '../context/filter.initialValue';
import { DataObject, User } from '../api/types';

jest.mock('../api/useApi');

const mockUseAPI = apiSwitch as jest.Mock<any>;
// https://klzns.github.io/how-to-use-type-script-and-jest-mocks
const users: User[] = [
  { alias: 'User 1', id: 'Test 1', show: true, color: '#4d56e2' },
  { alias: 'User 2', id: 'Test 2', show: true, color: '#3a730e' },
  { alias: 'User 3', id: 'Test 3', show: true, color: '#0f7292' }
];

const commits: DataObject[] = [
  {
    title: 'Replace sanitize with escape once',
    user: {
      alias: 'Example User',
      id: 'Example User',
      show: true,
      color: '#000fff'
    },
    date: new Date('2012-09-20T11:50:22+03:00')
  },
  {
    title: 'Make this a test',
    user: {
      alias: 'Example User 2 ',
      id: 'Example User 2',
      show: true,
      color: '#ffffff'
    },
    date: new Date('2012-09-19T11:50:22+03:00')
  }
];

let loadingState: LoadingState, container: HTMLDivElement, data: any;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
});

describe('mainContentContainer renders correctly', () => {
  test('List of commits is shown', () => {
    // Tests if it shows list and not graph
    loadingState = LoadingState.LOADED;
    data = commits;

    mockUseAPI.mockImplementation(() => {
      return {
        data,
        users,
        loadingState
      };
    });

    ReactDOM.render(<MainContentContainer />, container);
    const graph = container.querySelector('#graph');
    expect(graph).not.toBeInTheDocument();
    const commitList = container.querySelector('#listOfCommits');
    expect(commitList).toBeInTheDocument();
  });

  test('Graph of commits is shown', () => {
    // Tests if it shows graph and not list
    loadingState = LoadingState.LOADED;
    data = commits;

    mockUseAPI.mockImplementation(() => {
      return {
        data,
        users,
        loadingState
      };
    });

    const state = initialFilterObject;
    state.listOrGraph = ListOrGraph.GRAPH;

    ReactDOM.render(
      // To be able to decide initial state of context
      <FilterContext.Provider
        value={{
          state,
          setCategory: () => {},
          setListOrGraph: () => {},
          setSinceDate: () => {},
          setUntilDate: () => {},
          setUsersState: () => {},
          reset: () => {}
        }}
      >
        <MainContentContainer />
      </FilterContext.Provider>,
      container
    );

    const graph = container.querySelector('#graph');
    expect(graph).toBeInTheDocument();
    const commitList = container.querySelector('#listOfCommits');
    expect(commitList).not.toBeInTheDocument();
  });
});
