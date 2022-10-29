// Parsers interfaces
interface dateParserOptions {
  hour: "2-digit";
  minute: "2-digit";
  weekday: "long";
  year: "numeric";
  month: "short";
  day: "numeric";
}
interface directParserOptions {
  hour: "2-digit";
  minute: "2-digit";
}

export const dateParser = (timestamp: string): string => {
  const options: dateParserOptions = {
    hour: "2-digit",
    minute: "2-digit",
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const date = Date.parse(timestamp);

  const newDate = new Date(date).toLocaleDateString("en-US", options);

  return newDate.toString();
};

export const directParser = (timestamp: number): string => {
  const options: directParserOptions = {
    hour: "2-digit",
    minute: "2-digit",
  };

  const date = new Date(timestamp).toLocaleDateString("en-US", options);

  const newDate = date.split(" ")[1] + " " + date.split(" ")[2];

  return newDate.toString();
};

export const compactNumber = Intl.NumberFormat("en-US", {
  notation: "compact",
}).format;
