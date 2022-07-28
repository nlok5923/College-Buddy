export const isLastDayOfMonth = (date = new Date()) => {
  const oneDayInMs = 1000 * 60 * 60 * 24;
  return new Date(date.getTime() + oneDayInMs).getDate() === 1;
};