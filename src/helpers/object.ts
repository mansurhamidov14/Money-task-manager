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