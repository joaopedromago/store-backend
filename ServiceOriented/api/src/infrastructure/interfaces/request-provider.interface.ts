export interface RequestProvider<T = any> {
  get: (url: string, config?: any) => Promise<T>;
  post: (url: string, data?: any, config?: any) => Promise<T>;
  put: (url: string, data?: any, config?: any) => Promise<T>;
  delete: (url: string, config?: any) => Promise<T>;
}
