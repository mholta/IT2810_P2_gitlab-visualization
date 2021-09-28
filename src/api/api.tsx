let endpoint = '';
let endpointToken = '';
let header: any;

/**
 * Updates endpoint with user specified ProjectID.
 */
const updateEndpoint = () => {
  const projectIdLocal = localStorage.getItem('projectID');
  const tokenLocal = localStorage.getItem('token');
  const projectIdSession = sessionStorage.getItem('projectID');
  const tokenSession = sessionStorage.getItem('token');

  if (projectIdLocal) {
    endpoint = projectIdLocal;
  } else if (projectIdSession) {
    endpoint = projectIdSession;
  }

  if (tokenLocal) {
    endpointToken = tokenLocal;
  } else if (tokenSession) {
    endpointToken = tokenSession;
  }

  header = {
    method: 'GET',
    headers: new Headers({
      Authorization: 'Bearer ' + endpointToken,
      'Content-Type': 'application/json'
    })
  };
};

/**
 * Fetch commits from GitLab with supplied filters.
 */
export const fetchCommits = (
  since: Date,
  until: Date,
  data: any = [],
  page: string = '1'
) => {
  let pageNum: string | null;
  updateEndpoint();

  return new Promise<any>((resolve, reject) => {
    fetch(
      'https://gitlab.stud.idi.ntnu.no/api/v4/projects/' +
        endpoint +
        '/repository/commits?' +
        new URLSearchParams({
          since: since.toISOString(),
          until: until.toISOString(),
          per_page: '100',
          page: page
        }),
      header
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error('Wrong token or project ID');
        }

        pageNum = res.headers.get('x-next-page');
        return res.json();
      })
      .then((commits) => {
        data = data.concat(commits);

        // Recursively fetch more commits if we are not on the last page
        if (pageNum === null || pageNum === '') {
          return data;
        } else {
          return fetchCommits(since, until, data, pageNum);
        }
      })
      .then((commits) => resolve(commits))
      .catch((err) => {
        return reject(err);
      });
  });
};

/**
 * Fetch issues from GitLab with supplied filters.
 */
export const fetchIssues = (
  since: Date,
  until: Date,
  data: any = [],
  page: string = '1'
) => {
  let pageNum: string | null;
  updateEndpoint();

  return new Promise<any>((resolve, reject) => {
    fetch(
      'https://gitlab.stud.idi.ntnu.no/api/v4/projects/' +
        endpoint +
        '/issues?' +
        new URLSearchParams({
          created_after: since.toISOString(),
          created_before: until.toISOString(),
          per_page: '100',
          page: page
        }),
      header
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error('Wrong token or project ID');
        }

        pageNum = res.headers.get('x-next-page');
        return res.json();
      })
      .then((issues) => {
        data = data.concat(issues);

        // Recursively fetch more issues if we are not on the last page
        if (pageNum === null || pageNum === '') {
          return data;
        } else {
          return fetchIssues(since, until, data, pageNum);
        }
      })
      .then((issues) => resolve(issues))
      .catch((err) => reject(err));
  });
};
