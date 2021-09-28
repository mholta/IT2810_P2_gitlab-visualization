import { User } from '../api/types';

/**
 * Discovers new users.
 */
export const checkNewUsers = (list: string[], users: User[]) => {
  list
  .filter((v: string, i: number, a: string[]) => a.indexOf(v) === i) // Kopiert fra https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
  .forEach((name: string) => {
    if (users.map((u) => u.id).indexOf(name) === -1) {
      const newUser: User = {
        alias: localStorage.getItem('anonymize') === 'true' || sessionStorage.getItem('anonymize') === 'true' ?'User ' + (users.length + 1): name,
        id: name,
        show: true,
        color: '#' + Math.random().toString(16).substr(-6)
      };
      users.push(newUser);
    }
  });
  return list;
};
