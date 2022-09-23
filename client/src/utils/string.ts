// Capitalize the first letter of a string
// e.g. "hello world" => "Hello world"
export const capitalizeString = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

// Capitalize the first letter of each string
// e.g. "hello world. you good" => "Hello world. You good"
export const capitalizeStrings = (str: string) =>
  str
    .split(". ")
    .map((sentence: string) => capitalizeString(sentence))
    .join(". ");

// Capitalize the first letter of each word in a string
// e.g. "hello world" => "Hello World"
export const capitalizeAllString = (str: string) =>
  str
    .split(" ")
    .map((word: string) => capitalizeString(word))
    .join(" ");

// Capitalize the first letter of each word of each string
// e.g. "hello world. you good" => "Hello World. You Good"
export const capitalizeAllStrings = (str: string) =>
  str
    .split(". ")
    .map((sentence: string) => capitalizeAllString(sentence))
    .join(". ");
