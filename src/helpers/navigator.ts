export function vibrate(pattern: Iterable<number> = [200]) {
  // @ts-ignore
  if (window.navigator.vibrate) {
    window.navigator.vibrate(pattern);
  }
}
