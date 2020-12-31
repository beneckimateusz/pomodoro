export const capitalize = (s) => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

/**
 * Converts milliseconds to a human-friendly string.
 */
export const millisecondsToClockFormat = (milliseconds) => {
  if (!Number.isFinite(milliseconds)) {
    throw new Error(
      `Invalid milliseconds, expected positive number, got ${milliseconds}.`
    );
  }

  return new Date(milliseconds)
    .toISOString()
    .substr(11, 8)
    .replace(/00:(\d+):(\d+)/, '$1:$2');
};
