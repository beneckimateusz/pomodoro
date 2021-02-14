export const TimePeriodId = {
  DAY: 0,
  WEEK: 1,
  MONTH: 2,
  YEAR: 3,
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

export const getTimePeriodRange = (timePeriodLabel) => {
  const startDate = new Date();
  const endDate = new Date();

  // eslint-disable-next-line default-case
  switch (timePeriodLabel) {
    case 'Day':
      break;
    case 'Week':
      startDate.setDate(endDate.getDate() - 6);
      break;
    case 'Month':
      startDate.setDate(endDate.getDate() - 30);
      break;
    case 'Year':
      startDate.setDate(endDate.getDate() - 365);
      break;
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
