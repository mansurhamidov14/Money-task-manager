export function flattenObject(
  obj: any,
  keyChain = "",
  accumulator: {[key: string]: any} = {},
  keySeparator: string = "."
) {
  if (typeof obj === "function") return null;
  if (typeof obj !== "object" && !keyChain) {
    return obj;
  } else if (typeof obj !== "object") {
    accumulator[keyChain] = obj;
    return accumulator;
  } else {
    Object.keys(obj).forEach(function (key) {
      flattenObject(obj[key], `${keyChain ? keyChain + keySeparator : ''}${key}`, accumulator)
    })
  }

  return accumulator;
}

export function getAbsentKeys<T extends {}, K extends keyof T>(obj: T, keys: K[]): K[] {
  if (!obj) {
    return keys;
  }

  return keys.reduce((acc, key) => {
    if (obj[key]) {
      return acc;
    }

    return [...acc, key]
  }, [] as K[]);
}