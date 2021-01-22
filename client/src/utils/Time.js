const DateDiffDaysFromToday = (date) => {
  const date2 = new Date(date);
  const date1 = new Date();
  const diffDays = Math.ceil((date2 - date1) / (1000 * 60 * 60 * 24));
  return diffDays;
};

const StringToDate = (string) => {
  const date = new Date(string);
  const month =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : "" + (date.getMonth() + 1);
  const day =
    date.getDate() < 10
      ? "0" + (date.getDate())
      : "" + (date.getDate());
  const newDate = `${date.getFullYear()}-${month}-${day}`;
  return newDate;
};

export { DateDiffDaysFromToday, StringToDate };
