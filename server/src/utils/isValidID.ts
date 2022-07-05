export const isValidID = (id: string): boolean => {
  return require("mongoose").Types.ObjectId.isValid(id);
};
