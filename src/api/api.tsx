import { rejects } from 'assert';

const endpoint = 'https://gitlab.stud.idi.ntnu.no/api/v4/projects/11839/';
const header = {
  method: 'GET',
  headers: new Headers({
    Authorization: 'Bearer zKPYXxMgutMm5oXDf1sc',
    'Content-Type': 'application/json'
  })
};

export const fetchCommits = (since: Date, until: Date) => {
  return new Promise<any>((resolve) => {
    fetch(
      endpoint +
        'repository/commits?' +
        new URLSearchParams({
          since: since.toISOString(),
          until: until.toISOString()
        }),
      header
    )
      .then((res) => res.json())
      .then((commits) => resolve(commits))
      .catch((err) => rejects(err));
  });
};

export const fetchIssues = (since: Date, until: Date) => {
  return new Promise<any>((resolve) => {
    fetch(
      endpoint +
        'issues?' +
        new URLSearchParams({
          since: since.toISOString(),
          until: until.toISOString()
        }),
      header
    )
      .then((res) => res.json())
      .then((commits) => resolve(commits))
      .catch((err) => rejects(err));
  });
};
