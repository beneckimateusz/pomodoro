const getDateOnlyString = (date) => date.toISOString().substring(0, 10);

module.exports = { getDateOnlyString };
