interface Array<T> {
  groupBy: <K extends keyof any>(key: (i: T) => K) => Record<K, T[]>;
}

interface ArrayConstructor {
  range: (start: number, end: number, interval?: number) => number[];
}

Array.prototype.groupBy = function <T, K extends keyof any>(key: (i: T) => K) {
  return this.reduce((groups, item) => {
    (groups[key(item)] ||= []).push(item);
    return groups;
  }, {} as Record<K, T[]>);
}

Array.range = function(start: number, end: number, interval = 1) {
  const result = [];
  var from = end ? start : 1;
  var to = end || start;
  for (let i = from; i <= to; i+= interval) {
    result.push(i);
  }

  return result;
}