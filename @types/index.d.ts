import { AxiosRequestConfig, AxiosResponseHeaders } from "axios";

declare module "axios" {
  interface AxiosResponse<T = any, D = any> {
    config: AxiosRequestConfig<D>;
    data: T;
    headers: AxiosResponseHeaders;
    message: string;
    request?: any;
    status: number;
    statusText: string;
  }
}
