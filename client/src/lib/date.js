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

const getDateOnlyString = (date) => date.toISOString().substring(0, 10);

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

  return {
    startDate: getDateOnlyString(startDate),
    endDate: getDateOnlyString(endDate),
  };
};
