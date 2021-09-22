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

export const fetchCommits = (
  since: Date,
  until: Date,
  data: any = [],
  page: string = '1'
) => {
  let pageNum: string | null;
  return new Promise<any>((resolve) => {
    fetch(
      endpoint +
        'repository/commits?' +
        new URLSearchParams({
          since: since.toISOString(),
          until: until.toISOString(),
          per_page: '100',
          page: page
        }),
      header
    )
      .then((res) => {
        pageNum = res.headers.get('x-next-page');
        console.log(pageNum);
        return res.json();
      })
      .then((commits) => {
        data = data.concat(commits);
        if (pageNum === null || pageNum === '') {
          return data;
        } else {
          // return data;
          return fetchCommits(since, until, data, pageNum);
          //         fetchCommits(since, until, data, pageNum);
        }
      })
      .then((commits) => resolve(commits))
      .catch((err) => rejects(err));
  });
};

export const fetchIssues = (
  since: Date,
  until: Date,
  data: any = [],
  page: string = '1'
) => {
  let pageNum: string | null;
  return new Promise<any>((resolve) => {
    fetch(
      endpoint +
        'issues?' +
        new URLSearchParams({
          since: since.toISOString(),
          until: until.toISOString(),
          per_page: '100',
          page: page
        }),
      header
    )
      .then((res) => {
        pageNum = res.headers.get('x-next-page');
        return res.json();
      })

      .then((issues) => {
        data = data.concat(issues);
        if (pageNum === null || pageNum === '') {
          return data;
        } else {
          return fetchIssues(since, until, data, pageNum);
        }
      })
      .then((issues) => resolve(issues))
      .catch((err) => rejects(err));
  });
};
