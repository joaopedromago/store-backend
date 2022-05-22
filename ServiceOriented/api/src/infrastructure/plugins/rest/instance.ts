import { RequestProvider } from 'src/infrastructure/interfaces/';
import { AxiosService } from 'src/infrastructure/plugins/rest/axios/axios.service';

export const getAxiosInstance = (
  baseURL: string,
  contentType?: string,
): RequestProvider => {
  return new AxiosService(baseURL, contentType);
};
