import { RestInstanceType } from 'src/infrastructure/enums';
import { RequestProvider } from 'src/infrastructure/interfaces/';

import { getAxiosInstance } from './instance';

const axiosInstance = (baseURL?: string, contentType?: string) => {
  return getAxiosInstance(baseURL, contentType);
};

export const getInstanceProvider = <T = unknown>(
  restInstanceType?: RestInstanceType,
): ((baseURL?: string, contentType?: string) => RequestProvider<T>) => {
  if (restInstanceType === RestInstanceType.AXIOS) {
    return axiosInstance;
  }
};
