export function vibrate(pattern: Iterable<number>) {
  // @ts-ignore
  if (window.navigator.vibrate) {
    window.navigator.vibrate(pattern);
  }
}
