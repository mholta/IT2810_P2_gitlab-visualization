/**
 * Get a date a number of days before supplied date
 * @param date 
 * @param daysInPast number of days before
 * @returns new date
 */
export const getDateMinusDays = (date: Date, daysInPast: number): Date => {
  date.setDate(date.getDate() - daysInPast);
  return date;
};

/**
 * Get number of days between two dates
 * @param dateFrom 
 * @param dateTo 
 * @returns number of days
 */
export const getDaysBetween = (dateFrom: Date, dateTo: Date): number => {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  const utc1 = Date.UTC(dateFrom.getFullYear(), dateFrom.getMonth(), dateFrom.getDate());
  const utc2 = Date.UTC(dateTo.getFullYear(), dateTo.getMonth(), dateTo.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

/**
 * Get date a number of days before current date
 * @param daysInPast 
 * @returns new date
 */
export const getDateBeforeToday = (daysInPast?: number): Date => {
  if (!daysInPast) return new Date();
  return getDateMinusDays(new Date(), daysInPast);
};
