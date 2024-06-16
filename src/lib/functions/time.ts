const options: Intl.DateTimeFormatOptions = {
  year: "numeric", // 'numeric' or '2-digit'
  month: "long", // 'numeric', '2-digit', 'long', 'short', or 'narrow'
  day: "numeric", // 'numeric' or '2-digit'
  hour: "2-digit", // 'numeric' or '2-digit'
  minute: "2-digit", // 'numeric' or '2-digit'
};

export default (timeNano: number) => {
  const date = new Date(timeNano);

  return date.toLocaleString("en-US", options);
};
