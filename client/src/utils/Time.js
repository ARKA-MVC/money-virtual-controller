const DateDiffDaysFromToday = (date) => {
  const date2 = new Date(date);
  const date1 = new Date();
  const diffDays = Math.ceil((date2 - date1) / (1000 * 60 * 60 * 24));
  return diffDays;
};

const StringToDate = (string) => {
  const date = new Date(string);
  const newDate = `${date.getFullYear()}-${(date.getMonth() + 1)}-${date.getDate()}` 
  return newDate;
};

export { DateDiffDaysFromToday, StringToDate };
