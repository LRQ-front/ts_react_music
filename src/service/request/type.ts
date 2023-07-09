import type {
  AxiosResponse,
  InternalAxiosRequestConfig,
  AxiosRequestConfig
} from 'axios'

interface MYInterceptor<T = AxiosResponse> {
  requestSuccessFn?: (
    req: InternalAxiosRequestConfig
  ) => InternalAxiosRequestConfig
  requestFailFn?: (err: any) => any
  responseSuccessFn?: (res: T) => T
  responseFailFn?: (err: any) => any
}
//T为为单个响应拦截请求单独设置的类型
export interface MYRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: MYInterceptor<T>
}
