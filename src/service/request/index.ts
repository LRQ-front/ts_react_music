import axios, { InternalAxiosRequestConfig } from 'axios'
import type { AxiosInstance } from 'axios'

import { MYRequestConfig } from './type'

class httpRequest {
  instance: AxiosInstance

  constructor(config: MYRequestConfig) {
    this.instance = axios.create(config)

    //1.全局拦截器，每个实例都有的拦截器
    this.instance.interceptors.request.use(
      (req) => {
        return req
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        return res.data
      },
      (err) => {
        return err
      }
    )

    //2.实例拦截器，只有创建实例时，配置了interceptor才有这个拦截器，以后这个实例的每个请求都有拦截器
    this.instance.interceptors.request.use(
      config.interceptors?.requestSuccessFn,
      config.interceptors?.requestFailFn
    )
    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccessFn,
      config.interceptors?.responseFailFn
    )
  }

  //由于promise默认返回unknown，所以需要进行泛型约束
  request<T = any>(config: MYRequestConfig<T>): Promise<T> {
    //3.针对单个请求的拦截器
    if (config.interceptors?.requestSuccessFn) {
      config = config.interceptors.requestSuccessFn(
        config as InternalAxiosRequestConfig
      )
    }

    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseSuccessFn) {
            //MYRequestConfig的T来源于这里，因为开始里面设置的是axiosResponse，不能将T类型赋值给AxiosResponse，所以MYRequestConfig里面也需要改变
            res = config.interceptors?.responseSuccessFn(res)
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
  get<T = any>(config: MYRequestConfig<T>): Promise<T> {
    return this.request<T>({ method: 'GET', ...config })
  }
  post<T = any>(config: MYRequestConfig<T>) {
    return this.request<T>({ method: 'POST', ...config })
  }
}

export default httpRequest
