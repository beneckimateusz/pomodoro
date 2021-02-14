const getDateOnlyString = (date) => date.toISOString().substring(0, 10);

const safeDivision = (a, b) => (b !== 0 ? a / b : 0);

module.exports = { getDateOnlyString, safeDivision };
