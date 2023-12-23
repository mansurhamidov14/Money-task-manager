export const createColumn = (key: string, version = 1, unique = false) => {
  return { key, unique, version };
};
