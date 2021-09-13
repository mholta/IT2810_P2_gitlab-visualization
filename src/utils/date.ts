export const dateToString = (date: Date): string => {
  const dd: string = String(date.getDate()).padStart(2, '0');
  const MM: string = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy: string = String(date.getFullYear()).padStart(2, '0');

  return `${MM}/${dd}/${yyyy}`;
};

export const dateFromString = (dateString: string): Date => {
  const a = dateString.split('/').map((x) => parseInt(x));

  return new Date(a[2], a[0] - 1, a[1]);
};

export const getDateMinusDays = (date: Date, daysInPast: number): Date => {
  date.setDate(date.getDate() - daysInPast);
  return date;
};

export const getDateBeforeToday = (daysInPast?: number): Date => {
  if (!daysInPast) return new Date();
  return getDateMinusDays(new Date(), daysInPast);
};

/**
 * Returns formatted date string of date in the past.
 *
 * @param daysInPast
 * @returns date with format MM/dd/yyyy
 */
export const getDateString = (daysInPast?: number): string =>
  dateToString(getDateBeforeToday(daysInPast));

export const dateIsBefore = (date: Date, compareToDate: Date) =>
  date < compareToDate;

export const dateIsAfterToday = (date: Date) => dateIsBefore(date, new Date());
