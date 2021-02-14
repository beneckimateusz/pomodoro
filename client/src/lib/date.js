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
  0: 'Day',
  1: 'Week',
  2: 'Month',
  3: 'Year',
};

export const getDateOnlyString = (date) => {
  date = date instanceof Date ? date.toISOString() : date;
  return date.substring(0, 10);
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
