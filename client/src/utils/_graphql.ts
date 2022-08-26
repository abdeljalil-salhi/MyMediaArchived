export const GraphQLAccessToken = (token: string) => {
  const headers = {
    headers: {
      authentication: `Bearer ${token}`,
    },
  };
  return headers;
};