export const getRandomElement = <T>(array: T[]) => {
  return array[Math.floor(Math.random()*array.length)];
}

export const groupBy = <T, K extends keyof any>(arr: T[], key: (i: T) => K) =>
  arr.reduce((groups, item) => {
    (groups[key(item)] ||= []).push(item);
    return groups;
  }, {} as Record<K, T[]>);

export const ascSorter = <T>(key: keyof T) => {
  return (a: T, b: T) => a[key] > b[key] ? 1 : -1;
}

export const descSorter = <T>(key: keyof T) => {
  return (a: T, b: T) => a[key] > b[key] ? -1 : 1;
}

export const toMap = <T, K extends keyof T, V extends keyof T>(arr: T[], key: K, value: V) => {
  return arr.reduce((result, item) => {
    if (!item[key]) return result;
    const itemKey = String(item[key]);
    result[itemKey] = item[value];
    return result;
  }, {} as Record<string, T[V]>);
}
