interface ArrayConstructor {
  range: (start: number, end?: number, interval?: number) => number[];
}

interface Date {
  getWeekDay: () => number;
  toLocaleDateTimePickerString: () => string;
  toDatePickerString: () => string;
}

interface ObjectConstructor {
  keys<T extends {}, K extends string & keyof T>(obj: T): K[];
}

declare module "md5" {
  function md5(string: string): string;
  export = md5;
}

interface ImportMetaEnv {
  VITE_API_BASE_URL: string;
}