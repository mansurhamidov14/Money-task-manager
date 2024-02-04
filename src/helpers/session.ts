import { MS_IN_DAY } from "@app/constants";

export function setSession<T>(key: string, value: T, validityMs = MS_IN_DAY) {
  const validThru = Date.now() + validityMs;

  document.cookie = `${key}=${JSON.stringify([value])};expires=${new Date(validThru)}`;
}

export function getSession<V>(key: string, defaultValue?: V): V | undefined {
  let cookie: any = {};
  document.cookie.split(';').forEach(function(el) {
    let split = el.split('=');
    cookie[split[0].trim()] = split.slice(1).join("=");
  })
  const result = cookie[key];
  if (result) {
    return JSON.parse(result)[0] as V;
  }

  return defaultValue;
}