interface ObjectConstructor {
  keys<T extends {}, K extends string & keyof T>(obj: T): K[];
}
