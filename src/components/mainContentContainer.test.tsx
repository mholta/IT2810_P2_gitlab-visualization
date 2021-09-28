import ReactDOM from 'react-dom';
import apiSwitch, { LoadingState } from '../api/useApi';
import '@testing-library/jest-dom/extend-expect';
import MainContentContainer from './mainContentContainer';
import { FilterContext } from '../context/filter.context';
import {
  initialFilterObject,
  ListOrGraph
} from '../context/filter.initialValue';
import { User } from '../api/types';

jest.mock('../api/useApi');

const mockUseAPI = apiSwitch as jest.Mock<any>;
// https://klzns.github.io/how-to-use-type-script-and-jest-mocks
const users: User[] = [
  { alias: 'User 1', id: 'Test 1', show: true, color: '#4d56e2' },
  { alias: 'User 2', id: 'Test 2', show: true, color: '#3a730e' },
  { alias: 'User 3', id: 'Test 3', show: true, color: '#0f7292' }
];

const commits = [
  {
    id: 'ed899a2f4b50b4370feeea94676502b42383c746',
    short_id: 'ed899a2f4b5',
    title: 'Replace sanitize with escape once',
    author_name: 'Example User',
    author_email: 'user@example.com',
    authored_date: '2012-09-20T11:50:22+03:00',
    committer_name: 'Administrator',
    committer_email: 'admin@example.com',
    committed_date: '2012-09-20T11:50:22+03:00',
    created_at: '2012-09-20T11:50:22+03:00',
    message: 'Replace sanitize with escape once',
    parent_ids: ['6104942438c14ec7bd21c6cd5bd995272b3faff6'],
    web_url:
      'https://gitlab.example.com/thedude/gitlab-foss/-/commit/ed899a2f4b50b4370feeea94676502b42383c746'
  },
  {
    id: '6104942438c14ec7bd21c6cd5bd995272b3faff6',
    short_id: '6104942438c',
    title: 'Sanitize for network graph',
    author_name: 'randx',
    author_email: 'user@example.com',
    committer_name: 'ExampleName',
    committer_email: 'user@example.com',
    committed_date: '2012-09-21T11:50:22+03:00',
    created_at: '2012-09-20T09:06:12+03:00',
    message: 'Sanitize for network graph',
    parent_ids: ['ae1d9fb46aa2b07ee9836d49862ec4e2c46fbbba'],
    web_url:
      'https://gitlab.example.com/thedude/gitlab-foss/-/commit/ed899a2f4b50b4370feeea94676502b42383c746'
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
          setUsersState: () => {}
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
