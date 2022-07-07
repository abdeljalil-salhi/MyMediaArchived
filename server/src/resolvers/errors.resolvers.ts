export const unhandledError = (err: Error) => {
  return [
    {
      field: "error",
      message: `Please report this error to the support: ${err}`,
    },
  ];
};

export const unauthorizedError = () => {
  return [
    {
      field: "authorization",
      message: "Not authorized",
    },
  ];
};
