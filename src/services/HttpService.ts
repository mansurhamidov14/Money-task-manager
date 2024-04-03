import { EventHandler } from "@app/entities";
import { HttpError, HttpMethod, HttpRequestOptions, HttpResponse } from ".";

export class HttpService extends EventHandler<number, () => void> {
  headers: Record<string, string | null> = {};

  constructor(
    public baseUrl: string,
    headers: Record<string, string> = {}
  ) {
    super();
    this.headers = { ...headers, 'Content-Type': 'application/json' }
  }

  public async fetch<T = unknown, B = unknown>(
    url: string,
    method: HttpMethod,
    body?: B,
    options?: HttpRequestOptions
  ): Promise<HttpResponse<T>> {
    try {
      const headers = Object.assign(options?.headers || {}, this.headers);
      const parseMode = options?.parseMode || "json";
      const fetchUrl = HttpService.buildUrlWithSearchParams(this.baseUrl, url, options?.params);
      const response = await fetch(fetchUrl, {
        headers,
        body: JSON.stringify(body),
        method
      });
      this.dispatchEvent(response.status);

      if (response.ok) {
        const resp = {
          status: response.status,
          data: null as any
        }; 
        try {
          resp.data = await response[parseMode]()
        } catch {
          resp.data = await response.text() as any
        } finally {
          return resp; 
        }
      }

      const errorMessage = (await response.json()).message
      const error = new Error(errorMessage) as any;
      error.status = response.status;
      throw error as HttpError;
    } catch (e) {
      throw e;
    }
  }

  get<T = unknown>(url: string, options?: HttpRequestOptions) {
    return this.fetch<T>(url, "GET", undefined, options);
  }

  delete<T = unknown>(url: string, options?: HttpRequestOptions) {
    return this.fetch<T>(url, "DELETE", undefined, options);
  }

  post<T = unknown, B = unknown>(
    url: string,
    body?: B,
    options?: HttpRequestOptions
  ) {
    return this.fetch<T, B>(url, "POST", body, options);
  }

  patch<T = unknown, B = unknown>(
    url: string,
    body?: B,
    options?: HttpRequestOptions
  ) {
    return this.fetch<T, B>(url, "PATCH", body, options);
  }

  private static arrayFromParams = (params: HttpRequestOptions['params']): string[] => {
    const result = params
      ? Object.entries(params).reduce((acc, [key, value]) => {
        if (value == undefined) return acc;
        if (typeof value !== 'object' && typeof value !== 'function') {
          return [...acc, `${key}=${value}`];
        } else if (Array.isArray(value)) {
          return [...acc, ...value.map(item => HttpService.buildParams({ [`${key}[]`]: item }))];
        } else if (typeof value === 'object') {
          return [...acc, ...Object.entries(value).map(([valKey, valVal]) => HttpService.buildParams({ [`${key}[${valKey}]`]: valVal }))]
        }
        return acc;
      }, [] as string[])
      : [];
    return result;
  }
  
  private static isAbsolute = (url: string) => {
    var regExp = new RegExp('^(?:[a-z+]+:)?//', 'i');
    return regExp.test(url);
  }
  
  private static buildParams(params: HttpRequestOptions['params']): string {
    return HttpService.arrayFromParams(params).join('&')
  }
  
  private static buildUrlWithSearchParams = (baseUrl: string, path: string, params: HttpRequestOptions['params']) => {
    const searchParams = HttpService.buildParams(params);
    const paramsPrefix = searchParams && (path.indexOf('?') !== -1 ? '&' : '?');
    const derivedPath = `${path}${paramsPrefix}${searchParams}`;
    return HttpService.isAbsolute(derivedPath) ? derivedPath : `${baseUrl}${derivedPath}`;
  }
}
