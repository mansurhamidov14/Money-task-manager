export const getRandomElement = <T>(array: T[]) => {
  return array[Math.floor(Math.random()*array.length)];
}

export const ascSorter = <T>(key: keyof T) => {
  return (a: T, b: T) => a[key] > b[key] ? 1 : -1;
}

export const descSorter = <T>(key: keyof T) => {
  return (a: T, b: T) => a[key] > b[key] ? -1 : 1;
}
