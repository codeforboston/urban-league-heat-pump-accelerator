const dateTimeFormatter = Intl.DateTimeFormat();

export const formatISODate = (isoDate) =>
  isoDate ? dateTimeFormatter.format(new Date(isoDate)) : "INVALID DATE";
