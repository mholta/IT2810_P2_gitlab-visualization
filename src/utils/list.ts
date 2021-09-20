export const getUniqueUsers = (list: any[]): any[] => {
  const newUsers: any = {};
  let currentUserNum: number = 1;
  list
    .filter((v: any, i: number, a: any) => a && a.indexOf(v) === i) // Kopiert fra https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
    .forEach((e: any) => {
      if (e && !(e in list)) {
        newUsers[e] = {
          name: 'User ' + currentUserNum,
          show: true
        };
        currentUserNum++;
      }
    });
  return list;
};
