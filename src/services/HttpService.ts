import { HttpError, HttpMethod, HttpRequestOptions, HttpResponse } from ".";

export class HttpService {
  private errorHandlers: Record<number, () => void> = {};
  headers: Record<string, string | null> = {}
  constructor(
    public baseUrl: string,
    headers: Record<string, string> = {}
  ) {
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
      const fetchUrl = this.isAbsolute(url) ? url : `${this.baseUrl}${url}`;
      const response = await fetch(fetchUrl, {
        headers,
        body: JSON.stringify(body),
        method
      });
  
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
      this.errorHandlers[response.status]?.();
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

  private isAbsolute(url: string) {
    var regExp = new RegExp('^(?:[a-z+]+:)?//', 'i');
    return regExp.test(url);
  }

  public registerErrorHandler(statusCode: number, callback: () => void) {
    this.errorHandlers[statusCode] = callback;
  }
}
