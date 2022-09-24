export const dateParser = (timestamp: any) => {
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  } as any;

  const date = Date.parse(timestamp);

  const newDate = new Date(date).toLocaleDateString("en-US", options);

  return newDate.toString();
};

export const compactNumber = Intl.NumberFormat("en-US", {
  notation: "compact",
}).format;
