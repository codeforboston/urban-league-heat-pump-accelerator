const dateTimeFormatter = Intl.DateTimeFormat(undefined, {
  dateStyle: "short",
  timeStyle: "short",
});

export const formatISODate = (isoDate) =>
  isoDate ? dateTimeFormatter.format(new Date(isoDate)) : "INVALID DATE";
