interface ArrayConstructor {
  range: (start: number, end: number, interval?: number) => number[];
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