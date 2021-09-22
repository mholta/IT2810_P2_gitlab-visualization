import { rejects } from 'assert';
const b = [
  'zzN9Ms1GcC-mxfQKZbu_',
  'YYSpNGoLnbPKsQxZr6Rs',
  '8z2gZzaAC8mb1qLwgA2s',
  'UxjWaZ5gLHyQBGw_3_jx',
  'LJuzVUq5XJTK1P3i5V5A',
  'zKPYXxMgutMm5oXDf1sc'
];
const a = b[Math.floor(Math.random() * 6)];
const endpoint = 'https://gitlab.stud.idi.ntnu.no/api/v4/projects/11839/';
const header = {
  method: 'GET',
  headers: new Headers({
    Authorization: 'Bearer ' + a,
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
