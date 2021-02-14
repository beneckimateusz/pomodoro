export const TimePeriodId = {
  DAY: 0,
  WEEK: 1,
  MONTH: 2,
  YEAR: 3,
};

export const TimePeriodLength = {
  0: 1,
  1: 7,
  2: 31,
  3: 365,
};

export const TimePeriodLabel = {
  0: 'Today',
  1: 'Last 7 days',
  2: 'Last 31 days',
  3: 'This year',
};

export const Month = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December',
};

export const getDateOnlyString = (date) => {
  date = date instanceof Date ? date.toISOString() : date;
  return date.substring(0, 10);
};

export const getTimeOnlyString = (date) => {
  date = date instanceof Date ? date.toISOString() : date;
  return date.substring(11, 16);
};

export const getTimePeriodRange = (timePeriodId) => {
  const startDate = new Date();
  const endDate = new Date();

  if (timePeriodId !== TimePeriodId.DAY) {
    startDate.setDate(endDate.getDate() - TimePeriodLength[timePeriodId]);
  }

  /**
   * Backend will be matching for datetimes earlier than the next day
   * with 00:00:00 timestamp
   */
  endDate.setDate(endDate.getDate() + 1);

  return {
    startDate: getDateOnlyString(startDate),
    endDate: getDateOnlyString(endDate),
  };
};

export const getCurrentYear = () =>
  Number(new Date().toISOString().substring(0, 4));

export const getCurrentDate = () => getDateOnlyString(new Date());
