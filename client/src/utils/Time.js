const DateDiffDaysFromToday = (date) => {
  const date2 = new Date(date);
  const date1 = new Date();
  const diffDays = Math.ceil((date2 - date1) / (1000 * 60 * 60 * 24));
  return diffDays;
};

export { DateDiffDaysFromToday };
