export const createColumn = (key: string, version = 1, unique = false) => {
  return { key, unique, version };
};

export const createMultiColumnIndex = (columns: string[], version = 1, unique = false) => {
  const fields = columns.toSorted();
  return { fields, version, unique };
}
