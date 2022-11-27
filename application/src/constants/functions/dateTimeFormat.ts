const options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  hour12: false,
  minute: "numeric",
  weekday: "long",
  timeZone: "Asia/Tokyo",
};

export const dateTimeFormatter_simple = (date: string) => {
  return new Date(date).toLocaleString()
}

export const dateTimeFormatter_noTime = (date: string) => {
  return new Date(date).toLocaleDateString("ja-JP")
}

export const dateTimeFormatter = (date: string) => {
  return new Date(date).toLocaleDateString("ja-JP", options)
}

export const dateTimeFormatterHyphen = (date: string) => {
  return new Date(date).toISOString().replace(/T/, ' ').substring(0, 10)
}

