import { AxiosResponse } from 'axios';

export class RequestProvider<T = any> {
  get: <T>(url: string, config?: any) => Promise<AxiosResponse<T>>;
  post: (url: string, data?: any, config?: any) => Promise<AxiosResponse<T>>;
  put: (url: string, data?: any, config?: any) => Promise<AxiosResponse<T>>;
  delete: (url: string, config?: any) => Promise<AxiosResponse<T>>;
}
