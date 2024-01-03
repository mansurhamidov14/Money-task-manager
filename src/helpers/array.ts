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
