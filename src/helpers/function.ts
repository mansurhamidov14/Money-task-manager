const getCacheKey = <P extends any[]>(args: P) => {
  return JSON.stringify(args);
}

export const memoize = <P extends any[], R>(callback: (...args: P) => R) => {
  const cache: Map<string, any> = new Map();
  const callee = (...args: P): R => {  
    const cacheKey = getCacheKey(args);
    if (cache.has(cacheKey)) {
      return cache.get(cacheKey);
    } else {
      const result = callback(...args);
      cache.set(cacheKey, result);
      return result;
    }
  };

  const forgetCallback = (...args: any[]): void => {
    if (!args.length) {
      return cache.clear();
    }
    const cacheKey = getCacheKey(args);
    cache.delete(cacheKey);
  };

  return [callee, forgetCallback] as const;
}

